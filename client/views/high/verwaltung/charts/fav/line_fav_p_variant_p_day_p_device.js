Template.lineFavPerVariantPerDayPerDevice.rendered = function() {

	let data = (route, heartClicked, device) => {
		let result = [];
		let data = Data.Detail.find({
			route: route,
			heartClicked: heartClicked,
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
			key: "Trainer (Desktop)",
			values: data('trainer', true, 'desktop'),
			strokeWidth: 3
		}, {
			key: "CM (Desktop)",
			values: data('low', true, 'desktop'),
			strokeWidth: 3
		}, {
			key: "Register (Desktop)",
			values: data('register', true, 'desktop'),
			strokeWidth: 3
		},{
			key: "Trainer (Tablet)",
			values: data('trainer', true, 'tablet'),
			strokeWidth: 3
		}, {
			key: "CM (Tablet)",
			values: data('low', true, 'tablet'),
			strokeWidth: 3
		}, {
			key: "Register (Tablet)",
			values: data('register', true, 'tablet'),
			strokeWidth: 3
		},{
			key: "Trainer (Phone)",
			values: data('trainer', true, 'phone'),
			strokeWidth: 3
		}, {
			key: "CM (Phone)",
			values: data('low', true, 'phone'),
			strokeWidth: 3
		}, {
			key: "Register (Phone)",
			values: data('register', true, 'phone'),
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
		d3.select('#lineFavPerVariantPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		nv.utils.windowResize(function() {
			chart.update();
		});
		return chart;
	});

	this.autorun(function() {
		d3.select('#lineFavPerVariantPerDayPerDevice svg').datum(
			streams()
		).call(chart);
		chart.update();
	});
};
