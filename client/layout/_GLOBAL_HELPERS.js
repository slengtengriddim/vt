Meteor.subscribe("userExt");
// Global helpers

// e.g. {{getSession "posX"}} in Template
Template.registerHelper('getSession', function(key) {
	return Session.get(key);
});
Template.registerHelper('currentUserMail', function() {
	return Meteor.user().emails[0].address;
});
Template.registerHelper('isOwner', function() {
	return this.userId == Meteor.userId();
});
Template.registerHelper('surveySubmitted', function() {
	let query = UserExt.findOne({userId: Meteor.userId(), surveySubmitted: true});
	if (query) {
		return true;
	} else {
		return false;
	}
});
Template.registerHelper("lengthIsOne", function() {
	return (Session.get(LENGTH_FAV) === 1) && Session.get(SOURCE_FAV) ||
		(Session.get(LENGTH_NOT_FAV) === 1) && !Session.get(SOURCE_FAV);
});
Template.registerHelper("isFavourite", function(vocabularyId) {
	let favEntry = Favourites.findOne({
		vocabularyId: vocabularyId
	});
	if (favEntry) {
		return true;
	}
});
Template.registerHelper("favourites", function() {
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
});
Template.registerHelper("entry", function() {
	let currentUserId = this.userId;
	let favIds = R.pluck('vocabularyId')(Favourites.find().fetch());
	let vocabulary = [];

	if (Session.get(SOURCE_FAV)) {
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
});
