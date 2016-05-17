Template.statUsers.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
	template.subscribe('userStatus');
	template.subscribe('user');
});
