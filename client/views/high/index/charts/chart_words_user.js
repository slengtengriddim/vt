Template.chartWordsAll.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataWords');
});

Template.chartWordsUser.rendered = function() {

	let barChart = () => {
		let data = Data.Words.find({
			userId: Meteor.userId()
		}, {
			limit: 5,
			sort: {
				viewed: -1
			}
		}).fetch();
		let barChart = [{
			key: "Top 5 beliebte Woerter (Benutzer)",
			values: data
		}];

		return barChart;
	};

	// chart object
	let chart = nv.models.discreteBarChart()
		.x(function(d) {
			return d.vocabularyName
		})
		.y(function(d) {
			return d.viewed
		})
		.staggerLabels(true)
		//.staggerLabels(historicalBarChart[0].values.length > 8)
		.showValues(false)
		.showYAxis(false)
		.duration(250);

	// chart details
	nv.addGraph(function() {

		d3.select('#chartWordsUser svg')
			.datum(barChart())
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});

	// update chart when data changes
	this.autorun(function() {

		d3.select('#chartWordsUser svg')
			.datum(barChart())
			.call(chart);

		chart.update();
	});
};
