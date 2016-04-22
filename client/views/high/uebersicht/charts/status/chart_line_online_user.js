Template.chartLineOnlineUser.rendered = function() {

	var chart = nv.models.lineChart()
		.margin({
			left: 200
		}) //Adjust chart margins to give the x-axis some breathing room.
		.useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!
		.duration(350) //how fast do you want the lines to transition?
		.showLegend(true) //Show the legend, allowing users to turn on/off line series.
		.showYAxis(true) //Show the y-axis
		.showXAxis(true)
		.x(function(d) {
			return d.x
		})
		.y(function(d) {
			return d.y
		});

	// chart.xAxis
	// .axisLabel("Time (s)")
	// .tickFormat(d3.format(',.1f'))
	// .staggerLabels(true);

	// .tickFormat(function(d) {
	// 	return d3.time.format('%e, %H:%M')(new Date(d))
	// });

	// chart.yAxis
	// 	.axisLabel('Voltage (v)')
	// 	.tickFormat(function(d) {
	// 		if (d == null) {
	// 			return 'N/A';
	// 		}
	// 		return d3.format(',.2f')(d);
	// 	});
	chart.yAxis
		.tickFormat(function(d) {
			// return d3.time.format('%-H h : %M m : %S s')(new Date(d))
			var date = new Date(d);
			date.setHours(date.getHours()-1);

			if (date.getHours() === 0) {
				return d3.time.format('%M min : %S sec')(date)
			} else {
				return d3.time.format('%-H h : %M min : %S sec')(date)
			}
		});

	nv.addGraph(function() {
		d3.select('#chartLineOnlineUser svg')
			.datum(data())
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#chartLineOnlineUser svg')
			.datum(data())
			.call(chart);

		chart.update();
	});

	function data() {
		let result = [];
		let data = Data.Status.find({}, {
			sort: {
				timestamp: 1
			}
		}).fetch();
		let byUser = R.groupBy(function(entry) {
			return entry.userId;
		});
		let byDate = R.groupBy(function(entry) {
			let day = entry.timestamp;
			if (entry.timestamp.getDate()) {
				return day.getDate();
			}
		});
		let online;
		let offline;
		let isOnline = (n, m) => n.status === "online";
		let isOffline = (n, m) => n.status === "offline";
		let getRange = n => n[1] - n[0];

		let groupedByUser = byUser(data);

		for (let k in groupedByUser) {
			if (groupedByUser.hasOwnProperty(k)) {
				// console.log(k);
				let userValues = [];
				let userStream = {
					values: userValues,
					key: k, // userId
					strokeWidth: 3,
					classed: 'dashed'
				}

				let groupedByDate = byDate(groupedByUser[k]);
				// console.log(groupedByDate);
				for (let l in groupedByDate) {
					if (groupedByDate.hasOwnProperty(l)) {
						online = R.pluck('timestamp')(R.filter(isOnline, groupedByDate[l]));
						offline = R.pluck('timestamp')(R.filter(isOffline, groupedByDate[l]));

						let onOff = R.zip(online, offline);
						let timeRanges = R.map(getRange, onOff);
						let timeTotalPerDatePerUser = R.sum(timeRanges);
						// console.log(l);
						// console.log(timeTotalPerDatePerUser);
						userValues.push({
							x: l, // date
							y: timeTotalPerDatePerUser
						}); //the nulls are to show how defined works
					}
				};
				result.push(userStream);
			}
		};
		return result;
	};
}
