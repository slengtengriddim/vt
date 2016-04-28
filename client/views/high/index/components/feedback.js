let hooksFeedbackForm = {
	onSuccess: function(formType, result) {
		let msg = 'Feedback erfolgreich gesendet.'
		toastr.success(msg);
	},
	onError: function(formType, error) {
		let msg = 'Feedback konnte nicht gesendet werden.'
		toastr.error(msg);
	}
}

AutoForm.addHooks(['insertFeedbackForm'], hooksFeedbackForm);
