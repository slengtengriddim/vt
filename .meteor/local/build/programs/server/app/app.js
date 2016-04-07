var require = meteorInstall({"server":{"lib":{"config":{"accounts.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// server/lib/config/accounts.js                                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
                                                                                    //
Meteor.startup(function () {});                                                     // 2
//////////////////////////////////////////////////////////////////////////////////////

},"email.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// server/lib/config/email.js                                                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
                                                                                    //
// Accounts.emailTemplates.siteName = "MySite";                                     //
//                                                                                  //
// Accounts.emailTemplates.from = "MySite <support@mysite.com>";                    //
//                                                                                  //
// Accounts.emailTemplates.resetPassword.subject = function (user) {                //
//     return "Message for " + user.profile.displayName;                            //
// };                                                                               //
//                                                                                  //
// Accounts.emailTemplates.resetPassword.text = function (user, url) {              //
//     var signature = "MySite Bot";                                                //
//     //var president = President.findOne();                                       //
//     //if (president)                                                             //
//     //    president = Meteor.users.findOne(president.presidentId);               //
//     //    signature = president.profile.displayName + ", the MySite President.";
//                                                                                  //
//     return "Dear " + user.profile.displayName + ",\n\n" +                        //
//         "Click the following link to set your new password:\n" +                 //
//         url + "\n\n" +                                                           //
//         "Please never forget it again!!!\n\n\n" +                                //
//         "Cheers,\n" +                                                            //
//         signature;                                                               //
// };                                                                               //
//////////////////////////////////////////////////////////////////////////////////////

}}},"methods.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// server/methods.js                                                                //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Meteor.methods({                                                                    // 1
	toggleFavourite: function () {                                                     // 2
		function toggleFavourite(vocabularyId) {                                          //
                                                                                    //
			if (Favourites.find({                                                            // 4
				vocabularyId: vocabularyId,                                                     // 5
				userId: this.userId                                                             // 6
			}).count() === 0) {                                                              //
                                                                                    //
				Favourites.insert({                                                             // 9
					vocabularyId: vocabularyId                                                     // 10
				});                                                                             //
			} else {                                                                         //
				Favourites.remove({                                                             // 13
					vocabularyId: vocabularyId                                                     // 14
				});                                                                             //
			}                                                                                //
		}                                                                                 //
                                                                                    //
		return toggleFavourite;                                                           //
	}(),                                                                               //
	deleteFavourite: function () {                                                     // 18
		function deleteFavourite(vocabularyId) {                                          //
			var favEntry = Favourites.findOne({                                              // 19
				vocabularyId: vocabularyId                                                      // 20
			});                                                                              //
                                                                                    //
			Favourites.remove(favEntry._id);                                                 // 23
		}                                                                                 //
                                                                                    //
		return deleteFavourite;                                                           //
	}()                                                                                //
});                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////

},"publication.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// server/publication.js                                                            //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Meteor.publish('vocabularyRegister', function (search) {                            // 1
	check(search, Match.OneOf(String, null, undefined));                               // 2
                                                                                    //
	var query = {},                                                                    // 4
	    projection = {                                                                 //
		limit: 0,                                                                         // 6
		sort: {                                                                           // 7
			term: 1                                                                          // 8
		}                                                                                 //
	};                                                                                 //
                                                                                    //
	if (search) {                                                                      // 12
		var regex = new RegExp(search, 'i');                                              // 13
		query = {                                                                         // 14
			$or: [{                                                                          // 15
				term: regex                                                                     // 16
			}, {                                                                             //
				description: regex                                                              // 18
			}]                                                                               //
		};                                                                                //
		projection.limit = 0;                                                             // 21
	}                                                                                  //
	return Vocabulary.find(query, projection);                                         // 23
});                                                                                 //
                                                                                    //
Meteor.publish("vocabularyAll", function () {                                       // 26
	var data = Vocabulary.find({});                                                    // 27
	if (data) {                                                                        // 28
		return data;                                                                      // 29
	}                                                                                  //
	return this.ready();                                                               // 31
});                                                                                 //
                                                                                    //
Meteor.publish("vocabularyFavourised", function () {                                // 34
	var currentUserId = this.userId;                                                   // 35
	var favIds = R.pluck('vocabularyId')(Favourites.find({                             // 36
		userId: currentUserId                                                             // 37
	}).fetch());                                                                       //
                                                                                    //
	return Vocabulary.find({                                                           // 40
		_id: {                                                                            // 41
			$in: favIds                                                                      // 42
		}                                                                                 //
	}, {                                                                               //
		sort: {                                                                           // 45
			term: 1                                                                          // 46
		}                                                                                 //
	});                                                                                //
});                                                                                 //
                                                                                    //
Meteor.publish("vocabularyWithoutFavourised", function () {                         // 51
	var currentUserId = this.userId;                                                   // 52
	var favIds = R.pluck('vocabularyId')(Favourites.find({                             // 53
		userId: currentUserId                                                             // 54
	}).fetch());                                                                       //
	var data = Vocabulary.find({                                                       // 56
		_id: {                                                                            // 57
			$nin: favIds                                                                     // 58
		}                                                                                 //
	});                                                                                //
                                                                                    //
	if (data) {                                                                        // 62
		return data;                                                                      // 63
	}                                                                                  //
	return this.ready();                                                               // 65
});                                                                                 //
                                                                                    //
Meteor.publish("ownedFavourites", function () {                                     // 68
	var currentUserId = this.userId;                                                   // 69
	var data = Favourites.find({                                                       // 70
		userId: currentUserId                                                             // 71
	});                                                                                //
	if (data) {                                                                        // 73
		return data;                                                                      // 74
	}                                                                                  //
	return this.ready();                                                               // 76
});                                                                                 //
                                                                                    //
Meteor.publish('singleEntry', function (entryId) {                                  // 79
	return Vocabulary.find({                                                           // 80
		_id: entryId                                                                      // 81
	});                                                                                //
});                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////

},"vocabularySeed.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// server/vocabularySeed.js                                                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Meteor.startup(function () {                                                        // 1
                                                                                    //
	if (Vocabulary.find().count() === 0) {                                             // 3
		for (var i = 0; i < 10; i++) {                                                    // 4
			Vocabulary.insert({                                                              // 5
				term: Fake.word(),                                                              // 6
				description: Fake.sentence([24])                                                // 7
			});                                                                              //
		}                                                                                 //
	};                                                                                 //
});                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////

}},"common":{"aux":{"aux.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/aux/aux.js                                                                //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
(function (exports) {                                                               // 1
    /**                                                                             //
    * Randomize array element order in-place.                                       //
    * Using Durstenfeld shuffle algorithm.                                          //
    */                                                                              //
    exports.shuffle = function (array) {                                            // 6
        for (var i = array.length - 1; i > 0; i--) {                                // 7
            var j = Math.floor(Math.random() * (i + 1));                            // 8
            var temp = array[i];                                                    // 9
            array[i] = array[j];                                                    // 10
            array[j] = temp;                                                        // 11
        }                                                                           //
        return array;                                                               // 13
    };                                                                              //
})(this.Aux = {});                                                                  //
//////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/aux/validation.js                                                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
(function (exports) {                                                               // 1
	exports.isAlphabetic = function (value) {                                          // 2
		var filter = /^[a-zA-Z]+$/;                                                       // 3
		if (filter.test(value)) {                                                         // 4
			return true;                                                                     // 5
		}                                                                                 //
		return false;                                                                     // 7
	};                                                                                 //
                                                                                    //
	exports.isLength64 = function (value) {                                            // 10
		if (value.length < 65) {                                                          // 11
			return true;                                                                     // 12
		}                                                                                 //
		return false;                                                                     // 14
	};                                                                                 //
})(this.Validate = {});                                                             //
//////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"favourites.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/collections/favourites.js                                                 //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var FavouritesSchema = new SimpleSchema({                                           // 1
  userId: {                                                                         // 2
    type: String,                                                                   // 3
    autoValue: function () {                                                        // 4
      function autoValue() {                                                        // 4
        return this.userId;                                                         // 5
      }                                                                             //
                                                                                    //
      return autoValue;                                                             //
    }()                                                                             //
  },                                                                                //
  vocabularyId: {                                                                   // 8
    type: String                                                                    // 9
  },                                                                                //
  createdAt: {                                                                      // 11
    type: Date,                                                                     // 12
    autoValue: function () {                                                        // 13
      function autoValue() {                                                        // 13
        return new Date();                                                          // 14
      }                                                                             //
                                                                                    //
      return autoValue;                                                             //
    }(),                                                                            //
    autoform: {                                                                     // 16
      type: "hidden"                                                                // 17
    }                                                                               //
  }                                                                                 //
});                                                                                 //
                                                                                    //
Favourites = new Mongo.Collection('favourites', {});                                // 22
Favourites.attachSchema(FavouritesSchema);                                          // 23
//////////////////////////////////////////////////////////////////////////////////////

},"local.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/collections/local.js                                                      //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////

},"viewed.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/collections/viewed.js                                                     //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var ViewedSchema = new SimpleSchema({                                               // 1
	userId: {                                                                          // 2
		type: String,                                                                     // 3
		autoValue: function () {                                                          // 4
			function autoValue() {                                                           // 4
				return this.userId;                                                             // 5
			}                                                                                //
                                                                                    //
			return autoValue;                                                                //
		}()                                                                               //
	},                                                                                 //
	vocabularyId: {                                                                    // 8
		type: String                                                                      // 9
	},                                                                                 //
	createdAt: {                                                                       // 11
		type: Date,                                                                       // 12
		autoValue: function () {                                                          // 13
			function autoValue() {                                                           // 13
				return new Date();                                                              // 14
			}                                                                                //
                                                                                    //
			return autoValue;                                                                //
		}(),                                                                              //
		autoform: {                                                                       // 16
			type: "hidden"                                                                   // 17
		}                                                                                 //
	},                                                                                 //
	timesViewed: {                                                                     // 20
		type: Number,                                                                     // 21
		defaultValue: 0                                                                   // 22
	}                                                                                  //
	// link to page the word was looked up from                                        //
});                                                                                 // 1
                                                                                    //
Viewed = new Mongo.Collection('viewed', {});                                        // 27
Viewed.attachSchema(ViewedSchema);                                                  // 28
//////////////////////////////////////////////////////////////////////////////////////

},"vocabulary.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/collections/vocabulary.js                                                 //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
Vocabulary = new Mongo.Collection('vocabulary', {});                                // 1
                                                                                    //
if (Meteor.isServer) {                                                              // 3
	Vocabulary._ensureIndex({                                                          // 4
		term: 1,                                                                          // 5
		description: 1                                                                    // 6
	});                                                                                //
}                                                                                   //
                                                                                    //
Vocabulary.allow({                                                                  // 10
	insert: function () {                                                              // 11
		function insert() {                                                               // 11
			return false;                                                                    //
		}                                                                                 //
                                                                                    //
		return insert;                                                                    //
	}(),                                                                               //
	update: function () {                                                              // 12
		function update() {                                                               // 12
			return false;                                                                    //
		}                                                                                 //
                                                                                    //
		return update;                                                                    //
	}(),                                                                               //
	remove: function () {                                                              // 13
		function remove() {                                                               // 13
			return false;                                                                    //
		}                                                                                 //
                                                                                    //
		return remove;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
Vocabulary.deny({                                                                   // 16
	insert: function () {                                                              // 17
		function insert() {                                                               // 17
			return true;                                                                     //
		}                                                                                 //
                                                                                    //
		return insert;                                                                    //
	}(),                                                                               //
	update: function () {                                                              // 18
		function update() {                                                               // 18
			return true;                                                                     //
		}                                                                                 //
                                                                                    //
		return update;                                                                    //
	}(),                                                                               //
	remove: function () {                                                              // 19
		function remove() {                                                               // 19
			return true;                                                                     //
		}                                                                                 //
                                                                                    //
		return remove;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
var VocabularySchema = new SimpleSchema({                                           // 22
	term: {                                                                            // 23
		type: String,                                                                     // 24
		regEx: /^[a-zA-Z]+$/                                                              // 25
	},                                                                                 //
	description: {                                                                     // 27
		type: String                                                                      // 28
	}                                                                                  //
});                                                                                 //
                                                                                    //
Vocabulary.attachSchema(VocabularySchema);                                          // 32
//////////////////////////////////////////////////////////////////////////////////////

}},"config":{"accounts_t9n.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/config/accounts_t9n.js                                                    //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
T9n.setLanguage('de');                                                              // 1
//////////////////////////////////////////////////////////////////////////////////////

},"at_config.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/config/at_config.js                                                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
// Options                                                                          //
AccountsTemplates.configure({                                                       // 2
  defaultLayout: 'layoutSlim',                                                      // 3
  defaultLayoutRegions: {                                                           // 4
    footer: 'footer'                                                                // 5
  },                                                                                //
  defaultContentRegion: 'main',                                                     // 7
  showForgotPasswordLink: false,                                                    // 8
  overrideLoginErrors: true,                                                        // 9
  enablePasswordChange: true,                                                       // 10
                                                                                    //
  // sendVerificationEmail: true,                                                   //
  // enforceEmailVerification: true,                                                //
  //confirmPassword: true,                                                          //
  //continuousValidation: false,                                                    //
  //displayFormLabels: true,                                                        //
  //forbidClientAccountCreation: true,                                              //
  //formValidationFeedback: true,                                                   //
  // homeRoutePath: '/',                                                            //
  // showAddRemoveServices: false,                                                  //
  //showPlaceholders: true,                                                         //
                                                                                    //
  negativeValidation: true,                                                         // 23
  positiveValidation: true,                                                         // 24
  negativeFeedback: false,                                                          // 25
  positiveFeedback: true                                                            // 26
                                                                                    //
});                                                                                 //
                                                                                    //
// Privacy Policy and Terms of Use                                                  //
//privacyUrl: 'privacy',                                                            //
//termsUrl: 'terms-of-use',                                                         //
var logout = function logout() {                                                    // 33
  //example redirect after logout                                                   //
  FlowRouter.go('/sign-in');                                                        // 35
};                                                                                  //
                                                                                    //
AccountsTemplates.configure({                                                       // 38
  onLogoutHook: logout                                                              // 39
});                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////

}},"router":{"routes.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/router/routes.js                                                          //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
// *** ROUTE FUNCTIONS                                                              //
                                                                                    //
checkAttentionModeOff = function checkAttentionModeOff() {                          // 3
	if (Session.get(ATTENTION_MODE)) {                                                 // 4
		Session.set(ATTENTION_MODE, false);                                               // 5
	}                                                                                  //
};                                                                                  //
                                                                                    //
checkAttentionModeOn = function checkAttentionModeOn() {                            // 9
	if (!Session.get(ATTENTION_MODE)) {                                                // 10
		Session.set(ATTENTION_MODE, true);                                                // 11
	}                                                                                  //
};                                                                                  //
                                                                                    //
setTrainerPath = function setTrainerPath() {                                        // 15
	Session.set(LAST_PATH_TRAINER, FlowRouter.current().route.path);                   // 16
};                                                                                  //
                                                                                    //
resetSession = function resetSession() {                                            // 19
	Session.set(REVEALED, false);                                                      // 20
	Session.set(TERM_WRONG, false);                                                    // 21
};                                                                                  //
                                                                                    //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                      // 24
                                                                                    //
// *** ROUTE GROUPS                                                                 //
                                                                                    //
var lowRoutes = FlowRouter.group({                                                  // 28
	name: "low",                                                                       // 29
	triggersEnter: [checkAttentionModeOn],                                             // 30
	triggersExit: []                                                                   // 31
});                                                                                 //
var basicRoutes = FlowRouter.group({                                                // 33
	name: "basic",                                                                     // 34
	triggersEnter: [checkAttentionModeOff],                                            // 35
	triggersExit: []                                                                   // 36
});                                                                                 //
                                                                                    //
basicRoutes.trainerRoutes = FlowRouter.group({                                      // 39
	name: "trainer",                                                                   // 40
	triggersEnter: [setTrainerPath],                                                   // 41
	triggersExit: [resetSession]                                                       // 42
});                                                                                 //
                                                                                    //
// *** ROUTES                                                                       //
                                                                                    //
basicRoutes.route('/', {                                                            // 47
	name: "index",                                                                     // 48
	action: function () {                                                              // 49
		function action(params, queryParams) {                                            // 49
			BlazeLayout.render('layoutBasic', {                                              // 50
				bar: "bar",                                                                     // 51
				nav: "nav",                                                                     // 52
				main: "index"                                                                   // 53
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/favouriten', {                                                  // 57
	name: "favouriten",                                                                // 58
	action: function () {                                                              // 59
		function action(params, queryParams) {                                            // 59
			BlazeLayout.render('layoutBasic', {                                              // 60
				bar: "bar",                                                                     // 61
				nav: "nav",                                                                     // 62
				main: "favouriten"                                                              // 63
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/trainer', {                                                     // 67
	name: "trainer",                                                                   // 68
	action: function () {                                                              // 69
		function action(params, queryParams) {                                            // 69
			FlowRouter.go(Session.get('lastPathTrainer'));                                   // 70
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.trainerRoutes.route('/trainer/lesen', {                                 // 73
	name: "trainerLesen",                                                              // 74
	action: function () {                                                              // 75
		function action(params, queryParams) {                                            // 75
			BlazeLayout.render('layoutTrainer', {                                            // 76
				bar: "bar",                                                                     // 77
				nav: "nav",                                                                     // 78
				navTrainer: "navTrainer",                                                       // 79
				main: "trainerLesen",                                                           // 80
				navRandom: "navRandom"                                                          // 81
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.trainerRoutes.route('/trainer/eingabe', {                               // 85
	name: "trainerEingabe",                                                            // 86
	action: function () {                                                              // 87
		function action(params, queryParams) {                                            // 87
			BlazeLayout.render('layoutTrainer', {                                            // 88
				bar: "bar",                                                                     // 89
				nav: "nav",                                                                     // 90
				navTrainer: "navTrainer",                                                       // 91
				main: "trainerEingabe",                                                         // 92
				navRandom: "navRandom"                                                          // 93
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.trainerRoutes.route('/trainer/wort', {                                  // 97
	name: "trainerWort",                                                               // 98
	action: function () {                                                              // 99
		function action(params, queryParams) {                                            // 99
			BlazeLayout.render('layoutTrainer', {                                            // 100
				bar: "bar",                                                                     // 101
				nav: "nav",                                                                     // 102
				navTrainer: "navTrainer",                                                       // 103
				main: "trainerWort",                                                            // 104
				navRandom: "navRandom"                                                          // 105
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.trainerRoutes.route('/trainer/bedeutung', {                             // 109
	name: "trainerBedeutung",                                                          // 110
	action: function () {                                                              // 111
		function action(params, queryParams) {                                            // 111
			BlazeLayout.render('layoutTrainer', {                                            // 112
				bar: "bar",                                                                     // 113
				nav: "nav",                                                                     // 114
				navTrainer: "navTrainer",                                                       // 115
				main: "trainerBedeutung",                                                       // 116
				navRandom: "navRandom"                                                          // 117
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
basicRoutes.route('/vokabelregister', {                                             // 122
	name: "vokabelregister",                                                           // 123
	action: function () {                                                              // 124
		function action(params, queryParams) {                                            // 124
			BlazeLayout.render('layoutBasic', {                                              // 125
				bar: "bar",                                                                     // 126
				nav: "nav",                                                                     // 127
				main: "vokabelregister"                                                         // 128
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/vokabelregister/:id', {                                         // 132
	name: "vokabelDetail",                                                             // 133
	action: function () {                                                              // 134
		function action(params, queryParams) {                                            // 134
			console.log(params);                                                             // 135
			BlazeLayout.render('layoutBasic', {                                              // 136
				bar: "bar",                                                                     // 137
				nav: "nav",                                                                     // 138
				main: "vokabelDetail"                                                           // 139
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
lowRoutes.route('/low', {                                                           // 145
	name: "indexLow",                                                                  // 146
	action: function () {                                                              // 147
		function action(params, queryParams) {                                            // 147
			BlazeLayout.render('layoutBasic', {                                              // 148
				bar: "bar",                                                                     // 149
				main: "indexLow"                                                                // 150
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}(),                                                                               //
	triggersEnter: [function (context, redirect) {}]                                   // 153
});                                                                                 //
                                                                                    //
FlowRouter.notFound = {                                                             // 156
	action: function () {                                                              // 157
		function action() {                                                               // 157
			BlazeLayout.render('layoutSlim', {                                               // 158
				footer: "footer",                                                               // 159
				main: "pageNotFound"                                                            // 160
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
};                                                                                  //
                                                                                    //
//Routes                                                                            //
AccountsTemplates.configureRoute('changePwd');                                      // 167
// AccountsTemplates.configureRoute('forgotPwd');                                   //
AccountsTemplates.configureRoute('resetPwd');                                       // 169
AccountsTemplates.configureRoute('signIn');                                         // 170
AccountsTemplates.configureRoute('signUp');                                         // 171
// AccountsTemplates.configureRoute('verifyEmail');                                 //
//////////////////////////////////////////////////////////////////////////////////////

}}}},{"extensions":[".js",".json"]});
require("./server/lib/config/accounts.js");
require("./server/lib/config/email.js");
require("./common/aux/aux.js");
require("./common/aux/validation.js");
require("./common/collections/favourites.js");
require("./common/collections/local.js");
require("./common/collections/viewed.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/at_config.js");
require("./common/router/routes.js");
require("./server/methods.js");
require("./server/publication.js");
require("./server/vocabularySeed.js");
//# sourceMappingURL=app.js.map
