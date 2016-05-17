Meteor.publish("user", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		return Meteor.users.find({});
	} else {
		// user not authorized. do not publish secrets
		this.stop();
		return;
	}
});
Meteor.publish("dataSurvey", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		let data = Data.Survey.find({}, {
			fields: {
				'userId': 1
			}
		});
		if (data) {
			return data;
		}
		return this.ready();
	} else {
		// user not authorized. do not publish secrets
		this.stop();
		return;
	}
});
Meteor.publish("dataSurveyUser", function() {
	let currentUserId = this.userId;
	let data = Data.Survey.find({
		userId: currentUserId
	}, {
		fields: {
			'userId': 1
		}
	});
	if (data) {
		return data;
	}
	return this.ready();
});
Meteor.publish("userStatus", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		let data = Data.Status.find({});
		if (data) {
			return data;
		}
		return this.ready();
	} else {
		// user not authorized. do not publish secrets
		this.stop();
		return;
	}
});

Meteor.publish("feedback", function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		let data = Data.Feedback.find({});
		if (data) {
			return data;
		}
		return this.ready();
	} else {
		// user not authorized. do not publish secrets
		this.stop();
		return;
	}
});

//  search query
Meteor.publish('vocabularyRegister', function(search) {
	check(search, Match.OneOf(String, null, undefined));
	let query = {},
		projection = {
			limit: 0,
			sort: {
				term: 1
			}
		};
	if (search) {
		let regex = new RegExp(search, 'i');
		query = {
			$or: [{
				term: regex
			}, {
				definition: regex
			}, {
				preposition: regex
			}, {
				wordClass: regex
			}]
		};
		projection.limit = 100;
	}
	return Vocabulary.find(query, projection);
});

Meteor.publish("vocabularyAll", function() {
	let data = Vocabulary.find({});
	if (data) {
		return data;
	}
	return this.ready();
});

Meteor.publish("ownedFavourites", function() {
	let currentUserId = this.userId;
	let data = Favourites.find({
		userId: currentUserId
	});
	if (data) {
		return data;
	}
	return this.ready();
});

Meteor.publish('termDay', function() {
	let currentUserId = this.userId;
	let data = TermDay.find({
		userId: currentUserId
	});
	if (data) {
		return data;
	}
	return this.ready();
});

Meteor.publish('singleEntry', function(entryId) {
	return Vocabulary.find({
		_id: entryId
	});
});

Meteor.publish('dataWords', function() {
	let data = Data.Words.find({}, {
		sort: {
			viewed: -1
		}
	});
	if (data) {
		return data;
	}
	return this.ready();
});

Meteor.publish('dataDetail', function() {
	if (Roles.userIsInRole(this.userId, ['admin'])) {
		let data = Data.Detail.find({});
		if (data) {
			return data;
		}
		return this.ready();
	} else {
		// user not authorized. do not publish secrets
		this.stop();
		return;
	}
});
