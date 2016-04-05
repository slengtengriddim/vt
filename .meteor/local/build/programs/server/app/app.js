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

},"validation.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/aux/validation.js                                                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
isAlphabetic = function isAlphabetic(value) {                                       // 1
  var filter = /^[A-Za-z\s]+$/;                                                     // 2
  if (filter.test(value)) {                                                         // 3
    return true;                                                                    // 4
  }                                                                                 //
  return false;                                                                     // 6
};                                                                                  //
                                                                                    //
isLength64 = function isLength64(value) {                                           // 9
  if (value.length < 65) {                                                          // 10
    return true;                                                                    // 11
  }                                                                                 //
  return false;                                                                     // 13
};                                                                                  //
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
	Session.set('lastPathTrainer', FlowRouter.current().route.path);                   // 16
};                                                                                  //
                                                                                    //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                      // 19
                                                                                    //
// *** ROUTE GROUPS                                                                 //
                                                                                    //
var lowRoutes = FlowRouter.group({                                                  // 23
	name: "low",                                                                       // 24
	triggersEnter: [checkAttentionModeOn],                                             // 25
	triggersExit: []                                                                   // 26
});                                                                                 //
var basicRoutes = FlowRouter.group({                                                // 28
	name: "basic",                                                                     // 29
	triggersEnter: [checkAttentionModeOff],                                            // 30
	triggersExit: []                                                                   // 31
});                                                                                 //
                                                                                    //
basicRoutes.trainerRoutes = FlowRouter.group({                                      // 34
	name: "trainer",                                                                   // 35
	triggersEnter: [setTrainerPath],                                                   // 36
	triggersExit: []                                                                   // 37
});                                                                                 //
                                                                                    //
// *** ROUTES                                                                       //
                                                                                    //
basicRoutes.route('/', {                                                            // 42
	name: "index",                                                                     // 43
	action: function () {                                                              // 44
		function action(params, queryParams) {                                            // 44
			BlazeLayout.render('layoutBasic', {                                              // 45
				bar: "bar",                                                                     // 46
				nav: "nav",                                                                     // 47
				main: "index"                                                                   // 48
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/favouriten', {                                                  // 52
	name: "favouriten",                                                                // 53
	action: function () {                                                              // 54
		function action(params, queryParams) {                                            // 54
			BlazeLayout.render('layoutBasic', {                                              // 55
				bar: "bar",                                                                     // 56
				nav: "nav",                                                                     // 57
				main: "favouriten"                                                              // 58
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/trainer', {                                                     // 62
	name: "trainer",                                                                   // 63
	action: function () {                                                              // 64
		function action(params, queryParams) {                                            // 64
			FlowRouter.go(Session.get('lastPathTrainer'));                                   // 65
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.trainerRoutes.route('/trainer/lesen', {                                 // 68
	name: "trainerLesen",                                                              // 69
	action: function () {                                                              // 70
		function action(params, queryParams) {                                            // 70
			BlazeLayout.render('layoutTrainer', {                                            // 71
				bar: "bar",                                                                     // 72
				nav: "nav",                                                                     // 73
				navTrainer: "navTrainer",                                                       // 74
				main: "trainerLesen",                                                           // 75
				navRandom: "navRandom"                                                          // 76
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.trainerRoutes.route('/trainer/eingabe', {                               // 80
	name: "trainerEingabe",                                                            // 81
	action: function () {                                                              // 82
		function action(params, queryParams) {                                            // 82
			BlazeLayout.render('layoutTrainer', {                                            // 83
				bar: "bar",                                                                     // 84
				nav: "nav",                                                                     // 85
				navTrainer: "navTrainer",                                                       // 86
				main: "trainerEingabe",                                                         // 87
				navRandom: "navRandom"                                                          // 88
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.trainerRoutes.route('/trainer/wort', {                                  // 92
	name: "trainerWort",                                                               // 93
	action: function () {                                                              // 94
		function action(params, queryParams) {                                            // 94
			BlazeLayout.render('layoutTrainer', {                                            // 95
				bar: "bar",                                                                     // 96
				nav: "nav",                                                                     // 97
				navTrainer: "navTrainer",                                                       // 98
				main: "trainerWort",                                                            // 99
				navRandom: "navRandom"                                                          // 100
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.trainerRoutes.route('/trainer/bedeutung', {                             // 104
	name: "trainerBedeutung",                                                          // 105
	action: function () {                                                              // 106
		function action(params, queryParams) {                                            // 106
			BlazeLayout.render('layoutTrainer', {                                            // 107
				bar: "bar",                                                                     // 108
				nav: "nav",                                                                     // 109
				navTrainer: "navTrainer",                                                       // 110
				main: "trainerBedeutung",                                                       // 111
				navRandom: "navRandom"                                                          // 112
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
basicRoutes.route('/vokabelregister', {                                             // 117
	name: "vokabelregister",                                                           // 118
	action: function () {                                                              // 119
		function action(params, queryParams) {                                            // 119
			BlazeLayout.render('layoutBasic', {                                              // 120
				bar: "bar",                                                                     // 121
				nav: "nav",                                                                     // 122
				main: "vokabelregister"                                                         // 123
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/vokabelregister/:id', {                                         // 127
	name: "vokabelDetail",                                                             // 128
	action: function () {                                                              // 129
		function action(params, queryParams) {                                            // 129
			console.log(params);                                                             // 130
			BlazeLayout.render('layoutBasic', {                                              // 131
				bar: "bar",                                                                     // 132
				nav: "nav",                                                                     // 133
				main: "vokabelDetail"                                                           // 134
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
lowRoutes.route('/low', {                                                           // 140
	name: "indexLow",                                                                  // 141
	action: function () {                                                              // 142
		function action(params, queryParams) {                                            // 142
			BlazeLayout.render('layoutBasic', {                                              // 143
				bar: "bar",                                                                     // 144
				main: "indexLow"                                                                // 145
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}(),                                                                               //
	triggersEnter: [function (context, redirect) {}]                                   // 148
});                                                                                 //
                                                                                    //
FlowRouter.notFound = {                                                             // 151
	action: function () {                                                              // 152
		function action() {                                                               // 152
			BlazeLayout.render('layoutSlim', {                                               // 153
				footer: "footer",                                                               // 154
				main: "pageNotFound"                                                            // 155
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
};                                                                                  //
                                                                                    //
//Routes                                                                            //
AccountsTemplates.configureRoute('changePwd');                                      // 162
// AccountsTemplates.configureRoute('forgotPwd');                                   //
AccountsTemplates.configureRoute('resetPwd');                                       // 164
AccountsTemplates.configureRoute('signIn');                                         // 165
AccountsTemplates.configureRoute('signUp');                                         // 166
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
