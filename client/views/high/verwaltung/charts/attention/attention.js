Template.statAttention.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
	template.subscribe('user');
	template.autorun(() => {
		Stat.d3Reset();
	});
});
