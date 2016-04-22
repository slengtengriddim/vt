var require = meteorInstall({"server":{"lib":{"config":{"accounts.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/lib/config/accounts.js                                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
                                                                                                              //
Meteor.startup(function () {});                                                                               // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"email.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/lib/config/email.js                                                                                 //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
                                                                                                              //
// Accounts.emailTemplates.siteName = "MySite";                                                               //
//                                                                                                            //
// Accounts.emailTemplates.from = "MySite <support@mysite.com>";                                              //
//                                                                                                            //
// Accounts.emailTemplates.resetPassword.subject = function (user) {                                          //
//     return "Message for " + user.profile.displayName;                                                      //
// };                                                                                                         //
//                                                                                                            //
// Accounts.emailTemplates.resetPassword.text = function (user, url) {                                        //
//     var signature = "MySite Bot";                                                                          //
//     //var president = President.findOne();                                                                 //
//     //if (president)                                                                                       //
//     //    president = Meteor.users.findOne(president.presidentId);                                         //
//     //    signature = president.profile.displayName + ", the MySite President.";                           //
//                                                                                                            //
//     return "Dear " + user.profile.displayName + ",\n\n" +                                                  //
//         "Click the following link to set your new password:\n" +                                           //
//         url + "\n\n" +                                                                                     //
//         "Please never forget it again!!!\n\n\n" +                                                          //
//         "Cheers,\n" +                                                                                      //
//         signature;                                                                                         //
// };                                                                                                         //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"methods.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/methods.js                                                                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.methods({                                                                                              // 1
	deleteFavourite: function () {                                                                               // 2
		function deleteFavourite(vocabularyId) {                                                                    //
			check(vocabularyId, String);                                                                               // 3
			Favourites.remove({                                                                                        // 4
				vocabularyId: vocabularyId                                                                                // 5
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return deleteFavourite;                                                                                     //
	}(),                                                                                                         //
	insertFavourite: function () {                                                                               // 8
		function insertFavourite(vocabularyId) {                                                                    //
			check(vocabularyId, String);                                                                               // 9
			Favourites.insert({                                                                                        // 10
				vocabularyId: vocabularyId                                                                                // 11
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return insertFavourite;                                                                                     //
	}(),                                                                                                         //
	dataWords: function () {                                                                                     // 14
		function dataWords(obj) {                                                                                   //
			Data.Words.upsert({                                                                                        // 15
				vocabularyId: obj._id,                                                                                    // 16
				userId: this.userId                                                                                       // 17
			}, {                                                                                                       //
				$setOnInsert: {                                                                                           // 19
					vocabularyId: obj._id,                                                                                   // 20
					userId: this.userId,                                                                                     // 21
					vocabularyName: obj.term,                                                                                // 22
					viewed: 0                                                                                                // 23
				},                                                                                                        //
				$inc: {                                                                                                   // 25
					viewed: 1                                                                                                // 26
				}                                                                                                         //
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return dataWords;                                                                                           //
	}(),                                                                                                         //
	dataDetail: function () {                                                                                    // 30
		function dataDetail(deviceType, devicePlatform, clickArea, mode, attention) {                               //
			Data.Detail.insert({                                                                                       // 31
				deviceType: deviceType,                                                                                   // 32
				devicePlatform: devicePlatform,                                                                           // 33
				clickArea: clickArea,                                                                                     // 34
				mode: mode,                                                                                               // 35
				attention: attention                                                                                      // 36
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return dataDetail;                                                                                          //
	}(),                                                                                                         //
	surveySubmitted: function () {                                                                               // 39
		function surveySubmitted() {                                                                                //
			UserExt.upsert({                                                                                           // 40
				userId: this.userId                                                                                       // 41
			}, {                                                                                                       //
				$setOnInsert: {                                                                                           // 43
					userId: this.userId,                                                                                     // 44
					surveySubmitted: true                                                                                    // 45
				}                                                                                                         //
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return surveySubmitted;                                                                                     //
	}()                                                                                                          //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publication.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/publication.js                                                                                      //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.publish("user", function () {                                                                          // 1
	return Meteor.users.find({});                                                                                // 2
});                                                                                                           //
Meteor.publish("userExt", function () {                                                                       // 4
	var currentUserId = this.userId;                                                                             // 5
	var data = UserExt.find({ userId: this.userId });                                                            // 6
	if (data) {                                                                                                  // 7
		return data;                                                                                                // 8
	}                                                                                                            //
	return this.ready();                                                                                         // 10
});                                                                                                           //
Meteor.publish("userExtAll", function () {                                                                    // 12
	var currentUserId = this.userId;                                                                             // 13
	var data = UserExt.find({});                                                                                 // 14
	if (data) {                                                                                                  // 15
		return data;                                                                                                // 16
	}                                                                                                            //
	return this.ready();                                                                                         // 18
});                                                                                                           //
Meteor.publish("userStatus", function () {                                                                    // 20
	var data = Data.Status.find({});                                                                             // 21
	if (data) {                                                                                                  // 22
		return data;                                                                                                // 23
	}                                                                                                            //
	return this.ready();                                                                                         // 25
});                                                                                                           //
Meteor.publish("feedback", function () {                                                                      // 27
	var data = Data.Feedback.find({});                                                                           // 28
	if (data) {                                                                                                  // 29
		return data;                                                                                                // 30
	}                                                                                                            //
	return this.ready();                                                                                         // 32
});                                                                                                           //
                                                                                                              //
//  search query                                                                                              //
Meteor.publish('vocabularyRegister', function (search) {                                                      // 37
	check(search, Match.OneOf(String, null, undefined));                                                         // 38
	var query = {},                                                                                              // 39
	    projection = {                                                                                           //
		limit: 0,                                                                                                   // 41
		sort: {                                                                                                     // 42
			term: 1                                                                                                    // 43
		}                                                                                                           //
	};                                                                                                           //
	if (search) {                                                                                                // 46
		var regex = new RegExp(search, 'i');                                                                        // 47
		query = {                                                                                                   // 48
			$or: [{                                                                                                    // 49
				term: regex                                                                                               // 50
			}, {                                                                                                       //
				description: regex                                                                                        // 52
			}]                                                                                                         //
		};                                                                                                          //
		projection.limit = 0;                                                                                       // 55
	}                                                                                                            //
	return Vocabulary.find(query, projection);                                                                   // 57
});                                                                                                           //
                                                                                                              //
Meteor.publish("vocabularyAll", function () {                                                                 // 60
	var data = Vocabulary.find({});                                                                              // 61
	if (data) {                                                                                                  // 62
		return data;                                                                                                // 63
	}                                                                                                            //
	return this.ready();                                                                                         // 65
});                                                                                                           //
                                                                                                              //
Meteor.publish("ownedFavourites", function () {                                                               // 68
	var currentUserId = this.userId;                                                                             // 69
	var data = Favourites.find({                                                                                 // 70
		userId: currentUserId                                                                                       // 71
	});                                                                                                          //
	if (data) {                                                                                                  // 73
		return data;                                                                                                // 74
	}                                                                                                            //
	return this.ready();                                                                                         // 76
});                                                                                                           //
                                                                                                              //
Meteor.publish('singleEntry', function (entryId) {                                                            // 79
	return Vocabulary.find({                                                                                     // 80
		_id: entryId                                                                                                // 81
	});                                                                                                          //
});                                                                                                           //
                                                                                                              //
Meteor.publish('dataWords', function () {                                                                     // 85
	var data = Data.Words.find({}, {                                                                             // 86
		sort: {                                                                                                     // 87
			viewed: -1                                                                                                 // 88
		}                                                                                                           //
	});                                                                                                          //
	if (data) {                                                                                                  // 91
		return data;                                                                                                // 92
	}                                                                                                            //
	return this.ready();                                                                                         // 94
});                                                                                                           //
                                                                                                              //
Meteor.publish('dataDetail', function () {                                                                    // 97
	var data = Data.Detail.find({});                                                                             // 98
	if (data) {                                                                                                  // 99
		return data;                                                                                                // 100
	}                                                                                                            //
	return this.ready();                                                                                         // 102
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"startup.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/startup.js                                                                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.startup(function () {                                                                                  // 1
	Meteor.users.find({                                                                                          // 2
		"status.online": true                                                                                       // 3
	}).observe({                                                                                                 //
		added: function () {                                                                                        // 5
			function added(obj) {                                                                                      // 5
				var latestEntry = Data.Status.findOne({                                                                   // 6
					userId: obj._id                                                                                          // 7
				}, {                                                                                                      //
					sort: {                                                                                                  // 9
						timestamp: -1,                                                                                          // 10
						limit: 1                                                                                                // 11
					}                                                                                                        //
				});                                                                                                       //
				if (latestEntry) {                                                                                        // 14
					if (latestEntry.status !== 'online') {                                                                   // 15
						Data.Status.insert({                                                                                    // 16
							userId: obj._id,                                                                                       // 17
							status: "online"                                                                                       // 18
						});                                                                                                     //
						console.log(obj._id + ' set online');                                                                   // 20
					}                                                                                                        //
				} else {                                                                                                  //
					Data.Status.insert({                                                                                     // 23
						userId: obj._id,                                                                                        // 24
						status: "online"                                                                                        // 25
					});                                                                                                      //
					console.log(obj._id + ' set online');                                                                    // 27
				}                                                                                                         //
			}                                                                                                          //
                                                                                                              //
			return added;                                                                                              //
		}(),                                                                                                        //
		removed: function () {                                                                                      // 30
			function removed(obj) {                                                                                    // 30
				var latestEntry = Data.Status.findOne({                                                                   // 31
					userId: obj._id                                                                                          // 32
				}, {                                                                                                      //
					sort: {                                                                                                  // 34
						timestamp: -1,                                                                                          // 35
						limit: 1                                                                                                // 36
					}                                                                                                        //
				});                                                                                                       //
				if (latestEntry) {                                                                                        // 39
					if (latestEntry.status !== 'offline') {                                                                  // 40
						Data.Status.insert({                                                                                    // 41
							userId: obj._id,                                                                                       // 42
							status: "offline"                                                                                      // 43
						});                                                                                                     //
						console.log(obj._id + ' set offline');                                                                  // 45
					}                                                                                                        //
				}                                                                                                         //
			}                                                                                                          //
                                                                                                              //
			return removed;                                                                                            //
		}()                                                                                                         //
	});                                                                                                          //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabularySeed.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server/vocabularySeed.js                                                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Meteor.startup(function () {                                                                                  // 1
                                                                                                              //
	// if (Vocabulary.find().count() === 0) {                                                                    //
	// 	for (let i = 0; i < 10; i++) {                                                                           //
	// 		Vocabulary.insert({                                                                                     //
	// 			term: Fake.word(),                                                                                     //
	// 			description: Fake.sentence([24])                                                                       //
	// 		});                                                                                                     //
	// 	}                                                                                                        //
	// };                                                                                                        //
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"common":{"aux":{"aux.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/aux/aux.js                                                                                          //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
(function (exports) {                                                                                         // 1
    /**                                                                                                       //
    * Randomize array element order in-place.                                                                 //
    * Using Durstenfeld shuffle algorithm.                                                                    //
    */                                                                                                        //
    exports.shuffle = function (array) {                                                                      // 6
        for (var i = array.length - 1; i > 0; i--) {                                                          // 7
            var j = Math.floor(Math.random() * (i + 1));                                                      // 8
            var temp = array[i];                                                                              // 9
            array[i] = array[j];                                                                              // 10
            array[j] = temp;                                                                                  // 11
        }                                                                                                     //
        return array;                                                                                         // 13
    };                                                                                                        //
    exports.getRandomInt = function (min, max) {                                                              // 15
        return Math.floor(Math.random() * (max - min + 1)) + min;                                             //
    };                                                                                                        //
})(this.Aux = {});                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nvd3_extra.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/aux/nvd3_extra.js                                                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
/* Inspired by Lee Byron's test data generator. */                                                            //
(function (exports) {                                                                                         // 2
  var _arguments = arguments;                                                                                 //
                                                                                                              //
  exports.stream_layers = function (n, m, o) {                                                                // 3
    if (_arguments.length < 3) o = 0;                                                                         // 4
    function bump(a) {                                                                                        // 5
      var x = 1 / (.1 + Math.random()),                                                                       // 6
          y = 2 * Math.random() - .5,                                                                         //
          z = 10 / (.1 + Math.random());                                                                      //
      for (var i = 0; i < m; i++) {                                                                           // 9
        var w = (i / m - y) * z;                                                                              // 10
        a[i] += x * Math.exp(-w * w);                                                                         // 11
      }                                                                                                       //
    }                                                                                                         //
    return d3.range(n).map(function () {                                                                      // 14
      var a = [],                                                                                             // 15
          i;                                                                                                  //
      for (i = 0; i < m; i++) {                                                                               // 16
        a[i] = o + o * Math.random();                                                                         // 16
      }for (i = 0; i < 5; i++) {                                                                              //
        bump(a);                                                                                              // 17
      }return a.map(exports.stream_index);                                                                    //
    });                                                                                                       //
  };                                                                                                          //
  exports.stream_waves = function (n, m) {                                                                    // 21
    return d3.range(n).map(function (i) {                                                                     // 22
      return d3.range(m).map(function (j) {                                                                   // 23
        var x = 20 * j / m - i / 3;                                                                           // 24
        return 2 * x * Math.exp(-.5 * x);                                                                     // 25
      }).map(exports.stream_index);                                                                           //
    });                                                                                                       //
  };                                                                                                          //
  exports.stream_index = function (d, i) {                                                                    // 29
    return { x: i, y: Math.max(0, d) };                                                                       // 30
  };                                                                                                          //
})(this.NVD3 = {});                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/aux/validation.js                                                                                   //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
(function (exports) {                                                                                         // 1
	exports.isAlphabetic = function (value) {                                                                    // 2
		var filter = /^[a-zA-Z]+$/;                                                                                 // 3
		if (filter.test(value)) {                                                                                   // 4
			return true;                                                                                               // 5
		}                                                                                                           //
		return false;                                                                                               // 7
	};                                                                                                           //
                                                                                                              //
	exports.isLength64 = function (value) {                                                                      // 10
		if (value.length < 65) {                                                                                    // 11
			return true;                                                                                               // 12
		}                                                                                                           //
		return false;                                                                                               // 14
	};                                                                                                           //
})(this.Validate = {});                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"data.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/collections/data.js                                                                                 //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Data = {};                                                                                                    // 1
Data.Detail = new Mongo.Collection('dataDetail', {});                                                         // 2
Data.Words = new Mongo.Collection('dataWords', {});                                                           // 3
Data.Survey = new Mongo.Collection('dataSurvey', {});                                                         // 4
Data.Feedback = new Mongo.Collection('dataFeedback', {});                                                     // 5
Data.Status = new Mongo.Collection('dataStatus', {});                                                         // 6
                                                                                                              //
Data.Survey.allow({                                                                                           // 8
	insert: function () {                                                                                        // 9
		function insert() {                                                                                         // 9
			return true;                                                                                               // 10
		}                                                                                                           //
                                                                                                              //
		return insert;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
Data.Feedback.allow({                                                                                         // 13
	insert: function () {                                                                                        // 14
		function insert() {                                                                                         // 14
			return true;                                                                                               // 15
		}                                                                                                           //
                                                                                                              //
		return insert;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
                                                                                                              //
Data.Status.Schema = new SimpleSchema({                                                                       // 19
	userId: {                                                                                                    // 20
		type: String                                                                                                // 21
	},                                                                                                           //
	timestamp: {                                                                                                 // 23
		type: Date,                                                                                                 // 24
		autoValue: function () {                                                                                    // 25
			function autoValue() {                                                                                     // 25
				return new Date();                                                                                        // 26
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	status: {                                                                                                    // 29
		type: String,                                                                                               // 30
		allowedValues: ['online', 'offline']                                                                        // 31
	}                                                                                                            //
});                                                                                                           //
                                                                                                              //
Data.Feedback.Schema = new SimpleSchema({                                                                     // 35
	userId: {                                                                                                    // 36
		type: String,                                                                                               // 37
		autoValue: function () {                                                                                    // 38
			function autoValue() {                                                                                     // 38
				return this.userId;                                                                                       // 39
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	userMail: {                                                                                                  // 42
		type: String,                                                                                               // 43
		autoValue: function () {                                                                                    // 44
			function autoValue() {                                                                                     // 44
				return Meteor.user().emails[0].address;                                                                   // 45
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	message: {                                                                                                   // 48
		type: String,                                                                                               // 49
		max: 1000,                                                                                                  // 50
		autoform: {                                                                                                 // 51
			afFieldInput: {                                                                                            // 52
				type: "textarea"                                                                                          // 53
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	createdAt: {                                                                                                 // 57
		type: Date,                                                                                                 // 58
		autoValue: function () {                                                                                    // 59
			function autoValue() {                                                                                     // 59
				return new Date();                                                                                        // 60
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	}                                                                                                            //
});                                                                                                           //
                                                                                                              //
Data.Survey.Schema = new SimpleSchema({                                                                       // 65
	// GENERAL                                                                                                   //
	userId: {                                                                                                    // 67
		type: String,                                                                                               // 68
		autoValue: function () {                                                                                    // 69
			function autoValue() {                                                                                     // 69
				return this.userId;                                                                                       // 70
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}(),                                                                                                        //
		autoform: {                                                                                                 // 72
			type: "hidden",                                                                                            // 73
			label: false                                                                                               // 74
		}                                                                                                           //
	},                                                                                                           //
	age: {                                                                                                       // 77
		type: Number,                                                                                               // 78
		label: 'Dein Alter',                                                                                        // 79
		min: 18,                                                                                                    // 80
		max: 99                                                                                                     // 81
	},                                                                                                           //
                                                                                                              //
	previousExperience: {                                                                                        // 84
		type: String,                                                                                               // 85
		label: 'Wie steht es um deine Vorerfahrung mit digitalen Vokabeltrainern?',                                 // 86
		autoform: {                                                                                                 // 87
			type: "select-radio-inline",                                                                               // 88
			options: function () {                                                                                     // 89
				function options() {                                                                                      // 89
					return [{                                                                                                // 90
						label: "gar keine",                                                                                     // 91
						value: "keine"                                                                                          // 92
					}, {                                                                                                     //
						label: "mal probiert",                                                                                  // 94
						value: "probiert"                                                                                       // 95
					}, {                                                                                                     //
						label: "nutze ich regelmaessig",                                                                        // 97
						value: "regelmaessig"                                                                                   // 98
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	learningCurve: {                                                                                             // 103
		type: String,                                                                                               // 104
		label: 'Wie ist dir die Einarbeitung in die App gefallen?',                                                 // 105
		autoform: {                                                                                                 // 106
			type: "select-radio-inline",                                                                               // 107
			options: function () {                                                                                     // 108
				function options() {                                                                                      // 108
					return [{                                                                                                // 109
						label: "Leicht",                                                                                        // 110
						value: "leicht"                                                                                         // 111
					}, {                                                                                                     //
						label: "Mittel",                                                                                        // 113
						value: "mittel"                                                                                         // 114
					}, {                                                                                                     //
						label: "Schwer",                                                                                        // 116
						value: "schwer"                                                                                         // 117
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	everydayUse: {                                                                                               // 122
		type: String,                                                                                               // 123
		label: 'Konntest du den Gebrauch der App muehelos in deinen Alltag integrieren?',                           // 124
		autoform: {                                                                                                 // 125
			type: "select-radio-inline",                                                                               // 126
			options: function () {                                                                                     // 127
				function options() {                                                                                      // 127
					return [{                                                                                                // 128
						label: "Ja",                                                                                            // 129
						value: "ja"                                                                                             // 130
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 132
						value: "nein"                                                                                           // 133
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	everydayUseText: {                                                                                           // 138
		type: String,                                                                                               // 139
		max: 1000,                                                                                                  // 140
		label: 'Weshalb?',                                                                                          // 141
		autoform: {                                                                                                 // 142
			afFieldInput: {                                                                                            // 143
				type: "textarea"                                                                                          // 144
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	usability: {                                                                                                 // 148
		type: String,                                                                                               // 149
		label: 'Wie kommst du mit der Bedienung der App zurecht?',                                                  // 150
		autoform: {                                                                                                 // 151
			type: "select-radio-inline",                                                                               // 152
			options: function () {                                                                                     // 153
				function options() {                                                                                      // 153
					return [{                                                                                                // 154
						label: "gar nicht",                                                                                     // 155
						value: "nicht"                                                                                          // 156
					}, {                                                                                                     //
						label: "ok",                                                                                            // 158
						value: "ok"                                                                                             // 159
					}, {                                                                                                     //
						label: "super",                                                                                         // 161
						value: "super"                                                                                          // 162
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	usabilityText: {                                                                                             // 167
		type: String,                                                                                               // 168
		max: 1000,                                                                                                  // 169
		label: 'Teile deine Ideen zur Bedienung (optional)',                                                        // 170
		optional: true,                                                                                             // 171
		autoform: {                                                                                                 // 172
			afFieldInput: {                                                                                            // 173
				type: "textarea"                                                                                          // 174
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	// NUTZUNGSVERHALTEN                                                                                         //
	deviceMobile: {                                                                                              // 179
		type: String,                                                                                               // 180
		label: 'Mobile:',                                                                                           // 181
		autoform: {                                                                                                 // 182
			type: "select-radio-inline",                                                                               // 183
			options: function () {                                                                                     // 184
				function options() {                                                                                      // 184
					return [{                                                                                                // 185
						label: "Ja",                                                                                            // 186
						value: "ja"                                                                                             // 187
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 189
						value: "nein"                                                                                           // 190
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	deviceTablet: {                                                                                              // 195
		type: String,                                                                                               // 196
		label: 'Tablet:',                                                                                           // 197
		autoform: {                                                                                                 // 198
			type: "select-radio-inline",                                                                               // 199
			options: function () {                                                                                     // 200
				function options() {                                                                                      // 200
					return [{                                                                                                // 201
						label: "Ja",                                                                                            // 202
						value: "ja"                                                                                             // 203
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 205
						value: "nein"                                                                                           // 206
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	deviceDesktop: {                                                                                             // 211
		type: String,                                                                                               // 212
		label: 'Desktop:',                                                                                          // 213
		autoform: {                                                                                                 // 214
			type: "select-radio-inline",                                                                               // 215
			options: function () {                                                                                     // 216
				function options() {                                                                                      // 216
					return [{                                                                                                // 217
						label: "Ja",                                                                                            // 218
						value: "ja"                                                                                             // 219
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 221
						value: "nein"                                                                                           // 222
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	deviceBehavior: {                                                                                            // 227
		type: String,                                                                                               // 228
		max: 1000,                                                                                                  // 229
		label: 'Falls du mehrere Endgeraete benutzt hast um die App aufzurufen: Inwiefern hat sich dein Nutzungsverhalten unterschieden?',
		optional: false,                                                                                            // 231
		autoform: {                                                                                                 // 232
			afFieldInput: {                                                                                            // 233
				type: "textarea"                                                                                          // 234
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	favouriteMode: {                                                                                             // 238
		type: String,                                                                                               // 239
		label: 'Welchen Trainermodus hast du am liebsten genutzt?',                                                 // 240
		autoform: {                                                                                                 // 241
			type: "select-radio-inline",                                                                               // 242
			options: function () {                                                                                     // 243
				function options() {                                                                                      // 243
					return [{                                                                                                // 244
						label: "Lesen",                                                                                         // 245
						value: "lesen"                                                                                          // 246
					}, {                                                                                                     //
						label: "Wort",                                                                                          // 248
						value: "wort"                                                                                           // 249
					}, {                                                                                                     //
						label: "Definition",                                                                                    // 251
						value: "definition"                                                                                     // 252
					}, {                                                                                                     //
						label: "Texteingabe",                                                                                   // 254
						value: "eingabe"                                                                                        // 255
					}, {                                                                                                     //
						label: "Register",                                                                                      // 257
						value: "register"                                                                                       // 258
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	favouriteModeText: {                                                                                         // 263
		type: String,                                                                                               // 264
		max: 1000,                                                                                                  // 265
		label: 'Weshalb?',                                                                                          // 266
		optional: false,                                                                                            // 267
		autoform: {                                                                                                 // 268
			afFieldInput: {                                                                                            // 269
				type: "textarea"                                                                                          // 270
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	attentionBenefit: {                                                                                          // 274
		type: String,                                                                                               // 275
		label: 'Hat dir die Moeglichkeit, das UI kontextorientiert zu veraendern, gefallen?',                       // 276
		autoform: {                                                                                                 // 277
			type: "select-radio-inline",                                                                               // 278
			options: function () {                                                                                     // 279
				function options() {                                                                                      // 279
					return [{                                                                                                // 280
						label: "Ja",                                                                                            // 281
						value: "ja"                                                                                             // 282
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 284
						value: "nein"                                                                                           // 285
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	attentionBehavior: {                                                                                         // 290
		type: String,                                                                                               // 291
		label: 'Hat die Moeglichkeit, das UI kontextorientiert zu veraendern, dein Nutzungsverhalten beeinflusst?',
		autoform: {                                                                                                 // 293
			type: "select-radio-inline",                                                                               // 294
			options: function () {                                                                                     // 295
				function options() {                                                                                      // 295
					return [{                                                                                                // 296
						label: "Ja",                                                                                            // 297
						value: "ja"                                                                                             // 298
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 300
						value: "nein"                                                                                           // 301
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	attentionBehaviorText: {                                                                                     // 306
		type: String,                                                                                               // 307
		max: 1000,                                                                                                  // 308
		label: 'Weshalb?',                                                                                          // 309
		autoform: {                                                                                                 // 310
			afFieldInput: {                                                                                            // 311
				type: "textarea"                                                                                          // 312
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	attentionSituation: {                                                                                        // 316
		type: String,                                                                                               // 317
		label: 'Wann, wo und in welcher Situation hast du beschlossen, das UI zu wechseln? (Beispiel)',             // 318
		optional: false,                                                                                            // 319
		autoform: {                                                                                                 // 320
			afFieldInput: {                                                                                            // 321
				type: "textarea"                                                                                          // 322
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	attentionUse: {                                                                                              // 326
		type: String,                                                                                               // 327
		label: 'Siehst du generell einen Vorteil in der Moeglichkeit das UI kontextorientiert anzupassen?',         // 328
		autoform: {                                                                                                 // 329
			type: "select-radio-inline",                                                                               // 330
			options: function () {                                                                                     // 331
				function options() {                                                                                      // 331
					return [{                                                                                                // 332
						label: "Ja",                                                                                            // 333
						value: "ja"                                                                                             // 334
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 336
						value: "nein"                                                                                           // 337
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	attentionUseText: {                                                                                          // 342
		type: String,                                                                                               // 343
		max: 1000,                                                                                                  // 344
		label: 'Weshalb?',                                                                                          // 345
		optional: false,                                                                                            // 346
		autoform: {                                                                                                 // 347
			afFieldInput: {                                                                                            // 348
				type: "textarea"                                                                                          // 349
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	prospects: {                                                                                                 // 353
		type: String,                                                                                               // 354
		max: 1000,                                                                                                  // 355
		label: 'Welche alternativen Anwendungsgebiete fuer ein kontextsensitives UI kannst du dir vorstellen?',     // 356
		optional: false,                                                                                            // 357
		autoform: {                                                                                                 // 358
			afFieldInput: {                                                                                            // 359
				type: "textarea"                                                                                          // 360
			}                                                                                                          //
		}                                                                                                           //
	}                                                                                                            //
                                                                                                              //
});                                                                                                           //
                                                                                                              //
Data.Detail.Schema = new SimpleSchema({                                                                       // 367
	userId: {                                                                                                    // 368
		type: String,                                                                                               // 369
		autoValue: function () {                                                                                    // 370
			function autoValue() {                                                                                     // 370
				return this.userId;                                                                                       // 371
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	timestamp: {                                                                                                 // 374
		type: Date,                                                                                                 // 375
		autoValue: function () {                                                                                    // 376
			function autoValue() {                                                                                     // 376
				return new Date();                                                                                        // 377
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	deviceType: {                                                                                                // 380
		type: String                                                                                                // 381
	},                                                                                                           //
	devicePlatform: {                                                                                            // 383
		type: String                                                                                                // 384
	},                                                                                                           //
	clickArea: {                                                                                                 // 386
		type: String,                                                                                               // 387
		allowedValues: ['favDel', 'browse', 'source', 'reveal', 'bar', 'mode']                                      // 388
	},                                                                                                           //
	mode: {                                                                                                      // 390
		type: String,                                                                                               // 391
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']                                           // 392
	},                                                                                                           //
	attention: {                                                                                                 // 394
		type: Boolean                                                                                               // 395
	}                                                                                                            //
});                                                                                                           //
                                                                                                              //
Data.Words.Schema = new SimpleSchema({                                                                        // 399
	userId: {                                                                                                    // 400
		type: String,                                                                                               // 401
		autoValue: function () {                                                                                    // 402
			function autoValue() {                                                                                     // 402
				return this.userId;                                                                                       // 403
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	vocabularyId: {                                                                                              // 406
		type: String                                                                                                // 407
	},                                                                                                           //
	vocabularyName: {                                                                                            // 409
		type: String                                                                                                // 410
	},                                                                                                           //
	viewed: {                                                                                                    // 412
		type: Number                                                                                                // 413
	},                                                                                                           //
	createdAt: {                                                                                                 // 415
		type: Date,                                                                                                 // 416
		autoValue: function () {                                                                                    // 417
			function autoValue() {                                                                                     // 417
				return new Date();                                                                                        // 418
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	}                                                                                                            //
});                                                                                                           //
                                                                                                              //
Data.Detail.attachSchema(Data.Detail.Schema);                                                                 // 423
Data.Words.attachSchema(Data.Words.Schema);                                                                   // 424
Data.Survey.attachSchema(Data.Survey.Schema);                                                                 // 425
Data.Feedback.attachSchema(Data.Feedback.Schema);                                                             // 426
Data.Status.attachSchema(Data.Status.Schema);                                                                 // 427
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favourites.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/collections/favourites.js                                                                           //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
var FavouritesSchema = new SimpleSchema({                                                                     // 1
  userId: {                                                                                                   // 2
    type: String,                                                                                             // 3
    autoValue: function () {                                                                                  // 4
      function autoValue() {                                                                                  // 4
        return this.userId;                                                                                   // 5
      }                                                                                                       //
                                                                                                              //
      return autoValue;                                                                                       //
    }()                                                                                                       //
  },                                                                                                          //
  vocabularyId: {                                                                                             // 8
    type: String                                                                                              // 9
  },                                                                                                          //
  createdAt: {                                                                                                // 11
    type: Date,                                                                                               // 12
    autoValue: function () {                                                                                  // 13
      function autoValue() {                                                                                  // 13
        return new Date();                                                                                    // 14
      }                                                                                                       //
                                                                                                              //
      return autoValue;                                                                                       //
    }(),                                                                                                      //
    autoform: {                                                                                               // 16
      type: "hidden"                                                                                          // 17
    }                                                                                                         //
  }                                                                                                           //
});                                                                                                           //
                                                                                                              //
Favourites = new Mongo.Collection('favourites', {});                                                          // 22
Favourites.attachSchema(FavouritesSchema);                                                                    // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"messages.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/collections/messages.js                                                                             //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
SimpleSchema.messages({                                                                                       // 1
  required: "[label] wird benoetigt.",                                                                        // 2
  minString: "[label] muss mindestens [min] Zeichen enthalten.",                                              // 3
  maxString: "[label] darf nicht mehr als [max] Zeichen enthalten.",                                          // 4
  minNumber: "[label] muss mindestens [min] sein.",                                                           // 5
  maxNumber: "[label] darf nicht hoeher als [max] sein.",                                                     // 6
  minDate: "[label] must be on or after [min]",                                                               // 7
  maxDate: "[label] cannot be after [max]",                                                                   // 8
  badDate: "[label] is not a valid date",                                                                     // 9
  minCount: "You must specify at least [minCount] values",                                                    // 10
  maxCount: "You cannot specify more than [maxCount] values",                                                 // 11
  noDecimal: "[label] muss eine gerade Zahl sein.",                                                           // 12
  notAllowed: "[value] kein zulaessiger Wert.",                                                               // 13
  expectedString: "[label] muss eine Zeichenkette sein.",                                                     // 14
  expectedNumber: "[label] muss eine Zahl sein.",                                                             // 15
  expectedBoolean: "[label] muss ein Bool-Wert sein.",                                                        // 16
  expectedArray: "[label] muss ein Array sein.",                                                              // 17
  expectedObject: "[label] muss ein Object sein.",                                                            // 18
  expectedConstructor: "[label] muss vom Typ [type] sein.",                                                   // 19
  regEx: [{ msg: "[label] failed regular expression validation" }, { exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address" }, { exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address" }, { exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain" }, { exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain" }, { exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address" }, { exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address" }, { exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address" }, { exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL" }, { exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID" }],
  keyNotInSchema: "[key] ist nicht im Schema erlaubt."                                                        // 32
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"userExt.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/collections/userExt.js                                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
UserExt = new Mongo.Collection('userExt', {});                                                                // 1
                                                                                                              //
UserExt.Schema = new SimpleSchema({                                                                           // 3
	userId: {                                                                                                    // 4
		type: String,                                                                                               // 5
		autoValue: function () {                                                                                    // 6
			function autoValue() {                                                                                     // 6
				return this.userId;                                                                                       // 7
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	userMail: {                                                                                                  // 10
		type: String,                                                                                               // 11
		autoValue: function () {                                                                                    // 12
			function autoValue() {                                                                                     // 12
				return Meteor.user().emails[0].address;                                                                   // 13
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	surveySubmitted: {                                                                                           // 16
		type: Boolean,                                                                                              // 17
		defaultValue: false                                                                                         // 18
	}                                                                                                            //
	// TODO last visited URL - save on logout                                                                    //
});                                                                                                           // 3
                                                                                                              //
UserExt.attachSchema(UserExt.Schema);                                                                         // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabulary.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/collections/vocabulary.js                                                                           //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
Vocabulary = new Mongo.Collection('vocabulary', {});                                                          // 1
                                                                                                              //
if (Meteor.isServer) {                                                                                        // 3
	Vocabulary._ensureIndex({                                                                                    // 4
		term: 1,                                                                                                    // 5
		description: 1                                                                                              // 6
	});                                                                                                          //
}                                                                                                             //
                                                                                                              //
Vocabulary.allow({                                                                                            // 10
	insert: function () {                                                                                        // 11
		function insert() {                                                                                         // 11
			return false;                                                                                              //
		}                                                                                                           //
                                                                                                              //
		return insert;                                                                                              //
	}(),                                                                                                         //
	update: function () {                                                                                        // 12
		function update() {                                                                                         // 12
			return false;                                                                                              //
		}                                                                                                           //
                                                                                                              //
		return update;                                                                                              //
	}(),                                                                                                         //
	remove: function () {                                                                                        // 13
		function remove() {                                                                                         // 13
			return false;                                                                                              //
		}                                                                                                           //
                                                                                                              //
		return remove;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
                                                                                                              //
Vocabulary.deny({                                                                                             // 16
	insert: function () {                                                                                        // 17
		function insert() {                                                                                         // 17
			return true;                                                                                               //
		}                                                                                                           //
                                                                                                              //
		return insert;                                                                                              //
	}(),                                                                                                         //
	update: function () {                                                                                        // 18
		function update() {                                                                                         // 18
			return true;                                                                                               //
		}                                                                                                           //
                                                                                                              //
		return update;                                                                                              //
	}(),                                                                                                         //
	remove: function () {                                                                                        // 19
		function remove() {                                                                                         // 19
			return true;                                                                                               //
		}                                                                                                           //
                                                                                                              //
		return remove;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
                                                                                                              //
var VocabularySchema = new SimpleSchema({                                                                     // 22
	term: {                                                                                                      // 23
		type: String,                                                                                               // 24
		regEx: /^[a-zA-Z]+$/                                                                                        // 25
	},                                                                                                           //
	description: {                                                                                               // 27
		type: String                                                                                                // 28
	}                                                                                                            //
});                                                                                                           //
                                                                                                              //
Vocabulary.attachSchema(VocabularySchema);                                                                    // 32
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config":{"accounts_t9n.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/config/accounts_t9n.js                                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
T9n.setLanguage('de');                                                                                        // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"admin.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/config/admin.js                                                                                     //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
AdminConfig = {                                                                                               // 1
	name: 'Chalimo',                                                                                             // 2
	adminEmails: ['bla@bla.org'],                                                                                // 3
	collections: {                                                                                               // 4
		Vocabulary: {}                                                                                              // 6
	}                                                                                                            //
};                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"at_config.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/config/at_config.js                                                                                 //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
// Options                                                                                                    //
AccountsTemplates.configure({                                                                                 // 2
  defaultLayout: 'layout',                                                                                    // 3
  defaultLayoutRegions: {                                                                                     // 4
    footer: 'footer'                                                                                          // 5
  },                                                                                                          //
  defaultContentRegion: 'main',                                                                               // 7
  showForgotPasswordLink: false,                                                                              // 8
  overrideLoginErrors: true,                                                                                  // 9
  enablePasswordChange: true,                                                                                 // 10
                                                                                                              //
  // sendVerificationEmail: true,                                                                             //
  // enforceEmailVerification: true,                                                                          //
  //confirmPassword: true,                                                                                    //
  //continuousValidation: false,                                                                              //
  //displayFormLabels: true,                                                                                  //
  //forbidClientAccountCreation: true,                                                                        //
  //formValidationFeedback: true,                                                                             //
  // homeRoutePath: '/',                                                                                      //
  // showAddRemoveServices: false,                                                                            //
  //showPlaceholders: true,                                                                                   //
                                                                                                              //
  negativeValidation: true,                                                                                   // 23
  positiveValidation: true,                                                                                   // 24
  negativeFeedback: false,                                                                                    // 25
  positiveFeedback: true                                                                                      // 26
                                                                                                              //
});                                                                                                           //
                                                                                                              //
// Privacy Policy and Terms of Use                                                                            //
//privacyUrl: 'privacy',                                                                                      //
//termsUrl: 'terms-of-use',                                                                                   //
var logout = function logout() {                                                                              // 33
  //example redirect after logout                                                                             //
  FlowRouter.go('/sign-in');                                                                                  // 35
};                                                                                                            //
                                                                                                              //
AccountsTemplates.configure({                                                                                 // 38
  onLogoutHook: logout                                                                                        // 39
});                                                                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// common/routes.js                                                                                           //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
// *** ROUTE FUNCTIONS                                                                                        //
                                                                                                              //
checkAttentionModeOff = function checkAttentionModeOff() {                                                    // 3
	if (Session.get(ATTENTION_MODE)) {                                                                           // 4
		Session.set(ATTENTION_MODE, false);                                                                         // 5
	}                                                                                                            //
};                                                                                                            //
                                                                                                              //
checkAttentionModeOn = function checkAttentionModeOn() {                                                      // 9
	if (!Session.get(ATTENTION_MODE)) {                                                                          // 10
		Session.set(ATTENTION_MODE, true);                                                                          // 11
	}                                                                                                            //
};                                                                                                            //
                                                                                                              //
resetSession = function resetSession() {                                                                      // 15
	Session.set(REVEALED, false);                                                                                // 16
	Session.set(TERM_WRONG, false);                                                                              // 17
};                                                                                                            //
                                                                                                              //
checkAdmin = function checkAdmin() {                                                                          // 20
	if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {                                                         // 21
		// FlowRouter.redirect('/notFound');                                                                        //
	}                                                                                                            //
};                                                                                                            //
                                                                                                              //
checkSurveySubmitted = function checkSurveySubmitted() {                                                      // 26
	var query = UserExt.findOne({ userId: Meteor.userId(), surveySubmitted: true });                             // 27
	if (query) {                                                                                                 // 28
		FlowRouter.redirect('/');                                                                                   // 29
	}                                                                                                            //
};                                                                                                            //
                                                                                                              //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                                                // 33
                                                                                                              //
// *** ROUTE GROUPS                                                                                           //
                                                                                                              //
var lowRoutes = FlowRouter.group({                                                                            // 37
	name: "low",                                                                                                 // 38
	triggersEnter: [checkAttentionModeOn],                                                                       // 39
	triggersExit: []                                                                                             // 40
});                                                                                                           //
var highRoutes = FlowRouter.group({                                                                           // 42
	name: "high",                                                                                                // 43
	triggersEnter: [checkAttentionModeOff],                                                                      // 44
	triggersExit: []                                                                                             // 45
});                                                                                                           //
                                                                                                              //
// *** ROUTES                                                                                                 //
                                                                                                              //
highRoutes.route('/', {                                                                                       // 52
	name: "index",                                                                                               // 53
	action: function () {                                                                                        // 54
		function action(params, queryParams) {                                                                      // 54
			BlazeLayout.render('layout', {                                                                             // 55
				bar: "bar",                                                                                               // 56
				nav: "nav",                                                                                               // 57
				main: "index"                                                                                             // 58
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
highRoutes.route('/trainer', {                                                                                // 62
	name: "trainer",                                                                                             // 63
	action: function () {                                                                                        // 64
		function action(params, queryParams) {                                                                      // 64
			BlazeLayout.render('layout', {                                                                             // 65
				bar: "bar",                                                                                               // 66
				nav: "nav",                                                                                               // 67
				navModeTrainer: "navModeTrainer",                                                                         // 68
				main: "trainer",                                                                                          // 69
				navSource: "navSourceTrainer"                                                                             // 70
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
                                                                                                              //
highRoutes.route('/register/:id', {                                                                           // 75
	name: "vokabelDetail",                                                                                       // 76
	action: function () {                                                                                        // 77
		function action(params, queryParams) {                                                                      // 77
			BlazeLayout.render('layout', {                                                                             // 78
				bar: "bar",                                                                                               // 79
				nav: "nav",                                                                                               // 80
				main: "vokabelDetail"                                                                                     // 81
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
highRoutes.route('/register', {                                                                               // 85
	name: "register",                                                                                            // 86
	action: function () {                                                                                        // 87
		function action(params, queryParams) {                                                                      // 87
			BlazeLayout.render('layout', {                                                                             // 88
				bar: "bar",                                                                                               // 89
				nav: "nav",                                                                                               // 90
				main: "register"                                                                                          // 91
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
highRoutes.route('/uebersicht', {                                                                             // 95
	name: "uebersicht",                                                                                          // 96
	action: function () {                                                                                        // 97
		function action(params, queryParams) {                                                                      // 97
			FlowRouter.redirect('/uebersicht/feedback');                                                               // 98
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 100
});                                                                                                           //
highRoutes.route('/uebersicht/statistik', {                                                                   // 102
	name: "statistik",                                                                                           // 103
	action: function () {                                                                                        // 104
		function action(params, queryParams) {                                                                      // 104
			FlowRouter.redirect('/uebersicht/statistik/total');                                                        // 105
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 107
});                                                                                                           //
highRoutes.route('/uebersicht/statistik/device', {                                                            // 109
	name: "device",                                                                                              // 110
	action: function () {                                                                                        // 111
		function action(params, queryParams) {                                                                      // 111
			BlazeLayout.render('layout', {                                                                             // 112
				bar: "bar",                                                                                               // 113
				nav: "nav",                                                                                               // 114
				navOverview: "navOverview",                                                                               // 115
				navStatistics: "navStatistics",                                                                           // 116
				main: "device"                                                                                            // 117
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 120
});                                                                                                           //
highRoutes.route('/uebersicht/statistik/mode', {                                                              // 122
	name: "mode",                                                                                                // 123
	action: function () {                                                                                        // 124
		function action(params, queryParams) {                                                                      // 124
			BlazeLayout.render('layout', {                                                                             // 125
				bar: "bar",                                                                                               // 126
				nav: "nav",                                                                                               // 127
				navOverview: "navOverview",                                                                               // 128
				navStatistics: "navStatistics",                                                                           // 129
				main: "mode"                                                                                              // 130
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 133
});                                                                                                           //
highRoutes.route('/uebersicht/statistik/status', {                                                            // 135
	name: "status",                                                                                              // 136
	action: function () {                                                                                        // 137
		function action(params, queryParams) {                                                                      // 137
			BlazeLayout.render('layout', {                                                                             // 138
				bar: "bar",                                                                                               // 139
				nav: "nav",                                                                                               // 140
				navOverview: "navOverview",                                                                               // 141
				navStatistics: "navStatistics",                                                                           // 142
				main: "status"                                                                                            // 143
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 146
});                                                                                                           //
highRoutes.route('/uebersicht/statistik/total', {                                                             // 148
	name: "total",                                                                                               // 149
	action: function () {                                                                                        // 150
		function action(params, queryParams) {                                                                      // 150
			BlazeLayout.render('layout', {                                                                             // 151
				bar: "bar",                                                                                               // 152
				nav: "nav",                                                                                               // 153
				navOverview: "navOverview",                                                                               // 154
				navStatistics: "navStatistics",                                                                           // 155
				main: "total"                                                                                             // 156
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 159
});                                                                                                           //
                                                                                                              //
highRoutes.route('/uebersicht/feedback', {                                                                    // 162
	name: "feedback",                                                                                            // 163
	action: function () {                                                                                        // 164
		function action(params, queryParams) {                                                                      // 164
			BlazeLayout.render('layout', {                                                                             // 165
				bar: "bar",                                                                                               // 166
				nav: "nav",                                                                                               // 167
				navOverview: "navOverview",                                                                               // 168
				main: "feedback"                                                                                          // 169
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 172
});                                                                                                           //
highRoutes.route('/fragebogen', {                                                                             // 174
	name: "fragebogen",                                                                                          // 175
	triggersEnter: [checkSurveySubmitted],                                                                       // 176
	action: function () {                                                                                        // 177
		function action(params, queryParams) {                                                                      // 177
			BlazeLayout.render('layout', {                                                                             // 178
				bar: "bar",                                                                                               // 179
				nav: "nav",                                                                                               // 180
				main: "fragebogen"                                                                                        // 181
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: []                                                                                            // 184
});                                                                                                           //
                                                                                                              //
lowRoutes.route('/low', {                                                                                     // 187
	name: "low",                                                                                                 // 188
	action: function () {                                                                                        // 189
		function action(params, queryParams) {                                                                      // 189
			BlazeLayout.render('layout', {                                                                             // 190
				bar: "bar",                                                                                               // 191
				main: "low",                                                                                              // 192
				navSource: "navLow"                                                                                       // 193
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: []                                                                                            // 196
});                                                                                                           //
                                                                                                              //
FlowRouter.notFound = {                                                                                       // 199
	name: "notFound",                                                                                            // 200
	action: function () {                                                                                        // 201
		function action(params, queryParams) {                                                                      // 201
			BlazeLayout.render('layout', {                                                                             // 202
				footer: "footer",                                                                                         // 203
				main: "pageNotFound"                                                                                      // 204
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
};                                                                                                            //
                                                                                                              //
//Routes                                                                                                      //
AccountsTemplates.configureRoute('changePwd');                                                                // 211
// AccountsTemplates.configureRoute('forgotPwd');                                                             //
AccountsTemplates.configureRoute('resetPwd');                                                                 // 213
AccountsTemplates.configureRoute('signIn');                                                                   // 214
AccountsTemplates.configureRoute('signUp');                                                                   // 215
// AccountsTemplates.configureRoute('verifyEmail');                                                           //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./server/lib/config/accounts.js");
require("./server/lib/config/email.js");
require("./common/aux/aux.js");
require("./common/aux/nvd3_extra.js");
require("./common/aux/validation.js");
require("./common/collections/data.js");
require("./common/collections/favourites.js");
require("./common/collections/messages.js");
require("./common/collections/userExt.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/admin.js");
require("./common/config/at_config.js");
require("./common/routes.js");
require("./server/methods.js");
require("./server/publication.js");
require("./server/startup.js");
require("./server/vocabularySeed.js");
//# sourceMappingURL=app.js.map
