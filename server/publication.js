Meteor.publish("user", function() {
  return Meteor.users.find({});
});
Meteor.publish("userExt", function() {
	let currentUserId = this.userId;
	let data = UserExt.find({userId: this.userId});
	if (data) {
		return data;
	}
	return this.ready();
});
Meteor.publish("userExtAll", function() {
	let currentUserId = this.userId;
	let data = UserExt.find({});
	if (data) {
		return data;
	}
	return this.ready();
});
Meteor.publish("userStatus", function() {
	let data = Data.Status.find({});
	if (data) {
		return data;
	}
	return this.ready();
});
Meteor.publish("feedback", function() {
	let data = Data.Feedback.find({});
	if (data) {
		return data;
	}
	return this.ready();
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
				description: regex
			}]
		};
		projection.limit = 0;
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
	let data = Data.Detail.find({});
	if (data) {
		return data;
	}
	return this.ready();
});
