(function(exports) {

	exports.detail = () => {
		// log
		let modes = [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF, NAV_MODE_ENTER];
		let currentRoute = FlowRouter.current().route.name;

		let deviceType = Darwin.device.type;
		let devicePlatform = Darwin.device.platform;
		let route = FlowRouter.current().route.name;
		let mode = 'null';
		let settingsTrainer = Session.get(SETTINGS_TRAINER);
		let heartClicked = false;
		if (currentRoute === 'trainer' || currentRoute === 'low') {
			modes.forEach(entry => {
				if (Session.get(entry)) {
					mode = entry;
				}
			});
		};
		Meteor.call('dataDetail', deviceType, devicePlatform, route, mode, settingsTrainer, heartClicked);
	};
	exports.detailHeart = () => {
		// log
		let modes = [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF, NAV_MODE_ENTER];
		let currentRoute = FlowRouter.current().route.name;

		let deviceType = Darwin.device.type;
		let devicePlatform = Darwin.device.platform;
		let route = FlowRouter.current().route.name;
		let mode = 'null';
		let settingsTrainer = Session.get(SETTINGS_TRAINER);
		let heartClicked = true;
		if (currentRoute === 'trainer' || currentRoute === 'low') {
			modes.forEach(entry => {
				if (Session.get(entry)) {
					mode = entry;
				}
			});
		};
		Meteor.call('dataDetail', deviceType, devicePlatform, route, mode, settingsTrainer, heartClicked);
	};

})(this.Log = {});
