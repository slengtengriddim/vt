Template.chartWordsAll.onCreated(() => {
    let template = Template.instance();
			template.subscribe('dataViewedAll');
});

Template.chartWordsAll.rendered = function() {

	let barChart = () => {
		let data = Data.Viewed.All.find({}, {
			sort: {
				timesViewed: -1
			}
		}).fetch();
		let barChart = [{
			key: "Top 5 beliebte Woerter (allgemein)",
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
			return d.timesViewed
		})
		.staggerLabels(true)
		//.staggerLabels(historicalBarChart[0].values.length > 8)
		.showValues(true)
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
		// let data = Data.Viewed.All.find({}, {
		// 	sort: {
		// 		timesViewed: -1
		// 	}
		// }).fetch();
		// let barChart = [{
		// 	key: "Top 5 beliebte Woerter",
		// 	values: data
		// }];

		d3.select('#chartWordsAll svg')
			.datum(barChart())
			.call(chart);

		chart.update();
	});

};


// data = Data.Viewed.find({}, {
//     limit: 5,
//     sort: {
//         timesViewed: -1
//     }
// });
