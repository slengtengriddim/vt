let hooksSurveyForm = {
	onSuccess: function(formType, result) {
		Meteor.call('surveySubmitted');
		FlowRouter.go('index');
		let msg = 'Fragebogen erfolgreich gesendet.'
		toastr.success(msg);
	},
	onError: function(formType, error) {
		let msg = 'Fragebogen konnte nicht gesendet werden.'
		toastr.error(msg);
	}
}

AutoForm.addHooks(['insertSurveyForm'], hooksSurveyForm);
