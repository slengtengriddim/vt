Template.pieClicksPerUser.rendered = function() {

	var data = () => {
		let result = [];
		let users = Meteor.users.find({}, {
			fields: {
				'emails': 1
			}
		}).fetch();

		let pushUserSum = (k) => {
				let data = Data.Detail.find({
					userId: k._id
				}, {
					fields: {
						'_id': 1
					}
				}).count();

				let userSum = {
					key: k.emails[0].address, // userMail
					y: data
				}
				result.push(userSum);
		}
		users.forEach(pushUserSum);

		return result;
	};
	// chart object
	var chart = nv.models.pieChart()
		.x(function(d) {
			return d.key
		})
		.y(function(d) {
			return d.y
		})
		// .width(width)
		// .height(height)
		.showLabels(true) //Display pie labels
		.labelThreshold(.05) //Configure the minimum slice size for labels to show up
		.labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
		.donut(true) //Turn on Donut mode. Makes pie chart look tasty!
		.donutRatio(0.35) //Configure how big you want the donut hole size to be.
	;

	// chart details
	nv.addGraph(function() {
		d3.select('#pieClicksPerUser svg')
			.datum(data())
			.transition().duration(1200)
			.call(chart);
		// nv.utils.windowResize(chart.update);
		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#pieClicksPerUser svg')
			.datum(data())
			.transition().duration(1200)
			.call(chart);

		chart.update();
	});
}
