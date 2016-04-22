Template.chartBarClicksPerDay.rendered = function() {
	let data = () => {
		let result = [];
		let data = Data.Detail.find({}, {
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

	let barChart = () => {
		return [{
			key: "Clicks per Day",
			values: data()
		}]
	};

	// chart object
	let chart = nv.models.discreteBarChart()
		.x(function(d) {
			return d.x
		})
		.y(function(d) {
			return d.y
		})
		.valueFormat(d3.format('f'))
		.staggerLabels(true)
		.rotateLabels(-45)
		//.staggerLabels(historicalBarChart[0].values.length > 8)
		.showValues(true)
		.duration(250);


		chart.xAxis
		 		 .axisLabel('Minute')
				 .tickFormat(function(d) {
						return d3.time.format('%e, %H:%M')(new Date(d))
		});
		chart.yAxis
			  .tickFormat(d3.format(',.1f'))
				.axisLabel('Clicks');
	// chart details
	nv.addGraph(function() {
		d3.select('#chartBarClicksPerDay svg')
			.datum(barChart())
			.call(chart);
		nv.utils.windowResize(chart.update);
		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#chartBarClicksPerDay svg')
			.datum(barChart())
			.call(chart);
		chart.update();
	});
};
