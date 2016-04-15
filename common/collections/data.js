People = new Mongo.Collection("people", {});

Data = {};
Data.Viewed = {};
Data.Viewed.User = new Mongo.Collection("dataViewedUser", {});
Data.Viewed.All = new Mongo.Collection("dataViewedAll", {});
Data.Fav = {};
Data.Fav.High = new Mongo.Collection("dataFavHigh", {});
Data.Fav.Low = new Mongo.Collection("dataFavLow", {});

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
