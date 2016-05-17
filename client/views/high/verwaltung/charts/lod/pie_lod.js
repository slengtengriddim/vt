Template.pieLOD.rendered = function() {

	var data = () => {
		let sumTrainerOpen = Data.Detail.find({
			route: "trainer",
			settingsTrainer: true
		}).count();
		let sumTrainerClosed = Data.Detail.find({
			route: "trainer",
			settingsTrainer: false
		}).count();
		let sumCM = Data.Detail.find({
			route: "low"
		}).count();

		let data = [{
			key: "Trainer Settings open",
			y: sumTrainerOpen
		}, {
			key: "Trainer Settings closed",
			y: sumTrainerClosed
		}, {
			key: "Compact Mode",
			y: sumCM
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
		d3.select('#pieLOD svg')
			.datum(data())
			.transition().duration(1200)
			.call(chart);

		// nv.utils.windowResize(chart.update);
		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#pieLOD svg')
			.datum(data())
			.transition().duration(1200)
			.call(chart);

		chart.update();
	});
}
