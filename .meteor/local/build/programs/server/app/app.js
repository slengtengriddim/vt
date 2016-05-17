var require = meteorInstall({"server":{"lib":{"config":{"email.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// server/lib/config/email.js                                                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
                                                                                                            //
// Accounts.emailTemplates.siteName = "MySite";                                                             //
//                                                                                                          //
// Accounts.emailTemplates.from = "MySite <support@mysite.com>";                                            //
//                                                                                                          //
// Accounts.emailTemplates.resetPassword.subject = function (user) {                                        //
//     return "Message for " + user.profile.displayName;                                                    //
// };                                                                                                       //
//                                                                                                          //
// Accounts.emailTemplates.resetPassword.text = function (user, url) {                                      //
//     var signature = "MySite Bot";                                                                        //
//     //var president = President.findOne();                                                               //
//     //if (president)                                                                                     //
//     //    president = Meteor.users.findOne(president.presidentId);                                       //
//     //    signature = president.profile.displayName + ", the MySite President.";                         //
//                                                                                                          //
//     return "Dear " + user.profile.displayName + ",\n\n" +                                                //
//         "Click the following link to set your new password:\n" +                                         //
//         url + "\n\n" +                                                                                   //
//         "Please never forget it again!!!\n\n\n" +                                                        //
//         "Cheers,\n" +                                                                                    //
//         signature;                                                                                       //
// };                                                                                                       //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"methods.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// server/methods.js                                                                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Meteor.methods({                                                                                            // 1
	deleteFavourite: function () {                                                                             // 2
		function deleteFavourite(vocabularyId) {                                                                  //
			check(vocabularyId, String);                                                                             // 3
			Favourites.remove({                                                                                      // 4
				vocabularyId: vocabularyId                                                                              // 5
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return deleteFavourite;                                                                                   //
	}(),                                                                                                       //
	insertFavourite: function () {                                                                             // 8
		function insertFavourite(vocabularyId) {                                                                  //
			check(vocabularyId, String);                                                                             // 9
			Favourites.upsert({                                                                                      // 10
				vocabularyId: vocabularyId                                                                              // 11
			}, {                                                                                                     //
				$setOnInsert: {                                                                                         // 13
					vocabularyId: vocabularyId                                                                             // 14
				}                                                                                                       //
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return insertFavourite;                                                                                   //
	}(),                                                                                                       //
	dataWords: function () {                                                                                   // 18
		function dataWords(obj) {                                                                                 //
			Data.Words.upsert({                                                                                      // 19
				vocabularyId: obj._id,                                                                                  // 20
				userId: this.userId                                                                                     // 21
			}, {                                                                                                     //
				$setOnInsert: {                                                                                         // 23
					vocabularyId: obj._id,                                                                                 // 24
					userId: this.userId,                                                                                   // 25
					vocabularyName: obj.term,                                                                              // 26
					viewed: 0                                                                                              // 27
				},                                                                                                      //
				$inc: {                                                                                                 // 29
					viewed: 1                                                                                              // 30
				}                                                                                                       //
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return dataWords;                                                                                         //
	}(),                                                                                                       //
	dataDetail: function () {                                                                                  // 34
		function dataDetail(deviceType, devicePlatform, route, mode, settingsTrainer, heartClicked) {             //
			// console.log(deviceType);                                                                              //
			// console.log(devicePlatform);                                                                          //
			// console.log(route);                                                                                   //
			// console.log(mode);                                                                                    //
			// console.log(attention);                                                                               //
			// console.log(settingsTrainer);                                                                         //
                                                                                                            //
			Data.Detail.insert({                                                                                     // 42
				deviceType: deviceType,                                                                                 // 43
				devicePlatform: devicePlatform,                                                                         // 44
				route: route,                                                                                           // 45
				mode: mode,                                                                                             // 46
				settingsTrainer: settingsTrainer,                                                                       // 47
				heartClicked: heartClicked                                                                              // 48
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return dataDetail;                                                                                        //
	}()                                                                                                        //
});                                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publication.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// server/publication.js                                                                                    //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Meteor.publish("user", function () {                                                                        // 1
	if (Roles.userIsInRole(this.userId, ['admin'])) {                                                          // 2
		return Meteor.users.find({});                                                                             // 3
	} else {                                                                                                   //
		// user not authorized. do not publish secrets                                                            //
		this.stop();                                                                                              // 6
		return;                                                                                                   // 7
	}                                                                                                          //
});                                                                                                         //
Meteor.publish("dataSurvey", function () {                                                                  // 10
	if (Roles.userIsInRole(this.userId, ['admin'])) {                                                          // 11
		var data = Data.Survey.find({}, {                                                                         // 12
			fields: {                                                                                                // 13
				'userId': 1                                                                                             // 14
			}                                                                                                        //
		});                                                                                                       //
		if (data) {                                                                                               // 17
			return data;                                                                                             // 18
		}                                                                                                         //
		return this.ready();                                                                                      // 20
	} else {                                                                                                   //
		// user not authorized. do not publish secrets                                                            //
		this.stop();                                                                                              // 23
		return;                                                                                                   // 24
	}                                                                                                          //
});                                                                                                         //
Meteor.publish("dataSurveyUser", function () {                                                              // 27
	var currentUserId = this.userId;                                                                           // 28
	var data = Data.Survey.find({                                                                              // 29
		userId: currentUserId                                                                                     // 30
	}, {                                                                                                       //
		fields: {                                                                                                 // 32
			'userId': 1                                                                                              // 33
		}                                                                                                         //
	});                                                                                                        //
	if (data) {                                                                                                // 36
		return data;                                                                                              // 37
	}                                                                                                          //
	return this.ready();                                                                                       // 39
});                                                                                                         //
Meteor.publish("userStatus", function () {                                                                  // 41
	if (Roles.userIsInRole(this.userId, ['admin'])) {                                                          // 42
		var data = Data.Status.find({});                                                                          // 43
		if (data) {                                                                                               // 44
			return data;                                                                                             // 45
		}                                                                                                         //
		return this.ready();                                                                                      // 47
	} else {                                                                                                   //
		// user not authorized. do not publish secrets                                                            //
		this.stop();                                                                                              // 50
		return;                                                                                                   // 51
	}                                                                                                          //
});                                                                                                         //
                                                                                                            //
Meteor.publish("feedback", function () {                                                                    // 55
	if (Roles.userIsInRole(this.userId, ['admin'])) {                                                          // 56
		var data = Data.Feedback.find({});                                                                        // 57
		if (data) {                                                                                               // 58
			return data;                                                                                             // 59
		}                                                                                                         //
		return this.ready();                                                                                      // 61
	} else {                                                                                                   //
		// user not authorized. do not publish secrets                                                            //
		this.stop();                                                                                              // 64
		return;                                                                                                   // 65
	}                                                                                                          //
});                                                                                                         //
                                                                                                            //
//  search query                                                                                            //
Meteor.publish('vocabularyRegister', function (search) {                                                    // 70
	check(search, Match.OneOf(String, null, undefined));                                                       // 71
	var query = {},                                                                                            // 72
	    projection = {                                                                                         //
		limit: 0,                                                                                                 // 74
		sort: {                                                                                                   // 75
			term: 1                                                                                                  // 76
		}                                                                                                         //
	};                                                                                                         //
	if (search) {                                                                                              // 79
		var regex = new RegExp(search, 'i');                                                                      // 80
		query = {                                                                                                 // 81
			$or: [{                                                                                                  // 82
				term: regex                                                                                             // 83
			}, {                                                                                                     //
				definition: regex                                                                                       // 85
			}, {                                                                                                     //
				preposition: regex                                                                                      // 87
			}, {                                                                                                     //
				wordClass: regex                                                                                        // 89
			}]                                                                                                       //
		};                                                                                                        //
		projection.limit = 100;                                                                                   // 92
	}                                                                                                          //
	return Vocabulary.find(query, projection);                                                                 // 94
});                                                                                                         //
                                                                                                            //
Meteor.publish("vocabularyAll", function () {                                                               // 97
	var data = Vocabulary.find({});                                                                            // 98
	if (data) {                                                                                                // 99
		return data;                                                                                              // 100
	}                                                                                                          //
	return this.ready();                                                                                       // 102
});                                                                                                         //
                                                                                                            //
Meteor.publish("ownedFavourites", function () {                                                             // 105
	var currentUserId = this.userId;                                                                           // 106
	var data = Favourites.find({                                                                               // 107
		userId: currentUserId                                                                                     // 108
	});                                                                                                        //
	if (data) {                                                                                                // 110
		return data;                                                                                              // 111
	}                                                                                                          //
	return this.ready();                                                                                       // 113
});                                                                                                         //
                                                                                                            //
Meteor.publish('termDay', function () {                                                                     // 116
	var currentUserId = this.userId;                                                                           // 117
	var data = TermDay.find({                                                                                  // 118
		userId: currentUserId                                                                                     // 119
	});                                                                                                        //
	if (data) {                                                                                                // 121
		return data;                                                                                              // 122
	}                                                                                                          //
	return this.ready();                                                                                       // 124
});                                                                                                         //
                                                                                                            //
Meteor.publish('singleEntry', function (entryId) {                                                          // 127
	return Vocabulary.find({                                                                                   // 128
		_id: entryId                                                                                              // 129
	});                                                                                                        //
});                                                                                                         //
                                                                                                            //
Meteor.publish('dataWords', function () {                                                                   // 133
	var data = Data.Words.find({}, {                                                                           // 134
		sort: {                                                                                                   // 135
			viewed: -1                                                                                               // 136
		}                                                                                                         //
	});                                                                                                        //
	if (data) {                                                                                                // 139
		return data;                                                                                              // 140
	}                                                                                                          //
	return this.ready();                                                                                       // 142
});                                                                                                         //
                                                                                                            //
Meteor.publish('dataDetail', function () {                                                                  // 145
	if (Roles.userIsInRole(this.userId, ['admin'])) {                                                          // 146
		var data = Data.Detail.find({});                                                                          // 147
		if (data) {                                                                                               // 148
			return data;                                                                                             // 149
		}                                                                                                         //
		return this.ready();                                                                                      // 151
	} else {                                                                                                   //
		// user not authorized. do not publish secrets                                                            //
		this.stop();                                                                                              // 154
		return;                                                                                                   // 155
	}                                                                                                          //
});                                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"startup.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// server/startup.js                                                                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Meteor.startup(function () {                                                                                // 1
	Meteor.users.find({                                                                                        // 2
		"status.online": true                                                                                     // 3
	}).observe({                                                                                               //
		added: function () {                                                                                      // 5
			function added(obj) {                                                                                    // 5
                                                                                                            //
				var today = new Date();                                                                                 // 7
                                                                                                            //
				// TERM OF THE DAY                                                                                      //
                                                                                                            //
				var lastEntryTermDay = TermDay.findOne({                                                                // 5
					userId: obj._id                                                                                        // 12
				}, {                                                                                                    //
					sort: {                                                                                                // 14
						timestamp: -1,                                                                                        // 15
						limit: 1                                                                                              // 16
					}                                                                                                      //
				});                                                                                                     //
				var termDayIds = R.pluck('vocabularyId')(TermDay.find({                                                 // 19
					userId: obj._id                                                                                        // 20
				}).fetch());                                                                                            //
				var vocabulary = Vocabulary.find({                                                                      // 22
					_id: {                                                                                                 // 23
						$nin: termDayIds                                                                                      // 24
					}                                                                                                      //
				}).fetch();                                                                                             //
                                                                                                            //
				// only insert a new vocabulary if there doesn't exist one for today                                    //
				if (!lastEntryTermDay || lastEntryTermDay.timestamp.getDate() !== today.getDate()) {                    // 5
					if (vocabulary.length !== 0) {                                                                         // 30
						TermDay.insert({                                                                                      // 31
							userId: obj._id,                                                                                     // 32
							vocabularyId: vocabulary[Math.floor(Math.random() * vocabulary.length)]._id                          // 33
						});                                                                                                   //
					}                                                                                                      //
				}                                                                                                       //
                                                                                                            //
				// log online                                                                                           //
                                                                                                            //
				// let latestEntry = Data.Status.findOne({                                                              //
				// 	userId: obj._id                                                                                     //
				// }, {                                                                                                 //
				// 	sort: {                                                                                             //
				// 		timestamp: -1,                                                                                     //
				// 		limit: 1                                                                                           //
				// 	}                                                                                                   //
				// });                                                                                                  //
				// if (latestEntry) {                                                                                   //
				// 	if (latestEntry.status !== 'online') {                                                              //
				// 		Data.Status.insert({                                                                               //
				// 			userId: obj._id,                                                                                  //
				// 			userMail: obj.emails[0].address,                                                                  //
				// 			status: "online"                                                                                  //
				// 		});                                                                                                //
				// 		console.log(obj._id + ' set online');                                                              //
				// 	}                                                                                                   //
				// } else {                                                                                             //
				// 	Data.Status.insert({                                                                                //
				// 		userId: obj._id,                                                                                   //
				// 		userMail: obj.emails[0].address,                                                                   //
				// 		status: "online"                                                                                   //
				// 	});                                                                                                 //
				// 	console.log(obj._id + ' set online');                                                               //
				// }                                                                                                    //
			}                                                                                                        //
                                                                                                            // 5
			return added;                                                                                            //
		}(),                                                                                                      //
		removed: function () {                                                                                    // 67
			function removed(obj) {                                                                                  // 67
				var today = new Date();                                                                                 // 68
                                                                                                            //
				//log offline                                                                                           //
                                                                                                            //
				// let latestEntry = Data.Status.findOne({                                                              //
				// 	userId: obj._id                                                                                     //
				// }, {                                                                                                 //
				// 	sort: {                                                                                             //
				// 		timestamp: -1,                                                                                     //
				// 		limit: 1                                                                                           //
				// 	}                                                                                                   //
				// });                                                                                                  //
				//                                                                                                      //
				// if (latestEntry) {                                                                                   //
				// 	if (latestEntry.status !== 'offline') {                                                             //
				// 		// set exit and entry points if user stays online over midnight                                    //
				// 		if (latestEntry.timestamp.getDate() < today.getDate()) {                                           //
				// 			let year = latestEntry.timestamp.getFullYear();                                                   //
				// 			let month = latestEntry.timestamp.getMonth();                                                     //
				// 			let lastDay = latestEntry.timestamp.getDate();                                                    //
				// 			let todayDay = today.getDate();                                                                   //
				// 			let beforeMidnight = new Date(year, month, lastDay, 23, 59, 59, 999);                             //
				// 			let afterMidnight = new Date(year, month, todayDay, 0, 0, 0, 1);                                  //
				//                                                                                                      //
				// 			// set offline before midnight                                                                    //
				// 			Data.Status.insert({                                                                              //
				// 				userId: obj._id,                                                                                 //
				// 				userMail: obj.emails[0].address,                                                                 //
				// 				status: "offline",                                                                               //
				// 				timestamp: beforeMidnight                                                                        //
				// 			});                                                                                               //
				// 			console.log(beforeMidnight);                                                                      //
				// 			console.log(obj._id + ' set offline');                                                            //
				//                                                                                                      //
				// 			// set online after midnight                                                                      //
				// 			Data.Status.insert({                                                                              //
				// 				userId: obj._id,                                                                                 //
				// 				userMail: obj.emails[0].address,                                                                 //
				// 				status: "online",                                                                                //
				// 				timestamp: afterMidnight                                                                         //
				// 			});                                                                                               //
				// 			console.log(afterMidnight);                                                                       //
				// 			console.log(obj._id + ' set online');                                                             //
				// 		}                                                                                                  //
				//                                                                                                      //
				// 		Data.Status.insert({                                                                               //
				// 			userId: obj._id,                                                                                  //
				// 			userMail: obj.emails[0].address,                                                                  //
				// 			status: "offline",                                                                                //
				// 			timestamp: new Date()                                                                             //
				// 		});                                                                                                //
				// 		console.log(obj._id + ' set offline');                                                             //
				// 	}                                                                                                   //
				// }                                                                                                    //
			}                                                                                                        //
                                                                                                            // 67
			return removed;                                                                                          //
		}()                                                                                                       //
	});                                                                                                        //
});                                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabularySeed.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// server/vocabularySeed.js                                                                                 //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Meteor.startup(function () {                                                                                // 1
                                                                                                            //
	// if (Vocabulary.find().count() === 0) {                                                                  //
	// 	for (let i = 0; i < 10; i++) {                                                                         //
	// 		Vocabulary.insert({                                                                                   //
	// 			term: Fake.word(),                                                                                   //
	// 			description: Fake.sentence([24])                                                                     //
	// 		});                                                                                                   //
	// 	}                                                                                                      //
	// };                                                                                                      //
});                                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"common":{"aux":{"aux.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/aux/aux.js                                                                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
(function (exports) {                                                                                       // 1
    /**                                                                                                     //
    * Randomize array element order in-place.                                                               //
    * Using Durstenfeld shuffle algorithm.                                                                  //
    */                                                                                                      //
    exports.shuffle = function (array) {                                                                    // 6
        for (var i = array.length - 1; i > 0; i--) {                                                        // 7
            var j = Math.floor(Math.random() * (i + 1));                                                    // 8
            var temp = array[i];                                                                            // 9
            array[i] = array[j];                                                                            // 10
            array[j] = temp;                                                                                // 11
        }                                                                                                   //
        return array;                                                                                       // 13
    };                                                                                                      //
    exports.getRandomInt = function (min, max) {                                                            // 15
        return Math.floor(Math.random() * (max - min + 1)) + min;                                           //
    };                                                                                                      //
})(this.Aux = {});                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"entry.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/aux/entry.js                                                                                      //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
(function (exports) {                                                                                       // 1
	exports.resetSource = function () {                                                                        // 2
		if (Session.get(NAV_SOURCE_FAV) && Session.get(LENGTH_FAV) < 1 || Session.get(NAV_SOURCE_NOT_FAV) && Session.get(LENGTH_NOT_FAV) < 1) {
			Session.set(NAV_SOURCE_FAV, false);                                                                      // 5
			Session.set(NAV_SOURCE_NOT_FAV, false);                                                                  // 6
			Session.set(NAV_SOURCE_ALL, true);                                                                       // 7
		};                                                                                                        //
	};                                                                                                         //
                                                                                                            //
	exports.setNext = function () {                                                                            // 11
		// ORDER RANDOM                                                                                           //
		if (Session.get(NAV_ORDER_RANDOM)) {                                                                      // 13
			if (Session.get(NAV_SOURCE_FAV)) {                                                                       // 14
				Session.set(INDEX_BROWSE, Math.floor(Math.random() * Session.get(LENGTH_FAV)));                         // 15
			} else if (Session.get(NAV_SOURCE_NOT_FAV)) {                                                            //
				Session.set(INDEX_BROWSE, Math.floor(Math.random() * Session.get(LENGTH_NOT_FAV)));                     // 17
			} else {                                                                                                 //
				Session.set(INDEX_BROWSE, Math.floor(Math.random() * Session.get(LENGTH_ALL)));                         // 19
			}                                                                                                        //
		}                                                                                                         //
		// ORDER STRAIGHT                                                                                         //
		else {                                                                                                    // 13
                                                                                                            //
				if (Session.get(NAV_SOURCE_FAV)) {                                                                      // 25
					if (Session.get(BROWSE_FORWARD)) {                                                                     // 26
						Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) + 1) % Session.get(LENGTH_FAV));                 // 27
					} else {                                                                                               //
						if (Session.get(INDEX_BROWSE) === 0) {                                                                // 29
							Session.set(INDEX_BROWSE, (Session.get(LENGTH_FAV) - 1) % Session.get(LENGTH_FAV));                  // 30
						} else {                                                                                              //
							Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) - 1) % Session.get(LENGTH_FAV));                // 32
						}                                                                                                     //
					}                                                                                                      //
				} else if (Session.get(NAV_SOURCE_NOT_FAV)) {                                                           //
					if (Session.get(BROWSE_FORWARD)) {                                                                     // 36
						Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) + 1) % Session.get(LENGTH_NOT_FAV));             // 37
					} else {                                                                                               //
						if (Session.get(INDEX_BROWSE) === 0) {                                                                // 39
							Session.set(INDEX_BROWSE, (Session.get(LENGTH_NOT_FAV) - 1) % Session.get(LENGTH_NOT_FAV));          // 40
						} else {                                                                                              //
							Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) - 1) % Session.get(LENGTH_NOT_FAV));            // 42
						}                                                                                                     //
					}                                                                                                      //
				} else {                                                                                                //
					if (Session.get(BROWSE_FORWARD)) {                                                                     // 46
						Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) + 1) % Session.get(LENGTH_ALL));                 // 47
					} else {                                                                                               //
						if (Session.get(INDEX_BROWSE) === 0) {                                                                // 49
							Session.set(INDEX_BROWSE, (Session.get(LENGTH_ALL) - 1) % Session.get(LENGTH_ALL));                  // 50
						} else {                                                                                              //
							Session.set(INDEX_BROWSE, (Session.get(INDEX_BROWSE) - 1) % Session.get(LENGTH_ALL));                // 52
						}                                                                                                     //
					}                                                                                                      //
				}                                                                                                       //
			}                                                                                                        //
	};                                                                                                         //
})(this.Entry = {});                                                                                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"log.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/aux/log.js                                                                                        //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
(function (exports) {                                                                                       // 1
                                                                                                            //
	exports.detail = function () {                                                                             // 3
		// log                                                                                                    //
		var modes = [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF, NAV_MODE_ENTER];                                 // 5
		var currentRoute = FlowRouter.current().route.name;                                                       // 6
                                                                                                            //
		var deviceType = Darwin.device.type;                                                                      // 8
		var devicePlatform = Darwin.device.platform;                                                              // 9
		var route = FlowRouter.current().route.name;                                                              // 10
		var mode = 'null';                                                                                        // 11
		var settingsTrainer = Session.get(SETTINGS_TRAINER);                                                      // 12
		var heartClicked = false;                                                                                 // 13
		if (currentRoute === 'trainer' || currentRoute === 'low') {                                               // 14
			modes.forEach(function (entry) {                                                                         // 15
				if (Session.get(entry)) {                                                                               // 16
					mode = entry;                                                                                          // 17
				}                                                                                                       //
			});                                                                                                      //
		};                                                                                                        //
		Meteor.call('dataDetail', deviceType, devicePlatform, route, mode, settingsTrainer, heartClicked);        // 21
	};                                                                                                         //
	exports.detailHeart = function () {                                                                        // 23
		// log                                                                                                    //
		var modes = [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF, NAV_MODE_ENTER];                                 // 25
		var currentRoute = FlowRouter.current().route.name;                                                       // 26
                                                                                                            //
		var deviceType = Darwin.device.type;                                                                      // 28
		var devicePlatform = Darwin.device.platform;                                                              // 29
		var route = FlowRouter.current().route.name;                                                              // 30
		var mode = 'null';                                                                                        // 31
		var settingsTrainer = Session.get(SETTINGS_TRAINER);                                                      // 32
		var heartClicked = true;                                                                                  // 33
		if (currentRoute === 'trainer' || currentRoute === 'low') {                                               // 34
			modes.forEach(function (entry) {                                                                         // 35
				if (Session.get(entry)) {                                                                               // 36
					mode = entry;                                                                                          // 37
				}                                                                                                       //
			});                                                                                                      //
		};                                                                                                        //
		Meteor.call('dataDetail', deviceType, devicePlatform, route, mode, settingsTrainer, heartClicked);        // 41
	};                                                                                                         //
})(this.Log = {});                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nvd3_extra.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/aux/nvd3_extra.js                                                                                 //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
/* Inspired by Lee Byron's test data generator. */                                                          //
(function (exports) {                                                                                       // 2
  var _arguments = arguments;                                                                               //
                                                                                                            //
  exports.stream_layers = function (n, m, o) {                                                              // 3
    if (_arguments.length < 3) o = 0;                                                                       // 4
    function bump(a) {                                                                                      // 5
      var x = 1 / (.1 + Math.random()),                                                                     // 6
          y = 2 * Math.random() - .5,                                                                       //
          z = 10 / (.1 + Math.random());                                                                    //
      for (var i = 0; i < m; i++) {                                                                         // 9
        var w = (i / m - y) * z;                                                                            // 10
        a[i] += x * Math.exp(-w * w);                                                                       // 11
      }                                                                                                     //
    }                                                                                                       //
    return d3.range(n).map(function () {                                                                    // 14
      var a = [],                                                                                           // 15
          i;                                                                                                //
      for (i = 0; i < m; i++) {                                                                             // 16
        a[i] = o + o * Math.random();                                                                       // 16
      }for (i = 0; i < 5; i++) {                                                                            //
        bump(a);                                                                                            // 17
      }return a.map(exports.stream_index);                                                                  //
    });                                                                                                     //
  };                                                                                                        //
  exports.stream_waves = function (n, m) {                                                                  // 21
    return d3.range(n).map(function (i) {                                                                   // 22
      return d3.range(m).map(function (j) {                                                                 // 23
        var x = 20 * j / m - i / 3;                                                                         // 24
        return 2 * x * Math.exp(-.5 * x);                                                                   // 25
      }).map(exports.stream_index);                                                                         //
    });                                                                                                     //
  };                                                                                                        //
  exports.stream_index = function (d, i) {                                                                  // 29
    return { x: i, y: Math.max(0, d) };                                                                     // 30
  };                                                                                                        //
})(this.NVD3 = {});                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stat.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/aux/stat.js                                                                                       //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
(function (exports) {                                                                                       // 1
	exports.d3Reset = function () {                                                                            // 2
		window.onresize = null;                                                                                   // 3
	};                                                                                                         //
	// exports.byDate = R.groupBy(function(entry) {                                                            //
	// 	let day = entry.timestamp;                                                                             //
	// 	day.setHours(0);                                                                                       //
	// 	day.setMinutes(0);                                                                                     //
	// 	day.setSeconds(0);                                                                                     //
	// 	day.setMilliseconds(0);                                                                                //
	// 	if (entry.timestamp.getDate()) {                                                                       //
	// 		return day;                                                                                           //
	// 	}                                                                                                      //
	// });                                                                                                     //
                                                                                                            //
	exports.normalizeByDate = function (data, xValues) {                                                       // 1
		var result = [];                                                                                          // 17
		var xValuesByDate = R.keys(Stat.byDateUnix(xValues));                                                     // 18
		// console.log(xValuesByDate);                                                                            //
		var defaultPairs = R.map(function (day) {                                                                 // 16
			return {                                                                                                 // 21
				x: parseInt(day),                                                                                       // 22
				y: 0                                                                                                    // 23
			};                                                                                                       //
		}, xValuesByDate);                                                                                        //
		var fillGaps = function fillGaps(pairs) {                                                                 // 26
			var toInsert = R.differenceWith(R.eqBy(R.prop('x')), defaultPairs, pairs);                               // 27
			return R.concat(pairs, toInsert).sort(function (a, b) {                                                  // 28
				return a.x - b.x;                                                                                       // 29
			});                                                                                                      //
		};                                                                                                        //
                                                                                                            //
		var groupedByDate = R.map(R.length, Stat.byDateUnix(data));                                               // 33
		for (var k in meteorBabelHelpers.sanitizeForInObject(groupedByDate)) {                                    // 34
			if (groupedByDate.hasOwnProperty(k)) {                                                                   // 35
				result.push({                                                                                           // 36
					x: parseInt(k),                                                                                        // 37
					y: groupedByDate[k]                                                                                    // 38
				});                                                                                                     //
			}                                                                                                        //
		};                                                                                                        //
		return fillGaps(result);                                                                                  // 42
	};                                                                                                         //
                                                                                                            //
	exports.byDateUnix = R.groupBy(function (entry) {                                                          // 45
		var day = entry.timestamp;                                                                                // 46
		var month = entry.timestamp.getMonth() + 1;                                                               // 47
		var date = entry.timestamp.getDate();                                                                     // 48
                                                                                                            //
		day.setHours(0);                                                                                          // 50
		day.setMinutes(0);                                                                                        // 51
		day.setSeconds(0);                                                                                        // 52
		day.setMilliseconds(0);                                                                                   // 53
                                                                                                            //
		if (entry.timestamp.getDate()) {                                                                          // 55
			return day.getTime();                                                                                    // 56
		}                                                                                                         //
	});                                                                                                        //
})(this.Stat = {});                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/aux/validation.js                                                                                 //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
(function (exports) {                                                                                       // 1
	exports.isAlphabetic = function (value) {                                                                  // 2
		var filter = /^[a-zA-ZäöüÄÖÜß]+$/;                                                                        // 3
		if (filter.test(value)) {                                                                                 // 4
			return true;                                                                                             // 5
		}                                                                                                         //
		return false;                                                                                             // 7
	};                                                                                                         //
                                                                                                            //
	exports.isLength64 = function (value) {                                                                    // 10
		if (value.length < 65) {                                                                                  // 11
			return true;                                                                                             // 12
		}                                                                                                         //
		return false;                                                                                             // 14
	};                                                                                                         //
})(this.Validate = {});                                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"data.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/collections/data.js                                                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
SimpleSchema.debug = false;                                                                                 // 1
                                                                                                            //
Data = {};                                                                                                  // 3
Data.Detail = new Mongo.Collection('dataDetail', {});                                                       // 4
Data.Words = new Mongo.Collection('dataWords', {});                                                         // 5
Data.Survey = new Mongo.Collection('dataSurvey', {});                                                       // 6
Data.Feedback = new Mongo.Collection('dataFeedback', {});                                                   // 7
Data.Status = new Mongo.Collection('dataStatus', {});                                                       // 8
                                                                                                            //
Data.Survey.allow({                                                                                         // 10
	insert: function () {                                                                                      // 11
		function insert() {                                                                                       // 11
			return true;                                                                                             // 12
		}                                                                                                         //
                                                                                                            //
		return insert;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
Data.Feedback.allow({                                                                                       // 15
	insert: function () {                                                                                      // 16
		function insert() {                                                                                       // 16
			return true;                                                                                             // 17
		}                                                                                                         //
                                                                                                            //
		return insert;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
                                                                                                            //
Data.Status.Schema = new SimpleSchema({                                                                     // 21
	userId: {                                                                                                  // 22
		type: String                                                                                              // 23
	},                                                                                                         //
	userMail: {                                                                                                // 25
		type: String                                                                                              // 26
	},                                                                                                         //
	timestamp: {                                                                                               // 28
		type: Date,                                                                                               // 29
		autoValue: function () {                                                                                  // 30
			function autoValue() {                                                                                   // 30
				return new Date();                                                                                      // 31
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	},                                                                                                         //
	status: {                                                                                                  // 34
		type: String,                                                                                             // 35
		allowedValues: ['online', 'offline']                                                                      // 36
	}                                                                                                          //
});                                                                                                         //
                                                                                                            //
Data.Feedback.Schema = new SimpleSchema({                                                                   // 40
	userId: {                                                                                                  // 41
		type: String,                                                                                             // 42
		autoValue: function () {                                                                                  // 43
			function autoValue() {                                                                                   // 43
				return this.userId;                                                                                     // 44
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	},                                                                                                         //
	userMail: {                                                                                                // 47
		type: String,                                                                                             // 48
		autoValue: function () {                                                                                  // 49
			function autoValue() {                                                                                   // 49
				return Meteor.user().emails[0].address;                                                                 // 50
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	},                                                                                                         //
	message: {                                                                                                 // 53
		type: String,                                                                                             // 54
		label: 'Deine Nachricht',                                                                                 // 55
		max: 1000,                                                                                                // 56
		autoform: {                                                                                               // 57
			afFieldInput: {                                                                                          // 58
				type: "textarea"                                                                                        // 59
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	createdAt: {                                                                                               // 63
		type: Date,                                                                                               // 64
		autoValue: function () {                                                                                  // 65
			function autoValue() {                                                                                   // 65
				return new Date();                                                                                      // 66
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	}                                                                                                          //
});                                                                                                         //
                                                                                                            //
Data.Detail.Schema = new SimpleSchema({                                                                     // 71
	userId: {                                                                                                  // 72
		type: String,                                                                                             // 73
		autoValue: function () {                                                                                  // 74
			function autoValue() {                                                                                   // 74
				return this.userId;                                                                                     // 75
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	},                                                                                                         //
	userMail: {                                                                                                // 78
		type: String,                                                                                             // 79
		autoValue: function () {                                                                                  // 80
			function autoValue() {                                                                                   // 80
				return Meteor.user().emails[0].address;                                                                 // 81
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	},                                                                                                         //
	timestamp: {                                                                                               // 84
		type: Date,                                                                                               // 85
		autoValue: function () {                                                                                  // 86
			function autoValue() {                                                                                   // 86
				return new Date();                                                                                      // 87
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	},                                                                                                         //
	deviceType: {                                                                                              // 90
		type: String                                                                                              // 91
	},                                                                                                         //
	devicePlatform: {                                                                                          // 93
		type: String                                                                                              // 94
	},                                                                                                         //
	route: {                                                                                                   // 96
		type: String                                                                                              // 97
	},                                                                                                         //
	mode: {                                                                                                    // 99
		type: String,                                                                                             // 100
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']                                         // 101
	},                                                                                                         //
	settingsTrainer: {                                                                                         // 103
		type: Boolean                                                                                             // 104
	},                                                                                                         //
	heartClicked: {                                                                                            // 106
		type: Boolean                                                                                             // 107
	}                                                                                                          //
});                                                                                                         //
                                                                                                            //
Data.Words.Schema = new SimpleSchema({                                                                      // 111
	userId: {                                                                                                  // 112
		type: String,                                                                                             // 113
		autoValue: function () {                                                                                  // 114
			function autoValue() {                                                                                   // 114
				return this.userId;                                                                                     // 115
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	},                                                                                                         //
	vocabularyId: {                                                                                            // 118
		type: String                                                                                              // 119
	},                                                                                                         //
	vocabularyName: {                                                                                          // 121
		type: String                                                                                              // 122
	},                                                                                                         //
	viewed: {                                                                                                  // 124
		type: Number                                                                                              // 125
	},                                                                                                         //
	createdAt: {                                                                                               // 127
		type: Date,                                                                                               // 128
		autoValue: function () {                                                                                  // 129
			function autoValue() {                                                                                   // 129
				return new Date();                                                                                      // 130
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	}                                                                                                          //
});                                                                                                         //
                                                                                                            //
Data.Survey.Schema = new SimpleSchema({                                                                     // 135
	// GENERAL                                                                                                 //
	userId: {                                                                                                  // 137
		type: String,                                                                                             // 138
		autoValue: function () {                                                                                  // 139
			function autoValue() {                                                                                   // 139
				return this.userId;                                                                                     // 140
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}(),                                                                                                      //
		autoform: {                                                                                               // 142
			type: "hidden",                                                                                          // 143
			label: false                                                                                             // 144
		}                                                                                                         //
	},                                                                                                         //
	userMail: {                                                                                                // 147
		type: String,                                                                                             // 148
		autoValue: function () {                                                                                  // 149
			function autoValue() {                                                                                   // 149
				return Meteor.user().emails[0].address;                                                                 // 150
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	},                                                                                                         //
	age: {                                                                                                     // 153
		type: Number,                                                                                             // 154
		label: 'Dein Alter',                                                                                      // 155
		min: 18,                                                                                                  // 156
		max: 99                                                                                                   // 157
	},                                                                                                         //
	gender: {                                                                                                  // 159
		type: String,                                                                                             // 160
		label: 'Dein Geschlecht',                                                                                 // 161
		autoform: {                                                                                               // 162
			type: "select-radio-inline",                                                                             // 163
			options: function () {                                                                                   // 164
				function options() {                                                                                    // 164
					return [{ label: "weiblich", value: "female" }, { label: "männlich", value: "male" }];                 // 165
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	previousExperience: {                                                                                      // 172
		type: String,                                                                                             // 173
		label: 'Ich verfüge über Vorerfahrung mit digitalen Vokabeltrainern.',                                    // 174
		autoform: {                                                                                               // 175
			type: "select-radio-inline",                                                                             // 176
			options: function () {                                                                                   // 177
				function options() {                                                                                    // 177
					return [{                                                                                              // 178
						label: "trifft zu",                                                                                   // 179
						value: 5                                                                                              // 180
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 182
						value: 4                                                                                              // 183
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 185
						value: 3                                                                                              // 186
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 188
						value: 2                                                                                              // 189
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 191
						value: 1                                                                                              // 192
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	learningCurve: {                                                                                           // 197
		type: String,                                                                                             // 198
		label: 'Die Einarbeitung in die App war für mich mühelos.',                                               // 199
		autoform: {                                                                                               // 200
			type: "select-radio-inline",                                                                             // 201
			options: function () {                                                                                   // 202
				function options() {                                                                                    // 202
					return [{                                                                                              // 203
						label: "trifft zu",                                                                                   // 204
						value: 5                                                                                              // 205
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 207
						value: 4                                                                                              // 208
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 210
						value: 3                                                                                              // 211
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 213
						value: 2                                                                                              // 214
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 216
						value: 1                                                                                              // 217
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	everydayUse: {                                                                                             // 222
		type: String,                                                                                             // 223
		label: 'Den Gebrauch der App kann ich mühelos in meinen Alltag integrieren.',                             // 224
		autoform: {                                                                                               // 225
			type: "select-radio-inline",                                                                             // 226
			options: function () {                                                                                   // 227
				function options() {                                                                                    // 227
					return [{                                                                                              // 228
						label: "trifft zu",                                                                                   // 229
						value: 5                                                                                              // 230
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 232
						value: 4                                                                                              // 233
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 235
						value: 3                                                                                              // 236
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 238
						value: 2                                                                                              // 239
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 241
						value: 1                                                                                              // 242
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	everydayUseText: {                                                                                         // 247
		type: String,                                                                                             // 248
		max: 1000,                                                                                                // 249
		optional: true,                                                                                           // 250
		label: 'Aus folgendem Grund (optional):',                                                                 // 251
		autoform: {                                                                                               // 252
			afFieldInput: {                                                                                          // 253
				type: "textarea"                                                                                        // 254
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	usability: {                                                                                               // 258
		type: String,                                                                                             // 259
		label: 'Mit der Bedienung der App komme ich mühelos zurecht.',                                            // 260
		autoform: {                                                                                               // 261
			type: "select-radio-inline",                                                                             // 262
			options: function () {                                                                                   // 263
				function options() {                                                                                    // 263
					return [{                                                                                              // 264
						label: "trifft zu",                                                                                   // 265
						value: 5                                                                                              // 266
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 268
						value: 4                                                                                              // 269
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 271
						value: 3                                                                                              // 272
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 274
						value: 2                                                                                              // 275
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 277
						value: 1                                                                                              // 278
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	usabilityText: {                                                                                           // 283
		type: String,                                                                                             // 284
		max: 1000,                                                                                                // 285
		optional: true,                                                                                           // 286
		label: 'Aus folgendem Grund (optional):',                                                                 // 287
		optional: true,                                                                                           // 288
		autoform: {                                                                                               // 289
			afFieldInput: {                                                                                          // 290
				type: "textarea"                                                                                        // 291
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	// NUTZUNGSVERHALTEN                                                                                       //
	deviceMobile: {                                                                                            // 296
		type: String,                                                                                             // 297
		label: '... mobiles Endgerät (z.B. Smartphone, kein Laptop) aufgerufen.',                                 // 298
		autoform: {                                                                                               // 299
			type: "select-radio-inline",                                                                             // 300
			options: function () {                                                                                   // 301
				function options() {                                                                                    // 301
					return [{                                                                                              // 302
						label: "trifft zu",                                                                                   // 303
						value: 5                                                                                              // 304
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 306
						value: 4                                                                                              // 307
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 309
						value: 3                                                                                              // 310
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 312
						value: 2                                                                                              // 313
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 315
						value: 1                                                                                              // 316
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	deviceTablet: {                                                                                            // 321
		type: String,                                                                                             // 322
		label: '... Tablet Endgerät aufgerufen.',                                                                 // 323
		autoform: {                                                                                               // 324
			type: "select-radio-inline",                                                                             // 325
			options: function () {                                                                                   // 326
				function options() {                                                                                    // 326
					return [{                                                                                              // 327
						label: "trifft zu",                                                                                   // 328
						value: 5                                                                                              // 329
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 331
						value: 4                                                                                              // 332
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 334
						value: 3                                                                                              // 335
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 337
						value: 2                                                                                              // 338
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 340
						value: 1                                                                                              // 341
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	deviceDesktop: {                                                                                           // 346
		type: String,                                                                                             // 347
		label: '... Desktop Endgerät (z.B. Laptop, Desktop PC) aufgerufen.',                                      // 348
		autoform: {                                                                                               // 349
			type: "select-radio-inline",                                                                             // 350
			options: function () {                                                                                   // 351
				function options() {                                                                                    // 351
					return [{                                                                                              // 352
						label: "trifft zu",                                                                                   // 353
						value: 5                                                                                              // 354
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 356
						value: 4                                                                                              // 357
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 359
						value: 3                                                                                              // 360
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 362
						value: 2                                                                                              // 363
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 365
						value: 1                                                                                              // 366
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	deviceBehavior: {                                                                                          // 371
		type: String,                                                                                             // 372
		max: 1000,                                                                                                // 373
		optional: true,                                                                                           // 374
		label: 'Aus folgendem Grund (optional):',                                                                 // 375
		autoform: {                                                                                               // 376
			afFieldInput: {                                                                                          // 377
				type: "textarea"                                                                                        // 378
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	favouriteMode: {                                                                                           // 382
		type: String,                                                                                             // 383
		label: 'Folgende Trainingsmethode habe ich am liebsten genutzt:',                                         // 384
		autoform: {                                                                                               // 385
			type: "select-radio-inline",                                                                             // 386
			options: function () {                                                                                   // 387
				function options() {                                                                                    // 387
					return [{                                                                                              // 388
						label: "Lesen",                                                                                       // 389
						value: "lesen"                                                                                        // 390
					}, {                                                                                                   //
						label: "Rate Wort",                                                                                   // 392
						value: "wort"                                                                                         // 393
					}, {                                                                                                   //
						label: "Rate Definition",                                                                             // 395
						value: "definition"                                                                                   // 396
					}, {                                                                                                   //
						label: "Eingabetest",                                                                                 // 398
						value: "eingabe"                                                                                      // 399
					}, {                                                                                                   //
						label: "Keine Methode sondern das Register",                                                          // 401
						value: "register"                                                                                     // 402
					}, {                                                                                                   //
						label: "Weiss ich nicht",                                                                             // 404
						value: "ka"                                                                                           // 405
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	favouriteModeText: {                                                                                       // 410
		type: String,                                                                                             // 411
		max: 1000,                                                                                                // 412
		optional: true,                                                                                           // 413
		label: 'Aus folgendem Grund (optional):',                                                                 // 414
		autoform: {                                                                                               // 415
			afFieldInput: {                                                                                          // 416
				type: "textarea"                                                                                        // 417
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	modeEnter: {                                                                                               // 421
		type: String,                                                                                             // 422
		label: "Die Methode 'Eingabetest' habe ich im Kompaktmodus vermisst.",                                    // 423
		autoform: {                                                                                               // 424
			type: "select-radio-inline",                                                                             // 425
			options: function () {                                                                                   // 426
				function options() {                                                                                    // 426
					return [{                                                                                              // 427
						label: "trifft zu",                                                                                   // 428
						value: 5                                                                                              // 429
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 431
						value: 4                                                                                              // 432
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 434
						value: 3                                                                                              // 435
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 437
						value: 2                                                                                              // 438
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 440
						value: 1                                                                                              // 441
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	attentionBenefit: {                                                                                        // 446
		type: String,                                                                                             // 447
		label: 'Mir hat das Konzept des Kompaktmodus gefallen.',                                                  // 448
		autoform: {                                                                                               // 449
			type: "select-radio-inline",                                                                             // 450
			options: function () {                                                                                   // 451
				function options() {                                                                                    // 451
					return [{                                                                                              // 452
						label: "trifft zu",                                                                                   // 453
						value: 5                                                                                              // 454
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 456
						value: 4                                                                                              // 457
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 459
						value: 3                                                                                              // 460
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 462
						value: 2                                                                                              // 463
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 465
						value: 1                                                                                              // 466
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	attentionEasy: {                                                                                           // 471
		type: String,                                                                                             // 472
		label: 'Ich kann mühelos in den Kompaktmodus wechseln.',                                                  // 473
		autoform: {                                                                                               // 474
			type: "select-radio-inline",                                                                             // 475
			options: function () {                                                                                   // 476
				function options() {                                                                                    // 476
					return [{                                                                                              // 477
						label: "trifft zu",                                                                                   // 478
						value: 5                                                                                              // 479
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 481
						value: 4                                                                                              // 482
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 484
						value: 3                                                                                              // 485
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 487
						value: 2                                                                                              // 488
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 490
						value: 1                                                                                              // 491
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	attentionFast: {                                                                                           // 496
		type: String,                                                                                             // 497
		label: 'Ich kann schnell in den Kompaktmodus wechseln.',                                                  // 498
		autoform: {                                                                                               // 499
			type: "select-radio-inline",                                                                             // 500
			options: function () {                                                                                   // 501
				function options() {                                                                                    // 501
					return [{                                                                                              // 502
						label: "trifft zu",                                                                                   // 503
						value: 5                                                                                              // 504
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 506
						value: 4                                                                                              // 507
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 509
						value: 3                                                                                              // 510
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 512
						value: 2                                                                                              // 513
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 515
						value: 1                                                                                              // 516
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	attentionOften: {                                                                                          // 521
		type: String,                                                                                             // 522
		label: 'Ich verwende den Kompaktmodus häufig.',                                                           // 523
		autoform: {                                                                                               // 524
			type: "select-radio-inline",                                                                             // 525
			options: function () {                                                                                   // 526
				function options() {                                                                                    // 526
					return [{                                                                                              // 527
						label: "trifft zu",                                                                                   // 528
						value: 5                                                                                              // 529
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 531
						value: 4                                                                                              // 532
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 534
						value: 3                                                                                              // 535
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 537
						value: 2                                                                                              // 538
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 540
						value: 1                                                                                              // 541
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	attentionSituation: {                                                                                      // 546
		type: String,                                                                                             // 547
		max: 1000,                                                                                                // 548
		label: 'Beschreibe eine Beispielsituation, in der du beschlossen hast, in den Kompaktmodus zu wechseln.',
		optional: true,                                                                                           // 550
		autoform: {                                                                                               // 551
			afFieldInput: {                                                                                          // 552
				type: "textarea"                                                                                        // 553
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	attentionUse: {                                                                                            // 557
		type: String,                                                                                             // 558
		label: 'Unabhängig von dieser App finde ich das Konzept, die Benutzeroberfläche kontextorientiert anzupassen, sinnvoll.',
		autoform: {                                                                                               // 560
			type: "select-radio-inline",                                                                             // 561
			options: function () {                                                                                   // 562
				function options() {                                                                                    // 562
					return [{                                                                                              // 563
						label: "trifft zu",                                                                                   // 564
						value: 5                                                                                              // 565
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 567
						value: 4                                                                                              // 568
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 570
						value: 3                                                                                              // 571
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 573
						value: 2                                                                                              // 574
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 576
						value: 1                                                                                              // 577
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	attentionUseText: {                                                                                        // 582
		type: String,                                                                                             // 583
		max: 1000,                                                                                                // 584
		label: 'Aus folgendem Grund (optional):',                                                                 // 585
		optional: true,                                                                                           // 586
		autoform: {                                                                                               // 587
			afFieldInput: {                                                                                          // 588
				type: "textarea"                                                                                        // 589
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	attentionOthers: {                                                                                         // 593
		type: String,                                                                                             // 594
		label: 'Ich würde mir das Konzept, die Benutzeroberfläche kontextorientiert anzupassen, auch fuer andere Apps wünschen.',
		autoform: {                                                                                               // 596
			type: "select-radio-inline",                                                                             // 597
			options: function () {                                                                                   // 598
				function options() {                                                                                    // 598
					return [{                                                                                              // 599
						label: "trifft zu",                                                                                   // 600
						value: 5                                                                                              // 601
					}, {                                                                                                   //
						label: "trifft eher zu",                                                                              // 603
						value: 4                                                                                              // 604
					}, {                                                                                                   //
						label: "teils-teils",                                                                                 // 606
						value: 3                                                                                              // 607
					}, {                                                                                                   //
						label: "trifft eher nicht zu",                                                                        // 609
						value: 2                                                                                              // 610
					}, {                                                                                                   //
						label: "trifft nicht zu",                                                                             // 612
						value: 1                                                                                              // 613
					}];                                                                                                    //
				}                                                                                                       //
                                                                                                            //
				return options;                                                                                         //
			}()                                                                                                      //
		}                                                                                                         //
	},                                                                                                         //
	attentionOthersText: {                                                                                     // 618
		type: String,                                                                                             // 619
		max: 1000,                                                                                                // 620
		label: 'Aus folgendem Grund (optional):',                                                                 // 621
		optional: true,                                                                                           // 622
		autoform: {                                                                                               // 623
			afFieldInput: {                                                                                          // 624
				type: "textarea"                                                                                        // 625
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	prospects: {                                                                                               // 629
		type: String,                                                                                             // 630
		max: 1000,                                                                                                // 631
		optional: true,                                                                                           // 632
		label: 'Sonstige Anmerkungen',                                                                            // 633
		autoform: {                                                                                               // 634
			afFieldInput: {                                                                                          // 635
				type: "textarea"                                                                                        // 636
			}                                                                                                        //
		}                                                                                                         //
	},                                                                                                         //
	surveyAcknowledged: {                                                                                      // 640
		type: Boolean,                                                                                            // 641
		label: "Mir ist bewusst, dass ich den Fragenbogen nur einmal abschicken kann.",                           // 642
		optional: false,                                                                                          // 643
		allowedValues: [true],                                                                                    // 644
		autoform: {                                                                                               // 645
			afFieldInput: {                                                                                          // 646
				type: "boolean-checkbox"                                                                                // 647
			}                                                                                                        //
		}                                                                                                         //
	}                                                                                                          //
                                                                                                            //
});                                                                                                         //
                                                                                                            //
Data.Detail.attachSchema(Data.Detail.Schema);                                                               // 655
Data.Words.attachSchema(Data.Words.Schema);                                                                 // 656
Data.Survey.attachSchema(Data.Survey.Schema);                                                               // 657
Data.Feedback.attachSchema(Data.Feedback.Schema);                                                           // 658
Data.Status.attachSchema(Data.Status.Schema);                                                               // 659
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fav.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/collections/fav.js                                                                                //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
var FavouritesSchema = new SimpleSchema({                                                                   // 1
  userId: {                                                                                                 // 2
    type: String,                                                                                           // 3
    autoValue: function () {                                                                                // 4
      function autoValue() {                                                                                // 4
        return this.userId;                                                                                 // 5
      }                                                                                                     //
                                                                                                            //
      return autoValue;                                                                                     //
    }()                                                                                                     //
  },                                                                                                        //
  vocabularyId: {                                                                                           // 8
    type: String                                                                                            // 9
  },                                                                                                        //
  createdAt: {                                                                                              // 11
    type: Date,                                                                                             // 12
    autoValue: function () {                                                                                // 13
      function autoValue() {                                                                                // 13
        return new Date();                                                                                  // 14
      }                                                                                                     //
                                                                                                            //
      return autoValue;                                                                                     //
    }(),                                                                                                    //
    autoform: {                                                                                             // 16
      type: "hidden"                                                                                        // 17
    }                                                                                                       //
  }                                                                                                         //
});                                                                                                         //
                                                                                                            //
Favourites = new Mongo.Collection('favourites', {});                                                        // 23
Favourites.attachSchema(FavouritesSchema);                                                                  // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"messages.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/collections/messages.js                                                                           //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
SimpleSchema.messages({                                                                                     // 1
  required: "Hier wird eine Eingabe benoetigt.",                                                            // 2
  minString: "[label] muss mindestens [min] Zeichen enthalten.",                                            // 3
  maxString: "[label] darf nicht mehr als [max] Zeichen enthalten.",                                        // 4
  minNumber: "[label] muss mindestens [min] sein.",                                                         // 5
  maxNumber: "[label] darf nicht hoeher als [max] sein.",                                                   // 6
  minDate: "[label] must be on or after [min]",                                                             // 7
  maxDate: "[label] cannot be after [max]",                                                                 // 8
  badDate: "[label] is not a valid date",                                                                   // 9
  minCount: "You must specify at least [minCount] values",                                                  // 10
  maxCount: "You cannot specify more than [maxCount] values",                                               // 11
  noDecimal: "[label] muss eine gerade Zahl sein.",                                                         // 12
  notAllowed: "Bitte bestaetigen.",                                                                         // 13
  expectedString: "[label] muss eine Zeichenkette sein.",                                                   // 14
  expectedNumber: "[label] muss eine Zahl sein.",                                                           // 15
  expectedBoolean: "[label] muss ein Bool-Wert sein.",                                                      // 16
  expectedArray: "[label] muss ein Array sein.",                                                            // 17
  expectedObject: "[label] muss ein Object sein.",                                                          // 18
  expectedConstructor: "[label] muss vom Typ [type] sein.",                                                 // 19
  regEx: [{ msg: "[label] failed regular expression validation" }, { exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address" }, { exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address" }, { exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain" }, { exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain" }, { exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address" }, { exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address" }, { exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address" }, { exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL" }, { exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID" }],
  keyNotInSchema: "[key] ist nicht im Schema erlaubt."                                                      // 32
});                                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabulary.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/collections/vocabulary.js                                                                         //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
Vocabulary = new Mongo.Collection('vocabulary', {});                                                        // 1
TermDay = new Mongo.Collection('termDay', {});                                                              // 2
                                                                                                            //
if (Meteor.isServer) {                                                                                      // 4
	Vocabulary._ensureIndex({                                                                                  // 5
		term: 1,                                                                                                  // 6
		definition: 1,                                                                                            // 7
		preposition: 1,                                                                                           // 8
		wordClass: 1                                                                                              // 9
	});                                                                                                        //
}                                                                                                           //
                                                                                                            //
Vocabulary.allow({                                                                                          // 13
	insert: function () {                                                                                      // 14
		function insert() {                                                                                       // 14
			return false;                                                                                            //
		}                                                                                                         //
                                                                                                            //
		return insert;                                                                                            //
	}(),                                                                                                       //
	update: function () {                                                                                      // 15
		function update() {                                                                                       // 15
			return false;                                                                                            //
		}                                                                                                         //
                                                                                                            //
		return update;                                                                                            //
	}(),                                                                                                       //
	remove: function () {                                                                                      // 16
		function remove() {                                                                                       // 16
			return false;                                                                                            //
		}                                                                                                         //
                                                                                                            //
		return remove;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
                                                                                                            //
Vocabulary.deny({                                                                                           // 19
	insert: function () {                                                                                      // 20
		function insert() {                                                                                       // 20
			return true;                                                                                             //
		}                                                                                                         //
                                                                                                            //
		return insert;                                                                                            //
	}(),                                                                                                       //
	update: function () {                                                                                      // 21
		function update() {                                                                                       // 21
			return true;                                                                                             //
		}                                                                                                         //
                                                                                                            //
		return update;                                                                                            //
	}(),                                                                                                       //
	remove: function () {                                                                                      // 22
		function remove() {                                                                                       // 22
			return true;                                                                                             //
		}                                                                                                         //
                                                                                                            //
		return remove;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
                                                                                                            //
var VocabularySchema = new SimpleSchema({                                                                   // 25
	term: {                                                                                                    // 26
		type: String,                                                                                             // 27
		regEx: /^[a-zA-ZäöüÄÖÜß]*$/                                                                               // 28
	},                                                                                                         //
	preposition: {                                                                                             // 30
		type: String,                                                                                             // 31
		allowedValues: ['der', 'die', 'das'],                                                                     // 32
		optional: true                                                                                            // 33
	},                                                                                                         //
	wordClass: {                                                                                               // 35
		type: String,                                                                                             // 36
		allowedValues: ['Nomen', 'Verb', 'Adjektiv']                                                              // 37
	},                                                                                                         //
	definition: {                                                                                              // 39
		type: [String]                                                                                            // 40
	}                                                                                                          //
});                                                                                                         //
                                                                                                            //
var TermDaySchema = new SimpleSchema({                                                                      // 44
	userId: {                                                                                                  // 45
		type: String                                                                                              // 46
	},                                                                                                         //
	vocabularyId: {                                                                                            // 48
		type: String                                                                                              // 49
	},                                                                                                         //
	timestamp: {                                                                                               // 51
		type: Date,                                                                                               // 52
		autoValue: function () {                                                                                  // 53
			function autoValue() {                                                                                   // 53
				return new Date();                                                                                      // 54
			}                                                                                                        //
                                                                                                            //
			return autoValue;                                                                                        //
		}()                                                                                                       //
	}                                                                                                          //
});                                                                                                         //
                                                                                                            //
Vocabulary.attachSchema(VocabularySchema);                                                                  // 59
TermDay.attachSchema(TermDaySchema);                                                                        // 60
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config":{"accounts_t9n.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/config/accounts_t9n.js                                                                            //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
T9n.setLanguage('de');                                                                                      // 1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"admin.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/config/admin.js                                                                                   //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
AdminConfig = {                                                                                             // 1
	name: 'Chalimo',                                                                                           // 2
	adminEmails: ['bla@bla.org', 'cedric.quintes@openmailbox.org'],                                            // 3
	collections: {                                                                                             // 4
		Vocabulary: {                                                                                             // 5
			tableColumns: [{                                                                                         // 6
				label: 'Wort',                                                                                          // 7
				name: 'term'                                                                                            // 8
			}, {                                                                                                     //
				label: 'Wortklasse',                                                                                    // 10
				name: 'wordClass'                                                                                       // 11
			}]                                                                                                       //
		}                                                                                                         //
	}                                                                                                          //
};                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"at_config.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/config/at_config.js                                                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
// Options                                                                                                  //
AccountsTemplates.configure({                                                                               // 2
  defaultLayout: 'layoutAccount',                                                                           // 3
  defaultLayoutRegions: {                                                                                   // 4
    // footer: 'footer'                                                                                     //
  },                                                                                                        //
  defaultContentRegion: 'main',                                                                             // 7
  showForgotPasswordLink: false,                                                                            // 8
  overrideLoginErrors: true,                                                                                // 9
  enablePasswordChange: true,                                                                               // 10
                                                                                                            //
  // sendVerificationEmail: true,                                                                           //
  // enforceEmailVerification: true,                                                                        //
  //confirmPassword: true,                                                                                  //
  //continuousValidation: false,                                                                            //
  //displayFormLabels: true,                                                                                //
  //forbidClientAccountCreation: true,                                                                      //
  //formValidationFeedback: true,                                                                           //
  // homeRoutePath: '/',                                                                                    //
  // showAddRemoveServices: false,                                                                          //
  //showPlaceholders: true,                                                                                 //
                                                                                                            //
  negativeValidation: true,                                                                                 // 23
  positiveValidation: true,                                                                                 // 24
  negativeFeedback: false,                                                                                  // 25
  positiveFeedback: true                                                                                    // 26
                                                                                                            //
});                                                                                                         //
                                                                                                            //
// Privacy Policy and Terms of Use                                                                          //
//privacyUrl: 'privacy',                                                                                    //
//termsUrl: 'terms-of-use',                                                                                 //
var logout = function logout() {                                                                            // 33
  //example redirect after logout                                                                           //
  FlowRouter.go('/sign-in');                                                                                // 35
};                                                                                                          //
                                                                                                            //
AccountsTemplates.configure({                                                                               // 38
  onLogoutHook: logout                                                                                      // 39
});                                                                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// common/routes.js                                                                                         //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
// *** ROUTE FUNCTIONS                                                                                      //
                                                                                                            //
checkAttentionModeOff = function checkAttentionModeOff() {                                                  // 3
	if (Session.get(ATTENTION_MODE)) {                                                                         // 4
		Session.set(ATTENTION_MODE, false);                                                                       // 5
	}                                                                                                          //
};                                                                                                          //
                                                                                                            //
checkAttentionModeOn = function checkAttentionModeOn() {                                                    // 9
	if (!Session.get(ATTENTION_MODE)) {                                                                        // 10
		Session.set(ATTENTION_MODE, true);                                                                        // 11
	}                                                                                                          //
};                                                                                                          //
                                                                                                            //
resetSession = function resetSession() {                                                                    // 15
	Session.set(REVEALED, false);                                                                              // 16
	Session.set(TERM_WRONG, false);                                                                            // 17
};                                                                                                          //
                                                                                                            //
// checkAdmin = () => {                                                                                     //
// 	console.log(Meteor.userId());                                                                           //
// 	console.log(Roles.userIsInRole(Meteor.userId(), 'admin'));                                              //
// 	console.log(Roles.subscription.ready());                                                                //
// 	if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {                                                    //
// 		console.log(Roles.userIsInRole(Meteor.userId(), 'admin'));                                             //
// 		FlowRouter.redirect('/notFound');                                                                      //
// 	}                                                                                                       //
// };                                                                                                       //
                                                                                                            //
checkSurveySubmitted = function checkSurveySubmitted() {                                                    // 30
	var query = UserExt.findOne({                                                                              // 31
		userId: Meteor.userId(),                                                                                  // 32
		surveySubmitted: true                                                                                     // 33
	});                                                                                                        //
	if (query) {                                                                                               // 35
		FlowRouter.redirect('/');                                                                                 // 36
	}                                                                                                          //
};                                                                                                          //
                                                                                                            //
d3Reset = function d3Reset() {                                                                              // 40
	window.onresize = null;                                                                                    // 41
};                                                                                                          //
                                                                                                            //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn, d3Reset]);                                     // 44
                                                                                                            //
// *** ROUTE GROUPS                                                                                         //
                                                                                                            //
var lowRoutes = FlowRouter.group({                                                                          // 48
	name: "low",                                                                                               // 49
	triggersEnter: [checkAttentionModeOn],                                                                     // 50
	triggersExit: []                                                                                           // 51
});                                                                                                         //
var highRoutes = FlowRouter.group({                                                                         // 53
	name: "high",                                                                                              // 54
	triggersEnter: [checkAttentionModeOff],                                                                    // 55
	triggersExit: []                                                                                           // 56
});                                                                                                         //
                                                                                                            //
// *** ROUTES                                                                                               //
                                                                                                            //
highRoutes.route('/', {                                                                                     // 63
	name: "index",                                                                                             // 64
	action: function () {                                                                                      // 65
		function action(params, queryParams) {                                                                    // 65
			BlazeLayout.render('layout', {                                                                           // 66
				bar: "bar",                                                                                             // 67
				nav: "nav",                                                                                             // 68
				main: "index",                                                                                          // 69
				footer: "footer"                                                                                        // 70
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
highRoutes.route('/doc', {                                                                                  // 74
	name: "doc",                                                                                               // 75
	action: function () {                                                                                      // 76
		function action(params, queryParams) {                                                                    // 76
			BlazeLayout.render('layout', {                                                                           // 77
				bar: "bar",                                                                                             // 78
				nav: "nav",                                                                                             // 79
				main: "doc",                                                                                            // 80
				footer: "footer"                                                                                        // 81
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
highRoutes.route('/law', {                                                                                  // 85
	name: "law",                                                                                               // 86
	action: function () {                                                                                      // 87
		function action(params, queryParams) {                                                                    // 87
			BlazeLayout.render('layout', {                                                                           // 88
				bar: "bar",                                                                                             // 89
				nav: "nav",                                                                                             // 90
				main: "law",                                                                                            // 91
				footer: "footer"                                                                                        // 92
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
highRoutes.route('/impressum', {                                                                            // 96
	name: "impressum",                                                                                         // 97
	action: function () {                                                                                      // 98
		function action(params, queryParams) {                                                                    // 98
			BlazeLayout.render('layout', {                                                                           // 99
				bar: "bar",                                                                                             // 100
				nav: "nav",                                                                                             // 101
				main: "impressum",                                                                                      // 102
				footer: "footer"                                                                                        // 103
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
                                                                                                            //
highRoutes.route('/trainer', {                                                                              // 108
	name: "trainer",                                                                                           // 109
	action: function () {                                                                                      // 110
		function action(params, queryParams) {                                                                    // 110
			BlazeLayout.render('layout', {                                                                           // 111
				bar: "bar",                                                                                             // 112
				nav: "nav",                                                                                             // 113
				main: "trainer",                                                                                        // 114
				footer: "footer"                                                                                        // 115
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
                                                                                                            //
highRoutes.route('/register', {                                                                             // 120
	name: "register",                                                                                          // 121
	action: function () {                                                                                      // 122
		function action(params, queryParams) {                                                                    // 122
			BlazeLayout.render('layout', {                                                                           // 123
				bar: "bar",                                                                                             // 124
				nav: "nav",                                                                                             // 125
				main: "register",                                                                                       // 126
				footer: "footer"                                                                                        // 127
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}()                                                                                                        //
});                                                                                                         //
highRoutes.route('/verwaltung', {                                                                           // 131
	name: "verwaltung",                                                                                        // 132
	action: function () {                                                                                      // 133
		function action(params, queryParams) {                                                                    // 133
			FlowRouter.redirect('/verwaltung/feedback');                                                             // 134
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 136
});                                                                                                         //
highRoutes.route('/verwaltung/statistik', {                                                                 // 138
	name: "statistik",                                                                                         // 139
	action: function () {                                                                                      // 140
		function action(params, queryParams) {                                                                    // 140
			FlowRouter.redirect('/verwaltung/statistik/statTotal');                                                  // 141
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 143
});                                                                                                         //
                                                                                                            //
// VERWALTUNG                                                                                               //
                                                                                                            //
highRoutes.route('/verwaltung/statistik/statTotal', {                                                       // 149
	name: "statTotal",                                                                                         // 150
	action: function () {                                                                                      // 151
		function action(params, queryParams) {                                                                    // 151
			BlazeLayout.render('layoutAdmin', {                                                                      // 152
				bar: "bar",                                                                                             // 153
				nav: "nav",                                                                                             // 154
				navOverview: "navOverview",                                                                             // 155
				navStatistics: "navStatistics",                                                                         // 156
				main: "statTotal",                                                                                      // 157
				footer: "footer"                                                                                        // 158
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 161
});                                                                                                         //
highRoutes.route('/verwaltung/statistik/statDevice', {                                                      // 163
	name: "statDevice",                                                                                        // 164
	action: function () {                                                                                      // 165
		function action(params, queryParams) {                                                                    // 165
			BlazeLayout.render('layoutAdmin', {                                                                      // 166
				bar: "bar",                                                                                             // 167
				nav: "nav",                                                                                             // 168
				navOverview: "navOverview",                                                                             // 169
				navStatistics: "navStatistics",                                                                         // 170
				main: "statDevice",                                                                                     // 171
				footer: "footer"                                                                                        // 172
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 175
});                                                                                                         //
highRoutes.route('/verwaltung/statistik/statMethod', {                                                      // 177
	name: "statMethod",                                                                                        // 178
	action: function () {                                                                                      // 179
		function action(params, queryParams) {                                                                    // 179
			BlazeLayout.render('layoutAdmin', {                                                                      // 180
				bar: "bar",                                                                                             // 181
				nav: "nav",                                                                                             // 182
				navOverview: "navOverview",                                                                             // 183
				navStatistics: "navStatistics",                                                                         // 184
				main: "statMethod",                                                                                     // 185
				footer: "footer"                                                                                        // 186
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 189
});                                                                                                         //
highRoutes.route('/verwaltung/statistik/statUsers', {                                                       // 191
	name: "statUsers",                                                                                         // 192
	action: function () {                                                                                      // 193
		function action(params, queryParams) {                                                                    // 193
			BlazeLayout.render('layoutAdmin', {                                                                      // 194
				bar: "bar",                                                                                             // 195
				nav: "nav",                                                                                             // 196
				navOverview: "navOverview",                                                                             // 197
				navStatistics: "navStatistics",                                                                         // 198
				main: "statUsers",                                                                                      // 199
				footer: "footer"                                                                                        // 200
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 203
});                                                                                                         //
highRoutes.route('/verwaltung/statistik/statAttention', {                                                   // 205
	name: "statAttention",                                                                                     // 206
	action: function () {                                                                                      // 207
		function action(params, queryParams) {                                                                    // 207
			BlazeLayout.render('layoutAdmin', {                                                                      // 208
				bar: "bar",                                                                                             // 209
				nav: "nav",                                                                                             // 210
				navOverview: "navOverview",                                                                             // 211
				navStatistics: "navStatistics",                                                                         // 212
				main: "statAttention",                                                                                  // 213
				footer: "footer"                                                                                        // 214
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 217
});                                                                                                         //
highRoutes.route('/verwaltung/statistik/statBrowse', {                                                      // 219
	name: "statBrowse",                                                                                        // 220
	action: function () {                                                                                      // 221
		function action(params, queryParams) {                                                                    // 221
			BlazeLayout.render('layoutAdmin', {                                                                      // 222
				bar: "bar",                                                                                             // 223
				nav: "nav",                                                                                             // 224
				navOverview: "navOverview",                                                                             // 225
				navStatistics: "navStatistics",                                                                         // 226
				main: "statBrowse",                                                                                     // 227
				footer: "footer"                                                                                        // 228
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 231
});                                                                                                         //
highRoutes.route('/verwaltung/statistik/statFav', {                                                         // 233
	name: "statFav",                                                                                           // 234
	action: function () {                                                                                      // 235
		function action(params, queryParams) {                                                                    // 235
			BlazeLayout.render('layoutAdmin', {                                                                      // 236
				bar: "bar",                                                                                             // 237
				nav: "nav",                                                                                             // 238
				navOverview: "navOverview",                                                                             // 239
				navStatistics: "navStatistics",                                                                         // 240
				main: "statFav",                                                                                        // 241
				footer: "footer"                                                                                        // 242
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 245
});                                                                                                         //
highRoutes.route('/verwaltung/statistik/statLOD', {                                                         // 247
	name: "statLOD",                                                                                           // 248
	action: function () {                                                                                      // 249
		function action(params, queryParams) {                                                                    // 249
			BlazeLayout.render('layoutAdmin', {                                                                      // 250
				bar: "bar",                                                                                             // 251
				nav: "nav",                                                                                             // 252
				navOverview: "navOverview",                                                                             // 253
				navStatistics: "navStatistics",                                                                         // 254
				main: "statLOD",                                                                                        // 255
				footer: "footer"                                                                                        // 256
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 259
});                                                                                                         //
                                                                                                            //
highRoutes.route('/verwaltung/feedback', {                                                                  // 264
	name: "feedback",                                                                                          // 265
	action: function () {                                                                                      // 266
		function action(params, queryParams) {                                                                    // 266
			BlazeLayout.render('layoutAdmin', {                                                                      // 267
				bar: "bar",                                                                                             // 268
				nav: "nav",                                                                                             // 269
				navOverview: "navOverview",                                                                             // 270
				main: "feedback",                                                                                       // 271
				footer: "footer"                                                                                        // 272
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 275
});                                                                                                         //
highRoutes.route('/fragebogen', {                                                                           // 277
	name: "fragebogen",                                                                                        // 278
	triggersEnter: [checkSurveySubmitted],                                                                     // 279
	action: function () {                                                                                      // 280
		function action(params, queryParams) {                                                                    // 280
			BlazeLayout.render('layout', {                                                                           // 281
				bar: "bar",                                                                                             // 282
				nav: "nav",                                                                                             // 283
				main: "fragebogen",                                                                                     // 284
				footer: "footer"                                                                                        // 285
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 288
});                                                                                                         //
                                                                                                            //
lowRoutes.route('/low', {                                                                                   // 291
	name: "low",                                                                                               // 292
	action: function () {                                                                                      // 293
		function action(params, queryParams) {                                                                    // 293
			BlazeLayout.render('layout', {                                                                           // 294
				bar: "bar",                                                                                             // 295
				main: "low"                                                                                             // 296
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}(),                                                                                                       //
	triggersEnter: []                                                                                          // 299
});                                                                                                         //
                                                                                                            //
FlowRouter.notFound = {                                                                                     // 302
	name: "notFound",                                                                                          // 303
	action: function () {                                                                                      // 304
		function action(params, queryParams) {                                                                    // 304
			BlazeLayout.render('layout', {                                                                           // 305
				main: "pageNotFound"                                                                                    // 306
			});                                                                                                      //
		}                                                                                                         //
                                                                                                            //
		return action;                                                                                            //
	}()                                                                                                        //
};                                                                                                          //
                                                                                                            //
//Routes                                                                                                    //
AccountsTemplates.configureRoute('changePwd');                                                              // 313
// AccountsTemplates.configureRoute('forgotPwd');                                                           //
AccountsTemplates.configureRoute('resetPwd');                                                               // 315
AccountsTemplates.configureRoute('signIn');                                                                 // 316
AccountsTemplates.configureRoute('signUp');                                                                 // 317
// AccountsTemplates.configureRoute('verifyEmail');                                                         //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./server/lib/config/email.js");
require("./common/aux/aux.js");
require("./common/aux/entry.js");
require("./common/aux/log.js");
require("./common/aux/nvd3_extra.js");
require("./common/aux/stat.js");
require("./common/aux/validation.js");
require("./common/collections/data.js");
require("./common/collections/fav.js");
require("./common/collections/messages.js");
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
