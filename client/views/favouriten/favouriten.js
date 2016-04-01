Template.favouriten.onCreated(function() {
	this.autorun(() => {
		this.subscribe('ownedFavourites');
		this.subscribe('vocabularyAll');
	});
});


Template.favouriten.helpers({
	favourites() {
		let favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());

		if (Favourites.find().count() !== 0) {
			return Vocabulary.find({
				_id: {
					$in: favIds
				}
			}, {
				sort: {
					term: 1
				}
			});
		} else {
			return null;
		}
	}
});

Template.favouriten.events({
	'click .btn-delete' (event, template) {

		Meteor.call('deleteFavourite', this._id);
	}
});
