let hooksFeedbackForm = {
	onSuccess: function(formType, result) {
		let msg = 'Feedback erfolgreich gesendet.'
		toastr.success(msg);
		console.log(Meteor.userId());
	},
	onError: function(formType, error) {
		let msg = 'Feedback konnte nicht gesendet werden.'
		toastr.error(msg);
	}
}

AutoForm.addHooks(['insertFeedbackForm'], hooksFeedbackForm);

SimpleSchema.debug = true;
