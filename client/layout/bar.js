Template.bar.events({
  'click .attention-mode' () {
    let oldValue = Session.get(ATTENTION_MODE) || false;
    Session.set(ATTENTION_MODE, !oldValue);

    Session.set(NAV_LOW, false);
    Session.set(EXAMPLE, false);

    let routePath = FlowRouter.current().path;
    Session.set(LAST_PATH, routePath);

    // log
		let deviceType = Darwin.device.type;
		let devicePlatform = Darwin.device.platform;
		let clickArea = 'bar';
		let mode = 'null';
		let attention = Session.get(ATTENTION_MODE);

		Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);
  }
});
