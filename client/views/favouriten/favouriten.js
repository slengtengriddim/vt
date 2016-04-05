Template.favouriten.onCreated(function() {
	this.autorun(() => {
		this.subscribe('ownedFavourites');
		this.subscribe('vocabularyFavourised');

		Session.set(LENGTH_FAV, Favourites.find().count());
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());
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

		if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {
			let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
			Session.set(COUNT_VIEWED, val);
		}
		// set random bar buttons to non fav list if the last entry in fav list has been removed via fav menu
		if ((Session.get(LENGTH_FAV) === 1)) {
			Session.set(RANDOM_FAV, false);
			Session.set(RANDOM_NOT_FAV, true);
		}
	}
});
