Template.pieBrowsePerVariant.rendered = function() {

	var data = () => {
		let sumFavTrainer = Data.Detail.find({
			route: "trainer",
			heartClicked: false
		}).count();
		let sumFavLow = Data.Detail.find({
			route: "low",
			heartClicked: false
		}).count();

		let data = [{
			key: "Trainer",
			y: sumFavTrainer
		}, {
			key: "Compact Mode",
			y: sumFavLow
		}];

		return data;
	};
	// chart object
	var chart = nv.models.pieChart()
		.x(function(d) {
			return d.key
		})
		.y(function(d) {
			return d.y
		})
		.showLabels(true) //Display pie labels
		.labelThreshold(.05) //Configure the minimum slice size for labels to show up
		.labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
		.donut(true) //Turn on Donut mode. Makes pie chart look tasty!
		.donutRatio(0.35) //Configure how big you want the donut hole size to be.
	;

	// chart details
	nv.addGraph(function() {
		d3.select('#pieBrowsePerVariant svg')
			.datum(data())
			.transition().duration(1200)
			.call(chart);

		// nv.utils.windowResize(chart.update);
		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#pieBrowsePerVariant svg')
			.datum(data())
			.transition().duration(1200)
			.call(chart);

		chart.update();
	});
}
