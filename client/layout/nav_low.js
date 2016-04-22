Template.navLow.events({
	'click .btn-low' (event, template) {
		let oldValue = Session.get(NAV_LOW) || false;
    Session.set(NAV_LOW, !oldValue);
	}
})
