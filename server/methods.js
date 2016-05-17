Meteor.methods({
	deleteFavourite(vocabularyId) {
		check(vocabularyId, String);
		Favourites.remove({
			vocabularyId: vocabularyId
		});
	},
	insertFavourite(vocabularyId) {
		check(vocabularyId, String);
		Favourites.upsert({
			vocabularyId: vocabularyId
		}, {
			$setOnInsert: {
				vocabularyId: vocabularyId
			}
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
	dataDetail(deviceType, devicePlatform, route, mode, settingsTrainer, heartClicked) {
		// console.log(deviceType);
		// console.log(devicePlatform);
		// console.log(route);
		// console.log(mode);
		// console.log(attention);
		// console.log(settingsTrainer);

		Data.Detail.insert({
			deviceType: deviceType,
			devicePlatform: devicePlatform,
			route: route,
			mode: mode,
			settingsTrainer: settingsTrainer,
			heartClicked: heartClicked
		})
	}
});
