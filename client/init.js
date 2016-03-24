Meteor.startup(function() {
	let startVal = {
		name: "attentionMode",
		checked: true
	};

	if (AttentionLocal.find().count() === 0) {
			AttentionLocal.insert(startVal);
	};

});
