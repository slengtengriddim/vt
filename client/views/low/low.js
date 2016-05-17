Template.low.onCreated(() => {
	let template = Template.instance();

	template.autorun(() => {
		template.subscribe('vocabularyAll'); // Vocabulary.find()
		template.subscribe('ownedFavourites'); // Favourites.find()

	});
});
