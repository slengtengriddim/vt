Template.navModeTrainer.events({
	'click .btn-mode' () {
		Session.set(NAV_MODE_COUNT, (Session.get(NAV_MODE_COUNT) + 1) % Session.get(NAV_MODES).length);
		Session.get(NAV_MODES).forEach( entry => {
			Session.set(entry, false);
		})
		Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);

		// log
		let deviceType = Darwin.device.type;
		let devicePlatform = Darwin.device.platform;
		let clickArea = 'mode';
		let mode;
		let attention = Session.get(ATTENTION_MODE);
		if (Session.get(ATTENTION_MODE)) {
			mode  = Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];
		} else {
			mode  = 'null';
		}
		Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);
	},
	'click .btn-lesen' () {
		Session.set(NAV_MODE_COUNT, R.indexOf(NAV_MODE_READ,Session.get(NAV_MODES)));
		Session.get(NAV_MODES).forEach( entry => {
			Session.set(entry, false);
		});
		Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);
	},
	'click .btn-wort' () {
		Session.set(NAV_MODE_COUNT, R.indexOf(NAV_MODE_TERM,Session.get(NAV_MODES)));
		Session.get(NAV_MODES).forEach( entry => {
			Session.set(entry, false);
		});
		Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);
	},
	'click .btn-definition' () {
		Session.set(NAV_MODE_COUNT, R.indexOf(NAV_MODE_DEF,Session.get(NAV_MODES)));
		Session.get(NAV_MODES).forEach( entry => {
			Session.set(entry, false);
		});
		Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);
	},
	'click .btn-eingabe' () {

	}
});
