Template.search.onCreated(() => {
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
		template.subscribe('ownedFavourites');
	});
});

Template.registerHelper("isFavourite", function(vocabularyId) {
	// console.log(vocabularyId);
	let favEntry = Favourites.findOne({
		vocabularyId: vocabularyId
	});
	if (favEntry) {
		return true;
	}
});

Template.search.helpers({
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
	vocabulary() {
		// Sort and group entries by letter and create a new array of iterable objects for cascaded template iteration
		let vocabularyIndexed = [];
		let alphabet = R.split('', 'abcdefghijklmnopqrstuvwxyz'.toUpperCase());
		let regex = letter => new RegExp("^" + letter, "i");

		alphabet.forEach(entry => {
			let array = Vocabulary.find({
				term: {
					$in: [regex(entry)]
				}
			}, {
				sort: {
					term: 1
				}
			});
			if (array.count() !== 0) {
				vocabularyIndexed.push({
					'letter': entry,
					'entries': array
				});
			}
		});

		if (vocabularyIndexed) {
			return vocabularyIndexed;
		}
	}
});

Template.search.events({
	'keyup [name="search"]' (event, template) {
		let value = event.target.value;
console.log(value);
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

		if (value !== '' && event.keyCode === 13) {
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
	},

	'click .btn-fav' (event, template) {
		Meteor.call('toggleFavourite', this._id);

		// TODO DRY
		if (Favourites.find({
				vocabularyId: this._id
			}).count() === 0) {
				// add to favourites
				if (Session.get(RANDOM_NOT_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {
					let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);
					Session.set(COUNT_VIEWED, val);
				}
				if ((Session.get(LENGTH_NOT_FAV) === 1)) {
					Session.set(RANDOM_FAV, true);
					Session.set(RANDOM_NOT_FAV, false);
				}
		} else {
			// remove from favourites
			if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {
				let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
				Session.set(COUNT_VIEWED, val);
			}
			if ((Session.get(LENGTH_FAV) === 1)) {
				Session.set(RANDOM_FAV, false);
				Session.set(RANDOM_NOT_FAV, true);
			}
		}
	}
});
