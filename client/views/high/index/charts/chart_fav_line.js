Template.chartFavLine.onCreated(() => {
	let template = Template.instance();
	template.subscribe('dataFavHigh');
	template.subscribe('dataFavLow');
});

Template.chartFavLine.rendered = function() {
		// chart object
		let chart = nv.models.lineChart()
			.margin({
				left: 100
			}) //Adjust chart margins to give the x-axis some breathing room.
			.useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!
			.duration(350) //how fast do you want the lines to transition?
			.showLegend(true) //Show the legend, allowing users to turn on/off line series.
			.showYAxis(true) //Show the y-axis
			.showXAxis(true) //Show the x-axis
		;

		// chart details
		nv.addGraph(function() {
			let dataLow = Data.Fav.Low.find({}, {
				sort: {
					timesViewed: 1
				}
			}).fetch();
			let dataHigh = Data.Fav.High.find({}, {
				sort: {
					timesViewed: 1
				}
			}).fetch();

			chart.xAxis.axisLabel('Tag').tickFormat(d3.format('d'));
			chart.yAxis.axisLabel('Clicks').tickFormat(d3.format('d'));

			d3.select('#chartFavLine svg')
				.datum(
					[{
						values: dataLow,
						key: 'Low',
						color: "#2ca02c"
					},
					{
						values: dataHigh,
						key: 'High',
						color: "#ff7f0e"
					}]
				)
				.call(chart)
				;

			nv.utils.windowResize(chart.update);

			return chart;
		});

		// update chart when data changes
		this.autorun(function() {
			let dataLow = Data.Fav.Low.find({}, {
				sort: {
					timesViewed: 1
				}
			}).fetch();
			let dataHigh = Data.Fav.High.find({}, {
				sort: {
					timesViewed: 1
				}
			}).fetch();

			d3.select('#chartFavLine svg').datum(
				[{
					values: dataLow,
					key: 'Low',
					color: "#2ca02c"
				},
				{
					values: dataHigh,
					key: 'High',
					color: "#ff7f0e"
				}]
			).call(chart);
			chart.update();
		});
}
