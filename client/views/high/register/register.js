Template.register.onCreated(() => {
	let template = Template.instance();

	template.searchQuery = new ReactiveVar();
	template.searching = new ReactiveVar(false);

	template.autorun(() => {
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

	vocabulary() {
		// Sort and group entries by letter and create a new array of iterable objects for a cascaded template iteration
		let vocabularyIndexed = [];

		let favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());

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

Template.register.events({
	'keyup [name="search"]' (event, template) {
		let value = event.target.value.trim();
		if (value !== '' && event.keyCode === 13) {
				template.searchQuery.set(value);
				template.searching.set(true);
		}
		if (value === '') {
			template.searchQuery.set(value);
		}
	}
});
