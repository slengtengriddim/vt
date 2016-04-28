Template.termDay.onCreated(() => {
	let template = Template.instance();
	template.subscribe('vocabularyAll');
	template.subscribe('termDay');
});

Template.termDay.helpers({
	termDay() {
		let currentUserId = Meteor.userId();
		let termDay = TermDay.findOne({
			userId: currentUserId
		}, {
			sort: {
				timestamp: -1
			}
		});
		if (termDay) {
			let vocabulary = Vocabulary.findOne({
				_id: termDay.vocabularyId
			});
			if (vocabulary) {
				return vocabulary;
			}
		}
	}
});
