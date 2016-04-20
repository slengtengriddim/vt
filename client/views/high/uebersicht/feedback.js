Template.feedback.onCreated(() => {
	let template = Template.instance();
	template.subscribe('feedback');
});

Template.feedback.helpers({
	feedback() {
		return Data.Feedback.find({}, {
			sort: {
				createdAt: -1
			}
		});
	}
});
