Template.navSource.helpers({
	source() {
		if (Session.get(SOURCE_FAV)) {
			return "Favoriten";
		} else {
			return "Nicht-Favoriten";
		}
	},
	lengthFav() {
		return Session.get(LENGTH_FAV);
	},
	lengthNotFav() {
		return Session.get(LENGTH_NOT_FAV);
	}
});

Template.navSource.events({
	'click .btn-source' () {
		let oldValue = Session.get(SOURCE_FAV) || false;

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

		// Button only switchable when there's at least on entry on a list
		if (Session.get(LENGTH_FAV) !== 0 && Session.get(LENGTH_NOT_FAV) !== 0) {
			Session.set(SOURCE_FAV, !oldValue);
		}

		// reset counter range when switching between fav list and not-fav list
		if (Session.get(SOURCE_FAV)) {
			let val = (Session.get(COUNT_VIEWED)) % Session.get(LENGTH_FAV);
			Session.set(COUNT_VIEWED, val);
		} else {
			let val = (Session.get(COUNT_VIEWED)) % Session.get(LENGTH_NOT_FAV);
			Session.set(COUNT_VIEWED, val);
		}
	}
});
