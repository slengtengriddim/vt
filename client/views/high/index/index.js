Template.index.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
});

Template.index.helpers({

});

Template.index.events ({
	'click .btn-question' (event, template) {
	}
})
