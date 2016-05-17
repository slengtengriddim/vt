Template.navLow.rendered = function() {
	$(document)
		.ready(function() {
			$('#modal-settings')
				.modal('attach events', '#call-modal-settings');
		});
};


Template.navLow.events({
	'click .btn-settings-low' (event, template) {
		let oldValue = Session.get(NAV_LOW) || false;
    Session.set(NAV_LOW, !oldValue);

		$('#modal-settings')
  	.modal('attach events', '#call-modal-settings', 'show');

		// log
		Log.detail();
	}
});
