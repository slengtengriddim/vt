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
                                                                                    //
		query = {                                                                         // 15
			$or: [{                                                                          // 16
				term: regex                                                                     // 17
			}, {                                                                             //
				description: regex                                                              // 19
			}]                                                                               //
		};                                                                                //
                                                                                    //
		projection.limit = 0;                                                             // 23
	}                                                                                  //
                                                                                    //
	return Vocabulary.find(query, projection);                                         // 26
});                                                                                 //
                                                                                    //
Meteor.publish("vocabularyAll", function () {                                       // 29
	var data = Vocabulary.find({});                                                    // 30
	if (data) {                                                                        // 31
		return data;                                                                      // 32
	}                                                                                  //
	return this.ready();                                                               // 34
});                                                                                 //
                                                                                    //
Meteor.publish("ownedFavourites", function () {                                     // 37
	var currentUserId = this.userId;                                                   // 38
	var data = Favourites.find({                                                       // 39
		userId: currentUserId                                                             // 40
	});                                                                                //
	if (data) {                                                                        // 42
		return data;                                                                      // 43
	}                                                                                  //
	return this.ready();                                                               // 45
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
		for (var i = 0; i < 300; i++) {                                                   // 4
			Vocabulary.insert({                                                              // 5
				term: Fake.word(),                                                              // 6
				description: Fake.sentence([32])                                                // 7
			});                                                                              //
		}                                                                                 //
	};                                                                                 //
});                                                                                 //
//////////////////////////////////////////////////////////////////////////////////////

}},"common":{"aux":{"validation.js":function(){

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
		type: String                                                                      // 24
	},                                                                                 //
	description: {                                                                     // 26
		type: String                                                                      // 27
	}                                                                                  //
});                                                                                 //
                                                                                    //
Vocabulary.attachSchema(VocabularySchema);                                          // 31
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
  defaultLayout: 'slimLayout',                                                      // 3
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
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                      // 15
                                                                                    //
// *** ROUTE GROUPS                                                                 //
                                                                                    //
var lowRoutes = FlowRouter.group({                                                  // 19
	name: "low",                                                                       // 20
	triggersEnter: [checkAttentionModeOn],                                             // 21
	triggersExit: []                                                                   // 22
});                                                                                 //
var basicRoutes = FlowRouter.group({                                                // 24
	name: "basic",                                                                     // 25
	triggersEnter: [checkAttentionModeOff],                                            // 26
	triggersExit: []                                                                   // 27
});                                                                                 //
                                                                                    //
// *** ROUTES                                                                       //
                                                                                    //
basicRoutes.route('/', {                                                            // 32
	name: "index",                                                                     // 33
	action: function () {                                                              // 34
		function action(params, queryParams) {                                            // 34
			BlazeLayout.render('basicLayout', {                                              // 35
				bar: "bar",                                                                     // 36
				nav: "nav",                                                                     // 37
				main: "index"                                                                   // 38
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/favouriten', {                                                  // 42
	name: "favouriten",                                                                // 43
	action: function () {                                                              // 44
		function action(params, queryParams) {                                            // 44
			BlazeLayout.render('basicLayout', {                                              // 45
				bar: "bar",                                                                     // 46
				nav: "nav",                                                                     // 47
				main: "favouriten"                                                              // 48
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/trainer', {                                                     // 52
	name: "trainer",                                                                   // 53
	action: function () {                                                              // 54
		function action(params, queryParams) {                                            // 54
			BlazeLayout.render('basicLayout', {                                              // 55
				bar: "bar",                                                                     // 56
				nav: "nav",                                                                     // 57
				main: "trainer"                                                                 // 58
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
basicRoutes.route('/vokabelregister', {                                             // 62
	name: "vokabelregister",                                                           // 63
	action: function () {                                                              // 64
		function action(params, queryParams) {                                            // 64
			BlazeLayout.render('basicLayout', {                                              // 65
				bar: "bar",                                                                     // 66
				nav: "nav",                                                                     // 67
				main: "vokabelregister"                                                         // 68
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
lowRoutes.route('/low', {                                                           // 73
	name: "indexLow",                                                                  // 74
	action: function () {                                                              // 75
		function action(params, queryParams) {                                            // 75
			BlazeLayout.render('basicLayout', {                                              // 76
				bar: "bar",                                                                     // 77
				main: "indexLow"                                                                // 78
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}(),                                                                               //
	triggersEnter: [function (context, redirect) {}]                                   // 81
});                                                                                 //
                                                                                    //
FlowRouter.notFound = {                                                             // 84
	action: function () {                                                              // 85
		function action() {                                                               // 85
			BlazeLayout.render('slimLayout', {                                               // 86
				footer: "footer",                                                               // 87
				main: "pageNotFound"                                                            // 88
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
};                                                                                  //
                                                                                    //
//Routes                                                                            //
AccountsTemplates.configureRoute('changePwd');                                      // 95
// AccountsTemplates.configureRoute('forgotPwd');                                   //
AccountsTemplates.configureRoute('resetPwd');                                       // 97
AccountsTemplates.configureRoute('signIn');                                         // 98
AccountsTemplates.configureRoute('signUp');                                         // 99
// AccountsTemplates.configureRoute('verifyEmail');                                 //
//////////////////////////////////////////////////////////////////////////////////////

}}}},{"extensions":[".js",".json"]});
require("./server/lib/config/accounts.js");
require("./server/lib/config/email.js");
require("./common/aux/validation.js");
require("./common/collections/favourites.js");
require("./common/collections/local.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/at_config.js");
require("./common/router/routes.js");
require("./server/methods.js");
require("./server/publication.js");
require("./server/vocabularySeed.js");
//# sourceMappingURL=app.js.map
