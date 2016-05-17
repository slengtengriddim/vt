Template.lineLODPerDayPerDevice.rendered = function() {

	let data = (route, settingsTrainer, device) => {
		let result = [];
		let data = [];
		if (route === 'low') {
			data = Data.Detail.find({
					route: route,
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
		} else {
			data = Data.Detail.find({
					route: route,
					settingsTrainer: settingsTrainer,
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
		};

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
		return 	[{
				key: "Trainer open (Desktop)",
				values: data('trainer', true, 'desktop'),
				strokeWidth: 3
			}, {
				key: "Trainer open (Tablet)",
				values: data('trainer', true, 'tablet'),
				strokeWidth: 3
			}, {
				key: "Trainer open (Phone)",
				values: data('trainer', true, 'phone'),
				strokeWidth: 3
			},{
				key: "Trainer closed (Desktop)",
				values: data('trainer', false, 'desktop'),
				strokeWidth: 3
			}, {
				key: "Trainer closed (Tablet)",
				values: data('trainer', false, 'tablet'),
				strokeWidth: 3
			}, {
				key: "Trainer closed (Phone)",
				values: data('trainer', false, 'phone'),
				strokeWidth: 3
			},{
				key: "Compact mode (Desktop)",
				values: data('low', false, 'desktop'),
				strokeWidth: 3
			}, {
				key: "Compact mode (Tablet)",
				values: data('low', false, 'tablet'),
				strokeWidth: 3
			}, {
				key: "Compact mode (Phone)",
				values: data('low', false, 'phone'),
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
		d3.select('#lineLODPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		nv.utils.windowResize(function() {
			chart.update();
		});
		return chart;
	});

	this.autorun(function() {
		d3.select('#lineLODPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		chart.update();
	});
};
