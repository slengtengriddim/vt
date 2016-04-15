Template.navMode.events({
	'click .btn-mode' () {
		Session.set(NAV_MODE_COUNT, (Session.get(NAV_MODE_COUNT) + 1) % Session.get(NAV_MODES).length);
		Session.get(NAV_MODES).forEach( entry => {
			Session.set(entry, false);
		})
		Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);
	}
});

Template.navMode.helpers({
	mode() {
		return Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];
	}
})
