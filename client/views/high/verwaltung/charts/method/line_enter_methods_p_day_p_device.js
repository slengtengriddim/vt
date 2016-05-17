Template.lineEnterMethodsPerDayPerDevice.rendered = function() {

	let data = (route, mode, device) => {
		let result = [];
		let data = [];
		if (route === 'low') {
			data = Data.Detail.find({
				route: 'low',
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
		}
		if (route === 'trainer' && mode === 'eingabe') {
			data = Data.Detail.find({
				route: 'trainer',
				mode: 'eingabe',
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
		}
		if (route === 'trainer' && mode !== 'eingabe') {
			data = Data.Detail.find({
				route: 'trainer',
				deviceType: device,
				mode: {
					$nin: ['eingabe']
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
			key: "Method 'Enter' (desktop)",
			values: data('trainer', 'eingabe', 'desktop'),
			strokeWidth: 3
		}, {
			key: "Method - not 'Enter' (desktop)",
			values: data('trainer', null, 'desktop'),
			strokeWidth: 3
		}, {
			key: "CM (desktop)",
			values: data('low', null, 'desktop'),
			strokeWidth: 3
		}

	]
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
		d3.select('#lineEnterMethodsPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		nv.utils.windowResize(function() {
			chart.update();
		});
		return chart;
	});

	this.autorun(function() {
		d3.select('#lineEnterMethodsPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		chart.update();
	});
};
