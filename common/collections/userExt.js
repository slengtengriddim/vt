UserExt = new Mongo.Collection('userExt', {});

UserExt.Schema = new SimpleSchema ({
	userId: {
		type: String,
		autoValue: function() {
			return this.userId;
		}
	},
	userMail: {
		type: String,
		autoValue: function() {
			return Meteor.user().emails[0].address;
		}
	},
	surveySubmitted: {
		type: Boolean,
		defaultValue: false
	}
	// TODO last visited URL - save on logout
});

UserExt.attachSchema(UserExt.Schema);
