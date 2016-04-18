Template.chartMultiBarModes.rendered = function() {
	let data = (mode) => {
		let result = [];
		let data = Data.Detail.find({mode: mode}, {
			sort: {
				timestamp: 1
			}
		}).fetch();
		let byDate = R.groupBy(function(entry) {
			let day = entry.timestamp;
			// day.setHours(0);
			// day.setMinutes(0);
			day.setSeconds(0);
			day.setMilliseconds(0);
			if (entry.timestamp.getMinutes()) {
				return day;
			}
		});
		let groupedByDate = R.map(R.length, byDate(data));
		for (let k in groupedByDate) {
			if (groupedByDate.hasOwnProperty(k)) {
				result.push({
					x: k,
					y: groupedByDate[k]
				});
			}
		};
		return result;
	};

	let multiBar = () => {
		return [{
			values: data('lesen'),
			key: 'Lesen'
		}, {
			values: data('wort'),
			key: 'Wort'
		}, {
			values: data('definition'),
			key: 'Definition'
		}, {
			values: data('eingabe'),
			key: 'Eingabe'
		}];
	}

	var chart = nv.models.multiBarChart()
		.duration(350)
		.reduceXTicks(false) //If 'false', every single x-axis tick label will be rendered.
		.rotateLabels(0) //Angle to rotate x-axis labels.
		.showControls(true) //Allow user to switch between 'Grouped' and 'Stacked' mode.
		.groupSpacing(0.2) //Distance between each group of bars.
		.staggerLabels(true)
		.rotateLabels(-45)
		.x(function(d) {
			return d.x
		})
		.y(function(d) {
			return d.y
		})
	;
	chart.xAxis
	.tickFormat(function(d) {
				return d3.time.format('%e, %H:%M')(new Date(d))
	});
	chart.yAxis
		.tickFormat(d3.format(',.1f'));

	nv.addGraph(function() {
		d3.select('#chartMultiBarModes svg')
			.datum(multiBar())
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#chartMultiBarModes svg')
		  .datum(multiBar())
		  .call(chart);

		chart.update();
	});

}
