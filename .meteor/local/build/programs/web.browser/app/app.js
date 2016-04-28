var require = meteorInstall({"client":{"views":{"high":{"verwaltung":{"charts":{"device":{"template.device.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/device/template.device.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("device");                                                                                        // 2
Template["device"] = new Template("Template.device", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div class="container">\n		<h1>Device</h1>\n		<div class="row">\n			<ul>\n				<li>Line Chart(6) - Device(3) pro Tag pro Attention(2)</li>\n			</ul>\n\n		</div>\n	</div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"mode":{"template.chart_bar_modes.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/mode/template.chart_bar_modes.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("chartBarModes");                                                                                 // 2
Template["chartBarModes"] = new Template("Template.chartBarModes", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Vergleich Modi (Gesamt, 'browse')</h4>\n	"), HTML.DIV({                                       // 5
    id: "chartBarModes"                                                                                                // 6
  }, "\n		", HTML.SVG(), "\n	") ];                                                                                     // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.mode.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/mode/template.mode.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("mode");                                                                                          // 2
Template["mode"] = new Template("Template.mode", (function() {                                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, HTML.Raw("\n		<h1>Mode</h1>\n		"), HTML.DIV({                                                                     // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", Spacebars.include(view.lookupTemplate("chartBarModes")), "\n\n			", HTML.Raw("<ul>\n				<li>Line Chart (8) - Vergleich Modi(4) pro Tag pro Attention(2)</li>\n				<li>Line Chart(12) - pro Device Device(3) pro Modus (4)</li>\n			</ul>"), "\n		"), "\n");
}));                                                                                                                   // 10
                                                                                                                       // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_bar_modes.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/mode/chart_bar_modes.js                                                         //
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

},"mode.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/mode/mode.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.mode.onCreated(function () {                                                                                  // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataDetail');                                                                                     // 3
	template.subscribe('user');                                                                                           // 4
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"status":{"template.chart_line_online_user.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/status/template.chart_line_online_user.js                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("chartLineOnlineUser");                                                                           // 2
Template["chartLineOnlineUser"] = new Template("Template.chartLineOnlineUser", (function() {                           // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Online-Zeit pro User pro Tag</h4>\n	"), HTML.DIV({                                            // 5
    id: "chartLineOnlineUser"                                                                                          // 6
  }, "\n		", HTML.SVG(), "\n	") ];                                                                                     // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.status.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/status/template.status.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("status");                                                                                        // 2
Template["status"] = new Template("Template.status", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, HTML.Raw('\n	<h1>Status</h1>\n	<input class="btn btn-default btn-test" type="submit" value="Test">\n	'), HTML.DIV({
    "class": "row"                                                                                                     // 8
  }, "\n		", Spacebars.include(view.lookupTemplate("chartLineOnlineUser")), "\n	"), "\n");                             // 9
}));                                                                                                                   // 10
                                                                                                                       // 11
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_line_online_user.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/status/chart_line_online_user.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.chartLineOnlineUser.rendered = function () {                                                                  // 1
                                                                                                                       //
	var chart = nv.models.lineChart().margin({                                                                            // 3
		left: 200                                                                                                            // 5
	}) //Adjust chart margins to give the x-axis some breathing room.                                                     //
	.useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!                                       //
	.duration(350) //how fast do you want the lines to transition?                                                        //
	.showLegend(true) //Show the legend, allowing users to turn on/off line series.                                       //
	.showYAxis(true) //Show the y-axis                                                                                    //
	.showXAxis(true).x(function (d) {                                                                                     //
		return d.x;                                                                                                          // 13
	}).y(function (d) {                                                                                                   //
		return d.y;                                                                                                          // 16
	});                                                                                                                   //
                                                                                                                       //
	// chart.xAxis                                                                                                        //
	// .axisLabel("Time (s)")                                                                                             //
	// .tickFormat(d3.format(',.1f'))                                                                                     //
	// .staggerLabels(true);                                                                                              //
                                                                                                                       //
	// .tickFormat(function(d) {                                                                                          //
	// 	return d3.time.format('%e, %H:%M')(new Date(d))                                                                   //
	// });                                                                                                                //
                                                                                                                       //
	// chart.yAxis                                                                                                        //
	// 	.axisLabel('Voltage (v)')                                                                                         //
	// 	.tickFormat(function(d) {                                                                                         //
	// 		if (d == null) {                                                                                                 //
	// 			return 'N/A';                                                                                                   //
	// 		}                                                                                                                //
	// 		return d3.format(',.2f')(d);                                                                                     //
	// 	});                                                                                                               //
	chart.yAxis.tickFormat(function (d) {                                                                                 // 1
		// return d3.time.format('%-H h : %M m : %S s')(new Date(d))                                                         //
		var date = new Date(d);                                                                                              // 39
		date.setHours(date.getHours() - 1);                                                                                  // 40
                                                                                                                       //
		if (date.getHours() === 0) {                                                                                         // 42
			return d3.time.format('%M min : %S sec')(date);                                                                     // 43
		} else {                                                                                                             //
			return d3.time.format('%-H h : %M min : %S sec')(date);                                                             // 45
		}                                                                                                                    //
	});                                                                                                                   //
                                                                                                                       //
	nv.addGraph(function () {                                                                                             // 49
		d3.select('#chartLineOnlineUser svg').datum(data()).call(chart);                                                     // 50
                                                                                                                       //
		nv.utils.windowResize(chart.update);                                                                                 // 54
                                                                                                                       //
		return chart;                                                                                                        // 56
	});                                                                                                                   //
                                                                                                                       //
	// update chart when data changes                                                                                     //
	this.autorun(function () {                                                                                            // 1
		d3.select('#chartLineOnlineUser svg').datum(data()).call(chart);                                                     // 61
                                                                                                                       //
		chart.update();                                                                                                      // 65
	});                                                                                                                   //
                                                                                                                       //
	function data() {                                                                                                     // 68
		var result = [];                                                                                                     // 69
		var data = Data.Status.find({}, {                                                                                    // 70
			sort: {                                                                                                             // 71
				timestamp: 1                                                                                                       // 72
			}                                                                                                                   //
		}).fetch();                                                                                                          //
		var byUser = R.groupBy(function (entry) {                                                                            // 75
			return entry.userId;                                                                                                // 76
		});                                                                                                                  //
		var byDate = R.groupBy(function (entry) {                                                                            // 78
			var day = entry.timestamp;                                                                                          // 79
			if (entry.timestamp.getDate()) {                                                                                    // 80
				return day.getDate();                                                                                              // 81
			}                                                                                                                   //
		});                                                                                                                  //
		var online = void 0;                                                                                                 // 84
		var offline = void 0;                                                                                                // 85
		var isOnline = function isOnline(n, m) {                                                                             // 86
			return n.status === "online";                                                                                       //
		};                                                                                                                   //
		var isOffline = function isOffline(n, m) {                                                                           // 87
			return n.status === "offline";                                                                                      //
		};                                                                                                                   //
		var getRange = function getRange(n) {                                                                                // 88
			return n[1] - n[0];                                                                                                 //
		};                                                                                                                   //
                                                                                                                       //
		var groupedByUser = byUser(data);                                                                                    // 90
                                                                                                                       //
		for (var k in meteorBabelHelpers.sanitizeForInObject(groupedByUser)) {                                               // 92
			if (groupedByUser.hasOwnProperty(k)) {                                                                              // 93
				// console.log(k);                                                                                                 //
				var userValues = [];                                                                                               // 95
				var userStream = {                                                                                                 // 96
					values: userValues,                                                                                               // 97
					key: k, // userId                                                                                                 // 98
					strokeWidth: 3,                                                                                                   // 99
					classed: 'dashed'                                                                                                 // 100
				};                                                                                                                 //
                                                                                                                       //
				var groupedByDate = byDate(groupedByUser[k]);                                                                      // 103
				// console.log(groupedByDate);                                                                                     //
				for (var l in meteorBabelHelpers.sanitizeForInObject(groupedByDate)) {                                             // 93
					if (groupedByDate.hasOwnProperty(l)) {                                                                            // 106
						online = R.pluck('timestamp')(R.filter(isOnline, groupedByDate[l]));                                             // 107
						offline = R.pluck('timestamp')(R.filter(isOffline, groupedByDate[l]));                                           // 108
                                                                                                                       //
						var onOff = R.zip(online, offline);                                                                              // 110
						var timeRanges = R.map(getRange, onOff);                                                                         // 111
						var timeTotalPerDatePerUser = R.sum(timeRanges);                                                                 // 112
						// console.log(l);                                                                                               //
						// console.log(timeTotalPerDatePerUser);                                                                         //
						userValues.push({                                                                                                // 106
							x: l, // date                                                                                                   // 116
							y: timeTotalPerDatePerUser                                                                                      // 117
						}); //the nulls are to show how defined works                                                                    //
					}                                                                                                                 // 106
				};                                                                                                                 //
				result.push(userStream);                                                                                           // 121
			}                                                                                                                   //
		};                                                                                                                   //
		return result;                                                                                                       // 124
	};                                                                                                                    //
};                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"status.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/status/status.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.status.onCreated(function () {                                                                                // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataDetail');                                                                                     // 3
	template.subscribe('userStatus');                                                                                     // 4
});                                                                                                                    //
                                                                                                                       //
Template.status.events({                                                                                               // 7
	'click .btn-test': function () {                                                                                      // 8
		function clickBtnTest(event, template) {                                                                             //
			var result = [];                                                                                                    // 9
			var data = Data.Status.find({}, {                                                                                   // 10
				sort: {                                                                                                            // 11
					timestamp: 1                                                                                                      // 12
				}                                                                                                                  //
			}).fetch();                                                                                                         //
			var byUser = R.groupBy(function (entry) {                                                                           // 15
				return entry.userId;                                                                                               // 16
			});                                                                                                                 //
			var byDate = R.groupBy(function (entry) {                                                                           // 18
				var day = entry.timestamp;                                                                                         // 19
				if (entry.timestamp.getHours()) {                                                                                  // 20
					return day.getMonth() + 1 + "-" + day.getDate();                                                                  // 21
				}                                                                                                                  //
			});                                                                                                                 //
			var online = void 0;                                                                                                // 24
			var offline = void 0;                                                                                               // 25
			var isOnline = function () {                                                                                        // 26
				function isOnline(n, m) {                                                                                          // 26
					return n.status === "online";                                                                                     //
				}                                                                                                                  //
                                                                                                                       //
				return isOnline;                                                                                                   //
			}();                                                                                                                //
			var isOffline = function () {                                                                                       // 27
				function isOffline(n, m) {                                                                                         // 27
					return n.status === "offline";                                                                                    //
				}                                                                                                                  //
                                                                                                                       //
				return isOffline;                                                                                                  //
			}();                                                                                                                //
			var getRange = function () {                                                                                        // 28
				function getRange(n) {                                                                                             // 28
					return n[1] - n[0];                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return getRange;                                                                                                   //
			}();                                                                                                                //
                                                                                                                       //
			var groupedByUser = byUser(data);                                                                                   // 30
                                                                                                                       //
			for (var k in meteorBabelHelpers.sanitizeForInObject(groupedByUser)) {                                              // 32
				if (groupedByUser.hasOwnProperty(k)) {                                                                             // 33
					// console.log(k);                                                                                                //
					var userValues = [];                                                                                              // 35
					var userStream = {                                                                                                // 36
						area: true,                                                                                                      // 37
						values: userValues,                                                                                              // 38
						key: k, // userId                                                                                                // 39
						strokeWidth: 4,                                                                                                  // 40
						classed: 'dashed'                                                                                                // 41
					};                                                                                                                //
                                                                                                                       //
					var groupedByDate = byDate(groupedByUser[k]);                                                                     // 44
					// console.log(groupedByDate);                                                                                    //
					for (var l in meteorBabelHelpers.sanitizeForInObject(groupedByDate)) {                                            // 33
						if (groupedByDate.hasOwnProperty(l)) {                                                                           // 47
							online = R.pluck('timestamp')(R.filter(isOnline, groupedByDate[l]));                                            // 48
							offline = R.pluck('timestamp')(R.filter(isOffline, groupedByDate[l]));                                          // 49
                                                                                                                       //
							var onOff = R.zip(online, offline);                                                                             // 51
							var timeRanges = R.map(getRange, onOff);                                                                        // 52
							var timeTotalPerDatePerUser = R.sum(timeRanges);                                                                // 53
							// console.log(l);                                                                                              //
							// console.log(timeTotalPerDatePerUser);                                                                        //
							userValues.push({                                                                                               // 47
								x: l, // date                                                                                                  // 57
								y: timeTotalPerDatePerUser                                                                                     // 58
							}); //the nulls are to show how defined works                                                                   //
						}                                                                                                                // 47
					};                                                                                                                //
					result.push(userStream);                                                                                          // 62
				}                                                                                                                  //
			};                                                                                                                  //
			console.log(result);                                                                                                // 65
                                                                                                                       //
			// console.log(data);                                                                                               //
			// console.log(groupedByUser);                                                                                      //
			// let byMode = R.groupBy(function(entry) {                                                                         //
			// 	return entry.mode;                                                                                              //
			// });                                                                                                              //
			// let byAttention = R.groupBy(function(entry) {                                                                    //
			// 	return entry.attention;                                                                                         //
			// });                                                                                                              //
			// let byDate = R.groupBy(function(entry) {                                                                         //
			// 	let day = entry.timestamp;                                                                                      //
			// 	// day.setHours(0);                                                                                             //
			// 	// day.setMinutes(0);                                                                                           //
			// 	day.setSeconds(0);                                                                                              //
			// 	day.setMilliseconds(0);                                                                                         //
			// 	if (entry.timestamp.getMinutes()) {                                                                             //
			// 		return day;                                                                                                    //
			// 	}                                                                                                               //
			// });                                                                                                              //
                                                                                                                       //
			// let groupedByVocabularyId = byVocabularyId(data);                                                                //
			// for (let k in groupedByVocabularyId) {                                                                           //
			// 	if (groupedByVocabularyId.hasOwnProperty(k)) {                                                                  //
			// 		result.push({                                                                                                  //
			// 			x: groupedByVocabularyId[k][0].vocabularyName,                                                                //
			// 			y: R.sum(R.pluck('viewed')(groupedByVocabularyId[k]))                                                         //
			// 		});                                                                                                            //
			// 	}                                                                                                               //
			// };                                                                                                               //
			// result.forEach(entry => {                                                                                        //
			// 		console.log(R.prop('y', entry));                                                                               //
			// 	})                                                                                                              //
			// console.log(result);                                                                                             //
		}                                                                                                                    //
                                                                                                                       // 8
		return clickBtnTest;                                                                                                 //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"total":{"template.chart_bar_clicks_per_day.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/total/template.chart_bar_clicks_per_day.js                                      //
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

},"template.chart_pie_attention.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/total/template.chart_pie_attention.js                                           //
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

},"template.total.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/total/template.total.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("total");                                                                                         // 2
Template["total"] = new Template("Template.total", (function() {                                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, HTML.Raw("\n		<h1>Total</h1>\n		"), HTML.H4("Gesetzte Datenpunkte (Clickevents): ", Blaze.View("lookup:dataPointsCount", function() {
    return Spacebars.mustache(view.lookup("dataPointsCount"));                                                         // 8
  })), HTML.Raw("\n		<hr>\n		"), HTML.DIV({                                                                            // 9
    "class": "row"                                                                                                     // 10
  }, "\n			", Spacebars.include(view.lookupTemplate("chartBarClicksPerDay")), "\n		"), HTML.Raw("\n		<br>\n		"), HTML.DIV({
    "class": "row"                                                                                                     // 12
  }, "\n			", HTML.DIV({                                                                                               // 13
    "class": "col-sm-6"                                                                                                // 14
  }, "\n				", Spacebars.include(view.lookupTemplate("chartPieAttention")), "\n			"), "\n			", HTML.Raw('<div class="col-sm-6">\n\n			</div>'), "\n		"), "\n	");
}));                                                                                                                   // 16
                                                                                                                       // 17
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"chart_bar_clicks_per_day.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/total/chart_bar_clicks_per_day.js                                               //
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
	chart.xAxis.axisLabel('Minute').tickFormat(function (d) {                                                             // 54
		return d3.time.format('%e, %H:%M')(new Date(d));                                                                     // 57
	});                                                                                                                   //
	chart.yAxis.tickFormat(d3.format(',.1f')).axisLabel('Clicks');                                                        // 59
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

},"chart_pie_attention.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/total/chart_pie_attention.js                                                    //
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

},"total.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/total/total.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.total.onCreated(function () {                                                                                 // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataDetail');                                                                                     // 3
	template.subscribe('user');                                                                                           // 4
});                                                                                                                    //
                                                                                                                       //
Template.total.helpers({                                                                                               // 7
	dataPointsCount: function () {                                                                                        // 8
		function dataPointsCount() {                                                                                         //
			return Data.Detail.find({}).count();                                                                                // 9
		}                                                                                                                    //
                                                                                                                       //
		return dataPointsCount;                                                                                              //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"template.chart_multibar_attention.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/template.chart_multibar_attention.js                                            //
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

},"chart_multibar_attention.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/charts/chart_multibar_attention.js                                                     //
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

}},"template.feedback.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/template.feedback.js                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("feedback");                                                                                      // 2
Template["feedback"] = new Template("Template.feedback", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.H4("online: ", Blaze.View("lookup:usersCountOnline", function() {                                   // 9
    return Spacebars.mustache(view.lookup("usersCountOnline"));                                                        // 10
  }), " von ", Blaze.View("lookup:usersCount", function() {                                                            // 11
    return Spacebars.mustache(view.lookup("usersCount"));                                                              // 12
  }), " "), "\n			", Blaze.Each(function() {                                                                           // 13
    return Spacebars.call(view.lookup("users"));                                                                       // 14
  }, function() {                                                                                                      // 15
    return [ "\n				", HTML.SPAN({                                                                                     // 16
      "class": function() {                                                                                            // 17
        return [ "label ", Spacebars.mustache(view.lookup("labelClass")) ];                                            // 18
      }                                                                                                                // 19
    }, Blaze.View("lookup:email", function() {                                                                         // 20
      return Spacebars.mustache(view.lookup("email"));                                                                 // 21
    })), "\n			" ];                                                                                                    // 22
  }), "\n			", HTML.Raw("<hr>"), "\n			", HTML.H4("Fragebogen abgeschickt: ", Blaze.View("lookup:usersSurveySubmittedCount", function() {
    return Spacebars.mustache(view.lookup("usersSurveySubmittedCount"));                                               // 24
  }), " von ", Blaze.View("lookup:usersCount", function() {                                                            // 25
    return Spacebars.mustache(view.lookup("usersCount"));                                                              // 26
  }), " "), "\n			", Blaze.Each(function() {                                                                           // 27
    return Spacebars.call(view.lookup("usersSurveySubmitted"));                                                        // 28
  }, function() {                                                                                                      // 29
    return [ "\n				", HTML.SPAN({                                                                                     // 30
      "class": "label label-primary"                                                                                   // 31
    }, Blaze.View("lookup:userMail", function() {                                                                      // 32
      return Spacebars.mustache(view.lookup("userMail"));                                                              // 33
    })), "\n			" ];                                                                                                    // 34
  }), "\n			", HTML.Raw("<hr>"), "\n		"), HTML.Raw("\n\n		<h1>Feedback</h1>\n\n		"), Blaze.Each(function() {           // 35
    return Spacebars.call(view.lookup("feedback"));                                                                    // 36
  }, function() {                                                                                                      // 37
    return [ "\n		", HTML.DIV({                                                                                        // 38
      "class": "panel panel-default"                                                                                   // 39
    }, "\n			", HTML.DIV({                                                                                             // 40
      "class": "panel-heading"                                                                                         // 41
    }, Blaze.View("lookup:userMail", function() {                                                                      // 42
      return Spacebars.mustache(view.lookup("userMail"));                                                              // 43
    }), " | ", Blaze.View("lookup:createdAt", function() {                                                             // 44
      return Spacebars.mustache(view.lookup("createdAt"));                                                             // 45
    })), "\n			", HTML.DIV({                                                                                           // 46
      "class": "panel-body"                                                                                            // 47
    }, "\n				", Blaze.View("lookup:message", function() {                                                             // 48
      return Spacebars.mustache(view.lookup("message"));                                                               // 49
    }), "\n			"), "\n		"), "\n		" ];                                                                                   // 50
  }), "\n	");                                                                                                          // 51
}));                                                                                                                   // 52
                                                                                                                       // 53
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"feedback.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/verwaltung/feedback.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.feedback.onCreated(function () {                                                                              // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('feedback');                                                                                       // 3
	template.subscribe('user');                                                                                           // 4
	template.subscribe('userExtAll');                                                                                     // 5
});                                                                                                                    //
                                                                                                                       //
Template.feedback.helpers({                                                                                            // 8
	users: function () {                                                                                                  // 9
		function users() {                                                                                                   //
			return Meteor.users.find({});                                                                                       // 10
		}                                                                                                                    //
                                                                                                                       //
		return users;                                                                                                        //
	}(),                                                                                                                  //
	usersCount: function () {                                                                                             // 12
		function usersCount() {                                                                                              //
			return Meteor.users.find().count();                                                                                 // 13
		}                                                                                                                    //
                                                                                                                       //
		return usersCount;                                                                                                   //
	}(),                                                                                                                  //
	usersCountOnline: function () {                                                                                       // 15
		function usersCountOnline() {                                                                                        //
			return Meteor.users.find({                                                                                          // 16
				"status.online": true                                                                                              // 17
			}).count();                                                                                                         //
		}                                                                                                                    //
                                                                                                                       //
		return usersCountOnline;                                                                                             //
	}(),                                                                                                                  //
	email: function () {                                                                                                  // 20
		function email() {                                                                                                   //
			if (this.emails[0].address) {                                                                                       // 21
				return this.emails[0].address;                                                                                     // 22
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return email;                                                                                                        //
	}(),                                                                                                                  //
	labelClass: function () {                                                                                             // 25
		function labelClass() {                                                                                              //
			var userOnline = Meteor.users.findOne({                                                                             // 26
				_id: this._id,                                                                                                     // 27
				"status.online": true                                                                                              // 28
			});                                                                                                                 //
			if (userOnline) {                                                                                                   // 30
				return "label-success";                                                                                            // 31
			} else {                                                                                                            //
				return "label-default";                                                                                            // 33
			};                                                                                                                  //
		}                                                                                                                    //
                                                                                                                       //
		return labelClass;                                                                                                   //
	}(),                                                                                                                  //
	usersSurveySubmitted: function () {                                                                                   // 36
		function usersSurveySubmitted() {                                                                                    //
			return UserExt.find({                                                                                               // 37
				"surveySubmitted": true                                                                                            // 38
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return usersSurveySubmitted;                                                                                         //
	}(),                                                                                                                  //
	usersSurveySubmittedCount: function () {                                                                              // 41
		function usersSurveySubmittedCount() {                                                                               //
			return UserExt.find({                                                                                               // 42
				"surveySubmitted": true                                                                                            // 43
			}).count();                                                                                                         //
		}                                                                                                                    //
                                                                                                                       //
		return usersSurveySubmittedCount;                                                                                    //
	}(),                                                                                                                  //
	feedback: function () {                                                                                               // 46
		function feedback() {                                                                                                //
			return Data.Feedback.find({}, {                                                                                     // 47
				sort: {                                                                                                            // 48
					createdAt: -1                                                                                                     // 49
				}                                                                                                                  //
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return feedback;                                                                                                     //
	}(),                                                                                                                  //
	userMail: function () {                                                                                               // 53
		function userMail() {                                                                                                //
			return this.userMail;                                                                                               // 54
		}                                                                                                                    //
                                                                                                                       //
		return userMail;                                                                                                     //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index":{"components":{"template.faqWidget.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/template.faqWidget.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("faqWidget");                                                                                     // 2
Template["faqWidget"] = new Template("Template.faqWidget", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "list-post"                                                                                               // 6
  }, HTML.Raw("\n		<p class=\"categories\">\n			FAQ\n		</p>\n		<h2 class=\"category-title\">Erste Schritte</h2>\n		<p class=\"body-text\">\n			Der Fremdworttrainer verfuegt ueber ein Wortregister und einen Trainer mit 4 Modi.\n			<br> Im <i>Wortregister</i> findest du eine Auflistung aller registrierten Begriffe. Begriffe koennen favorisiert werden und werden dann dort separat gelistet.\n			<br> Im <i>Trainer</i> kannst du aus 4 verschiedenen Uebungsmodi waehlen: 'Lesen', 'Wort', 'Bedeutung' und 'Eingabe'.\n			<br> Des weiteren hast du die Moeglichkeit die Quelle der Woerter auszuwaehlen. Entweder das komplette Register (inkl. Favoriten) oder ausschliesslich Favoriten. Woerter koennen sowohl im Register als auch im Modus 'Lesen' zur Favoritenliste hinzugefuegt und entfernt werden.\n			<br> Am Seitenkopf findest du eine Switch-Button-Leiste, mit der du in den <i>Kompaktmodus</i> und wieder zurueck wechseln kannst. Der Modus 'Eingabe' ist im Kompaktmodus nicht vorhanden.\n		</p>\n		"), HTML.A({
    "class": "btn btn-standard-1 btn-question",                                                                        // 8
    href: function() {                                                                                                 // 9
      return Spacebars.mustache(view.lookup("pathFor"), "faq");                                                        // 10
    }                                                                                                                  // 11
  }, "Mehr"), "\n	");                                                                                                  // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.feedback.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/template.feedback.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("feedbackClient");                                                                                // 2
Template["feedbackClient"] = new Template("Template.feedbackClient", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": ""                                                                                                        // 6
  }, "\n  ", Blaze._TemplateWith(function() {                                                                          // 7
    return {                                                                                                           // 8
      collection: Spacebars.call("Data.Feedback"),                                                                     // 9
      id: Spacebars.call("insertFeedbackForm"),                                                                        // 10
      type: Spacebars.call("insert")                                                                                   // 11
    };                                                                                                                 // 12
  }, function() {                                                                                                      // 13
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 14
      return [ "\n  ", HTML.FIELDSET("\n    ", Blaze._TemplateWith(function() {                                        // 15
        return {                                                                                                       // 16
          name: Spacebars.call("message")                                                                              // 17
        };                                                                                                             // 18
      }, function() {                                                                                                  // 19
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 20
      }), "\n    ", HTML.DIV("\n      ", HTML.BUTTON({                                                                 // 21
        type: "submit",                                                                                                // 22
        "class": "btn btn-standard-1"                                                                                  // 23
      }, "Senden"), "\n      ", HTML.BUTTON({                                                                          // 24
        type: "reset",                                                                                                 // 25
        "class": "btn btn-standard-1"                                                                                  // 26
      }, "Zuruecksetzen"), "\n    "), "\n  "), "\n  " ];                                                               // 27
    });                                                                                                                // 28
  }), "\n");                                                                                                           // 29
}));                                                                                                                   // 30
                                                                                                                       // 31
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.term_day.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/template.term_day.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("termDay");                                                                                       // 2
Template["termDay"] = new Template("Template.termDay", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<br>\n		"), HTML.DIV({                                                                            // 5
    "class": "text-center"                                                                                             // 6
  }, "\n			", HTML.Raw('<p class="categories">\n				Dein Wort des Tages\n			</p>'), "\n			", Spacebars.With(function() {
    return Spacebars.call(view.lookup("termDay"));                                                                     // 8
  }, function() {                                                                                                      // 9
    return [ "\n				", HTML.H2({                                                                                       // 10
      "class": "category-title"                                                                                        // 11
    }, Blaze.View("lookup:term", function() {                                                                          // 12
      return Spacebars.mustache(view.lookup("term"));                                                                  // 13
    })), "\n				", HTML.DIV({                                                                                          // 14
      "class": "category-definition"                                                                                   // 15
    }, "\n					", HTML.OL("\n						", Blaze.Each(function() {                                                          // 16
      return Spacebars.call(view.lookup("definition"));                                                                // 17
    }, function() {                                                                                                    // 18
      return [ "\n						", HTML.LI(Blaze.View("lookup:.", function() {                                                 // 19
        return Spacebars.mustache(view.lookup("."));                                                                   // 20
      })), "\n						" ];                                                                                               // 21
    }), "\n					"), "\n				"), "\n				", HTML.H2(HTML.I({                                                              // 22
      "class": "fa fa-heart-o"                                                                                         // 23
    })), "\n			" ];                                                                                                    // 24
  }), "\n		") ];                                                                                                       // 25
}));                                                                                                                   // 26
                                                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.wordsAll.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/template.wordsAll.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("wordsAll");                                                                                      // 2
Template["wordsAll"] = new Template("Template.wordsAll", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("top5"));                                                                        // 6
  }, function() {                                                                                                      // 7
    return [ "\n		", HTML.H5({                                                                                         // 8
      "class": "widget-title"                                                                                          // 9
    }, "Top 5 Insgesamt"), "\n		", HTML.DIV({                                                                          // 10
      "class": "widget"                                                                                                // 11
    }, "\n			", HTML.UL("\n				", Blaze.Each(function() {                                                              // 12
      return Spacebars.call(view.lookup("top5"));                                                                      // 13
    }, function() {                                                                                                    // 14
      return [ "\n				", HTML.LI(Blaze.View("lookup:term", function() {                                                // 15
        return Spacebars.mustache(view.lookup("term"));                                                                // 16
      })), "\n				" ];                                                                                                 // 17
    }), "\n			"), "\n		"), "\n	" ];                                                                                    // 18
  });                                                                                                                  // 19
}));                                                                                                                   // 20
                                                                                                                       // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.wordsUser.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/template.wordsUser.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("wordsUser");                                                                                     // 2
Template["wordsUser"] = new Template("Template.wordsUser", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw('<h5 class="widget-title">Top 5 Persoenlich</h5>\n		'), HTML.DIV({                                 // 5
    "class": "widget"                                                                                                  // 6
  }, "\n			", Blaze.If(function() {                                                                                    // 7
    return Spacebars.call(view.lookup("top5"));                                                                        // 8
  }, function() {                                                                                                      // 9
    return [ "\n				", HTML.UL("\n					", Blaze.Each(function() {                                                      // 10
      return Spacebars.call(view.lookup("top5"));                                                                      // 11
    }, function() {                                                                                                    // 12
      return [ "\n					", HTML.LI(Blaze.View("lookup:vocabularyName", function() {                                     // 13
        return Spacebars.mustache(view.lookup("vocabularyName"));                                                      // 14
      })), "\n					" ];                                                                                                // 15
    }), "\n				"), "\n			" ];                                                                                          // 16
  }, function() {                                                                                                      // 17
    return [ "\n				", HTML.DIV({                                                                                      // 18
      "class": "categories text-center"                                                                                // 19
    }, "\n					Nicht genuegend Daten. Benutz' mich. ", HTML.BR(), HTML.BR(), "\n				"), "\n			" ];                     // 20
  }), "\n		") ];                                                                                                       // 21
}));                                                                                                                   // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"feedback.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/feedback.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var hooksFeedbackForm = {                                                                                              // 1
	onSuccess: function () {                                                                                              // 2
		function onSuccess(formType, result) {                                                                               // 2
			var msg = 'Feedback erfolgreich gesendet.';                                                                         // 3
			toastr.success(msg);                                                                                                // 4
		}                                                                                                                    //
                                                                                                                       //
		return onSuccess;                                                                                                    //
	}(),                                                                                                                  //
	onError: function () {                                                                                                // 6
		function onError(formType, error) {                                                                                  // 6
			var msg = 'Feedback konnte nicht gesendet werden.';                                                                 // 7
			toastr.error(msg);                                                                                                  // 8
		}                                                                                                                    //
                                                                                                                       //
		return onError;                                                                                                      //
	}()                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
AutoForm.addHooks(['insertFeedbackForm'], hooksFeedbackForm);                                                          // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"term_day.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/term_day.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.termDay.onCreated(function () {                                                                               // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('vocabularyAll');                                                                                  // 3
	template.subscribe('termDay');                                                                                        // 4
});                                                                                                                    //
                                                                                                                       //
Template.termDay.helpers({                                                                                             // 7
	termDay: function () {                                                                                                // 8
		function termDay() {                                                                                                 //
			var currentUserId = Meteor.userId();                                                                                // 9
			var termDay = TermDay.findOne({                                                                                     // 10
				userId: currentUserId                                                                                              // 11
			}, {                                                                                                                //
				sort: {                                                                                                            // 13
					timestamp: -1                                                                                                     // 14
				}                                                                                                                  //
			});                                                                                                                 //
			if (termDay) {                                                                                                      // 17
				var vocabulary = Vocabulary.findOne({                                                                              // 18
					_id: termDay.vocabularyId                                                                                         // 19
				});                                                                                                                //
				if (vocabulary) {                                                                                                  // 21
					return vocabulary;                                                                                                // 22
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return termDay;                                                                                                      //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wordsAll.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/wordsAll.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.wordsAll.onCreated(function () {                                                                              // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataWords');                                                                                      // 3
});                                                                                                                    //
                                                                                                                       //
Template.wordsAll.helpers({                                                                                            // 6
	top5: function () {                                                                                                   // 7
		function top5() {                                                                                                    //
			var result = [];                                                                                                    // 8
			var data = Data.Words.find({}, {                                                                                    // 9
				sort: {                                                                                                            // 10
					viewed: -1,                                                                                                       // 11
					vocabularyName: 1                                                                                                 // 12
				}                                                                                                                  //
			}).fetch();                                                                                                         //
			var byVocabularyId = R.groupBy(function (entry) {                                                                   // 15
				return entry.vocabularyId;                                                                                         // 16
			});                                                                                                                 //
                                                                                                                       //
			var groupedByVocabularyId = byVocabularyId(data);                                                                   // 19
			for (var k in meteorBabelHelpers.sanitizeForInObject(groupedByVocabularyId)) {                                      // 20
				if (groupedByVocabularyId.hasOwnProperty(k)) {                                                                     // 21
					result.push({                                                                                                     // 22
						term: groupedByVocabularyId[k][0].vocabularyName,                                                                // 23
						count: R.sum(R.pluck('viewed')(groupedByVocabularyId[k]))                                                        // 24
					});                                                                                                               //
				}                                                                                                                  //
			};                                                                                                                  //
			var sortByViewed = R.sortBy(R.prop('count'));                                                                       // 28
			result = R.take(5, R.reverse(sortByViewed(result)));                                                                // 29
			if (result.length >= 5) {                                                                                           // 30
				return result;                                                                                                     // 31
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return top5;                                                                                                         //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wordsUser.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/components/wordsUser.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.wordsUser.onCreated(function () {                                                                             // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataWords');                                                                                      // 3
});                                                                                                                    //
Template.wordsUser.helpers({                                                                                           // 5
	top5: function () {                                                                                                   // 6
		function top5() {                                                                                                    //
			var data = Data.Words.find({                                                                                        // 7
				userId: Meteor.userId()                                                                                            // 8
			}, {                                                                                                                //
				limit: 5,                                                                                                          // 10
				sort: {                                                                                                            // 11
					viewed: -1,                                                                                                       // 12
					vocabularyName: -1                                                                                                // 13
				}                                                                                                                  //
			}).fetch();                                                                                                         //
			if (data.length >= 5) {                                                                                             // 16
				return data;                                                                                                       // 17
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return top5;                                                                                                         //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"template.index.js":function(){

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
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "row"                                                                                                     // 8
  }, "\n    ", HTML.SPAN({                                                                                             // 9
    "class": "categories"                                                                                              // 10
  }, Blaze.If(function() {                                                                                             // 11
    return Spacebars.call(view.lookup("currentUser"));                                                                 // 12
  }, function() {                                                                                                      // 13
    return [ "Angemeldet als: ", Blaze.View("lookup:currentUserMail", function() {                                     // 14
      return Spacebars.mustache(view.lookup("currentUserMail"));                                                       // 15
    }), " " ];                                                                                                         // 16
  })), "\n    "), "\n    ", HTML.DIV({                                                                                 // 17
    "class": "row"                                                                                                     // 18
  }, "\n      ", Blaze.Unless(function() {                                                                             // 19
    return Spacebars.call(view.lookup("surveySubmitted"));                                                             // 20
  }, function() {                                                                                                      // 21
    return [ "\n      ", HTML.BR(), "\n      ", HTML.DIV({                                                             // 22
      "class": "archive-box"                                                                                           // 23
    }, "\n        ", HTML.P("\n          Bitte fuelle den Fragebogen aus. Du hast bis zum 03. Juli 2016 dafuer Zeit. Nur mit ausgefuellten Fragebogen ist deine Teilnahme gueltig.\n        "), "\n        ", HTML.A({
      "class": "btn btn-standard-1 btn-question",                                                                      // 25
      href: function() {                                                                                               // 26
        return Spacebars.mustache(view.lookup("pathFor"), "fragebogen");                                               // 27
      }                                                                                                                // 28
    }, "Fragebogen"), "\n      "), "\n      " ];                                                                       // 29
  }), "\n      ", HTML.Raw("<br>"), "\n\n    "), "\n    ", HTML.DIV({                                                  // 30
    "class": "row"                                                                                                     // 31
  }, "\n      ", Spacebars.include(view.lookupTemplate("termDay")), "\n    "), HTML.Raw("\n    <br>\n    <br>\n    "), HTML.DIV({
    "class": "row"                                                                                                     // 33
  }, "\n      ", HTML.DIV({                                                                                            // 34
    "class": "col-sm-8"                                                                                                // 35
  }, "\n        ", HTML.DIV({                                                                                          // 36
    "class": "row offset-1"                                                                                            // 37
  }, "\n          ", Spacebars.include(view.lookupTemplate("faqWidget")), "\n        "), "\n        ", HTML.DIV({      // 38
    "class": "row offset-1"                                                                                            // 39
  }, "\n          ", Spacebars.include(view.lookupTemplate("feedbackClient")), "\n        "), "\n      "), "\n      ", HTML.DIV({
    "class": "col-sm-4 "                                                                                               // 41
  }, "\n        ", HTML.Raw('<p class="categories text-center">\n          Beliebte Woerter\n        </p>'), "\n        ", HTML.DIV({
    "class": "row"                                                                                                     // 43
  }, "\n          ", Spacebars.include(view.lookupTemplate("wordsUser")), "\n        "), "\n        ", HTML.DIV({      // 44
    "class": "row"                                                                                                     // 45
  }, "\n          ", Spacebars.include(view.lookupTemplate("wordsAll")), "\n        "), "\n      "), "\n    "), HTML.Raw("\n\n    <br>\n\n  "));
}));                                                                                                                   // 47
                                                                                                                       // 48
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"trainer":{"modes":{"template.modus_definition.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/trainer/modes/template.modus_definition.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusDefinition");                                                                               // 2
Template["modusDefinition"] = new Template("Template.modusDefinition", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "jumbotron"                                                                                               // 6
  }, "\n\n		", HTML.DIV({                                                                                              // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "media"                                                                                                   // 10
  }, "\n				", HTML.DIV({                                                                                              // 11
    "class": "media-body"                                                                                              // 12
  }, "\n					", Blaze.If(function() {                                                                                  // 13
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 14
  }, function() {                                                                                                      // 15
    return HTML.SPAN({                                                                                                 // 16
      "class": "flag animate-box fadeInUp animated"                                                                    // 17
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 18
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 19
    }, function() {                                                                                                    // 20
      return "Favoriten";                                                                                              // 21
    }, function() {                                                                                                    // 22
      return "Nicht-Favoriten";                                                                                        // 23
    }));                                                                                                               // 24
  }), "\n				"), "\n				", HTML.Raw('<div class="media-right">\n					<div class="i-transparent">\n						<i class="fa fa-minus fa-4x"></i>\n					</div>\n				</div>'), "\n			"), "\n		"), "\n\n		", HTML.DIV({
    "class": "row"                                                                                                     // 26
  }, "\n			", HTML.DIV({                                                                                               // 27
    "class": "text-center"                                                                                             // 28
  }, "\n				", HTML.P({                                                                                                // 29
    "class": "trainer-word-class fadeInUp animated"                                                                    // 30
  }, "\n					", Blaze.View("lookup:wordClass", function() {                                                            // 31
    return Spacebars.mustache(view.lookup("wordClass"));                                                               // 32
  }), "\n				"), "\n				", HTML.H2({                                                                                   // 33
    "class": "trainer-title"                                                                                           // 34
  }, Blaze.View("lookup:term", function() {                                                                            // 35
    return Spacebars.mustache(view.lookup("term"));                                                                    // 36
  }), Blaze.If(function() {                                                                                            // 37
    return Spacebars.call(view.lookup("preposition"));                                                                 // 38
  }, function() {                                                                                                      // 39
    return [ " ", HTML.SPAN({                                                                                          // 40
      "class": "trainer-preposition"                                                                                   // 41
    }, HTML.I(Blaze.View("lookup:preposition", function() {                                                            // 42
      return Spacebars.mustache(view.lookup("preposition"));                                                           // 43
    }))) ];                                                                                                            // 44
  })), "\n				", HTML.Raw("<!-- DEFINITION -->"), "\n				", Blaze.Unless(function() {                                  // 45
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 46
  }, function() {                                                                                                      // 47
    return [ "\n					", HTML.DIV({                                                                                     // 48
      "class": "btn-reveal"                                                                                            // 49
    }, "\n						", HTML.I({                                                                                            // 50
      "class": "trainer-question fa fa-question fa-4x"                                                                 // 51
    }), "\n						", HTML.Comment(' <div class="label label-info">Gesucht: Wort</div> '), "\n					"), "\n				" ];       // 52
  }, function() {                                                                                                      // 53
    return [ "\n					", HTML.DIV({                                                                                     // 54
      "class": "trainer-definition flipInX animated"                                                                   // 55
    }, "\n						", HTML.OL("\n							", Blaze.Each(function() {                                                        // 56
      return Spacebars.call(view.lookup("definition"));                                                                // 57
    }, function() {                                                                                                    // 58
      return [ "\n							", HTML.LI(Blaze.View("lookup:.", function() {                                                // 59
        return Spacebars.mustache(view.lookup("."));                                                                   // 60
      })), "\n							" ];                                                                                              // 61
    }), "\n						"), "\n					"), "\n				" ];                                                                           // 62
  }), "\n			"), "\n		"), "\n\n	");                                                                                     // 63
}));                                                                                                                   // 64
                                                                                                                       // 65
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.modus_eingabe.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/trainer/modes/template.modus_eingabe.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusEingabe");                                                                                  // 2
Template["modusEingabe"] = new Template("Template.modusEingabe", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "jumbotron"                                                                                               // 6
  }, "\n\n		", Blaze.If(function() {                                                                                   // 7
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
  }), "\n\n		", HTML.DIV({                                                                                             // 19
    "class": "media"                                                                                                   // 20
  }, "\n			", HTML.DIV({                                                                                               // 21
    "class": "media-left btn-reveal"                                                                                   // 22
  }, "\n					", Blaze.Unless(function() {                                                                              // 23
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 24
  }, function() {                                                                                                      // 25
    return [ "\n						", Blaze.Unless(function() {                                                                     // 26
      return Spacebars.dataMustache(view.lookup("getSession"), "termRight");                                           // 27
    }, function() {                                                                                                    // 28
      return [ "\n							", HTML.I({                                                                                   // 29
        "class": "trainer-question fa fa-question fa-4x"                                                               // 30
      }), "\n						" ];                                                                                                // 31
    }, function() {                                                                                                    // 32
      return [ "\n							", HTML.I({                                                                                   // 33
        "class": "trainer-exclamation fa fa-thumbs-o-up fa-4x"                                                         // 34
      }), "\n						" ];                                                                                                // 35
    }), "\n					" ];                                                                                                   // 36
  }, function() {                                                                                                      // 37
    return [ "\n						", HTML.I({                                                                                      // 38
      "class": "trainer-exclamation fa fa-exclamation fa-4x"                                                           // 39
    }), "\n					" ];                                                                                                   // 40
  }), "\n			"), "\n			", HTML.DIV({                                                                                    // 41
    "class": "media-body media-middle"                                                                                 // 42
  }, "\n				", Blaze.Unless(function() {                                                                               // 43
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 44
  }, function() {                                                                                                      // 45
    return [ "\n					", Blaze.If(function() {                                                                          // 46
      return Spacebars.dataMustache(view.lookup("getSession"), "termWrong");                                           // 47
    }, function() {                                                                                                    // 48
      return [ "\n					", HTML.Comment(' <h2 class="trainer-title">{{ term }}{{#if preposition}} <span class="trainer-preposition"><i>{{ preposition }}</i></span>{{/if}}</h2> '), "\n						", HTML.P({
        "class": "categories"                                                                                          // 50
      }, "Bisher richtig:"), "\n						", HTML.H2({                                                                     // 51
        "class": "trainer-title"                                                                                       // 52
      }, Blaze.View("lookup:getSession", function() {                                                                  // 53
        return Spacebars.mustache(view.lookup("getSession"), "termCache");                                             // 54
      })), "\n					" ];                                                                                                // 55
    }), "\n					", Blaze.If(function() {                                                                               // 56
      return Spacebars.dataMustache(view.lookup("getSession"), "termRight");                                           // 57
    }, function() {                                                                                                    // 58
      return [ "\n						", HTML.P({                                                                                    // 59
        "class": "categories fadeIn animated"                                                                          // 60
      }, "Richtig!"), "\n						", HTML.H2({                                                                            // 61
        "class": "trainer-title fadeIn animated"                                                                       // 62
      }, Blaze.View("lookup:term", function() {                                                                        // 63
        return Spacebars.mustache(view.lookup("term"));                                                                // 64
      }), Blaze.If(function() {                                                                                        // 65
        return Spacebars.call(view.lookup("preposition"));                                                             // 66
      }, function() {                                                                                                  // 67
        return [ " ", HTML.SPAN({                                                                                      // 68
          "class": "trainer-preposition"                                                                               // 69
        }, HTML.I(Blaze.View("lookup:preposition", function() {                                                        // 70
          return Spacebars.mustache(view.lookup("preposition"));                                                       // 71
        }))) ];                                                                                                        // 72
      })), "\n					" ];                                                                                                // 73
    }), "\n				" ];                                                                                                    // 74
  }, function() {                                                                                                      // 75
    return [ "\n				", HTML.P({                                                                                        // 76
      "class": "categories fadeIn animated"                                                                            // 77
    }, Blaze.View("lookup:wordClass", function() {                                                                     // 78
      return Spacebars.mustache(view.lookup("wordClass"));                                                             // 79
    })), "\n				", HTML.H2({                                                                                           // 80
      "class": "trainer-title fadeIn animated"                                                                         // 81
    }, Blaze.View("lookup:term", function() {                                                                          // 82
      return Spacebars.mustache(view.lookup("term"));                                                                  // 83
    }), Blaze.If(function() {                                                                                          // 84
      return Spacebars.call(view.lookup("preposition"));                                                               // 85
    }, function() {                                                                                                    // 86
      return [ " ", HTML.SPAN({                                                                                        // 87
        "class": "trainer-preposition"                                                                                 // 88
      }, HTML.I(Blaze.View("lookup:preposition", function() {                                                          // 89
        return Spacebars.mustache(view.lookup("preposition"));                                                         // 90
      }))) ];                                                                                                          // 91
    })), "\n				" ];                                                                                                   // 92
  }), "\n			"), "\n		"), HTML.Raw('\n\n		<div class="input-group-lg form-wrapper">\n					<input autofocus="" type="text" name="term" id="term" class="form-control" placeholder="Das gesuchte Wort lautet...">\n		</div>\n\n		<br>\n		<br>\n		'), HTML.DIV({
    "class": "text-center "                                                                                            // 94
  }, "\n			", HTML.DIV({                                                                                               // 95
    "class": "trainer-definition flipInX animated"                                                                     // 96
  }, "\n				", HTML.OL("\n					", Blaze.Each(function() {                                                              // 97
    return Spacebars.call(view.lookup("definition"));                                                                  // 98
  }, function() {                                                                                                      // 99
    return [ "\n					", HTML.LI(Blaze.View("lookup:.", function() {                                                    // 100
      return Spacebars.mustache(view.lookup("."));                                                                     // 101
    })), "\n					" ];                                                                                                  // 102
  }), "\n				"), "\n			"), "\n		"), "\n	");                                                                            // 103
}));                                                                                                                   // 104
                                                                                                                       // 105
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.modus_lesen.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/trainer/modes/template.modus_lesen.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusLesen");                                                                                    // 2
Template["modusLesen"] = new Template("Template.modusLesen", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "jumbotron"                                                                                               // 6
  }, "\n\n		", HTML.DIV({                                                                                              // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "media"                                                                                                   // 10
  }, "\n				", HTML.DIV({                                                                                              // 11
    "class": "media-body"                                                                                              // 12
  }, "\n					", Blaze.If(function() {                                                                                  // 13
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 14
  }, function() {                                                                                                      // 15
    return HTML.SPAN({                                                                                                 // 16
      "class": "flag animate-box fadeInUp animated"                                                                    // 17
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 18
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 19
    }, function() {                                                                                                    // 20
      return "Favoriten";                                                                                              // 21
    }, function() {                                                                                                    // 22
      return "Nicht-Favoriten";                                                                                        // 23
    }));                                                                                                               // 24
  }), "\n				"), "\n				", HTML.DIV({                                                                                  // 25
    "class": "media-right"                                                                                             // 26
  }, "\n					", Blaze.If(function() {                                                                                  // 27
    return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                      // 28
  }, function() {                                                                                                      // 29
    return [ "\n					", HTML.DIV({                                                                                     // 30
      "class": "btn-delete fadeInLeft animated"                                                                        // 31
    }, "\n						", HTML.I({                                                                                            // 32
      "class": "fa fa-trash-o fa-4x"                                                                                   // 33
    }), "\n					"), "\n					" ];                                                                                       // 34
  }, function() {                                                                                                      // 35
    return [ "\n					", HTML.DIV({                                                                                     // 36
      "class": "btn-insert fadeInLeft animated"                                                                        // 37
    }, "\n						", HTML.I({                                                                                            // 38
      "class": "fa fa-heart-o fa-4x"                                                                                   // 39
    }), "\n					"), "\n					" ];                                                                                       // 40
  }), "\n				"), "\n			"), "\n		"), "\n\n		", HTML.DIV({                                                               // 41
    "class": "row"                                                                                                     // 42
  }, "\n			", HTML.DIV({                                                                                               // 43
    "class": "text-center"                                                                                             // 44
  }, "\n				", HTML.P({                                                                                                // 45
    "class": "trainer-word-class fadeInUp animated"                                                                    // 46
  }, "\n					", Blaze.View("lookup:wordClass", function() {                                                            // 47
    return Spacebars.mustache(view.lookup("wordClass"));                                                               // 48
  }), "\n				"), "\n				", HTML.H2({                                                                                   // 49
    "class": "trainer-title"                                                                                           // 50
  }, Blaze.View("lookup:term", function() {                                                                            // 51
    return Spacebars.mustache(view.lookup("term"));                                                                    // 52
  }), Blaze.If(function() {                                                                                            // 53
    return Spacebars.call(view.lookup("preposition"));                                                                 // 54
  }, function() {                                                                                                      // 55
    return [ " ", HTML.SPAN({                                                                                          // 56
      "class": "trainer-preposition"                                                                                   // 57
    }, HTML.I(Blaze.View("lookup:preposition", function() {                                                            // 58
      return Spacebars.mustache(view.lookup("preposition"));                                                           // 59
    }))) ];                                                                                                            // 60
  })), "\n				", HTML.DIV({                                                                                            // 61
    "class": "trainer-definition"                                                                                      // 62
  }, "\n					", HTML.OL("\n						", Blaze.Each(function() {                                                            // 63
    return Spacebars.call(view.lookup("definition"));                                                                  // 64
  }, function() {                                                                                                      // 65
    return [ "\n						", HTML.LI(Blaze.View("lookup:.", function() {                                                   // 66
      return Spacebars.mustache(view.lookup("."));                                                                     // 67
    })), "\n						" ];                                                                                                 // 68
  }), "\n					"), "\n				"), "\n			"), "\n		"), "\n\n	");                                                              // 69
}));                                                                                                                   // 70
                                                                                                                       // 71
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.modus_wort.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/trainer/modes/template.modus_wort.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusWort");                                                                                     // 2
Template["modusWort"] = new Template("Template.modusWort", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "jumbotron"                                                                                               // 6
  }, "\n\n		", HTML.DIV({                                                                                              // 7
    "class": "row"                                                                                                     // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "media"                                                                                                   // 10
  }, "\n				", HTML.DIV({                                                                                              // 11
    "class": "media-body"                                                                                              // 12
  }, "\n					", Blaze.If(function() {                                                                                  // 13
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 14
  }, function() {                                                                                                      // 15
    return HTML.SPAN({                                                                                                 // 16
      "class": "flag animate-box fadeInUp animated"                                                                    // 17
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 18
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 19
    }, function() {                                                                                                    // 20
      return "Favoriten";                                                                                              // 21
    }, function() {                                                                                                    // 22
      return "Nicht-Favoriten";                                                                                        // 23
    }));                                                                                                               // 24
  }), "\n				"), "\n				", HTML.Raw('<div class="media-right">\n					<div class="i-transparent">\n						<i class="fa fa-minus fa-4x"></i>\n					</div>\n				</div>'), "\n			"), "\n		"), "\n\n		", HTML.DIV({
    "class": "row"                                                                                                     // 26
  }, "\n			", HTML.DIV({                                                                                               // 27
    "class": "text-center"                                                                                             // 28
  }, "\n				", HTML.P({                                                                                                // 29
    "class": "trainer-word-class fadeInUp animated"                                                                    // 30
  }, "\n					", Blaze.View("lookup:wordClass", function() {                                                            // 31
    return Spacebars.mustache(view.lookup("wordClass"));                                                               // 32
  }), "\n				"), "\n				", HTML.Raw("<!-- WORT -->"), "\n				", Blaze.Unless(function() {                              // 33
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 34
  }, function() {                                                                                                      // 35
    return [ "\n					", HTML.DIV({                                                                                     // 36
      "class": "btn-reveal"                                                                                            // 37
    }, "\n						", HTML.I({                                                                                            // 38
      "class": "trainer-question fa fa-question fa-4x"                                                                 // 39
    }), "\n					"), "\n				" ];                                                                                        // 40
  }, function() {                                                                                                      // 41
    return [ "\n						", HTML.H2({                                                                                     // 42
      "class": "trainer-title  bounceIn animated"                                                                      // 43
    }, Blaze.View("lookup:term", function() {                                                                          // 44
      return Spacebars.mustache(view.lookup("term"));                                                                  // 45
    }), Blaze.If(function() {                                                                                          // 46
      return Spacebars.call(view.lookup("preposition"));                                                               // 47
    }, function() {                                                                                                    // 48
      return [ " ", HTML.SPAN({                                                                                        // 49
        "class": "trainer-preposition"                                                                                 // 50
      }, HTML.I(Blaze.View("lookup:preposition", function() {                                                          // 51
        return Spacebars.mustache(view.lookup("preposition"));                                                         // 52
      }))) ];                                                                                                          // 53
    })), "\n				" ];                                                                                                   // 54
  }), "\n\n				", HTML.DIV({                                                                                           // 55
    "class": "trainer-definition"                                                                                      // 56
  }, "\n					", HTML.OL("\n						", Blaze.Each(function() {                                                            // 57
    return Spacebars.call(view.lookup("definition"));                                                                  // 58
  }, function() {                                                                                                      // 59
    return [ "\n						", HTML.LI(Blaze.View("lookup:.", function() {                                                   // 60
      return Spacebars.mustache(view.lookup("."));                                                                     // 61
    })), "\n						" ];                                                                                                 // 62
  }), "\n					"), "\n				"), "\n			"), "\n		"), "\n\n	");                                                              // 63
}));                                                                                                                   // 64
                                                                                                                       // 65
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"template.backward.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/trainer/template.backward.js                                                                      //
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
      "class": "fa fa-ban fa-2x"                                                                                       // 11
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

},"template.forward.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/trainer/template.forward.js                                                                       //
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
      "class": "fa fa-ban fa-2x"                                                                                       // 11
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

},"template.trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/trainer/template.trainer.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("trainer");                                                                                       // 2
Template["trainer"] = new Template("Template.trainer", (function() {                                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, HTML.Raw("\n		<br>\n		"), HTML.DIV({                                                                              // 7
    "class": "row text-center"                                                                                         // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "col-sm-6"                                                                                                // 10
  }, "\n				", Spacebars.include(view.lookupTemplate("navModeTrainer")), "\n			"), "\n			", HTML.DIV({                 // 11
    "class": "col-sm-6"                                                                                                // 12
  }, "\n				", Spacebars.include(view.lookupTemplate("navSourceTrainer")), "\n			"), "\n		"), HTML.Raw("\n		<br>\n		"), HTML.DIV({
    "class": "row"                                                                                                     // 14
  }, "\n			", Blaze.Unless(function() {                                                                                // 15
    return Spacebars.call(view.lookup("isAlphabetic"));                                                                // 16
  }, function() {                                                                                                      // 17
    return [ "\n				", HTML.P({                                                                                        // 18
      "class": "alert alert-warning"                                                                                   // 19
    }, "Tipp: Das gesuchte Wort enthaelt nur Zeichen des Alphabets (a - Z). Keine Leer- und Sonderzeichen."), "\n			" ];
  }), "\n			", Blaze.Unless(function() {                                                                               // 21
    return Spacebars.call(view.lookup("isLength64"));                                                                  // 22
  }, function() {                                                                                                      // 23
    return [ "\n				", HTML.P({                                                                                        // 24
      "class": "alert alert-warning"                                                                                   // 25
    }, "Tipp: Das gesuchte Wort enthaelt nicht mehr als 64 Zeichen."), "\n			" ];                                      // 26
  }), "\n\n			", HTML.DIV({                                                                                            // 27
    "class": "media"                                                                                                   // 28
  }, "\n\n				", Spacebars.include(view.lookupTemplate("backward")), "\n\n				", HTML.DIV({                            // 29
    "class": "media-body"                                                                                              // 30
  }, "\n					", Blaze.If(function() {                                                                                  // 31
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 32
  }, function() {                                                                                                      // 33
    return [ "\n						", Spacebars.With(function() {                                                                   // 34
      return Spacebars.call(view.lookup("entry"));                                                                     // 35
    }, function() {                                                                                                    // 36
      return [ "\n							", Blaze.If(function() {                                                                      // 37
        return Spacebars.dataMustache(view.lookup("getSession"), "lesen");                                             // 38
      }, function() {                                                                                                  // 39
        return [ "\n								", Spacebars.include(view.lookupTemplate("modusLesen")), "\n							" ];                    // 40
      }), "\n							", Blaze.If(function() {                                                                           // 41
        return Spacebars.dataMustache(view.lookup("getSession"), "wort");                                              // 42
      }, function() {                                                                                                  // 43
        return [ "\n								", Spacebars.include(view.lookupTemplate("modusWort")), "\n							" ];                     // 44
      }), "\n							", Blaze.If(function() {                                                                           // 45
        return Spacebars.dataMustache(view.lookup("getSession"), "definition");                                        // 46
      }, function() {                                                                                                  // 47
        return [ "\n								", Spacebars.include(view.lookupTemplate("modusDefinition")), "\n							" ];               // 48
      }), "\n							", Blaze.If(function() {                                                                           // 49
        return Spacebars.dataMustache(view.lookup("getSession"), "eingabe");                                           // 50
      }, function() {                                                                                                  // 51
        return [ "\n								", Spacebars.include(view.lookupTemplate("modusEingabe")), "\n							" ];                  // 52
      }), "\n						" ];                                                                                                // 53
    }), "\n					" ];                                                                                                   // 54
  }, function() {                                                                                                      // 55
    return [ "\n						", Spacebars.include(view.lookupTemplate("loading")), "\n					" ];                               // 56
  }), "\n				"), "\n\n				", Spacebars.include(view.lookupTemplate("forward")), "\n\n			"), "\n		"), "\n	");           // 57
}));                                                                                                                   // 58
                                                                                                                       // 59
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/trainer/trainer.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.trainer.onCreated(function () {                                                                               // 1
	var template = Template.instance();                                                                                   // 2
	template.isAlphabetic = new ReactiveVar(true);                                                                        // 3
	template.isLength64 = new ReactiveVar(true);                                                                          // 4
                                                                                                                       //
	template.autorun(function () {                                                                                        // 6
		template.subscribe('vocabularyAll'); // Vocabulary.find()                                                            // 7
		template.subscribe('ownedFavourites'); // Favourites.find()                                                          // 6
                                                                                                                       //
		Session.set(LENGTH_FAV, Favourites.find().count());                                                                  // 6
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                                  // 11
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.trainer.helpers({                                                                                             // 15
	isAlphabetic: function () {                                                                                           // 16
		function isAlphabetic() {                                                                                            //
			return Template.instance().isAlphabetic.get();                                                                      // 17
		}                                                                                                                    //
                                                                                                                       //
		return isAlphabetic;                                                                                                 //
	}(),                                                                                                                  //
	isLength64: function () {                                                                                             // 19
		function isLength64() {                                                                                              //
			return Template.instance().isLength64.get();                                                                        // 20
		}                                                                                                                    //
                                                                                                                       //
		return isLength64;                                                                                                   //
	}(),                                                                                                                  //
	termPercent: function () {                                                                                            // 22
		function termPercent() {                                                                                             //
			return Math.floor(Session.get(COUNT_LETTERS_MATCH) / this.term.length * 100);                                       // 23
		}                                                                                                                    //
                                                                                                                       //
		return termPercent;                                                                                                  //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.trainer.events({                                                                                              // 27
	'keyup [name="term"]': function () {                                                                                  // 28
		function keyupNameTerm(event, template) {                                                                            //
			var value = event.target.value.toLowerCase();                                                                       // 29
                                                                                                                       //
			if (value !== '') {                                                                                                 // 31
				// check if string is valid                                                                                        //
				if (Validate.isAlphabetic(value)) {                                                                                // 33
					template.isAlphabetic.set(true);                                                                                  // 34
				} else {                                                                                                           //
					template.isAlphabetic.set(false);                                                                                 // 36
				}                                                                                                                  //
				if (Validate.isLength64(value)) {                                                                                  // 38
					template.isLength64.set(true);                                                                                    // 39
				} else {                                                                                                           //
					template.isLength64.set(false);                                                                                   // 41
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			// TODO exclude spaces                                                                                              //
			// && event.keyCode === 13                                                                                          //
			if (value !== '') {                                                                                                 // 28
				if (template.isAlphabetic.get() && template.isLength64.get()) {                                                    // 48
					var term = this.term.toLowerCase();                                                                               // 49
                                                                                                                       //
					if (term === value) {                                                                                             // 51
						if (Session.get(TERM_WRONG)) {                                                                                   // 52
							Session.set(TERM_WRONG, false);                                                                                 // 53
						}                                                                                                                //
						Session.set(TERM_RIGHT, true);                                                                                   // 55
						event.target.disabled = true;                                                                                    // 56
                                                                                                                       //
						setTimeout(function () {                                                                                         // 58
							Session.set(REVEALED, false);                                                                                   // 59
							Session.set(TERM_RIGHT, false);                                                                                 // 60
							// disable after correct term and autofocus input field for the next word                                       //
							if (event.target) {                                                                                             // 58
								event.target.disabled = false;                                                                                 // 63
								event.target.value = '';                                                                                       // 64
								if (event.target.disabled === true) {                                                                          // 65
									event.target.disabled = false;                                                                                // 66
									event.target.autofocus = true;                                                                                // 67
								}                                                                                                              //
								event.target.focus();                                                                                          // 69
							}                                                                                                               //
                                                                                                                       //
							var val = 0;                                                                                                    // 72
							if (Session.get(RANDOM_FAV)) {                                                                                  // 73
								val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 74
								Session.set(COUNT_VIEWED, val);                                                                                // 75
							} else {                                                                                                        //
								val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                           // 77
								Session.set(COUNT_VIEWED, val);                                                                                // 78
							}                                                                                                               //
						}, 2000);                                                                                                        //
					} else {                                                                                                          //
						Session.set(TERM_WRONG, true);                                                                                   // 83
                                                                                                                       //
						var termArray = R.split('', term);                                                                               // 85
						var f = function () {                                                                                            // 86
							function f(x, y) {                                                                                              // 86
								var space = "_";                                                                                               // 87
								if (x === y) {                                                                                                 // 88
									return x;                                                                                                     // 89
								} else {                                                                                                       //
									return space;                                                                                                 // 91
								}                                                                                                              //
							}                                                                                                               //
                                                                                                                       //
							return f;                                                                                                       //
						}();                                                                                                             //
						var cheese = R.zipWith(f, term, value);                                                                          // 94
						while (cheese.length < term.length) {                                                                            // 95
							cheese = R.append('_', cheese);                                                                                 // 96
						}                                                                                                                //
                                                                                                                       //
						var countMatch = term.length - R.filter(R.equals('_'), cheese).length;                                           // 99
						Session.set(COUNT_LETTERS_MATCH, countMatch);                                                                    // 100
                                                                                                                       //
						cheese = R.join(' ', cheese);                                                                                    // 102
						Session.set(TERM_CACHE, cheese);                                                                                 // 103
					}                                                                                                                 //
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			if (value === '') {                                                                                                 // 109
				template.isAlphabetic.set(true);                                                                                   // 110
				template.isLength64.set(true);                                                                                     // 111
                                                                                                                       //
				var _cheese = '';                                                                                                  // 113
				while (_cheese.length < this.term.length) {                                                                        // 114
					_cheese = R.append('_', _cheese);                                                                                 // 115
				}                                                                                                                  //
				_cheese = R.join(' ', _cheese);                                                                                    // 117
				Session.set(TERM_CACHE, _cheese);                                                                                  // 118
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return keyupNameTerm;                                                                                                //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"faq":{"template.faq.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/faq/template.faq.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("faq");                                                                                           // 2
Template["faq"] = new Template("Template.faq", (function() {                                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div class="text-center">\n			<h2 class="category-title">Dokumentation</h2>\n			<div class="category-description">\n				Ein paar Erlaeuterungen\n			</div>\n	</div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"fragebogen":{"template.fragebogen.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/fragebogen/template.fragebogen.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("fragebogen");                                                                                    // 2
Template["fragebogen"] = new Template("Template.fragebogen", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container survey"                                                                                        // 6
  }, HTML.Raw('\n		<h1>Fragebogen</h1>\n		<!-- {{> quickForm collection="Data.Survey" id="insertSurveyForm" type="insert"}} -->\n		'), Blaze._TemplateWith(function() {
    return {                                                                                                           // 8
      collection: Spacebars.call("Data.Survey"),                                                                       // 9
      id: Spacebars.call("insertSurveyForm"),                                                                          // 10
      type: Spacebars.call("insert")                                                                                   // 11
    };                                                                                                                 // 12
  }, function() {                                                                                                      // 13
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 14
      return [ "\n		", HTML.FIELDSET("\n		", HTML.LEGEND("Allgemein"), "\n		", Blaze._TemplateWith(function() {        // 15
        return {                                                                                                       // 16
          name: Spacebars.call("age")                                                                                  // 17
        };                                                                                                             // 18
      }, function() {                                                                                                  // 19
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 20
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 21
        return {                                                                                                       // 22
          name: Spacebars.call("previousExperience")                                                                   // 23
        };                                                                                                             // 24
      }, function() {                                                                                                  // 25
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 26
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 27
        return {                                                                                                       // 28
          name: Spacebars.call("learningCurve")                                                                        // 29
        };                                                                                                             // 30
      }, function() {                                                                                                  // 31
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 32
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 33
        return {                                                                                                       // 34
          name: Spacebars.call("everydayUse")                                                                          // 35
        };                                                                                                             // 36
      }, function() {                                                                                                  // 37
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 38
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 39
        return {                                                                                                       // 40
          name: Spacebars.call("everydayUseText")                                                                      // 41
        };                                                                                                             // 42
      }, function() {                                                                                                  // 43
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 44
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 45
        return {                                                                                                       // 46
          name: Spacebars.call("usability")                                                                            // 47
        };                                                                                                             // 48
      }, function() {                                                                                                  // 49
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 50
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 51
        return {                                                                                                       // 52
          name: Spacebars.call("usabilityText")                                                                        // 53
        };                                                                                                             // 54
      }, function() {                                                                                                  // 55
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 56
      }), "\n\n		", HTML.LEGEND("Nutzung"), "\n		Ich habe die App am haeufigsten ueber ein ...\n		", Blaze._TemplateWith(function() {
        return {                                                                                                       // 58
          name: Spacebars.call("deviceMobile")                                                                         // 59
        };                                                                                                             // 60
      }, function() {                                                                                                  // 61
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 62
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 63
        return {                                                                                                       // 64
          name: Spacebars.call("deviceTablet")                                                                         // 65
        };                                                                                                             // 66
      }, function() {                                                                                                  // 67
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 68
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 69
        return {                                                                                                       // 70
          name: Spacebars.call("deviceDesktop")                                                                        // 71
        };                                                                                                             // 72
      }, function() {                                                                                                  // 73
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 74
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 75
        return {                                                                                                       // 76
          name: Spacebars.call("deviceBehavior")                                                                       // 77
        };                                                                                                             // 78
      }, function() {                                                                                                  // 79
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 80
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 81
        return {                                                                                                       // 82
          name: Spacebars.call("favouriteMode")                                                                        // 83
        };                                                                                                             // 84
      }, function() {                                                                                                  // 85
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 86
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 87
        return {                                                                                                       // 88
          name: Spacebars.call("favouriteModeText")                                                                    // 89
        };                                                                                                             // 90
      }, function() {                                                                                                  // 91
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 92
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 93
        return {                                                                                                       // 94
          name: Spacebars.call("modeEnter")                                                                            // 95
        };                                                                                                             // 96
      }, function() {                                                                                                  // 97
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 98
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 99
        return {                                                                                                       // 100
          name: Spacebars.call("attentionBenefit")                                                                     // 101
        };                                                                                                             // 102
      }, function() {                                                                                                  // 103
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 104
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 105
        return {                                                                                                       // 106
          name: Spacebars.call("attentionBehavior")                                                                    // 107
        };                                                                                                             // 108
      }, function() {                                                                                                  // 109
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 110
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 111
        return {                                                                                                       // 112
          name: Spacebars.call("attentionBehaviorText")                                                                // 113
        };                                                                                                             // 114
      }, function() {                                                                                                  // 115
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 116
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 117
        return {                                                                                                       // 118
          name: Spacebars.call("attentionSituation")                                                                   // 119
        };                                                                                                             // 120
      }, function() {                                                                                                  // 121
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 122
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 123
        return {                                                                                                       // 124
          name: Spacebars.call("attentionUse")                                                                         // 125
        };                                                                                                             // 126
      }, function() {                                                                                                  // 127
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 128
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 129
        return {                                                                                                       // 130
          name: Spacebars.call("attentionUseText")                                                                     // 131
        };                                                                                                             // 132
      }, function() {                                                                                                  // 133
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 134
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 135
        return {                                                                                                       // 136
          name: Spacebars.call("prospects")                                                                            // 137
        };                                                                                                             // 138
      }, function() {                                                                                                  // 139
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 140
      }), "\n	"), "\n\n		", HTML.DIV("\n			", HTML.P({                                                                 // 141
        "class": "category-definition"                                                                                 // 142
      }, "\n				Du kannst den Fragebogen nur einmal abschicken.\n			"), " ", HTML.BR(), "\n			", HTML.BUTTON({         // 143
        type: "submit",                                                                                                // 144
        "class": "btn btn-standard-1"                                                                                  // 145
      }, "Abschicken"), "\n		"), "\n		" ];                                                                             // 146
    });                                                                                                                // 147
  }), "\n	");                                                                                                          // 148
}));                                                                                                                   // 149
                                                                                                                       // 150
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fragebogen.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/fragebogen/fragebogen.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var hooksSurveyForm = {                                                                                                // 1
	onSuccess: function () {                                                                                              // 2
		function onSuccess(formType, result) {                                                                               // 2
			Meteor.call('surveySubmitted');                                                                                     // 3
			FlowRouter.go('index');                                                                                             // 4
			var msg = 'Fragebogen erfolgreich gesendet.';                                                                       // 5
			toastr.success(msg);                                                                                                // 6
		}                                                                                                                    //
                                                                                                                       //
		return onSuccess;                                                                                                    //
	}(),                                                                                                                  //
	onError: function () {                                                                                                // 8
		function onError(formType, error) {                                                                                  // 8
			var msg = 'Fragebogen konnte nicht gesendet werden.';                                                               // 9
			toastr.error(msg);                                                                                                  // 10
		}                                                                                                                    //
                                                                                                                       //
		return onError;                                                                                                      //
	}()                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
AutoForm.addHooks(['insertSurveyForm'], hooksSurveyForm);                                                              // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"register":{"template.letter_collapse.js":function(){

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
    return [ "\n      ", Spacebars.include(view.lookupTemplate("registerEntry")), "\n    " ];                          // 10
  }), "\n  ");                                                                                                         // 11
}));                                                                                                                   // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.letter_list.js":function(){

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
    return [ "\n		", Spacebars.include(view.lookupTemplate("registerEntry")), "\n	" ];                                 // 10
  }) ];                                                                                                                // 11
}));                                                                                                                   // 12
                                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.register.js":function(){

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
  }, HTML.Raw('\n    <br>\n    <div class="form-wrapper clearfix">\n        <input type="text" name="search" class="form-control" width="300px" placeholder="Finde einen Begriff...">\n    </div>\n    <br>\n      '), Blaze.Unless(function() {
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
  }), HTML.Raw("\n\n<!-- favourites -->\n  "), Blaze.If(function() {                                                   // 19
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
      "class": "clearfix"                                                                                              // 31
    }, "\n      ", HTML.H5({                                                                                           // 32
      "class": "widget-title"                                                                                          // 33
    }, "Favoriten"), "\n    "), "\n\n    ", Blaze.If(function() {                                                      // 34
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
      "class": "clearfix"                                                                                              // 113
    }, "\n      ", HTML.H5({                                                                                           // 114
      "class": "widget-title"                                                                                          // 115
    }, "Nicht-Favoriten"), "\n    "), "\n\n      ", Blaze.If(function() {                                              // 116
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

},"template.register_entry.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/register/template.register_entry.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("registerEntry");                                                                                 // 2
Template["registerEntry"] = new Template("Template.registerEntry", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.LI({                                                                                                     // 5
    "class": "story clearfix"                                                                                          // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "media"                                                                                                   // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "media-body story-body"                                                                                   // 10
  }, "\n\n					", HTML.H3({                                                                                            // 11
    "class": "title"                                                                                                   // 12
  }, Blaze.View("lookup:term", function() {                                                                            // 13
    return Spacebars.mustache(view.lookup("term"));                                                                    // 14
  }), " ", HTML.I({                                                                                                    // 15
    "class": "preposition"                                                                                             // 16
  }, Blaze.View("lookup:preposition", function() {                                                                     // 17
    return Spacebars.mustache(view.lookup("preposition"));                                                             // 18
  }))), "\n					", HTML.SPAN({                                                                                         // 19
    "class": "definition"                                                                                              // 20
  }, "\n						", HTML.OL("\n							", Blaze.Each(function() {                                                          // 21
    return Spacebars.call(view.lookup("definition"));                                                                  // 22
  }, function() {                                                                                                      // 23
    return [ "\n							", HTML.LI(Blaze.View("lookup:.", function() {                                                  // 24
      return Spacebars.mustache(view.lookup("."));                                                                     // 25
    })), "\n							" ];                                                                                                // 26
  }), "\n						"), "\n					"), "\n\n			"), "\n			", Blaze.If(function() {                                              // 27
    return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));                 // 28
  }, function() {                                                                                                      // 29
    return [ "\n				", HTML.DIV({                                                                                      // 30
      "class": "media-right media-middle btn-delete"                                                                   // 31
    }, "\n						", HTML.I({                                                                                            // 32
      "class": "fa fa-trash-o fa-4x"                                                                                   // 33
    }), "\n				"), "\n			" ];                                                                                          // 34
  }, function() {                                                                                                      // 35
    return [ "\n				", HTML.DIV({                                                                                      // 36
      "class": "media-right media-middle btn-insert"                                                                   // 37
    }, "\n						", HTML.I({                                                                                            // 38
      "class": "fa fa-heart-o fa-4x"                                                                                   // 39
    }), "\n				"), "\n			" ];                                                                                          // 40
  }), "\n		"), "\n	");                                                                                                 // 41
}));                                                                                                                   // 42
                                                                                                                       // 43
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.vokabel_detail.js":function(){

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
			// Sort and group entries by letter and create a new array of iterable objects for a cascaded template iteration    //
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

}}},"low":{"modes":{"template.modus_definition.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/modes/template.modus_definition.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusDefinitionLow");                                                                            // 2
Template["modusDefinitionLow"] = new Template("Template.modusDefinitionLow", (function() {                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "row text-center"                                                                                         // 6
  }, "\n		", HTML.P("\n			", Blaze.If(function() {                                                                     // 7
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 8
  }, function() {                                                                                                      // 9
    return HTML.SPAN({                                                                                                 // 10
      "class": "flag animate-box fadeInUp animated"                                                                    // 11
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 12
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 13
    }, function() {                                                                                                    // 14
      return "Favoriten";                                                                                              // 15
    }, function() {                                                                                                    // 16
      return "Nicht-Favoriten";                                                                                        // 17
    }));                                                                                                               // 18
  }), "\n		"), "\n		", HTML.P({                                                                                        // 19
    "class": "trainer-word-class fadeInUp animated"                                                                    // 20
  }, "\n			", Blaze.View("lookup:wordClass", function() {                                                              // 21
    return Spacebars.mustache(view.lookup("wordClass"));                                                               // 22
  }), "\n		"), "\n		", HTML.H2({                                                                                       // 23
    "class": "trainer-title"                                                                                           // 24
  }, Blaze.View("lookup:term", function() {                                                                            // 25
    return Spacebars.mustache(view.lookup("term"));                                                                    // 26
  }), Blaze.If(function() {                                                                                            // 27
    return Spacebars.call(view.lookup("preposition"));                                                                 // 28
  }, function() {                                                                                                      // 29
    return [ " ", HTML.SPAN({                                                                                          // 30
      "class": "trainer-preposition"                                                                                   // 31
    }, HTML.I(Blaze.View("lookup:preposition", function() {                                                            // 32
      return Spacebars.mustache(view.lookup("preposition"));                                                           // 33
    }))) ];                                                                                                            // 34
  })), HTML.Raw("\n		<!-- DEFINITION -->\n		"), Blaze.Unless(function() {                                              // 35
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 36
  }, function() {                                                                                                      // 37
    return [ "\n		", HTML.DIV({                                                                                        // 38
      "class": "btn-reveal"                                                                                            // 39
    }, "\n			", HTML.I({                                                                                               // 40
      "class": "trainer-question fa fa-question fa-4x"                                                                 // 41
    }), "\n			", HTML.Comment(' <div class="label label-info">Gesucht: Wort</div> '), "\n		"), "\n		" ];               // 42
  }, function() {                                                                                                      // 43
    return [ "\n		", HTML.DIV({                                                                                        // 44
      "class": "trainer-definition flipInX animated"                                                                   // 45
    }, "\n			", HTML.OL("\n				", Blaze.Each(function() {                                                              // 46
      return Spacebars.call(view.lookup("definition"));                                                                // 47
    }, function() {                                                                                                    // 48
      return [ "\n				", HTML.LI(Blaze.View("lookup:.", function() {                                                   // 49
        return Spacebars.mustache(view.lookup("."));                                                                   // 50
      })), "\n				" ];                                                                                                 // 51
    }), "\n			"), "\n		"), "\n		" ];                                                                                   // 52
  }), "\n	");                                                                                                          // 53
}));                                                                                                                   // 54
                                                                                                                       // 55
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.modus_lesen.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/modes/template.modus_lesen.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusLesenLow");                                                                                 // 2
Template["modusLesenLow"] = new Template("Template.modusLesenLow", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "row text-center"                                                                                         // 6
  }, "\n			", HTML.P("\n				", Blaze.If(function() {                                                                   // 7
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 8
  }, function() {                                                                                                      // 9
    return HTML.SPAN({                                                                                                 // 10
      "class": "flag animate-box fadeInUp animated"                                                                    // 11
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 12
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 13
    }, function() {                                                                                                    // 14
      return "Favoriten";                                                                                              // 15
    }, function() {                                                                                                    // 16
      return "Nicht-Favoriten";                                                                                        // 17
    }));                                                                                                               // 18
  }), "\n			"), "\n			", HTML.P("\n				", Blaze.If(function() {                                                        // 19
    return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                      // 20
  }, function() {                                                                                                      // 21
    return [ "\n				", HTML.DIV({                                                                                      // 22
      "class": "btn-delete fadeIn animated"                                                                            // 23
    }, "\n					", HTML.I({                                                                                             // 24
      "class": "fa fa-trash-o fa-4x"                                                                                   // 25
    }), "\n				"), "\n				" ];                                                                                         // 26
  }, function() {                                                                                                      // 27
    return [ "\n				", HTML.DIV({                                                                                      // 28
      "class": "btn-insert fadeIn animated"                                                                            // 29
    }, "\n					", HTML.I({                                                                                             // 30
      "class": "fa fa-heart-o fa-4x"                                                                                   // 31
    }), "\n				"), "\n				" ];                                                                                         // 32
  }), "\n			"), HTML.Raw("\n			<br>\n			"), HTML.P({                                                                   // 33
    "class": "trainer-word-class fadeInUp animated"                                                                    // 34
  }, "\n				", Blaze.View("lookup:wordClass", function() {                                                             // 35
    return Spacebars.mustache(view.lookup("wordClass"));                                                               // 36
  }), "\n			"), HTML.Raw("\n			<br>\n			"), HTML.H2({                                                                  // 37
    "class": "trainer-title"                                                                                           // 38
  }, Blaze.View("lookup:term", function() {                                                                            // 39
    return Spacebars.mustache(view.lookup("term"));                                                                    // 40
  }), Blaze.If(function() {                                                                                            // 41
    return Spacebars.call(view.lookup("preposition"));                                                                 // 42
  }, function() {                                                                                                      // 43
    return [ " ", HTML.SPAN({                                                                                          // 44
      "class": "trainer-preposition"                                                                                   // 45
    }, HTML.I(Blaze.View("lookup:preposition", function() {                                                            // 46
      return Spacebars.mustache(view.lookup("preposition"));                                                           // 47
    }))) ];                                                                                                            // 48
  })), HTML.Raw("\n			<br>\n			"), HTML.DIV({                                                                          // 49
    "class": "trainer-definition"                                                                                      // 50
  }, "\n				", HTML.OL("\n					", Blaze.Each(function() {                                                              // 51
    return Spacebars.call(view.lookup("definition"));                                                                  // 52
  }, function() {                                                                                                      // 53
    return [ "\n					", HTML.LI(HTML.SPAN({                                                                            // 54
      "class": "rwd-line"                                                                                              // 55
    }, Blaze.View("lookup:.", function() {                                                                             // 56
      return Spacebars.mustache(view.lookup("."));                                                                     // 57
    })), "  "), "\n					" ];                                                                                           // 58
  }), "\n				"), "\n			"), "\n		");                                                                                    // 59
}));                                                                                                                   // 60
                                                                                                                       // 61
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.modus_wort.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/modes/template.modus_wort.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusWortLow");                                                                                  // 2
Template["modusWortLow"] = new Template("Template.modusWortLow", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "row text-center"                                                                                         // 6
  }, "\n		", HTML.P("\n			", Blaze.If(function() {                                                                     // 7
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 8
  }, function() {                                                                                                      // 9
    return HTML.SPAN({                                                                                                 // 10
      "class": "flag animate-box fadeInUp animated"                                                                    // 11
    }, "Letzter Eintrag in ", Blaze.If(function() {                                                                    // 12
      return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                    // 13
    }, function() {                                                                                                    // 14
      return "Favoriten";                                                                                              // 15
    }, function() {                                                                                                    // 16
      return "Nicht-Favoriten";                                                                                        // 17
    }));                                                                                                               // 18
  }), "\n		"), "\n		", HTML.P({                                                                                        // 19
    "class": "trainer-word-class fadeInUp animated"                                                                    // 20
  }, "\n			", Blaze.View("lookup:wordClass", function() {                                                              // 21
    return Spacebars.mustache(view.lookup("wordClass"));                                                               // 22
  }), "\n		"), HTML.Raw("\n		<!-- WORT -->\n		"), Blaze.Unless(function() {                                            // 23
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 24
  }, function() {                                                                                                      // 25
    return [ "\n		", HTML.DIV({                                                                                        // 26
      "class": "btn-reveal"                                                                                            // 27
    }, "\n			", HTML.I({                                                                                               // 28
      "class": "trainer-question fa fa-question fa-4x"                                                                 // 29
    }), "\n		"), "\n		" ];                                                                                             // 30
  }, function() {                                                                                                      // 31
    return [ "\n		", HTML.H2({                                                                                         // 32
      "class": "trainer-title  bounceIn animated"                                                                      // 33
    }, Blaze.View("lookup:term", function() {                                                                          // 34
      return Spacebars.mustache(view.lookup("term"));                                                                  // 35
    }), Blaze.If(function() {                                                                                          // 36
      return Spacebars.call(view.lookup("preposition"));                                                               // 37
    }, function() {                                                                                                    // 38
      return [ " ", HTML.SPAN({                                                                                        // 39
        "class": "trainer-preposition"                                                                                 // 40
      }, HTML.I(Blaze.View("lookup:preposition", function() {                                                          // 41
        return Spacebars.mustache(view.lookup("preposition"));                                                         // 42
      }))) ];                                                                                                          // 43
    })), " " ];                                                                                                        // 44
  }), "\n\n		", HTML.DIV({                                                                                             // 45
    "class": "trainer-definition"                                                                                      // 46
  }, "\n			", HTML.OL("\n				", Blaze.Each(function() {                                                                // 47
    return Spacebars.call(view.lookup("definition"));                                                                  // 48
  }, function() {                                                                                                      // 49
    return [ "\n				", HTML.LI(Blaze.View("lookup:.", function() {                                                     // 50
      return Spacebars.mustache(view.lookup("."));                                                                     // 51
    })), "\n				" ];                                                                                                   // 52
  }), "\n			"), "\n		"), "\n	");                                                                                       // 53
}));                                                                                                                   // 54
                                                                                                                       // 55
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"template.backward.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/template.backward.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("backwardLow");                                                                                   // 2
Template["backwardLow"] = new Template("Template.backwardLow", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 6
  }, function() {                                                                                                      // 7
    return [ "\n	  	", HTML.I({                                                                                        // 8
      "class": "fa fa-ban fa-4x"                                                                                       // 9
    }), "\n	" ];                                                                                                       // 10
  }, function() {                                                                                                      // 11
    return [ "\n		", Spacebars.With(function() {                                                                       // 12
      return Spacebars.call(view.lookup("entry"));                                                                     // 13
    }, function() {                                                                                                    // 14
      return [ "\n			", HTML.DIV({                                                                                     // 15
        "class": "btn-backward"                                                                                        // 16
      }, "\n				", HTML.I({                                                                                            // 17
        "class": "fa fa-chevron-left fa-4x"                                                                            // 18
      }), "\n			"), "\n		" ];                                                                                          // 19
    }), "\n	" ];                                                                                                       // 20
  });                                                                                                                  // 21
}));                                                                                                                   // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.forward.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/low/template.forward.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("forwardLow");                                                                                    // 2
Template["forwardLow"] = new Template("Template.forwardLow", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 6
  }, function() {                                                                                                      // 7
    return [ "\n			", HTML.I({                                                                                         // 8
      "class": "fa fa-ban fa-4x"                                                                                       // 9
    }), "\n	" ];                                                                                                       // 10
  }, function() {                                                                                                      // 11
    return [ "\n		", Spacebars.With(function() {                                                                       // 12
      return Spacebars.call(view.lookup("entry"));                                                                     // 13
    }, function() {                                                                                                    // 14
      return [ "\n			", HTML.DIV({                                                                                     // 15
        "class": "btn-forward"                                                                                         // 16
      }, "\n				", HTML.SPAN(HTML.I({                                                                                  // 17
        "class": "fa fa-chevron-right fa-4x"                                                                           // 18
      })), "\n			"), "\n		" ];                                                                                         // 19
    }), "\n	" ];                                                                                                       // 20
  });                                                                                                                  // 21
}));                                                                                                                   // 22
                                                                                                                       // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.low.js":function(){

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
  return [ HTML.SECTION({                                                                                              // 5
    "class": "some-area fill-height-or-more"                                                                           // 6
  }, "\n\n        ", Spacebars.include(view.lookupTemplate("backwardLow")), "\n        ", HTML.DIV("\n          ", Blaze.If(function() {
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 8
  }, function() {                                                                                                      // 9
    return [ "\n            ", Spacebars.With(function() {                                                             // 10
      return Spacebars.call(view.lookup("entry"));                                                                     // 11
    }, function() {                                                                                                    // 12
      return [ "\n              ", Blaze.If(function() {                                                               // 13
        return Spacebars.dataMustache(view.lookup("getSession"), "lesen");                                             // 14
      }, function() {                                                                                                  // 15
        return [ "\n                ", Spacebars.include(view.lookupTemplate("modusLesenLow")), "\n              " ];  // 16
      }), "\n              ", Blaze.If(function() {                                                                    // 17
        return Spacebars.dataMustache(view.lookup("getSession"), "wort");                                              // 18
      }, function() {                                                                                                  // 19
        return [ "\n                ", Spacebars.include(view.lookupTemplate("modusWortLow")), "\n              " ];   // 20
      }), "\n              ", Blaze.If(function() {                                                                    // 21
        return Spacebars.dataMustache(view.lookup("getSession"), "definition");                                        // 22
      }, function() {                                                                                                  // 23
        return [ "\n                ", Spacebars.include(view.lookupTemplate("modusDefinitionLow")), "\n              " ];
      }), "\n\n              ", Spacebars.include(view.lookupTemplate("navLow")), "\n            " ];                  // 25
    }), "\n\n          " ];                                                                                            // 26
  }, function() {                                                                                                      // 27
    return [ "\n            ", Spacebars.include(view.lookupTemplate("loading")), "\n          " ];                    // 28
  }), "\n        "), "\n\n\n        ", Spacebars.include(view.lookupTemplate("forwardLow")), "\n\n  "), HTML.Raw('\n\n\n  <!-- <div class="jumbotron vertical-center">\n    <div class="container">\n      <h1>The easiest and powerful way</h1>\n      <div class="row">\n        <div class="col-md-7">\n          <div class="top-bg"></div>\n        </div>\n\n        <div class="col-md-5 iPhone-features">\n          <ul class="top-features">\n            <li>\n              <span><i class="fa fa-random simple_bg top-features-bg"></i></span>\n              <p><strong>Redirect</strong><br>Visitors where they converts more.</p>\n            </li>\n            <li>\n              <span><i class="fa fa-cogs simple_bg top-features-bg"></i></span>\n              <p><strong>Track</strong><br>Views, Clicks and Conversions.</p>\n            </li>\n            <li>\n              <span><i class="fa fa-check simple_bg top-features-bg"></i></span>\n              <p><strong>Check</strong><br>Constantly the status of your links.</p>\n            </li>\n            <li>\n              <span><i class="fa fa-users simple_bg top-features-bg"></i></span>\n              <p><strong>Collaborate</strong><br>With Customers, Partners and Co-Workers.</p>\n            </li>\n            <a href="pricing-and-signup.html" class="btn-primary btn h2 lightBlue get-Started-btn">GET STARTED</a>\n            <h6 class="get-Started-sub-btn">FREE VERSION AVAILABLE!</h6>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div> -->\n\n  <!-- <div class="parent-center-center-1">\n    <div class="parent-center-center-2">\n      <div class="parent-center-center-3">\n        <div class="child-center-center media">\n\n                {{> backwardLow }}\n\n                {{#if Template.subscriptionsReady}}\n                  {{#with entry}}\n                    {{#if getSession \'lesen\'}}\n                      {{> modusLesenLow}}\n                    {{/if}}\n                    {{#if getSession \'wort\'}}\n                      {{> modusWortLow}}\n                    {{/if}}\n                    {{#if getSession \'definition\'}}\n                      {{> modusDefinitionLow}}\n                    {{/if}}\n                  {{/with}}\n\n                {{else}}\n                  {{> loading}}\n                {{/if}}\n\n                {{> forwardLow }}\n\n        </div>\n      </div>\n    </div>\n  </div> -->') ];
}));                                                                                                                   // 30
                                                                                                                       // 31
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

}}},"layout":{"template.bar.js":function(){

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
    "class": "attention-mode"                                                                                          // 6
  }, "\n        ", HTML.A({                                                                                            // 7
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
  }, "\n          ", HTML.NAV({                                                                                        // 19
    "class": function() {                                                                                              // 20
      return [ "navbar navbar-fixed-top ", Blaze.If(function() {                                                       // 21
        return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                     // 22
      }, function() {                                                                                                  // 23
        return " attention-low ";                                                                                      // 24
      }, function() {                                                                                                  // 25
        return " attention-high ";                                                                                     // 26
      }), " text-center " ];                                                                                           // 27
    }                                                                                                                  // 28
  }, "\n                ", Blaze.If(function() {                                                                       // 29
    return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                         // 30
  }, function() {                                                                                                      // 31
    return [ HTML.I({                                                                                                  // 32
      "class": "fa fa-angle-up fa-4x"                                                                                  // 33
    }), " " ];                                                                                                         // 34
  }, function() {                                                                                                      // 35
    return [ " ", HTML.I({                                                                                             // 36
      "class": "fa fa-angle-down fa-4x"                                                                                // 37
    }), " " ];                                                                                                         // 38
  }), "\n          "), "\n        "), "\n    ");                                                                       // 39
}));                                                                                                                   // 40
                                                                                                                       // 41
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.footer.js":function(){

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
  return HTML.FOOTER({                                                                                                 // 5
    "class": "text-center"                                                                                             // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": function() {                                                                                              // 8
      return [ "container footer-content ", Blaze.If(function() {                                                      // 9
        return Spacebars.call(view.lookup("currentUser"));                                                             // 10
      }, function() {                                                                                                  // 11
        return "footer-border";                                                                                        // 12
      }) ];                                                                                                            // 13
    }                                                                                                                  // 14
  }, "\n      Chalimo Vokabeltrainer | ", Blaze.If(function() {                                                        // 15
    return Spacebars.call(view.lookup("currentUser"));                                                                 // 16
  }, function() {                                                                                                      // 17
    return [ " ", HTML.A({                                                                                             // 18
      href: function() {                                                                                               // 19
        return Spacebars.mustache(view.lookup("pathFor"), "faq");                                                      // 20
      }                                                                                                                // 21
    }, "Dokumentation"), " | " ];                                                                                      // 22
  }), HTML.A({                                                                                                         // 23
    href: function() {                                                                                                 // 24
      return Spacebars.mustache(view.lookup("pathFor"), "disclaimer");                                                 // 25
    }                                                                                                                  // 26
  }, "Disclaimer"), "\n    "), "\n  ");                                                                                // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.head.js":function(){

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

},"template.layout.js":function(){

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
      template: Spacebars.call(view.lookup("navModeTrainer"))                                                          // 25
    };                                                                                                                 // 26
  }, function() {                                                                                                      // 27
    return Spacebars.include(function() {                                                                              // 28
      return Spacebars.call(Template.__dynamic);                                                                       // 29
    });                                                                                                                // 30
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 31
    return {                                                                                                           // 32
      template: Spacebars.call(view.lookup("navOverview"))                                                             // 33
    };                                                                                                                 // 34
  }, function() {                                                                                                      // 35
    return Spacebars.include(function() {                                                                              // 36
      return Spacebars.call(Template.__dynamic);                                                                       // 37
    });                                                                                                                // 38
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 39
    return {                                                                                                           // 40
      template: Spacebars.call(view.lookup("navStatistics"))                                                           // 41
    };                                                                                                                 // 42
  }, function() {                                                                                                      // 43
    return Spacebars.include(function() {                                                                              // 44
      return Spacebars.call(Template.__dynamic);                                                                       // 45
    });                                                                                                                // 46
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 47
    return {                                                                                                           // 48
      template: Spacebars.call(view.lookup("main"))                                                                    // 49
    };                                                                                                                 // 50
  }, function() {                                                                                                      // 51
    return Spacebars.include(function() {                                                                              // 52
      return Spacebars.call(Template.__dynamic);                                                                       // 53
    });                                                                                                                // 54
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 55
    return {                                                                                                           // 56
      template: Spacebars.call(view.lookup("navSource"))                                                               // 57
    };                                                                                                                 // 58
  }, function() {                                                                                                      // 59
    return Spacebars.include(function() {                                                                              // 60
      return Spacebars.call(Template.__dynamic);                                                                       // 61
    });                                                                                                                // 62
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 63
    return {                                                                                                           // 64
      template: Spacebars.call(view.lookup("footer"))                                                                  // 65
    };                                                                                                                 // 66
  }, function() {                                                                                                      // 67
    return Spacebars.include(function() {                                                                              // 68
      return Spacebars.call(Template.__dynamic);                                                                       // 69
    });                                                                                                                // 70
  }), "\n  ");                                                                                                         // 71
}));                                                                                                                   // 72
                                                                                                                       // 73
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.nav.js":function(){

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
  return HTML.NAV({                                                                                                    // 5
    "class": "navbar navbar-inverse nav-justified buffer-bar"                                                          // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "container"                                                                                               // 8
  }, "\n      ", HTML.DIV({                                                                                            // 9
    "class": "navbar-header"                                                                                           // 10
  }, "\n        ", HTML.Raw('<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n          <span class="sr-only">Toggle navigation</span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n          <span class="icon-bar"></span>\n        </button>'), "\n        ", Spacebars.include(view.lookupTemplate("atNavButton")), "\n      "), "\n      ", HTML.DIV({
    style: "height: 1px;",                                                                                             // 12
    "aria-expanded": "false",                                                                                          // 13
    id: "navbar",                                                                                                      // 14
    "class": "navbar-collapse collapse"                                                                                // 15
  }, "\n        ", HTML.UL({                                                                                           // 16
    "class": "nav navbar-nav  text-center"                                                                             // 17
  }, "\n          ", HTML.LI({                                                                                         // 18
    "class": function() {                                                                                              // 19
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 20
        regex: "index"                                                                                                 // 21
      }));                                                                                                             // 22
    }                                                                                                                  // 23
  }, HTML.A({                                                                                                          // 24
    href: function() {                                                                                                 // 25
      return Spacebars.mustache(view.lookup("pathFor"), "index");                                                      // 26
    }                                                                                                                  // 27
  }, "Index")), "\n          ", HTML.LI({                                                                              // 28
    "class": function() {                                                                                              // 29
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 30
        regex: "trainer"                                                                                               // 31
      }));                                                                                                             // 32
    }                                                                                                                  // 33
  }, HTML.A({                                                                                                          // 34
    href: function() {                                                                                                 // 35
      return Spacebars.mustache(view.lookup("pathFor"), "trainer");                                                    // 36
    }                                                                                                                  // 37
  }, "Trainer")), "\n          ", HTML.LI({                                                                            // 38
    "class": function() {                                                                                              // 39
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 40
        regex: "register"                                                                                              // 41
      }));                                                                                                             // 42
    }                                                                                                                  // 43
  }, HTML.A({                                                                                                          // 44
    href: function() {                                                                                                 // 45
      return Spacebars.mustache(view.lookup("pathFor"), "register");                                                   // 46
    }                                                                                                                  // 47
  }, "Register")), "\n          ", Blaze.Unless(function() {                                                           // 48
    return Spacebars.call(view.lookup("surveySubmitted"));                                                             // 49
  }, function() {                                                                                                      // 50
    return [ "\n          ", HTML.LI({                                                                                 // 51
      "class": function() {                                                                                            // 52
        return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                         // 53
          regex: "fragebogen"                                                                                          // 54
        }));                                                                                                           // 55
      }                                                                                                                // 56
    }, HTML.A({                                                                                                        // 57
      href: function() {                                                                                               // 58
        return Spacebars.mustache(view.lookup("pathFor"), "fragebogen");                                               // 59
      }                                                                                                                // 60
    }, "Fragebogen")), "\n          " ];                                                                               // 61
  }), " ", Blaze.If(function() {                                                                                       // 62
    return Spacebars.dataMustache(view.lookup("isInRole"), "admin");                                                   // 63
  }, function() {                                                                                                      // 64
    return [ "\n          ", HTML.LI({                                                                                 // 65
      "class": function() {                                                                                            // 66
        return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                         // 67
          regex: "verwaltung"                                                                                          // 68
        }));                                                                                                           // 69
      }                                                                                                                // 70
    }, HTML.A({                                                                                                        // 71
      href: function() {                                                                                               // 72
        return Spacebars.mustache(view.lookup("pathFor"), "verwaltung");                                               // 73
      }                                                                                                                // 74
    }, "Verwaltung")), "\n          " ];                                                                               // 75
  }), "\n        "), "\n      "), "\n    "), "\n  ");                                                                  // 76
}));                                                                                                                   // 77
                                                                                                                       // 78
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.navStatistics.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.navStatistics.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navStatistics");                                                                                 // 2
Template["navStatistics"] = new Template("Template.navStatistics", (function() {                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, "\n    ", HTML.DIV({                                                                                              // 7
    "class": "row"                                                                                                     // 8
  }, "\n      ", HTML.UL({                                                                                             // 9
    "class": "nav nav-tabs nav-justified"                                                                              // 10
  }, "\n        ", HTML.LI({                                                                                           // 11
    role: "presentation",                                                                                              // 12
    "class": function() {                                                                                              // 13
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 14
        regex: "device"                                                                                                // 15
      }));                                                                                                             // 16
    }                                                                                                                  // 17
  }, HTML.A({                                                                                                          // 18
    href: function() {                                                                                                 // 19
      return Spacebars.mustache(view.lookup("pathFor"), "device");                                                     // 20
    }                                                                                                                  // 21
  }, "Device")), "\n        ", HTML.LI({                                                                               // 22
    role: "presentation",                                                                                              // 23
    "class": function() {                                                                                              // 24
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 25
        regex: "mode"                                                                                                  // 26
      }));                                                                                                             // 27
    }                                                                                                                  // 28
  }, HTML.A({                                                                                                          // 29
    href: function() {                                                                                                 // 30
      return Spacebars.mustache(view.lookup("pathFor"), "mode");                                                       // 31
    }                                                                                                                  // 32
  }, "Mode")), "\n        ", HTML.LI({                                                                                 // 33
    role: "presentation",                                                                                              // 34
    "class": function() {                                                                                              // 35
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 36
        regex: "status"                                                                                                // 37
      }));                                                                                                             // 38
    }                                                                                                                  // 39
  }, HTML.A({                                                                                                          // 40
    href: function() {                                                                                                 // 41
      return Spacebars.mustache(view.lookup("pathFor"), "status");                                                     // 42
    }                                                                                                                  // 43
  }, "Status")), "\n        ", HTML.LI({                                                                               // 44
    role: "presentation",                                                                                              // 45
    "class": function() {                                                                                              // 46
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 47
        regex: "total"                                                                                                 // 48
      }));                                                                                                             // 49
    }                                                                                                                  // 50
  }, HTML.A({                                                                                                          // 51
    href: function() {                                                                                                 // 52
      return Spacebars.mustache(view.lookup("pathFor"), "total");                                                      // 53
    }                                                                                                                  // 54
  }, "Total")), "\n      "), "\n    "), "\n  ");                                                                       // 55
}));                                                                                                                   // 56
                                                                                                                       // 57
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.nav_low.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav_low.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navLow");                                                                                        // 2
Template["navLow"] = new Template("Template.navLow", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<br>\n	<br>\n	"), HTML.DIV({                                                                      // 5
    "class": "row"                                                                                                     // 6
  }, "\n		", HTML.Raw("<!-- Button trigger modal -->"), "\n		", HTML.Raw('<button type="button" class="btn btn-standard-2" data-toggle="modal" data-target="#settingsLow">\n			Einstellungen\n		</button>'), "\n		", HTML.Raw("<!-- Modal -->"), "\n		", HTML.DIV({
    "class": "modal fade",                                                                                             // 8
    id: "settingsLow",                                                                                                 // 9
    tabindex: "-1",                                                                                                    // 10
    role: "dialog",                                                                                                    // 11
    "aria-labelledby": "settingsLowLabel"                                                                              // 12
  }, "\n			", HTML.DIV({                                                                                               // 13
    "class": "modal-dialog",                                                                                           // 14
    role: "document"                                                                                                   // 15
  }, "\n				", HTML.DIV({                                                                                              // 16
    "class": "modal-content"                                                                                           // 17
  }, "\n					", HTML.Raw('<div class="modal-header">\n						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n						<h4 class="modal-title control-label" id="settingsLowLabel">Einstellungen</h4>\n					</div>'), "\n					", HTML.DIV({
    "class": "modal-body"                                                                                              // 19
  }, "\n						", Spacebars.include(view.lookupTemplate("navMode")), "\n						", Spacebars.include(view.lookupTemplate("navSource")), "\n					"), "\n\n				"), "\n			"), "\n		"), "\n	") ];
}));                                                                                                                   // 21
                                                                                                                       // 22
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.nav_mode.js":function(){

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
  return HTML.DIV({                                                                                                    // 5
    "class": "row text-center"                                                                                         // 6
  }, "\n			", HTML.BUTTON({                                                                                            // 7
    type: "button",                                                                                                    // 8
    "class": "btn btn-standard-2 btn-mode"                                                                             // 9
  }, "Option: ", Blaze.View("lookup:mode", function() {                                                                // 10
    return Spacebars.mustache(view.lookup("mode"));                                                                    // 11
  })), "\n	");                                                                                                         // 12
}));                                                                                                                   // 13
                                                                                                                       // 14
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.nav_mode_trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav_mode_trainer.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navModeTrainer");                                                                                // 2
Template["navModeTrainer"] = new Template("Template.navModeTrainer", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "row text-center"                                                                                         // 6
  }, HTML.Raw('\n		<h5 class="widget-title">Option</h5>\n			'), HTML.UL({                                              // 7
    "class": "list-inline"                                                                                             // 8
  }, "\n				", HTML.LI(HTML.BUTTON({                                                                                   // 9
    type: "button",                                                                                                    // 10
    "class": function() {                                                                                              // 11
      return [ "btn btn-lesen btn-standard-1 ", Blaze.If(function() {                                                  // 12
        return Spacebars.dataMustache(view.lookup("getSession"), "lesen");                                             // 13
      }, function() {                                                                                                  // 14
        return "active";                                                                                               // 15
      }) ];                                                                                                            // 16
    }                                                                                                                  // 17
  }, "Lesen")), "\n				", HTML.LI(HTML.BUTTON({                                                                        // 18
    type: "button",                                                                                                    // 19
    "class": function() {                                                                                              // 20
      return [ "btn btn-wort btn-standard-1 ", Blaze.If(function() {                                                   // 21
        return Spacebars.dataMustache(view.lookup("getSession"), "wort");                                              // 22
      }, function() {                                                                                                  // 23
        return "active";                                                                                               // 24
      }) ];                                                                                                            // 25
    }                                                                                                                  // 26
  }, "Wort")), "\n				", HTML.LI(HTML.BUTTON({                                                                         // 27
    type: "button",                                                                                                    // 28
    "class": function() {                                                                                              // 29
      return [ "btn btn-definition btn-standard-1 ", Blaze.If(function() {                                             // 30
        return Spacebars.dataMustache(view.lookup("getSession"), "definition");                                        // 31
      }, function() {                                                                                                  // 32
        return "active";                                                                                               // 33
      }) ];                                                                                                            // 34
    }                                                                                                                  // 35
  }, "Definition")), "\n				", HTML.LI(HTML.BUTTON({                                                                   // 36
    type: "button",                                                                                                    // 37
    "class": function() {                                                                                              // 38
      return [ "btn btn-eingabe btn-standard-1 ", Blaze.If(function() {                                                // 39
        return Spacebars.dataMustache(view.lookup("getSession"), "eingabe");                                           // 40
      }, function() {                                                                                                  // 41
        return "active";                                                                                               // 42
      }) ];                                                                                                            // 43
    }                                                                                                                  // 44
  }, "Eingabe")), "\n			"), "\n	");                                                                                    // 45
}));                                                                                                                   // 46
                                                                                                                       // 47
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.nav_overview.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav_overview.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navOverview");                                                                                   // 2
Template["navOverview"] = new Template("Template.navOverview", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "row text-center"                                                                                         // 8
  }, "\n			", HTML.Raw("<br>"), "\n			", HTML.DIV({                                                                    // 9
    "class": "btn-group btn-group-lg",                                                                                 // 10
    role: "group"                                                                                                      // 11
  }, "\n				", HTML.A({                                                                                                // 12
    "class": function() {                                                                                              // 13
      return [ "btn btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                     // 14
        regex: "statistik"                                                                                             // 15
      })) ];                                                                                                           // 16
    },                                                                                                                 // 17
    href: function() {                                                                                                 // 18
      return Spacebars.mustache(view.lookup("pathFor"), "statistik");                                                  // 19
    },                                                                                                                 // 20
    role: "button"                                                                                                     // 21
  }, "Statistik"), "\n				", HTML.A({                                                                                  // 22
    "class": function() {                                                                                              // 23
      return [ "btn btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                     // 24
        regex: "feedback"                                                                                              // 25
      })) ];                                                                                                           // 26
    },                                                                                                                 // 27
    href: function() {                                                                                                 // 28
      return Spacebars.mustache(view.lookup("pathFor"), "feedback");                                                   // 29
    },                                                                                                                 // 30
    role: "button"                                                                                                     // 31
  }, "Feedback"), "\n			"), "\n			", HTML.Raw("<br>"), "\n			", HTML.Raw("<br>"), "\n		"), "\n	");                     // 32
}));                                                                                                                   // 33
                                                                                                                       // 34
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.nav_source.js":function(){

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
  }, "\n				", HTML.BUTTON({                                                                                           // 7
    type: "button",                                                                                                    // 8
    "class": "btn btn-standard-2 btn-source"                                                                           // 9
  }, "\n					Woerter aus: ", Blaze.View("lookup:source", function() {                                                  // 10
    return Spacebars.mustache(view.lookup("source"));                                                                  // 11
  }), "\n					", Blaze.If(function() {                                                                                 // 12
    return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                      // 13
  }, function() {                                                                                                      // 14
    return [ "\n						", HTML.SPAN({                                                                                   // 15
      "class": "label label-default"                                                                                   // 16
    }, Blaze.View("lookup:getSession", function() {                                                                    // 17
      return Spacebars.mustache(view.lookup("getSession"), "lengthFav");                                               // 18
    })), "\n					" ];                                                                                                  // 19
  }, function() {                                                                                                      // 20
    return [ "\n						", HTML.SPAN({                                                                                   // 21
      "class": "label label-default"                                                                                   // 22
    }, Blaze.View("lookup:getSession", function() {                                                                    // 23
      return Spacebars.mustache(view.lookup("getSession"), "lengthNotFav");                                            // 24
    })), "\n					" ];                                                                                                  // 25
  }), "\n				"), "\n				", Blaze.Unless(function() {                                                                   // 26
    return Spacebars.dataMustache(view.lookup("getSession"), "lengthFav");                                             // 27
  }, function() {                                                                                                      // 28
    return HTML.SPAN({                                                                                                 // 29
      "class": "label label-warning"                                                                                   // 30
    }, "Kein Eintrag in Favoritenliste");                                                                              // 31
  }), "\n				", Blaze.Unless(function() {                                                                              // 32
    return Spacebars.dataMustache(view.lookup("getSession"), "lengthNotFav");                                          // 33
  }, function() {                                                                                                      // 34
    return HTML.SPAN({                                                                                                 // 35
      "class": "label label-warning"                                                                                   // 36
    }, "Kein Eintrag in Nicht-Favoritenliste. Alle Woerter sind favorisiert.");                                        // 37
  }), "\n		");                                                                                                         // 38
}));                                                                                                                   // 39
                                                                                                                       // 40
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.nav_source_trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav_source_trainer.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navSourceTrainer");                                                                              // 2
Template["navSourceTrainer"] = new Template("Template.navSourceTrainer", (function() {                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "row text-center"                                                                                         // 6
  }, HTML.Raw('\n		<h5 class="widget-title">Quelle</h5>\n		'), HTML.UL({                                               // 7
    "class": "list-inline"                                                                                             // 8
  }, "\n			", Blaze.If(function() {                                                                                    // 9
    return Spacebars.dataMustache(view.lookup("getSession"), "lengthFav");                                             // 10
  }, function() {                                                                                                      // 11
    return [ "\n				", HTML.LI(HTML.BUTTON({                                                                           // 12
      type: "button",                                                                                                  // 13
      "class": function() {                                                                                            // 14
        return [ "btn btn-source-fav btn-standard-1 ", Blaze.If(function() {                                           // 15
          return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                // 16
        }, function() {                                                                                                // 17
          return "active";                                                                                             // 18
        }) ];                                                                                                          // 19
      }                                                                                                                // 20
    }, "Favouriten ", HTML.SPAN({                                                                                      // 21
      "class": "sup"                                                                                                   // 22
    }, "(", Blaze.View("lookup:getSession", function() {                                                               // 23
      return Spacebars.mustache(view.lookup("getSession"), "lengthFav");                                               // 24
    }), ")"))), "\n			" ];                                                                                             // 25
  }), "\n			", Blaze.If(function() {                                                                                   // 26
    return Spacebars.dataMustache(view.lookup("getSession"), "lengthNotFav");                                          // 27
  }, function() {                                                                                                      // 28
    return [ "\n				", HTML.LI(HTML.BUTTON({                                                                           // 29
      type: "button",                                                                                                  // 30
      "class": function() {                                                                                            // 31
        return [ "btn btn-source-not-fav btn-standard-1 ", Blaze.Unless(function() {                                   // 32
          return Spacebars.dataMustache(view.lookup("getSession"), "sourceFavourites");                                // 33
        }, function() {                                                                                                // 34
          return "active";                                                                                             // 35
        }) ];                                                                                                          // 36
      }                                                                                                                // 37
    }, "Nicht-Favouriten ", HTML.SPAN({                                                                                // 38
      "class": "sup"                                                                                                   // 39
    }, "(", Blaze.View("lookup:getSession", function() {                                                               // 40
      return Spacebars.mustache(view.lookup("getSession"), "lengthNotFav");                                            // 41
    }), ")"))), "\n			" ];                                                                                             // 42
  }), "\n		"), "\n	");                                                                                                 // 43
}));                                                                                                                   // 44
                                                                                                                       // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"_GLOBAL_HELPERS.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/_GLOBAL_HELPERS.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Meteor.subscribe("userExt");                                                                                           // 1
// Global helpers                                                                                                      //
                                                                                                                       //
// e.g. {{getSession "posX"}} in Template                                                                              //
Template.registerHelper('getSession', function (key) {                                                                 // 5
	return Session.get(key);                                                                                              // 6
});                                                                                                                    //
Template.registerHelper('currentUserMail', function () {                                                               // 8
	return Meteor.user().emails[0].address;                                                                               // 9
});                                                                                                                    //
Template.registerHelper('isOwner', function () {                                                                       // 11
	return this.userId == Meteor.userId();                                                                                // 12
});                                                                                                                    //
Template.registerHelper('surveySubmitted', function () {                                                               // 14
	var query = UserExt.findOne({ userId: Meteor.userId(), surveySubmitted: true });                                      // 15
	if (query) {                                                                                                          // 16
		return true;                                                                                                         // 17
	} else {                                                                                                              //
		return false;                                                                                                        // 19
	}                                                                                                                     //
});                                                                                                                    //
Template.registerHelper("lengthIsOne", function () {                                                                   // 22
	return Session.get(LENGTH_FAV) === 1 && Session.get(SOURCE_FAV) || Session.get(LENGTH_NOT_FAV) === 1 && !Session.get(SOURCE_FAV);
});                                                                                                                    //
Template.registerHelper("isFavourite", function (vocabularyId) {                                                       // 26
	var favEntry = Favourites.findOne({                                                                                   // 27
		vocabularyId: vocabularyId                                                                                           // 28
	});                                                                                                                   //
	if (favEntry) {                                                                                                       // 30
		return true;                                                                                                         // 31
	}                                                                                                                     //
});                                                                                                                    //
Template.registerHelper("favourites", function () {                                                                    // 34
	var favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());                                                    // 35
	if (Favourites.find().count() !== 0) {                                                                                // 36
		return Vocabulary.find({                                                                                             // 37
			_id: {                                                                                                              // 38
				$in: favIds                                                                                                        // 39
			}                                                                                                                   //
		}, {                                                                                                                 //
			sort: {                                                                                                             // 42
				term: 1                                                                                                            // 43
			}                                                                                                                   //
		});                                                                                                                  //
	} else {                                                                                                              //
		return null;                                                                                                         // 47
	}                                                                                                                     //
});                                                                                                                    //
Template.registerHelper("entry", function () {                                                                         // 50
	var currentUserId = this.userId;                                                                                      // 51
	var favIds = R.pluck('vocabularyId')(Favourites.find().fetch());                                                      // 52
	var vocabulary = [];                                                                                                  // 53
                                                                                                                       //
	if (Session.get(SOURCE_FAV)) {                                                                                        // 55
		vocabulary = Vocabulary.find({                                                                                       // 56
			_id: {                                                                                                              // 57
				$in: favIds                                                                                                        // 58
			}                                                                                                                   //
		}).fetch();                                                                                                          //
	} else {                                                                                                              //
		vocabulary = Vocabulary.find({                                                                                       // 62
			_id: {                                                                                                              // 63
				$nin: favIds                                                                                                       // 64
			}                                                                                                                   //
		}).fetch();                                                                                                          //
	}                                                                                                                     //
	return vocabulary[Session.get(COUNT_VIEWED)];                                                                         // 68
});                                                                                                                    //
                                                                                                                       //
// NAV SOURCE                                                                                                          //
Template.registerHelper("source", function () {                                                                        // 72
	if (Session.get(SOURCE_FAV)) {                                                                                        // 73
		return "Favoriten";                                                                                                  // 74
	} else {                                                                                                              //
		return "Nicht-Favoriten";                                                                                            // 76
	}                                                                                                                     //
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
// RANDOM_FAV = 'randomFavourites';                                                                                    //
// Session.setDefault(RANDOM_FAV, false);                                                                              //
//                                                                                                                     //
// RANDOM_NOT_FAV = 'randomNotFavourites';                                                                             //
// Session.setDefault(RANDOM_NOT_FAV, true);                                                                           //
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
EXAMPLE = 'example';                                                                                                   // 30
Session.setDefault(EXAMPLE, false);                                                                                    // 31
                                                                                                                       //
TERM_WRONG = 'termWrong';                                                                                              // 33
Session.setDefault(TERM_WRONG, false);                                                                                 // 34
                                                                                                                       //
TERM_RIGHT = 'termRight';                                                                                              // 36
Session.setDefault(TERM_RIGHT, false);                                                                                 // 37
                                                                                                                       //
TERM_CACHE = 'termCache';                                                                                              // 39
Session.setDefault(TERM_CACHE, '');                                                                                    // 40
                                                                                                                       //
COUNT_LETTERS_MATCH = 'countLettersMatch';                                                                             // 42
Session.setDefault(COUNT_LETTERS_MATCH, 0);                                                                            // 43
                                                                                                                       //
NAV_MODE_READ = 'lesen';                                                                                               // 45
Session.setDefault(NAV_MODE_READ, true);                                                                               // 46
                                                                                                                       //
NAV_MODE_TERM = 'wort';                                                                                                // 48
Session.setDefault(NAV_MODE_TERM, false);                                                                              // 49
                                                                                                                       //
NAV_MODE_DEF = 'definition';                                                                                           // 51
Session.setDefault(NAV_MODE_DEF, false);                                                                               // 52
                                                                                                                       //
NAV_MODE_ENTER = 'eingabe';                                                                                            // 54
Session.setDefault(NAV_MODE_ENTER, false);                                                                             // 55
                                                                                                                       //
NAV_MODES = 'navModes';                                                                                                // 57
Session.setDefault(NAV_MODES, [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF]);                                           // 58
                                                                                                                       //
NAV_MODE_COUNT = 'navModeCount';                                                                                       // 60
Session.setDefault(NAV_MODE_COUNT, 0);                                                                                 // 61
                                                                                                                       //
NAV_LOW = 'navLow';                                                                                                    // 63
Session.setDefault(NAV_LOW, false);                                                                                    // 64
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
      Session.set(NAV_LOW, false);                                                                                     // 6
      Session.set(EXAMPLE, false);                                                                                     // 7
                                                                                                                       //
      var routePath = FlowRouter.current().path;                                                                       // 9
      Session.set(LAST_PATH, routePath);                                                                               // 10
                                                                                                                       //
      // reset mode if set to 'eingabe'                                                                                //
      if (Session.get(NAV_MODE_ENTER)) {                                                                               // 2
        setModeTrainer(NAV_MODE_READ);                                                                                 // 14
      };                                                                                                               //
                                                                                                                       //
      // log                                                                                                           //
      Log.detail('bar');                                                                                               // 2
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
	var template = Template.instance();                                                                                   // 2
	Tracker.autorun(function () {                                                                                         // 3
		template.subscribe('userExtension');                                                                                 // 4
		Session.set(LENGTH_FAV, Favourites.find().count());                                                                  // 5
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                                  // 6
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.layout.events({                                                                                               // 11
	'click .btn-forward, click .btn-backward': function () {                                                              // 12
		function clickBtnForwardClickBtnBackward(event, template) {                                                          //
			var self = this;                                                                                                    // 13
			if (Session.get(REVEALED)) {                                                                                        // 14
				Session.set(REVEALED, false);                                                                                      // 15
			}                                                                                                                   //
			if (Session.get(TERM_WRONG)) {                                                                                      // 17
				Session.set(TERM_WRONG, false);                                                                                    // 18
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 20
				document.getElementById("term").value = '';                                                                        // 21
				if (document.getElementById("term").disabled === true) {                                                           // 22
					document.getElementById("term").disabled = false;                                                                 // 23
					document.getElementById("term").autofocus = true;                                                                 // 24
				}                                                                                                                  //
				document.getElementById("term").focus();                                                                           // 26
			}                                                                                                                   //
                                                                                                                       //
			// log                                                                                                              //
			Log.detail('browse');                                                                                               // 12
			Meteor.call('dataWords', self);                                                                                     // 32
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnForwardClickBtnBackward;                                                                              //
	}(),                                                                                                                  //
	'click .btn-backward': function () {                                                                                  // 35
		function clickBtnBackward(event, template) {                                                                         //
			var val = 0;                                                                                                        // 36
			if (Session.get(SOURCE_FAV)) {                                                                                      // 37
				// reset to avoid going into negative numbers and be able to circle backwards                                      //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                             // 39
					val = Session.get(LENGTH_FAV) - 1;                                                                                // 40
					Session.set(COUNT_VIEWED, val);                                                                                   // 41
				} else {                                                                                                           //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_FAV);                                                  // 43
					Session.set(COUNT_VIEWED, val);                                                                                   // 44
				}                                                                                                                  //
			} else {                                                                                                            //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                             // 47
					val = Session.get(LENGTH_NOT_FAV) - 1;                                                                            // 48
					Session.set(COUNT_VIEWED, val);                                                                                   // 49
				} else {                                                                                                           //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_NOT_FAV);                                              // 51
					Session.set(COUNT_VIEWED, val);                                                                                   // 52
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnBackward;                                                                                             //
	}(),                                                                                                                  //
	'click .btn-forward': function () {                                                                                   // 56
		function clickBtnForward(event, template) {                                                                          //
			var val = 0;                                                                                                        // 57
			if (Session.get(SOURCE_FAV)) {                                                                                      // 58
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                                   // 59
				Session.set(COUNT_VIEWED, val);                                                                                    // 60
			} else {                                                                                                            //
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                               // 62
				Session.set(COUNT_VIEWED, val);                                                                                    // 63
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnForward;                                                                                              //
	}(),                                                                                                                  //
	'click .btn-reveal': function () {                                                                                    // 66
		function clickBtnReveal(event, template) {                                                                           //
			if (!Session.get(REVEALED)) {                                                                                       // 67
				Session.set(REVEALED, true);                                                                                       // 68
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 70
				if (document.getElementById("term").disabled === false) {                                                          // 71
					document.getElementById("term").disabled = true;                                                                  // 72
				}                                                                                                                  //
			}                                                                                                                   //
			// log                                                                                                              //
			Log.detail('reveal');                                                                                               // 66
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnReveal;                                                                                               //
	}(),                                                                                                                  //
	'click .btn-example': function () {                                                                                   // 78
		function clickBtnExample(event, template) {                                                                          //
			var oldValue = Session.get(EXAMPLE) || false;                                                                       // 79
			Session.set(EXAMPLE, !oldValue);                                                                                    // 80
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnExample;                                                                                              //
	}(),                                                                                                                  //
	'click .btn-insert, click .btn-delete': function () {                                                                 // 82
		function clickBtnInsertClickBtnDelete(event, template) {                                                             //
			// log                                                                                                              //
			Log.detail('favDel');                                                                                               // 84
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnInsertClickBtnDelete;                                                                                 //
	}(),                                                                                                                  //
	'click .btn-insert': function () {                                                                                    // 86
		function clickBtnInsert(event, template) {                                                                           //
			var self = this;                                                                                                    // 87
                                                                                                                       //
			Meteor.call('insertFavourite', self._id);                                                                           // 89
			// simulate source mode button for register page                                                                    //
			if (!Session.get(ATTENTION_MODE)) {                                                                                 // 86
				Session.set(SOURCE_FAV, false);                                                                                    // 92
			}                                                                                                                   //
                                                                                                                       //
			// reset the COUNT VIEW when a list entry has been removed                                                          //
			if (!Session.get(SOURCE_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {                     // 86
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                           // 97
				Session.set(COUNT_VIEWED, val);                                                                                    // 98
			}                                                                                                                   //
			if (Session.get(LENGTH_NOT_FAV) === 1) {                                                                            // 100
				Session.set(SOURCE_FAV, !Session.get(SOURCE_FAV));                                                                 // 101
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnInsert;                                                                                               //
	}(),                                                                                                                  //
	'click .btn-delete': function () {                                                                                    // 105
		function clickBtnDelete(event, template) {                                                                           //
			var self = this;                                                                                                    // 106
                                                                                                                       //
			Meteor.call('deleteFavourite', self._id);                                                                           // 108
			// simulate source mode button for register page                                                                    //
			if (!Session.get(ATTENTION_MODE)) {                                                                                 // 105
				Session.set(SOURCE_FAV, true);                                                                                     // 111
			}                                                                                                                   //
                                                                                                                       //
			if (Session.get(SOURCE_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                          // 114
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 115
				Session.set(COUNT_VIEWED, val);                                                                                    // 116
			}                                                                                                                   //
			if (Session.get(LENGTH_FAV) === 1) {                                                                                // 118
				Session.set(SOURCE_FAV, !Session.get(SOURCE_FAV));                                                                 // 119
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnDelete;                                                                                               //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_low.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/nav_low.js                                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navLow.events({                                                                                               // 1
	'click .btn-low': function () {                                                                                       // 2
		function clickBtnLow(event, template) {                                                                              //
			var oldValue = Session.get(NAV_LOW) || false;                                                                       // 3
			Session.set(NAV_LOW, !oldValue);                                                                                    // 4
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnLow;                                                                                                  //
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
			// log                                                                                                              //
			Log.detail('mode');                                                                                                 // 2
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnMode;                                                                                                 //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.navMode.helpers({                                                                                             // 13
	mode: function () {                                                                                                   // 14
		function mode() {                                                                                                    //
			return Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                         // 15
		}                                                                                                                    //
                                                                                                                       //
		return mode;                                                                                                         //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_mode_trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/nav_mode_trainer.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navModeTrainer.events({                                                                                       // 1
	'click .btn-lesen': function () {                                                                                     // 2
		function clickBtnLesen() {                                                                                           //
			setModeTrainer(NAV_MODE_READ);                                                                                      // 3
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnLesen;                                                                                                //
	}(),                                                                                                                  //
	'click .btn-wort': function () {                                                                                      // 5
		function clickBtnWort() {                                                                                            //
			setModeTrainer(NAV_MODE_TERM);                                                                                      // 6
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnWort;                                                                                                 //
	}(),                                                                                                                  //
	'click .btn-definition': function () {                                                                                // 8
		function clickBtnDefinition() {                                                                                      //
			setModeTrainer(NAV_MODE_DEF);                                                                                       // 9
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnDefinition;                                                                                           //
	}(),                                                                                                                  //
	'click .btn-eingabe': function () {                                                                                   // 11
		function clickBtnEingabe() {                                                                                         //
			Session.get(NAV_MODES).forEach(function (entry) {                                                                   // 12
				Session.set(entry, false);                                                                                         // 13
			});                                                                                                                 //
			Session.set(NAV_MODE_ENTER, true);                                                                                  // 15
			// log                                                                                                              //
			Log.detail('mode');                                                                                                 // 11
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnEingabe;                                                                                              //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
setModeTrainer = function setModeTrainer(mode) {                                                                       // 21
	Session.set(NAV_MODE_COUNT, R.indexOf(mode, Session.get(NAV_MODES)));                                                 // 22
	Session.get(NAV_MODES).forEach(function (entry) {                                                                     // 23
		Session.set(entry, false);                                                                                           // 24
	});                                                                                                                   //
	Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);                                               // 26
	Session.set(NAV_MODE_ENTER, false);                                                                                   // 27
	// log                                                                                                                //
	Log.detail('mode');                                                                                                   // 21
};                                                                                                                     //
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
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.navSource.events({                                                                                            // 11
	'click .btn-source': function () {                                                                                    // 12
		function clickBtnSource() {                                                                                          //
			var oldValue = Session.get(SOURCE_FAV) || false;                                                                    // 13
                                                                                                                       //
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
                                                                                                                       //
			// Button only switchable when there's at least on entry on a list                                                  //
			if (Session.get(LENGTH_FAV) !== 0 && Session.get(LENGTH_NOT_FAV) !== 0) {                                           // 12
				Session.set(SOURCE_FAV, !oldValue);                                                                                // 30
			}                                                                                                                   //
                                                                                                                       //
			// reset counter range when switching between fav list and not-fav list                                             //
			if (Session.get(SOURCE_FAV)) {                                                                                      // 12
				var val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_FAV);                                                     // 35
				Session.set(COUNT_VIEWED, val);                                                                                    // 36
			} else {                                                                                                            //
				var _val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_NOT_FAV);                                                // 38
				Session.set(COUNT_VIEWED, _val);                                                                                   // 39
			}                                                                                                                   //
                                                                                                                       //
			// log                                                                                                              //
			Log.detail('source');                                                                                               // 12
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnSource;                                                                                               //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_source_trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/nav_source_trainer.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navSourceTrainer.helpers({});                                                                                 // 1
                                                                                                                       //
Template.navSourceTrainer.events({                                                                                     // 5
	'click .btn-source-fav, click .btn-source-not-fav': function () {                                                     // 6
		function clickBtnSourceFavClickBtnSourceNotFav() {                                                                   //
			if (Session.get(REVEALED)) {                                                                                        // 7
				Session.set(REVEALED, false);                                                                                      // 8
			}                                                                                                                   //
			if (Session.get(TERM_WRONG)) {                                                                                      // 10
				Session.set(TERM_WRONG, false);                                                                                    // 11
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 13
				document.getElementById("term").value = '';                                                                        // 14
				if (document.getElementById("term").disabled === true) {                                                           // 15
					document.getElementById("term").disabled = false;                                                                 // 16
				}                                                                                                                  //
			}                                                                                                                   //
			// log                                                                                                              //
			Log.detail('source');                                                                                               // 6
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnSourceFavClickBtnSourceNotFav;                                                                        //
	}(),                                                                                                                  //
	'click .btn-source-fav': function () {                                                                                // 22
		function clickBtnSourceFav() {                                                                                       //
			// Button only switchable when there's at least on entry on a list                                                  //
			if (Session.get(LENGTH_FAV) !== 0) {                                                                                // 24
				Session.set(SOURCE_FAV, true);                                                                                     // 25
			}                                                                                                                   //
			// reset counter range when switching between fav list and not-fav list                                             //
			var val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_FAV);                                                      // 22
			Session.set(COUNT_VIEWED, val);                                                                                     // 29
			console.log(Session.get(SOURCE_FAV));                                                                               // 30
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnSourceFav;                                                                                            //
	}(),                                                                                                                  //
	'click .btn-source-not-fav': function () {                                                                            // 32
		function clickBtnSourceNotFav() {                                                                                    //
			// Button only switchable when there's at least on entry on a list                                                  //
			if (Session.get(LENGTH_NOT_FAV) !== 0) {                                                                            // 34
				Session.set(SOURCE_FAV, false);                                                                                    // 35
			}                                                                                                                   //
			// reset counter range when switching between fav list and not-fav list                                             //
			var val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_NOT_FAV);                                                  // 32
			Session.set(COUNT_VIEWED, val);                                                                                     // 39
			console.log(Session.get(SOURCE_FAV));                                                                               // 40
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnSourceNotFav;                                                                                         //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"template.loading.js":function(){

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

},"template.page_not_found.js":function(){

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
Meteor.startup(function () {                                                                                           // 1
	WebFontConfig = {                                                                                                     // 2
		google: {                                                                                                            // 3
			families: ['Montserrat:400,700:latin', 'Roboto:400,300,700:latin', 'Playfair+Display:400,700,400italic:latin']      // 4
		}                                                                                                                    //
	};                                                                                                                    //
	(function () {                                                                                                        // 7
		var wf = document.createElement('script');                                                                           // 8
		wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';                                               // 9
		wf.type = 'text/javascript';                                                                                         // 10
		wf.async = 'true';                                                                                                   // 11
		var s = document.getElementsByTagName('script')[0];                                                                  // 12
		s.parentNode.insertBefore(wf, s);                                                                                    // 13
	})();                                                                                                                 //
});                                                                                                                    //
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

},"log.js":function(require,exports){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/aux/log.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function (exports) {                                                                                                  // 1
                                                                                                                       //
	exports.detail = function (clickArea) {                                                                               // 3
		// log                                                                                                               //
		var modes = [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF, NAV_MODE_ENTER];                                            // 5
		var currentRoute = FlowRouter.current().route.name;                                                                  // 6
                                                                                                                       //
		var deviceType = Darwin.device.type;                                                                                 // 8
		var devicePlatform = Darwin.device.platform;                                                                         // 9
		var route = FlowRouter.current().route.name;                                                                         // 10
		var area = clickArea;                                                                                                // 11
		var attention = Session.get(ATTENTION_MODE);                                                                         // 12
		var mode = 'null';                                                                                                   // 13
		if (currentRoute !== 'register') {                                                                                   // 14
			modes.forEach(function (entry) {                                                                                    // 15
				if (Session.get(entry)) {                                                                                          // 16
					mode = entry;                                                                                                     // 17
				}                                                                                                                  //
			});                                                                                                                 //
		};                                                                                                                   //
		Meteor.call('dataDetail', deviceType, devicePlatform, route, area, mode, attention);                                 // 21
	};                                                                                                                    //
})(this.Log = {});                                                                                                     //
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
Data = {};                                                                                                             // 1
Data.Detail = new Mongo.Collection('dataDetail', {});                                                                  // 2
Data.Words = new Mongo.Collection('dataWords', {});                                                                    // 3
Data.Survey = new Mongo.Collection('dataSurvey', {});                                                                  // 4
Data.Feedback = new Mongo.Collection('dataFeedback', {});                                                              // 5
Data.Status = new Mongo.Collection('dataStatus', {});                                                                  // 6
                                                                                                                       //
Data.Survey.allow({                                                                                                    // 8
	insert: function () {                                                                                                 // 9
		function insert() {                                                                                                  // 9
			return true;                                                                                                        // 10
		}                                                                                                                    //
                                                                                                                       //
		return insert;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
Data.Feedback.allow({                                                                                                  // 13
	insert: function () {                                                                                                 // 14
		function insert() {                                                                                                  // 14
			return true;                                                                                                        // 15
		}                                                                                                                    //
                                                                                                                       //
		return insert;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Data.Status.Schema = new SimpleSchema({                                                                                // 19
	userId: {                                                                                                             // 20
		type: String                                                                                                         // 21
	},                                                                                                                    //
	timestamp: {                                                                                                          // 23
		type: Date,                                                                                                          // 24
		autoValue: function () {                                                                                             // 25
			function autoValue() {                                                                                              // 25
				return new Date();                                                                                                 // 26
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	status: {                                                                                                             // 29
		type: String,                                                                                                        // 30
		allowedValues: ['online', 'offline']                                                                                 // 31
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Data.Feedback.Schema = new SimpleSchema({                                                                              // 35
	userId: {                                                                                                             // 36
		type: String,                                                                                                        // 37
		autoValue: function () {                                                                                             // 38
			function autoValue() {                                                                                              // 38
				return this.userId;                                                                                                // 39
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	userMail: {                                                                                                           // 42
		type: String,                                                                                                        // 43
		autoValue: function () {                                                                                             // 44
			function autoValue() {                                                                                              // 44
				return Meteor.user().emails[0].address;                                                                            // 45
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	message: {                                                                                                            // 48
		type: String,                                                                                                        // 49
		label: 'Feedback-Nachricht',                                                                                         // 50
		max: 1000,                                                                                                           // 51
		autoform: {                                                                                                          // 52
			afFieldInput: {                                                                                                     // 53
				type: "textarea"                                                                                                   // 54
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	createdAt: {                                                                                                          // 58
		type: Date,                                                                                                          // 59
		autoValue: function () {                                                                                             // 60
			function autoValue() {                                                                                              // 60
				return new Date();                                                                                                 // 61
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Data.Detail.Schema = new SimpleSchema({                                                                                // 66
	userId: {                                                                                                             // 67
		type: String,                                                                                                        // 68
		autoValue: function () {                                                                                             // 69
			function autoValue() {                                                                                              // 69
				return this.userId;                                                                                                // 70
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	userMail: {                                                                                                           // 73
		type: String,                                                                                                        // 74
		autoValue: function () {                                                                                             // 75
			function autoValue() {                                                                                              // 75
				return Meteor.user().emails[0].address;                                                                            // 76
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	timestamp: {                                                                                                          // 79
		type: Date,                                                                                                          // 80
		autoValue: function () {                                                                                             // 81
			function autoValue() {                                                                                              // 81
				return new Date();                                                                                                 // 82
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	deviceType: {                                                                                                         // 85
		type: String                                                                                                         // 86
	},                                                                                                                    //
	devicePlatform: {                                                                                                     // 88
		type: String                                                                                                         // 89
	},                                                                                                                    //
	route: {                                                                                                              // 91
		type: String                                                                                                         // 92
	},                                                                                                                    //
	clickArea: {                                                                                                          // 94
		type: String,                                                                                                        // 95
		allowedValues: ['bar', 'mode', 'source', 'favDel', 'browse', 'reveal']                                               // 96
	},                                                                                                                    //
	mode: {                                                                                                               // 98
		type: String,                                                                                                        // 99
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']                                                    // 100
	},                                                                                                                    //
	attention: {                                                                                                          // 102
		type: Boolean                                                                                                        // 103
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Data.Words.Schema = new SimpleSchema({                                                                                 // 107
	userId: {                                                                                                             // 108
		type: String,                                                                                                        // 109
		autoValue: function () {                                                                                             // 110
			function autoValue() {                                                                                              // 110
				return this.userId;                                                                                                // 111
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	vocabularyId: {                                                                                                       // 114
		type: String                                                                                                         // 115
	},                                                                                                                    //
	vocabularyName: {                                                                                                     // 117
		type: String                                                                                                         // 118
	},                                                                                                                    //
	viewed: {                                                                                                             // 120
		type: Number                                                                                                         // 121
	},                                                                                                                    //
	createdAt: {                                                                                                          // 123
		type: Date,                                                                                                          // 124
		autoValue: function () {                                                                                             // 125
			function autoValue() {                                                                                              // 125
				return new Date();                                                                                                 // 126
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Data.Survey.Schema = new SimpleSchema({                                                                                // 131
	// GENERAL                                                                                                            //
	userId: {                                                                                                             // 133
		type: String,                                                                                                        // 134
		autoValue: function () {                                                                                             // 135
			function autoValue() {                                                                                              // 135
				return this.userId;                                                                                                // 136
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		autoform: {                                                                                                          // 138
			type: "hidden",                                                                                                     // 139
			label: false                                                                                                        // 140
		}                                                                                                                    //
	},                                                                                                                    //
	age: {                                                                                                                // 143
		type: Number,                                                                                                        // 144
		label: 'Dein Alter',                                                                                                 // 145
		min: 18,                                                                                                             // 146
		max: 99                                                                                                              // 147
	},                                                                                                                    //
                                                                                                                       //
	previousExperience: {                                                                                                 // 150
		type: String,                                                                                                        // 151
		label: 'Ich verfuege ueber Vorerfahrung mit digitalen Vokabeltrainern.',                                             // 152
		autoform: {                                                                                                          // 153
			type: "select-radio-inline",                                                                                        // 154
			options: function () {                                                                                              // 155
				function options() {                                                                                               // 155
					return [{                                                                                                         // 156
						label: "trifft zu",                                                                                              // 157
						value: "trifftZu"                                                                                                // 158
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 160
						value: "trifftEherZu"                                                                                            // 161
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 163
						value: "teilsTeils"                                                                                              // 164
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 166
						value: "trifftEherNichtZu"                                                                                       // 167
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 169
						value: "trifftNichtZu"                                                                                           // 170
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	learningCurve: {                                                                                                      // 175
		type: String,                                                                                                        // 176
		label: 'Die Einarbeitung in den Fremdworttrainer ist mir leicht gefallen.',                                          // 177
		autoform: {                                                                                                          // 178
			type: "select-radio-inline",                                                                                        // 179
			options: function () {                                                                                              // 180
				function options() {                                                                                               // 180
					return [{                                                                                                         // 181
						label: "trifft zu",                                                                                              // 182
						value: "trifftZu"                                                                                                // 183
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 185
						value: "trifftEherZu"                                                                                            // 186
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 188
						value: "teilsTeils"                                                                                              // 189
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 191
						value: "trifftEherNichtZu"                                                                                       // 192
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 194
						value: "trifftNichtZu"                                                                                           // 195
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	everydayUse: {                                                                                                        // 200
		type: String,                                                                                                        // 201
		label: 'Den Gebrauch der App konnte ich muehelos in meinen Alltag integrieren.',                                     // 202
		autoform: {                                                                                                          // 203
			type: "select-radio-inline",                                                                                        // 204
			options: function () {                                                                                              // 205
				function options() {                                                                                               // 205
					return [{                                                                                                         // 206
						label: "trifft zu",                                                                                              // 207
						value: "trifftZu"                                                                                                // 208
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 210
						value: "trifftEherZu"                                                                                            // 211
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 213
						value: "teilsTeils"                                                                                              // 214
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 216
						value: "trifftEherNichtZu"                                                                                       // 217
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 219
						value: "trifftNichtZu"                                                                                           // 220
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	everydayUseText: {                                                                                                    // 225
		type: String,                                                                                                        // 226
		max: 1000,                                                                                                           // 227
		optional: true,                                                                                                      // 228
		label: 'Aus folgendem Grund (optional):',                                                                            // 229
		autoform: {                                                                                                          // 230
			afFieldInput: {                                                                                                     // 231
				type: "textarea"                                                                                                   // 232
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	usability: {                                                                                                          // 236
		type: String,                                                                                                        // 237
		label: 'Mit der Bedienung der App zurecht komme ich prima zurecht.',                                                 // 238
		autoform: {                                                                                                          // 239
			type: "select-radio-inline",                                                                                        // 240
			options: function () {                                                                                              // 241
				function options() {                                                                                               // 241
					return [{                                                                                                         // 242
						label: "trifft zu",                                                                                              // 243
						value: "trifftZu"                                                                                                // 244
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 246
						value: "trifftEherZu"                                                                                            // 247
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 249
						value: "teilsTeils"                                                                                              // 250
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 252
						value: "trifftEherNichtZu"                                                                                       // 253
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 255
						value: "trifftNichtZu"                                                                                           // 256
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	usabilityText: {                                                                                                      // 261
		type: String,                                                                                                        // 262
		max: 1000,                                                                                                           // 263
		optional: true,                                                                                                      // 264
		label: 'Aus folgendem Grund (optional):',                                                                            // 265
		optional: true,                                                                                                      // 266
		autoform: {                                                                                                          // 267
			afFieldInput: {                                                                                                     // 268
				type: "textarea"                                                                                                   // 269
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	// NUTZUNGSVERHALTEN                                                                                                  //
	deviceMobile: {                                                                                                       // 274
		type: String,                                                                                                        // 275
		label: '... Mobile Endgeraet (z.B. Smartphone, kein Laptop) aufgerufen.',                                            // 276
		autoform: {                                                                                                          // 277
			type: "select-radio-inline",                                                                                        // 278
			options: function () {                                                                                              // 279
				function options() {                                                                                               // 279
					return [{                                                                                                         // 280
						label: "trifft zu",                                                                                              // 281
						value: "trifftZu"                                                                                                // 282
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 284
						value: "trifftEherZu"                                                                                            // 285
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 287
						value: "teilsTeils"                                                                                              // 288
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 290
						value: "trifftEherNichtZu"                                                                                       // 291
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 293
						value: "trifftNichtZu"                                                                                           // 294
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	deviceTablet: {                                                                                                       // 299
		type: String,                                                                                                        // 300
		label: '... Tablet Endgeraet aufgerufen.',                                                                           // 301
		autoform: {                                                                                                          // 302
			type: "select-radio-inline",                                                                                        // 303
			options: function () {                                                                                              // 304
				function options() {                                                                                               // 304
					return [{                                                                                                         // 305
						label: "trifft zu",                                                                                              // 306
						value: "trifftZu"                                                                                                // 307
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 309
						value: "trifftEherZu"                                                                                            // 310
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 312
						value: "teilsTeils"                                                                                              // 313
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 315
						value: "trifftEherNichtZu"                                                                                       // 316
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 318
						value: "trifftNichtZu"                                                                                           // 319
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	deviceDesktop: {                                                                                                      // 324
		type: String,                                                                                                        // 325
		label: '... Desktop Endgeraet (z.B. Laptop, Desktop PC) aufgerufen.',                                                // 326
		autoform: {                                                                                                          // 327
			type: "select-radio-inline",                                                                                        // 328
			options: function () {                                                                                              // 329
				function options() {                                                                                               // 329
					return [{                                                                                                         // 330
						label: "trifft zu",                                                                                              // 331
						value: "trifftZu"                                                                                                // 332
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 334
						value: "trifftEherZu"                                                                                            // 335
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 337
						value: "teilsTeils"                                                                                              // 338
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 340
						value: "trifftEherNichtZu"                                                                                       // 341
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 343
						value: "trifftNichtZu"                                                                                           // 344
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	deviceBehavior: {                                                                                                     // 349
		type: String,                                                                                                        // 350
		max: 1000,                                                                                                           // 351
		optional: true,                                                                                                      // 352
		label: 'Aus folgendem Grund (optional):',                                                                            // 353
		autoform: {                                                                                                          // 354
			afFieldInput: {                                                                                                     // 355
				type: "textarea"                                                                                                   // 356
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	favouriteMode: {                                                                                                      // 360
		type: String,                                                                                                        // 361
		label: 'Folgenden Trainingsmodus habe ich am liebsten genutzt:',                                                     // 362
		autoform: {                                                                                                          // 363
			type: "select-radio-inline",                                                                                        // 364
			options: function () {                                                                                              // 365
				function options() {                                                                                               // 365
					return [{                                                                                                         // 366
						label: "Lesen",                                                                                                  // 367
						value: "lesen"                                                                                                   // 368
					}, {                                                                                                              //
						label: "Wort",                                                                                                   // 370
						value: "wort"                                                                                                    // 371
					}, {                                                                                                              //
						label: "Definition",                                                                                             // 373
						value: "definition"                                                                                              // 374
					}, {                                                                                                              //
						label: "Texteingabe",                                                                                            // 376
						value: "eingabe"                                                                                                 // 377
					}, {                                                                                                              //
						label: "Lesen im Register",                                                                                      // 379
						value: "register"                                                                                                // 380
					}, {                                                                                                              //
						label: "Weiss ich nicht",                                                                                        // 382
						value: "ka"                                                                                                      // 383
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	favouriteModeText: {                                                                                                  // 388
		type: String,                                                                                                        // 389
		max: 1000,                                                                                                           // 390
		optional: true,                                                                                                      // 391
		label: 'Aus folgendem Grund (optional):',                                                                            // 392
		autoform: {                                                                                                          // 393
			afFieldInput: {                                                                                                     // 394
				type: "textarea"                                                                                                   // 395
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	modeEnter: {                                                                                                          // 399
		type: String,                                                                                                        // 400
		label: 'Die Texteingabe-Option habe ich im Kompaktmodus vermisst.',                                                  // 401
		autoform: {                                                                                                          // 402
			type: "select-radio-inline",                                                                                        // 403
			options: function () {                                                                                              // 404
				function options() {                                                                                               // 404
					return [{                                                                                                         // 405
						label: "trifft zu",                                                                                              // 406
						value: "trifftZu"                                                                                                // 407
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 409
						value: "trifftEherZu"                                                                                            // 410
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 412
						value: "teilsTeils"                                                                                              // 413
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 415
						value: "trifftEherNichtZu"                                                                                       // 416
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 418
						value: "trifftNichtZu"                                                                                           // 419
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionBenefit: {                                                                                                   // 424
		type: String,                                                                                                        // 425
		label: 'Mir hat die Moeglichkeit, in den Kompaktmodus zu wechseln, gefallen.',                                       // 426
		autoform: {                                                                                                          // 427
			type: "select-radio-inline",                                                                                        // 428
			options: function () {                                                                                              // 429
				function options() {                                                                                               // 429
					return [{                                                                                                         // 430
						label: "trifft zu",                                                                                              // 431
						value: "trifftZu"                                                                                                // 432
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 434
						value: "trifftEherZu"                                                                                            // 435
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 437
						value: "teilsTeils"                                                                                              // 438
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 440
						value: "trifftEherNichtZu"                                                                                       // 441
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 443
						value: "trifftNichtZu"                                                                                           // 444
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionBehavior: {                                                                                                  // 449
		type: String,                                                                                                        // 450
		label: 'Die Moeglichkeit, den Kompaktmodus zu nutzen, hat mein Nutzungsverhalten der App beeinflusst.',              // 451
		autoform: {                                                                                                          // 452
			type: "select-radio-inline",                                                                                        // 453
			options: function () {                                                                                              // 454
				function options() {                                                                                               // 454
					return [{                                                                                                         // 455
						label: "trifft zu",                                                                                              // 456
						value: "trifftZu"                                                                                                // 457
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 459
						value: "trifftEherZu"                                                                                            // 460
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 462
						value: "teilsTeils"                                                                                              // 463
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 465
						value: "trifftEherNichtZu"                                                                                       // 466
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 468
						value: "trifftNichtZu"                                                                                           // 469
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionBehaviorText: {                                                                                              // 474
		type: String,                                                                                                        // 475
		max: 1000,                                                                                                           // 476
		label: 'Aus folgendem Grund (optional):',                                                                            // 477
		optional: true,                                                                                                      // 478
		autoform: {                                                                                                          // 479
			afFieldInput: {                                                                                                     // 480
				type: "textarea"                                                                                                   // 481
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionSituation: {                                                                                                 // 485
		type: String,                                                                                                        // 486
		max: 1000,                                                                                                           // 487
		label: 'In welcher Situation hast du beschlossen, das UI zu wechseln und warum? (Beispiel)',                         // 488
		optional: true,                                                                                                      // 489
		autoform: {                                                                                                          // 490
			afFieldInput: {                                                                                                     // 491
				type: "textarea"                                                                                                   // 492
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionUse: {                                                                                                       // 496
		type: String,                                                                                                        // 497
		label: 'Ich sehe generell einen klaren Vorteil in der Moeglichkeit die Benutzeroberflaeche kontextorientiert anzupassen und wuerde mir die Moeglichkeit auch fuer andere Apps wuenschen.',
		autoform: {                                                                                                          // 499
			type: "select-radio-inline",                                                                                        // 500
			options: function () {                                                                                              // 501
				function options() {                                                                                               // 501
					return [{                                                                                                         // 502
						label: "trifft zu",                                                                                              // 503
						value: "trifftZu"                                                                                                // 504
					}, {                                                                                                              //
						label: "trifft eher zu",                                                                                         // 506
						value: "trifftEherZu"                                                                                            // 507
					}, {                                                                                                              //
						label: "teils-teils",                                                                                            // 509
						value: "teilsTeils"                                                                                              // 510
					}, {                                                                                                              //
						label: "trifft eher nicht zu",                                                                                   // 512
						value: "trifftEherNichtZu"                                                                                       // 513
					}, {                                                                                                              //
						label: "trifft nicht zu",                                                                                        // 515
						value: "trifftNichtZu"                                                                                           // 516
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionUseText: {                                                                                                   // 521
		type: String,                                                                                                        // 522
		max: 1000,                                                                                                           // 523
		label: 'Aus folgendem Grund (optional):',                                                                            // 524
		optional: true,                                                                                                      // 525
		autoform: {                                                                                                          // 526
			afFieldInput: {                                                                                                     // 527
				type: "textarea"                                                                                                   // 528
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	prospects: {                                                                                                          // 532
		type: String,                                                                                                        // 533
		max: 1000,                                                                                                           // 534
		optional: true,                                                                                                      // 535
		label: 'Sonstige Anmerkungen',                                                                                       // 536
		autoform: {                                                                                                          // 537
			afFieldInput: {                                                                                                     // 538
				type: "textarea"                                                                                                   // 539
			}                                                                                                                   //
		}                                                                                                                    //
	}                                                                                                                     //
                                                                                                                       //
});                                                                                                                    //
                                                                                                                       //
Data.Detail.attachSchema(Data.Detail.Schema);                                                                          // 547
Data.Words.attachSchema(Data.Words.Schema);                                                                            // 548
Data.Survey.attachSchema(Data.Survey.Schema);                                                                          // 549
Data.Feedback.attachSchema(Data.Feedback.Schema);                                                                      // 550
Data.Status.attachSchema(Data.Status.Schema);                                                                          // 551
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

},"messages.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/collections/messages.js                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
SimpleSchema.messages({                                                                                                // 1
  required: "[label] wird benoetigt.",                                                                                 // 2
  minString: "[label] muss mindestens [min] Zeichen enthalten.",                                                       // 3
  maxString: "[label] darf nicht mehr als [max] Zeichen enthalten.",                                                   // 4
  minNumber: "[label] muss mindestens [min] sein.",                                                                    // 5
  maxNumber: "[label] darf nicht hoeher als [max] sein.",                                                              // 6
  minDate: "[label] must be on or after [min]",                                                                        // 7
  maxDate: "[label] cannot be after [max]",                                                                            // 8
  badDate: "[label] is not a valid date",                                                                              // 9
  minCount: "You must specify at least [minCount] values",                                                             // 10
  maxCount: "You cannot specify more than [maxCount] values",                                                          // 11
  noDecimal: "[label] muss eine gerade Zahl sein.",                                                                    // 12
  notAllowed: "[value] kein zulaessiger Wert.",                                                                        // 13
  expectedString: "[label] muss eine Zeichenkette sein.",                                                              // 14
  expectedNumber: "[label] muss eine Zahl sein.",                                                                      // 15
  expectedBoolean: "[label] muss ein Bool-Wert sein.",                                                                 // 16
  expectedArray: "[label] muss ein Array sein.",                                                                       // 17
  expectedObject: "[label] muss ein Object sein.",                                                                     // 18
  expectedConstructor: "[label] muss vom Typ [type] sein.",                                                            // 19
  regEx: [{ msg: "[label] failed regular expression validation" }, { exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address" }, { exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address" }, { exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain" }, { exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain" }, { exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address" }, { exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address" }, { exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address" }, { exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL" }, { exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID" }],
  keyNotInSchema: "[key] ist nicht im Schema erlaubt."                                                                 // 32
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"userExt.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/collections/userExt.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
UserExt = new Mongo.Collection('userExt', {});                                                                         // 1
                                                                                                                       //
UserExt.Schema = new SimpleSchema({                                                                                    // 3
	userId: {                                                                                                             // 4
		type: String,                                                                                                        // 5
		autoValue: function () {                                                                                             // 6
			function autoValue() {                                                                                              // 6
				return this.userId;                                                                                                // 7
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	userMail: {                                                                                                           // 10
		type: String,                                                                                                        // 11
		autoValue: function () {                                                                                             // 12
			function autoValue() {                                                                                              // 12
				return Meteor.user().emails[0].address;                                                                            // 13
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	surveySubmitted: {                                                                                                    // 16
		type: Boolean,                                                                                                       // 17
		defaultValue: false                                                                                                  // 18
	}                                                                                                                     //
	// TODO last visited URL - save on logout                                                                             //
});                                                                                                                    // 3
                                                                                                                       //
UserExt.attachSchema(UserExt.Schema);                                                                                  // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabulary.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/collections/vocabulary.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Vocabulary = new Mongo.Collection('vocabulary', {});                                                                   // 1
TermDay = new Mongo.Collection('termDay', {});                                                                         // 2
                                                                                                                       //
if (Meteor.isServer) {                                                                                                 // 4
	Vocabulary._ensureIndex({                                                                                             // 5
		term: 1,                                                                                                             // 6
		description: 1                                                                                                       // 7
	});                                                                                                                   //
}                                                                                                                      //
                                                                                                                       //
Vocabulary.allow({                                                                                                     // 11
	insert: function () {                                                                                                 // 12
		function insert() {                                                                                                  // 12
			return false;                                                                                                       //
		}                                                                                                                    //
                                                                                                                       //
		return insert;                                                                                                       //
	}(),                                                                                                                  //
	update: function () {                                                                                                 // 13
		function update() {                                                                                                  // 13
			return false;                                                                                                       //
		}                                                                                                                    //
                                                                                                                       //
		return update;                                                                                                       //
	}(),                                                                                                                  //
	remove: function () {                                                                                                 // 14
		function remove() {                                                                                                  // 14
			return false;                                                                                                       //
		}                                                                                                                    //
                                                                                                                       //
		return remove;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Vocabulary.deny({                                                                                                      // 17
	insert: function () {                                                                                                 // 18
		function insert() {                                                                                                  // 18
			return true;                                                                                                        //
		}                                                                                                                    //
                                                                                                                       //
		return insert;                                                                                                       //
	}(),                                                                                                                  //
	update: function () {                                                                                                 // 19
		function update() {                                                                                                  // 19
			return true;                                                                                                        //
		}                                                                                                                    //
                                                                                                                       //
		return update;                                                                                                       //
	}(),                                                                                                                  //
	remove: function () {                                                                                                 // 20
		function remove() {                                                                                                  // 20
			return true;                                                                                                        //
		}                                                                                                                    //
                                                                                                                       //
		return remove;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
var VocabularySchema = new SimpleSchema({                                                                              // 23
	term: {                                                                                                               // 24
		type: String,                                                                                                        // 25
		regEx: /^[a-zA-Z]*$/                                                                                                 // 26
	},                                                                                                                    //
	preposition: {                                                                                                        // 28
		type: String,                                                                                                        // 29
		allowedValues: ['der', 'die', 'das'],                                                                                // 30
		optional: true                                                                                                       // 31
	},                                                                                                                    //
	wordClass: {                                                                                                          // 33
		type: String,                                                                                                        // 34
		allowedValues: ['Nomen', 'Verb', 'Adjektiv']                                                                         // 35
	},                                                                                                                    //
	definition: {                                                                                                         // 37
		type: [String]                                                                                                       // 38
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
var TermDaySchema = new SimpleSchema({                                                                                 // 42
	userId: {                                                                                                             // 43
		type: String                                                                                                         // 44
	},                                                                                                                    //
	vocabularyId: {                                                                                                       // 46
		type: String                                                                                                         // 47
	},                                                                                                                    //
	timestamp: {                                                                                                          // 49
		type: Date,                                                                                                          // 50
		autoValue: function () {                                                                                             // 51
			function autoValue() {                                                                                              // 51
				return new Date();                                                                                                 // 52
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Vocabulary.attachSchema(VocabularySchema);                                                                             // 57
TermDay.attachSchema(TermDaySchema);                                                                                   // 58
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
		Vocabulary: {                                                                                                        // 5
			tableColumns: [{                                                                                                    // 6
				label: 'Wort',                                                                                                     // 7
				name: 'term'                                                                                                       // 8
			}, {                                                                                                                //
				label: 'Wortklasse',                                                                                               // 10
				name: 'wordClass'                                                                                                  // 11
			}]                                                                                                                  //
		}                                                                                                                    //
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
		// FlowRouter.redirect('/notFound');                                                                                 //
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
checkSurveySubmitted = function checkSurveySubmitted() {                                                               // 26
	var query = UserExt.findOne({ userId: Meteor.userId(), surveySubmitted: true });                                      // 27
	if (query) {                                                                                                          // 28
		FlowRouter.redirect('/');                                                                                            // 29
	}                                                                                                                     //
};                                                                                                                     //
                                                                                                                       //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                                                         // 33
                                                                                                                       //
// *** ROUTE GROUPS                                                                                                    //
                                                                                                                       //
var lowRoutes = FlowRouter.group({                                                                                     // 37
	name: "low",                                                                                                          // 38
	triggersEnter: [checkAttentionModeOn],                                                                                // 39
	triggersExit: []                                                                                                      // 40
});                                                                                                                    //
var highRoutes = FlowRouter.group({                                                                                    // 42
	name: "high",                                                                                                         // 43
	triggersEnter: [checkAttentionModeOff],                                                                               // 44
	triggersExit: []                                                                                                      // 45
});                                                                                                                    //
                                                                                                                       //
// *** ROUTES                                                                                                          //
                                                                                                                       //
highRoutes.route('/', {                                                                                                // 52
	name: "index",                                                                                                        // 53
	action: function () {                                                                                                 // 54
		function action(params, queryParams) {                                                                               // 54
			BlazeLayout.render('layout', {                                                                                      // 55
				bar: "bar",                                                                                                        // 56
				nav: "nav",                                                                                                        // 57
				main: "index",                                                                                                     // 58
				footer: "footer"                                                                                                   // 59
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
highRoutes.route('/faq', {                                                                                             // 63
	name: "faq",                                                                                                          // 64
	action: function () {                                                                                                 // 65
		function action(params, queryParams) {                                                                               // 65
			BlazeLayout.render('layout', {                                                                                      // 66
				bar: "bar",                                                                                                        // 67
				nav: "nav",                                                                                                        // 68
				main: "faq",                                                                                                       // 69
				footer: "footer"                                                                                                   // 70
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
highRoutes.route('/trainer', {                                                                                         // 75
	name: "trainer",                                                                                                      // 76
	action: function () {                                                                                                 // 77
		function action(params, queryParams) {                                                                               // 77
			BlazeLayout.render('layout', {                                                                                      // 78
				bar: "bar",                                                                                                        // 79
				nav: "nav",                                                                                                        // 80
				main: "trainer",                                                                                                   // 81
				footer: "footer"                                                                                                   // 82
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
highRoutes.route('/register/:id', {                                                                                    // 87
	name: "vokabelDetail",                                                                                                // 88
	action: function () {                                                                                                 // 89
		function action(params, queryParams) {                                                                               // 89
			BlazeLayout.render('layout', {                                                                                      // 90
				bar: "bar",                                                                                                        // 91
				nav: "nav",                                                                                                        // 92
				main: "vokabelDetail",                                                                                             // 93
				footer: "footer"                                                                                                   // 94
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
highRoutes.route('/register', {                                                                                        // 98
	name: "register",                                                                                                     // 99
	action: function () {                                                                                                 // 100
		function action(params, queryParams) {                                                                               // 100
			BlazeLayout.render('layout', {                                                                                      // 101
				bar: "bar",                                                                                                        // 102
				nav: "nav",                                                                                                        // 103
				main: "register",                                                                                                  // 104
				footer: "footer"                                                                                                   // 105
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
highRoutes.route('/verwaltung', {                                                                                      // 109
	name: "verwaltung",                                                                                                   // 110
	action: function () {                                                                                                 // 111
		function action(params, queryParams) {                                                                               // 111
			FlowRouter.redirect('/verwaltung/feedback');                                                                        // 112
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 114
});                                                                                                                    //
highRoutes.route('/verwaltung/statistik', {                                                                            // 116
	name: "statistik",                                                                                                    // 117
	action: function () {                                                                                                 // 118
		function action(params, queryParams) {                                                                               // 118
			FlowRouter.redirect('/verwaltung/statistik/total');                                                                 // 119
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 121
});                                                                                                                    //
highRoutes.route('/verwaltung/statistik/device', {                                                                     // 123
	name: "device",                                                                                                       // 124
	action: function () {                                                                                                 // 125
		function action(params, queryParams) {                                                                               // 125
			BlazeLayout.render('layout', {                                                                                      // 126
				bar: "bar",                                                                                                        // 127
				nav: "nav",                                                                                                        // 128
				navOverview: "navOverview",                                                                                        // 129
				navStatistics: "navStatistics",                                                                                    // 130
				main: "device",                                                                                                    // 131
				footer: "footer"                                                                                                   // 132
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 135
});                                                                                                                    //
highRoutes.route('/verwaltung/statistik/mode', {                                                                       // 137
	name: "mode",                                                                                                         // 138
	action: function () {                                                                                                 // 139
		function action(params, queryParams) {                                                                               // 139
			BlazeLayout.render('layout', {                                                                                      // 140
				bar: "bar",                                                                                                        // 141
				nav: "nav",                                                                                                        // 142
				navOverview: "navOverview",                                                                                        // 143
				navStatistics: "navStatistics",                                                                                    // 144
				main: "mode",                                                                                                      // 145
				footer: "footer"                                                                                                   // 146
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 149
});                                                                                                                    //
highRoutes.route('/verwaltung/statistik/status', {                                                                     // 151
	name: "status",                                                                                                       // 152
	action: function () {                                                                                                 // 153
		function action(params, queryParams) {                                                                               // 153
			BlazeLayout.render('layout', {                                                                                      // 154
				bar: "bar",                                                                                                        // 155
				nav: "nav",                                                                                                        // 156
				navOverview: "navOverview",                                                                                        // 157
				navStatistics: "navStatistics",                                                                                    // 158
				main: "status",                                                                                                    // 159
				footer: "footer"                                                                                                   // 160
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 163
});                                                                                                                    //
highRoutes.route('/verwaltung/statistik/total', {                                                                      // 165
	name: "total",                                                                                                        // 166
	action: function () {                                                                                                 // 167
		function action(params, queryParams) {                                                                               // 167
			BlazeLayout.render('layout', {                                                                                      // 168
				bar: "bar",                                                                                                        // 169
				nav: "nav",                                                                                                        // 170
				navOverview: "navOverview",                                                                                        // 171
				navStatistics: "navStatistics",                                                                                    // 172
				main: "total",                                                                                                     // 173
				footer: "footer"                                                                                                   // 174
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 177
});                                                                                                                    //
                                                                                                                       //
highRoutes.route('/verwaltung/feedback', {                                                                             // 180
	name: "feedback",                                                                                                     // 181
	action: function () {                                                                                                 // 182
		function action(params, queryParams) {                                                                               // 182
			BlazeLayout.render('layout', {                                                                                      // 183
				bar: "bar",                                                                                                        // 184
				nav: "nav",                                                                                                        // 185
				navOverview: "navOverview",                                                                                        // 186
				main: "feedback",                                                                                                  // 187
				footer: "footer"                                                                                                   // 188
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 191
});                                                                                                                    //
highRoutes.route('/fragebogen', {                                                                                      // 193
	name: "fragebogen",                                                                                                   // 194
	triggersEnter: [checkSurveySubmitted],                                                                                // 195
	action: function () {                                                                                                 // 196
		function action(params, queryParams) {                                                                               // 196
			BlazeLayout.render('layout', {                                                                                      // 197
				bar: "bar",                                                                                                        // 198
				nav: "nav",                                                                                                        // 199
				main: "fragebogen",                                                                                                // 200
				footer: "footer"                                                                                                   // 201
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: []                                                                                                     // 204
});                                                                                                                    //
                                                                                                                       //
lowRoutes.route('/low', {                                                                                              // 207
	name: "low",                                                                                                          // 208
	action: function () {                                                                                                 // 209
		function action(params, queryParams) {                                                                               // 209
			BlazeLayout.render('layout', {                                                                                      // 210
				bar: "bar",                                                                                                        // 211
				main: "low"                                                                                                        // 212
				// ,                                                                                                               //
				// navSource: "navLow"                                                                                             //
			});                                                                                                                 // 210
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: []                                                                                                     // 217
});                                                                                                                    //
                                                                                                                       //
FlowRouter.notFound = {                                                                                                // 220
	name: "notFound",                                                                                                     // 221
	action: function () {                                                                                                 // 222
		function action(params, queryParams) {                                                                               // 222
			BlazeLayout.render('layout', {                                                                                      // 223
				footer: "footer",                                                                                                  // 224
				main: "pageNotFound",                                                                                              // 225
				footer: "footer"                                                                                                   // 226
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
//Routes                                                                                                               //
AccountsTemplates.configureRoute('changePwd');                                                                         // 233
// AccountsTemplates.configureRoute('forgotPwd');                                                                      //
AccountsTemplates.configureRoute('resetPwd');                                                                          // 235
AccountsTemplates.configureRoute('signIn');                                                                            // 236
AccountsTemplates.configureRoute('signUp');                                                                            // 237
// AccountsTemplates.configureRoute('verifyEmail');                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/views/high/verwaltung/charts/device/template.device.js");
require("./client/views/high/verwaltung/charts/mode/template.chart_bar_modes.js");
require("./client/views/high/verwaltung/charts/mode/template.mode.js");
require("./client/views/high/verwaltung/charts/status/template.chart_line_online_user.js");
require("./client/views/high/verwaltung/charts/status/template.status.js");
require("./client/views/high/verwaltung/charts/total/template.chart_bar_clicks_per_day.js");
require("./client/views/high/verwaltung/charts/total/template.chart_pie_attention.js");
require("./client/views/high/verwaltung/charts/total/template.total.js");
require("./client/views/high/index/components/template.faqWidget.js");
require("./client/views/high/index/components/template.feedback.js");
require("./client/views/high/index/components/template.term_day.js");
require("./client/views/high/index/components/template.wordsAll.js");
require("./client/views/high/index/components/template.wordsUser.js");
require("./client/views/high/trainer/modes/template.modus_definition.js");
require("./client/views/high/trainer/modes/template.modus_eingabe.js");
require("./client/views/high/trainer/modes/template.modus_lesen.js");
require("./client/views/high/trainer/modes/template.modus_wort.js");
require("./client/views/high/verwaltung/charts/template.chart_multibar_attention.js");
require("./client/views/high/faq/template.faq.js");
require("./client/views/high/fragebogen/template.fragebogen.js");
require("./client/views/high/index/template.index.js");
require("./client/views/high/register/template.letter_collapse.js");
require("./client/views/high/register/template.letter_list.js");
require("./client/views/high/register/template.register.js");
require("./client/views/high/register/template.register_entry.js");
require("./client/views/high/register/template.vokabel_detail.js");
require("./client/views/high/trainer/template.backward.js");
require("./client/views/high/trainer/template.forward.js");
require("./client/views/high/trainer/template.trainer.js");
require("./client/views/high/verwaltung/template.feedback.js");
require("./client/views/low/modes/template.modus_definition.js");
require("./client/views/low/modes/template.modus_lesen.js");
require("./client/views/low/modes/template.modus_wort.js");
require("./client/views/low/template.backward.js");
require("./client/views/low/template.forward.js");
require("./client/views/low/template.low.js");
require("./client/layout/template.bar.js");
require("./client/layout/template.footer.js");
require("./client/layout/template.head.js");
require("./client/layout/template.layout.js");
require("./client/layout/template.nav.js");
require("./client/layout/template.navStatistics.js");
require("./client/layout/template.nav_low.js");
require("./client/layout/template.nav_mode.js");
require("./client/layout/template.nav_mode_trainer.js");
require("./client/layout/template.nav_overview.js");
require("./client/layout/template.nav_source.js");
require("./client/layout/template.nav_source_trainer.js");
require("./client/template.loading.js");
require("./client/template.page_not_found.js");
require("./client/views/high/verwaltung/charts/mode/chart_bar_modes.js");
require("./client/views/high/verwaltung/charts/mode/mode.js");
require("./client/views/high/verwaltung/charts/status/chart_line_online_user.js");
require("./client/views/high/verwaltung/charts/status/status.js");
require("./client/views/high/verwaltung/charts/total/chart_bar_clicks_per_day.js");
require("./client/views/high/verwaltung/charts/total/chart_pie_attention.js");
require("./client/views/high/verwaltung/charts/total/total.js");
require("./client/views/high/index/components/feedback.js");
require("./client/views/high/index/components/term_day.js");
require("./client/views/high/index/components/wordsAll.js");
require("./client/views/high/index/components/wordsUser.js");
require("./client/views/high/verwaltung/charts/chart_multibar_attention.js");
require("./client/views/high/fragebogen/fragebogen.js");
require("./client/views/high/register/register.js");
require("./client/views/high/register/vokabel_detail.js");
require("./client/views/high/trainer/trainer.js");
require("./client/views/high/verwaltung/feedback.js");
require("./client/views/low/low.js");
require("./client/layout/_GLOBAL_HELPERS.js");
require("./client/layout/__SESSIONS.js");
require("./client/layout/bar.js");
require("./client/layout/layout.js");
require("./client/layout/nav_low.js");
require("./client/layout/nav_mode.js");
require("./client/layout/nav_mode_trainer.js");
require("./client/layout/nav_source.js");
require("./client/layout/nav_source_trainer.js");
require("./common/aux/aux.js");
require("./common/aux/log.js");
require("./common/aux/nvd3_extra.js");
require("./common/aux/validation.js");
require("./common/collections/data.js");
require("./common/collections/favourites.js");
require("./common/collections/messages.js");
require("./common/collections/userExt.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/admin.js");
require("./common/config/at_config.js");
require("./client/init.js");
require("./common/routes.js");