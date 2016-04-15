Meteor.methods({
	deleteFavourite(vocabularyId) {
		check(vocabularyId, String);
		Favourites.remove({
			vocabularyId: vocabularyId
		});
	},
	insertFavourite(vocabularyId) {
		check(vocabularyId, String);
		Favourites.insert({
			vocabularyId: vocabularyId
		});
	},
	dataViewedUser(obj) {
		Data.Viewed.User.upsert({
			vocabularyId: obj._id,
			userId: this.userId
		}, {
			$setOnInsert: {
				vocabularyId: obj._id,
				userId: this.userId,
				vocabularyName: obj.term,
				timesViewed: 0
			},
			$inc: {
				timesViewed: 1
			}
		});
	},
	dataViewedAll(obj) {
		Data.Viewed.All.upsert({
			vocabularyId: obj._id
		}, {
			$setOnInsert: {
				vocabularyId: obj._id,
				vocabularyName: obj.term,
				timesViewed: 0
			},
			$inc: {
				timesViewed: 1
			}
		});
	},
	dataFavLow(timestamp) {
		Data.Fav.Low.upsert({
			x: timestamp
		}, {
			$setOnInsert: {
				x: timestamp,
				y: 0
			},
			$inc: {
				y: 1
			}
		});
	},
	dataFavHigh(timestamp) {
		Data.Fav.High.upsert({
			x: timestamp
		}, {
			$setOnInsert: {
				x: timestamp,
				y: 0
			},
			$inc: {
				y: 1
			}
		});
	},
	addPerson(lastPerson, age) {
		if (lastPerson) {
			People.insert({
				x: (lastPerson.x + 1),
				y: age
			});
		} else {
			People.insert({
				x: 1,
				y: age
			});
		}
	}
});
