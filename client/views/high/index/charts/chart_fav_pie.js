Template.chartFavPie.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataFavHigh');
	template.subscribe('dataFavLow');
});


// let sumLow = R.sum(R.pluck('y')(Data.Fav.Low.find({}).fetch()));
// let sumHigh = R.sum(R.pluck('y')(Data.Fav.High.find({}).fetch()));
// let data = [{
// 	key: "High",
// 	y: sumHigh
// }, {
// 	key: "Low",
// 	y: sumLow
// }];




Template.chartFavPie.rendered = function() {

	var height = 250;
var width = 250;
		// chart object
		var chart = nv.models.pieChart()
		.x(function(d) { return d.key })
		.y(function(d) { return d.y })
		.width(width)
		.height(height);

		// chart details
		nv.addGraph(function() {
			let sumLow = R.sum(R.pluck('y')(Data.Fav.Low.find({}).fetch()));
			let sumHigh = R.sum(R.pluck('y')(Data.Fav.High.find({}).fetch()));
			let data = [{
				key: "High",
				y: sumHigh
			}, {
				key: "Low",
				y: sumLow
			}];

			d3.select('#chartFavPie svg')
			    .datum(data)
					.transition().duration(1200)
					.attr('width', width)
					.attr('height', height)
					.call(chart);

			// nv.utils.windowResize(chart.update);

			return chart;
		});

		// update chart when data changes
		this.autorun(function() {
			let sumLow = R.sum(R.pluck('y')(Data.Fav.Low.find({}).fetch()));
			let sumHigh = R.sum(R.pluck('y')(Data.Fav.High.find({}).fetch()));
			let data = [{
				key: "High",
				y: sumHigh
			}, {
				key: "Low",
				y: sumLow
			}];

			d3.select('#chartFavPie svg')
			    .datum(data)
					.transition().duration(1200)
					.attr('width', width)
					.attr('height', height)
					.call(chart);

			chart.update();
		});
}
