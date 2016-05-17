Template.lineMethodPerAttentionPerDayPerDevice.rendered = function() {

	let data = (route, mode, device) => {
		let result = [];
		let data = Data.Detail.find({
			route: route,
			mode: mode,
			deviceType: device
		}, {
			fields: {
				'timestamp': 1
			}
		}, {
			sort: {
				timestamp: 1
			}
		}).fetch();

		let xValues = Data.Detail.find({}, {
			fields: {
				'timestamp': 1
			}
		}, {
			sort: {
				timestamp: 1
			}
		}).fetch();

		return Stat.normalizeByDate(data, xValues);
	};

	let streams = () => {
		return [{
			key: "Trainer - read (desktop)",
			values: data('trainer', 'lesen', 'desktop')
		}, {
			key: "Trainer - word (desktop)",
			values: data('trainer', 'wort', 'desktop')
		}, {
			key: "Trainer - definition (desktop)",
			values: data('trainer', 'definition', 'desktop')
		},{
			key: "CM - read (desktop)",
			values: data('low', 'lesen', 'desktop')
		}, {
			key: "CM - word (desktop)",
			values: data('low', 'wort', 'desktop')
		}, {
			key: "CM - definition (desktop)",
			values: data('low', 'definition', 'desktop')
		},
		{
			key: "Trainer - read (tablet)",
			values: data('trainer', 'lesen', 'tablet')
		}, {
			key: "Trainer - word (tablet)",
			values: data('trainer', 'wort', 'tablet')
		}, {
			key: "Trainer - definition (tablet)",
			values: data('trainer', 'definition', 'tablet')
		},{
			key: "CM - read (tablet)",
			values: data('low', 'lesen', 'tablet')
		}, {
			key: "CM - word (tablet)",
			values: data('low', 'wort', 'tablet')
		}, {
			key: "CM - definition (tablet)",
			values: data('low', 'definition', 'tablet')
		},
		{
			key: "Trainer - read (phone)",
			values: data('trainer', 'lesen', 'phone')
		}, {
			key: "Trainer - word (phone)",
			values: data('trainer', 'wort', 'phone')
		}, {
			key: "Trainer - definition (phone)",
			values: data('trainer', 'definition', 'phone')
		},{
			key: "CM - read (phone)",
			values: data('low', 'lesen', 'phone')
		}, {
			key: "CM - word (phone)",
			values: data('low', 'wort', 'phone')
		}, {
			key: "CM - definition (phone)",
			values: data('low', 'definition', 'phone')
		}]
	};

	var chart = nv.models.lineChart()
		.margin({
			"right": 48,
			"left": 96
		})
		.useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!
		.duration(350) //how fast do you want the lines to transition?
		.showLegend(true) //Show the legend, allowing users to turn on/off line series.
		.showYAxis(true) //Show the y-axis
		.showXAxis(true) //Show the x-axis
	;

	nv.addGraph(function() {

		// chart.xAxis.axisLabel('Day').tickFormat(d3.format('d'));
		chart.xAxis
			.staggerLabels(true)
			.tickFormat(function(d) {
				return d3.time.format('%e. %b')(new Date(d))
			});
		chart.yAxis.axisLabel('Clicks').tickFormat(d3.format('d'));
		d3.select('#lineMethodPerAttentionPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		nv.utils.windowResize(function() {
			chart.update();
		});
		return chart;
	});

	this.autorun(function() {
		d3.select('#lineMethodPerAttentionPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		chart.update();
	});
};
