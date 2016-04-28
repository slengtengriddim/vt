Vocabulary = new Mongo.Collection('vocabulary', {});
TermDay = new Mongo.Collection('termDay', {});

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
		type: String,
		regEx: /^[a-zA-Z]*$/
	},
	preposition: {
		type: String,
		allowedValues: ['der', 'die', 'das'],
		optional: true
	},
	wordClass: {
		type: String,
		allowedValues: ['Nomen', 'Verb', 'Adjektiv']
	},
	definition: {
		type: [String]
	}
});

let TermDaySchema = new SimpleSchema({
	userId: {
		type: String
	},
	vocabularyId: {
		type: String
	},
	timestamp: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	}
});

Vocabulary.attachSchema(VocabularySchema);
TermDay.attachSchema(TermDaySchema);
