Template.wordsUser.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataWords');
});
Template.wordsUser.helpers({
	top5() {
		let data = Data.Words.find({
			userId: Meteor.userId()
		}, {
			limit: 5,
			sort: {
				viewed: -1
			}
		}).fetch();
		return data;
	}
});
