Template.layoutTrainer.onCreated(function() {
	this.autorun(() => {
		this.subscribe('vocabularyAll'); // Vocabulary.find()
		this.subscribe('ownedFavourites'); // Favourites.find()

		Session.set(LENGTH_FAV, Favourites.find().count());
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());
	});
});

//  Session variables

ATTENTION_MODE = 'attentionMode';
Session.setDefault(ATTENTION_MODE, false);

LAST_PATH = 'lastPath';
Session.setDefault(LAST_PATH, '/');

LAST_PATH_TRAINER = 'lastPathTrainer';
Session.setDefault(LAST_PATH_TRAINER, '/trainer/lesen');

RANDOM_FAV = 'randomFavourites';
Session.setDefault(RANDOM_FAV, false);

RANDOM_NOT_FAV = 'randomNotFavourites';
Session.setDefault(RANDOM_NOT_FAV, true);

LENGTH_FAV = 'lengthFav';
Session.setDefault(LENGTH_FAV, 0);

LENGTH_NOT_FAV = 'lengthNotFav';
Session.setDefault(LENGTH_NOT_FAV, 0);

COUNT_VIEWED = 'countViewed';
Session.setDefault(COUNT_VIEWED, 0);

REVEALED = 'revealed';
Session.setDefault(REVEALED, false);

TERM_MODE = 'termMode';
Session.setDefault(TERM_MODE, true);

TERM_WRONG = 'termWrong';
Session.setDefault(TERM_WRONG, false);

TERM_RIGHT = 'termRight';
Session.setDefault(TERM_RIGHT, false);

TERM_CACHE = 'termCache';
Session.setDefault(TERM_CACHE, '');

COUNT_LETTERS_MATCH = 'countLettersMatch';
Session.setDefault(COUNT_LETTERS_MATCH, 0);

// Global helpers

// e.g. {{getSession "posX"}} in Template
Template.registerHelper('getSession', function(key) {
	return Session.get(key);
});
Template.registerHelper('userMail', function() {
	return Meteor.user().emails[0].address;
});
Template.registerHelper('isOwner', function() {
	return this.userId == Meteor.userId();
});
Template.registerHelper("lengthIsOne", function() {
	return (Session.get(LENGTH_FAV) === 1) && Session.get(RANDOM_FAV) ||
		(Session.get(LENGTH_NOT_FAV) === 1) && Session.get(RANDOM_NOT_FAV);
});
Template.registerHelper("entry", function() {
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
})
