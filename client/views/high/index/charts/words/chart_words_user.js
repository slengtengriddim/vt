Template.chartWordsAll.onCreated(() => {
    let template = Template.instance();
	template.subscribe('dataViewedUser');
});

Template.chartWordsUser.rendered = function() {

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
		let userId = Meteor.userId();
		let data = Data.Viewed.User.find({userId: userId}, {
			sort: {
				timesViewed: -1
			}
		}).fetch();


		let barChart = [{
			key: "Top 5 beliebte Woerter (Benutzer)",
			values: data
		}];


		d3.select('#chartWordsUser svg')
			.datum(barChart)
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		let userId = Meteor.userId();
		let data = Data.Viewed.User.find({userId: userId}, {
			sort: {
				timesViewed: -1
			}
		}).fetch();


		let barChart = [{
			key: "Top 5 beliebte Woerter (Benutzer)",
			values: data
		}];

		d3.select('#chartWordsUser svg')
			.datum(barChart)
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
