Template.chartLineOnlineUser.rendered = function() {

	function data() {
		let result = [];
		let data = Data.Status.find({}, {
			sort: {
				timestamp: 1
			}
		}).fetch();

		let users = Meteor.users.find({}, {
			fields: {
				'emails': 1
			}
		}).fetch();

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
		let getRange = n => {
			if (n[1] >= n[0]) {
				return n[1] - n[0];
			}
		};


		let pushUserStream = (k) => {
			let timeOnlinePerDay;
			let data = Data.Status.find({
				userId: k._id
			}, {
				fields: {
					'timestamp': 1
				}
			}, {
				sort: {
					timestamp: 1
				}
			}).fetch();
			let userStream = {
				key: k.emails[0].address, // userMail
				values: timeOnlinePerDay,
				strokeWidth: 3
			}

			let groupedByDate = byDate(data);

			console.log(groupedByDate);

			for (let l in groupedByDate) {
				if (groupedByDate.hasOwnProperty(l)) {
					online = R.map(n => n.getTime(), R.pluck('timestamp')(R.filter(isOnline, groupedByDate[l])));
					offline = R.map(n => n.getTime(), R.pluck('timestamp')(R.filter(isOffline, groupedByDate[l])));

					let onOff = R.zip(online, offline);

					let timeRanges = R.map(getRange, onOff);
					let timeTotalPerDatePerUser = R.sum(timeRanges);
					// console.log(l);
					// console.log(timeTotalPerDatePerUser);
					timeOnlinePerDay.push({
						x: l, // date
						y: timeTotalPerDatePerUser
					});
				}
			};






			result.push(userStream);
		};

		users.forEach(pushUserStream);

		return result;
	};

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

	chart.yAxis
		.tickFormat(function(d) {
			// return d3.time.format('%-H h : %M m : %S s')(new Date(d))
			var date = new Date(d);
			date.setHours(date.getHours() - 1);

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
};
