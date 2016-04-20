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
Meteor.publish("userExtension", function () {                                                                 // 1
	var currentUserId = this.userId;                                                                             // 2
	var data = UserExt.find({                                                                                    // 3
		userId: currentUserId                                                                                       // 4
	});                                                                                                          //
	if (data) {                                                                                                  // 6
		return data;                                                                                                // 7
	}                                                                                                            //
	return this.ready();                                                                                         // 9
});                                                                                                           //
Meteor.publish("feedback", function () {                                                                      // 11
	var data = Data.Feedback.find({});                                                                           // 12
	if (data) {                                                                                                  // 13
		return data;                                                                                                // 14
	}                                                                                                            //
	return this.ready();                                                                                         // 16
});                                                                                                           //
                                                                                                              //
//  search query                                                                                              //
Meteor.publish('vocabularyRegister', function (search) {                                                      // 21
	check(search, Match.OneOf(String, null, undefined));                                                         // 22
	var query = {},                                                                                              // 23
	    projection = {                                                                                           //
		limit: 0,                                                                                                   // 25
		sort: {                                                                                                     // 26
			term: 1                                                                                                    // 27
		}                                                                                                           //
	};                                                                                                           //
	if (search) {                                                                                                // 30
		var regex = new RegExp(search, 'i');                                                                        // 31
		query = {                                                                                                   // 32
			$or: [{                                                                                                    // 33
				term: regex                                                                                               // 34
			}, {                                                                                                       //
				description: regex                                                                                        // 36
			}]                                                                                                         //
		};                                                                                                          //
		projection.limit = 0;                                                                                       // 39
	}                                                                                                            //
	return Vocabulary.find(query, projection);                                                                   // 41
});                                                                                                           //
                                                                                                              //
Meteor.publish("vocabularyAll", function () {                                                                 // 44
	var data = Vocabulary.find({});                                                                              // 45
	if (data) {                                                                                                  // 46
		return data;                                                                                                // 47
	}                                                                                                            //
	return this.ready();                                                                                         // 49
});                                                                                                           //
                                                                                                              //
Meteor.publish("ownedFavourites", function () {                                                               // 52
	var currentUserId = this.userId;                                                                             // 53
	var data = Favourites.find({                                                                                 // 54
		userId: currentUserId                                                                                       // 55
	});                                                                                                          //
	if (data) {                                                                                                  // 57
		return data;                                                                                                // 58
	}                                                                                                            //
	return this.ready();                                                                                         // 60
});                                                                                                           //
                                                                                                              //
Meteor.publish('singleEntry', function (entryId) {                                                            // 63
	return Vocabulary.find({                                                                                     // 64
		_id: entryId                                                                                                // 65
	});                                                                                                          //
});                                                                                                           //
                                                                                                              //
Meteor.publish('dataWords', function () {                                                                     // 69
	var data = Data.Words.find({}, {                                                                             // 70
		sort: {                                                                                                     // 71
			viewed: -1                                                                                                 // 72
		}                                                                                                           //
	});                                                                                                          //
	if (data) {                                                                                                  // 75
		return data;                                                                                                // 76
	}                                                                                                            //
	return this.ready();                                                                                         // 78
});                                                                                                           //
                                                                                                              //
Meteor.publish('dataDetail', function () {                                                                    // 81
	var data = Data.Detail.find({});                                                                             // 82
	if (data) {                                                                                                  // 83
		return data;                                                                                                // 84
	}                                                                                                            //
	return this.ready();                                                                                         // 86
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
                                                                                                              //
Data.Survey.allow({                                                                                           // 7
	insert: function () {                                                                                        // 8
		function insert() {                                                                                         // 8
			return true;                                                                                               // 9
		}                                                                                                           //
                                                                                                              //
		return insert;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
Data.Feedback.allow({                                                                                         // 12
	insert: function () {                                                                                        // 13
		function insert() {                                                                                         // 13
			return true;                                                                                               // 14
		}                                                                                                           //
                                                                                                              //
		return insert;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
                                                                                                              //
Data.Feedback.Schema = new SimpleSchema({                                                                     // 18
	userId: {                                                                                                    // 19
		type: String,                                                                                               // 20
		autoValue: function () {                                                                                    // 21
			function autoValue() {                                                                                     // 21
				return this.userId;                                                                                       // 22
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	userMail: {                                                                                                  // 25
		type: String,                                                                                               // 26
		autoValue: function () {                                                                                    // 27
			function autoValue() {                                                                                     // 27
				return Meteor.user().emails[0].address;                                                                   // 28
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	message: {                                                                                                   // 31
		type: String,                                                                                               // 32
		max: 1000,                                                                                                  // 33
		autoform: {                                                                                                 // 34
			afFieldInput: {                                                                                            // 35
				type: "textarea"                                                                                          // 36
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	createdAt: {                                                                                                 // 40
		type: Date,                                                                                                 // 41
		autoValue: function () {                                                                                    // 42
			function autoValue() {                                                                                     // 42
				return new Date();                                                                                        // 43
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	}                                                                                                            //
});                                                                                                           //
                                                                                                              //
Data.Survey.Schema = new SimpleSchema({                                                                       // 48
	// GENERAL                                                                                                   //
	userId: {                                                                                                    // 50
		type: String,                                                                                               // 51
		autoValue: function () {                                                                                    // 52
			function autoValue() {                                                                                     // 52
				return this.userId;                                                                                       // 53
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}(),                                                                                                        //
		autoform: {                                                                                                 // 55
			type: "hidden",                                                                                            // 56
			label: false                                                                                               // 57
		}                                                                                                           //
	},                                                                                                           //
	age: {                                                                                                       // 60
		type: Number,                                                                                               // 61
		label: 'Dein Alter',                                                                                        // 62
		min: 18,                                                                                                    // 63
		max: 99                                                                                                     // 64
	},                                                                                                           //
                                                                                                              //
	previousExperience: {                                                                                        // 67
		type: String,                                                                                               // 68
		label: 'Wie steht es um deine Vorerfahrung mit digitalen Vokabeltrainern?',                                 // 69
		autoform: {                                                                                                 // 70
			type: "select-radio-inline",                                                                               // 71
			options: function () {                                                                                     // 72
				function options() {                                                                                      // 72
					return [{                                                                                                // 73
						label: "gar keine",                                                                                     // 74
						value: "keine"                                                                                          // 75
					}, {                                                                                                     //
						label: "mal probiert",                                                                                  // 77
						value: "probiert"                                                                                       // 78
					}, {                                                                                                     //
						label: "nutze ich regelmaessig",                                                                        // 80
						value: "regelmaessig"                                                                                   // 81
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	learningCurve: {                                                                                             // 86
		type: String,                                                                                               // 87
		label: 'Wie ist dir die Einarbeitung in die App gefallen?',                                                 // 88
		autoform: {                                                                                                 // 89
			type: "select-radio-inline",                                                                               // 90
			options: function () {                                                                                     // 91
				function options() {                                                                                      // 91
					return [{                                                                                                // 92
						label: "Leicht",                                                                                        // 93
						value: "leicht"                                                                                         // 94
					}, {                                                                                                     //
						label: "Mittel",                                                                                        // 96
						value: "mittel"                                                                                         // 97
					}, {                                                                                                     //
						label: "Schwer",                                                                                        // 99
						value: "schwer"                                                                                         // 100
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	everydayUse: {                                                                                               // 105
		type: String,                                                                                               // 106
		label: 'Konntest du den Gebrauch der App muehelos in deinen Alltag integrieren?',                           // 107
		autoform: {                                                                                                 // 108
			type: "select-radio-inline",                                                                               // 109
			options: function () {                                                                                     // 110
				function options() {                                                                                      // 110
					return [{                                                                                                // 111
						label: "Ja",                                                                                            // 112
						value: "ja"                                                                                             // 113
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 115
						value: "nein"                                                                                           // 116
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	everydayUseText: {                                                                                           // 121
		type: String,                                                                                               // 122
		max: 1000,                                                                                                  // 123
		label: 'Weshalb?',                                                                                          // 124
		autoform: {                                                                                                 // 125
			afFieldInput: {                                                                                            // 126
				type: "textarea"                                                                                          // 127
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	usability: {                                                                                                 // 131
		type: String,                                                                                               // 132
		label: 'Wie kommst du mit der Bedienung der App zurecht?',                                                  // 133
		autoform: {                                                                                                 // 134
			type: "select-radio-inline",                                                                               // 135
			options: function () {                                                                                     // 136
				function options() {                                                                                      // 136
					return [{                                                                                                // 137
						label: "gar nicht",                                                                                     // 138
						value: "nicht"                                                                                          // 139
					}, {                                                                                                     //
						label: "ok",                                                                                            // 141
						value: "ok"                                                                                             // 142
					}, {                                                                                                     //
						label: "super",                                                                                         // 144
						value: "super"                                                                                          // 145
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	usabilityText: {                                                                                             // 150
		type: String,                                                                                               // 151
		max: 1000,                                                                                                  // 152
		label: 'Teile deine Ideen zur Bedienung (optional)',                                                        // 153
		optional: true,                                                                                             // 154
		autoform: {                                                                                                 // 155
			afFieldInput: {                                                                                            // 156
				type: "textarea"                                                                                          // 157
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	// NUTZUNGSVERHALTEN                                                                                         //
	deviceMobile: {                                                                                              // 162
		type: String,                                                                                               // 163
		label: 'Mobile:',                                                                                           // 164
		autoform: {                                                                                                 // 165
			type: "select-radio-inline",                                                                               // 166
			options: function () {                                                                                     // 167
				function options() {                                                                                      // 167
					return [{                                                                                                // 168
						label: "Ja",                                                                                            // 169
						value: "ja"                                                                                             // 170
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 172
						value: "nein"                                                                                           // 173
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	deviceTablet: {                                                                                              // 178
		type: String,                                                                                               // 179
		label: 'Tablet:',                                                                                           // 180
		autoform: {                                                                                                 // 181
			type: "select-radio-inline",                                                                               // 182
			options: function () {                                                                                     // 183
				function options() {                                                                                      // 183
					return [{                                                                                                // 184
						label: "Ja",                                                                                            // 185
						value: "ja"                                                                                             // 186
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 188
						value: "nein"                                                                                           // 189
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	deviceDesktop: {                                                                                             // 194
		type: String,                                                                                               // 195
		label: 'Desktop:',                                                                                          // 196
		autoform: {                                                                                                 // 197
			type: "select-radio-inline",                                                                               // 198
			options: function () {                                                                                     // 199
				function options() {                                                                                      // 199
					return [{                                                                                                // 200
						label: "Ja",                                                                                            // 201
						value: "ja"                                                                                             // 202
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 204
						value: "nein"                                                                                           // 205
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	deviceBehavior: {                                                                                            // 210
		type: String,                                                                                               // 211
		max: 1000,                                                                                                  // 212
		label: 'Falls du mehrere Endgeraete benutzt hast um die App aufzurufen: Inwiefern hat sich dein Nutzungsverhalten unterschieden?',
		optional: false,                                                                                            // 214
		autoform: {                                                                                                 // 215
			afFieldInput: {                                                                                            // 216
				type: "textarea"                                                                                          // 217
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	favouriteMode: {                                                                                             // 221
		type: String,                                                                                               // 222
		label: 'Welchen Trainermodus hast du am liebsten genutzt?',                                                 // 223
		autoform: {                                                                                                 // 224
			type: "select-radio-inline",                                                                               // 225
			options: function () {                                                                                     // 226
				function options() {                                                                                      // 226
					return [{                                                                                                // 227
						label: "Lesen",                                                                                         // 228
						value: "lesen"                                                                                          // 229
					}, {                                                                                                     //
						label: "Wort",                                                                                          // 231
						value: "wort"                                                                                           // 232
					}, {                                                                                                     //
						label: "Definition",                                                                                    // 234
						value: "definition"                                                                                     // 235
					}, {                                                                                                     //
						label: "Texteingabe",                                                                                   // 237
						value: "eingabe"                                                                                        // 238
					}, {                                                                                                     //
						label: "Register",                                                                                      // 240
						value: "register"                                                                                       // 241
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	favouriteModeText: {                                                                                         // 246
		type: String,                                                                                               // 247
		max: 1000,                                                                                                  // 248
		label: 'Weshalb?',                                                                                          // 249
		optional: false,                                                                                            // 250
		autoform: {                                                                                                 // 251
			afFieldInput: {                                                                                            // 252
				type: "textarea"                                                                                          // 253
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	attentionBenefit: {                                                                                          // 257
		type: String,                                                                                               // 258
		label: 'Hat dir die Moeglichkeit, das UI kontextorientiert zu veraendern, gefallen?',                       // 259
		autoform: {                                                                                                 // 260
			type: "select-radio-inline",                                                                               // 261
			options: function () {                                                                                     // 262
				function options() {                                                                                      // 262
					return [{                                                                                                // 263
						label: "Ja",                                                                                            // 264
						value: "ja"                                                                                             // 265
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 267
						value: "nein"                                                                                           // 268
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	attentionBehavior: {                                                                                         // 273
		type: String,                                                                                               // 274
		label: 'Hat die Moeglichkeit, das UI kontextorientiert zu veraendern, dein Nutzungsverhalten beeinflusst?',
		autoform: {                                                                                                 // 276
			type: "select-radio-inline",                                                                               // 277
			options: function () {                                                                                     // 278
				function options() {                                                                                      // 278
					return [{                                                                                                // 279
						label: "Ja",                                                                                            // 280
						value: "ja"                                                                                             // 281
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 283
						value: "nein"                                                                                           // 284
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	attentionBehaviorText: {                                                                                     // 289
		type: String,                                                                                               // 290
		max: 1000,                                                                                                  // 291
		label: 'Weshalb?',                                                                                          // 292
		autoform: {                                                                                                 // 293
			afFieldInput: {                                                                                            // 294
				type: "textarea"                                                                                          // 295
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	attentionSituation: {                                                                                        // 299
		type: String,                                                                                               // 300
		label: 'Wann, wo und in welcher Situation hast du beschlossen, das UI zu wechseln? (Beispiel)',             // 301
		optional: false,                                                                                            // 302
		autoform: {                                                                                                 // 303
			afFieldInput: {                                                                                            // 304
				type: "textarea"                                                                                          // 305
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	attentionUse: {                                                                                              // 309
		type: String,                                                                                               // 310
		label: 'Siehst du generell einen Vorteil in der Moeglichkeit das UI kontextorientiert anzupassen?',         // 311
		autoform: {                                                                                                 // 312
			type: "select-radio-inline",                                                                               // 313
			options: function () {                                                                                     // 314
				function options() {                                                                                      // 314
					return [{                                                                                                // 315
						label: "Ja",                                                                                            // 316
						value: "ja"                                                                                             // 317
					}, {                                                                                                     //
						label: "Nein",                                                                                          // 319
						value: "nein"                                                                                           // 320
					}];                                                                                                      //
				}                                                                                                         //
                                                                                                              //
				return options;                                                                                           //
			}()                                                                                                        //
		}                                                                                                           //
	},                                                                                                           //
	attentionUseText: {                                                                                          // 325
		type: String,                                                                                               // 326
		max: 1000,                                                                                                  // 327
		label: 'Weshalb?',                                                                                          // 328
		optional: false,                                                                                            // 329
		autoform: {                                                                                                 // 330
			afFieldInput: {                                                                                            // 331
				type: "textarea"                                                                                          // 332
			}                                                                                                          //
		}                                                                                                           //
	},                                                                                                           //
	prospects: {                                                                                                 // 336
		type: String,                                                                                               // 337
		max: 1000,                                                                                                  // 338
		label: 'Welche alternativen Anwendungsgebiete fuer ein kontextsensitives UI kannst du dir vorstellen?',     // 339
		optional: false,                                                                                            // 340
		autoform: {                                                                                                 // 341
			afFieldInput: {                                                                                            // 342
				type: "textarea"                                                                                          // 343
			}                                                                                                          //
		}                                                                                                           //
	}                                                                                                            //
                                                                                                              //
});                                                                                                           //
                                                                                                              //
Data.Detail.Schema = new SimpleSchema({                                                                       // 350
	userId: {                                                                                                    // 351
		type: String,                                                                                               // 352
		autoValue: function () {                                                                                    // 353
			function autoValue() {                                                                                     // 353
				return this.userId;                                                                                       // 354
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	timestamp: {                                                                                                 // 357
		type: Date,                                                                                                 // 358
		autoValue: function () {                                                                                    // 359
			function autoValue() {                                                                                     // 359
				return new Date();                                                                                        // 360
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	deviceType: {                                                                                                // 363
		type: String                                                                                                // 364
	},                                                                                                           //
	devicePlatform: {                                                                                            // 366
		type: String                                                                                                // 367
	},                                                                                                           //
	clickArea: {                                                                                                 // 369
		type: String,                                                                                               // 370
		allowedValues: ['favDel', 'browse', 'source', 'reveal', 'bar', 'mode']                                      // 371
	},                                                                                                           //
	mode: {                                                                                                      // 373
		type: String,                                                                                               // 374
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']                                           // 375
	},                                                                                                           //
	attention: {                                                                                                 // 377
		type: Boolean                                                                                               // 378
	}                                                                                                            //
});                                                                                                           //
                                                                                                              //
Data.Words.Schema = new SimpleSchema({                                                                        // 382
	userId: {                                                                                                    // 383
		type: String,                                                                                               // 384
		autoValue: function () {                                                                                    // 385
			function autoValue() {                                                                                     // 385
				return this.userId;                                                                                       // 386
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	},                                                                                                           //
	vocabularyId: {                                                                                              // 389
		type: String                                                                                                // 390
	},                                                                                                           //
	vocabularyName: {                                                                                            // 392
		type: String                                                                                                // 393
	},                                                                                                           //
	viewed: {                                                                                                    // 395
		type: Number                                                                                                // 396
	},                                                                                                           //
	createdAt: {                                                                                                 // 398
		type: Date,                                                                                                 // 399
		autoValue: function () {                                                                                    // 400
			function autoValue() {                                                                                     // 400
				return new Date();                                                                                        // 401
			}                                                                                                          //
                                                                                                              //
			return autoValue;                                                                                          //
		}()                                                                                                         //
	}                                                                                                            //
});                                                                                                           //
                                                                                                              //
Data.Detail.attachSchema(Data.Detail.Schema);                                                                 // 406
Data.Words.attachSchema(Data.Words.Schema);                                                                   // 407
Data.Survey.attachSchema(Data.Survey.Schema);                                                                 // 408
Data.Feedback.attachSchema(Data.Feedback.Schema);                                                             // 409
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
  keyNotInSchema: "[key] ist nicht erlaubt im Schema."                                                        // 32
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
});                                                                                                           //
                                                                                                              //
UserExt.attachSchema(UserExt.Schema);                                                                         // 22
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
		FlowRouter.redirect('/notFound');                                                                           // 22
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
highRoutes.route('/eingabe', {                                                                                // 62
	name: "eingabe",                                                                                             // 63
	action: function () {                                                                                        // 64
		function action(params, queryParams) {                                                                      // 64
			BlazeLayout.render('layout', {                                                                             // 65
				bar: "bar",                                                                                               // 66
				nav: "nav",                                                                                               // 67
				main: "eingabe",                                                                                          // 68
				navSource: "navSource"                                                                                    // 69
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
                                                                                                              //
highRoutes.route('/register/:id', {                                                                           // 74
	name: "vokabelDetail",                                                                                       // 75
	action: function () {                                                                                        // 76
		function action(params, queryParams) {                                                                      // 76
			BlazeLayout.render('layout', {                                                                             // 77
				bar: "bar",                                                                                               // 78
				nav: "nav",                                                                                               // 79
				main: "vokabelDetail"                                                                                     // 80
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
highRoutes.route('/register', {                                                                               // 84
	name: "register",                                                                                            // 85
	action: function () {                                                                                        // 86
		function action(params, queryParams) {                                                                      // 86
			BlazeLayout.render('layout', {                                                                             // 87
				bar: "bar",                                                                                               // 88
				nav: "nav",                                                                                               // 89
				main: "register"                                                                                          // 90
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
});                                                                                                           //
highRoutes.route('/uebersicht', {                                                                             // 94
	name: "uebersicht",                                                                                          // 95
	action: function () {                                                                                        // 96
		function action(params, queryParams) {                                                                      // 96
			FlowRouter.redirect('/uebersicht/feedback');                                                               // 97
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 99
});                                                                                                           //
highRoutes.route('/uebersicht/statistik', {                                                                   // 101
	name: "statistik",                                                                                           // 102
	action: function () {                                                                                        // 103
		function action(params, queryParams) {                                                                      // 103
			BlazeLayout.render('layout', {                                                                             // 104
				bar: "bar",                                                                                               // 105
				nav: "nav",                                                                                               // 106
				navOverview: "navOverview",                                                                               // 107
				main: "statistik"                                                                                         // 108
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 111
});                                                                                                           //
highRoutes.route('/uebersicht/feedback', {                                                                    // 113
	name: "feedback",                                                                                            // 114
	action: function () {                                                                                        // 115
		function action(params, queryParams) {                                                                      // 115
			BlazeLayout.render('layout', {                                                                             // 116
				bar: "bar",                                                                                               // 117
				nav: "nav",                                                                                               // 118
				navOverview: "navOverview",                                                                               // 119
				main: "feedback"                                                                                          // 120
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: [checkAdmin]                                                                                  // 123
});                                                                                                           //
highRoutes.route('/fragebogen', {                                                                             // 125
	name: "fragebogen",                                                                                          // 126
	triggersEnter: [checkSurveySubmitted],                                                                       // 127
	action: function () {                                                                                        // 128
		function action(params, queryParams) {                                                                      // 128
			BlazeLayout.render('layout', {                                                                             // 129
				bar: "bar",                                                                                               // 130
				nav: "nav",                                                                                               // 131
				main: "fragebogen"                                                                                        // 132
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: []                                                                                            // 135
});                                                                                                           //
                                                                                                              //
lowRoutes.route('/low', {                                                                                     // 138
	name: "low",                                                                                                 // 139
	action: function () {                                                                                        // 140
		function action(params, queryParams) {                                                                      // 140
			BlazeLayout.render('layout', {                                                                             // 141
				bar: "bar",                                                                                               // 142
				nav: "navMode",                                                                                           // 143
				main: "low",                                                                                              // 144
				navSource: "navSource"                                                                                    // 145
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}(),                                                                                                         //
	triggersEnter: []                                                                                            // 148
});                                                                                                           //
                                                                                                              //
FlowRouter.notFound = {                                                                                       // 151
	name: "notFound",                                                                                            // 152
	action: function () {                                                                                        // 153
		function action(params, queryParams) {                                                                      // 153
			BlazeLayout.render('layout', {                                                                             // 154
				footer: "footer",                                                                                         // 155
				main: "pageNotFound"                                                                                      // 156
			});                                                                                                        //
		}                                                                                                           //
                                                                                                              //
		return action;                                                                                              //
	}()                                                                                                          //
};                                                                                                            //
                                                                                                              //
//Routes                                                                                                      //
AccountsTemplates.configureRoute('changePwd');                                                                // 163
// AccountsTemplates.configureRoute('forgotPwd');                                                             //
AccountsTemplates.configureRoute('resetPwd');                                                                 // 165
AccountsTemplates.configureRoute('signIn');                                                                   // 166
AccountsTemplates.configureRoute('signUp');                                                                   // 167
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
require("./server/vocabularySeed.js");
//# sourceMappingURL=app.js.map
