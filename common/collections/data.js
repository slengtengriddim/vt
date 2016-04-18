People = new Mongo.Collection("people", {});

Data = {};
Data.Viewed = {};
Data.Detail = new Mongo.Collection('dataDetail', {});
Data.Viewed.User = new Mongo.Collection("dataViewedUser", {});
Data.Viewed.All = new Mongo.Collection("dataViewedAll", {});
Data.Fav = {};
Data.Fav.High = new Mongo.Collection("dataFavHigh", {});
Data.Fav.Low = new Mongo.Collection("dataFavLow", {});

Data.Detail.Schema = new SimpleSchema({
	userId: {
		type: String,
		autoValue: function() {
			return this.userId;
		}
	},
	timestamp: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	},
	deviceType: {
		type: String
	},
	devicePlatform: {
		type: String
	},
	clickArea: {
		type: String,
		allowedValues: ['favDel', 'browse', 'source', 'reveal', 'bar', 'mode']
	},
	mode: {
		type: String,
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']
	},
	attention: {
		type: Boolean
	}
});

Data.Detail.attachSchema(Data.Detail.Schema);


Data.Viewed.All.Schema = new SimpleSchema({
	vocabularyId: {
		type: String
	},
	vocabularyName: {
		type: String
	},
	timesViewed: {
		type: Number
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	}
});

Data.Viewed.User.Schema = new SimpleSchema([
	{
		userId: {
			type: String,
			autoValue: function() {
				return this.userId;
			}
		},
	},
	Data.Viewed.All.Schema
])

Data.Viewed.User.attachSchema(Data.Viewed.User.Schema);
Data.Viewed.All.attachSchema(Data.Viewed.All.Schema);

// CHART MODE
// timestamp (day),
// mode,
// countClick,
// device --->>> $sum to get all devices

// CHART LOW HIGH
// URL
// timestamp enter
// timestamp exit
// device


// --->>> insert @ logout and routeEnter/ routeExit
