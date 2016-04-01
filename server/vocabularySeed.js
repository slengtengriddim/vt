Meteor.startup(function() {

	if (Vocabulary.find().count() === 0) {
		for (let i = 0; i < 300; i++) {
			Vocabulary.insert({
				term: Fake.word(),
				description: Fake.sentence([32])
			});
		}
	};
});
