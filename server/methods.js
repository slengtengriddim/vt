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
	dataWords(obj) {
		Data.Words.upsert({
			vocabularyId: obj._id,
			userId: this.userId
		}, {
			$setOnInsert: {
				vocabularyId: obj._id,
				userId: this.userId,
				vocabularyName: obj.term,
				viewed: 0
			},
			$inc: {
				viewed: 1
			}
		});
	},
	dataDetail(deviceType, devicePlatform, route, clickArea, mode, attention) {
		Data.Detail.insert({
			deviceType: deviceType,
			devicePlatform: devicePlatform,
			route: route,
			clickArea: clickArea,
			mode: mode,
			attention: attention
		})
	},
	surveySubmitted() {
		UserExt.upsert({
			userId: this.userId
		}, {
			$setOnInsert: {
				userId: this.userId,
				surveySubmitted: true
			}
		});
	}

});
