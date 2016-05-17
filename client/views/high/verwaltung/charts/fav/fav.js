Template.statFav.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
	template.subscribe('user');
});
