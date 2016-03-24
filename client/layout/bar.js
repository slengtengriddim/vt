var ATTENTION_MODE = 'attentionMode';
Session.setDefault(ATTENTION_MODE, false);


Template.bar.events({
	'click .attention-mode': function() {
		var oldValue = Session.get('attentionMode') || false;
		Session.set('attentionMode', !oldValue);

		var routePath = FlowRouter.current().route.path;
		Session.set('lastPath', routePath);
	}
});
