Template.layout.onCreated(function() {
	this.autorun(() => {

		Session.set(LENGTH_FAV, Favourites.find().count());
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());
	});
});


Template.layout.events({
	'click .btn-forward, click .btn-backward' (event, template) {
		let self = this;
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
		// log
		Meteor.call('dataViewedUser', self);
		Meteor.call('dataViewedAll', self);
	},
	'click .btn-backward' (event, template) {
		let val = 0;
		if (Session.get(SOURCE_FAV)) {
			// reset to avoid going into negative numbers and be able to circle backwards
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
		if (Session.get(SOURCE_FAV)) {
			val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
			Session.set(COUNT_VIEWED, val);
		} else {
			val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);
			Session.set(COUNT_VIEWED, val);
		}
	},
	'click .btn-reveal' (event, template) {
		if (!Session.get(REVEALED)) {
			Session.set(REVEALED, true);
		}
		if (document.getElementById("term")) {
			if (document.getElementById("term").disabled === false) {
				document.getElementById("term").disabled = true;
			}
		}
	},
	'click .btn-insert' (event, template) {
		let self = this;
		let group = FlowRouter.current().route.group.name;
		// log start
		let timestamp = Number(moment().format('DDDDHHmm'));

		if (group === 'high') {
			Meteor.call('dataFavHigh', timestamp);
		}
		if (group === 'low') {
			Meteor.call('dataFavLow', timestamp);
		}
		// log end
		Meteor.call('insertFavourite', self._id);

		// reset the COUNT VIEW when a list entry has been removed
		if (!Session.get(SOURCE_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {
			let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);
			Session.set(COUNT_VIEWED, val);
		}
		if (Session.get(LENGTH_NOT_FAV) === 1) {
			Session.set(SOURCE_FAV, !Session.get(SOURCE_FAV));
		}
	},

	'click .btn-delete' (event, template) {
		let self = this;
		let group = FlowRouter.current().route.group.name;
		// log start
		let timestamp = Number(moment().format('DDDDHHmm'));

		if (group === 'high') {
			Meteor.call('dataFavHigh', timestamp);
		}
		if (group === 'low') {
			Meteor.call('dataFavLow', timestamp);
		}
		// log end

		Meteor.call('deleteFavourite', self._id);

		if (Session.get(SOURCE_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {
			let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
			Session.set(COUNT_VIEWED, val);
		}
		if (Session.get(LENGTH_FAV) === 1) {
			Session.set(SOURCE_FAV, !Session.get(SOURCE_FAV));
		}
	}
});
