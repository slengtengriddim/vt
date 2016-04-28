var require = meteorInstall({"server":{"lib":{"config":{"accounts.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// server/lib/config/accounts.js                                                                          //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
                                                                                                          //
Meteor.startup(function () {});                                                                           // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"email.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// server/lib/config/email.js                                                                             //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
                                                                                                          //
// Accounts.emailTemplates.siteName = "MySite";                                                           //
//                                                                                                        //
// Accounts.emailTemplates.from = "MySite <support@mysite.com>";                                          //
//                                                                                                        //
// Accounts.emailTemplates.resetPassword.subject = function (user) {                                      //
//     return "Message for " + user.profile.displayName;                                                  //
// };                                                                                                     //
//                                                                                                        //
// Accounts.emailTemplates.resetPassword.text = function (user, url) {                                    //
//     var signature = "MySite Bot";                                                                      //
//     //var president = President.findOne();                                                             //
//     //if (president)                                                                                   //
//     //    president = Meteor.users.findOne(president.presidentId);                                     //
//     //    signature = president.profile.displayName + ", the MySite President.";                       //
//                                                                                                        //
//     return "Dear " + user.profile.displayName + ",\n\n" +                                              //
//         "Click the following link to set your new password:\n" +                                       //
//         url + "\n\n" +                                                                                 //
//         "Please never forget it again!!!\n\n\n" +                                                      //
//         "Cheers,\n" +                                                                                  //
//         signature;                                                                                     //
// };                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"methods.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// server/methods.js                                                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
Meteor.methods({                                                                                          // 1
	deleteFavourite: function () {                                                                           // 2
		function deleteFavourite(vocabularyId) {                                                                //
			check(vocabularyId, String);                                                                           // 3
			Favourites.remove({                                                                                    // 4
				vocabularyId: vocabularyId                                                                            // 5
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return deleteFavourite;                                                                                 //
	}(),                                                                                                     //
	insertFavourite: function () {                                                                           // 8
		function insertFavourite(vocabularyId) {                                                                //
			check(vocabularyId, String);                                                                           // 9
			Favourites.insert({                                                                                    // 10
				vocabularyId: vocabularyId                                                                            // 11
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return insertFavourite;                                                                                 //
	}(),                                                                                                     //
	dataWords: function () {                                                                                 // 14
		function dataWords(obj) {                                                                               //
			Data.Words.upsert({                                                                                    // 15
				vocabularyId: obj._id,                                                                                // 16
				userId: this.userId                                                                                   // 17
			}, {                                                                                                   //
				$setOnInsert: {                                                                                       // 19
					vocabularyId: obj._id,                                                                               // 20
					userId: this.userId,                                                                                 // 21
					vocabularyName: obj.term,                                                                            // 22
					viewed: 0                                                                                            // 23
				},                                                                                                    //
				$inc: {                                                                                               // 25
					viewed: 1                                                                                            // 26
				}                                                                                                     //
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return dataWords;                                                                                       //
	}(),                                                                                                     //
	dataDetail: function () {                                                                                // 30
		function dataDetail(deviceType, devicePlatform, route, clickArea, mode, attention) {                    //
			Data.Detail.insert({                                                                                   // 31
				deviceType: deviceType,                                                                               // 32
				devicePlatform: devicePlatform,                                                                       // 33
				route: route,                                                                                         // 34
				clickArea: clickArea,                                                                                 // 35
				mode: mode,                                                                                           // 36
				attention: attention                                                                                  // 37
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return dataDetail;                                                                                      //
	}(),                                                                                                     //
	surveySubmitted: function () {                                                                           // 40
		function surveySubmitted() {                                                                            //
			UserExt.upsert({                                                                                       // 41
				userId: this.userId                                                                                   // 42
			}, {                                                                                                   //
				$setOnInsert: {                                                                                       // 44
					userId: this.userId,                                                                                 // 45
					surveySubmitted: true                                                                                // 46
				}                                                                                                     //
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return surveySubmitted;                                                                                 //
	}()                                                                                                      //
});                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publication.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// server/publication.js                                                                                  //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
Meteor.publish("user", function () {                                                                      // 1
	return Meteor.users.find({});                                                                            // 2
});                                                                                                       //
Meteor.publish("userExt", function () {                                                                   // 4
	var currentUserId = this.userId;                                                                         // 5
	var data = UserExt.find({ userId: this.userId });                                                        // 6
	if (data) {                                                                                              // 7
		return data;                                                                                            // 8
	}                                                                                                        //
	return this.ready();                                                                                     // 10
});                                                                                                       //
Meteor.publish("userExtAll", function () {                                                                // 12
	var currentUserId = this.userId;                                                                         // 13
	var data = UserExt.find({});                                                                             // 14
	if (data) {                                                                                              // 15
		return data;                                                                                            // 16
	}                                                                                                        //
	return this.ready();                                                                                     // 18
});                                                                                                       //
Meteor.publish("userStatus", function () {                                                                // 20
	var data = Data.Status.find({});                                                                         // 21
	if (data) {                                                                                              // 22
		return data;                                                                                            // 23
	}                                                                                                        //
	return this.ready();                                                                                     // 25
});                                                                                                       //
Meteor.publish("feedback", function () {                                                                  // 27
	var data = Data.Feedback.find({});                                                                       // 28
	if (data) {                                                                                              // 29
		return data;                                                                                            // 30
	}                                                                                                        //
	return this.ready();                                                                                     // 32
});                                                                                                       //
                                                                                                          //
//  search query                                                                                          //
Meteor.publish('vocabularyRegister', function (search) {                                                  // 37
	check(search, Match.OneOf(String, null, undefined));                                                     // 38
	var query = {},                                                                                          // 39
	    projection = {                                                                                       //
		limit: 0,                                                                                               // 41
		sort: {                                                                                                 // 42
			term: 1                                                                                                // 43
		}                                                                                                       //
	};                                                                                                       //
	if (search) {                                                                                            // 46
		var regex = new RegExp(search, 'i');                                                                    // 47
		query = {                                                                                               // 48
			$or: [{                                                                                                // 49
				term: regex                                                                                           // 50
			}, {                                                                                                   //
				description: regex                                                                                    // 52
			}]                                                                                                     //
		};                                                                                                      //
		projection.limit = 0;                                                                                   // 55
	}                                                                                                        //
	return Vocabulary.find(query, projection);                                                               // 57
});                                                                                                       //
                                                                                                          //
Meteor.publish("vocabularyAll", function () {                                                             // 60
	var data = Vocabulary.find({});                                                                          // 61
	if (data) {                                                                                              // 62
		return data;                                                                                            // 63
	}                                                                                                        //
	return this.ready();                                                                                     // 65
});                                                                                                       //
                                                                                                          //
Meteor.publish("ownedFavourites", function () {                                                           // 68
	var currentUserId = this.userId;                                                                         // 69
	var data = Favourites.find({                                                                             // 70
		userId: currentUserId                                                                                   // 71
	});                                                                                                      //
	if (data) {                                                                                              // 73
		return data;                                                                                            // 74
	}                                                                                                        //
	return this.ready();                                                                                     // 76
});                                                                                                       //
                                                                                                          //
Meteor.publish('termDay', function () {                                                                   // 79
	var currentUserId = this.userId;                                                                         // 80
	var data = TermDay.find({                                                                                // 81
		userId: currentUserId                                                                                   // 82
	});                                                                                                      //
	if (data) {                                                                                              // 84
		return data;                                                                                            // 85
	}                                                                                                        //
	return this.ready();                                                                                     // 87
});                                                                                                       //
                                                                                                          //
Meteor.publish('singleEntry', function (entryId) {                                                        // 90
	return Vocabulary.find({                                                                                 // 91
		_id: entryId                                                                                            // 92
	});                                                                                                      //
});                                                                                                       //
                                                                                                          //
Meteor.publish('dataWords', function () {                                                                 // 96
	var data = Data.Words.find({}, {                                                                         // 97
		sort: {                                                                                                 // 98
			viewed: -1                                                                                             // 99
		}                                                                                                       //
	});                                                                                                      //
	if (data) {                                                                                              // 102
		return data;                                                                                            // 103
	}                                                                                                        //
	return this.ready();                                                                                     // 105
});                                                                                                       //
                                                                                                          //
Meteor.publish('dataDetail', function () {                                                                // 108
	var data = Data.Detail.find({});                                                                         // 109
	if (data) {                                                                                              // 110
		return data;                                                                                            // 111
	}                                                                                                        //
	return this.ready();                                                                                     // 113
});                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"startup.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// server/startup.js                                                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
Meteor.startup(function () {                                                                              // 1
	Meteor.users.find({                                                                                      // 2
		"status.online": true                                                                                   // 3
	}).observe({                                                                                             //
		added: function () {                                                                                    // 5
			function added(obj) {                                                                                  // 5
				var today = new Date();                                                                               // 6
				// log online                                                                                         //
				var latestEntry = Data.Status.findOne({                                                               // 5
					userId: obj._id                                                                                      // 9
				}, {                                                                                                  //
					sort: {                                                                                              // 11
						timestamp: -1,                                                                                      // 12
						limit: 1                                                                                            // 13
					}                                                                                                    //
				});                                                                                                   //
				if (latestEntry) {                                                                                    // 16
					if (latestEntry.status !== 'online') {                                                               // 17
						Data.Status.insert({                                                                                // 18
							userId: obj._id,                                                                                   // 19
							status: "online"                                                                                   // 20
						});                                                                                                 //
						console.log(obj._id + ' set online');                                                               // 22
					}                                                                                                    //
				} else {                                                                                              //
					Data.Status.insert({                                                                                 // 25
						userId: obj._id,                                                                                    // 26
						status: "online"                                                                                    // 27
					});                                                                                                  //
					console.log(obj._id + ' set online');                                                                // 29
				}                                                                                                     //
                                                                                                          //
				var lastEntryTermDay = TermDay.findOne({                                                              // 32
					userId: obj._id                                                                                      // 33
				}, {                                                                                                  //
					sort: {                                                                                              // 35
						timestamp: -1,                                                                                      // 36
						limit: 1                                                                                            // 37
					}                                                                                                    //
				});                                                                                                   //
				var termDayIds = R.pluck('vocabularyId')(TermDay.find({                                               // 40
					userId: obj._id                                                                                      // 41
				}).fetch());                                                                                          //
				var vocabulary = Vocabulary.find({                                                                    // 43
					_id: {                                                                                               // 44
						$nin: termDayIds                                                                                    // 45
					}                                                                                                    //
				}).fetch();                                                                                           //
				// only insert a new vocabulary if there doesn't exist one for today                                  //
				if (!lastEntryTermDay || lastEntryTermDay.timestamp.getDate() !== today.getDate()) {                  // 5
					TermDay.insert({                                                                                     // 50
						userId: obj._id,                                                                                    // 51
						vocabularyId: vocabulary[Math.floor(Math.random() * vocabulary.length)]._id                         // 52
					});                                                                                                  //
				}                                                                                                     //
			}                                                                                                      //
                                                                                                          //
			return added;                                                                                          //
		}(),                                                                                                    //
		removed: function () {                                                                                  // 56
			function removed(obj) {                                                                                // 56
				var today = new Date();                                                                               // 57
				//log offline                                                                                         //
				var latestEntry = Data.Status.findOne({                                                               // 56
					userId: obj._id                                                                                      // 60
				}, {                                                                                                  //
					sort: {                                                                                              // 62
						timestamp: -1,                                                                                      // 63
						limit: 1                                                                                            // 64
					}                                                                                                    //
				});                                                                                                   //
                                                                                                          //
				if (latestEntry) {                                                                                    // 68
					if (latestEntry.status !== 'offline') {                                                              // 69
						//set exit and entry points if user stays online over midnight                                      //
						// if (latestEntry.timestamp.getDate() < today.getDate()) {                                         //
						// 	let year = latestEntry.timestamp.getFullYear();                                                 //
						// 	let month = latestEntry.timestamp.getMonth();                                                   //
						// 	let lastDay = latestEntry.timestamp.getDate();                                                  //
						// 	let todayDay = today.getDate();                                                                 //
						// 	let beforeMidnight = new Date(year, month, lastDay, 23, 59, 59, 999);                           //
						// 	let afterMidnight = new Date(year, month, todayDay, 0, 0, 0, 1);                                //
						//                                                                                                  //
						// 	// set offline before midnight                                                                  //
						// 	Data.Status.insert({                                                                            //
						// 		userId: obj._id,                                                                               //
						// 		status: "offline",                                                                             //
						// 		timestamp: beforeMidnight                                                                      //
						// 	});                                                                                             //
						// 	console.log(beforeMidnight);                                                                    //
						// 	console.log(obj._id + ' set offline');                                                          //
						//                                                                                                  //
						// 	// set online after midnight                                                                    //
						// 	Data.Status.insert({                                                                            //
						// 		userId: obj._id,                                                                               //
						// 		status: "online",                                                                              //
						// 		timestamp: afterMidnight                                                                       //
						// 	});                                                                                             //
						// 	console.log(afterMidnight);                                                                     //
						// 	console.log(obj._id + ' set online');                                                           //
						// }                                                                                                //
                                                                                                          //
						Data.Status.insert({                                                                                // 98
							userId: obj._id,                                                                                   // 99
							status: "offline",                                                                                 // 100
							timestamp: new Date()                                                                              // 101
						});                                                                                                 //
						console.log(obj._id + ' set offline');                                                              // 103
					}                                                                                                    //
				}                                                                                                     //
			}                                                                                                      //
                                                                                                          //
			return removed;                                                                                        //
		}()                                                                                                     //
	});                                                                                                      //
});                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabularySeed.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// server/vocabularySeed.js                                                                               //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
Meteor.startup(function () {                                                                              // 1
                                                                                                          //
	// if (Vocabulary.find().count() === 0) {                                                                //
	// 	for (let i = 0; i < 10; i++) {                                                                       //
	// 		Vocabulary.insert({                                                                                 //
	// 			term: Fake.word(),                                                                                 //
	// 			description: Fake.sentence([24])                                                                   //
	// 		});                                                                                                 //
	// 	}                                                                                                    //
	// };                                                                                                    //
});                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"common":{"aux":{"aux.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/aux/aux.js                                                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
(function (exports) {                                                                                     // 1
    /**                                                                                                   //
    * Randomize array element order in-place.                                                             //
    * Using Durstenfeld shuffle algorithm.                                                                //
    */                                                                                                    //
    exports.shuffle = function (array) {                                                                  // 6
        for (var i = array.length - 1; i > 0; i--) {                                                      // 7
            var j = Math.floor(Math.random() * (i + 1));                                                  // 8
            var temp = array[i];                                                                          // 9
            array[i] = array[j];                                                                          // 10
            array[j] = temp;                                                                              // 11
        }                                                                                                 //
        return array;                                                                                     // 13
    };                                                                                                    //
    exports.getRandomInt = function (min, max) {                                                          // 15
        return Math.floor(Math.random() * (max - min + 1)) + min;                                         //
    };                                                                                                    //
})(this.Aux = {});                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"log.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/aux/log.js                                                                                      //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
(function (exports) {                                                                                     // 1
                                                                                                          //
	exports.detail = function (clickArea) {                                                                  // 3
		// log                                                                                                  //
		var modes = [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF, NAV_MODE_ENTER];                               // 5
		var currentRoute = FlowRouter.current().route.name;                                                     // 6
                                                                                                          //
		var deviceType = Darwin.device.type;                                                                    // 8
		var devicePlatform = Darwin.device.platform;                                                            // 9
		var route = FlowRouter.current().route.name;                                                            // 10
		var area = clickArea;                                                                                   // 11
		var attention = Session.get(ATTENTION_MODE);                                                            // 12
		var mode = 'null';                                                                                      // 13
		if (currentRoute !== 'register') {                                                                      // 14
			modes.forEach(function (entry) {                                                                       // 15
				if (Session.get(entry)) {                                                                             // 16
					mode = entry;                                                                                        // 17
				}                                                                                                     //
			});                                                                                                    //
		};                                                                                                      //
		Meteor.call('dataDetail', deviceType, devicePlatform, route, area, mode, attention);                    // 21
	};                                                                                                       //
})(this.Log = {});                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nvd3_extra.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/aux/nvd3_extra.js                                                                               //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
/* Inspired by Lee Byron's test data generator. */                                                        //
(function (exports) {                                                                                     // 2
  var _arguments = arguments;                                                                             //
                                                                                                          //
  exports.stream_layers = function (n, m, o) {                                                            // 3
    if (_arguments.length < 3) o = 0;                                                                     // 4
    function bump(a) {                                                                                    // 5
      var x = 1 / (.1 + Math.random()),                                                                   // 6
          y = 2 * Math.random() - .5,                                                                     //
          z = 10 / (.1 + Math.random());                                                                  //
      for (var i = 0; i < m; i++) {                                                                       // 9
        var w = (i / m - y) * z;                                                                          // 10
        a[i] += x * Math.exp(-w * w);                                                                     // 11
      }                                                                                                   //
    }                                                                                                     //
    return d3.range(n).map(function () {                                                                  // 14
      var a = [],                                                                                         // 15
          i;                                                                                              //
      for (i = 0; i < m; i++) {                                                                           // 16
        a[i] = o + o * Math.random();                                                                     // 16
      }for (i = 0; i < 5; i++) {                                                                          //
        bump(a);                                                                                          // 17
      }return a.map(exports.stream_index);                                                                //
    });                                                                                                   //
  };                                                                                                      //
  exports.stream_waves = function (n, m) {                                                                // 21
    return d3.range(n).map(function (i) {                                                                 // 22
      return d3.range(m).map(function (j) {                                                               // 23
        var x = 20 * j / m - i / 3;                                                                       // 24
        return 2 * x * Math.exp(-.5 * x);                                                                 // 25
      }).map(exports.stream_index);                                                                       //
    });                                                                                                   //
  };                                                                                                      //
  exports.stream_index = function (d, i) {                                                                // 29
    return { x: i, y: Math.max(0, d) };                                                                   // 30
  };                                                                                                      //
})(this.NVD3 = {});                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/aux/validation.js                                                                               //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
(function (exports) {                                                                                     // 1
	exports.isAlphabetic = function (value) {                                                                // 2
		var filter = /^[a-zA-Z]+$/;                                                                             // 3
		if (filter.test(value)) {                                                                               // 4
			return true;                                                                                           // 5
		}                                                                                                       //
		return false;                                                                                           // 7
	};                                                                                                       //
                                                                                                          //
	exports.isLength64 = function (value) {                                                                  // 10
		if (value.length < 65) {                                                                                // 11
			return true;                                                                                           // 12
		}                                                                                                       //
		return false;                                                                                           // 14
	};                                                                                                       //
})(this.Validate = {});                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"data.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/collections/data.js                                                                             //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
Data = {};                                                                                                // 1
Data.Detail = new Mongo.Collection('dataDetail', {});                                                     // 2
Data.Words = new Mongo.Collection('dataWords', {});                                                       // 3
Data.Survey = new Mongo.Collection('dataSurvey', {});                                                     // 4
Data.Feedback = new Mongo.Collection('dataFeedback', {});                                                 // 5
Data.Status = new Mongo.Collection('dataStatus', {});                                                     // 6
                                                                                                          //
Data.Survey.allow({                                                                                       // 8
	insert: function () {                                                                                    // 9
		function insert() {                                                                                     // 9
			return true;                                                                                           // 10
		}                                                                                                       //
                                                                                                          //
		return insert;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
Data.Feedback.allow({                                                                                     // 13
	insert: function () {                                                                                    // 14
		function insert() {                                                                                     // 14
			return true;                                                                                           // 15
		}                                                                                                       //
                                                                                                          //
		return insert;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
                                                                                                          //
Data.Status.Schema = new SimpleSchema({                                                                   // 19
	userId: {                                                                                                // 20
		type: String                                                                                            // 21
	},                                                                                                       //
	timestamp: {                                                                                             // 23
		type: Date,                                                                                             // 24
		autoValue: function () {                                                                                // 25
			function autoValue() {                                                                                 // 25
				return new Date();                                                                                    // 26
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	status: {                                                                                                // 29
		type: String,                                                                                           // 30
		allowedValues: ['online', 'offline']                                                                    // 31
	}                                                                                                        //
});                                                                                                       //
                                                                                                          //
Data.Feedback.Schema = new SimpleSchema({                                                                 // 35
	userId: {                                                                                                // 36
		type: String,                                                                                           // 37
		autoValue: function () {                                                                                // 38
			function autoValue() {                                                                                 // 38
				return this.userId;                                                                                   // 39
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	userMail: {                                                                                              // 42
		type: String,                                                                                           // 43
		autoValue: function () {                                                                                // 44
			function autoValue() {                                                                                 // 44
				return Meteor.user().emails[0].address;                                                               // 45
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	message: {                                                                                               // 48
		type: String,                                                                                           // 49
		label: 'Feedback-Nachricht',                                                                            // 50
		max: 1000,                                                                                              // 51
		autoform: {                                                                                             // 52
			afFieldInput: {                                                                                        // 53
				type: "textarea"                                                                                      // 54
			}                                                                                                      //
		}                                                                                                       //
	},                                                                                                       //
	createdAt: {                                                                                             // 58
		type: Date,                                                                                             // 59
		autoValue: function () {                                                                                // 60
			function autoValue() {                                                                                 // 60
				return new Date();                                                                                    // 61
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	}                                                                                                        //
});                                                                                                       //
                                                                                                          //
Data.Detail.Schema = new SimpleSchema({                                                                   // 66
	userId: {                                                                                                // 67
		type: String,                                                                                           // 68
		autoValue: function () {                                                                                // 69
			function autoValue() {                                                                                 // 69
				return this.userId;                                                                                   // 70
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	userMail: {                                                                                              // 73
		type: String,                                                                                           // 74
		autoValue: function () {                                                                                // 75
			function autoValue() {                                                                                 // 75
				return Meteor.user().emails[0].address;                                                               // 76
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	timestamp: {                                                                                             // 79
		type: Date,                                                                                             // 80
		autoValue: function () {                                                                                // 81
			function autoValue() {                                                                                 // 81
				return new Date();                                                                                    // 82
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	deviceType: {                                                                                            // 85
		type: String                                                                                            // 86
	},                                                                                                       //
	devicePlatform: {                                                                                        // 88
		type: String                                                                                            // 89
	},                                                                                                       //
	route: {                                                                                                 // 91
		type: String                                                                                            // 92
	},                                                                                                       //
	clickArea: {                                                                                             // 94
		type: String,                                                                                           // 95
		allowedValues: ['bar', 'mode', 'source', 'favDel', 'browse', 'reveal']                                  // 96
	},                                                                                                       //
	mode: {                                                                                                  // 98
		type: String,                                                                                           // 99
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']                                       // 100
	},                                                                                                       //
	attention: {                                                                                             // 102
		type: Boolean                                                                                           // 103
	}                                                                                                        //
});                                                                                                       //
                                                                                                          //
Data.Words.Schema = new SimpleSchema({                                                                    // 107
	userId: {                                                                                                // 108
		type: String,                                                                                           // 109
		autoValue: function () {                                                                                // 110
			function autoValue() {                                                                                 // 110
				return this.userId;                                                                                   // 111
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	vocabularyId: {                                                                                          // 114
		type: String                                                                                            // 115
	},                                                                                                       //
	vocabularyName: {                                                                                        // 117
		type: String                                                                                            // 118
	},                                                                                                       //
	viewed: {                                                                                                // 120
		type: Number                                                                                            // 121
	},                                                                                                       //
	createdAt: {                                                                                             // 123
		type: Date,                                                                                             // 124
		autoValue: function () {                                                                                // 125
			function autoValue() {                                                                                 // 125
				return new Date();                                                                                    // 126
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	}                                                                                                        //
});                                                                                                       //
                                                                                                          //
Data.Survey.Schema = new SimpleSchema({                                                                   // 131
	// GENERAL                                                                                               //
	userId: {                                                                                                // 133
		type: String,                                                                                           // 134
		autoValue: function () {                                                                                // 135
			function autoValue() {                                                                                 // 135
				return this.userId;                                                                                   // 136
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}(),                                                                                                    //
		autoform: {                                                                                             // 138
			type: "hidden",                                                                                        // 139
			label: false                                                                                           // 140
		}                                                                                                       //
	},                                                                                                       //
	age: {                                                                                                   // 143
		type: Number,                                                                                           // 144
		label: 'Dein Alter',                                                                                    // 145
		min: 18,                                                                                                // 146
		max: 99                                                                                                 // 147
	},                                                                                                       //
                                                                                                          //
	previousExperience: {                                                                                    // 150
		type: String,                                                                                           // 151
		label: 'Ich verfuege ueber Vorerfahrung mit digitalen Vokabeltrainern.',                                // 152
		autoform: {                                                                                             // 153
			type: "select-radio-inline",                                                                           // 154
			options: function () {                                                                                 // 155
				function options() {                                                                                  // 155
					return [{                                                                                            // 156
						label: "trifft zu",                                                                                 // 157
						value: "trifftZu"                                                                                   // 158
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 160
						value: "trifftEherZu"                                                                               // 161
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 163
						value: "teilsTeils"                                                                                 // 164
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 166
						value: "trifftEherNichtZu"                                                                          // 167
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 169
						value: "trifftNichtZu"                                                                              // 170
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	learningCurve: {                                                                                         // 175
		type: String,                                                                                           // 176
		label: 'Die Einarbeitung in den Fremdworttrainer ist mir leicht gefallen.',                             // 177
		autoform: {                                                                                             // 178
			type: "select-radio-inline",                                                                           // 179
			options: function () {                                                                                 // 180
				function options() {                                                                                  // 180
					return [{                                                                                            // 181
						label: "trifft zu",                                                                                 // 182
						value: "trifftZu"                                                                                   // 183
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 185
						value: "trifftEherZu"                                                                               // 186
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 188
						value: "teilsTeils"                                                                                 // 189
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 191
						value: "trifftEherNichtZu"                                                                          // 192
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 194
						value: "trifftNichtZu"                                                                              // 195
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	everydayUse: {                                                                                           // 200
		type: String,                                                                                           // 201
		label: 'Den Gebrauch der App konnte ich muehelos in meinen Alltag integrieren.',                        // 202
		autoform: {                                                                                             // 203
			type: "select-radio-inline",                                                                           // 204
			options: function () {                                                                                 // 205
				function options() {                                                                                  // 205
					return [{                                                                                            // 206
						label: "trifft zu",                                                                                 // 207
						value: "trifftZu"                                                                                   // 208
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 210
						value: "trifftEherZu"                                                                               // 211
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 213
						value: "teilsTeils"                                                                                 // 214
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 216
						value: "trifftEherNichtZu"                                                                          // 217
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 219
						value: "trifftNichtZu"                                                                              // 220
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	everydayUseText: {                                                                                       // 225
		type: String,                                                                                           // 226
		max: 1000,                                                                                              // 227
		optional: true,                                                                                         // 228
		label: 'Aus folgendem Grund (optional):',                                                               // 229
		autoform: {                                                                                             // 230
			afFieldInput: {                                                                                        // 231
				type: "textarea"                                                                                      // 232
			}                                                                                                      //
		}                                                                                                       //
	},                                                                                                       //
	usability: {                                                                                             // 236
		type: String,                                                                                           // 237
		label: 'Mit der Bedienung der App zurecht komme ich prima zurecht.',                                    // 238
		autoform: {                                                                                             // 239
			type: "select-radio-inline",                                                                           // 240
			options: function () {                                                                                 // 241
				function options() {                                                                                  // 241
					return [{                                                                                            // 242
						label: "trifft zu",                                                                                 // 243
						value: "trifftZu"                                                                                   // 244
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 246
						value: "trifftEherZu"                                                                               // 247
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 249
						value: "teilsTeils"                                                                                 // 250
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 252
						value: "trifftEherNichtZu"                                                                          // 253
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 255
						value: "trifftNichtZu"                                                                              // 256
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	usabilityText: {                                                                                         // 261
		type: String,                                                                                           // 262
		max: 1000,                                                                                              // 263
		optional: true,                                                                                         // 264
		label: 'Aus folgendem Grund (optional):',                                                               // 265
		optional: true,                                                                                         // 266
		autoform: {                                                                                             // 267
			afFieldInput: {                                                                                        // 268
				type: "textarea"                                                                                      // 269
			}                                                                                                      //
		}                                                                                                       //
	},                                                                                                       //
	// NUTZUNGSVERHALTEN                                                                                     //
	deviceMobile: {                                                                                          // 274
		type: String,                                                                                           // 275
		label: '... Mobile Endgeraet (z.B. Smartphone, kein Laptop) aufgerufen.',                               // 276
		autoform: {                                                                                             // 277
			type: "select-radio-inline",                                                                           // 278
			options: function () {                                                                                 // 279
				function options() {                                                                                  // 279
					return [{                                                                                            // 280
						label: "trifft zu",                                                                                 // 281
						value: "trifftZu"                                                                                   // 282
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 284
						value: "trifftEherZu"                                                                               // 285
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 287
						value: "teilsTeils"                                                                                 // 288
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 290
						value: "trifftEherNichtZu"                                                                          // 291
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 293
						value: "trifftNichtZu"                                                                              // 294
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	deviceTablet: {                                                                                          // 299
		type: String,                                                                                           // 300
		label: '... Tablet Endgeraet aufgerufen.',                                                              // 301
		autoform: {                                                                                             // 302
			type: "select-radio-inline",                                                                           // 303
			options: function () {                                                                                 // 304
				function options() {                                                                                  // 304
					return [{                                                                                            // 305
						label: "trifft zu",                                                                                 // 306
						value: "trifftZu"                                                                                   // 307
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 309
						value: "trifftEherZu"                                                                               // 310
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 312
						value: "teilsTeils"                                                                                 // 313
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 315
						value: "trifftEherNichtZu"                                                                          // 316
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 318
						value: "trifftNichtZu"                                                                              // 319
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	deviceDesktop: {                                                                                         // 324
		type: String,                                                                                           // 325
		label: '... Desktop Endgeraet (z.B. Laptop, Desktop PC) aufgerufen.',                                   // 326
		autoform: {                                                                                             // 327
			type: "select-radio-inline",                                                                           // 328
			options: function () {                                                                                 // 329
				function options() {                                                                                  // 329
					return [{                                                                                            // 330
						label: "trifft zu",                                                                                 // 331
						value: "trifftZu"                                                                                   // 332
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 334
						value: "trifftEherZu"                                                                               // 335
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 337
						value: "teilsTeils"                                                                                 // 338
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 340
						value: "trifftEherNichtZu"                                                                          // 341
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 343
						value: "trifftNichtZu"                                                                              // 344
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	deviceBehavior: {                                                                                        // 349
		type: String,                                                                                           // 350
		max: 1000,                                                                                              // 351
		optional: true,                                                                                         // 352
		label: 'Aus folgendem Grund (optional):',                                                               // 353
		autoform: {                                                                                             // 354
			afFieldInput: {                                                                                        // 355
				type: "textarea"                                                                                      // 356
			}                                                                                                      //
		}                                                                                                       //
	},                                                                                                       //
	favouriteMode: {                                                                                         // 360
		type: String,                                                                                           // 361
		label: 'Folgenden Trainingsmodus habe ich am liebsten genutzt:',                                        // 362
		autoform: {                                                                                             // 363
			type: "select-radio-inline",                                                                           // 364
			options: function () {                                                                                 // 365
				function options() {                                                                                  // 365
					return [{                                                                                            // 366
						label: "Lesen",                                                                                     // 367
						value: "lesen"                                                                                      // 368
					}, {                                                                                                 //
						label: "Wort",                                                                                      // 370
						value: "wort"                                                                                       // 371
					}, {                                                                                                 //
						label: "Definition",                                                                                // 373
						value: "definition"                                                                                 // 374
					}, {                                                                                                 //
						label: "Texteingabe",                                                                               // 376
						value: "eingabe"                                                                                    // 377
					}, {                                                                                                 //
						label: "Lesen im Register",                                                                         // 379
						value: "register"                                                                                   // 380
					}, {                                                                                                 //
						label: "Weiss ich nicht",                                                                           // 382
						value: "ka"                                                                                         // 383
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	favouriteModeText: {                                                                                     // 388
		type: String,                                                                                           // 389
		max: 1000,                                                                                              // 390
		optional: true,                                                                                         // 391
		label: 'Aus folgendem Grund (optional):',                                                               // 392
		autoform: {                                                                                             // 393
			afFieldInput: {                                                                                        // 394
				type: "textarea"                                                                                      // 395
			}                                                                                                      //
		}                                                                                                       //
	},                                                                                                       //
	modeEnter: {                                                                                             // 399
		type: String,                                                                                           // 400
		label: 'Die Texteingabe-Option habe ich im Kompaktmodus vermisst.',                                     // 401
		autoform: {                                                                                             // 402
			type: "select-radio-inline",                                                                           // 403
			options: function () {                                                                                 // 404
				function options() {                                                                                  // 404
					return [{                                                                                            // 405
						label: "trifft zu",                                                                                 // 406
						value: "trifftZu"                                                                                   // 407
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 409
						value: "trifftEherZu"                                                                               // 410
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 412
						value: "teilsTeils"                                                                                 // 413
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 415
						value: "trifftEherNichtZu"                                                                          // 416
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 418
						value: "trifftNichtZu"                                                                              // 419
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	attentionBenefit: {                                                                                      // 424
		type: String,                                                                                           // 425
		label: 'Mir hat die Moeglichkeit, in den Kompaktmodus zu wechseln, gefallen.',                          // 426
		autoform: {                                                                                             // 427
			type: "select-radio-inline",                                                                           // 428
			options: function () {                                                                                 // 429
				function options() {                                                                                  // 429
					return [{                                                                                            // 430
						label: "trifft zu",                                                                                 // 431
						value: "trifftZu"                                                                                   // 432
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 434
						value: "trifftEherZu"                                                                               // 435
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 437
						value: "teilsTeils"                                                                                 // 438
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 440
						value: "trifftEherNichtZu"                                                                          // 441
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 443
						value: "trifftNichtZu"                                                                              // 444
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	attentionBehavior: {                                                                                     // 449
		type: String,                                                                                           // 450
		label: 'Die Moeglichkeit, den Kompaktmodus zu nutzen, hat mein Nutzungsverhalten der App beeinflusst.',
		autoform: {                                                                                             // 452
			type: "select-radio-inline",                                                                           // 453
			options: function () {                                                                                 // 454
				function options() {                                                                                  // 454
					return [{                                                                                            // 455
						label: "trifft zu",                                                                                 // 456
						value: "trifftZu"                                                                                   // 457
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 459
						value: "trifftEherZu"                                                                               // 460
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 462
						value: "teilsTeils"                                                                                 // 463
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 465
						value: "trifftEherNichtZu"                                                                          // 466
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 468
						value: "trifftNichtZu"                                                                              // 469
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	attentionBehaviorText: {                                                                                 // 474
		type: String,                                                                                           // 475
		max: 1000,                                                                                              // 476
		label: 'Aus folgendem Grund (optional):',                                                               // 477
		optional: true,                                                                                         // 478
		autoform: {                                                                                             // 479
			afFieldInput: {                                                                                        // 480
				type: "textarea"                                                                                      // 481
			}                                                                                                      //
		}                                                                                                       //
	},                                                                                                       //
	attentionSituation: {                                                                                    // 485
		type: String,                                                                                           // 486
		max: 1000,                                                                                              // 487
		label: 'In welcher Situation hast du beschlossen, das UI zu wechseln und warum? (Beispiel)',            // 488
		optional: true,                                                                                         // 489
		autoform: {                                                                                             // 490
			afFieldInput: {                                                                                        // 491
				type: "textarea"                                                                                      // 492
			}                                                                                                      //
		}                                                                                                       //
	},                                                                                                       //
	attentionUse: {                                                                                          // 496
		type: String,                                                                                           // 497
		label: 'Ich sehe generell einen klaren Vorteil in der Moeglichkeit die Benutzeroberflaeche kontextorientiert anzupassen und wuerde mir die Moeglichkeit auch fuer andere Apps wuenschen.',
		autoform: {                                                                                             // 499
			type: "select-radio-inline",                                                                           // 500
			options: function () {                                                                                 // 501
				function options() {                                                                                  // 501
					return [{                                                                                            // 502
						label: "trifft zu",                                                                                 // 503
						value: "trifftZu"                                                                                   // 504
					}, {                                                                                                 //
						label: "trifft eher zu",                                                                            // 506
						value: "trifftEherZu"                                                                               // 507
					}, {                                                                                                 //
						label: "teils-teils",                                                                               // 509
						value: "teilsTeils"                                                                                 // 510
					}, {                                                                                                 //
						label: "trifft eher nicht zu",                                                                      // 512
						value: "trifftEherNichtZu"                                                                          // 513
					}, {                                                                                                 //
						label: "trifft nicht zu",                                                                           // 515
						value: "trifftNichtZu"                                                                              // 516
					}];                                                                                                  //
				}                                                                                                     //
                                                                                                          //
				return options;                                                                                       //
			}()                                                                                                    //
		}                                                                                                       //
	},                                                                                                       //
	attentionUseText: {                                                                                      // 521
		type: String,                                                                                           // 522
		max: 1000,                                                                                              // 523
		label: 'Aus folgendem Grund (optional):',                                                               // 524
		optional: true,                                                                                         // 525
		autoform: {                                                                                             // 526
			afFieldInput: {                                                                                        // 527
				type: "textarea"                                                                                      // 528
			}                                                                                                      //
		}                                                                                                       //
	},                                                                                                       //
	prospects: {                                                                                             // 532
		type: String,                                                                                           // 533
		max: 1000,                                                                                              // 534
		optional: true,                                                                                         // 535
		label: 'Sonstige Anmerkungen',                                                                          // 536
		autoform: {                                                                                             // 537
			afFieldInput: {                                                                                        // 538
				type: "textarea"                                                                                      // 539
			}                                                                                                      //
		}                                                                                                       //
	}                                                                                                        //
                                                                                                          //
});                                                                                                       //
                                                                                                          //
Data.Detail.attachSchema(Data.Detail.Schema);                                                             // 547
Data.Words.attachSchema(Data.Words.Schema);                                                               // 548
Data.Survey.attachSchema(Data.Survey.Schema);                                                             // 549
Data.Feedback.attachSchema(Data.Feedback.Schema);                                                         // 550
Data.Status.attachSchema(Data.Status.Schema);                                                             // 551
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favourites.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/collections/favourites.js                                                                       //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
var FavouritesSchema = new SimpleSchema({                                                                 // 1
  userId: {                                                                                               // 2
    type: String,                                                                                         // 3
    autoValue: function () {                                                                              // 4
      function autoValue() {                                                                              // 4
        return this.userId;                                                                               // 5
      }                                                                                                   //
                                                                                                          //
      return autoValue;                                                                                   //
    }()                                                                                                   //
  },                                                                                                      //
  vocabularyId: {                                                                                         // 8
    type: String                                                                                          // 9
  },                                                                                                      //
  createdAt: {                                                                                            // 11
    type: Date,                                                                                           // 12
    autoValue: function () {                                                                              // 13
      function autoValue() {                                                                              // 13
        return new Date();                                                                                // 14
      }                                                                                                   //
                                                                                                          //
      return autoValue;                                                                                   //
    }(),                                                                                                  //
    autoform: {                                                                                           // 16
      type: "hidden"                                                                                      // 17
    }                                                                                                     //
  }                                                                                                       //
});                                                                                                       //
                                                                                                          //
Favourites = new Mongo.Collection('favourites', {});                                                      // 22
Favourites.attachSchema(FavouritesSchema);                                                                // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"messages.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/collections/messages.js                                                                         //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
SimpleSchema.messages({                                                                                   // 1
  required: "[label] wird benoetigt.",                                                                    // 2
  minString: "[label] muss mindestens [min] Zeichen enthalten.",                                          // 3
  maxString: "[label] darf nicht mehr als [max] Zeichen enthalten.",                                      // 4
  minNumber: "[label] muss mindestens [min] sein.",                                                       // 5
  maxNumber: "[label] darf nicht hoeher als [max] sein.",                                                 // 6
  minDate: "[label] must be on or after [min]",                                                           // 7
  maxDate: "[label] cannot be after [max]",                                                               // 8
  badDate: "[label] is not a valid date",                                                                 // 9
  minCount: "You must specify at least [minCount] values",                                                // 10
  maxCount: "You cannot specify more than [maxCount] values",                                             // 11
  noDecimal: "[label] muss eine gerade Zahl sein.",                                                       // 12
  notAllowed: "[value] kein zulaessiger Wert.",                                                           // 13
  expectedString: "[label] muss eine Zeichenkette sein.",                                                 // 14
  expectedNumber: "[label] muss eine Zahl sein.",                                                         // 15
  expectedBoolean: "[label] muss ein Bool-Wert sein.",                                                    // 16
  expectedArray: "[label] muss ein Array sein.",                                                          // 17
  expectedObject: "[label] muss ein Object sein.",                                                        // 18
  expectedConstructor: "[label] muss vom Typ [type] sein.",                                               // 19
  regEx: [{ msg: "[label] failed regular expression validation" }, { exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address" }, { exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address" }, { exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain" }, { exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain" }, { exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address" }, { exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address" }, { exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address" }, { exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL" }, { exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID" }],
  keyNotInSchema: "[key] ist nicht im Schema erlaubt."                                                    // 32
});                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"userExt.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/collections/userExt.js                                                                          //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
UserExt = new Mongo.Collection('userExt', {});                                                            // 1
                                                                                                          //
UserExt.Schema = new SimpleSchema({                                                                       // 3
	userId: {                                                                                                // 4
		type: String,                                                                                           // 5
		autoValue: function () {                                                                                // 6
			function autoValue() {                                                                                 // 6
				return this.userId;                                                                                   // 7
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	userMail: {                                                                                              // 10
		type: String,                                                                                           // 11
		autoValue: function () {                                                                                // 12
			function autoValue() {                                                                                 // 12
				return Meteor.user().emails[0].address;                                                               // 13
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	},                                                                                                       //
	surveySubmitted: {                                                                                       // 16
		type: Boolean,                                                                                          // 17
		defaultValue: false                                                                                     // 18
	}                                                                                                        //
	// TODO last visited URL - save on logout                                                                //
});                                                                                                       // 3
                                                                                                          //
UserExt.attachSchema(UserExt.Schema);                                                                     // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabulary.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/collections/vocabulary.js                                                                       //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
Vocabulary = new Mongo.Collection('vocabulary', {});                                                      // 1
TermDay = new Mongo.Collection('termDay', {});                                                            // 2
                                                                                                          //
if (Meteor.isServer) {                                                                                    // 4
	Vocabulary._ensureIndex({                                                                                // 5
		term: 1,                                                                                                // 6
		description: 1                                                                                          // 7
	});                                                                                                      //
}                                                                                                         //
                                                                                                          //
Vocabulary.allow({                                                                                        // 11
	insert: function () {                                                                                    // 12
		function insert() {                                                                                     // 12
			return false;                                                                                          //
		}                                                                                                       //
                                                                                                          //
		return insert;                                                                                          //
	}(),                                                                                                     //
	update: function () {                                                                                    // 13
		function update() {                                                                                     // 13
			return false;                                                                                          //
		}                                                                                                       //
                                                                                                          //
		return update;                                                                                          //
	}(),                                                                                                     //
	remove: function () {                                                                                    // 14
		function remove() {                                                                                     // 14
			return false;                                                                                          //
		}                                                                                                       //
                                                                                                          //
		return remove;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
                                                                                                          //
Vocabulary.deny({                                                                                         // 17
	insert: function () {                                                                                    // 18
		function insert() {                                                                                     // 18
			return true;                                                                                           //
		}                                                                                                       //
                                                                                                          //
		return insert;                                                                                          //
	}(),                                                                                                     //
	update: function () {                                                                                    // 19
		function update() {                                                                                     // 19
			return true;                                                                                           //
		}                                                                                                       //
                                                                                                          //
		return update;                                                                                          //
	}(),                                                                                                     //
	remove: function () {                                                                                    // 20
		function remove() {                                                                                     // 20
			return true;                                                                                           //
		}                                                                                                       //
                                                                                                          //
		return remove;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
                                                                                                          //
var VocabularySchema = new SimpleSchema({                                                                 // 23
	term: {                                                                                                  // 24
		type: String,                                                                                           // 25
		regEx: /^[a-zA-Z]*$/                                                                                    // 26
	},                                                                                                       //
	preposition: {                                                                                           // 28
		type: String,                                                                                           // 29
		allowedValues: ['der', 'die', 'das'],                                                                   // 30
		optional: true                                                                                          // 31
	},                                                                                                       //
	wordClass: {                                                                                             // 33
		type: String,                                                                                           // 34
		allowedValues: ['Nomen', 'Verb', 'Adjektiv']                                                            // 35
	},                                                                                                       //
	definition: {                                                                                            // 37
		type: [String]                                                                                          // 38
	}                                                                                                        //
});                                                                                                       //
                                                                                                          //
var TermDaySchema = new SimpleSchema({                                                                    // 42
	userId: {                                                                                                // 43
		type: String                                                                                            // 44
	},                                                                                                       //
	vocabularyId: {                                                                                          // 46
		type: String                                                                                            // 47
	},                                                                                                       //
	timestamp: {                                                                                             // 49
		type: Date,                                                                                             // 50
		autoValue: function () {                                                                                // 51
			function autoValue() {                                                                                 // 51
				return new Date();                                                                                    // 52
			}                                                                                                      //
                                                                                                          //
			return autoValue;                                                                                      //
		}()                                                                                                     //
	}                                                                                                        //
});                                                                                                       //
                                                                                                          //
Vocabulary.attachSchema(VocabularySchema);                                                                // 57
TermDay.attachSchema(TermDaySchema);                                                                      // 58
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config":{"accounts_t9n.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/config/accounts_t9n.js                                                                          //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
T9n.setLanguage('de');                                                                                    // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"admin.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/config/admin.js                                                                                 //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
AdminConfig = {                                                                                           // 1
	name: 'Chalimo',                                                                                         // 2
	adminEmails: ['bla@bla.org'],                                                                            // 3
	collections: {                                                                                           // 4
		Vocabulary: {                                                                                           // 5
			tableColumns: [{                                                                                       // 6
				label: 'Wort',                                                                                        // 7
				name: 'term'                                                                                          // 8
			}, {                                                                                                   //
				label: 'Wortklasse',                                                                                  // 10
				name: 'wordClass'                                                                                     // 11
			}]                                                                                                     //
		}                                                                                                       //
	}                                                                                                        //
};                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"at_config.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/config/at_config.js                                                                             //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
// Options                                                                                                //
AccountsTemplates.configure({                                                                             // 2
  defaultLayout: 'layout',                                                                                // 3
  defaultLayoutRegions: {                                                                                 // 4
    footer: 'footer'                                                                                      // 5
  },                                                                                                      //
  defaultContentRegion: 'main',                                                                           // 7
  showForgotPasswordLink: false,                                                                          // 8
  overrideLoginErrors: true,                                                                              // 9
  enablePasswordChange: true,                                                                             // 10
                                                                                                          //
  // sendVerificationEmail: true,                                                                         //
  // enforceEmailVerification: true,                                                                      //
  //confirmPassword: true,                                                                                //
  //continuousValidation: false,                                                                          //
  //displayFormLabels: true,                                                                              //
  //forbidClientAccountCreation: true,                                                                    //
  //formValidationFeedback: true,                                                                         //
  // homeRoutePath: '/',                                                                                  //
  // showAddRemoveServices: false,                                                                        //
  //showPlaceholders: true,                                                                               //
                                                                                                          //
  negativeValidation: true,                                                                               // 23
  positiveValidation: true,                                                                               // 24
  negativeFeedback: false,                                                                                // 25
  positiveFeedback: true                                                                                  // 26
                                                                                                          //
});                                                                                                       //
                                                                                                          //
// Privacy Policy and Terms of Use                                                                        //
//privacyUrl: 'privacy',                                                                                  //
//termsUrl: 'terms-of-use',                                                                               //
var logout = function logout() {                                                                          // 33
  //example redirect after logout                                                                         //
  FlowRouter.go('/sign-in');                                                                              // 35
};                                                                                                        //
                                                                                                          //
AccountsTemplates.configure({                                                                             // 38
  onLogoutHook: logout                                                                                    // 39
});                                                                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// common/routes.js                                                                                       //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
// *** ROUTE FUNCTIONS                                                                                    //
                                                                                                          //
checkAttentionModeOff = function checkAttentionModeOff() {                                                // 3
	if (Session.get(ATTENTION_MODE)) {                                                                       // 4
		Session.set(ATTENTION_MODE, false);                                                                     // 5
	}                                                                                                        //
};                                                                                                        //
                                                                                                          //
checkAttentionModeOn = function checkAttentionModeOn() {                                                  // 9
	if (!Session.get(ATTENTION_MODE)) {                                                                      // 10
		Session.set(ATTENTION_MODE, true);                                                                      // 11
	}                                                                                                        //
};                                                                                                        //
                                                                                                          //
resetSession = function resetSession() {                                                                  // 15
	Session.set(REVEALED, false);                                                                            // 16
	Session.set(TERM_WRONG, false);                                                                          // 17
};                                                                                                        //
                                                                                                          //
checkAdmin = function checkAdmin() {                                                                      // 20
	if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {                                                     // 21
		// FlowRouter.redirect('/notFound');                                                                    //
	}                                                                                                        //
};                                                                                                        //
                                                                                                          //
checkSurveySubmitted = function checkSurveySubmitted() {                                                  // 26
	var query = UserExt.findOne({ userId: Meteor.userId(), surveySubmitted: true });                         // 27
	if (query) {                                                                                             // 28
		FlowRouter.redirect('/');                                                                               // 29
	}                                                                                                        //
};                                                                                                        //
                                                                                                          //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                                            // 33
                                                                                                          //
// *** ROUTE GROUPS                                                                                       //
                                                                                                          //
var lowRoutes = FlowRouter.group({                                                                        // 37
	name: "low",                                                                                             // 38
	triggersEnter: [checkAttentionModeOn],                                                                   // 39
	triggersExit: []                                                                                         // 40
});                                                                                                       //
var highRoutes = FlowRouter.group({                                                                       // 42
	name: "high",                                                                                            // 43
	triggersEnter: [checkAttentionModeOff],                                                                  // 44
	triggersExit: []                                                                                         // 45
});                                                                                                       //
                                                                                                          //
// *** ROUTES                                                                                             //
                                                                                                          //
highRoutes.route('/', {                                                                                   // 52
	name: "index",                                                                                           // 53
	action: function () {                                                                                    // 54
		function action(params, queryParams) {                                                                  // 54
			BlazeLayout.render('layout', {                                                                         // 55
				bar: "bar",                                                                                           // 56
				nav: "nav",                                                                                           // 57
				main: "index",                                                                                        // 58
				footer: "footer"                                                                                      // 59
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
highRoutes.route('/faq', {                                                                                // 63
	name: "faq",                                                                                             // 64
	action: function () {                                                                                    // 65
		function action(params, queryParams) {                                                                  // 65
			BlazeLayout.render('layout', {                                                                         // 66
				bar: "bar",                                                                                           // 67
				nav: "nav",                                                                                           // 68
				main: "faq",                                                                                          // 69
				footer: "footer"                                                                                      // 70
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
                                                                                                          //
highRoutes.route('/trainer', {                                                                            // 75
	name: "trainer",                                                                                         // 76
	action: function () {                                                                                    // 77
		function action(params, queryParams) {                                                                  // 77
			BlazeLayout.render('layout', {                                                                         // 78
				bar: "bar",                                                                                           // 79
				nav: "nav",                                                                                           // 80
				main: "trainer",                                                                                      // 81
				footer: "footer"                                                                                      // 82
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
                                                                                                          //
highRoutes.route('/register/:id', {                                                                       // 87
	name: "vokabelDetail",                                                                                   // 88
	action: function () {                                                                                    // 89
		function action(params, queryParams) {                                                                  // 89
			BlazeLayout.render('layout', {                                                                         // 90
				bar: "bar",                                                                                           // 91
				nav: "nav",                                                                                           // 92
				main: "vokabelDetail",                                                                                // 93
				footer: "footer"                                                                                      // 94
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
highRoutes.route('/register', {                                                                           // 98
	name: "register",                                                                                        // 99
	action: function () {                                                                                    // 100
		function action(params, queryParams) {                                                                  // 100
			BlazeLayout.render('layout', {                                                                         // 101
				bar: "bar",                                                                                           // 102
				nav: "nav",                                                                                           // 103
				main: "register",                                                                                     // 104
				footer: "footer"                                                                                      // 105
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}()                                                                                                      //
});                                                                                                       //
highRoutes.route('/verwaltung', {                                                                         // 109
	name: "verwaltung",                                                                                      // 110
	action: function () {                                                                                    // 111
		function action(params, queryParams) {                                                                  // 111
			FlowRouter.redirect('/verwaltung/feedback');                                                           // 112
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: [checkAdmin]                                                                              // 114
});                                                                                                       //
highRoutes.route('/verwaltung/statistik', {                                                               // 116
	name: "statistik",                                                                                       // 117
	action: function () {                                                                                    // 118
		function action(params, queryParams) {                                                                  // 118
			FlowRouter.redirect('/verwaltung/statistik/total');                                                    // 119
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: [checkAdmin]                                                                              // 121
});                                                                                                       //
highRoutes.route('/verwaltung/statistik/device', {                                                        // 123
	name: "device",                                                                                          // 124
	action: function () {                                                                                    // 125
		function action(params, queryParams) {                                                                  // 125
			BlazeLayout.render('layout', {                                                                         // 126
				bar: "bar",                                                                                           // 127
				nav: "nav",                                                                                           // 128
				navOverview: "navOverview",                                                                           // 129
				navStatistics: "navStatistics",                                                                       // 130
				main: "device",                                                                                       // 131
				footer: "footer"                                                                                      // 132
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: [checkAdmin]                                                                              // 135
});                                                                                                       //
highRoutes.route('/verwaltung/statistik/mode', {                                                          // 137
	name: "mode",                                                                                            // 138
	action: function () {                                                                                    // 139
		function action(params, queryParams) {                                                                  // 139
			BlazeLayout.render('layout', {                                                                         // 140
				bar: "bar",                                                                                           // 141
				nav: "nav",                                                                                           // 142
				navOverview: "navOverview",                                                                           // 143
				navStatistics: "navStatistics",                                                                       // 144
				main: "mode",                                                                                         // 145
				footer: "footer"                                                                                      // 146
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: [checkAdmin]                                                                              // 149
});                                                                                                       //
highRoutes.route('/verwaltung/statistik/status', {                                                        // 151
	name: "status",                                                                                          // 152
	action: function () {                                                                                    // 153
		function action(params, queryParams) {                                                                  // 153
			BlazeLayout.render('layout', {                                                                         // 154
				bar: "bar",                                                                                           // 155
				nav: "nav",                                                                                           // 156
				navOverview: "navOverview",                                                                           // 157
				navStatistics: "navStatistics",                                                                       // 158
				main: "status",                                                                                       // 159
				footer: "footer"                                                                                      // 160
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: [checkAdmin]                                                                              // 163
});                                                                                                       //
highRoutes.route('/verwaltung/statistik/total', {                                                         // 165
	name: "total",                                                                                           // 166
	action: function () {                                                                                    // 167
		function action(params, queryParams) {                                                                  // 167
			BlazeLayout.render('layout', {                                                                         // 168
				bar: "bar",                                                                                           // 169
				nav: "nav",                                                                                           // 170
				navOverview: "navOverview",                                                                           // 171
				navStatistics: "navStatistics",                                                                       // 172
				main: "total",                                                                                        // 173
				footer: "footer"                                                                                      // 174
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: [checkAdmin]                                                                              // 177
});                                                                                                       //
                                                                                                          //
highRoutes.route('/verwaltung/feedback', {                                                                // 180
	name: "feedback",                                                                                        // 181
	action: function () {                                                                                    // 182
		function action(params, queryParams) {                                                                  // 182
			BlazeLayout.render('layout', {                                                                         // 183
				bar: "bar",                                                                                           // 184
				nav: "nav",                                                                                           // 185
				navOverview: "navOverview",                                                                           // 186
				main: "feedback",                                                                                     // 187
				footer: "footer"                                                                                      // 188
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: [checkAdmin]                                                                              // 191
});                                                                                                       //
highRoutes.route('/fragebogen', {                                                                         // 193
	name: "fragebogen",                                                                                      // 194
	triggersEnter: [checkSurveySubmitted],                                                                   // 195
	action: function () {                                                                                    // 196
		function action(params, queryParams) {                                                                  // 196
			BlazeLayout.render('layout', {                                                                         // 197
				bar: "bar",                                                                                           // 198
				nav: "nav",                                                                                           // 199
				main: "fragebogen",                                                                                   // 200
				footer: "footer"                                                                                      // 201
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: []                                                                                        // 204
});                                                                                                       //
                                                                                                          //
lowRoutes.route('/low', {                                                                                 // 207
	name: "low",                                                                                             // 208
	action: function () {                                                                                    // 209
		function action(params, queryParams) {                                                                  // 209
			BlazeLayout.render('layout', {                                                                         // 210
				bar: "bar",                                                                                           // 211
				main: "low"                                                                                           // 212
				// ,                                                                                                  //
				// navSource: "navLow"                                                                                //
			});                                                                                                    // 210
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}(),                                                                                                     //
	triggersEnter: []                                                                                        // 217
});                                                                                                       //
                                                                                                          //
FlowRouter.notFound = {                                                                                   // 220
	name: "notFound",                                                                                        // 221
	action: function () {                                                                                    // 222
		function action(params, queryParams) {                                                                  // 222
			BlazeLayout.render('layout', {                                                                         // 223
				footer: "footer",                                                                                     // 224
				main: "pageNotFound",                                                                                 // 225
				footer: "footer"                                                                                      // 226
			});                                                                                                    //
		}                                                                                                       //
                                                                                                          //
		return action;                                                                                          //
	}()                                                                                                      //
};                                                                                                        //
                                                                                                          //
//Routes                                                                                                  //
AccountsTemplates.configureRoute('changePwd');                                                            // 233
// AccountsTemplates.configureRoute('forgotPwd');                                                         //
AccountsTemplates.configureRoute('resetPwd');                                                             // 235
AccountsTemplates.configureRoute('signIn');                                                               // 236
AccountsTemplates.configureRoute('signUp');                                                               // 237
// AccountsTemplates.configureRoute('verifyEmail');                                                       //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./server/lib/config/accounts.js");
require("./server/lib/config/email.js");
require("./common/aux/aux.js");
require("./common/aux/log.js");
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
