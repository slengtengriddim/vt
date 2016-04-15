Template.register.onCreated(() => {
	let template = Template.instance();

	template.searchQuery = new ReactiveVar();
	template.searching = new ReactiveVar(false);
	template.isAlphabetic = new ReactiveVar(true);
	template.isLength64 = new ReactiveVar(true);

	Tracker.autorun(() => {
		template.subscribe('vocabularyRegister', template.searchQuery.get(), () => {
			setTimeout(() => {
				template.searching.set(false);
			}, 300);
		});
		template.subscribe('ownedFavourites'); // Favourites.find()
	});
});

Template.register.helpers({
	searching() {
		return Template.instance().searching.get();
	},
	query() {
		return Template.instance().searchQuery.get();
	},
	isAlphabetic() {
		return Template.instance().isAlphabetic.get();
	},
	isLength64() {
		return Template.instance().isLength64.get();
	},
	favLengthShort() {
		return Session.get(LENGTH_FAV) < 5;
	},
	notFavLengthShort() {
		return Session.get(LENGTH_NOT_FAV) < 5;
	},
	vocabulary() {
		// Sort and group entries by letter and create a new array of iterable objects for cascaded template iteration
		let vocabularyIndexed = [];
		vocabularyIndexed.fav = [];
		vocabularyIndexed.notFav = [];


		let favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());

		let alphabet = R.split('', 'abcdefghijklmnopqrstuvwxyz'.toUpperCase());
		let regex = letter => new RegExp("^" + letter, "i");

		alphabet.forEach(entry => {
			let arrayFav = Vocabulary.find({
				term: {
					$in: [regex(entry)]
				},
				_id: {
					$in: favIds
				}
			}, {
				sort: {
					term: 1
				}
			});
			if (arrayFav.count() !== 0) {
				vocabularyIndexed.fav.push({
					'letter': entry,
					'entries': arrayFav
				});
			}
		});
		alphabet.forEach(entry => {
			let arrayNotFav = Vocabulary.find({
				term: {
					$in: [regex(entry)]
				},
				_id: {
					$nin: favIds
				}
			}, {
				sort: {
					term: 1
				}
			});
			if (arrayNotFav.count() !== 0) {
				vocabularyIndexed.notFav.push({
					'letter': entry,
					'entries': arrayNotFav
				});
			}
		});

		if (vocabularyIndexed) {
			return vocabularyIndexed;
		}
	}
});

Template.register.events({
	'keyup [name="search"]' (event, template) {
		let value = event.target.value;
		if (value !== '') {
			// check if string is valid
			if (Validate.isAlphabetic(value)) {
				template.isAlphabetic.set(true);
			} else {
				template.isAlphabetic.set(false);
			}
			if (Validate.isLength64(value)) {
				template.isLength64.set(true);
			} else {
				template.isLength64.set(false);
			}
		}
		// && event.keyCode === 13
		if (value !== '') {
			if (template.isAlphabetic.get() && template.isLength64.get()) {
				template.searchQuery.set(value);
				template.searching.set(true);
			}
		}

		if (value === '') {
			template.searchQuery.set(value);
			template.isAlphabetic.set(true);
			template.isLength64.set(true);
		}
	}
});
