Template.chartWordsAll.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataWords');
});

Template.chartWordsAll.rendered = function() {

	let barChart = () => {
		let result = [];
		let data = Data.Words.find({}).fetch();

		let byVocabularyId = R.groupBy(function(entry) {
			return entry.vocabularyId;
		});

		let groupedByVocabularyId = byVocabularyId(data);
		for (let k in groupedByVocabularyId) {
			if (groupedByVocabularyId.hasOwnProperty(k)) {
				result.push({
					x: groupedByVocabularyId[k][0].vocabularyName,
					y: R.sum(R.pluck('viewed')(groupedByVocabularyId[k]))
				});
			}
		};
		let sortByViewed = R.sortBy(R.prop('y'));
		result = R.take(5, R.reverse(sortByViewed(result)));


		let barChart = [{
			key: "Top 5 beliebte Woerter (allgemein)",
			values: result
		}];

		return barChart;
	};

	// chart object
	let chart = nv.models.discreteBarChart()
		.x(function(d) {
			return d.x
		})
		.y(function(d) {
			return d.y
		})
		.staggerLabels(true)
		//.staggerLabels(historicalBarChart[0].values.length > 8)
		.showValues(false)
		.showYAxis(false)
		// .tooltips(false)
		.duration(250);

	// chart details
	nv.addGraph(function() {
		d3.select('#chartWordsAll svg')
			.datum(barChart())
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#chartWordsAll svg')
			.datum(barChart())
			.call(chart);

		chart.update();
	});

};
