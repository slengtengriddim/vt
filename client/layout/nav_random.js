Template.navRandom.events({
	'click .btn-favourites, click .btn-not-favourites' () {
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
	'click .btn-favourites' () {
		if (!Session.get(RANDOM_FAV) && Session.get(RANDOM_NOT_FAV)) {
			// set values so that each button has its own responsibility
			Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));
			Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV))
				// reset counter range when switching between fav and not-fav
			let val = (Session.get(COUNT_VIEWED)) % Session.get(LENGTH_FAV);
			Session.set('countViewed', val);
		}
	},
	'click .btn-not-favourites' () {
		if (!Session.get(RANDOM_NOT_FAV) && Session.get(RANDOM_FAV)) {
			Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));
			Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV))
			let val = (Session.get(COUNT_VIEWED)) % Session.get(LENGTH_NOT_FAV);
			Session.set('countViewed', val);
		}
	}
});

Template.navRandom.helpers({
	lengthFav() {
		return Session.get(LENGTH_FAV);
	},
	lengthNotFav() {
		return Session.get(LENGTH_NOT_FAV);
	}
})
