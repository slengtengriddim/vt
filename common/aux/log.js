(function(exports) {

	exports.detail = (clickArea) => {
		// log
		let modes = [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF, NAV_MODE_ENTER];
		let currentRoute = FlowRouter.current().route.name;

		let deviceType = Darwin.device.type;
		let devicePlatform = Darwin.device.platform;
		let route = FlowRouter.current().route.name;
		let area = clickArea;
		let attention = Session.get(ATTENTION_MODE);
		let mode = 'null';
		if (currentRoute !== 'register') {
			modes.forEach(entry => {
				if (Session.get(entry)) {
					mode = entry;
				}
			});
		};
		Meteor.call('dataDetail', deviceType, devicePlatform, route, area, mode, attention);
	};
})(this.Log = {});
