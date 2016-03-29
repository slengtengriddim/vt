VocabularySchema = new SimpleSchema({
	name: {
		type: String,
		regEx: /^[a-zA-Z]+$/
	},
	description: {
		type: String,
		regEx: /[a-zA-Z ]+/
	}
});

Vocabulary = new Mongo.Collection('vocabulary', {});
Vocabulary.attachSchema(VocabularySchema);
