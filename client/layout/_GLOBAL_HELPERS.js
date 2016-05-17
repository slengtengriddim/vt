Meteor.subscribe("dataSurveyUser");
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
	let query = Data.Survey.findOne({
		userId: Meteor.userId()
	}, {
		fields: {
			'userId': 1
		}
	});
	if (query) {
		return true;
	} else {
		return false;
	}
});
Template.registerHelper("lengthIsOne", function() {
	if ((Session.get(NAV_SOURCE_FAV) && Session.get(LENGTH_FAV) <= 1) ||
		(Session.get(NAV_SOURCE_NOT_FAV) && Session.get(LENGTH_NOT_FAV) <= 1)) {
		return true;
	} else {
		return false;
	}
});
Template.registerHelper("isFav", function(vocabularyId) {
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
	let currentUserId = Meteor.userId();
	let favIds = R.pluck('vocabularyId')(Favourites.find({
		userId: currentUserId
	}).fetch());
	let all = Vocabulary.find().fetch();
	let fav = Vocabulary.find({
		_id: {
			$in: favIds
		}
	}).fetch();
	let notFav = Vocabulary.find({
		_id: {
			$nin: favIds
		}
	}).fetch();

	if (Session.get(NAV_SOURCE_FAV)) {
		return fav[Session.get(INDEX_BROWSE)];
	} else if (Session.get(NAV_SOURCE_NOT_FAV)) {
		return notFav[Session.get(INDEX_BROWSE)];
	} else {
		return all[Session.get(INDEX_BROWSE)];
	}
});

// NAV SOURCE
Template.registerHelper("source", function() {
	if (Session.get(SOURCE_FAV)) {
		return "Favoriten";
	} else {
		return "Alle";
	}
});

Template.registerHelper("convertIndex", function(index) {
	return index + 1;
});
