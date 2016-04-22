Template.wordsAll.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataWords');
});

Template.wordsAll.helpers({
	top5() {
		let result = [];
		let data = Data.Words.find({}).fetch();
		let byVocabularyId = R.groupBy(function(entry) {
			return entry.vocabularyId;
		});

		let groupedByVocabularyId = byVocabularyId(data);
		for (let k in groupedByVocabularyId) {
			if (groupedByVocabularyId.hasOwnProperty(k)) {
				result.push({
					term: groupedByVocabularyId[k][0].vocabularyName,
					count: R.sum(R.pluck('viewed')(groupedByVocabularyId[k]))
				});
			}
		};
		let sortByViewed = R.sortBy(R.prop('count'));
		result = R.take(5, R.reverse(sortByViewed(result)));
		return result;
	}
});
