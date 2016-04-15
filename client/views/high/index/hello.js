Template.hello.onCreated(() => {
	let template = Template.instance();
		template.subscribe('people'); // Data.Viewed.find()
});

Template.hello.rendered = function() {

	// chart object
	let chart = nv.models.lineChart()
		.margin({
			left: 100
		}) //Adjust chart margins to give the x-axis some breathing room.
		.useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!
		.duration(350) //how fast do you want the lines to transition?
		.showLegend(true) //Show the legend, allowing users to turn on/off line series.
		.showYAxis(true) //Show the y-axis
		.showXAxis(true) //Show the x-axis
	;

	// chart details
	nv.addGraph(function() {
		let data = People.find().fetch();

		chart.xAxis.axisLabel('Person number').tickFormat(d3.format('d'));
		chart.yAxis.axisLabel('Age (years)').tickFormat(d3.format('d'));

		d3.select('#chart svg')
			.datum(
				[{
					values: data,
					key: 'Age'
				}]
			)
			.call(chart)
			;

		nv.utils.windowResize(chart.update);

		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		let data = People.find().fetch();
		d3.select('#chart svg').datum(
			[{
				values: data,
				key: 'Age'
			}]
		).call(chart);
		chart.update();
	});

};

Template.hello.events({
	'click #addDataButton': function() {
		var age = Aux.getRandomInt(13, 89);
		var lastPerson = People.findOne({}, {
			fields: {
				x: 1
			},
			sort: {
				x: -1
			},
			limit: 1,
			reactive: false
		});

		Meteor.call('addPerson', lastPerson, age);

	},
	'click #removeDataButton': function() {
		var lastPerson = People.findOne({}, {
			fields: {
				x: 1
			},
			sort: {
				x: -1
			},
			limit: 1,
			reactive: false
		});
		if (lastPerson) {
			People.remove(lastPerson._id);
		}
	}
});
