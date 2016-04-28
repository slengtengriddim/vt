Template.total.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
	template.subscribe('user');
});

Template.total.helpers({
	dataPointsCount() {
		return Data.Detail.find({}).count();
	}
})
