Template.navMode.events({
	'click .btn-mode' () {
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
			
		Session.set(NAV_MODE_COUNT, (Session.get(NAV_MODE_COUNT) + 1) % Session.get(NAV_MODES).length);
		Session.get(NAV_MODES).forEach( entry => {
			Session.set(entry, false);
		})
		Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);
		// log
		Log.detail();
	}
});
