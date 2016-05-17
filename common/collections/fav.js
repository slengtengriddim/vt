let FavouritesSchema = new SimpleSchema({
	userId: {
		type: String,
		autoValue: function() {
			return this.userId;
		}
	},
	vocabularyId: {
		type: String
	},
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});


Favourites = new Mongo.Collection('favourites', {});
Favourites.attachSchema(FavouritesSchema);
