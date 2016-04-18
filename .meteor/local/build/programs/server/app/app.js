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
	}(),                                                                               //
	dataDetail: function () {                                                          // 83
		function dataDetail(deviceType, devicePlatform, clickArea, mode, attention) {     //
			Data.Detail.insert({                                                             // 84
				deviceType: deviceType,                                                         // 85
				devicePlatform: devicePlatform,                                                 // 86
				clickArea: clickArea,                                                           // 87
				mode: mode,                                                                     // 88
				attention: attention                                                            // 89
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return dataDetail;                                                                //
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
	var data = Data.Fav.High.find({});                                                 // 77
	if (data) {                                                                        // 78
		return data;                                                                      // 79
	}                                                                                  //
	return this.ready();                                                               // 81
});                                                                                 //
Meteor.publish('dataFavLow', function () {                                          // 83
	var data = Data.Fav.Low.find({});                                                  // 84
	if (data) {                                                                        // 85
		return data;                                                                      // 86
	}                                                                                  //
	return this.ready();                                                               // 88
});                                                                                 //
Meteor.publish('dataDetail', function () {                                          // 90
	var data = Data.Detail.find({});                                                   // 91
	if (data) {                                                                        // 92
		return data;                                                                      // 93
	}                                                                                  //
	return this.ready();                                                               // 95
});                                                                                 //
                                                                                    //
// Meteor.publish("booksByAuthor", function () {                                    //
//   ReactiveAggregate(this, Books, [{                                              //
//     $mode: "wort"                                                                //
//   }]);                                                                           //
// });                                                                              //
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
Data.Detail = new Mongo.Collection('dataDetail', {});                               // 5
Data.Viewed.User = new Mongo.Collection("dataViewedUser", {});                      // 6
Data.Viewed.All = new Mongo.Collection("dataViewedAll", {});                        // 7
Data.Fav = {};                                                                      // 8
Data.Fav.High = new Mongo.Collection("dataFavHigh", {});                            // 9
Data.Fav.Low = new Mongo.Collection("dataFavLow", {});                              // 10
                                                                                    //
Data.Detail.Schema = new SimpleSchema({                                             // 12
	userId: {                                                                          // 13
		type: String,                                                                     // 14
		autoValue: function () {                                                          // 15
			function autoValue() {                                                           // 15
				return this.userId;                                                             // 16
			}                                                                                //
                                                                                    //
			return autoValue;                                                                //
		}()                                                                               //
	},                                                                                 //
	timestamp: {                                                                       // 19
		type: Date,                                                                       // 20
		autoValue: function () {                                                          // 21
			function autoValue() {                                                           // 21
				return new Date();                                                              // 22
			}                                                                                //
                                                                                    //
			return autoValue;                                                                //
		}()                                                                               //
	},                                                                                 //
	deviceType: {                                                                      // 25
		type: String                                                                      // 26
	},                                                                                 //
	devicePlatform: {                                                                  // 28
		type: String                                                                      // 29
	},                                                                                 //
	clickArea: {                                                                       // 31
		type: String,                                                                     // 32
		allowedValues: ['favDel', 'browse', 'source', 'reveal', 'bar', 'mode']            // 33
	},                                                                                 //
	mode: {                                                                            // 35
		type: String,                                                                     // 36
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']                 // 37
	},                                                                                 //
	attention: {                                                                       // 39
		type: Boolean                                                                     // 40
	}                                                                                  //
});                                                                                 //
                                                                                    //
Data.Detail.attachSchema(Data.Detail.Schema);                                       // 44
                                                                                    //
Data.Viewed.All.Schema = new SimpleSchema({                                         // 47
	vocabularyId: {                                                                    // 48
		type: String                                                                      // 49
	},                                                                                 //
	vocabularyName: {                                                                  // 51
		type: String                                                                      // 52
	},                                                                                 //
	timesViewed: {                                                                     // 54
		type: Number                                                                      // 55
	},                                                                                 //
	createdAt: {                                                                       // 57
		type: Date,                                                                       // 58
		autoValue: function () {                                                          // 59
			function autoValue() {                                                           // 59
				return new Date();                                                              // 60
			}                                                                                //
                                                                                    //
			return autoValue;                                                                //
		}()                                                                               //
	}                                                                                  //
});                                                                                 //
                                                                                    //
Data.Viewed.User.Schema = new SimpleSchema([{                                       // 65
	userId: {                                                                          // 67
		type: String,                                                                     // 68
		autoValue: function () {                                                          // 69
			function autoValue() {                                                           // 69
				return this.userId;                                                             // 70
			}                                                                                //
                                                                                    //
			return autoValue;                                                                //
		}()                                                                               //
	}                                                                                  //
}, Data.Viewed.All.Schema]);                                                        //
                                                                                    //
Data.Viewed.User.attachSchema(Data.Viewed.User.Schema);                             // 77
Data.Viewed.All.attachSchema(Data.Viewed.All.Schema);                               // 78
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

},"admin.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/config/admin.js                                                           //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
AdminConfig = {                                                                     // 1
	name: 'Chalimo',                                                                   // 2
	adminEmails: ['bla@bla.org'],                                                      // 3
	collections: {                                                                     // 4
		Vocabulary: {}                                                                    // 6
	}                                                                                  //
};                                                                                  //
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

}},"routes.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// common/routes.js                                                                 //
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
resetSession = function resetSession() {                                            // 15
	Session.set(REVEALED, false);                                                      // 16
	Session.set(TERM_WRONG, false);                                                    // 17
};                                                                                  //
                                                                                    //
checkAdmin = function checkAdmin() {                                                // 20
	if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {                               // 21
		FlowRouter.go("notFound");                                                        // 22
	}                                                                                  //
};                                                                                  //
                                                                                    //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                      // 26
                                                                                    //
// *** ROUTE GROUPS                                                                 //
                                                                                    //
var lowRoutes = FlowRouter.group({                                                  // 30
	name: "low",                                                                       // 31
	triggersEnter: [checkAttentionModeOn],                                             // 32
	triggersExit: []                                                                   // 33
});                                                                                 //
var highRoutes = FlowRouter.group({                                                 // 35
	name: "high",                                                                      // 36
	triggersEnter: [checkAttentionModeOff],                                            // 37
	triggersExit: []                                                                   // 38
});                                                                                 //
                                                                                    //
// *** ROUTES                                                                       //
                                                                                    //
highRoutes.route('/', {                                                             // 45
	name: "index",                                                                     // 46
	action: function () {                                                              // 47
		function action(params, queryParams) {                                            // 47
			BlazeLayout.render('layout', {                                                   // 48
				bar: "bar",                                                                     // 49
				nav: "nav",                                                                     // 50
				main: "index"                                                                   // 51
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
highRoutes.route('/eingabe', {                                                      // 55
	name: "eingabe",                                                                   // 56
	action: function () {                                                              // 57
		function action(params, queryParams) {                                            // 57
			BlazeLayout.render('layout', {                                                   // 58
				bar: "bar",                                                                     // 59
				nav: "nav",                                                                     // 60
				main: "eingabe",                                                                // 61
				navSource: "navSource"                                                          // 62
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
highRoutes.route('/register/:id', {                                                 // 67
	name: "vokabelDetail",                                                             // 68
	action: function () {                                                              // 69
		function action(params, queryParams) {                                            // 69
			BlazeLayout.render('layout', {                                                   // 70
				bar: "bar",                                                                     // 71
				nav: "nav",                                                                     // 72
				main: "vokabelDetail"                                                           // 73
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
highRoutes.route('/register', {                                                     // 77
	name: "register",                                                                  // 78
	action: function () {                                                              // 79
		function action(params, queryParams) {                                            // 79
			BlazeLayout.render('layout', {                                                   // 80
				bar: "bar",                                                                     // 81
				nav: "nav",                                                                     // 82
				main: "register"                                                                // 83
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
});                                                                                 //
                                                                                    //
lowRoutes.route('/low', {                                                           // 88
	name: "low",                                                                       // 89
	action: function () {                                                              // 90
		function action(params, queryParams) {                                            // 90
			BlazeLayout.render('layout', {                                                   // 91
				bar: "bar",                                                                     // 92
				nav: "navMode",                                                                 // 93
				main: "low",                                                                    // 94
				navSource: "navSource"                                                          // 95
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}(),                                                                               //
	triggersEnter: []                                                                  // 98
});                                                                                 //
                                                                                    //
highRoutes.route('/stats', {                                                        // 101
	name: "stats",                                                                     // 102
	action: function () {                                                              // 103
		function action(params, queryParams) {                                            // 103
			BlazeLayout.render('layout', {                                                   // 104
				bar: "bar",                                                                     // 105
				nav: "nav",                                                                     // 106
				main: "stats"                                                                   // 107
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}(),                                                                               //
	triggersEnter: [checkAdmin]                                                        // 110
});                                                                                 //
                                                                                    //
FlowRouter.notFound = {                                                             // 113
	name: "notFound",                                                                  // 114
	action: function () {                                                              // 115
		function action(params, queryParams) {                                            // 115
			BlazeLayout.render('layout', {                                                   // 116
				footer: "footer",                                                               // 117
				main: "pageNotFound"                                                            // 118
			});                                                                              //
		}                                                                                 //
                                                                                    //
		return action;                                                                    //
	}()                                                                                //
};                                                                                  //
                                                                                    //
//Routes                                                                            //
AccountsTemplates.configureRoute('changePwd');                                      // 125
// AccountsTemplates.configureRoute('forgotPwd');                                   //
AccountsTemplates.configureRoute('resetPwd');                                       // 127
AccountsTemplates.configureRoute('signIn');                                         // 128
AccountsTemplates.configureRoute('signUp');                                         // 129
// AccountsTemplates.configureRoute('verifyEmail');                                 //
//////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json"]});
require("./server/lib/config/accounts.js");
require("./server/lib/config/email.js");
require("./common/aux/aux.js");
require("./common/aux/nvd3_extra.js");
require("./common/aux/validation.js");
require("./common/collections/data.js");
require("./common/collections/favourites.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/admin.js");
require("./common/config/at_config.js");
require("./common/routes.js");
require("./server/methods.js");
require("./server/publication.js");
require("./server/vocabularySeed.js");
//# sourceMappingURL=app.js.map
