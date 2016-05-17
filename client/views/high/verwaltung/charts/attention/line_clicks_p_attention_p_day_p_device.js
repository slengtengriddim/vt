Template.lineClicksPerAttentionPerDayPerDevice.rendered = function() {

	let data = (device, attentionLow) => {
		let result = [];
		let data = [];
		if (attentionLow) {
			data = Data.Detail.find({
				deviceType: device,
				route: "low"
			}, {
				fields: {
					'deviceType': 1,
					'timestamp': 1
				}
			}, {
				sort: {
					timestamp: 1
				}
			}).fetch();
		} else {
			data = Data.Detail.find({
				deviceType: device,
				route: {
					$nin: ["low"]
				}
			}, {
				fields: {
					'timestamp': 1
				}
			}, {
				sort: {
					timestamp: 1
				}
			}).fetch();
		}

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
			key: "CM on (phone)",
			values: data("phone", true),
			strokeWidth: 3
		}, {
			key: "CM on (desktop)",
			values: data("desktop", true),
			strokeWidth: 3
		}, {
			key: "CM on (tablet)",
			values: data("tablet", true),
			strokeWidth: 3
		}, {
			key: "CM off (phone)",
			values: data("phone", false),
			strokeWidth: 3
		}, {
			key: "CM off (desktop)",
			values: data("desktop", false),
			strokeWidth: 3
		}, {
			key: "CM off (tablet)",
			values: data("tablet", false),
			strokeWidth: 3
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
		d3.select('#lineClicksPerAttentionPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		nv.utils.windowResize(function() {
			chart.update();
		});
		return chart;
	});

	this.autorun(function() {
		d3.select('#lineClicksPerAttentionPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		chart.update();
	});
};
