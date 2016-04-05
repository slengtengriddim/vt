let ViewedSchema = new SimpleSchema({
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
  },
	timesViewed: {
		type: Number,
		defaultValue: 0
	}
	// link to page the word was looked up from 
});

Viewed = new Mongo.Collection('viewed', {});
Viewed.attachSchema(ViewedSchema);
