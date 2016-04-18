Template.chartBarModes.rendered = function() {
	let data = () => {
		let countLesen = Data.Detail.find({mode: 'lesen'}).count();
		let countWort = Data.Detail.find({mode: 'wort'}).count();
		let countDefinition = Data.Detail.find({mode: 'definition'}).count();
		let countEingabe = Data.Detail.find({mode: 'eingabe'}).count();

		return [{
			mode: 'lesen',
			count: countLesen
		},{
			mode: 'wort',
			count: countWort
		},{
			mode: 'definition',
			count: countDefinition
		},{
			mode: 'eingabe',
			count: countEingabe
		}];
	};

	let barChart = () => {
		return [{
			key: "Browse Modi",
			values: data()
		}]
	};

	// chart object
	let chart = nv.models.discreteBarChart()
		.x(function(d) {
			return d.mode
		})
		.y(function(d) {
			return d.count
		})
		.valueFormat(d3.format('f'))
		//.staggerLabels(historicalBarChart[0].values.length > 8)
		.showValues(true)
		.duration(250);

	// chart details
	nv.addGraph(function() {
		d3.select('#chartBarModes svg')
			.datum(barChart())
			.call(chart);
		nv.utils.windowResize(chart.update);
		return chart;
	});

	// update chart when data changes
	this.autorun(function() {
		d3.select('#chartBarModes svg')
			.datum(barChart())
			.call(chart);
		chart.update();
	});
};
