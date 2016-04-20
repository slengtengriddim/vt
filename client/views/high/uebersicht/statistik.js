Template.statistik.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataDetail');
	template.subscribe('dataWords');
});

Template.statistik.events({
	'click .btn-test' (event, template) {
		let result = [];
		let data = Data.Words.find().fetch();

		let byVocabularyId = R.groupBy(function(entry) {
			return entry.vocabularyId;
		});
		// let byMode = R.groupBy(function(entry) {
		// 	return entry.mode;
		// });
		// let byAttention = R.groupBy(function(entry) {
		// 	return entry.attention;
		// });
		// let byDate = R.groupBy(function(entry) {
		// 	let day = entry.timestamp;
		// 	// day.setHours(0);
		// 	// day.setMinutes(0);
		// 	day.setSeconds(0);
		// 	day.setMilliseconds(0);
		// 	if (entry.timestamp.getMinutes()) {
		// 		return day;
		// 	}
		// });

		let groupedByVocabularyId = byVocabularyId(data);
		for (let k in groupedByVocabularyId) {
			if (groupedByVocabularyId.hasOwnProperty(k)) {
				result.push({
					x: groupedByVocabularyId[k][0].vocabularyName,
					y: R.sum(R.pluck('viewed')(groupedByVocabularyId[k]))
				});
			}
		};
		result.forEach(entry => {
			console.log(R.prop('y', entry));
		})
		console.log(result);

	}
})
