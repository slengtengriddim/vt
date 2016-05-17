Template.feedback.onCreated(() => {
	let template = Template.instance();
	template.subscribe('user');
	template.subscribe('feedback');
	template.subscribe('dataSurvey');
});

Template.feedback.helpers({
	users() {
		return Meteor.users.find({});
	},
	usersCount() {
		return Meteor.users.find().count();
	},
	usersCountOnline() {
		return Meteor.users.find({
			"status.online": true
		}).count();
	},
	email() {
		if (this.emails[0].address) {
			return this.emails[0].address;
		}
	},
	labelClass() {
		let userOnline = Meteor.users.findOne({
			_id: this._id,
			"status.online": true
		});
		if (userOnline) {
			return "green";
		} else {
			return "grey";
		};
	},
	usersSurveySubmitted() {
		return Data.Survey.find({});
	},
	usersSurveySubmittedCount() {
		return Data.Survey.find({}).count();
	},
	feedback() {
		return Data.Feedback.find({}, {
			sort: {
				createdAt: -1
			}
		});
	},
	userMail() {
		 return this.userMail;
	}
});
