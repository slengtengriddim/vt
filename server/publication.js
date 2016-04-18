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

Meteor.publish('singleEntry', function(entryId) {
	return Vocabulary.find({
		_id: entryId
	});
});

Meteor.publish('dataViewedAll', function() {
	let data = Data.Viewed.All.find({}, {
		limit: 5,
		sort: {
			timesViewed: -1
		}
	});
	if (data) {
		return data;
	}
	return this.ready();
});
Meteor.publish('dataViewedUser', function() {
	let data = Data.Viewed.User.find({
		userId: this.userId
	}, {
		limit: 5,
		sort: {
			timesViewed: -1
		}
	});
	if (data) {
		return data;
	}
	return this.ready();
});
Meteor.publish('dataFavHigh', function() {
	let data = Data.Fav.High.find({});
	if (data) {
		return data;
	}
	return this.ready();
});
Meteor.publish('dataFavLow', function() {
	let data = Data.Fav.Low.find({});
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


// Meteor.publish("booksByAuthor", function () {
//   ReactiveAggregate(this, Books, [{
//     $mode: "wort"
//   }]);
// });

// Meteor.publish('people', function() {
// 	let data = People.find({});
// 	if (data) {
// 		return data;
// 	}
// 	return this.ready();
// });
