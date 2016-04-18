var require = meteorInstall({"client":{"views":{"high":{"index":{"charts":{"chart_words_all.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/charts/template.chart_words_all.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("chartWordsAll");                                                                                 // 2
Template["chartWordsAll"] = new Template("Template.chartWordsAll", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Insgesamt</h4>\n	"), HTML.DIV({                                                               // 5
    id: "chartWordsAll"                                                                                                // 6
  }, "\n		", HTML.SVG(), "\n	") ];                                                                                     // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_words_user.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/charts/template.chart_words_user.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("chartWordsUser");                                                                                // 2
Template["chartWordsUser"] = new Template("Template.chartWordsUser", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Du</h4>\n	"), HTML.DIV({                                                                      // 5
    id: "chartWordsUser"                                                                                               // 6
  }, "\n		", HTML.SVG(), "\n	") ];                                                                                     // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_words_all.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/charts/chart_words_all.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.chartWordsAll.onCreated(function () {                                                                         // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataViewedAll');                                                                                  // 3
});                                                                                                                    //
                                                                                                                       //
Template.chartWordsAll.rendered = function () {                                                                        // 6
                                                                                                                       //
	var barChart = function barChart() {                                                                                  // 8
		var data = Data.Viewed.All.find({}, {                                                                                // 9
			sort: {                                                                                                             // 10
				timesViewed: -1                                                                                                    // 11
			}                                                                                                                   //
		}).fetch();                                                                                                          //
		var barChart = [{                                                                                                    // 14
			key: "Top 5 beliebte Woerter (allgemein)",                                                                          // 15
			values: data                                                                                                        // 16
		}];                                                                                                                  //
                                                                                                                       //
		return barChart;                                                                                                     // 19
	};                                                                                                                    //
                                                                                                                       //
	// chart object                                                                                                       //
	var chart = nv.models.discreteBarChart().x(function (d) {                                                             // 6
		return d.vocabularyName;                                                                                             // 25
	}).y(function (d) {                                                                                                   //
		return d.timesViewed;                                                                                                // 28
	}).staggerLabels(true)                                                                                                //
	//.staggerLabels(historicalBarChart[0].values.length > 8)                                                             //
	.showValues(true).duration(250);                                                                                      //
                                                                                                                       //
	// chart details                                                                                                      //
	nv.addGraph(function () {                                                                                             // 6
                                                                                                                       //
		d3.select('#chartWordsAll svg').datum(barChart()).call(chart);                                                       // 38
                                                                                                                       //
		nv.utils.windowResize(chart.update);                                                                                 // 42
                                                                                                                       //
		return chart;                                                                                                        // 44
	});                                                                                                                   //
                                                                                                                       //
	// update chart when data changes                                                                                     //
	this.autorun(function () {                                                                                            // 6
		// let data = Data.Viewed.All.find({}, {                                                                             //
		// 	sort: {                                                                                                          //
		// 		timesViewed: -1                                                                                                 //
		// 	}                                                                                                                //
		// }).fetch();                                                                                                       //
		// let barChart = [{                                                                                                 //
		// 	key: "Top 5 beliebte Woerter",                                                                                   //
		// 	values: data                                                                                                     //
		// }];                                                                                                               //
                                                                                                                       //
		d3.select('#chartWordsAll svg').datum(barChart()).call(chart);                                                       // 59
                                                                                                                       //
		chart.update();                                                                                                      // 63
	});                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
// data = Data.Viewed.find({}, {                                                                                       //
//     limit: 5,                                                                                                       //
//     sort: {                                                                                                         //
//         timesViewed: -1                                                                                             //
//     }                                                                                                               //
// });                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_words_user.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/charts/chart_words_user.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.chartWordsAll.onCreated(function () {                                                                         // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataViewedUser');                                                                                 // 3
});                                                                                                                    //
                                                                                                                       //
Template.chartWordsUser.rendered = function () {                                                                       // 6
                                                                                                                       //
	var barChart = function barChart() {                                                                                  // 8
		var data = Data.Viewed.User.find({}, {                                                                               // 9
			sort: {                                                                                                             // 10
				timesViewed: -1                                                                                                    // 11
			}                                                                                                                   //
		}).fetch();                                                                                                          //
		var barChart = [{                                                                                                    // 14
			key: "Top 5 beliebte Woerter (allgemein)",                                                                          // 15
			values: data                                                                                                        // 16
		}];                                                                                                                  //
                                                                                                                       //
		return barChart;                                                                                                     // 19
	};                                                                                                                    //
                                                                                                                       //
	// chart object                                                                                                       //
	var chart = nv.models.discreteBarChart().x(function (d) {                                                             // 6
		return d.vocabularyName;                                                                                             // 25
	}).y(function (d) {                                                                                                   //
		return d.timesViewed;                                                                                                // 28
	}).staggerLabels(true)                                                                                                //
	//.staggerLabels(historicalBarChart[0].values.length > 8)                                                             //
	.showValues(true).duration(250);                                                                                      //
                                                                                                                       //
	// chart details                                                                                                      //
	nv.addGraph(function () {                                                                                             // 6
                                                                                                                       //
		d3.select('#chartWordsUser svg').datum(barChart()).call(chart);                                                      // 38
                                                                                                                       //
		nv.utils.windowResize(chart.update);                                                                                 // 42
                                                                                                                       //
		return chart;                                                                                                        // 44
	});                                                                                                                   //
                                                                                                                       //
	// update chart when data changes                                                                                     //
	this.autorun(function () {                                                                                            // 6
                                                                                                                       //
		d3.select('#chartWordsUser svg').datum(barChart()).call(chart);                                                      // 50
                                                                                                                       //
		chart.update();                                                                                                      // 54
	});                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"hello.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/template.hello.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("hello");                                                                                         // 2
Template["hello"] = new Template("Template.hello", (function() {                                                       // 3
  var view = this;                                                                                                     // 4
  return [ HTML.DIV({                                                                                                  // 5
    id: "chart"                                                                                                        // 6
  }, "\n		", HTML.SVG(), "\n	"), HTML.Raw('\n	<button id="addDataButton">Add data</button>\n	<button id="removeDataButton">Remove data</button>') ];
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/template.index.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("index");                                                                                         // 2
Template["index"] = new Template("Template.index", (function() {                                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, HTML.Raw('\n    <h1>Index - Startseite.</h1>\n    <p>\n      5 Tage nach Registration/ nach 5 Logins folgende Meldung:\n    </p>\n    <p class="alert alert-info">Bitte fuelle den Fragebogen aus. Du hast bis zum 03. Juli 2016 dafuer Zeit. Nur mit ausgefuellten Fragebogen ist deine Teilnahme gueltig.\n      <input class="btn btn-default btn-question" type="submit" value="Fragebogen">\n    </p>\n\n    <!-- {{#each dataDetail1}} <br> {{mode}} {{/each}} -->\n\n    <!-- {{> chartFavLine }} -->\n\n<h3>TOP 5 - Nachgeschlagene Begriffe</h3>\n\n  '), Spacebars.include(view.lookupTemplate("chartWordsAll")), "\n\n  ", Spacebars.include(view.lookupTemplate("chartWordsUser")), HTML.Raw("\n\n    <h4>TODO: </h4>\n    <ul>\n      <li>TOP 5 last viewed</li>\n      <li>TOP 5 popularity on users fav lists</li>\n      <li>Vocabulary of the day</li>\n    </ul>\n\n    <p>\n      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,\n      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.\n    </p>\n\n    <h4>Log Data: </h4>\n    <ul>\n      <li>Count successful Logins</li>\n      <li> Login and Logout + Timestamp, Browser, OS</li>\n      <li>Clicked Menu items plus timestamp</li>\n      <li>Clicked Attention button plus timestamp</li>\n      <li>Count words viewed and in which mode -> compare attention high/ low plus timestamp -> how did the use evolve?</li>\n      <li></li>\n    </ul>\n\n    <h4>Fragebogen: </h4>\n    <ul>\n      <li>Welchen Trainermodus hast du am liebsten genutzt?</li>\n      <li>Von welchem Endgeraet aus hast du die App genutzt?</li>\n      <li>Falls von mehreren: Inwiefern hat sich dein Nutzerverhalten mit den versch. Endgeraeten veraendert?</li>\n      <li>Hat die Moeglichkeit, den Modus zu wechseln, dein Nutzungsverhalten veraendert? Falls ja, wie?</li>\n      <li>Wie hat dir die Moeglichkeit gefallen das UI zu reduzieren?</li>\n      <li>Hast du vom Attention Mode Gebrauch gemacht? Wann, wo und in welchen Situationen?</li>\n      <li>Wie Zufrieden warst du mit der Benutzeroberflaeche?</li>\n      <li>Fandest du die Bedienung der App verstaendlich?</li>\n      <li>...</li>\n    </ul>\n\n  "));
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hello.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/hello.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.hello.onCreated(function () {                                                                                 // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('people'); // Data.Viewed.find()                                                                   // 3
});                                                                                                                    // 1
                                                                                                                       //
Template.hello.rendered = function () {                                                                                // 6
                                                                                                                       //
	// chart object                                                                                                       //
	var chart = nv.models.lineChart().margin({                                                                            // 9
		left: 100                                                                                                            // 11
	}) //Adjust chart margins to give the x-axis some breathing room.                                                     //
	.useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!                                       //
	.duration(350) //how fast do you want the lines to transition?                                                        //
	.showLegend(true) //Show the legend, allowing users to turn on/off line series.                                       //
	.showYAxis(true) //Show the y-axis                                                                                    //
	.showXAxis(true) //Show the x-axis                                                                                    //
	;                                                                                                                     // 9
                                                                                                                       //
	// chart details                                                                                                      //
	nv.addGraph(function () {                                                                                             // 6
		var data = People.find().fetch();                                                                                    // 22
                                                                                                                       //
		chart.xAxis.axisLabel('Person number').tickFormat(d3.format('d'));                                                   // 24
		chart.yAxis.axisLabel('Age (years)').tickFormat(d3.format('d'));                                                     // 25
                                                                                                                       //
		d3.select('#chart svg').datum([{                                                                                     // 27
			values: data,                                                                                                       // 30
			key: 'Age'                                                                                                          // 31
		}]).call(chart);                                                                                                     //
                                                                                                                       //
		nv.utils.windowResize(chart.update);                                                                                 // 37
                                                                                                                       //
		return chart;                                                                                                        // 39
	});                                                                                                                   //
                                                                                                                       //
	// update chart when data changes                                                                                     //
	this.autorun(function () {                                                                                            // 6
		var data = People.find().fetch();                                                                                    // 44
		d3.select('#chart svg').datum([{                                                                                     // 45
			values: data,                                                                                                       // 47
			key: 'Age'                                                                                                          // 48
		}]).call(chart);                                                                                                     //
		chart.update();                                                                                                      // 51
	});                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
Template.hello.events({                                                                                                // 56
	'click #addDataButton': function () {                                                                                 // 57
		function clickAddDataButton() {                                                                                      // 57
			var age = Aux.getRandomInt(13, 89);                                                                                 // 58
			var lastPerson = People.findOne({}, {                                                                               // 59
				fields: {                                                                                                          // 60
					x: 1                                                                                                              // 61
				},                                                                                                                 //
				sort: {                                                                                                            // 63
					x: -1                                                                                                             // 64
				},                                                                                                                 //
				limit: 1,                                                                                                          // 66
				reactive: false                                                                                                    // 67
			});                                                                                                                 //
                                                                                                                       //
			Meteor.call('addPerson', lastPerson, age);                                                                          // 70
		}                                                                                                                    //
                                                                                                                       //
		return clickAddDataButton;                                                                                           //
	}(),                                                                                                                  //
	'click #removeDataButton': function () {                                                                              // 73
		function clickRemoveDataButton() {                                                                                   // 73
			var lastPerson = People.findOne({}, {                                                                               // 74
				fields: {                                                                                                          // 75
					x: 1                                                                                                              // 76
				},                                                                                                                 //
				sort: {                                                                                                            // 78
					x: -1                                                                                                             // 79
				},                                                                                                                 //
				limit: 1,                                                                                                          // 81
				reactive: false                                                                                                    // 82
			});                                                                                                                 //
			if (lastPerson) {                                                                                                   // 84
				People.remove(lastPerson._id);                                                                                     // 85
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickRemoveDataButton;                                                                                        //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/index.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.index.onCreated(function () {                                                                                 // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataDetail');                                                                                     // 3
});                                                                                                                    //
                                                                                                                       //
Template.index.helpers({                                                                                               // 6
	dataDetail1: function () {                                                                                            // 7
		function dataDetail1() {                                                                                             //
			var data = Data.Detail.find().fetch();                                                                              // 8
			return data;                                                                                                        // 9
		}                                                                                                                    //
                                                                                                                       //
		return dataDetail1;                                                                                                  //
	}(),                                                                                                                  //
	dataDetail2: function () {                                                                                            // 11
		function dataDetail2() {                                                                                             //
			var result = void 0;                                                                                                // 12
			var data = Data.Detail.find().fetch();                                                                              // 13
			var byMode = R.groupBy(function (entry) {                                                                           // 14
				var mode = entry.mode;                                                                                             // 15
				return mode;                                                                                                       // 16
			});                                                                                                                 //
			console.log(byMode(data));                                                                                          // 18
			return data;                                                                                                        // 19
		}                                                                                                                    //
                                                                                                                       //
		return dataDetail2;                                                                                                  //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.index.events({                                                                                                // 23
	'click .btn-question': function () {                                                                                  // 24
		function clickBtnQuestion(event, template) {                                                                         //
			var result = void 0;                                                                                                // 25
			var data = Data.Detail.find().fetch();                                                                              // 26
			var byMode = R.groupBy(function (entry) {                                                                           // 27
				return entry.mode;                                                                                                 // 28
			});                                                                                                                 //
			console.log(byMode(data));                                                                                          // 30
			var byDate = R.groupBy(function (entry) {                                                                           // 31
				var day = entry.timestamp;                                                                                         // 32
				// day.setHours(0);                                                                                                //
				// day.setMinutes(0);                                                                                              //
				day.setSeconds(0);                                                                                                 // 31
				day.setMilliseconds(0);                                                                                            // 36
				if (entry.timestamp.getMinutes()) {                                                                                // 37
					return day;                                                                                                       // 38
				}                                                                                                                  //
			});                                                                                                                 //
			console.log(byDate(data));                                                                                          // 41
			console.log(R.map(R.length, byDate(data)));                                                                         // 42
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnQuestion;                                                                                             //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"stats":{"charts":{"chart_bar_clicks_per_day.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/charts/template.chart_bar_clicks_per_day.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("chartBarClicksPerDay");                                                                          // 2
Template["chartBarClicksPerDay"] = new Template("Template.chartBarClicksPerDay", (function() {                         // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Clicks pro Tag (Gesamt)</h4>\n	"), HTML.DIV({                                                 // 5
    id: "chartBarClicksPerDay"                                                                                         // 6
  }, "\n		", HTML.SVG(), "\n	") ];                                                                                     // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_bar_modes.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/charts/template.chart_bar_modes.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("chartBarModes");                                                                                 // 2
Template["chartBarModes"] = new Template("Template.chartBarModes", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Vergleich Browse Modi (Wort, Lesen, Bedeutung, Eingabe)</h4>\n	"), HTML.DIV({                 // 5
    id: "chartBarModes"                                                                                                // 6
  }, "\n		", HTML.SVG(), "\n	") ];                                                                                     // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_multibar_attention.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/charts/template.chart_multibar_attention.js                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("chartMultiBarModes");                                                                            // 2
Template["chartMultiBarModes"] = new Template("Template.chartMultiBarModes", (function() {                             // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Clicks Modi pro Tag</h4>\n	"), HTML.DIV({                                                     // 5
    id: "chartMultiBarModes"                                                                                           // 6
  }, "\n		", HTML.SVG(), "\n	") ];                                                                                     // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_pie_attention.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/charts/template.chart_pie_attention.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("chartPieAttention");                                                                             // 2
Template["chartPieAttention"] = new Template("Template.chartPieAttention", (function() {                               // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Vergleich Click-Ratio low/ high</h4>\n	"), HTML.DIV({                                         // 5
    id: "chartPieAttention"                                                                                            // 6
  }, "\n		", HTML.SVG(), "\n	") ];                                                                                     // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_bar_clicks_per_day.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/charts/chart_bar_clicks_per_day.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.chartBarClicksPerDay.rendered = function () {                                                                 // 1
	var data = function data() {                                                                                          // 2
		var result = [];                                                                                                     // 3
		var data = Data.Detail.find({}, {                                                                                    // 4
			sort: {                                                                                                             // 5
				timestamp: 1                                                                                                       // 6
			}                                                                                                                   //
		}).fetch();                                                                                                          //
		var byDate = R.groupBy(function (entry) {                                                                            // 9
			var day = entry.timestamp;                                                                                          // 10
			// day.setHours(0);                                                                                                 //
			// day.setMinutes(0);                                                                                               //
			day.setSeconds(0);                                                                                                  // 9
			day.setMilliseconds(0);                                                                                             // 14
			if (entry.timestamp.getMinutes()) {                                                                                 // 15
				return day;                                                                                                        // 16
			}                                                                                                                   //
		});                                                                                                                  //
		var groupedByDate = R.map(R.length, byDate(data));                                                                   // 19
		for (var k in meteorBabelHelpers.sanitizeForInObject(groupedByDate)) {                                               // 20
			if (groupedByDate.hasOwnProperty(k)) {                                                                              // 21
				result.push({                                                                                                      // 22
					x: k,                                                                                                             // 23
					y: groupedByDate[k]                                                                                               // 24
				});                                                                                                                //
			}                                                                                                                   //
		};                                                                                                                   //
		return result;                                                                                                       // 28
	};                                                                                                                    //
                                                                                                                       //
	var barChart = function barChart() {                                                                                  // 31
		return [{                                                                                                            // 32
			key: "Clicks per Day",                                                                                              // 33
			values: data()                                                                                                      // 34
		}];                                                                                                                  //
	};                                                                                                                    //
                                                                                                                       //
	// chart object                                                                                                       //
	var chart = nv.models.discreteBarChart().x(function (d) {                                                             // 1
		return d.x;                                                                                                          // 41
	}).y(function (d) {                                                                                                   //
		return d.y;                                                                                                          // 44
	}).valueFormat(d3.format('f')).staggerLabels(true).rotateLabels(-45)                                                  //
	//.staggerLabels(historicalBarChart[0].values.length > 8)                                                             //
	.showValues(true).duration(250);                                                                                      // 39
                                                                                                                       //
	chart.xAxis.axisLabel('Clicks').tickFormat(function (d) {                                                             // 54
		return d3.time.format('%e, %H:%M')(new Date(d));                                                                     // 57
	});                                                                                                                   //
	chart.yAxis.tickFormat(d3.format(',.1f')).axisLabel('Minute');                                                        // 59
	// chart details                                                                                                      //
	nv.addGraph(function () {                                                                                             // 1
		d3.select('#chartBarClicksPerDay svg').datum(barChart()).call(chart);                                                // 64
		nv.utils.windowResize(chart.update);                                                                                 // 67
		return chart;                                                                                                        // 68
	});                                                                                                                   //
                                                                                                                       //
	// update chart when data changes                                                                                     //
	this.autorun(function () {                                                                                            // 1
		d3.select('#chartBarClicksPerDay svg').datum(barChart()).call(chart);                                                // 73
		chart.update();                                                                                                      // 76
	});                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_bar_modes.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/charts/chart_bar_modes.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.chartBarModes.rendered = function () {                                                                        // 1
	var data = function data() {                                                                                          // 2
		var countLesen = Data.Detail.find({ mode: 'lesen' }).count();                                                        // 3
		var countWort = Data.Detail.find({ mode: 'wort' }).count();                                                          // 4
		var countDefinition = Data.Detail.find({ mode: 'definition' }).count();                                              // 5
		var countEingabe = Data.Detail.find({ mode: 'eingabe' }).count();                                                    // 6
                                                                                                                       //
		return [{                                                                                                            // 8
			mode: 'lesen',                                                                                                      // 9
			count: countLesen                                                                                                   // 10
		}, {                                                                                                                 //
			mode: 'wort',                                                                                                       // 12
			count: countWort                                                                                                    // 13
		}, {                                                                                                                 //
			mode: 'definition',                                                                                                 // 15
			count: countDefinition                                                                                              // 16
		}, {                                                                                                                 //
			mode: 'eingabe',                                                                                                    // 18
			count: countEingabe                                                                                                 // 19
		}];                                                                                                                  //
	};                                                                                                                    //
                                                                                                                       //
	var barChart = function barChart() {                                                                                  // 23
		return [{                                                                                                            // 24
			key: "Browse Modi",                                                                                                 // 25
			values: data()                                                                                                      // 26
		}];                                                                                                                  //
	};                                                                                                                    //
                                                                                                                       //
	// chart object                                                                                                       //
	var chart = nv.models.discreteBarChart().x(function (d) {                                                             // 1
		return d.mode;                                                                                                       // 33
	}).y(function (d) {                                                                                                   //
		return d.count;                                                                                                      // 36
	}).valueFormat(d3.format('f'))                                                                                        //
	//.staggerLabels(historicalBarChart[0].values.length > 8)                                                             //
	.showValues(true).duration(250);                                                                                      //
                                                                                                                       //
	// chart details                                                                                                      //
	nv.addGraph(function () {                                                                                             // 1
		d3.select('#chartBarModes svg').datum(barChart()).call(chart);                                                       // 45
		nv.utils.windowResize(chart.update);                                                                                 // 48
		return chart;                                                                                                        // 49
	});                                                                                                                   //
                                                                                                                       //
	// update chart when data changes                                                                                     //
	this.autorun(function () {                                                                                            // 1
		d3.select('#chartBarModes svg').datum(barChart()).call(chart);                                                       // 54
		chart.update();                                                                                                      // 57
	});                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_multibar_attention.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/charts/chart_multibar_attention.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.chartMultiBarModes.rendered = function () {                                                                   // 1
	var data = function data(mode) {                                                                                      // 2
		var result = [];                                                                                                     // 3
		var data = Data.Detail.find({ mode: mode }, {                                                                        // 4
			sort: {                                                                                                             // 5
				timestamp: 1                                                                                                       // 6
			}                                                                                                                   //
		}).fetch();                                                                                                          //
		var byDate = R.groupBy(function (entry) {                                                                            // 9
			var day = entry.timestamp;                                                                                          // 10
			// day.setHours(0);                                                                                                 //
			// day.setMinutes(0);                                                                                               //
			day.setSeconds(0);                                                                                                  // 9
			day.setMilliseconds(0);                                                                                             // 14
			if (entry.timestamp.getMinutes()) {                                                                                 // 15
				return day;                                                                                                        // 16
			}                                                                                                                   //
		});                                                                                                                  //
		var groupedByDate = R.map(R.length, byDate(data));                                                                   // 19
		for (var k in meteorBabelHelpers.sanitizeForInObject(groupedByDate)) {                                               // 20
			if (groupedByDate.hasOwnProperty(k)) {                                                                              // 21
				result.push({                                                                                                      // 22
					x: k,                                                                                                             // 23
					y: groupedByDate[k]                                                                                               // 24
				});                                                                                                                //
			}                                                                                                                   //
		};                                                                                                                   //
		return result;                                                                                                       // 28
	};                                                                                                                    //
                                                                                                                       //
	var multiBar = function multiBar() {                                                                                  // 31
		return [{                                                                                                            // 32
			values: data('lesen'),                                                                                              // 33
			key: 'Lesen'                                                                                                        // 34
		}, {                                                                                                                 //
			values: data('wort'),                                                                                               // 36
			key: 'Wort'                                                                                                         // 37
		}, {                                                                                                                 //
			values: data('definition'),                                                                                         // 39
			key: 'Definition'                                                                                                   // 40
		}, {                                                                                                                 //
			values: data('eingabe'),                                                                                            // 42
			key: 'Eingabe'                                                                                                      // 43
		}];                                                                                                                  //
	};                                                                                                                    //
                                                                                                                       //
	var chart = nv.models.multiBarChart().duration(350).reduceXTicks(false) //If 'false', every single x-axis tick label will be rendered.
	.rotateLabels(0) //Angle to rotate x-axis labels.                                                                     //
	.showControls(true) //Allow user to switch between 'Grouped' and 'Stacked' mode.                                      //
	.groupSpacing(0.2) //Distance between each group of bars.                                                             //
	.staggerLabels(true).rotateLabels(-45).x(function (d) {                                                               //
		return d.x;                                                                                                          // 56
	}).y(function (d) {                                                                                                   //
		return d.y;                                                                                                          // 59
	});                                                                                                                   //
	chart.xAxis.tickFormat(function (d) {                                                                                 // 62
		return d3.time.format('%e, %H:%M')(new Date(d));                                                                     // 64
	});                                                                                                                   //
	chart.yAxis.tickFormat(d3.format(',.1f'));                                                                            // 66
                                                                                                                       //
	nv.addGraph(function () {                                                                                             // 69
		d3.select('#chartMultiBarModes svg').datum(multiBar()).call(chart);                                                  // 70
                                                                                                                       //
		nv.utils.windowResize(chart.update);                                                                                 // 74
                                                                                                                       //
		return chart;                                                                                                        // 76
	});                                                                                                                   //
                                                                                                                       //
	// update chart when data changes                                                                                     //
	this.autorun(function () {                                                                                            // 1
		d3.select('#chartMultiBarModes svg').datum(multiBar()).call(chart);                                                  // 81
                                                                                                                       //
		chart.update();                                                                                                      // 85
	});                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_pie_attention.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/charts/chart_pie_attention.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.chartPieAttention.rendered = function () {                                                                    // 1
                                                                                                                       //
	var data = function data() {                                                                                          // 3
		var sumLow = Data.Detail.find({ attention: true }).count();                                                          // 4
		var sumHigh = Data.Detail.find({ attention: false }).count();                                                        // 5
                                                                                                                       //
		var data = [{                                                                                                        // 7
			key: "High",                                                                                                        // 8
			y: sumHigh                                                                                                          // 9
		}, {                                                                                                                 //
			key: "Low",                                                                                                         // 11
			y: sumLow                                                                                                           // 12
		}];                                                                                                                  //
                                                                                                                       //
		return data;                                                                                                         // 15
	};                                                                                                                    //
                                                                                                                       //
	// chart object                                                                                                       //
	var height = 350;                                                                                                     // 1
	var width = 350;                                                                                                      // 20
	var chart = nv.models.pieChart().x(function (d) {                                                                     // 21
		return d.key;                                                                                                        // 23
	}).y(function (d) {                                                                                                   //
		return d.y;                                                                                                          // 26
	}).width(width).height(height);                                                                                       //
                                                                                                                       //
	// chart details                                                                                                      //
	nv.addGraph(function () {                                                                                             // 1
                                                                                                                       //
		d3.select('#chartPieAttention svg').datum(data()).transition().duration(1200).attr('width', width).attr('height', height).call(chart);
                                                                                                                       //
		// nv.utils.windowResize(chart.update);                                                                              //
		return chart;                                                                                                        // 32
	});                                                                                                                   //
                                                                                                                       //
	// update chart when data changes                                                                                     //
	this.autorun(function () {                                                                                            // 1
                                                                                                                       //
		d3.select('#chartPieAttention svg').datum(data()).transition().duration(1200).attr('width', width).attr('height', height).call(chart);
                                                                                                                       //
		chart.update();                                                                                                      // 55
	});                                                                                                                   //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"stats.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/template.stats.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("stats");                                                                                         // 2
Template["stats"] = new Template("Template.stats", (function() {                                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, HTML.Raw('\n		<h1>Benutzerstatistik</h1>\n		<input class="btn btn-default btn-test" type="submit" value="Test">\n		'), HTML.DIV({
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "col-sm-8"                                                                                                // 10
  }, "\n				", Spacebars.include(view.lookupTemplate("chartBarModes")), "\n			"), "\n			", HTML.DIV({                  // 11
    "class": "col-sm-4"                                                                                                // 12
  }, "\n				", Spacebars.include(view.lookupTemplate("chartPieAttention")), "\n			"), "\n		"), "\n		", HTML.DIV({      // 13
    "class": "row"                                                                                                     // 14
  }, "\n			", Spacebars.include(view.lookupTemplate("chartMultiBarModes")), "\n		"), "\n		", HTML.DIV({                // 15
    "class": "row"                                                                                                     // 16
  }, "\n			", Spacebars.include(view.lookupTemplate("chartBarClicksPerDay")), "\n		"), "\n	");                         // 17
}));                                                                                                                   // 18
                                                                                                                       // 19
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"stats.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/stats/stats.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.stats.onCreated(function () {                                                                                 // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataDetail');                                                                                     // 3
});                                                                                                                    //
                                                                                                                       //
Template.stats.events({                                                                                                // 6
	'click .btn-test': function () {                                                                                      // 7
		function clickBtnTest(event, template) {                                                                             //
			var result = [];                                                                                                    // 8
			var data = Data.Detail.find({}, {                                                                                   // 9
				sort: {                                                                                                            // 10
					timestamp: 1                                                                                                      // 11
				}                                                                                                                  //
			}).fetch();                                                                                                         //
			var byMode = R.groupBy(function (entry) {                                                                           // 14
				return entry.mode;                                                                                                 // 15
			});                                                                                                                 //
			var byAttention = R.groupBy(function (entry) {                                                                      // 17
				return entry.attention;                                                                                            // 18
			});                                                                                                                 //
			var byDate = R.groupBy(function (entry) {                                                                           // 20
				var day = entry.timestamp;                                                                                         // 21
				// day.setHours(0);                                                                                                //
				// day.setMinutes(0);                                                                                              //
				day.setSeconds(0);                                                                                                 // 20
				day.setMilliseconds(0);                                                                                            // 25
				if (entry.timestamp.getMinutes()) {                                                                                // 26
					return day;                                                                                                       // 27
				}                                                                                                                  //
			});                                                                                                                 //
			console.log(byDate(data));                                                                                          // 30
			var sortedByDate = R.map(R.length, byDate(data));                                                                   // 31
			for (var k in meteorBabelHelpers.sanitizeForInObject(sortedByDate)) {                                               // 32
				if (sortedByDate.hasOwnProperty(k)) {                                                                              // 33
					console.log("Key is " + k + ", value is " + sortedByDate[k]);                                                     // 34
					result.push({                                                                                                     // 35
						x: k,                                                                                                            // 36
						y: sortedByDate[k]                                                                                               // 37
					});                                                                                                               //
				}                                                                                                                  //
			};                                                                                                                  //
			console.log(result);                                                                                                // 41
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnTest;                                                                                                 //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"eingabe":{"eingabe.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/eingabe/template.eingabe.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("eingabe");                                                                                       // 2
Template["eingabe"] = new Template("Template.eingabe", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return [ HTML.DIV({                                                                                                  // 5
    "class": "container"                                                                                               // 6
  }, "\n\n		", HTML.Raw("<br>"), "\n\n		", Blaze.Unless(function() {                                                   // 7
    return Spacebars.call(view.lookup("isAlphabetic"));                                                                // 8
  }, function() {                                                                                                      // 9
    return [ "\n			", HTML.P({                                                                                         // 10
      "class": "alert alert-warning"                                                                                   // 11
    }, "Tipp: Das gesuchte Wort enthaelt nur Zeichen des Alphabets (a - Z). Keine Leer- und Sonderzeichen."), "\n		" ];
  }), "\n		", Blaze.Unless(function() {                                                                                // 13
    return Spacebars.call(view.lookup("isLength64"));                                                                  // 14
  }, function() {                                                                                                      // 15
    return [ "\n			", HTML.P({                                                                                         // 16
      "class": "alert alert-warning"                                                                                   // 17
    }, "Tipp: Das gesuchte Wort enthaelt nicht mehr als 64 Zeichen."), "\n		" ];                                       // 18
  }), "\n\n\n		", HTML.DIV({                                                                                           // 19
    "class": "media"                                                                                                   // 20
  }, "\n\n			", Spacebars.include(view.lookupTemplate("backward")), "\n\n			", HTML.DIV({                              // 21
    "class": "media-body"                                                                                              // 22
  }, "\n				", Blaze.If(function() {                                                                                   // 23
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 24
  }, function() {                                                                                                      // 25
    return [ "\n					", Spacebars.With(function() {                                                                    // 26
      return Spacebars.call(view.lookup("entry"));                                                                     // 27
    }, function() {                                                                                                    // 28
      return [ "\n\n\n					", HTML.DIV({                                                                               // 29
        "class": "jumbotron"                                                                                           // 30
      }, "\n\n						", Blaze.If(function() {                                                                           // 31
        return Spacebars.call(view.lookup("lengthIsOne"));                                                             // 32
      }, function() {                                                                                                  // 33
        return HTML.SPAN({                                                                                             // 34
          "class": "label label-warning text-center"                                                                   // 35
        }, "Letzter Eintrag in ", Blaze.If(function() {                                                                // 36
          return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                // 37
        }, function() {                                                                                                // 38
          return "Favoriten";                                                                                          // 39
        }, function() {                                                                                                // 40
          return "Nicht-Favoriten";                                                                                    // 41
        }));                                                                                                           // 42
      }), "\n\n						", HTML.DIV({                                                                                     // 43
        "class": "media"                                                                                               // 44
      }, "\n							", HTML.DIV({                                                                                       // 45
        "class": "media-left btn-reveal"                                                                               // 46
      }, "\n									", Blaze.Unless(function() {                                                                      // 47
        return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                          // 48
      }, function() {                                                                                                  // 49
        return [ "\n										", HTML.I({                                                                              // 50
          "class": "fa fa-question fa-4x"                                                                              // 51
        }), "\n									" ];                                                                                           // 52
      }, function() {                                                                                                  // 53
        return [ "\n										", HTML.I({                                                                              // 54
          "class": "fa fa-exclamation fa-4x"                                                                           // 55
        }), "\n									" ];                                                                                           // 56
      }), "\n							"), "\n							", HTML.DIV({                                                                        // 57
        "class": "media-body"                                                                                          // 58
      }, "\n								", Blaze.Unless(function() {                                                                       // 59
        return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                          // 60
      }, function() {                                                                                                  // 61
        return [ "\n									", Blaze.If(function() {                                                                  // 62
          return Spacebars.dataMustache(view.lookup("getSession"), "termWrong");                                       // 63
        }, function() {                                                                                                // 64
          return [ "\n										", HTML.P({                                                                            // 65
            "class": "alert alert-warning"                                                                             // 66
          }, "Zu ", Blaze.View("lookup:termPercent", function() {                                                      // 67
            return Spacebars.mustache(view.lookup("termPercent"));                                                     // 68
          }), "% bisher richtig: ", Blaze.View("lookup:getSession", function() {                                       // 69
            return Spacebars.mustache(view.lookup("getSession"), "termCache");                                         // 70
          })), "\n									" ];                                                                                        // 71
        }), "\n									", Blaze.If(function() {                                                                       // 72
          return Spacebars.dataMustache(view.lookup("getSession"), "termRight");                                       // 73
        }, function() {                                                                                                // 74
          return [ "\n										", HTML.P({                                                                            // 75
            "class": "alert alert-success"                                                                             // 76
          }, "Richtig: ", Blaze.View("lookup:term", function() {                                                       // 77
            return Spacebars.mustache(view.lookup("term"));                                                            // 78
          })), "\n									" ];                                                                                        // 79
        }), "\n								" ];                                                                                            // 80
      }, function() {                                                                                                  // 81
        return [ "\n									", HTML.P({                                                                               // 82
          "class": "alert alert-info"                                                                                  // 83
        }, "Loesung: ", Blaze.View("lookup:term", function() {                                                         // 84
          return Spacebars.mustache(view.lookup("term"));                                                              // 85
        })), "\n								" ];                                                                                           // 86
      }), "\n							"), "\n						"), "\n\n						", HTML.DIV({                                                          // 87
        "class": "input-group-lg "                                                                                     // 88
      }, "\n						      ", HTML.INPUT({                                                                                // 89
        type: "text",                                                                                                  // 90
        name: "term",                                                                                                  // 91
        id: "term",                                                                                                    // 92
        "class": "form-control",                                                                                       // 93
        placeholder: "Was ist..."                                                                                      // 94
      }), "\n						"), "\n						", HTML.HR(), "\n\n						", HTML.H3("\n						", HTML.OL("\n							", HTML.LI(Blaze.View("lookup:description", function() {
        return Spacebars.mustache(view.lookup("description"));                                                         // 96
      })), "\n						"), "\n					"), "\n					"), "\n\n					" ];                                                         // 97
    }), "\n				" ];                                                                                                    // 98
  }, function() {                                                                                                      // 99
    return [ "\n					", Spacebars.include(view.lookupTemplate("loading")), "\n				" ];                                 // 100
  }), "\n			"), "\n\n			", Spacebars.include(view.lookupTemplate("forward")), "\n\n		"), "\n	"), HTML.Raw("\n\n	<br>") ];
}));                                                                                                                   // 102
                                                                                                                       // 103
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"eingabe.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/eingabe/eingabe.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.eingabe.onCreated(function () {                                                                               // 1
	var template = Template.instance();                                                                                   // 2
	template.isAlphabetic = new ReactiveVar(true);                                                                        // 3
	template.isLength64 = new ReactiveVar(true);                                                                          // 4
                                                                                                                       //
	template.subscribe('dataDetail2');                                                                                    // 6
                                                                                                                       //
	template.autorun(function () {                                                                                        // 8
		template.subscribe('vocabularyAll'); // Vocabulary.find()                                                            // 9
		template.subscribe('ownedFavourites'); // Favourites.find()                                                          // 8
                                                                                                                       //
		Session.set(LENGTH_FAV, Favourites.find().count());                                                                  // 8
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                                  // 13
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.eingabe.helpers({                                                                                             // 17
	isAlphabetic: function () {                                                                                           // 18
		function isAlphabetic() {                                                                                            //
			return Template.instance().isAlphabetic.get();                                                                      // 19
		}                                                                                                                    //
                                                                                                                       //
		return isAlphabetic;                                                                                                 //
	}(),                                                                                                                  //
	isLength64: function () {                                                                                             // 21
		function isLength64() {                                                                                              //
			return Template.instance().isLength64.get();                                                                        // 22
		}                                                                                                                    //
                                                                                                                       //
		return isLength64;                                                                                                   //
	}(),                                                                                                                  //
	termPercent: function () {                                                                                            // 24
		function termPercent() {                                                                                             //
			return Math.floor(Session.get(COUNT_LETTERS_MATCH) / this.term.length * 100);                                       // 25
		}                                                                                                                    //
                                                                                                                       //
		return termPercent;                                                                                                  //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.eingabe.events({                                                                                              // 29
	'keyup [name="term"]': function () {                                                                                  // 30
		function keyupNameTerm(event, template) {                                                                            //
			var value = event.target.value.toLowerCase();                                                                       // 31
                                                                                                                       //
			if (value !== '') {                                                                                                 // 33
				// check if string is valid                                                                                        //
				if (Validate.isAlphabetic(value)) {                                                                                // 35
					template.isAlphabetic.set(true);                                                                                  // 36
				} else {                                                                                                           //
					template.isAlphabetic.set(false);                                                                                 // 38
				}                                                                                                                  //
				if (Validate.isLength64(value)) {                                                                                  // 40
					template.isLength64.set(true);                                                                                    // 41
				} else {                                                                                                           //
					template.isLength64.set(false);                                                                                   // 43
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			// TODO exclude spaces                                                                                              //
			// && event.keyCode === 13                                                                                          //
			if (value !== '') {                                                                                                 // 30
				if (template.isAlphabetic.get() && template.isLength64.get()) {                                                    // 50
					var term = this.term.toLowerCase();                                                                               // 51
                                                                                                                       //
					if (term === value) {                                                                                             // 53
						if (Session.get(TERM_WRONG)) {                                                                                   // 54
							Session.set(TERM_WRONG, false);                                                                                 // 55
						}                                                                                                                //
						Session.set(TERM_RIGHT, true);                                                                                   // 57
                                                                                                                       //
						setTimeout(function () {                                                                                         // 59
							Session.set(REVEALED, false);                                                                                   // 60
							Session.set(TERM_RIGHT, false);                                                                                 // 61
							event.target.value = "";                                                                                        // 62
                                                                                                                       //
							var val = 0;                                                                                                    // 64
							if (Session.get(RANDOM_FAV)) {                                                                                  // 65
								val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 66
								Session.set(COUNT_VIEWED, val);                                                                                // 67
							} else {                                                                                                        //
								val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                           // 69
								Session.set(COUNT_VIEWED, val);                                                                                // 70
							}                                                                                                               //
						}, 1000);                                                                                                        //
					} else {                                                                                                          //
						Session.set(TERM_WRONG, true);                                                                                   // 75
                                                                                                                       //
						var termArray = R.split('', term);                                                                               // 77
						var f = function () {                                                                                            // 78
							function f(x, y) {                                                                                              // 78
								var space = "_";                                                                                               // 79
								if (x === y) {                                                                                                 // 80
									return x;                                                                                                     // 81
								} else {                                                                                                       //
									return space;                                                                                                 // 83
								}                                                                                                              //
							}                                                                                                               //
                                                                                                                       //
							return f;                                                                                                       //
						}();                                                                                                             //
						var cheese = R.zipWith(f, term, value);                                                                          // 86
						while (cheese.length < term.length) {                                                                            // 87
							cheese = R.append('_', cheese);                                                                                 // 88
						}                                                                                                                //
                                                                                                                       //
						var countMatch = term.length - R.filter(R.equals('_'), cheese).length;                                           // 91
						Session.set(COUNT_LETTERS_MATCH, countMatch);                                                                    // 92
                                                                                                                       //
						cheese = R.join(' ', cheese);                                                                                    // 94
						Session.set(TERM_CACHE, cheese);                                                                                 // 95
					}                                                                                                                 //
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			if (value === '') {                                                                                                 // 101
				template.isAlphabetic.set(true);                                                                                   // 102
				template.isLength64.set(true);                                                                                     // 103
                                                                                                                       //
				var _cheese = '';                                                                                                  // 105
				while (_cheese.length < this.term.length) {                                                                        // 106
					_cheese = R.append('_', _cheese);                                                                                 // 107
				}                                                                                                                  //
				_cheese = R.join(' ', _cheese);                                                                                    // 109
				Session.set(TERM_CACHE, _cheese);                                                                                  // 110
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return keyupNameTerm;                                                                                                //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"register":{"letter_collapse.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/register/template.letter_collapse.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("letterCollapse");                                                                                // 2
Template["letterCollapse"] = new Template("Template.letterCollapse", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "panel-body"                                                                                              // 6
  }, "\n    ", Blaze.Each(function() {                                                                                 // 7
    return Spacebars.call(view.lookup("entries"));                                                                     // 8
  }, function() {                                                                                                      // 9
    return [ "\n      ", HTML.LI({                                                                                     // 10
      "class": "list-group-item clearfix"                                                                              // 11
    }, "\n        ", HTML.DIV({                                                                                        // 12
      "class": "media"                                                                                                 // 13
    }, "\n          ", HTML.DIV({                                                                                      // 14
      "class": "media-body"                                                                                            // 15
    }, "\n            ", HTML.A({                                                                                      // 16
      href: function() {                                                                                               // 17
        return [ "/register/", Spacebars.mustache(view.lookup("_id")) ];                                               // 18
      }                                                                                                                // 19
    }, "\n              ", HTML.H4({                                                                                   // 20
      "class": "media-heading"                                                                                         // 21
    }, Blaze.View("lookup:term", function() {                                                                          // 22
      return Spacebars.mustache(view.lookup("term"));                                                                  // 23
    })), " ", Blaze.View("lookup:description", function() {                                                            // 24
      return Spacebars.mustache(view.lookup("description"));                                                           // 25
    }), "\n            "), "\n          "), "\n          ", Blaze.If(function() {                                      // 26
      return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));               // 27
    }, function() {                                                                                                    // 28
      return [ "\n            ", HTML.DIV({                                                                            // 29
        "class": "media-right media-middle btn-delete"                                                                 // 30
      }, "\n                ", HTML.I({                                                                                // 31
        "class": "fa fa-trash-o fa-4x"                                                                                 // 32
      }), "\n            "), "\n          " ];                                                                         // 33
    }, function() {                                                                                                    // 34
      return [ "\n            ", HTML.DIV({                                                                            // 35
        "class": "media-right media-middle btn-insert"                                                                 // 36
      }, "\n                ", HTML.I({                                                                                // 37
        "class": "fa fa-heart-o fa-4x"                                                                                 // 38
      }), "\n            "), "\n          " ];                                                                         // 39
    }), "\n        "), "\n      "), "\n    " ];                                                                        // 40
  }), "\n  ");                                                                                                         // 41
}));                                                                                                                   // 42
                                                                                                                       // 43
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"letter_list.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/register/template.letter_list.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("letterList");                                                                                    // 2
Template["letterList"] = new Template("Template.letterList", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return [ HTML.H3(Blaze.View("lookup:letter", function() {                                                            // 5
    return Spacebars.mustache(view.lookup("letter"));                                                                  // 6
  })), "\n	", Blaze.Each(function() {                                                                                  // 7
    return Spacebars.call(view.lookup("entries"));                                                                     // 8
  }, function() {                                                                                                      // 9
    return [ "\n		", HTML.LI({                                                                                         // 10
      "class": "list-group-item clearfix"                                                                              // 11
    }, "\n			", HTML.DIV({                                                                                             // 12
      "class": "media"                                                                                                 // 13
    }, "\n				", HTML.DIV({                                                                                            // 14
      "class": "media-body"                                                                                            // 15
    }, "\n					", HTML.A({                                                                                             // 16
      href: function() {                                                                                               // 17
        return [ "/register/", Spacebars.mustache(view.lookup("_id")) ];                                               // 18
      }                                                                                                                // 19
    }, "\n						", HTML.H4({                                                                                           // 20
      "class": "media-heading"                                                                                         // 21
    }, Blaze.View("lookup:term", function() {                                                                          // 22
      return Spacebars.mustache(view.lookup("term"));                                                                  // 23
    })), "\n						", Blaze.View("lookup:description", function() {                                                     // 24
      return Spacebars.mustache(view.lookup("description"));                                                           // 25
    }), "\n					"), "\n				"), "\n				", Blaze.If(function() {                                                         // 26
      return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));               // 27
    }, function() {                                                                                                    // 28
      return [ "\n					", HTML.DIV({                                                                                   // 29
        "class": "media-right media-middle btn-delete"                                                                 // 30
      }, "\n							", HTML.I({                                                                                         // 31
        "class": "fa fa-trash-o fa-4x"                                                                                 // 32
      }), "\n					"), "\n				" ];                                                                                      // 33
    }, function() {                                                                                                    // 34
      return [ "\n					", HTML.DIV({                                                                                   // 35
        "class": "media-right media-middle btn-insert"                                                                 // 36
      }, "\n							", HTML.I({                                                                                         // 37
        "class": "fa fa-heart-o fa-4x"                                                                                 // 38
      }), "\n					"), "\n				" ];                                                                                      // 39
    }), "\n			"), "\n		"), "\n	" ];                                                                                    // 40
  }) ];                                                                                                                // 41
}));                                                                                                                   // 42
                                                                                                                       // 43
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"register.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/register/template.register.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("register");                                                                                      // 2
Template["register"] = new Template("Template.register", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, HTML.Raw('\n    <div class="page-header clearfix">\n\n        <input type="text" name="search" class="form-control" width="300px" placeholder="Finde einen Begriff...">\n\n    </div>\n\n      '), Blaze.Unless(function() {
    return Spacebars.call(view.lookup("isAlphabetic"));                                                                // 8
  }, function() {                                                                                                      // 9
    return [ "\n      ", HTML.P({                                                                                      // 10
      "class": "alert alert-warning"                                                                                   // 11
    }, "Der Suchbegriff darf nur Zeichen des Alphabets (a - Z)enthalten. Keine Leer- und Sonderzeichen."), "\n      " ];
  }), "\n      ", Blaze.Unless(function() {                                                                            // 13
    return Spacebars.call(view.lookup("isLength64"));                                                                  // 14
  }, function() {                                                                                                      // 15
    return [ "\n      ", HTML.P({                                                                                      // 16
      "class": "alert alert-warning"                                                                                   // 17
    }, "Der Suchbegriff darf nicht mehr als 64 Zeichen enthalten."), "\n      " ];                                     // 18
  }), HTML.Raw("\n\n\n<!-- favourites -->\n  "), Blaze.If(function() {                                                 // 19
    return Spacebars.dataMustache(view.lookup("getSession"), "lengthFav");                                             // 20
  }, function() {                                                                                                      // 21
    return [ "\n  ", HTML.DIV({                                                                                        // 22
      "class": function() {                                                                                            // 23
        return [ "col-xs-12 ", Blaze.If(function() {                                                                   // 24
          return Spacebars.dataMustache(view.lookup("getSession"), "lengthNotFav");                                    // 25
        }, function() {                                                                                                // 26
          return "col-sm-6";                                                                                           // 27
        }) ];                                                                                                          // 28
      }                                                                                                                // 29
    }, "\n    ", HTML.DIV({                                                                                            // 30
      "class": "page-header clearfix"                                                                                  // 31
    }, "\n      ", HTML.H4({                                                                                           // 32
      "class": "pull-left"                                                                                             // 33
    }, "Favouriten"), "\n    "), "\n\n    ", Blaze.If(function() {                                                     // 34
      return Spacebars.call(view.templateInstance().subscriptionsReady());                                             // 35
    }, function() {                                                                                                    // 36
      return [ "\n      ", Blaze.If(function() {                                                                       // 37
        return Spacebars.call(view.lookup("query"));                                                                   // 38
      }, function() {                                                                                                  // 39
        return [ "\n        ", HTML.UL({                                                                               // 40
          "class": "list-group"                                                                                        // 41
        }, "\n          ", Blaze.If(function() {                                                                       // 42
          return Spacebars.call(view.lookup("searching"));                                                             // 43
        }, function() {                                                                                                // 44
          return [ "\n            ", Spacebars.include(view.lookupTemplate("loading")), "\n          " ];              // 45
        }, function() {                                                                                                // 46
          return [ "\n            ", Blaze.Each(function() {                                                           // 47
            return Spacebars.call(Spacebars.dot(view.lookup("vocabulary"), "fav"));                                    // 48
          }, function() {                                                                                              // 49
            return [ "\n              ", Spacebars.include(view.lookupTemplate("letterList")), "\n            " ];     // 50
          }, function() {                                                                                              // 51
            return [ "\n              ", HTML.P({                                                                      // 52
              "class": "alert alert-warning"                                                                           // 53
            }, 'Nichts gefunden unter dem Begriff " ', Blaze.View("lookup:query", function() {                         // 54
              return Spacebars.mustache(view.lookup("query"));                                                         // 55
            }), ' ".'), "\n            " ];                                                                            // 56
          }), "\n          " ];                                                                                        // 57
        }), "\n        "), "\n\n      " ];                                                                             // 58
      }, function() {                                                                                                  // 59
        return [ "\n\n        ", Blaze.If(function() {                                                                 // 60
          return Spacebars.call(view.lookup("favLengthShort"));                                                        // 61
        }, function() {                                                                                                // 62
          return [ "\n          ", Blaze.Each(function() {                                                             // 63
            return Spacebars.call(Spacebars.dot(view.lookup("vocabulary"), "fav"));                                    // 64
          }, function() {                                                                                              // 65
            return [ "\n            ", Spacebars.include(view.lookupTemplate("letterList")), "\n          " ];         // 66
          }), "\n        " ];                                                                                          // 67
        }, function() {                                                                                                // 68
          return [ "\n          ", HTML.DIV({                                                                          // 69
            "class": "panel-group",                                                                                    // 70
            id: "accordion"                                                                                            // 71
          }, "\n            ", Blaze.Each(function() {                                                                 // 72
            return Spacebars.call(Spacebars.dot(view.lookup("vocabulary"), "fav"));                                    // 73
          }, function() {                                                                                              // 74
            return [ "\n              ", HTML.DIV({                                                                    // 75
              "class": "panel panel-default"                                                                           // 76
            }, "\n                ", HTML.DIV({                                                                        // 77
              "class": "panel-heading"                                                                                 // 78
            }, "\n                  ", HTML.A({                                                                        // 79
              "data-toggle": "collapse",                                                                               // 80
              "data-parent": "#accordion",                                                                             // 81
              href: function() {                                                                                       // 82
                return [ "#collapse-fav-", Spacebars.mustache(view.lookup("letter")) ];                                // 83
              }                                                                                                        // 84
            }, "\n                  ", HTML.H4({                                                                       // 85
              "class": "panel-title"                                                                                   // 86
            }, "\n                    ", Blaze.View("lookup:letter", function() {                                      // 87
              return Spacebars.mustache(view.lookup("letter"));                                                        // 88
            }), "\n                  "), "\n                  "), "\n                "), "\n                ", HTML.DIV({
              id: function() {                                                                                         // 90
                return [ "collapse-fav-", Spacebars.mustache(view.lookup("letter")) ];                                 // 91
              },                                                                                                       // 92
              "class": "panel-collapse collapse"                                                                       // 93
            }, "\n                  ", Spacebars.include(view.lookupTemplate("letterCollapse")), "\n                "), "\n              "), "\n            " ];
          }), "\n          "), "\n        " ];                                                                         // 95
        }), "\n\n      " ];                                                                                            // 96
      }), "\n    " ];                                                                                                  // 97
    }, function() {                                                                                                    // 98
      return [ "\n      ", Spacebars.include(view.lookupTemplate("loading")), "\n    " ];                              // 99
    }), "\n\n  "), "\n  " ];                                                                                           // 100
  }), HTML.Raw("\n\n\n\n    <!-- not favourites -->\n  "), Blaze.If(function() {                                       // 101
    return Spacebars.dataMustache(view.lookup("getSession"), "lengthNotFav");                                          // 102
  }, function() {                                                                                                      // 103
    return [ "\n  ", HTML.DIV({                                                                                        // 104
      "class": function() {                                                                                            // 105
        return [ "col-xs-12 ", Blaze.If(function() {                                                                   // 106
          return Spacebars.dataMustache(view.lookup("getSession"), "lengthFav");                                       // 107
        }, function() {                                                                                                // 108
          return "col-sm-6";                                                                                           // 109
        }) ];                                                                                                          // 110
      }                                                                                                                // 111
    }, "\n    ", HTML.DIV({                                                                                            // 112
      "class": "page-header clearfix"                                                                                  // 113
    }, "\n      ", HTML.H4({                                                                                           // 114
      "class": "pull-left"                                                                                             // 115
    }, "Nicht-Favouriten"), "\n    "), "\n\n      ", Blaze.If(function() {                                             // 116
      return Spacebars.call(view.templateInstance().subscriptionsReady());                                             // 117
    }, function() {                                                                                                    // 118
      return [ "\n        ", Blaze.If(function() {                                                                     // 119
        return Spacebars.call(view.lookup("query"));                                                                   // 120
      }, function() {                                                                                                  // 121
        return [ "\n          ", HTML.UL({                                                                             // 122
          "class": "list-group"                                                                                        // 123
        }, "\n            ", Blaze.If(function() {                                                                     // 124
          return Spacebars.call(view.lookup("searching"));                                                             // 125
        }, function() {                                                                                                // 126
          return [ "\n              ", Spacebars.include(view.lookupTemplate("loading")), "\n            " ];          // 127
        }, function() {                                                                                                // 128
          return [ "\n              ", Blaze.Each(function() {                                                         // 129
            return Spacebars.call(Spacebars.dot(view.lookup("vocabulary"), "notFav"));                                 // 130
          }, function() {                                                                                              // 131
            return [ "\n                ", Spacebars.include(view.lookupTemplate("letterList")), "\n              " ];
          }, function() {                                                                                              // 133
            return [ "\n                ", HTML.P({                                                                    // 134
              "class": "alert alert-warning"                                                                           // 135
            }, 'Nichts gefunden unter dem Begriff " ', Blaze.View("lookup:query", function() {                         // 136
              return Spacebars.mustache(view.lookup("query"));                                                         // 137
            }), ' ".'), "\n              " ];                                                                          // 138
          }), "\n            " ];                                                                                      // 139
        }), "\n          "), "\n\n        " ];                                                                         // 140
      }, function() {                                                                                                  // 141
        return [ "\n\n          ", Blaze.If(function() {                                                               // 142
          return Spacebars.call(view.lookup("notFavLengthShort"));                                                     // 143
        }, function() {                                                                                                // 144
          return [ "\n            ", Blaze.Each(function() {                                                           // 145
            return Spacebars.call(Spacebars.dot(view.lookup("vocabulary"), "notFav"));                                 // 146
          }, function() {                                                                                              // 147
            return [ "\n              ", Spacebars.include(view.lookupTemplate("letterList")), "\n            " ];     // 148
          }), "\n          " ];                                                                                        // 149
        }, function() {                                                                                                // 150
          return [ "\n\n            ", HTML.DIV({                                                                      // 151
            "class": "panel-group",                                                                                    // 152
            id: "accordion"                                                                                            // 153
          }, "\n              ", Blaze.Each(function() {                                                               // 154
            return Spacebars.call(Spacebars.dot(view.lookup("vocabulary"), "notFav"));                                 // 155
          }, function() {                                                                                              // 156
            return [ "\n              ", HTML.DIV({                                                                    // 157
              "class": "panel panel-default"                                                                           // 158
            }, "\n                ", HTML.DIV({                                                                        // 159
              "class": "panel-heading"                                                                                 // 160
            }, "\n                  ", HTML.A({                                                                        // 161
              "data-toggle": "collapse",                                                                               // 162
              "data-parent": "#accordion",                                                                             // 163
              href: function() {                                                                                       // 164
                return [ "#collapse-not-fav-", Spacebars.mustache(view.lookup("letter")) ];                            // 165
              }                                                                                                        // 166
            }, "\n                  ", HTML.H4({                                                                       // 167
              "class": "panel-title"                                                                                   // 168
            }, "\n                    ", Blaze.View("lookup:letter", function() {                                      // 169
              return Spacebars.mustache(view.lookup("letter"));                                                        // 170
            }), "\n                  "), "\n                  "), "\n                "), "\n                ", HTML.DIV({
              id: function() {                                                                                         // 172
                return [ "collapse-not-fav-", Spacebars.mustache(view.lookup("letter")) ];                             // 173
              },                                                                                                       // 174
              "class": "panel-collapse collapse"                                                                       // 175
            }, "\n                  ", Spacebars.include(view.lookupTemplate("letterCollapse")), "\n                "), "\n              "), "\n              " ];
          }), "\n            "), "\n\n          " ];                                                                   // 177
        }), "\n        " ];                                                                                            // 178
      }), "\n      " ];                                                                                                // 179
    }, function() {                                                                                                    // 180
      return [ "\n        ", Spacebars.include(view.lookupTemplate("loading")), "\n      " ];                          // 181
    }), "\n  "), "\n  " ];                                                                                             // 182
  }), "\n\n");                                                                                                         // 183
}));                                                                                                                   // 184
                                                                                                                       // 185
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vokabel_detail.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/register/template.vokabel_detail.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("vokabelDetail");                                                                                 // 2
Template["vokabelDetail"] = new Template("Template.vokabelDetail", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, "\n		", Blaze.If(function() {                                                                                     // 7
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 8
  }, function() {                                                                                                      // 9
    return [ "\n		    ", Spacebars.With(function() {                                                                   // 10
      return Spacebars.call(view.lookup("entry"));                                                                     // 11
    }, function() {                                                                                                    // 12
      return [ "\n		      ", HTML.H3(Blaze.View("lookup:term", function() {                                            // 13
        return Spacebars.mustache(view.lookup("term"));                                                                // 14
      })), "\n		      ", HTML.P(Blaze.View("lookup:description", function() {                                          // 15
        return Spacebars.mustache(view.lookup("description"));                                                         // 16
      })), "\n		    " ];                                                                                               // 17
    }), "\n		  " ];                                                                                                    // 18
  }, function() {                                                                                                      // 19
    return [ "\n		      ", Spacebars.include(view.lookupTemplate("loading")), "\n		  " ];                              // 20
  }), HTML.Raw("\n\n			<p>\n				noch weitere Details.\n				<ul>\n					<li>Fav button</li>\n					<li>Beispielsatz</li>\n					<li>Synonym</li>\n				</ul>\n			</p>\n\n	"));
}));                                                                                                                   // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"register.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/register/register.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.register.onCreated(function () {                                                                              // 1
	var template = Template.instance();                                                                                   // 2
                                                                                                                       //
	template.searchQuery = new ReactiveVar();                                                                             // 4
	template.searching = new ReactiveVar(false);                                                                          // 5
	template.isAlphabetic = new ReactiveVar(true);                                                                        // 6
	template.isLength64 = new ReactiveVar(true);                                                                          // 7
                                                                                                                       //
	Tracker.autorun(function () {                                                                                         // 9
		template.subscribe('vocabularyRegister', template.searchQuery.get(), function () {                                   // 10
			setTimeout(function () {                                                                                            // 11
				template.searching.set(false);                                                                                     // 12
			}, 300);                                                                                                            //
		});                                                                                                                  //
		template.subscribe('ownedFavourites'); // Favourites.find()                                                          // 15
	});                                                                                                                   // 9
});                                                                                                                    //
                                                                                                                       //
Template.register.helpers({                                                                                            // 19
	searching: function () {                                                                                              // 20
		function searching() {                                                                                               //
			return Template.instance().searching.get();                                                                         // 21
		}                                                                                                                    //
                                                                                                                       //
		return searching;                                                                                                    //
	}(),                                                                                                                  //
	query: function () {                                                                                                  // 23
		function query() {                                                                                                   //
			return Template.instance().searchQuery.get();                                                                       // 24
		}                                                                                                                    //
                                                                                                                       //
		return query;                                                                                                        //
	}(),                                                                                                                  //
	isAlphabetic: function () {                                                                                           // 26
		function isAlphabetic() {                                                                                            //
			return Template.instance().isAlphabetic.get();                                                                      // 27
		}                                                                                                                    //
                                                                                                                       //
		return isAlphabetic;                                                                                                 //
	}(),                                                                                                                  //
	isLength64: function () {                                                                                             // 29
		function isLength64() {                                                                                              //
			return Template.instance().isLength64.get();                                                                        // 30
		}                                                                                                                    //
                                                                                                                       //
		return isLength64;                                                                                                   //
	}(),                                                                                                                  //
	favLengthShort: function () {                                                                                         // 32
		function favLengthShort() {                                                                                          //
			return Session.get(LENGTH_FAV) < 5;                                                                                 // 33
		}                                                                                                                    //
                                                                                                                       //
		return favLengthShort;                                                                                               //
	}(),                                                                                                                  //
	notFavLengthShort: function () {                                                                                      // 35
		function notFavLengthShort() {                                                                                       //
			return Session.get(LENGTH_NOT_FAV) < 5;                                                                             // 36
		}                                                                                                                    //
                                                                                                                       //
		return notFavLengthShort;                                                                                            //
	}(),                                                                                                                  //
	vocabulary: function () {                                                                                             // 38
		function vocabulary() {                                                                                              //
			// Sort and group entries by letter and create a new array of iterable objects for cascaded template iteration      //
			var vocabularyIndexed = [];                                                                                         // 40
			vocabularyIndexed.fav = [];                                                                                         // 41
			vocabularyIndexed.notFav = [];                                                                                      // 42
                                                                                                                       //
			var favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());                                                  // 45
                                                                                                                       //
			var alphabet = R.split('', 'abcdefghijklmnopqrstuvwxyz'.toUpperCase());                                             // 47
			var regex = function () {                                                                                           // 48
				function regex(letter) {                                                                                           // 48
					return new RegExp("^" + letter, "i");                                                                             //
				}                                                                                                                  //
                                                                                                                       //
				return regex;                                                                                                      //
			}();                                                                                                                //
                                                                                                                       //
			alphabet.forEach(function (entry) {                                                                                 // 50
				var arrayFav = Vocabulary.find({                                                                                   // 51
					term: {                                                                                                           // 52
						$in: [regex(entry)]                                                                                              // 53
					},                                                                                                                //
					_id: {                                                                                                            // 55
						$in: favIds                                                                                                      // 56
					}                                                                                                                 //
				}, {                                                                                                               //
					sort: {                                                                                                           // 59
						term: 1                                                                                                          // 60
					}                                                                                                                 //
				});                                                                                                                //
				if (arrayFav.count() !== 0) {                                                                                      // 63
					vocabularyIndexed.fav.push({                                                                                      // 64
						'letter': entry,                                                                                                 // 65
						'entries': arrayFav                                                                                              // 66
					});                                                                                                               //
				}                                                                                                                  //
			});                                                                                                                 //
			alphabet.forEach(function (entry) {                                                                                 // 70
				var arrayNotFav = Vocabulary.find({                                                                                // 71
					term: {                                                                                                           // 72
						$in: [regex(entry)]                                                                                              // 73
					},                                                                                                                //
					_id: {                                                                                                            // 75
						$nin: favIds                                                                                                     // 76
					}                                                                                                                 //
				}, {                                                                                                               //
					sort: {                                                                                                           // 79
						term: 1                                                                                                          // 80
					}                                                                                                                 //
				});                                                                                                                //
				if (arrayNotFav.count() !== 0) {                                                                                   // 83
					vocabularyIndexed.notFav.push({                                                                                   // 84
						'letter': entry,                                                                                                 // 85
						'entries': arrayNotFav                                                                                           // 86
					});                                                                                                               //
				}                                                                                                                  //
			});                                                                                                                 //
                                                                                                                       //
			if (vocabularyIndexed) {                                                                                            // 91
				return vocabularyIndexed;                                                                                          // 92
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return vocabulary;                                                                                                   //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.register.events({                                                                                             // 97
	'keyup [name="search"]': function () {                                                                                // 98
		function keyupNameSearch(event, template) {                                                                          //
			var value = event.target.value;                                                                                     // 99
			if (value !== '') {                                                                                                 // 100
				// check if string is valid                                                                                        //
				if (Validate.isAlphabetic(value)) {                                                                                // 102
					template.isAlphabetic.set(true);                                                                                  // 103
				} else {                                                                                                           //
					template.isAlphabetic.set(false);                                                                                 // 105
				}                                                                                                                  //
				if (Validate.isLength64(value)) {                                                                                  // 107
					template.isLength64.set(true);                                                                                    // 108
				} else {                                                                                                           //
					template.isLength64.set(false);                                                                                   // 110
				}                                                                                                                  //
			}                                                                                                                   //
			// && event.keyCode === 13                                                                                          //
			if (value !== '') {                                                                                                 // 98
				if (template.isAlphabetic.get() && template.isLength64.get()) {                                                    // 115
					template.searchQuery.set(value);                                                                                  // 116
					template.searching.set(true);                                                                                     // 117
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			if (value === '') {                                                                                                 // 121
				template.searchQuery.set(value);                                                                                   // 122
				template.isAlphabetic.set(true);                                                                                   // 123
				template.isLength64.set(true);                                                                                     // 124
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return keyupNameSearch;                                                                                              //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vokabel_detail.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/register/vokabel_detail.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.vokabelDetail.onCreated(function () {                                                                         // 1
  var self = this;                                                                                                     // 2
  self.autorun(function () {                                                                                           // 3
    var entryId = FlowRouter.getParam('id');                                                                           // 4
    self.subscribe('singleEntry', entryId);                                                                            // 5
  });                                                                                                                  //
});                                                                                                                    //
                                                                                                                       //
Template.vokabelDetail.helpers({                                                                                       // 9
  entry: function () {                                                                                                 // 10
    function entry() {                                                                                                 //
      var entryId = FlowRouter.getParam('id');                                                                         // 11
      var entry = Vocabulary.findOne({ _id: entryId }) || {};                                                          // 12
      return entry;                                                                                                    // 13
    }                                                                                                                  //
                                                                                                                       //
    return entry;                                                                                                      //
  }()                                                                                                                  //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"low":{"modes":{"modus_definition.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/modes/template.modus_definition.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusDefinition");                                                                               // 2
Template["modusDefinition"] = new Template("Template.modusDefinition", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "jumbotron"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "text-center media-middle"                                                                                // 8
  }, "\n			", Blaze.If(function() {                                                                                    // 9
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 10
  }, function() {                                                                                                      // 11
    return HTML.SPAN({                                                                                                 // 12
      "class": "label label-warning text-center"                                                                       // 13
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 14
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 15
    }, function() {                                                                                                    // 16
      return "Favoriten";                                                                                              // 17
    }, function() {                                                                                                    // 18
      return "Nicht-Favoriten";                                                                                        // 19
    }));                                                                                                               // 20
  }), "\n				", HTML.H2("\n					", Blaze.View("lookup:term", function() {                                              // 21
    return Spacebars.mustache(view.lookup("term"));                                                                    // 22
  }), "\n				"), "\n		"), HTML.Raw("\n		<hr>\n		"), Blaze.Unless(function() {                                          // 23
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 24
  }, function() {                                                                                                      // 25
    return [ "\n		", HTML.DIV({                                                                                        // 26
      "class": "text-center media-middle"                                                                              // 27
    }, "\n			", HTML.DIV({                                                                                             // 28
      "class": "btn-reveal"                                                                                            // 29
    }, "\n				", HTML.I({                                                                                              // 30
      "class": "fa fa-question fa-4x"                                                                                  // 31
    }), HTML.SPAN({                                                                                                    // 32
      "class": "label label-info"                                                                                      // 33
    }, "Gesucht: Bedeutung"), "\n			"), "\n		"), "\n		" ];                                                             // 34
  }, function() {                                                                                                      // 35
    return [ "\n		", HTML.H3("\n			", HTML.OL("\n				", HTML.LI(Blaze.View("lookup:description", function() {          // 36
      return Spacebars.mustache(view.lookup("description"));                                                           // 37
    })), "\n			"), "\n		"), "\n		" ];                                                                                  // 38
  }), "\n	");                                                                                                          // 39
}));                                                                                                                   // 40
                                                                                                                       // 41
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"modus_lesen.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/modes/template.modus_lesen.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusLesen");                                                                                    // 2
Template["modusLesen"] = new Template("Template.modusLesen", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "jumbotron"                                                                                               // 6
  }, "\n		", Blaze.If(function() {                                                                                     // 7
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 8
  }, function() {                                                                                                      // 9
    return HTML.SPAN({                                                                                                 // 10
      "class": "label label-warning text-center"                                                                       // 11
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 12
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 13
    }, function() {                                                                                                    // 14
      return "Favoriten";                                                                                              // 15
    }, function() {                                                                                                    // 16
      return "Nicht-Favoriten";                                                                                        // 17
    }));                                                                                                               // 18
  }), "\n		", HTML.H2({                                                                                                // 19
    "class": "text-center"                                                                                             // 20
  }, "\n			", Blaze.View("lookup:term", function() {                                                                   // 21
    return Spacebars.mustache(view.lookup("term"));                                                                    // 22
  }), "\n			", Blaze.If(function() {                                                                                   // 23
    return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                      // 24
  }, function() {                                                                                                      // 25
    return [ "\n				", HTML.DIV({                                                                                      // 26
      "class": "btn-delete text-center"                                                                                // 27
    }, "\n					", HTML.I({                                                                                             // 28
      "class": "fa fa-trash-o fa-2x"                                                                                   // 29
    }), "\n				"), "\n			" ];                                                                                          // 30
  }, function() {                                                                                                      // 31
    return [ "\n				", HTML.DIV({                                                                                      // 32
      "class": "btn-insert text-center"                                                                                // 33
    }, "\n						", HTML.I({                                                                                            // 34
      "class": "fa fa-heart-o fa-2x"                                                                                   // 35
    }), "\n				"), "\n			" ];                                                                                          // 36
  }), "\n		"), HTML.Raw("\n		<hr>\n		"), HTML.H3("\n			", HTML.OL("\n				", HTML.LI(Blaze.View("lookup:description", function() {
    return Spacebars.mustache(view.lookup("description"));                                                             // 38
  })), "\n			"), "\n		"), "\n	");                                                                                      // 39
}));                                                                                                                   // 40
                                                                                                                       // 41
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"modus_wort.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/modes/template.modus_wort.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusWort");                                                                                     // 2
Template["modusWort"] = new Template("Template.modusWort", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "jumbotron"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "text-center media-middle"                                                                                // 8
  }, "\n			", Blaze.If(function() {                                                                                    // 9
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 10
  }, function() {                                                                                                      // 11
    return HTML.SPAN({                                                                                                 // 12
      "class": "label label-warning text-center"                                                                       // 13
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 14
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 15
    }, function() {                                                                                                    // 16
      return "Favoriten";                                                                                              // 17
    }, function() {                                                                                                    // 18
      return "Nicht-Favoriten";                                                                                        // 19
    }));                                                                                                               // 20
  }), "\n\n			", Blaze.Unless(function() {                                                                             // 21
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 22
  }, function() {                                                                                                      // 23
    return [ "\n			", HTML.DIV({                                                                                       // 24
      "class": "btn-reveal"                                                                                            // 25
    }, "\n				", HTML.I({                                                                                              // 26
      "class": "fa fa-question fa-4x"                                                                                  // 27
    }), HTML.SPAN({                                                                                                    // 28
      "class": "label label-info"                                                                                      // 29
    }, "Gesucht: Wort"), "\n			"), "\n			" ];                                                                          // 30
  }, function() {                                                                                                      // 31
    return [ "\n				", HTML.H2("\n					", Blaze.View("lookup:term", function() {                                       // 32
      return Spacebars.mustache(view.lookup("term"));                                                                  // 33
    }), "\n				"), "\n			" ];                                                                                          // 34
  }), "\n		"), HTML.Raw("\n\n		<hr>\n\n		"), HTML.H3("\n		", HTML.OL("\n			", HTML.LI(Blaze.View("lookup:description", function() {
    return Spacebars.mustache(view.lookup("description"));                                                             // 36
  })), "\n		"), "\n	"), "\n	");                                                                                        // 37
}));                                                                                                                   // 38
                                                                                                                       // 39
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"low.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/template.low.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("low");                                                                                           // 2
Template["low"] = new Template("Template.low", (function() {                                                           // 3
  var view = this;                                                                                                     // 4
  return [ HTML.DIV({                                                                                                  // 5
    "class": "container"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "media"                                                                                                   // 8
  }, "\n\n			", Spacebars.include(view.lookupTemplate("backward")), "\n\n			", HTML.DIV({                              // 9
    "class": "media-body"                                                                                              // 10
  }, "\n				", Blaze.If(function() {                                                                                   // 11
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 12
  }, function() {                                                                                                      // 13
    return [ "\n					", Spacebars.With(function() {                                                                    // 14
      return Spacebars.call(view.lookup("entry"));                                                                     // 15
    }, function() {                                                                                                    // 16
      return [ "\n						", Blaze.If(function() {                                                                       // 17
        return Spacebars.dataMustache(view.lookup("getSession"), "lesen");                                             // 18
      }, function() {                                                                                                  // 19
        return [ "\n							", Spacebars.include(view.lookupTemplate("modusLesen")), "\n						" ];                      // 20
      }), "\n						", Blaze.If(function() {                                                                            // 21
        return Spacebars.dataMustache(view.lookup("getSession"), "wort");                                              // 22
      }, function() {                                                                                                  // 23
        return [ "\n							", Spacebars.include(view.lookupTemplate("modusWort")), "\n						" ];                       // 24
      }), "\n						", Blaze.If(function() {                                                                            // 25
        return Spacebars.dataMustache(view.lookup("getSession"), "definition");                                        // 26
      }, function() {                                                                                                  // 27
        return [ "\n							", Spacebars.include(view.lookupTemplate("modusDefinition")), "\n						" ];                 // 28
      }), "\n					" ];                                                                                                 // 29
    }), "\n				" ];                                                                                                    // 30
  }, function() {                                                                                                      // 31
    return [ "\n					", Spacebars.include(view.lookupTemplate("loading")), "\n				" ];                                 // 32
  }), "\n			"), "\n\n			", Spacebars.include(view.lookupTemplate("forward")), "\n\n		"), "\n	"), HTML.Raw("\n\n	<br>") ];
}));                                                                                                                   // 34
                                                                                                                       // 35
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"low.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/low.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.low.onCreated(function () {                                                                                   // 1
	var template = Template.instance();                                                                                   // 2
                                                                                                                       //
	template.autorun(function () {                                                                                        // 4
		template.subscribe('vocabularyAll'); // Vocabulary.find()                                                            // 5
		template.subscribe('ownedFavourites'); // Favourites.find()                                                          // 4
                                                                                                                       //
		Session.set(LENGTH_FAV, Favourites.find().count());                                                                  // 4
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                                  // 9
	});                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"_shared":{"backward.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/_shared/template.backward.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("backward");                                                                                      // 2
Template["backward"] = new Template("Template.backward", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 6
  }, function() {                                                                                                      // 7
    return [ "\n		", HTML.DIV({                                                                                        // 8
      "class": "media-left media-middle"                                                                               // 9
    }, "\n			", HTML.I({                                                                                               // 10
      "class": "fa fa-ban fa-4x"                                                                                       // 11
    }), "\n		"), "\n	" ];                                                                                              // 12
  }, function() {                                                                                                      // 13
    return [ "\n		", Spacebars.With(function() {                                                                       // 14
      return Spacebars.call(view.lookup("entry"));                                                                     // 15
    }, function() {                                                                                                    // 16
      return [ "\n			", HTML.DIV({                                                                                     // 17
        "class": "media-left media-middle btn-backward"                                                                // 18
      }, "\n				", HTML.I({                                                                                            // 19
        "class": "fa fa-chevron-left fa-4x"                                                                            // 20
      }), "\n			"), "\n		" ];                                                                                          // 21
    }), "\n	" ];                                                                                                       // 22
  });                                                                                                                  // 23
}));                                                                                                                   // 24
                                                                                                                       // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"forward.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/_shared/template.forward.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("forward");                                                                                       // 2
Template["forward"] = new Template("Template.forward", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 6
  }, function() {                                                                                                      // 7
    return [ "\n		", HTML.DIV({                                                                                        // 8
      "class": "media-right media-middle"                                                                              // 9
    }, "\n			", HTML.I({                                                                                               // 10
      "class": "fa fa-ban fa-4x"                                                                                       // 11
    }), "\n		"), "\n	" ];                                                                                              // 12
  }, function() {                                                                                                      // 13
    return [ "\n		", Spacebars.With(function() {                                                                       // 14
      return Spacebars.call(view.lookup("entry"));                                                                     // 15
    }, function() {                                                                                                    // 16
      return [ "\n			", HTML.DIV({                                                                                     // 17
        "class": "media-right media-middle btn-forward"                                                                // 18
      }, "\n				", HTML.I({                                                                                            // 19
        "class": "fa fa-chevron-right fa-4x"                                                                           // 20
      }), "\n			"), "\n		" ];                                                                                          // 21
    }), "\n	" ];                                                                                                       // 22
  });                                                                                                                  // 23
}));                                                                                                                   // 24
                                                                                                                       // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"layout":{"bar.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.bar.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("bar");                                                                                           // 2
Template["bar"] = new Template("Template.bar", (function() {                                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container fluid"                                                                                         // 6
  }, "\n  ", HTML.A({                                                                                                  // 7
    href: function() {                                                                                                 // 8
      return Blaze.If(function() {                                                                                     // 9
        return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                     // 10
      }, function() {                                                                                                  // 11
        return Blaze.View("lookup:getSession", function() {                                                            // 12
          return Spacebars.mustache(view.lookup("getSession"), "lastPath");                                            // 13
        });                                                                                                            // 14
      }, function() {                                                                                                  // 15
        return "/low";                                                                                                 // 16
      });                                                                                                              // 17
    }                                                                                                                  // 18
  }, "\n    ", HTML.NAV({                                                                                              // 19
    "class": function() {                                                                                              // 20
      return [ "navbar navbar-default navbar-fixed-top ", Blaze.If(function() {                                        // 21
        return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                     // 22
      }, function() {                                                                                                  // 23
        return "alert-success";                                                                                        // 24
      }, function() {                                                                                                  // 25
        return "alert-info";                                                                                           // 26
      }), " text-center attention-mode" ];                                                                             // 27
    }                                                                                                                  // 28
  }, "\n      ", HTML.DIV({                                                                                            // 29
    "class": "container"                                                                                               // 30
  }, "\n        ", HTML.DIV({                                                                                          // 31
    "class": "text-center"                                                                                             // 32
  }, "\n          ", Blaze.If(function() {                                                                             // 33
    return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                         // 34
  }, function() {                                                                                                      // 35
    return [ HTML.I({                                                                                                  // 36
      "class": "fa fa-angle-up fa-4x"                                                                                  // 37
    }), " " ];                                                                                                         // 38
  }, function() {                                                                                                      // 39
    return [ " ", HTML.I({                                                                                             // 40
      "class": "fa fa-angle-down fa-4x"                                                                                // 41
    }), " " ];                                                                                                         // 42
  }), " \n        "), "\n      "), "\n    "), "\n  "), "\n");                                                          // 43
}));                                                                                                                   // 44
                                                                                                                       // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"footer.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.footer.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("footer");                                                                                        // 2
Template["footer"] = new Template("Template.footer", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div id="footer">\n    <hr>\n    <p>\n      Chalimo Vokabeltrainer | <a href="#">FAQ</a>\n    </p>\n\n  </div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"head.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.head.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.body.addContent((function() {                                                                                 // 2
  var view = this;                                                                                                     // 3
  return "";                                                                                                           // 4
}));                                                                                                                   // 5
Meteor.startup(Template.body.renderToDocument);                                                                        // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.layout.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("layout");                                                                                        // 2
Template["layout"] = new Template("Template.layout", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    id: "content"                                                                                                      // 6
  }, "\n    ", Blaze._TemplateWith(function() {                                                                        // 7
    return {                                                                                                           // 8
      template: Spacebars.call(view.lookup("bar"))                                                                     // 9
    };                                                                                                                 // 10
  }, function() {                                                                                                      // 11
    return Spacebars.include(function() {                                                                              // 12
      return Spacebars.call(Template.__dynamic);                                                                       // 13
    });                                                                                                                // 14
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 15
    return {                                                                                                           // 16
      template: Spacebars.call(view.lookup("nav"))                                                                     // 17
    };                                                                                                                 // 18
  }, function() {                                                                                                      // 19
    return Spacebars.include(function() {                                                                              // 20
      return Spacebars.call(Template.__dynamic);                                                                       // 21
    });                                                                                                                // 22
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 23
    return {                                                                                                           // 24
      template: Spacebars.call(view.lookup("main"))                                                                    // 25
    };                                                                                                                 // 26
  }, function() {                                                                                                      // 27
    return Spacebars.include(function() {                                                                              // 28
      return Spacebars.call(Template.__dynamic);                                                                       // 29
    });                                                                                                                // 30
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 31
    return {                                                                                                           // 32
      template: Spacebars.call(view.lookup("navSource"))                                                               // 33
    };                                                                                                                 // 34
  }, function() {                                                                                                      // 35
    return Spacebars.include(function() {                                                                              // 36
      return Spacebars.call(Template.__dynamic);                                                                       // 37
    });                                                                                                                // 38
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 39
    return {                                                                                                           // 40
      template: Spacebars.call(view.lookup("footer"))                                                                  // 41
    };                                                                                                                 // 42
  }, function() {                                                                                                      // 43
    return Spacebars.include(function() {                                                                              // 44
      return Spacebars.call(Template.__dynamic);                                                                       // 45
    });                                                                                                                // 46
  }), "\n  ");                                                                                                         // 47
}));                                                                                                                   // 48
                                                                                                                       // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("nav");                                                                                           // 2
Template["nav"] = new Template("Template.nav", (function() {                                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "row"                                                                                                     // 8
  }, "\n      ", Spacebars.include(view.lookupTemplate("atNavButton")), " Logged in as: ", Blaze.If(function() {       // 9
    return Spacebars.call(view.lookup("currentUser"));                                                                 // 10
  }, function() {                                                                                                      // 11
    return [ " ", Blaze.View("lookup:userMail", function() {                                                           // 12
      return Spacebars.mustache(view.lookup("userMail"));                                                              // 13
    }), " " ];                                                                                                         // 14
  }), "\n    "), "\n    ", HTML.DIV({                                                                                  // 15
    "class": "row"                                                                                                     // 16
  }, "\n      ", HTML.UL({                                                                                             // 17
    "class": "nav nav-tabs nav-justified"                                                                              // 18
  }, "\n        ", HTML.LI({                                                                                           // 19
    role: "presentation",                                                                                              // 20
    "class": function() {                                                                                              // 21
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 22
        regex: "index"                                                                                                 // 23
      }));                                                                                                             // 24
    }                                                                                                                  // 25
  }, HTML.A({                                                                                                          // 26
    href: function() {                                                                                                 // 27
      return Spacebars.mustache(view.lookup("pathFor"), "index");                                                      // 28
    }                                                                                                                  // 29
  }, "Index")), "\n        ", HTML.LI({                                                                                // 30
    role: "presentation",                                                                                              // 31
    "class": function() {                                                                                              // 32
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 33
        regex: "eingabe"                                                                                               // 34
      }));                                                                                                             // 35
    }                                                                                                                  // 36
  }, HTML.A({                                                                                                          // 37
    href: function() {                                                                                                 // 38
      return Spacebars.mustache(view.lookup("pathFor"), "eingabe");                                                    // 39
    }                                                                                                                  // 40
  }, "Eingabetrainer")), "\n        ", HTML.LI({                                                                       // 41
    role: "presentation",                                                                                              // 42
    "class": function() {                                                                                              // 43
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 44
        regex: "register"                                                                                              // 45
      }));                                                                                                             // 46
    }                                                                                                                  // 47
  }, HTML.A({                                                                                                          // 48
    href: function() {                                                                                                 // 49
      return Spacebars.mustache(view.lookup("pathFor"), "register");                                                   // 50
    }                                                                                                                  // 51
  }, "Register")), "\n        ", Blaze.If(function() {                                                                 // 52
    return Spacebars.dataMustache(view.lookup("isInRole"), "admin");                                                   // 53
  }, function() {                                                                                                      // 54
    return [ "\n        ", HTML.LI({                                                                                   // 55
      role: "presentation",                                                                                            // 56
      "class": function() {                                                                                            // 57
        return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                         // 58
          regex: "stats"                                                                                               // 59
        }));                                                                                                           // 60
      }                                                                                                                // 61
    }, HTML.A({                                                                                                        // 62
      href: function() {                                                                                               // 63
        return Spacebars.mustache(view.lookup("pathFor"), "stats");                                                    // 64
      }                                                                                                                // 65
    }, "Stats")), "\n        " ];                                                                                      // 66
  }), "\n      "), "\n    "), "\n  ");                                                                                 // 67
}));                                                                                                                   // 68
                                                                                                                       // 69
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_mode.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav_mode.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navMode");                                                                                       // 2
Template["navMode"] = new Template("Template.navMode", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<br>\n	<br>\n	"), HTML.DIV({                                                                      // 5
    "class": "row text-center"                                                                                         // 6
  }, "\n		", HTML.Raw('<div class="col-sm-4"></div>'), "\n		", HTML.DIV({                                              // 7
    "class": "col-sm-4"                                                                                                // 8
  }, "\n			", HTML.BUTTON({                                                                                            // 9
    type: "button",                                                                                                    // 10
    "class": "btn btn-default btn-lg btn-block btn-mode"                                                               // 11
  }, "Modus: ", Blaze.View("lookup:mode", function() {                                                                 // 12
    return Spacebars.mustache(view.lookup("mode"));                                                                    // 13
  })), "\n		"), "\n		", HTML.Raw('<div class="col-sm-4"></div>'), "\n	"), HTML.Raw("\n	<br>\n	<br>") ];                // 14
}));                                                                                                                   // 15
                                                                                                                       // 16
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_source.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav_source.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navSource");                                                                                     // 2
Template["navSource"] = new Template("Template.navSource", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "row text-center"                                                                                         // 6
  }, HTML.Raw('\n			<div class="col-sm-4"></div>\n			'), HTML.DIV({                                                    // 7
    "class": "col-sm-4"                                                                                                // 8
  }, "\n				", HTML.BUTTON({                                                                                           // 9
    type: "button",                                                                                                    // 10
    "class": "btn btn-default btn-lg btn-block btn-source"                                                             // 11
  }, "\n					Woerter aus: ", Blaze.View("lookup:source", function() {                                                  // 12
    return Spacebars.mustache(view.lookup("source"));                                                                  // 13
  }), "\n					", Blaze.If(function() {                                                                                 // 14
    return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                      // 15
  }, function() {                                                                                                      // 16
    return [ "\n						", HTML.SPAN({                                                                                   // 17
      "class": "label label-default"                                                                                   // 18
    }, Blaze.View("lookup:lengthFav", function() {                                                                     // 19
      return Spacebars.mustache(view.lookup("lengthFav"));                                                             // 20
    })), "\n					" ];                                                                                                  // 21
  }, function() {                                                                                                      // 22
    return [ "\n						", HTML.SPAN({                                                                                   // 23
      "class": "label label-default"                                                                                   // 24
    }, Blaze.View("lookup:lengthNotFav", function() {                                                                  // 25
      return Spacebars.mustache(view.lookup("lengthNotFav"));                                                          // 26
    })), "\n					" ];                                                                                                  // 27
  }), "\n				"), "\n				", Blaze.Unless(function() {                                                                   // 28
    return Spacebars.call(view.lookup("lengthFav"));                                                                   // 29
  }, function() {                                                                                                      // 30
    return HTML.SPAN({                                                                                                 // 31
      "class": "label label-warning"                                                                                   // 32
    }, "Kein Eintrag in Favoritenliste");                                                                              // 33
  }), "\n				", Blaze.Unless(function() {                                                                              // 34
    return Spacebars.call(view.lookup("lengthNotFav"));                                                                // 35
  }, function() {                                                                                                      // 36
    return HTML.SPAN({                                                                                                 // 37
      "class": "label label-warning"                                                                                   // 38
    }, "Kein Eintrag in Nicht-Favoritenliste. Alle Woerter sind favorisiert.");                                        // 39
  }), "\n			"), HTML.Raw('\n			<div class="col-sm-4"></div>\n		'));                                                    // 40
}));                                                                                                                   // 41
                                                                                                                       // 42
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_GLOBAL_HELPERS.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/_GLOBAL_HELPERS.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
// Global helpers                                                                                                      //
                                                                                                                       //
// e.g. {{getSession "posX"}} in Template                                                                              //
Template.registerHelper('getSession', function (key) {                                                                 // 5
	return Session.get(key);                                                                                              // 6
});                                                                                                                    //
Template.registerHelper('userMail', function () {                                                                      // 8
	return Meteor.user().emails[0].address;                                                                               // 9
});                                                                                                                    //
Template.registerHelper('isOwner', function () {                                                                       // 11
	return this.userId == Meteor.userId();                                                                                // 12
});                                                                                                                    //
Template.registerHelper("lengthIsOne", function () {                                                                   // 14
	return Session.get(LENGTH_FAV) === 1 && Session.get(SOURCE_FAV) || Session.get(LENGTH_NOT_FAV) === 1 && !Session.get(SOURCE_FAV);
});                                                                                                                    //
Template.registerHelper("isFavourite", function (vocabularyId) {                                                       // 18
	var favEntry = Favourites.findOne({                                                                                   // 19
		vocabularyId: vocabularyId                                                                                           // 20
	});                                                                                                                   //
	if (favEntry) {                                                                                                       // 22
		return true;                                                                                                         // 23
	}                                                                                                                     //
});                                                                                                                    //
Template.registerHelper("favourites", function () {                                                                    // 26
	var favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());                                                    // 27
	if (Favourites.find().count() !== 0) {                                                                                // 28
		return Vocabulary.find({                                                                                             // 29
			_id: {                                                                                                              // 30
				$in: favIds                                                                                                        // 31
			}                                                                                                                   //
		}, {                                                                                                                 //
			sort: {                                                                                                             // 34
				term: 1                                                                                                            // 35
			}                                                                                                                   //
		});                                                                                                                  //
	} else {                                                                                                              //
		return null;                                                                                                         // 39
	}                                                                                                                     //
});                                                                                                                    //
Template.registerHelper("entry", function () {                                                                         // 42
	var currentUserId = this.userId;                                                                                      // 43
	var favIds = R.pluck('vocabularyId')(Favourites.find().fetch());                                                      // 44
	var vocabulary = [];                                                                                                  // 45
                                                                                                                       //
	if (Session.get(SOURCE_FAV)) {                                                                                        // 47
		vocabulary = Vocabulary.find({                                                                                       // 48
			_id: {                                                                                                              // 49
				$in: favIds                                                                                                        // 50
			}                                                                                                                   //
		}).fetch();                                                                                                          //
	} else {                                                                                                              //
		vocabulary = Vocabulary.find({                                                                                       // 54
			_id: {                                                                                                              // 55
				$nin: favIds                                                                                                       // 56
			}                                                                                                                   //
		}).fetch();                                                                                                          //
	}                                                                                                                     //
	return vocabulary[Session.get(COUNT_VIEWED)];                                                                         // 60
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"__SESSIONS.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/__SESSIONS.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
//  Session variables                                                                                                  //
                                                                                                                       //
ATTENTION_MODE = 'attentionMode';                                                                                      // 3
Session.setDefault(ATTENTION_MODE, false);                                                                             // 4
                                                                                                                       //
LAST_PATH = 'lastPath';                                                                                                // 6
Session.setDefault(LAST_PATH, '/');                                                                                    // 7
                                                                                                                       //
SOURCE_FAV = 'sourceFavourites';                                                                                       // 9
Session.setDefault(SOURCE_FAV, false);                                                                                 // 10
                                                                                                                       //
RANDOM_FAV = 'randomFavourites';                                                                                       // 12
Session.setDefault(RANDOM_FAV, false);                                                                                 // 13
                                                                                                                       //
RANDOM_NOT_FAV = 'randomNotFavourites';                                                                                // 15
Session.setDefault(RANDOM_NOT_FAV, true);                                                                              // 16
                                                                                                                       //
LENGTH_FAV = 'lengthFav';                                                                                              // 18
Session.setDefault(LENGTH_FAV, 0);                                                                                     // 19
                                                                                                                       //
LENGTH_NOT_FAV = 'lengthNotFav';                                                                                       // 21
Session.setDefault(LENGTH_NOT_FAV, 0);                                                                                 // 22
                                                                                                                       //
COUNT_VIEWED = 'countViewed';                                                                                          // 24
Session.setDefault(COUNT_VIEWED, 0);                                                                                   // 25
                                                                                                                       //
REVEALED = 'revealed';                                                                                                 // 27
Session.setDefault(REVEALED, false);                                                                                   // 28
                                                                                                                       //
TERM_WRONG = 'termWrong';                                                                                              // 30
Session.setDefault(TERM_WRONG, false);                                                                                 // 31
                                                                                                                       //
TERM_RIGHT = 'termRight';                                                                                              // 33
Session.setDefault(TERM_RIGHT, false);                                                                                 // 34
                                                                                                                       //
TERM_CACHE = 'termCache';                                                                                              // 36
Session.setDefault(TERM_CACHE, '');                                                                                    // 37
                                                                                                                       //
COUNT_LETTERS_MATCH = 'countLettersMatch';                                                                             // 39
Session.setDefault(COUNT_LETTERS_MATCH, 0);                                                                            // 40
                                                                                                                       //
NAV_MODE_READ = 'lesen';                                                                                               // 42
Session.setDefault(NAV_MODE_READ, true);                                                                               // 43
                                                                                                                       //
NAV_MODE_TERM = 'wort';                                                                                                // 45
Session.setDefault(NAV_MODE_TERM, false);                                                                              // 46
                                                                                                                       //
NAV_MODE_DEF = 'definition';                                                                                           // 48
Session.setDefault(NAV_MODE_DEF, false);                                                                               // 49
                                                                                                                       //
NAV_MODES = 'navModes';                                                                                                // 51
Session.setDefault(NAV_MODES, [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF]);                                           // 52
                                                                                                                       //
NAV_MODE_COUNT = 'navModeCount';                                                                                       // 54
Session.setDefault(NAV_MODE_COUNT, 0);                                                                                 // 55
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bar.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/bar.js                                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.bar.events({                                                                                                  // 1
  'click .attention-mode': function () {                                                                               // 2
    function clickAttentionMode() {                                                                                    //
      var oldValue = Session.get(ATTENTION_MODE) || false;                                                             // 3
      Session.set(ATTENTION_MODE, !oldValue);                                                                          // 4
                                                                                                                       //
      var routePath = FlowRouter.current().path;                                                                       // 6
      Session.set(LAST_PATH, routePath);                                                                               // 7
                                                                                                                       //
      // log                                                                                                           //
      var deviceType = Darwin.device.type;                                                                             // 2
      var devicePlatform = Darwin.device.platform;                                                                     // 11
      var clickArea = 'bar';                                                                                           // 12
      var mode = 'null';                                                                                               // 13
      var attention = Session.get(ATTENTION_MODE);                                                                     // 14
                                                                                                                       //
      Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                               // 16
    }                                                                                                                  //
                                                                                                                       //
    return clickAttentionMode;                                                                                         //
  }()                                                                                                                  //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/layout.js                                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.layout.onCreated(function () {                                                                                // 1
	this.autorun(function () {                                                                                            // 2
                                                                                                                       //
		Session.set(LENGTH_FAV, Favourites.find().count());                                                                  // 4
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                                  // 5
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.layout.events({                                                                                               // 10
	'click .btn-forward, click .btn-backward': function () {                                                              // 11
		function clickBtnForwardClickBtnBackward(event, template) {                                                          //
                                                                                                                       //
			var self = this;                                                                                                    // 14
			if (Session.get(REVEALED)) {                                                                                        // 15
				Session.set(REVEALED, false);                                                                                      // 16
			}                                                                                                                   //
			if (Session.get(TERM_WRONG)) {                                                                                      // 18
				Session.set(TERM_WRONG, false);                                                                                    // 19
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 21
				document.getElementById("term").value = '';                                                                        // 22
				if (document.getElementById("term").disabled === true) {                                                           // 23
					document.getElementById("term").disabled = false;                                                                 // 24
				}                                                                                                                  //
			}                                                                                                                   //
			// log                                                                                                              //
			Meteor.call('dataViewedUser', self);                                                                                // 11
			Meteor.call('dataViewedAll', self);                                                                                 // 29
                                                                                                                       //
			// log                                                                                                              //
			var deviceType = Darwin.device.type;                                                                                // 11
			var devicePlatform = Darwin.device.platform;                                                                        // 33
			var clickArea = 'browse';                                                                                           // 34
			var mode = void 0;                                                                                                  // 35
			var attention = Session.get(ATTENTION_MODE);                                                                        // 36
			if (Session.get(ATTENTION_MODE)) {                                                                                  // 37
				mode = Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                        // 38
			} else {                                                                                                            //
				if (FlowRouter.current().route.name === "eingabe") {                                                               // 40
					mode = 'eingabe';                                                                                                 // 41
				} else {                                                                                                           //
					mode = 'null';                                                                                                    // 43
				}                                                                                                                  //
			}                                                                                                                   //
			Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                                  // 46
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnForwardClickBtnBackward;                                                                              //
	}(),                                                                                                                  //
	'click .btn-backward': function () {                                                                                  // 49
		function clickBtnBackward(event, template) {                                                                         //
			var val = 0;                                                                                                        // 50
			if (Session.get(SOURCE_FAV)) {                                                                                      // 51
				// reset to avoid going into negative numbers and be able to circle backwards                                      //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                             // 53
					val = Session.get(LENGTH_FAV) - 1;                                                                                // 54
					Session.set(COUNT_VIEWED, val);                                                                                   // 55
				} else {                                                                                                           //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_FAV);                                                  // 57
					Session.set(COUNT_VIEWED, val);                                                                                   // 58
				}                                                                                                                  //
			} else {                                                                                                            //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                             // 61
					val = Session.get(LENGTH_NOT_FAV) - 1;                                                                            // 62
					Session.set(COUNT_VIEWED, val);                                                                                   // 63
				} else {                                                                                                           //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_NOT_FAV);                                              // 65
					Session.set(COUNT_VIEWED, val);                                                                                   // 66
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnBackward;                                                                                             //
	}(),                                                                                                                  //
	'click .btn-forward': function () {                                                                                   // 70
		function clickBtnForward(event, template) {                                                                          //
			var val = 0;                                                                                                        // 71
			if (Session.get(SOURCE_FAV)) {                                                                                      // 72
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                                   // 73
				Session.set(COUNT_VIEWED, val);                                                                                    // 74
			} else {                                                                                                            //
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                               // 76
				Session.set(COUNT_VIEWED, val);                                                                                    // 77
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnForward;                                                                                              //
	}(),                                                                                                                  //
	'click .btn-reveal': function () {                                                                                    // 80
		function clickBtnReveal(event, template) {                                                                           //
			if (!Session.get(REVEALED)) {                                                                                       // 81
				Session.set(REVEALED, true);                                                                                       // 82
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 84
				if (document.getElementById("term").disabled === false) {                                                          // 85
					document.getElementById("term").disabled = true;                                                                  // 86
				}                                                                                                                  //
			}                                                                                                                   //
			// log                                                                                                              //
			var deviceType = Darwin.device.type;                                                                                // 80
			var devicePlatform = Darwin.device.platform;                                                                        // 91
			var clickArea = 'reveal';                                                                                           // 92
			var mode = void 0;                                                                                                  // 93
			var attention = Session.get(ATTENTION_MODE);                                                                        // 94
			if (Session.get(ATTENTION_MODE)) {                                                                                  // 95
				mode = Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                        // 96
			} else {                                                                                                            //
				if (FlowRouter.current().route.name === "eingabe") {                                                               // 98
					mode = 'eingabe';                                                                                                 // 99
				} else {                                                                                                           //
					mode = 'null';                                                                                                    // 101
				}                                                                                                                  //
			}                                                                                                                   //
			Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                                  // 104
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnReveal;                                                                                               //
	}(),                                                                                                                  //
	'click .btn-insert, click .btn-delete': function () {                                                                 // 106
		function clickBtnInsertClickBtnDelete(event, template) {                                                             //
			// log                                                                                                              //
			var deviceType = Darwin.device.type;                                                                                // 108
			var devicePlatform = Darwin.device.platform;                                                                        // 109
			var clickArea = 'favDel';                                                                                           // 110
			var mode = void 0;                                                                                                  // 111
			var attention = Session.get(ATTENTION_MODE);                                                                        // 112
			if (Session.get(ATTENTION_MODE)) {                                                                                  // 113
				mode = Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                        // 114
			} else {                                                                                                            //
				if (FlowRouter.current().route.name === "eingabe") {                                                               // 116
					mode = 'eingabe';                                                                                                 // 117
				} else {                                                                                                           //
					mode = 'null';                                                                                                    // 119
				}                                                                                                                  //
			}                                                                                                                   //
			Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                                  // 122
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnInsertClickBtnDelete;                                                                                 //
	}(),                                                                                                                  //
	'click .btn-insert': function () {                                                                                    // 124
		function clickBtnInsert(event, template) {                                                                           //
			var self = this;                                                                                                    // 125
			var group = FlowRouter.current().route.group.name;                                                                  // 126
			// log start                                                                                                        //
			var timestamp = new Date();                                                                                         // 124
			timestamp.setHours(0);                                                                                              // 129
			timestamp.setMinutes(0);                                                                                            // 130
			timestamp.setSeconds(0);                                                                                            // 131
			timestamp.setMilliseconds(0);                                                                                       // 132
                                                                                                                       //
			if (group === 'high') {                                                                                             // 134
				Meteor.call('dataFavHigh', timestamp.getTime());                                                                   // 135
			}                                                                                                                   //
			if (group === 'low') {                                                                                              // 137
				Meteor.call('dataFavLow', timestamp.getTime());                                                                    // 138
			}                                                                                                                   //
			// log end                                                                                                          //
			Meteor.call('insertFavourite', self._id);                                                                           // 124
			// simulate source mode button for register page                                                                    //
			if (!Session.get(ATTENTION_MODE)) {                                                                                 // 124
				Session.set(SOURCE_FAV, false);                                                                                    // 144
			}                                                                                                                   //
                                                                                                                       //
			// reset the COUNT VIEW when a list entry has been removed                                                          //
			if (!Session.get(SOURCE_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {                     // 124
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                           // 149
				Session.set(COUNT_VIEWED, val);                                                                                    // 150
			}                                                                                                                   //
			if (Session.get(LENGTH_NOT_FAV) === 1) {                                                                            // 152
				Session.set(SOURCE_FAV, !Session.get(SOURCE_FAV));                                                                 // 153
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnInsert;                                                                                               //
	}(),                                                                                                                  //
	'click .btn-delete': function () {                                                                                    // 157
		function clickBtnDelete(event, template) {                                                                           //
			var self = this;                                                                                                    // 158
			var group = FlowRouter.current().route.group.name;                                                                  // 159
			// log start                                                                                                        //
			var timestamp = new Date();                                                                                         // 157
			timestamp.setHours(0);                                                                                              // 162
			timestamp.setMinutes(0);                                                                                            // 163
			timestamp.setSeconds(0);                                                                                            // 164
			timestamp.setMilliseconds(0);                                                                                       // 165
                                                                                                                       //
			if (group === 'high') {                                                                                             // 167
				Meteor.call('dataFavHigh', timestamp.getTime());                                                                   // 168
			}                                                                                                                   //
			if (group === 'low') {                                                                                              // 170
				Meteor.call('dataFavLow', timestamp.getTime());                                                                    // 171
			}                                                                                                                   //
			// log end                                                                                                          //
                                                                                                                       //
			Meteor.call('deleteFavourite', self._id);                                                                           // 157
			// simulate source mode button for register page                                                                    //
			if (!Session.get(ATTENTION_MODE)) {                                                                                 // 157
				Session.set(SOURCE_FAV, true);                                                                                     // 178
			}                                                                                                                   //
                                                                                                                       //
			if (Session.get(SOURCE_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                          // 181
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 182
				Session.set(COUNT_VIEWED, val);                                                                                    // 183
			}                                                                                                                   //
			if (Session.get(LENGTH_FAV) === 1) {                                                                                // 185
				Session.set(SOURCE_FAV, !Session.get(SOURCE_FAV));                                                                 // 186
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnDelete;                                                                                               //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_mode.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/nav_mode.js                                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navMode.events({                                                                                              // 1
	'click .btn-mode': function () {                                                                                      // 2
		function clickBtnMode() {                                                                                            //
			Session.set(NAV_MODE_COUNT, (Session.get(NAV_MODE_COUNT) + 1) % Session.get(NAV_MODES).length);                     // 3
			Session.get(NAV_MODES).forEach(function (entry) {                                                                   // 4
				Session.set(entry, false);                                                                                         // 5
			});                                                                                                                 //
			Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);                                             // 7
                                                                                                                       //
			// log                                                                                                              //
			var deviceType = Darwin.device.type;                                                                                // 2
			var devicePlatform = Darwin.device.platform;                                                                        // 11
			var clickArea = 'mode';                                                                                             // 12
			var mode = void 0;                                                                                                  // 13
			var attention = Session.get(ATTENTION_MODE);                                                                        // 14
			if (Session.get(ATTENTION_MODE)) {                                                                                  // 15
				mode = Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                        // 16
			} else {                                                                                                            //
				mode = 'null';                                                                                                     // 18
			}                                                                                                                   //
			Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                                  // 20
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnMode;                                                                                                 //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.navMode.helpers({                                                                                             // 24
	mode: function () {                                                                                                   // 25
		function mode() {                                                                                                    //
			return Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                         // 26
		}                                                                                                                    //
                                                                                                                       //
		return mode;                                                                                                         //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_source.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/nav_source.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navSource.helpers({                                                                                           // 1
	source: function () {                                                                                                 // 2
		function source() {                                                                                                  //
			if (Session.get(SOURCE_FAV)) {                                                                                      // 3
				return "Favoriten";                                                                                                // 4
			} else {                                                                                                            //
				return "Nicht-Favoriten";                                                                                          // 6
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return source;                                                                                                       //
	}(),                                                                                                                  //
	lengthFav: function () {                                                                                              // 9
		function lengthFav() {                                                                                               //
			return Session.get(LENGTH_FAV);                                                                                     // 10
		}                                                                                                                    //
                                                                                                                       //
		return lengthFav;                                                                                                    //
	}(),                                                                                                                  //
	lengthNotFav: function () {                                                                                           // 12
		function lengthNotFav() {                                                                                            //
			return Session.get(LENGTH_NOT_FAV);                                                                                 // 13
		}                                                                                                                    //
                                                                                                                       //
		return lengthNotFav;                                                                                                 //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.navSource.events({                                                                                            // 17
	'click .btn-source': function () {                                                                                    // 18
		function clickBtnSource() {                                                                                          //
			var oldValue = Session.get(SOURCE_FAV) || false;                                                                    // 19
                                                                                                                       //
			if (Session.get(REVEALED)) {                                                                                        // 21
				Session.set(REVEALED, false);                                                                                      // 22
			}                                                                                                                   //
			if (Session.get(TERM_WRONG)) {                                                                                      // 24
				Session.set(TERM_WRONG, false);                                                                                    // 25
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 27
				document.getElementById("term").value = '';                                                                        // 28
				if (document.getElementById("term").disabled === true) {                                                           // 29
					document.getElementById("term").disabled = false;                                                                 // 30
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			// Button only switchable when there's at least on entry on a list                                                  //
			if (Session.get(LENGTH_FAV) !== 0 && Session.get(LENGTH_NOT_FAV) !== 0) {                                           // 18
				Session.set(SOURCE_FAV, !oldValue);                                                                                // 36
			}                                                                                                                   //
                                                                                                                       //
			// reset counter range when switching between fav list and not-fav list                                             //
			if (Session.get(SOURCE_FAV)) {                                                                                      // 18
				var val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_FAV);                                                     // 41
				Session.set(COUNT_VIEWED, val);                                                                                    // 42
			} else {                                                                                                            //
				var _val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_NOT_FAV);                                                // 44
				Session.set(COUNT_VIEWED, _val);                                                                                   // 45
			}                                                                                                                   //
                                                                                                                       //
			// log                                                                                                              //
			var deviceType = Darwin.device.type;                                                                                // 18
			var devicePlatform = Darwin.device.platform;                                                                        // 50
			// ['favDel', 'browse', 'source', 'reveal']                                                                         //
			var clickArea = 'source';                                                                                           // 18
			// ['lesen', 'wort', 'definition', 'eingabe']                                                                       //
			var mode = void 0;                                                                                                  // 18
			var attention = Session.get(ATTENTION_MODE);                                                                        // 55
			if (Session.get(ATTENTION_MODE)) {                                                                                  // 56
				mode = Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                        // 57
			} else {                                                                                                            //
				if (FlowRouter.current().route.name === "eingabe") {                                                               // 59
					mode = 'eingabe';                                                                                                 // 60
				} else {                                                                                                           //
					mode = 'null';                                                                                                    // 62
				}                                                                                                                  //
			}                                                                                                                   //
			Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                                  // 65
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnSource;                                                                                               //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"loading.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/template.loading.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("loading");                                                                                       // 2
Template["loading"] = new Template("Template.loading", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div class="alert alert-warning" role="alert">Lade Daten...</div>');                                // 5
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"page_not_found.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/template.page_not_found.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("pageNotFound");                                                                                  // 2
Template["pageNotFound"] = new Template("Template.pageNotFound", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div class="container">\n    <h3>404 - Sprachlos.</h3>\n    <h5>Seite nicht gefunden.</h5>\n  </div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"init.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/init.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.startup(function () {});                                                                                        // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"common":{"aux":{"aux.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/aux/aux.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (exports) {                                                                                                  // 1
    /**                                                                                                                //
    * Randomize array element order in-place.                                                                          //
    * Using Durstenfeld shuffle algorithm.                                                                             //
    */                                                                                                                 //
    exports.shuffle = function (array) {                                                                               // 6
        for (var i = array.length - 1; i > 0; i--) {                                                                   // 7
            var j = Math.floor(Math.random() * (i + 1));                                                               // 8
            var temp = array[i];                                                                                       // 9
            array[i] = array[j];                                                                                       // 10
            array[j] = temp;                                                                                           // 11
        }                                                                                                              //
        return array;                                                                                                  // 13
    };                                                                                                                 //
    exports.getRandomInt = function (min, max) {                                                                       // 15
        return Math.floor(Math.random() * (max - min + 1)) + min;                                                      //
    };                                                                                                                 //
})(this.Aux = {});                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nvd3_extra.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/aux/nvd3_extra.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* Inspired by Lee Byron's test data generator. */                                                                     //
(function (exports) {                                                                                                  // 2
  var _arguments = arguments;                                                                                          //
                                                                                                                       //
  exports.stream_layers = function (n, m, o) {                                                                         // 3
    if (_arguments.length < 3) o = 0;                                                                                  // 4
    function bump(a) {                                                                                                 // 5
      var x = 1 / (.1 + Math.random()),                                                                                // 6
          y = 2 * Math.random() - .5,                                                                                  //
          z = 10 / (.1 + Math.random());                                                                               //
      for (var i = 0; i < m; i++) {                                                                                    // 9
        var w = (i / m - y) * z;                                                                                       // 10
        a[i] += x * Math.exp(-w * w);                                                                                  // 11
      }                                                                                                                //
    }                                                                                                                  //
    return d3.range(n).map(function () {                                                                               // 14
      var a = [],                                                                                                      // 15
          i;                                                                                                           //
      for (i = 0; i < m; i++) {                                                                                        // 16
        a[i] = o + o * Math.random();                                                                                  // 16
      }for (i = 0; i < 5; i++) {                                                                                       //
        bump(a);                                                                                                       // 17
      }return a.map(exports.stream_index);                                                                             //
    });                                                                                                                //
  };                                                                                                                   //
  exports.stream_waves = function (n, m) {                                                                             // 21
    return d3.range(n).map(function (i) {                                                                              // 22
      return d3.range(m).map(function (j) {                                                                            // 23
        var x = 20 * j / m - i / 3;                                                                                    // 24
        return 2 * x * Math.exp(-.5 * x);                                                                              // 25
      }).map(exports.stream_index);                                                                                    //
    });                                                                                                                //
  };                                                                                                                   //
  exports.stream_index = function (d, i) {                                                                             // 29
    return { x: i, y: Math.max(0, d) };                                                                                // 30
  };                                                                                                                   //
})(this.NVD3 = {});                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/aux/validation.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (exports) {                                                                                                  // 1
	exports.isAlphabetic = function (value) {                                                                             // 2
		var filter = /^[a-zA-Z]+$/;                                                                                          // 3
		if (filter.test(value)) {                                                                                            // 4
			return true;                                                                                                        // 5
		}                                                                                                                    //
		return false;                                                                                                        // 7
	};                                                                                                                    //
                                                                                                                       //
	exports.isLength64 = function (value) {                                                                               // 10
		if (value.length < 65) {                                                                                             // 11
			return true;                                                                                                        // 12
		}                                                                                                                    //
		return false;                                                                                                        // 14
	};                                                                                                                    //
})(this.Validate = {});                                                                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"data.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/collections/data.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
People = new Mongo.Collection("people", {});                                                                           // 1
                                                                                                                       //
Data = {};                                                                                                             // 3
Data.Viewed = {};                                                                                                      // 4
Data.Detail = new Mongo.Collection('dataDetail', {});                                                                  // 5
Data.Viewed.User = new Mongo.Collection("dataViewedUser", {});                                                         // 6
Data.Viewed.All = new Mongo.Collection("dataViewedAll", {});                                                           // 7
Data.Fav = {};                                                                                                         // 8
Data.Fav.High = new Mongo.Collection("dataFavHigh", {});                                                               // 9
Data.Fav.Low = new Mongo.Collection("dataFavLow", {});                                                                 // 10
                                                                                                                       //
Data.Detail.Schema = new SimpleSchema({                                                                                // 12
	userId: {                                                                                                             // 13
		type: String,                                                                                                        // 14
		autoValue: function () {                                                                                             // 15
			function autoValue() {                                                                                              // 15
				return this.userId;                                                                                                // 16
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	timestamp: {                                                                                                          // 19
		type: Date,                                                                                                          // 20
		autoValue: function () {                                                                                             // 21
			function autoValue() {                                                                                              // 21
				return new Date();                                                                                                 // 22
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	deviceType: {                                                                                                         // 25
		type: String                                                                                                         // 26
	},                                                                                                                    //
	devicePlatform: {                                                                                                     // 28
		type: String                                                                                                         // 29
	},                                                                                                                    //
	clickArea: {                                                                                                          // 31
		type: String,                                                                                                        // 32
		allowedValues: ['favDel', 'browse', 'source', 'reveal', 'bar', 'mode']                                               // 33
	},                                                                                                                    //
	mode: {                                                                                                               // 35
		type: String,                                                                                                        // 36
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']                                                    // 37
	},                                                                                                                    //
	attention: {                                                                                                          // 39
		type: Boolean                                                                                                        // 40
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Data.Detail.attachSchema(Data.Detail.Schema);                                                                          // 44
                                                                                                                       //
Data.Viewed.All.Schema = new SimpleSchema({                                                                            // 47
	vocabularyId: {                                                                                                       // 48
		type: String                                                                                                         // 49
	},                                                                                                                    //
	vocabularyName: {                                                                                                     // 51
		type: String                                                                                                         // 52
	},                                                                                                                    //
	timesViewed: {                                                                                                        // 54
		type: Number                                                                                                         // 55
	},                                                                                                                    //
	createdAt: {                                                                                                          // 57
		type: Date,                                                                                                          // 58
		autoValue: function () {                                                                                             // 59
			function autoValue() {                                                                                              // 59
				return new Date();                                                                                                 // 60
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Data.Viewed.User.Schema = new SimpleSchema([{                                                                          // 65
	userId: {                                                                                                             // 67
		type: String,                                                                                                        // 68
		autoValue: function () {                                                                                             // 69
			function autoValue() {                                                                                              // 69
				return this.userId;                                                                                                // 70
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	}                                                                                                                     //
}, Data.Viewed.All.Schema]);                                                                                           //
                                                                                                                       //
Data.Viewed.User.attachSchema(Data.Viewed.User.Schema);                                                                // 77
Data.Viewed.All.attachSchema(Data.Viewed.All.Schema);                                                                  // 78
                                                                                                                       //
// CHART MODE                                                                                                          //
// timestamp (day),                                                                                                    //
// mode,                                                                                                               //
// countClick,                                                                                                         //
// device --->>> $sum to get all devices                                                                               //
                                                                                                                       //
// CHART LOW HIGH                                                                                                      //
// URL                                                                                                                 //
// timestamp enter                                                                                                     //
// timestamp exit                                                                                                      //
// device                                                                                                              //
                                                                                                                       //
// --->>> insert @ logout and routeEnter/ routeExit                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favourites.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/collections/favourites.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var FavouritesSchema = new SimpleSchema({                                                                              // 1
  userId: {                                                                                                            // 2
    type: String,                                                                                                      // 3
    autoValue: function () {                                                                                           // 4
      function autoValue() {                                                                                           // 4
        return this.userId;                                                                                            // 5
      }                                                                                                                //
                                                                                                                       //
      return autoValue;                                                                                                //
    }()                                                                                                                //
  },                                                                                                                   //
  vocabularyId: {                                                                                                      // 8
    type: String                                                                                                       // 9
  },                                                                                                                   //
  createdAt: {                                                                                                         // 11
    type: Date,                                                                                                        // 12
    autoValue: function () {                                                                                           // 13
      function autoValue() {                                                                                           // 13
        return new Date();                                                                                             // 14
      }                                                                                                                //
                                                                                                                       //
      return autoValue;                                                                                                //
    }(),                                                                                                               //
    autoform: {                                                                                                        // 16
      type: "hidden"                                                                                                   // 17
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Favourites = new Mongo.Collection('favourites', {});                                                                   // 22
Favourites.attachSchema(FavouritesSchema);                                                                             // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabulary.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/collections/vocabulary.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Vocabulary = new Mongo.Collection('vocabulary', {});                                                                   // 1
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 3
	Vocabulary._ensureIndex({                                                                                             // 4
		term: 1,                                                                                                             // 5
		description: 1                                                                                                       // 6
	});                                                                                                                   //
}                                                                                                                      //
                                                                                                                       //
Vocabulary.allow({                                                                                                     // 10
	insert: function () {                                                                                                 // 11
		function insert() {                                                                                                  // 11
			return false;                                                                                                       //
		}                                                                                                                    //
                                                                                                                       //
		return insert;                                                                                                       //
	}(),                                                                                                                  //
	update: function () {                                                                                                 // 12
		function update() {                                                                                                  // 12
			return false;                                                                                                       //
		}                                                                                                                    //
                                                                                                                       //
		return update;                                                                                                       //
	}(),                                                                                                                  //
	remove: function () {                                                                                                 // 13
		function remove() {                                                                                                  // 13
			return false;                                                                                                       //
		}                                                                                                                    //
                                                                                                                       //
		return remove;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Vocabulary.deny({                                                                                                      // 16
	insert: function () {                                                                                                 // 17
		function insert() {                                                                                                  // 17
			return true;                                                                                                        //
		}                                                                                                                    //
                                                                                                                       //
		return insert;                                                                                                       //
	}(),                                                                                                                  //
	update: function () {                                                                                                 // 18
		function update() {                                                                                                  // 18
			return true;                                                                                                        //
		}                                                                                                                    //
                                                                                                                       //
		return update;                                                                                                       //
	}(),                                                                                                                  //
	remove: function () {                                                                                                 // 19
		function remove() {                                                                                                  // 19
			return true;                                                                                                        //
		}                                                                                                                    //
                                                                                                                       //
		return remove;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
var VocabularySchema = new SimpleSchema({                                                                              // 22
	term: {                                                                                                               // 23
		type: String,                                                                                                        // 24
		regEx: /^[a-zA-Z]+$/                                                                                                 // 25
	},                                                                                                                    //
	description: {                                                                                                        // 27
		type: String                                                                                                         // 28
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Vocabulary.attachSchema(VocabularySchema);                                                                             // 32
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config":{"accounts_t9n.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/config/accounts_t9n.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
T9n.setLanguage('de');                                                                                                 // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"admin.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/config/admin.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
AdminConfig = {                                                                                                        // 1
	name: 'Chalimo',                                                                                                      // 2
	adminEmails: ['bla@bla.org'],                                                                                         // 3
	collections: {                                                                                                        // 4
		Vocabulary: {}                                                                                                       // 6
	}                                                                                                                     //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"at_config.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/config/at_config.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Options                                                                                                             //
AccountsTemplates.configure({                                                                                          // 2
  defaultLayout: 'layout',                                                                                             // 3
  defaultLayoutRegions: {                                                                                              // 4
    footer: 'footer'                                                                                                   // 5
  },                                                                                                                   //
  defaultContentRegion: 'main',                                                                                        // 7
  showForgotPasswordLink: false,                                                                                       // 8
  overrideLoginErrors: true,                                                                                           // 9
  enablePasswordChange: true,                                                                                          // 10
                                                                                                                       //
  // sendVerificationEmail: true,                                                                                      //
  // enforceEmailVerification: true,                                                                                   //
  //confirmPassword: true,                                                                                             //
  //continuousValidation: false,                                                                                       //
  //displayFormLabels: true,                                                                                           //
  //forbidClientAccountCreation: true,                                                                                 //
  //formValidationFeedback: true,                                                                                      //
  // homeRoutePath: '/',                                                                                               //
  // showAddRemoveServices: false,                                                                                     //
  //showPlaceholders: true,                                                                                            //
                                                                                                                       //
  negativeValidation: true,                                                                                            // 23
  positiveValidation: true,                                                                                            // 24
  negativeFeedback: false,                                                                                             // 25
  positiveFeedback: true                                                                                               // 26
                                                                                                                       //
});                                                                                                                    //
                                                                                                                       //
// Privacy Policy and Terms of Use                                                                                     //
//privacyUrl: 'privacy',                                                                                               //
//termsUrl: 'terms-of-use',                                                                                            //
var logout = function logout() {                                                                                       // 33
  //example redirect after logout                                                                                      //
  FlowRouter.go('/sign-in');                                                                                           // 35
};                                                                                                                     //
                                                                                                                       //
AccountsTemplates.configure({                                                                                          // 38
  onLogoutHook: logout                                                                                                 // 39
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"routes.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/routes.js                                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// *** ROUTE FUNCTIONS                                                                                                 //
                                                                                                                       //
checkAttentionModeOff = function checkAttentionModeOff() {                                                             // 3
	if (Session.get(ATTENTION_MODE)) {                                                                                    // 4
		Session.set(ATTENTION_MODE, false);                                                                                  // 5
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
checkAttentionModeOn = function checkAttentionModeOn() {                                                               // 9
	if (!Session.get(ATTENTION_MODE)) {                                                                                   // 10
		Session.set(ATTENTION_MODE, true);                                                                                   // 11
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
resetSession = function resetSession() {                                                                               // 15
	Session.set(REVEALED, false);                                                                                         // 16
	Session.set(TERM_WRONG, false);                                                                                       // 17
};                                                                                                                     //
                                                                                                                       //
checkAdmin = function checkAdmin() {                                                                                   // 20
	if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {                                                                  // 21
		FlowRouter.go("notFound");                                                                                           // 22
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                                                         // 26
                                                                                                                       //
// *** ROUTE GROUPS                                                                                                    //
                                                                                                                       //
var lowRoutes = FlowRouter.group({                                                                                     // 30
	name: "low",                                                                                                          // 31
	triggersEnter: [checkAttentionModeOn],                                                                                // 32
	triggersExit: []                                                                                                      // 33
});                                                                                                                    //
var highRoutes = FlowRouter.group({                                                                                    // 35
	name: "high",                                                                                                         // 36
	triggersEnter: [checkAttentionModeOff],                                                                               // 37
	triggersExit: []                                                                                                      // 38
});                                                                                                                    //
                                                                                                                       //
// *** ROUTES                                                                                                          //
                                                                                                                       //
highRoutes.route('/', {                                                                                                // 45
	name: "index",                                                                                                        // 46
	action: function () {                                                                                                 // 47
		function action(params, queryParams) {                                                                               // 47
			BlazeLayout.render('layout', {                                                                                      // 48
				bar: "bar",                                                                                                        // 49
				nav: "nav",                                                                                                        // 50
				main: "index"                                                                                                      // 51
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
highRoutes.route('/eingabe', {                                                                                         // 55
	name: "eingabe",                                                                                                      // 56
	action: function () {                                                                                                 // 57
		function action(params, queryParams) {                                                                               // 57
			BlazeLayout.render('layout', {                                                                                      // 58
				bar: "bar",                                                                                                        // 59
				nav: "nav",                                                                                                        // 60
				main: "eingabe",                                                                                                   // 61
				navSource: "navSource"                                                                                             // 62
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
highRoutes.route('/register/:id', {                                                                                    // 67
	name: "vokabelDetail",                                                                                                // 68
	action: function () {                                                                                                 // 69
		function action(params, queryParams) {                                                                               // 69
			BlazeLayout.render('layout', {                                                                                      // 70
				bar: "bar",                                                                                                        // 71
				nav: "nav",                                                                                                        // 72
				main: "vokabelDetail"                                                                                              // 73
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
highRoutes.route('/register', {                                                                                        // 77
	name: "register",                                                                                                     // 78
	action: function () {                                                                                                 // 79
		function action(params, queryParams) {                                                                               // 79
			BlazeLayout.render('layout', {                                                                                      // 80
				bar: "bar",                                                                                                        // 81
				nav: "nav",                                                                                                        // 82
				main: "register"                                                                                                   // 83
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
lowRoutes.route('/low', {                                                                                              // 88
	name: "low",                                                                                                          // 89
	action: function () {                                                                                                 // 90
		function action(params, queryParams) {                                                                               // 90
			BlazeLayout.render('layout', {                                                                                      // 91
				bar: "bar",                                                                                                        // 92
				nav: "navMode",                                                                                                    // 93
				main: "low",                                                                                                       // 94
				navSource: "navSource"                                                                                             // 95
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: []                                                                                                     // 98
});                                                                                                                    //
                                                                                                                       //
highRoutes.route('/stats', {                                                                                           // 101
	name: "stats",                                                                                                        // 102
	action: function () {                                                                                                 // 103
		function action(params, queryParams) {                                                                               // 103
			BlazeLayout.render('layout', {                                                                                      // 104
				bar: "bar",                                                                                                        // 105
				nav: "nav",                                                                                                        // 106
				main: "stats"                                                                                                      // 107
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 110
});                                                                                                                    //
                                                                                                                       //
FlowRouter.notFound = {                                                                                                // 113
	name: "notFound",                                                                                                     // 114
	action: function () {                                                                                                 // 115
		function action(params, queryParams) {                                                                               // 115
			BlazeLayout.render('layout', {                                                                                      // 116
				footer: "footer",                                                                                                  // 117
				main: "pageNotFound"                                                                                               // 118
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
//Routes                                                                                                               //
AccountsTemplates.configureRoute('changePwd');                                                                         // 125
// AccountsTemplates.configureRoute('forgotPwd');                                                                      //
AccountsTemplates.configureRoute('resetPwd');                                                                          // 127
AccountsTemplates.configureRoute('signIn');                                                                            // 128
AccountsTemplates.configureRoute('signUp');                                                                            // 129
// AccountsTemplates.configureRoute('verifyEmail');                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/views/high/index/charts/chart_words_all.html");
require("./client/views/high/index/charts/chart_words_user.html");
require("./client/views/high/stats/charts/chart_bar_clicks_per_day.html");
require("./client/views/high/stats/charts/chart_bar_modes.html");
require("./client/views/high/stats/charts/chart_multibar_attention.html");
require("./client/views/high/stats/charts/chart_pie_attention.html");
require("./client/views/high/eingabe/eingabe.html");
require("./client/views/high/index/hello.html");
require("./client/views/high/index/index.html");
require("./client/views/high/register/letter_collapse.html");
require("./client/views/high/register/letter_list.html");
require("./client/views/high/register/register.html");
require("./client/views/high/register/vokabel_detail.html");
require("./client/views/high/stats/stats.html");
require("./client/views/low/modes/modus_definition.html");
require("./client/views/low/modes/modus_lesen.html");
require("./client/views/low/modes/modus_wort.html");
require("./client/views/_shared/backward.html");
require("./client/views/_shared/forward.html");
require("./client/views/low/low.html");
require("./client/layout/bar.html");
require("./client/layout/footer.html");
require("./client/layout/head.html");
require("./client/layout/layout.html");
require("./client/layout/nav.html");
require("./client/layout/nav_mode.html");
require("./client/layout/nav_source.html");
require("./client/loading.html");
require("./client/page_not_found.html");
require("./client/views/high/index/charts/chart_words_all.js");
require("./client/views/high/index/charts/chart_words_user.js");
require("./client/views/high/stats/charts/chart_bar_clicks_per_day.js");
require("./client/views/high/stats/charts/chart_bar_modes.js");
require("./client/views/high/stats/charts/chart_multibar_attention.js");
require("./client/views/high/stats/charts/chart_pie_attention.js");
require("./client/views/high/eingabe/eingabe.js");
require("./client/views/high/index/hello.js");
require("./client/views/high/index/index.js");
require("./client/views/high/register/register.js");
require("./client/views/high/register/vokabel_detail.js");
require("./client/views/high/stats/stats.js");
require("./client/views/low/low.js");
require("./client/layout/_GLOBAL_HELPERS.js");
require("./client/layout/__SESSIONS.js");
require("./client/layout/bar.js");
require("./client/layout/layout.js");
require("./client/layout/nav_mode.js");
require("./client/layout/nav_source.js");
require("./common/aux/aux.js");
require("./common/aux/nvd3_extra.js");
require("./common/aux/validation.js");
require("./common/collections/data.js");
require("./common/collections/favourites.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/admin.js");
require("./common/config/at_config.js");
require("./client/init.js");
require("./common/routes.js");