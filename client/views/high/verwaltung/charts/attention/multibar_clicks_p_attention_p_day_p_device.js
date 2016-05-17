Template.multiBarClicksPerAttentionPerDayPerDevice.rendered = function() {

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
			values: data("phone", true)
		}, {
			key: "CM on (desktop)",
			values: data("desktop", true)
		}, {
			key: "CM on (tablet)",
			values: data("tablet", true)
		}, {
			key: "CM off (phone)",
			values: data("phone", false)
		}, {
			key: "CM off (desktop)",
			values: data("desktop", false)
		}, {
			key: "CM off (tablet)",
			values: data("tablet", false)
		}]
	};

	// chart object
	let chart = nv.models.multiBarChart()
		.staggerLabels(true)
		.wrapLabels(false)
		// .showValues(true)
		.duration(250)
		.reduceXTicks(true) //If 'false', every single x-axis tick label will be rendered.
		.rotateLabels(-45) //Angle to rotate x-axis labels.
		.showControls(true) //Allow user to switch between 'Grouped' and 'Stacked' mode.
		.groupSpacing(0.1) //Distance between each group of bars.
		.margin({
			"bottom": 128,
			"left": 96
		});

	chart.xAxis
		.tickFormat(function(d) {
			return d3.time.format('%e. %b')(new Date(d))
		});
	chart.yAxis
		.tickFormat(d3.format('d'))
		.axisLabel('Clicks');
	// chart details
	nv.addGraph(function() {
		d3.select('#multiBarClicksPerAttentionPerDayPerDevice svg')
			.datum(streams())
			.call(chart);
		nv.utils.windowResize(chart.update);
		return chart;
	});


	// update chart when data changes
	this.autorun(function() {
		d3.select('#multiBarClicksPerAttentionPerDayPerDevice svg')
			.datum(streams())
			.call(chart);
		chart.update();
	});

}
