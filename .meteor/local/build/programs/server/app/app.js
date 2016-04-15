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
	deleteFavourite: function () {                                                     // 2
		function deleteFavourite(vocabularyId) {                                          //
			check(vocabularyId, String);                                                     // 3
			Favourites.remove({                                                              // 4
				vocabularyId: vocabularyId                                                      // 5
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return deleteFavourite;                                                           //
	}(),                                                                               //
	insertFavourite: function () {                                                     // 8
		function insertFavourite(vocabularyId) {                                          //
			check(vocabularyId, String);                                                     // 9
			Favourites.insert({                                                              // 10
				vocabularyId: vocabularyId                                                      // 11
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return insertFavourite;                                                           //
	}(),                                                                               //
	dataViewedUser: function () {                                                      // 14
		function dataViewedUser(obj) {                                                    //
			Data.Viewed.User.upsert({                                                        // 15
				vocabularyId: obj._id,                                                          // 16
				userId: this.userId                                                             // 17
			}, {                                                                             //
				$setOnInsert: {                                                                 // 19
					vocabularyId: obj._id,                                                         // 20
					userId: this.userId,                                                           // 21
					vocabularyName: obj.term,                                                      // 22
					timesViewed: 0                                                                 // 23
				},                                                                              //
				$inc: {                                                                         // 25
					timesViewed: 1                                                                 // 26
				}                                                                               //
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return dataViewedUser;                                                            //
	}(),                                                                               //
	dataViewedAll: function () {                                                       // 30
		function dataViewedAll(obj) {                                                     //
			Data.Viewed.All.upsert({                                                         // 31
				vocabularyId: obj._id                                                           // 32
			}, {                                                                             //
				$setOnInsert: {                                                                 // 34
					vocabularyId: obj._id,                                                         // 35
					vocabularyName: obj.term,                                                      // 36
					timesViewed: 0                                                                 // 37
				},                                                                              //
				$inc: {                                                                         // 39
					timesViewed: 1                                                                 // 40
				}                                                                               //
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return dataViewedAll;                                                             //
	}(),                                                                               //
	dataFavLow: function () {                                                          // 44
		function dataFavLow(timestamp) {                                                  //
			Data.Fav.Low.upsert({                                                            // 45
				x: timestamp                                                                    // 46
			}, {                                                                             //
				$setOnInsert: {                                                                 // 48
					x: timestamp,                                                                  // 49
					y: 0                                                                           // 50
				},                                                                              //
				$inc: {                                                                         // 52
					y: 1                                                                           // 53
				}                                                                               //
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return dataFavLow;                                                                //
	}(),                                                                               //
	dataFavHigh: function () {                                                         // 57
		function dataFavHigh(timestamp) {                                                 //
			Data.Fav.High.upsert({                                                           // 58
				x: timestamp                                                                    // 59
			}, {                                                                             //
				$setOnInsert: {                                                                 // 61
					x: timestamp,                                                                  // 62
					y: 0                                                                           // 63
				},                                                                              //
				$inc: {                                                                         // 65
					y: 1                                                                           // 66
				}                                                                               //
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return dataFavHigh;                                                               //
	}(),                                                                               //
	addPerson: function () {                                                           // 70
		function addPerson(lastPerson, age) {                                             //
			if (lastPerson) {                                                                // 71
				People.insert({                                                                 // 72
					x: lastPerson.x + 1,                                                           // 73
					y: age                                                                         // 74
				});                                                                             //
			} else {                                                                         //
				People.insert({                                                                 // 77
					x: 1,                                                                          // 78
					y: age                                                                         // 79
				});                                                                             //
			}                                                                                //
		}                                                                                 //
                                                                                    //
		return addPerson;                                                                 //
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
//  search query                                                                    //
Meteor.publish('vocabularyRegister', function (search) {                            // 2
	check(search, Match.OneOf(String, null, undefined));                               // 3
	var query = {},                                                                    // 4
	    projection = {                                                                 //
		limit: 0,                                                                         // 6
		sort: {                                                                           // 7
			term: 1                                                                          // 8
		}                                                                                 //
	};                                                                                 //
	if (search) {                                                                      // 11
		var regex = new RegExp(search, 'i');                                              // 12
		query = {                                                                         // 13
			$or: [{                                                                          // 14
				term: regex                                                                     // 15
			}, {                                                                             //
				description: regex                                                              // 17
			}]                                                                               //
		};                                                                                //
		projection.limit = 0;                                                             // 20
	}                                                                                  //
	return Vocabulary.find(query, projection);                                         // 22
});                                                                                 //
                                                                                    //
Meteor.publish("vocabularyAll", function () {                                       // 25
	var data = Vocabulary.find({});                                                    // 26
	if (data) {                                                                        // 27
		return data;                                                                      // 28
	}                                                                                  //
	return this.ready();                                                               // 30
});                                                                                 //
                                                                                    //
Meteor.publish("ownedFavourites", function () {                                     // 33
	var currentUserId = this.userId;                                                   // 34
	var data = Favourites.find({                                                       // 35
		userId: currentUserId                                                             // 36
	});                                                                                //
	if (data) {                                                                        // 38
		return data;                                                                      // 39
	}                                                                                  //
	return this.ready();                                                               // 41
});                                                                                 //
                                                                                    //
Meteor.publish('singleEntry', function (entryId) {                                  // 44
	return Vocabulary.find({                                                           // 45
		_id: entryId                                                                      // 46
	});                                                                                //
});                                                                                 //
                                                                                    //
Meteor.publish('dataViewedAll', function () {                                       // 50
	var data = Data.Viewed.All.find({}, {                                              // 51
		limit: 5,                                                                         // 52
		sort: {                                                                           // 53
			timesViewed: -1                                                                  // 54
		}                                                                                 //
	});                                                                                //
	if (data) {                                                                        // 57
		return data;                                                                      // 58
	}                                                                                  //
	return this.ready();                                                               // 60
});                                                                                 //
Meteor.publish('dataViewedUser', function () {                                      // 62
	var data = Data.Viewed.User.find({                                                 // 63
		userId: this.userId                                                               // 64
	}, {                                                                               //
		limit: 5,                                                                         // 66
		sort: {                                                                           // 67
			timesViewed: -1                                                                  // 68
		}                                                                                 //
	});                                                                                //
	if (data) {                                                                        // 71
		return data;                                                                      // 72
	}                                                                                  //
	return this.ready();                                                               // 74
});                                                                                 //
Meteor.publish('dataFavHigh', function () {                                         // 76
	var data = Data.Fav.High.find({}, {                                                // 77
		sort: {}                                                                          // 78
	});                                                                                //
	if (data) {                                                                        // 82
		return data;                                                                      // 83
	}                                                                                  //
	return this.ready();                                                               // 85
});                                                                                 //
Meteor.publish('dataFavLow', function () {                                          // 87
	var data = Data.Fav.Low.find({}, {                                                 // 88
		sort: {}                                                                          // 89
	});                                                                                //
	if (data) {                                                                        // 93
		return data;                                                                      // 94
	}                                                                                  //
	return this.ready();                                                               // 96
});                                                                                 //
                                                                                    //
// Meteor.publish('people', function() {                                            //
// 	let data = People.find({});                                                     //
// 	if (data) {                                                                     //
// 		return data;                                                                   //
// 	}                                                                               //
// 	return this.ready();                                                            //
// });                                                                              //
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
	// if (Vocabulary.find().count() === 0) {                                          //
	// 	for (let i = 0; i < 10; i++) {                                                 //
	// 		Vocabulary.insert({                                                           //
	// 			term: Fake.word(),                                                           //
	// 			description: Fake.sentence([24])                                             //
	// 		});                                                                           //
	// 	}                                                                              //
	// };                                                                              //
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
    exports.getRandomInt = function (min, max) {                                    // 15
        return Math.floor(Math.random() * (max - min + 1)) + min;                   //
    };                                                                              //
})(this.Aux = {});                                                                  //
//////////////////////////////////////////////////////////////////////////////////////

},"nvd3_extra.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/aux/nvd3_extra.js                                                         //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
/* Inspired by Lee Byron's test data generator. */                                  //
(function (exports) {                                                               // 2
  var _arguments = arguments;                                                       //
                                                                                    //
  exports.stream_layers = function (n, m, o) {                                      // 3
    if (_arguments.length < 3) o = 0;                                               // 4
    function bump(a) {                                                              // 5
      var x = 1 / (.1 + Math.random()),                                             // 6
          y = 2 * Math.random() - .5,                                               //
          z = 10 / (.1 + Math.random());                                            //
      for (var i = 0; i < m; i++) {                                                 // 9
        var w = (i / m - y) * z;                                                    // 10
        a[i] += x * Math.exp(-w * w);                                               // 11
      }                                                                             //
    }                                                                               //
    return d3.range(n).map(function () {                                            // 14
      var a = [],                                                                   // 15
          i;                                                                        //
      for (i = 0; i < m; i++) {                                                     // 16
        a[i] = o + o * Math.random();                                               // 16
      }for (i = 0; i < 5; i++) {                                                    //
        bump(a);                                                                    // 17
      }return a.map(exports.stream_index);                                          //
    });                                                                             //
  };                                                                                //
  exports.stream_waves = function (n, m) {                                          // 21
    return d3.range(n).map(function (i) {                                           // 22
      return d3.range(m).map(function (j) {                                         // 23
        var x = 20 * j / m - i / 3;                                                 // 24
        return 2 * x * Math.exp(-.5 * x);                                           // 25
      }).map(exports.stream_index);                                                 //
    });                                                                             //
  };                                                                                //
  exports.stream_index = function (d, i) {                                          // 29
    return { x: i, y: Math.max(0, d) };                                             // 30
  };                                                                                //
})(this.NVD3 = {});                                                                 //
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

}},"collections":{"data.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/collections/data.js                                                       //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
People = new Mongo.Collection("people", {});                                        // 1
                                                                                    //
Data = {};                                                                          // 3
Data.Viewed = {};                                                                   // 4
Data.Viewed.User = new Mongo.Collection("dataViewedUser", {});                      // 5
Data.Viewed.All = new Mongo.Collection("dataViewedAll", {});                        // 6
Data.Fav = {};                                                                      // 7
Data.Fav.High = new Mongo.Collection("dataFavHigh", {});                            // 8
Data.Fav.Low = new Mongo.Collection("dataFavLow", {});                              // 9
                                                                                    //
Data.Viewed.All.Schema = new SimpleSchema({                                         // 11
	vocabularyId: {                                                                    // 12
		type: String                                                                      // 13
	},                                                                                 //
	vocabularyName: {                                                                  // 15
		type: String                                                                      // 16
	},                                                                                 //
	timesViewed: {                                                                     // 18
		type: Number                                                                      // 19
	},                                                                                 //
	createdAt: {                                                                       // 21
		type: Date,                                                                       // 22
		autoValue: function () {                                                          // 23
			function autoValue() {                                                           // 23
				return new Date();                                                              // 24
			}                                                                                //
                                                                                    //
			return autoValue;                                                                //
		}()                                                                               //
	}                                                                                  //
});                                                                                 //
                                                                                    //
Data.Viewed.User.Schema = new SimpleSchema([{                                       // 29
	userId: {                                                                          // 31
		type: String,                                                                     // 32
		autoValue: function () {                                                          // 33
			function autoValue() {                                                           // 33
				return this.userId;                                                             // 34
			}                                                                                //
                                                                                    //
			return autoValue;                                                                //
		}()                                                                               //
	}                                                                                  //
}, Data.Viewed.All.Schema]);                                                        //
                                                                                    //
Data.Viewed.User.attachSchema(Data.Viewed.User.Schema);                             // 41
Data.Viewed.All.attachSchema(Data.Viewed.All.Schema);                               // 42
                                                                                    //
// CHART MODE                                                                       //
// timestamp (day),                                                                 //
// mode,                                                                            //
// countClick,                                                                      //
// device --->>> $sum to get all devices                                            //
                                                                                    //
// CHART LOW HIGH                                                                   //
// URL                                                                              //
// timestamp enter                                                                  //
// timestamp exit                                                                   //
// device                                                                           //
                                                                                    //
// --->>> insert @ logout and routeEnter/ routeExit                                 //
//////////////////////////////////////////////////////////////////////////////////////

},"favourites.js":function(){

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
  defaultLayout: 'layout',                                                          // 3
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
// setLowPath = () => {                                                             //
// 	Session.set(LAST_PATH_LOW, FlowRouter.current().route.path)                     //
// }                                                                                //
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
var highRoutes = FlowRouter.group({                                                 // 33
	name: "high",                                                                      // 34
	triggersEnter: [checkAttentionModeOff],                                            // 35
	triggersExit: []                                                                   // 36
});                                                                                 //
                                                                                    //
// *** ROUTES                                                                       //
                                                                                    //
highRoutes.route('/', {                                                             // 41
	name: "index",                                                                     // 42
	action: function () {                                                              // 43
		function action(params, queryParams) {                                            // 43
			BlazeLayout.render('layout', {                                                   // 44
				bar: "bar",                                                                     // 45
				nav: "nav",                                                                     // 46
				main: "index"                                                                   // 47
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
highRoutes.route('/eingabe', {                                                      // 51
	name: "eingabe",                                                                   // 52
	action: function () {                                                              // 53
		function action(params, queryParams) {                                            // 53
			BlazeLayout.render('layout', {                                                   // 54
				bar: "bar",                                                                     // 55
				nav: "nav",                                                                     // 56
				main: "eingabe",                                                                // 57
				navSource: "navSource"                                                          // 58
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
highRoutes.route('/register/:id', {                                                 // 63
	name: "vokabelDetail",                                                             // 64
	action: function () {                                                              // 65
		function action(params, queryParams) {                                            // 65
			BlazeLayout.render('layout', {                                                   // 66
				bar: "bar",                                                                     // 67
				nav: "nav",                                                                     // 68
				main: "vokabelDetail"                                                           // 69
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
highRoutes.route('/register', {                                                     // 73
	name: "register",                                                                  // 74
	action: function () {                                                              // 75
		function action(params, queryParams) {                                            // 75
			BlazeLayout.render('layout', {                                                   // 76
				bar: "bar",                                                                     // 77
				nav: "nav",                                                                     // 78
				main: "register"                                                                // 79
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
lowRoutes.route('/low', {                                                           // 84
	name: "low",                                                                       // 85
	action: function () {                                                              // 86
		function action(params, queryParams) {                                            // 86
			BlazeLayout.render('layout', {                                                   // 87
				bar: "bar",                                                                     // 88
				nav: "navMode",                                                                 // 89
				main: "low",                                                                    // 90
				navSource: "navSource"                                                          // 91
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}(),                                                                               //
	triggersEnter: [function (context, redirect) {}]                                   // 94
});                                                                                 //
                                                                                    //
FlowRouter.notFound = {                                                             // 98
	action: function () {                                                              // 99
		function action() {                                                               // 99
			BlazeLayout.render('layout', {                                                   // 100
				footer: "footer",                                                               // 101
				main: "pageNotFound"                                                            // 102
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
};                                                                                  //
                                                                                    //
//Routes                                                                            //
AccountsTemplates.configureRoute('changePwd');                                      // 109
// AccountsTemplates.configureRoute('forgotPwd');                                   //
AccountsTemplates.configureRoute('resetPwd');                                       // 111
AccountsTemplates.configureRoute('signIn');                                         // 112
AccountsTemplates.configureRoute('signUp');                                         // 113
// AccountsTemplates.configureRoute('verifyEmail');                                 //
//////////////////////////////////////////////////////////////////////////////////////

}}}},{"extensions":[".js",".json"]});
require("./server/lib/config/accounts.js");
require("./server/lib/config/email.js");
require("./common/aux/aux.js");
require("./common/aux/nvd3_extra.js");
require("./common/aux/validation.js");
require("./common/collections/data.js");
require("./common/collections/favourites.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/at_config.js");
require("./common/router/routes.js");
require("./server/methods.js");
require("./server/publication.js");
require("./server/vocabularySeed.js");
//# sourceMappingURL=app.js.map
