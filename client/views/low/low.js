Template.low.onCreated(() => {
	let template = Template.instance();

	template.autorun(() => {
		template.subscribe('vocabularyAll'); // Vocabulary.find()
		template.subscribe('ownedFavourites'); // Favourites.find()

		Session.set(LENGTH_FAV, Favourites.find().count());
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());
	});
});
