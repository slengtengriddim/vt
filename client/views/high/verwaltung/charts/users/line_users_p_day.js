Template.lineUsersPerDay.rendered = function() {

	let data = (route, mode, device) => {
		let result = [];
		let users = Meteor.users.find({}, {
			fields: {
				'emails': 1
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

		let pushUserStream = (k) => {
				let data = Data.Detail.find({
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

				let userValues = [];
				let userStream = {
					key: k.emails[0].address, // userMail
					values: Stat.normalizeByDate(data, xValues),
					strokeWidth: 3
				}
				result.push(userStream);
		}

		users.forEach(pushUserStream);
		
		return result;
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
		d3.select('#lineUsersPerDay svg').datum(
			data()
		).call(chart);
		nv.utils.windowResize(function() {
			chart.update();
		});
		return chart;
	});

	this.autorun(function() {
		d3.select('#lineUsersPerDay svg').datum(
			data()
		).call(chart);
		chart.update();
	});
};
