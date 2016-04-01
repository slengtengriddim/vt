Vocabulary = new Mongo.Collection('vocabulary', {});

if (Meteor.isServer) {
	Vocabulary._ensureIndex({
		term: 1,
		description: 1
	});
}

Vocabulary.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Vocabulary.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let VocabularySchema = new SimpleSchema({
	term: {
		type: String
	},
	description: {
		type: String
	}
});

Vocabulary.attachSchema(VocabularySchema);
