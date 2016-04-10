Template.trainerEingabe.onCreated(() => {
	let template = Template.instance();
	template.isAlphabetic = new ReactiveVar(true);
	template.isLength64 = new ReactiveVar(true);
});

Template.trainerEingabe.helpers({
	isAlphabetic() {
		return Template.instance().isAlphabetic.get();
	},
	isLength64() {
		return Template.instance().isLength64.get();
	},
	termPercent() {
		return Math.floor((Session.get(COUNT_LETTERS_MATCH) / this.term.length) * 100);
	}
});

Template.trainerEingabe.events({
	'keyup [name="term"]' (event, template) {
		let value = event.target.value.toLowerCase();

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
					if (Session.get(TERM_WRONG)) {
						Session.set(TERM_WRONG, false);
					}
					Session.set(TERM_RIGHT, true);

					setTimeout(() => {
						Session.set(REVEALED, false);
						Session.set(TERM_RIGHT, false);
						event.target.value = "";

						let val = 0;
						if (Session.get(RANDOM_FAV)) {
							val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
							Session.set(COUNT_VIEWED, val);
						} else {
							val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);
							Session.set(COUNT_VIEWED, val);
						}

					}, 1000);
				} else {
					Session.set(TERM_WRONG, true);

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

					let countMatch = term.length - R.filter(R.equals('_'), cheese).length;
					Session.set(COUNT_LETTERS_MATCH, countMatch);

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
