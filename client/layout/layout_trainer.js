Template.layoutTrainer.onCreated(function() {
	this.autorun(() => {
		this.subscribe('vocabularyAll');
		this.subscribe('ownedFavourites');
	});
});

Template.layoutTrainer.events({
	'click .btn-reveal' (event, template) {
		if (!Session.get(REVEALED)) {
			Session.set(REVEALED, true);
		}
		if (document.getElementById("term").disabled === false) {
			document.getElementById("term").disabled = true;
		}
	},

	'click .btn-switch' (event, template) {
		let oldValue = Session.get(TERM_MODE) || false;
		Session.set(TERM_MODE, !oldValue);
	},

	'click .btn-forward, click .btn-backward' (event, template) {
		if (Session.get(REVEALED)) {
			Session.set(REVEALED, false);
		}
		if (Session.get(TERM_WRONG)) {
			Session.set(TERM_WRONG, false);
		}
		if (document.getElementById("term")) {
			document.getElementById("term").value = '';
			if (document.getElementById("term").disabled === true) {
				document.getElementById("term").disabled = false;
			}
		}
	},

	'click .btn-backward' (event, template) {
		let val = 0;
		if (Session.get(RANDOM_FAV)) {
			// to avoid going into negative numbers and be able to circle backwards
			if (Session.get(COUNT_VIEWED) === 0) {
				val = Session.get(LENGTH_FAV) - 1;
				Session.set(COUNT_VIEWED, val);
			} else {
				val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_FAV);
				Session.set(COUNT_VIEWED, val);
			}
		} else {
			if (Session.get(COUNT_VIEWED) === 0) {
				val = Session.get(LENGTH_NOT_FAV) - 1;
				Session.set(COUNT_VIEWED, val);
			} else {
				val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_NOT_FAV);
				Session.set(COUNT_VIEWED, val);
			}
		}
	},

	'click .btn-forward' (event, template) {
		let val = 0;
		if (Session.get(RANDOM_FAV)) {
			val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
			Session.set(COUNT_VIEWED, val);
		} else {
			val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);
			Session.set(COUNT_VIEWED, val);
		}
	},

	'click .btn-fav' (event, template) {
		Meteor.call('toggleFavourite', this._id);

		// reset the COUNT VIEW when a list entry has been removed
		if (Session.get(RANDOM_NOT_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {
			let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);
			Session.set(COUNT_VIEWED, val);
		}

		if (Session.get(LENGTH_NOT_FAV) === 1) {
			Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));
			Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV))
		}
	},

	'click .btn-delete' (event, template) {
		Meteor.call('deleteFavourite', this._id);

		if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {
			let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
			Session.set(COUNT_VIEWED, val);
		}
		if (Session.get(LENGTH_FAV) === 1) {
			Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));
			Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV))
		}
	}
});
