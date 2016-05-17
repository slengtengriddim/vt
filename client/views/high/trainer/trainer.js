Template.trainer.onCreated(() => {
	let template = Template.instance();
	template.isAlphabetic = new ReactiveVar(true);
	template.isLength64 = new ReactiveVar(true);

	template.autorun(() => {
		template.subscribe('vocabularyAll'); // Vocabulary.find()
		template.subscribe('ownedFavourites'); // Favourites.find()
	});
});

Template.trainer.helpers({
	isAlphabetic() {
		return Template.instance().isAlphabetic.get();
	},
	isLength64() {
		return Template.instance().isLength64.get();
	}
});

Template.trainer.events({
	'click .btn-settings-trainer' (event, template) {
		let oldValue = Session.get(SETTINGS_TRAINER) || false;
		Session.set(SETTINGS_TRAINER, !oldValue);
		console.log(Session.get(SETTINGS_TRAINER));

		// log
	Log.detail();
	},
	'keyup [name="term"]' (event, template) {
		let value = event.target.value.toLowerCase();

		if(! Session.get(INPUT_OCCURED)) {
			Session.set(INPUT_OCCURED, true);
		}

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

		// TODO exclude spaces
		// && event.keyCode === 13
		if (value !== '') {
			if (template.isAlphabetic.get() && template.isLength64.get()) {
				let term = this.term.toLowerCase();

				if (term === value) {
					if (! Session.get(REVEALED)) {
						Session.set(REVEALED, true);
					}
					if (! Session.get(TERM_RIGHT)) {
						Session.set(TERM_RIGHT, true);
					}
					event.target.disabled = true;

					setTimeout(() => {
						Session.set(REVEALED, false);
						Session.set(TERM_RIGHT, false);
						Session.set(INPUT_OCCURED, false);
						// disable after correct term and autofocus input field for the next word
						if (event.target) {
							event.target.disabled = false;
							event.target.value = '';
							if (event.target.disabled === true) {
								event.target.disabled = false;
								event.target.autofocus = true;
							}
							event.target.focus();
						}
						// log
						Log.detail();
						Entry.setNext();
					}, 2000);
				} else {
					Session.set(TERM_RIGHT, false);

					let termArray = R.split('', term);
					let f = (x, y) => {
						let space = "_";
						if (x === y) {
							return x;
						} else {
							return space;
						}
					}
					let cheese = R.zipWith(f, term, value);
					while (cheese.length < term.length) {
						cheese = R.append('_', cheese);
					}

					// let countMatch = term.length - R.filter(R.equals('_'), cheese).length;
					// Session.set(COUNT_LETTERS_MATCH, countMatch);

					cheese = R.join(' ', cheese);
					Session.set(TERM_CACHE, cheese);

				}
			}
		}

		if (value === '') {
			template.isAlphabetic.set(true);
			template.isLength64.set(true);

			let cheese = '';
			while (cheese.length < this.term.length) {
				cheese = R.append('_', cheese);
			}
			cheese = R.join(' ', cheese);
			Session.set(TERM_CACHE, cheese);
		}
	}
});
