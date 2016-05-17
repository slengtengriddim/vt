Template.multiBarMethodPerAttentionPerDay.rendered = function() {

	let data = (route, mode) => {
		let result = [];
		let data = Data.Detail.find({
			route: route,
			mode: mode
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
			key: "Trainer - read",
			values: data('trainer', 'lesen')
		}, {
			key: "Trainer - word",
			values: data('trainer', 'wort')
		}, {
			key: "Trainer - definition",
			values: data('trainer', 'definition')
		},{
			key: "CM - read",
			values: data('low', 'lesen')
		}, {
			key: "CM - word",
			values: data('low', 'wort')
		}, {
			key: "CM - definition",
			values: data('low', 'definition')
		}]
	};

	// chart object
	let chart = nv.models.multiBarChart()
		.x(function(d) {
			return d.x
		})
		.y(function(d) {
			return d.y
		})
		// .valueFormat(d3.format('f'))
		.staggerLabels(true)
		.wrapLabels(false)
		// .showValues(true)
		.duration(250)
		.reduceXTicks(true) //If 'false', every single x-axis tick label will be rendered.
		.rotateLabels(-45) //Angle to rotate x-axis labels.
		.showControls(true) //Allow user to switch between 'Grouped' and 'Stacked' mode.
		.groupSpacing(0.1) //Distance between each group of bars.
		.margin({
			"bottom": 48,
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
		d3.select('#multiBarMethodPerAttentionPerDay svg')
			.datum(streams())
			.call(chart);
		nv.utils.windowResize(chart.update);
		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#multiBarMethodPerAttentionPerDay svg')
			.datum(streams())
			.call(chart);
		chart.update();
	});
}
