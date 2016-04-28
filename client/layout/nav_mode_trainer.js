Template.navModeTrainer.events({
	'click .btn-lesen' () {
		setModeTrainer(NAV_MODE_READ);
	},
	'click .btn-wort' () {
		setModeTrainer(NAV_MODE_TERM);
	},
	'click .btn-definition' () {
		setModeTrainer(NAV_MODE_DEF);
	},
	'click .btn-eingabe' () {
		Session.get(NAV_MODES).forEach( entry => {
			Session.set(entry, false);
		});
		Session.set(NAV_MODE_ENTER, true);
		// log
		Log.detail('mode');
	}
});

setModeTrainer = (mode) => {
	Session.set(NAV_MODE_COUNT, R.indexOf(mode, Session.get(NAV_MODES)));
	Session.get(NAV_MODES).forEach( entry => {
		Session.set(entry, false);
	});
	Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);
	Session.set(NAV_MODE_ENTER, false);
	// log
	Log.detail('mode');
};
