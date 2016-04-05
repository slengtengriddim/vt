Template.trainerLesen.onCreated(function() {
	this.autorun(() => {
		this.subscribe('vocabularyAll');
		this.subscribe('ownedFavourites');
	});
});

Template.trainerLesen.helpers({
	entry() {
		let currentUserId = this.userId;
		let favIds = R.pluck('vocabularyId')(Favourites.find().fetch());
		let vocabulary = [];

		if (Session.get('randomFavourites')) {
			vocabulary = Vocabulary.find({
				_id: {
					$in: favIds
				}
			}).fetch();
		} else {
			vocabulary = Vocabulary.find({
				_id: {
					$nin: favIds
				}
			}).fetch();
		}
		return vocabulary[Session.get(COUNT_VIEWED)];
	},
	countViewed() {
		return Session.get(COUNT_VIEWED);
	},
	lengthIsOne() {
		return (Session.get(LENGTH_FAV) === 1) && Session.get(RANDOM_FAV) ||
		(Session.get(LENGTH_NOT_FAV) === 1) && Session.get(RANDOM_NOT_FAV);
	}
});

Template.trainerLesen.events({
	'click .btn-backward' (event, template) {
		let val = 0;
		if (Session.get(RANDOM_FAV)) {
			// to avoid going into negative numbers
			if (Session.get(COUNT_VIEWED) === 0) {
				val = Session.get(LENGTH_FAV) - 1;
				Session.set(COUNT_VIEWED, val);
			} else {
				val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_FAV);
				Session.set(COUNT_VIEWED, val);
			}

		} else {
			if (Session.get(COUNT_VIEWED) === 0) {
				val = Session.get(LENGTH_NOT_FAV) - 1;
				Session.set(COUNT_VIEWED, val);
			} else {
				val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_NOT_FAV);
				Session.set(COUNT_VIEWED, val);
			}
		}
	},

	'click .btn-forward' (event, template) {
		let val = 0;
		if (Session.get(RANDOM_FAV)) {
			val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
			Session.set(COUNT_VIEWED, val);
		} else {
			val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);
			Session.set(COUNT_VIEWED, val);
		}
	},

	'click .btn-fav' (event, template) {
		Meteor.call('toggleFavourite', this._id);

// reset the COUNT VIEW when a list entry has been removed
		if (Session.get(RANDOM_NOT_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {
			let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);
			Session.set(COUNT_VIEWED, val);
		}

		if (Session.get(LENGTH_NOT_FAV) === 1) {
			Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));
			Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV))
		}
	},

	'click .btn-delete' (event, template) {
		Meteor.call('deleteFavourite', this._id);

		if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {
			let val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);
			Session.set(COUNT_VIEWED, val);
		}
		if (Session.get(LENGTH_FAV) === 1) {
			Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));
			Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV))
		}
	}
});
