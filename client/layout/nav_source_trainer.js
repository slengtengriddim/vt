Template.navSourceTrainer.helpers({

});

Template.navSourceTrainer.events({
	'click .btn-source-fav, click .btn-source-not-fav' () {
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
		Log.detail('source');
	},
	'click .btn-source-fav' () {
		// Button only switchable when there's at least on entry on a list
		if (Session.get(LENGTH_FAV) !== 0) {
			Session.set(SOURCE_FAV, true);
		}
		// reset counter range when switching between fav list and not-fav list
		let val = (Session.get(COUNT_VIEWED)) % Session.get(LENGTH_FAV);
		Session.set(COUNT_VIEWED, val);
		console.log(Session.get(SOURCE_FAV));
	},
	'click .btn-source-not-fav' () {
		// Button only switchable when there's at least on entry on a list
		if (Session.get(LENGTH_NOT_FAV) !== 0) {
			Session.set(SOURCE_FAV, false);
		}
		// reset counter range when switching between fav list and not-fav list
		let val = (Session.get(COUNT_VIEWED)) % Session.get(LENGTH_NOT_FAV);
		Session.set(COUNT_VIEWED, val);
		console.log(Session.get(SOURCE_FAV));
	}
});
