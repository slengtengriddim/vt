Template.chartPieAttention.rendered = function() {

	var data = () => {
		let sumLow = Data.Detail.find({attention: true}).count();
		let sumHigh = Data.Detail.find({attention: false}).count();

		let data = [{
			key: "High",
			y: sumHigh
		}, {
			key: "Low",
			y: sumLow
		}];

		return data;
	};

	// chart object
	var height = 350;
	var width = 350;
	var chart = nv.models.pieChart()
		.x(function(d) {
			return d.key
		})
		.y(function(d) {
			return d.y
		})
		.width(width)
		.height(height);

	// chart details
	nv.addGraph(function() {

		d3.select('#chartPieAttention svg')
			.datum(data())
			.transition().duration(1200)
			.attr('width', width)
			.attr('height', height)
			.call(chart);

		// nv.utils.windowResize(chart.update);
		return chart;
	});

	// update chart when data changes
	this.autorun(function() {

		d3.select('#chartPieAttention svg')
			.datum(data())
			.transition().duration(1200)
			.attr('width', width)
			.attr('height', height)
			.call(chart);

		chart.update();
	});
}
