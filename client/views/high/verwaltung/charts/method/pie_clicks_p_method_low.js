Template.pieClicksPerMethodLow.rendered = function() {

	var data = () => {
		let sumRead = Data.Detail.find({
			route: 'low',
			mode: 'lesen'
		}).count();
		let sumWord = Data.Detail.find({
			route: 'low',
			mode: 'wort'
		}).count();
		let sumDefinition = Data.Detail.find({
			route: 'low',
			mode: 'definition'
		}).count();

		let data = [{
			key: "Read",
			y: sumRead
		}, {
			key: "Word",
			y: sumWord
		}, {
			key: "Definition",
			y: sumDefinition
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
		// .width(width)
		// .height(height)
		.showLabels(true) //Display pie labels
		.labelThreshold(.05) //Configure the minimum slice size for labels to show up
		.labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
		.donut(true) //Turn on Donut mode. Makes pie chart look tasty!
		.donutRatio(0.35) //Configure how big you want the donut hole size to be.
	;

	// chart details
	nv.addGraph(function() {
		d3.select('#pieClicksPerMethodLow svg')
			.datum(data())
			.transition().duration(1200)
			.call(chart);
		// nv.utils.windowResize(chart.update);
		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#pieClicksPerMethodLow svg')
			.datum(data())
			.transition().duration(1200)
			.call(chart);

		chart.update();
	});
}
