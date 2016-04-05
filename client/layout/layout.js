Template.trainerLesen.onCreated(function() {
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



// Global helpers

// e.g. {{getSession "posX"}} in Template
Template.registerHelper('getSession',function(key){
  return Session.get(key);
});
Template.registerHelper('userMail', function() {
  return Meteor.user().emails[0].address;
});
Template.registerHelper('isOwner', function() {
    return this.userId == Meteor.userId();
});
