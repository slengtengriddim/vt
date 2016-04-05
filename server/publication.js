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

Meteor.publish("vocabularyFavourised", function() {
	let currentUserId = this.userId;
	let favIds = R.pluck('vocabularyId')(Favourites.find({
		userId: currentUserId
	}).fetch());

	return Vocabulary.find({
		_id: {
			$in: favIds
		}
	}, {
		sort: {
			term: 1
		}
	});
});

Meteor.publish("vocabularyWithoutFavourised", function() {
	let currentUserId = this.userId;
	let favIds = R.pluck('vocabularyId')(Favourites.find({
		userId: currentUserId
	}).fetch());
	let data = Vocabulary.find({
		_id: {
			$nin: favIds
		}
	});

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

Meteor.publish('singleEntry', function(entryId) {
	return Vocabulary.find({
		_id: entryId
	});
});
