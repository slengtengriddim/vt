let hooksSurveyForm = {
	onSuccess: function(formType, result) {
		FlowRouter.go('index');
		let msg = 'Fragebogen wurde erfolgreich gesendet.'
		toastr.success(msg);
	},
	onError: function(formType, error) {
		let msg = 'Fragebogen wurde nicht gesendet.'
		toastr.error(msg);
	}
}

AutoForm.addHooks(['insertSurveyForm'], hooksSurveyForm);
