Template.navSource.events({
	'click .btn-source' () {
		// Reset Eingabe
			if (Session.get(REVEALED)) {
				Session.set(REVEALED, false);
			}
			if (Session.get(TERM_RIGHT)) {
				Session.set(TERM_RIGHT, false);
			}
			if(Session.get(INPUT_OCCURED)) {
				Session.set(INPUT_OCCURED, false);
			}
		if (document.getElementById("term")) {
			document.getElementById("term").value = '';
			if (document.getElementById("term").disabled === true) {
				document.getElementById("term").disabled = false;
			}
		}

		Session.set(NAV_SOURCE_COUNT, (Session.get(NAV_SOURCE_COUNT) + 1) % Session.get(NAV_SOURCES).length);
		Session.get(NAV_SOURCES).forEach(entry => {
			Session.set(entry, false);
		})
		Session.set(Session.get(NAV_SOURCES)[Session.get(NAV_SOURCE_COUNT)], true);

		// if only one option is clickable don't reload on click
		if (Session.get(NAV_SOURCE_COUNT) > 0) {
			Entry.setNext();
		}
		// log
		Log.detail();
	}
});
