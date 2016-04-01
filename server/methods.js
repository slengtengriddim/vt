Meteor.methods({
	toggleFavourite(vocabularyId) {

		if (Favourites.find({
				vocabularyId: vocabularyId,
				userId: this.userId
			}).count() === 0) {

			Favourites.insert({
				vocabularyId: vocabularyId
			});
		} else {
			Favourites.remove({
				vocabularyId: vocabularyId
			});
		}
	},
	deleteFavourite(vocabularyId) {
		let favEntry = Favourites.findOne({
			vocabularyId: vocabularyId
		});

		Favourites.remove(favEntry._id);
	}
});
