Template.statTotal.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
	template.subscribe('user');
});

Template.statTotal.helpers({
	dataPointsCount() {
		return Data.Detail.find({}).count();
	}
})
