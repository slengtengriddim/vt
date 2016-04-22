var require = meteorInstall({"client":{"views":{"high":{"uebersicht":{"charts":{"device":{"device.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/device/template.device.js                                                       //
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

}},"mode":{"chart_bar_modes.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/mode/template.chart_bar_modes.js                                                //
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

},"mode.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/mode/template.mode.js                                                           //
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
// client/views/high/uebersicht/charts/mode/chart_bar_modes.js                                                         //
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
// client/views/high/uebersicht/charts/mode/mode.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.mode.onCreated(function () {                                                                                  // 1
	var template = Template.instance();                                                                                   // 2
	template.subscribe('dataDetail');                                                                                     // 3
	template.subscribe('user');                                                                                           // 4
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"status":{"chart_line_online_user.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/status/template.chart_line_online_user.js                                       //
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

},"status.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/status/template.status.js                                                       //
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
// client/views/high/uebersicht/charts/status/chart_line_online_user.js                                                //
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
// client/views/high/uebersicht/charts/status/status.js                                                                //
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

}},"total":{"chart_bar_clicks_per_day.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/total/template.chart_bar_clicks_per_day.js                                      //
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

},"chart_pie_attention.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/total/template.chart_pie_attention.js                                           //
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

},"total.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/total/template.total.js                                                         //
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
// client/views/high/uebersicht/charts/total/chart_bar_clicks_per_day.js                                               //
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
// client/views/high/uebersicht/charts/total/chart_pie_attention.js                                                    //
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
// client/views/high/uebersicht/charts/total/total.js                                                                  //
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

}},"chart_multibar_attention.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/charts/template.chart_multibar_attention.js                                            //
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
// client/views/high/uebersicht/charts/chart_multibar_attention.js                                                     //
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

}},"feedback.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/uebersicht/template.feedback.js                                                                   //
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
// client/views/high/uebersicht/feedback.js                                                                            //
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

}},"index":{"charts":{"wordsAll.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/charts/template.wordsAll.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("wordsAll");                                                                                      // 2
Template["wordsAll"] = new Template("Template.wordsAll", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Insgesamt</h4>\n	"), HTML.UL({                                                                // 5
    "class": "list-group"                                                                                              // 6
  }, "\n		", Blaze.Each(function() {                                                                                   // 7
    return Spacebars.call(view.lookup("top5"));                                                                        // 8
  }, function() {                                                                                                      // 9
    return [ "\n			", HTML.LI({                                                                                        // 10
      "class": "list-group-item"                                                                                       // 11
    }, Blaze.View("lookup:@index", function() {                                                                        // 12
      return Spacebars.mustache(view.lookup("@index"));                                                                // 13
    }), ": ", Blaze.View("lookup:term", function() {                                                                   // 14
      return Spacebars.mustache(view.lookup("term"));                                                                  // 15
    }), " (", Blaze.View("lookup:count", function() {                                                                  // 16
      return Spacebars.mustache(view.lookup("count"));                                                                 // 17
    }), ")"), " \n		" ];                                                                                               // 18
  }), "\n	") ];                                                                                                        // 19
}));                                                                                                                   // 20
                                                                                                                       // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wordsUser.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/charts/template.wordsUser.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("wordsUser");                                                                                     // 2
Template["wordsUser"] = new Template("Template.wordsUser", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<h4>Du</h4>\n	"), HTML.UL({                                                                       // 5
    "class": "list-group"                                                                                              // 6
  }, "\n		", Blaze.Each(function() {                                                                                   // 7
    return Spacebars.call(view.lookup("top5"));                                                                        // 8
  }, function() {                                                                                                      // 9
    return [ "\n			", HTML.LI({                                                                                        // 10
      "class": "list-group-item"                                                                                       // 11
    }, Blaze.View("lookup:@index", function() {                                                                        // 12
      return Spacebars.mustache(view.lookup("@index"));                                                                // 13
    }), ": ", Blaze.View("lookup:vocabularyName", function() {                                                         // 14
      return Spacebars.mustache(view.lookup("vocabularyName"));                                                        // 15
    }), " (", Blaze.View("lookup:viewed", function() {                                                                 // 16
      return Spacebars.mustache(view.lookup("viewed"));                                                                // 17
    }), ")"), "\n		" ];                                                                                                // 18
  }), "\n	") ];                                                                                                        // 19
}));                                                                                                                   // 20
                                                                                                                       // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wordsAll.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/charts/wordsAll.js                                                                          //
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
			var data = Data.Words.find({}).fetch();                                                                             // 9
			var byVocabularyId = R.groupBy(function (entry) {                                                                   // 10
				return entry.vocabularyId;                                                                                         // 11
			});                                                                                                                 //
                                                                                                                       //
			var groupedByVocabularyId = byVocabularyId(data);                                                                   // 14
			for (var k in meteorBabelHelpers.sanitizeForInObject(groupedByVocabularyId)) {                                      // 15
				if (groupedByVocabularyId.hasOwnProperty(k)) {                                                                     // 16
					result.push({                                                                                                     // 17
						term: groupedByVocabularyId[k][0].vocabularyName,                                                                // 18
						count: R.sum(R.pluck('viewed')(groupedByVocabularyId[k]))                                                        // 19
					});                                                                                                               //
				}                                                                                                                  //
			};                                                                                                                  //
			var sortByViewed = R.sortBy(R.prop('count'));                                                                       // 23
			result = R.take(5, R.reverse(sortByViewed(result)));                                                                // 24
			return result;                                                                                                      // 25
		}                                                                                                                    //
                                                                                                                       //
		return top5;                                                                                                         //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wordsUser.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/charts/wordsUser.js                                                                         //
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
					viewed: -1                                                                                                        // 12
				}                                                                                                                  //
			}).fetch();                                                                                                         //
			return data;                                                                                                        // 15
		}                                                                                                                    //
                                                                                                                       //
		return top5;                                                                                                         //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"feedback.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/template.feedback.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("feedbackClient");                                                                                // 2
Template["feedbackClient"] = new Template("Template.feedbackClient", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return Blaze._TemplateWith(function() {                                                                              // 5
    return {                                                                                                           // 6
      collection: Spacebars.call("Data.Feedback"),                                                                     // 7
      id: Spacebars.call("insertFeedbackForm"),                                                                        // 8
      type: Spacebars.call("insert")                                                                                   // 9
    };                                                                                                                 // 10
  }, function() {                                                                                                      // 11
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 12
      return [ "\n  ", HTML.FIELDSET("\n    ", HTML.LEGEND("Feedback:"), "\n    ", Blaze._TemplateWith(function() {    // 13
        return {                                                                                                       // 14
          name: Spacebars.call("message")                                                                              // 15
        };                                                                                                             // 16
      }, function() {                                                                                                  // 17
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 18
      }), "\n    ", HTML.DIV("\n      ", HTML.BUTTON({                                                                 // 19
        type: "submit",                                                                                                // 20
        "class": "btn btn-primary"                                                                                     // 21
      }, "Senden"), "\n      ", HTML.BUTTON({                                                                          // 22
        type: "reset",                                                                                                 // 23
        "class": "btn btn-default"                                                                                     // 24
      }, "Zuruecksetzen"), "\n    "), "\n  "), "\n  " ];                                                               // 25
    });                                                                                                                // 26
  });                                                                                                                  // 27
}));                                                                                                                   // 28
                                                                                                                       // 29
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hello.html":function(){

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
  }, HTML.Raw("\n    <br>\n    "), Blaze.Unless(function() {                                                           // 7
    return Spacebars.call(view.lookup("surveySubmitted"));                                                             // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", HTML.BR(), "\n    ", HTML.P({                                                                   // 10
      "class": "alert alert-info"                                                                                      // 11
    }, "Bitte fuelle den Fragebogen aus. Du hast bis zum 03. Juli 2016 dafuer Zeit. Nur mit ausgefuellten Fragebogen ist deine Teilnahme gueltig.\n      ", HTML.A({
      "class": "btn btn-default btn-question",                                                                         // 13
      href: function() {                                                                                               // 14
        return Spacebars.mustache(view.lookup("pathFor"), "fragebogen");                                               // 15
      }                                                                                                                // 16
    }, "Fragebogen"), "\n    "), "\n    " ];                                                                           // 17
  }), HTML.Raw("\n    <br>\n\n    <!-- {{#each dataDetail1}} <br> {{mode}} {{/each}} -->\n\n    <!-- {{> chartFavLine }} -->\n\n\n\n\n<h3>TOP 5 - Nachgeschlagene Begriffe</h3>\n\n"), HTML.DIV({
    "class": "row"                                                                                                     // 19
  }, "\n  ", HTML.DIV({                                                                                                // 20
    "class": "col-sm-6"                                                                                                // 21
  }, "\n    ", Spacebars.include(view.lookupTemplate("wordsAll")), "\n  "), "\n  ", HTML.DIV({                         // 22
    "class": "col-sm-6"                                                                                                // 23
  }, "\n    ", Spacebars.include(view.lookupTemplate("wordsUser")), "\n  "), "\n"), HTML.Raw("\n\n    <h4>TODO: </h4>\n    <ul>\n      <li>Vocabulary of the day</li>\n    </ul>\n\n    "), Spacebars.include(view.lookupTemplate("feedbackClient")), HTML.Raw("\n\n    <p>\n      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,\n      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.\n    </p>\n\n\n  "));
}));                                                                                                                   // 25
                                                                                                                       // 26
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"feedback.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/high/index/feedback.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var hooksFeedbackForm = {                                                                                              // 1
	onSuccess: function () {                                                                                              // 2
		function onSuccess(formType, result) {                                                                               // 2
			var msg = 'Feedback erfolgreich gesendet.';                                                                         // 3
			toastr.success(msg);                                                                                                // 4
			console.log(Meteor.userId());                                                                                       // 5
		}                                                                                                                    //
                                                                                                                       //
		return onSuccess;                                                                                                    //
	}(),                                                                                                                  //
	onError: function () {                                                                                                // 7
		function onError(formType, error) {                                                                                  // 7
			var msg = 'Feedback konnte nicht gesendet werden.';                                                                 // 8
			toastr.error(msg);                                                                                                  // 9
		}                                                                                                                    //
                                                                                                                       //
		return onError;                                                                                                      //
	}()                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
AutoForm.addHooks(['insertFeedbackForm'], hooksFeedbackForm);                                                          // 13
                                                                                                                       //
SimpleSchema.debug = true;                                                                                             // 15
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

}},"fragebogen":{"fragebogen.html":function(){

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
    "class": "container"                                                                                               // 6
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
      }), "\n\n		", HTML.LEGEND("Nutzung"), "\n		Von welchen Endgeraeten aus hast du die App genutzt?\n		", Blaze._TemplateWith(function() {
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
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 93
        return {                                                                                                       // 94
          name: Spacebars.call("attentionBenefit")                                                                     // 95
        };                                                                                                             // 96
      }, function() {                                                                                                  // 97
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 98
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 99
        return {                                                                                                       // 100
          name: Spacebars.call("attentionBehavior")                                                                    // 101
        };                                                                                                             // 102
      }, function() {                                                                                                  // 103
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 104
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 105
        return {                                                                                                       // 106
          name: Spacebars.call("attentionBehaviorText")                                                                // 107
        };                                                                                                             // 108
      }, function() {                                                                                                  // 109
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 110
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 111
        return {                                                                                                       // 112
          name: Spacebars.call("attentionSituation")                                                                   // 113
        };                                                                                                             // 114
      }, function() {                                                                                                  // 115
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 116
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 117
        return {                                                                                                       // 118
          name: Spacebars.call("attentionUse")                                                                         // 119
        };                                                                                                             // 120
      }, function() {                                                                                                  // 121
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 122
      }), "\n		", Blaze._TemplateWith(function() {                                                                     // 123
        return {                                                                                                       // 124
          name: Spacebars.call("attentionUseText")                                                                     // 125
        };                                                                                                             // 126
      }, function() {                                                                                                  // 127
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 128
      }), "\n		", HTML.HR(), "\n		", Blaze._TemplateWith(function() {                                                  // 129
        return {                                                                                                       // 130
          name: Spacebars.call("prospects")                                                                            // 131
        };                                                                                                             // 132
      }, function() {                                                                                                  // 133
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 134
      }), "\n	"), "\n\n		", HTML.DIV("\n			", HTML.BUTTON({                                                            // 135
        type: "submit",                                                                                                // 136
        "class": "btn btn-primary"                                                                                     // 137
      }, "Abschicken"), "\n		"), "\n		" ];                                                                             // 138
    });                                                                                                                // 139
  }), "\n	");                                                                                                          // 140
}));                                                                                                                   // 141
                                                                                                                       // 142
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

}},"trainer":{"trainer.html":function(){

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
      })), "\n						"), "\n						", HTML.HR(), "\n						", HTML.H3("Beispiel:"), "\n						", HTML.OL("\n							", HTML.LI(HTML.H4("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed\n								", Blaze.Unless(function() {
        return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                          // 98
      }, function() {                                                                                                  // 99
        return [ "\n									", HTML.I({                                                                               // 100
          "class": "fa fa-question "                                                                                   // 101
        }), "\n								" ];                                                                                            // 102
      }, function() {                                                                                                  // 103
        return [ "\n									", HTML.B(Blaze.View("lookup:term", function() {                                          // 104
          return Spacebars.mustache(view.lookup("term"));                                                              // 105
        })), "\n								" ];                                                                                           // 106
      }), "\n								diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."), " "), "\n							", HTML.LI(HTML.H4("Lorem ipsum dolor sit amet, consetetur ", Blaze.Unless(function() {
        return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                          // 108
      }, function() {                                                                                                  // 109
        return [ "\n								", HTML.I({                                                                                // 110
          "class": "fa fa-question "                                                                                   // 111
        }), "\n							" ];                                                                                             // 112
      }, function() {                                                                                                  // 113
        return [ "\n								", HTML.B(Blaze.View("lookup:term", function() {                                           // 114
          return Spacebars.mustache(view.lookup("term"));                                                              // 115
        })), "\n							" ];                                                                                            // 116
      }), "sadipscing elitr."), " "), "\n						"), "\n					"), "\n					"), "\n\n					" ];                              // 117
    }), "\n				" ];                                                                                                    // 118
  }, function() {                                                                                                      // 119
    return [ "\n					", Spacebars.include(view.lookupTemplate("loading")), "\n				" ];                                 // 120
  }), "\n			"), "\n\n			", Spacebars.include(view.lookupTemplate("forward")), "\n\n		"), "\n	"), HTML.Raw("\n\n	<br>") ];
}));                                                                                                                   // 122
                                                                                                                       // 123
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
                                                                                                                       //
						setTimeout(function () {                                                                                         // 57
							Session.set(REVEALED, false);                                                                                   // 58
							Session.set(TERM_RIGHT, false);                                                                                 // 59
							event.target.value = "";                                                                                        // 60
                                                                                                                       //
							var val = 0;                                                                                                    // 62
							if (Session.get(RANDOM_FAV)) {                                                                                  // 63
								val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 64
								Session.set(COUNT_VIEWED, val);                                                                                // 65
							} else {                                                                                                        //
								val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                           // 67
								Session.set(COUNT_VIEWED, val);                                                                                // 68
							}                                                                                                               //
						}, 1000);                                                                                                        //
					} else {                                                                                                          //
						Session.set(TERM_WRONG, true);                                                                                   // 73
                                                                                                                       //
						var termArray = R.split('', term);                                                                               // 75
						var f = function () {                                                                                            // 76
							function f(x, y) {                                                                                              // 76
								var space = "_";                                                                                               // 77
								if (x === y) {                                                                                                 // 78
									return x;                                                                                                     // 79
								} else {                                                                                                       //
									return space;                                                                                                 // 81
								}                                                                                                              //
							}                                                                                                               //
                                                                                                                       //
							return f;                                                                                                       //
						}();                                                                                                             //
						var cheese = R.zipWith(f, term, value);                                                                          // 84
						while (cheese.length < term.length) {                                                                            // 85
							cheese = R.append('_', cheese);                                                                                 // 86
						}                                                                                                                //
                                                                                                                       //
						var countMatch = term.length - R.filter(R.equals('_'), cheese).length;                                           // 89
						Session.set(COUNT_LETTERS_MATCH, countMatch);                                                                    // 90
                                                                                                                       //
						cheese = R.join(' ', cheese);                                                                                    // 92
						Session.set(TERM_CACHE, cheese);                                                                                 // 93
					}                                                                                                                 //
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			if (value === '') {                                                                                                 // 99
				template.isAlphabetic.set(true);                                                                                   // 100
				template.isLength64.set(true);                                                                                     // 101
                                                                                                                       //
				var _cheese = '';                                                                                                  // 103
				while (_cheese.length < this.term.length) {                                                                        // 104
					_cheese = R.append('_', _cheese);                                                                                 // 105
				}                                                                                                                  //
				_cheese = R.join(' ', _cheese);                                                                                    // 107
				Session.set(TERM_CACHE, _cheese);                                                                                  // 108
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return keyupNameTerm;                                                                                                //
	}()                                                                                                                   //
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
    })), "\n			"), "\n		"), "\n		", HTML.DIV({                                                                         // 38
      "class": "text-center"                                                                                           // 39
    }, "\n			", HTML.DIV({                                                                                             // 40
      "class": "btn-example",                                                                                          // 41
      "data-toggle": "collapse",                                                                                       // 42
      "data-target": "#example"                                                                                        // 43
    }, "\n				", Blaze.Unless(function() {                                                                             // 44
      return Spacebars.dataMustache(view.lookup("getSession"), "example");                                             // 45
    }, function() {                                                                                                    // 46
      return [ "\n					", HTML.I({                                                                                     // 47
        "class": "fa fa-plus-square-o fa-4x"                                                                           // 48
      }), "\n				" ];                                                                                                  // 49
    }, function() {                                                                                                    // 50
      return [ "\n					", HTML.I({                                                                                     // 51
        "class": "fa fa-minus-square-o fa-4x"                                                                          // 52
      }), "\n				" ];                                                                                                  // 53
    }), "\n			"), "\n		"), "\n		", HTML.DIV({                                                                          // 54
      id: "example",                                                                                                   // 55
      "class": "collapse"                                                                                              // 56
    }, "\n			", HTML.OL("\n				", HTML.LI("Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "), "\n				", HTML.LI("Lorem ipsum dolor sit amet, consetetur sadipscing elitr. "), "\n			"), "\n		"), "\n		" ];
  }), "\n	");                                                                                                          // 58
}));                                                                                                                   // 59
                                                                                                                       // 60
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
  })), "\n			"), "\n		"), "\n		", HTML.DIV({                                                                           // 39
    "class": "text-center"                                                                                             // 40
  }, "\n			", HTML.DIV({                                                                                               // 41
    "class": "btn-example",                                                                                            // 42
    "data-toggle": "collapse",                                                                                         // 43
    "data-target": "#example"                                                                                          // 44
  }, "\n				", Blaze.Unless(function() {                                                                               // 45
    return Spacebars.dataMustache(view.lookup("getSession"), "example");                                               // 46
  }, function() {                                                                                                      // 47
    return [ "\n					", HTML.I({                                                                                       // 48
      "class": "fa fa-plus-square-o fa-4x"                                                                             // 49
    }), "\n				" ];                                                                                                    // 50
  }, function() {                                                                                                      // 51
    return [ "\n					", HTML.I({                                                                                       // 52
      "class": "fa fa-minus-square-o fa-4x"                                                                            // 53
    }), "\n				" ];                                                                                                    // 54
  }), "\n			"), "\n		"), HTML.Raw('\n		<div id="example" class="collapse">\n			<ol>\n				<li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </li>\n				<li>Lorem ipsum dolor sit amet, consetetur sadipscing elitr. </li>\n			</ol>\n		</div>\n	'));
}));                                                                                                                   // 56
                                                                                                                       // 57
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
  })), "\n		"), "\n	"), "\n	", HTML.DIV({                                                                              // 37
    "class": "text-center"                                                                                             // 38
  }, "\n		", HTML.DIV({                                                                                                // 39
    "class": "btn-example",                                                                                            // 40
    "data-toggle": "collapse",                                                                                         // 41
    "data-target": "#example"                                                                                          // 42
  }, "\n			", Blaze.Unless(function() {                                                                                // 43
    return Spacebars.dataMustache(view.lookup("getSession"), "example");                                               // 44
  }, function() {                                                                                                      // 45
    return [ "\n				", HTML.I({                                                                                        // 46
      "class": "fa fa-plus-square-o fa-4x"                                                                             // 47
    }), "\n			" ];                                                                                                     // 48
  }, function() {                                                                                                      // 49
    return [ "\n				", HTML.I({                                                                                        // 50
      "class": "fa fa-minus-square-o fa-4x"                                                                            // 51
    }), "\n			" ];                                                                                                     // 52
  }), "\n		"), "\n	"), HTML.Raw('\n	<div id="example" class="collapse">\n		<h3>Beispiel:</h3>\n		<ol>\n			<li><h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</h4> </li>\n			<li><h4>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</h4> </li>\n		</ol>\n	</div>\n	'));
}));                                                                                                                   // 54
                                                                                                                       // 55
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
  }, "\n\n		", HTML.Raw("<br>"), "\n		", HTML.Raw("<br>"), "\n		", HTML.DIV({                                          // 7
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
    }), "\n\n				" ];                                                                                                  // 30
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
  }), "\n        "), "\n      "), "\n    "), "\n  "), "\n");                                                           // 43
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
    return [ " ", Blaze.View("lookup:currentUserMail", function() {                                                    // 12
      return Spacebars.mustache(view.lookup("currentUserMail"));                                                       // 13
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
        regex: "trainer"                                                                                               // 34
      }));                                                                                                             // 35
    }                                                                                                                  // 36
  }, HTML.A({                                                                                                          // 37
    href: function() {                                                                                                 // 38
      return Spacebars.mustache(view.lookup("pathFor"), "trainer");                                                    // 39
    }                                                                                                                  // 40
  }, "Trainer")), "\n        ", HTML.LI({                                                                              // 41
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
  }, "Register")), "\n        ", Blaze.Unless(function() {                                                             // 52
    return Spacebars.call(view.lookup("surveySubmitted"));                                                             // 53
  }, function() {                                                                                                      // 54
    return [ "\n        ", HTML.LI({                                                                                   // 55
      role: "presentation",                                                                                            // 56
      "class": function() {                                                                                            // 57
        return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                         // 58
          regex: "fragebogen"                                                                                          // 59
        }));                                                                                                           // 60
      }                                                                                                                // 61
    }, HTML.A({                                                                                                        // 62
      href: function() {                                                                                               // 63
        return Spacebars.mustache(view.lookup("pathFor"), "fragebogen");                                               // 64
      }                                                                                                                // 65
    }, "Fragebogen")), "\n        " ];                                                                                 // 66
  }), "\n        ", Blaze.If(function() {                                                                              // 67
    return Spacebars.dataMustache(view.lookup("isInRole"), "admin");                                                   // 68
  }, function() {                                                                                                      // 69
    return [ "\n        ", HTML.LI({                                                                                   // 70
      role: "presentation",                                                                                            // 71
      "class": function() {                                                                                            // 72
        return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                         // 73
          regex: "uebersicht"                                                                                          // 74
        }));                                                                                                           // 75
      }                                                                                                                // 76
    }, HTML.A({                                                                                                        // 77
      href: function() {                                                                                               // 78
        return Spacebars.mustache(view.lookup("pathFor"), "uebersicht");                                               // 79
      }                                                                                                                // 80
    }, "Uebersicht")), "\n        " ];                                                                                 // 81
  }), "\n      "), "\n    "), "\n  ");                                                                                 // 82
}));                                                                                                                   // 83
                                                                                                                       // 84
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"navStatistics.html":function(){

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

},"nav_low.html":function(){

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
  return [ HTML.DIV({                                                                                                  // 5
    "class": "text-center"                                                                                             // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "btn-low",                                                                                                // 8
    "data-toggle": "collapse",                                                                                         // 9
    "data-target": "#navLow"                                                                                           // 10
  }, "\n			", Blaze.Unless(function() {                                                                                // 11
    return Spacebars.dataMustache(view.lookup("getSession"), "navLow");                                                // 12
  }, function() {                                                                                                      // 13
    return [ "\n				", HTML.I({                                                                                        // 14
      "class": "fa fa-bars fa-4x"                                                                                      // 15
    }), "\n			" ];                                                                                                     // 16
  }, function() {                                                                                                      // 17
    return [ "\n				", HTML.I({                                                                                        // 18
      "class": "fa fa-close fa-4x"                                                                                     // 19
    }), "\n			" ];                                                                                                     // 20
  }), "\n		"), "\n	"), "\n	", HTML.DIV({                                                                               // 21
    id: "navLow",                                                                                                      // 22
    "class": "collapse"                                                                                                // 23
  }, "\n		", Spacebars.include(view.lookupTemplate("navMode")), "\n		", Spacebars.include(view.lookupTemplate("navSource")), "\n	") ];
}));                                                                                                                   // 25
                                                                                                                       // 26
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

},"nav_mode_trainer.html":function(){

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
  return HTML.Raw('<br>\n	<br>\n	<div class="row text-center">\n		<div class="col-sm-12">\n			<div class="btn-group btn-group-lg" role="group">\n				<button type="button" class="btn btn-default btn-lg btn-lesen">Lesen</button>\n				<button type="button" class="btn btn-default btn-lg btn-wort">Wort</button>\n				<button type="button" class="btn btn-default btn-lg btn-definition">Definition</button>\n			</div>\n			<div class="btn-group btn-group-lg" role="group">\n				<button type="button" class="btn btn-default btn-lg btn-eingabe">Eingabe</button>\n			</div>\n		</div>\n		<br>\n		<br>\n		<h3><i class="fa fa-level-up fa-flip-horizontal"></i> Modus <i class="fa fa-level-up"></i></h3>\n	</div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_overview.html":function(){

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

},"nav_source_trainer.html":function(){

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
  return HTML.Raw('<br>\n	<div class="row text-center">\n		<h3><i class="fa fa-level-up fa-rotate-180"></i> Quelle <i class="fa fa-level-down"></i></h3>\n		<div class="col-sm-12">\n			<div class="btn-group btn-group-lg" role="group">\n				<button type="button" class="btn btn-default btn-lg btn-fav">Favouriten</button>\n				<button type="button" class="btn btn-default btn-lg btn-not-fav">Nicht-Favouriten</button>\n			</div>\n		</div>\n	</div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
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
NAV_MODES = 'navModes';                                                                                                // 54
Session.setDefault(NAV_MODES, [NAV_MODE_READ, NAV_MODE_TERM, NAV_MODE_DEF]);                                           // 55
                                                                                                                       //
NAV_MODE_COUNT = 'navModeCount';                                                                                       // 57
Session.setDefault(NAV_MODE_COUNT, 0);                                                                                 // 58
                                                                                                                       //
NAV_LOW = 'navLow';                                                                                                    // 60
Session.setDefault(NAV_LOW, false);                                                                                    // 61
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
      // log                                                                                                           //
      var deviceType = Darwin.device.type;                                                                             // 2
      var devicePlatform = Darwin.device.platform;                                                                     // 14
      var clickArea = 'bar';                                                                                           // 15
      var mode = 'null';                                                                                               // 16
      var attention = Session.get(ATTENTION_MODE);                                                                     // 17
                                                                                                                       //
      Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                               // 19
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
				}                                                                                                                  //
			}                                                                                                                   //
			// log                                                                                                              //
			var deviceType = Darwin.device.type;                                                                                // 12
			var devicePlatform = Darwin.device.platform;                                                                        // 28
			var clickArea = 'browse';                                                                                           // 29
			var mode = void 0;                                                                                                  // 30
			var attention = Session.get(ATTENTION_MODE);                                                                        // 31
			if (Session.get(ATTENTION_MODE)) {                                                                                  // 32
				mode = Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                        // 33
			} else {                                                                                                            //
				if (FlowRouter.current().route.name === "eingabe") {                                                               // 35
					mode = 'eingabe';                                                                                                 // 36
				} else {                                                                                                           //
					mode = 'null';                                                                                                    // 38
				}                                                                                                                  //
			}                                                                                                                   //
			Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                                  // 41
			Meteor.call('dataWords', self);                                                                                     // 42
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnForwardClickBtnBackward;                                                                              //
	}(),                                                                                                                  //
	'click .btn-backward': function () {                                                                                  // 45
		function clickBtnBackward(event, template) {                                                                         //
			var val = 0;                                                                                                        // 46
			if (Session.get(SOURCE_FAV)) {                                                                                      // 47
				// reset to avoid going into negative numbers and be able to circle backwards                                      //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                             // 49
					val = Session.get(LENGTH_FAV) - 1;                                                                                // 50
					Session.set(COUNT_VIEWED, val);                                                                                   // 51
				} else {                                                                                                           //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_FAV);                                                  // 53
					Session.set(COUNT_VIEWED, val);                                                                                   // 54
				}                                                                                                                  //
			} else {                                                                                                            //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                             // 57
					val = Session.get(LENGTH_NOT_FAV) - 1;                                                                            // 58
					Session.set(COUNT_VIEWED, val);                                                                                   // 59
				} else {                                                                                                           //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_NOT_FAV);                                              // 61
					Session.set(COUNT_VIEWED, val);                                                                                   // 62
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnBackward;                                                                                             //
	}(),                                                                                                                  //
	'click .btn-forward': function () {                                                                                   // 66
		function clickBtnForward(event, template) {                                                                          //
			var val = 0;                                                                                                        // 67
			if (Session.get(SOURCE_FAV)) {                                                                                      // 68
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                                   // 69
				Session.set(COUNT_VIEWED, val);                                                                                    // 70
			} else {                                                                                                            //
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                               // 72
				Session.set(COUNT_VIEWED, val);                                                                                    // 73
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnForward;                                                                                              //
	}(),                                                                                                                  //
	'click .btn-reveal': function () {                                                                                    // 76
		function clickBtnReveal(event, template) {                                                                           //
			if (!Session.get(REVEALED)) {                                                                                       // 77
				Session.set(REVEALED, true);                                                                                       // 78
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 80
				if (document.getElementById("term").disabled === false) {                                                          // 81
					document.getElementById("term").disabled = true;                                                                  // 82
				}                                                                                                                  //
			}                                                                                                                   //
			// log                                                                                                              //
			var deviceType = Darwin.device.type;                                                                                // 76
			var devicePlatform = Darwin.device.platform;                                                                        // 87
			var clickArea = 'reveal';                                                                                           // 88
			var mode = void 0;                                                                                                  // 89
			var attention = Session.get(ATTENTION_MODE);                                                                        // 90
			if (Session.get(ATTENTION_MODE)) {                                                                                  // 91
				mode = Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)];                                                        // 92
			} else {                                                                                                            //
				if (FlowRouter.current().route.name === "eingabe") {                                                               // 94
					mode = 'eingabe';                                                                                                 // 95
				} else {                                                                                                           //
					mode = 'null';                                                                                                    // 97
				}                                                                                                                  //
			}                                                                                                                   //
			Meteor.call('dataDetail', deviceType, devicePlatform, clickArea, mode, attention);                                  // 100
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnReveal;                                                                                               //
	}(),                                                                                                                  //
	'click .btn-example': function () {                                                                                   // 102
		function clickBtnExample(event, template) {                                                                          //
			var oldValue = Session.get(EXAMPLE) || false;                                                                       // 103
			Session.set(EXAMPLE, !oldValue);                                                                                    // 104
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnExample;                                                                                              //
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
                                                                                                                       //
			Meteor.call('insertFavourite', self._id);                                                                           // 127
			// simulate source mode button for register page                                                                    //
			if (!Session.get(ATTENTION_MODE)) {                                                                                 // 124
				Session.set(SOURCE_FAV, false);                                                                                    // 130
			}                                                                                                                   //
                                                                                                                       //
			// reset the COUNT VIEW when a list entry has been removed                                                          //
			if (!Session.get(SOURCE_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {                     // 124
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                           // 135
				Session.set(COUNT_VIEWED, val);                                                                                    // 136
			}                                                                                                                   //
			if (Session.get(LENGTH_NOT_FAV) === 1) {                                                                            // 138
				Session.set(SOURCE_FAV, !Session.get(SOURCE_FAV));                                                                 // 139
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnInsert;                                                                                               //
	}(),                                                                                                                  //
	'click .btn-delete': function () {                                                                                    // 143
		function clickBtnDelete(event, template) {                                                                           //
			var self = this;                                                                                                    // 144
                                                                                                                       //
			Meteor.call('deleteFavourite', self._id);                                                                           // 146
			// simulate source mode button for register page                                                                    //
			if (!Session.get(ATTENTION_MODE)) {                                                                                 // 143
				Session.set(SOURCE_FAV, true);                                                                                     // 149
			}                                                                                                                   //
                                                                                                                       //
			if (Session.get(SOURCE_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                          // 152
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 153
				Session.set(COUNT_VIEWED, val);                                                                                    // 154
			}                                                                                                                   //
			if (Session.get(LENGTH_FAV) === 1) {                                                                                // 156
				Session.set(SOURCE_FAV, !Session.get(SOURCE_FAV));                                                                 // 157
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

},"nav_mode_trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/nav_mode_trainer.js                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navModeTrainer.events({                                                                                       // 1
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
	}(),                                                                                                                  //
	'click .btn-lesen': function () {                                                                                     // 22
		function clickBtnLesen() {                                                                                           //
			Session.set(NAV_MODE_COUNT, R.indexOf(NAV_MODE_READ, Session.get(NAV_MODES)));                                      // 23
			Session.get(NAV_MODES).forEach(function (entry) {                                                                   // 24
				Session.set(entry, false);                                                                                         // 25
			});                                                                                                                 //
			Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);                                             // 27
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnLesen;                                                                                                //
	}(),                                                                                                                  //
	'click .btn-wort': function () {                                                                                      // 29
		function clickBtnWort() {                                                                                            //
			Session.set(NAV_MODE_COUNT, R.indexOf(NAV_MODE_TERM, Session.get(NAV_MODES)));                                      // 30
			Session.get(NAV_MODES).forEach(function (entry) {                                                                   // 31
				Session.set(entry, false);                                                                                         // 32
			});                                                                                                                 //
			Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);                                             // 34
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnWort;                                                                                                 //
	}(),                                                                                                                  //
	'click .btn-definition': function () {                                                                                // 36
		function clickBtnDefinition() {                                                                                      //
			Session.set(NAV_MODE_COUNT, R.indexOf(NAV_MODE_DEF, Session.get(NAV_MODES)));                                       // 37
			Session.get(NAV_MODES).forEach(function (entry) {                                                                   // 38
				Session.set(entry, false);                                                                                         // 39
			});                                                                                                                 //
			Session.set(Session.get(NAV_MODES)[Session.get(NAV_MODE_COUNT)], true);                                             // 41
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnDefinition;                                                                                           //
	}(),                                                                                                                  //
	'click .btn-eingabe': function () {                                                                                   // 43
		function clickBtnEingabe() {}                                                                                        //
                                                                                                                       //
		return clickBtnEingabe;                                                                                              //
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

},"nav_source_trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/nav_source_trainer.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navSourceTrainer.helpers({                                                                                    // 1
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
Template.navSourceTrainer.events({                                                                                     // 17
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
		max: 1000,                                                                                                           // 50
		autoform: {                                                                                                          // 51
			afFieldInput: {                                                                                                     // 52
				type: "textarea"                                                                                                   // 53
			}                                                                                                                   //
		}                                                                                                                    //
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
Data.Survey.Schema = new SimpleSchema({                                                                                // 65
	// GENERAL                                                                                                            //
	userId: {                                                                                                             // 67
		type: String,                                                                                                        // 68
		autoValue: function () {                                                                                             // 69
			function autoValue() {                                                                                              // 69
				return this.userId;                                                                                                // 70
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		autoform: {                                                                                                          // 72
			type: "hidden",                                                                                                     // 73
			label: false                                                                                                        // 74
		}                                                                                                                    //
	},                                                                                                                    //
	age: {                                                                                                                // 77
		type: Number,                                                                                                        // 78
		label: 'Dein Alter',                                                                                                 // 79
		min: 18,                                                                                                             // 80
		max: 99                                                                                                              // 81
	},                                                                                                                    //
                                                                                                                       //
	previousExperience: {                                                                                                 // 84
		type: String,                                                                                                        // 85
		label: 'Wie steht es um deine Vorerfahrung mit digitalen Vokabeltrainern?',                                          // 86
		autoform: {                                                                                                          // 87
			type: "select-radio-inline",                                                                                        // 88
			options: function () {                                                                                              // 89
				function options() {                                                                                               // 89
					return [{                                                                                                         // 90
						label: "gar keine",                                                                                              // 91
						value: "keine"                                                                                                   // 92
					}, {                                                                                                              //
						label: "mal probiert",                                                                                           // 94
						value: "probiert"                                                                                                // 95
					}, {                                                                                                              //
						label: "nutze ich regelmaessig",                                                                                 // 97
						value: "regelmaessig"                                                                                            // 98
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	learningCurve: {                                                                                                      // 103
		type: String,                                                                                                        // 104
		label: 'Wie ist dir die Einarbeitung in die App gefallen?',                                                          // 105
		autoform: {                                                                                                          // 106
			type: "select-radio-inline",                                                                                        // 107
			options: function () {                                                                                              // 108
				function options() {                                                                                               // 108
					return [{                                                                                                         // 109
						label: "Leicht",                                                                                                 // 110
						value: "leicht"                                                                                                  // 111
					}, {                                                                                                              //
						label: "Mittel",                                                                                                 // 113
						value: "mittel"                                                                                                  // 114
					}, {                                                                                                              //
						label: "Schwer",                                                                                                 // 116
						value: "schwer"                                                                                                  // 117
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	everydayUse: {                                                                                                        // 122
		type: String,                                                                                                        // 123
		label: 'Konntest du den Gebrauch der App muehelos in deinen Alltag integrieren?',                                    // 124
		autoform: {                                                                                                          // 125
			type: "select-radio-inline",                                                                                        // 126
			options: function () {                                                                                              // 127
				function options() {                                                                                               // 127
					return [{                                                                                                         // 128
						label: "Ja",                                                                                                     // 129
						value: "ja"                                                                                                      // 130
					}, {                                                                                                              //
						label: "Nein",                                                                                                   // 132
						value: "nein"                                                                                                    // 133
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	everydayUseText: {                                                                                                    // 138
		type: String,                                                                                                        // 139
		max: 1000,                                                                                                           // 140
		label: 'Weshalb?',                                                                                                   // 141
		autoform: {                                                                                                          // 142
			afFieldInput: {                                                                                                     // 143
				type: "textarea"                                                                                                   // 144
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	usability: {                                                                                                          // 148
		type: String,                                                                                                        // 149
		label: 'Wie kommst du mit der Bedienung der App zurecht?',                                                           // 150
		autoform: {                                                                                                          // 151
			type: "select-radio-inline",                                                                                        // 152
			options: function () {                                                                                              // 153
				function options() {                                                                                               // 153
					return [{                                                                                                         // 154
						label: "gar nicht",                                                                                              // 155
						value: "nicht"                                                                                                   // 156
					}, {                                                                                                              //
						label: "ok",                                                                                                     // 158
						value: "ok"                                                                                                      // 159
					}, {                                                                                                              //
						label: "super",                                                                                                  // 161
						value: "super"                                                                                                   // 162
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	usabilityText: {                                                                                                      // 167
		type: String,                                                                                                        // 168
		max: 1000,                                                                                                           // 169
		label: 'Teile deine Ideen zur Bedienung (optional)',                                                                 // 170
		optional: true,                                                                                                      // 171
		autoform: {                                                                                                          // 172
			afFieldInput: {                                                                                                     // 173
				type: "textarea"                                                                                                   // 174
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	// NUTZUNGSVERHALTEN                                                                                                  //
	deviceMobile: {                                                                                                       // 179
		type: String,                                                                                                        // 180
		label: 'Mobile:',                                                                                                    // 181
		autoform: {                                                                                                          // 182
			type: "select-radio-inline",                                                                                        // 183
			options: function () {                                                                                              // 184
				function options() {                                                                                               // 184
					return [{                                                                                                         // 185
						label: "Ja",                                                                                                     // 186
						value: "ja"                                                                                                      // 187
					}, {                                                                                                              //
						label: "Nein",                                                                                                   // 189
						value: "nein"                                                                                                    // 190
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	deviceTablet: {                                                                                                       // 195
		type: String,                                                                                                        // 196
		label: 'Tablet:',                                                                                                    // 197
		autoform: {                                                                                                          // 198
			type: "select-radio-inline",                                                                                        // 199
			options: function () {                                                                                              // 200
				function options() {                                                                                               // 200
					return [{                                                                                                         // 201
						label: "Ja",                                                                                                     // 202
						value: "ja"                                                                                                      // 203
					}, {                                                                                                              //
						label: "Nein",                                                                                                   // 205
						value: "nein"                                                                                                    // 206
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	deviceDesktop: {                                                                                                      // 211
		type: String,                                                                                                        // 212
		label: 'Desktop:',                                                                                                   // 213
		autoform: {                                                                                                          // 214
			type: "select-radio-inline",                                                                                        // 215
			options: function () {                                                                                              // 216
				function options() {                                                                                               // 216
					return [{                                                                                                         // 217
						label: "Ja",                                                                                                     // 218
						value: "ja"                                                                                                      // 219
					}, {                                                                                                              //
						label: "Nein",                                                                                                   // 221
						value: "nein"                                                                                                    // 222
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	deviceBehavior: {                                                                                                     // 227
		type: String,                                                                                                        // 228
		max: 1000,                                                                                                           // 229
		label: 'Falls du mehrere Endgeraete benutzt hast um die App aufzurufen: Inwiefern hat sich dein Nutzungsverhalten unterschieden?',
		optional: false,                                                                                                     // 231
		autoform: {                                                                                                          // 232
			afFieldInput: {                                                                                                     // 233
				type: "textarea"                                                                                                   // 234
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	favouriteMode: {                                                                                                      // 238
		type: String,                                                                                                        // 239
		label: 'Welchen Trainermodus hast du am liebsten genutzt?',                                                          // 240
		autoform: {                                                                                                          // 241
			type: "select-radio-inline",                                                                                        // 242
			options: function () {                                                                                              // 243
				function options() {                                                                                               // 243
					return [{                                                                                                         // 244
						label: "Lesen",                                                                                                  // 245
						value: "lesen"                                                                                                   // 246
					}, {                                                                                                              //
						label: "Wort",                                                                                                   // 248
						value: "wort"                                                                                                    // 249
					}, {                                                                                                              //
						label: "Definition",                                                                                             // 251
						value: "definition"                                                                                              // 252
					}, {                                                                                                              //
						label: "Texteingabe",                                                                                            // 254
						value: "eingabe"                                                                                                 // 255
					}, {                                                                                                              //
						label: "Register",                                                                                               // 257
						value: "register"                                                                                                // 258
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	favouriteModeText: {                                                                                                  // 263
		type: String,                                                                                                        // 264
		max: 1000,                                                                                                           // 265
		label: 'Weshalb?',                                                                                                   // 266
		optional: false,                                                                                                     // 267
		autoform: {                                                                                                          // 268
			afFieldInput: {                                                                                                     // 269
				type: "textarea"                                                                                                   // 270
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionBenefit: {                                                                                                   // 274
		type: String,                                                                                                        // 275
		label: 'Hat dir die Moeglichkeit, das UI kontextorientiert zu veraendern, gefallen?',                                // 276
		autoform: {                                                                                                          // 277
			type: "select-radio-inline",                                                                                        // 278
			options: function () {                                                                                              // 279
				function options() {                                                                                               // 279
					return [{                                                                                                         // 280
						label: "Ja",                                                                                                     // 281
						value: "ja"                                                                                                      // 282
					}, {                                                                                                              //
						label: "Nein",                                                                                                   // 284
						value: "nein"                                                                                                    // 285
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionBehavior: {                                                                                                  // 290
		type: String,                                                                                                        // 291
		label: 'Hat die Moeglichkeit, das UI kontextorientiert zu veraendern, dein Nutzungsverhalten beeinflusst?',          // 292
		autoform: {                                                                                                          // 293
			type: "select-radio-inline",                                                                                        // 294
			options: function () {                                                                                              // 295
				function options() {                                                                                               // 295
					return [{                                                                                                         // 296
						label: "Ja",                                                                                                     // 297
						value: "ja"                                                                                                      // 298
					}, {                                                                                                              //
						label: "Nein",                                                                                                   // 300
						value: "nein"                                                                                                    // 301
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionBehaviorText: {                                                                                              // 306
		type: String,                                                                                                        // 307
		max: 1000,                                                                                                           // 308
		label: 'Weshalb?',                                                                                                   // 309
		autoform: {                                                                                                          // 310
			afFieldInput: {                                                                                                     // 311
				type: "textarea"                                                                                                   // 312
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionSituation: {                                                                                                 // 316
		type: String,                                                                                                        // 317
		label: 'Wann, wo und in welcher Situation hast du beschlossen, das UI zu wechseln? (Beispiel)',                      // 318
		optional: false,                                                                                                     // 319
		autoform: {                                                                                                          // 320
			afFieldInput: {                                                                                                     // 321
				type: "textarea"                                                                                                   // 322
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionUse: {                                                                                                       // 326
		type: String,                                                                                                        // 327
		label: 'Siehst du generell einen Vorteil in der Moeglichkeit das UI kontextorientiert anzupassen?',                  // 328
		autoform: {                                                                                                          // 329
			type: "select-radio-inline",                                                                                        // 330
			options: function () {                                                                                              // 331
				function options() {                                                                                               // 331
					return [{                                                                                                         // 332
						label: "Ja",                                                                                                     // 333
						value: "ja"                                                                                                      // 334
					}, {                                                                                                              //
						label: "Nein",                                                                                                   // 336
						value: "nein"                                                                                                    // 337
					}];                                                                                                               //
				}                                                                                                                  //
                                                                                                                       //
				return options;                                                                                                    //
			}()                                                                                                                 //
		}                                                                                                                    //
	},                                                                                                                    //
	attentionUseText: {                                                                                                   // 342
		type: String,                                                                                                        // 343
		max: 1000,                                                                                                           // 344
		label: 'Weshalb?',                                                                                                   // 345
		optional: false,                                                                                                     // 346
		autoform: {                                                                                                          // 347
			afFieldInput: {                                                                                                     // 348
				type: "textarea"                                                                                                   // 349
			}                                                                                                                   //
		}                                                                                                                    //
	},                                                                                                                    //
	prospects: {                                                                                                          // 353
		type: String,                                                                                                        // 354
		max: 1000,                                                                                                           // 355
		label: 'Welche alternativen Anwendungsgebiete fuer ein kontextsensitives UI kannst du dir vorstellen?',              // 356
		optional: false,                                                                                                     // 357
		autoform: {                                                                                                          // 358
			afFieldInput: {                                                                                                     // 359
				type: "textarea"                                                                                                   // 360
			}                                                                                                                   //
		}                                                                                                                    //
	}                                                                                                                     //
                                                                                                                       //
});                                                                                                                    //
                                                                                                                       //
Data.Detail.Schema = new SimpleSchema({                                                                                // 367
	userId: {                                                                                                             // 368
		type: String,                                                                                                        // 369
		autoValue: function () {                                                                                             // 370
			function autoValue() {                                                                                              // 370
				return this.userId;                                                                                                // 371
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	timestamp: {                                                                                                          // 374
		type: Date,                                                                                                          // 375
		autoValue: function () {                                                                                             // 376
			function autoValue() {                                                                                              // 376
				return new Date();                                                                                                 // 377
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	deviceType: {                                                                                                         // 380
		type: String                                                                                                         // 381
	},                                                                                                                    //
	devicePlatform: {                                                                                                     // 383
		type: String                                                                                                         // 384
	},                                                                                                                    //
	clickArea: {                                                                                                          // 386
		type: String,                                                                                                        // 387
		allowedValues: ['favDel', 'browse', 'source', 'reveal', 'bar', 'mode']                                               // 388
	},                                                                                                                    //
	mode: {                                                                                                               // 390
		type: String,                                                                                                        // 391
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']                                                    // 392
	},                                                                                                                    //
	attention: {                                                                                                          // 394
		type: Boolean                                                                                                        // 395
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Data.Words.Schema = new SimpleSchema({                                                                                 // 399
	userId: {                                                                                                             // 400
		type: String,                                                                                                        // 401
		autoValue: function () {                                                                                             // 402
			function autoValue() {                                                                                              // 402
				return this.userId;                                                                                                // 403
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	vocabularyId: {                                                                                                       // 406
		type: String                                                                                                         // 407
	},                                                                                                                    //
	vocabularyName: {                                                                                                     // 409
		type: String                                                                                                         // 410
	},                                                                                                                    //
	viewed: {                                                                                                             // 412
		type: Number                                                                                                         // 413
	},                                                                                                                    //
	createdAt: {                                                                                                          // 415
		type: Date,                                                                                                          // 416
		autoValue: function () {                                                                                             // 417
			function autoValue() {                                                                                              // 417
				return new Date();                                                                                                 // 418
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Data.Detail.attachSchema(Data.Detail.Schema);                                                                          // 423
Data.Words.attachSchema(Data.Words.Schema);                                                                            // 424
Data.Survey.attachSchema(Data.Survey.Schema);                                                                          // 425
Data.Feedback.attachSchema(Data.Feedback.Schema);                                                                      // 426
Data.Status.attachSchema(Data.Status.Schema);                                                                          // 427
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
				main: "index"                                                                                                      // 58
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
highRoutes.route('/trainer', {                                                                                         // 62
	name: "trainer",                                                                                                      // 63
	action: function () {                                                                                                 // 64
		function action(params, queryParams) {                                                                               // 64
			BlazeLayout.render('layout', {                                                                                      // 65
				bar: "bar",                                                                                                        // 66
				nav: "nav",                                                                                                        // 67
				navModeTrainer: "navModeTrainer",                                                                                  // 68
				main: "trainer",                                                                                                   // 69
				navSource: "navSourceTrainer"                                                                                      // 70
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
highRoutes.route('/register/:id', {                                                                                    // 75
	name: "vokabelDetail",                                                                                                // 76
	action: function () {                                                                                                 // 77
		function action(params, queryParams) {                                                                               // 77
			BlazeLayout.render('layout', {                                                                                      // 78
				bar: "bar",                                                                                                        // 79
				nav: "nav",                                                                                                        // 80
				main: "vokabelDetail"                                                                                              // 81
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
highRoutes.route('/register', {                                                                                        // 85
	name: "register",                                                                                                     // 86
	action: function () {                                                                                                 // 87
		function action(params, queryParams) {                                                                               // 87
			BlazeLayout.render('layout', {                                                                                      // 88
				bar: "bar",                                                                                                        // 89
				nav: "nav",                                                                                                        // 90
				main: "register"                                                                                                   // 91
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
highRoutes.route('/uebersicht', {                                                                                      // 95
	name: "uebersicht",                                                                                                   // 96
	action: function () {                                                                                                 // 97
		function action(params, queryParams) {                                                                               // 97
			FlowRouter.redirect('/uebersicht/feedback');                                                                        // 98
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 100
});                                                                                                                    //
highRoutes.route('/uebersicht/statistik', {                                                                            // 102
	name: "statistik",                                                                                                    // 103
	action: function () {                                                                                                 // 104
		function action(params, queryParams) {                                                                               // 104
			FlowRouter.redirect('/uebersicht/statistik/total');                                                                 // 105
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 107
});                                                                                                                    //
highRoutes.route('/uebersicht/statistik/device', {                                                                     // 109
	name: "device",                                                                                                       // 110
	action: function () {                                                                                                 // 111
		function action(params, queryParams) {                                                                               // 111
			BlazeLayout.render('layout', {                                                                                      // 112
				bar: "bar",                                                                                                        // 113
				nav: "nav",                                                                                                        // 114
				navOverview: "navOverview",                                                                                        // 115
				navStatistics: "navStatistics",                                                                                    // 116
				main: "device"                                                                                                     // 117
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 120
});                                                                                                                    //
highRoutes.route('/uebersicht/statistik/mode', {                                                                       // 122
	name: "mode",                                                                                                         // 123
	action: function () {                                                                                                 // 124
		function action(params, queryParams) {                                                                               // 124
			BlazeLayout.render('layout', {                                                                                      // 125
				bar: "bar",                                                                                                        // 126
				nav: "nav",                                                                                                        // 127
				navOverview: "navOverview",                                                                                        // 128
				navStatistics: "navStatistics",                                                                                    // 129
				main: "mode"                                                                                                       // 130
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 133
});                                                                                                                    //
highRoutes.route('/uebersicht/statistik/status', {                                                                     // 135
	name: "status",                                                                                                       // 136
	action: function () {                                                                                                 // 137
		function action(params, queryParams) {                                                                               // 137
			BlazeLayout.render('layout', {                                                                                      // 138
				bar: "bar",                                                                                                        // 139
				nav: "nav",                                                                                                        // 140
				navOverview: "navOverview",                                                                                        // 141
				navStatistics: "navStatistics",                                                                                    // 142
				main: "status"                                                                                                     // 143
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 146
});                                                                                                                    //
highRoutes.route('/uebersicht/statistik/total', {                                                                      // 148
	name: "total",                                                                                                        // 149
	action: function () {                                                                                                 // 150
		function action(params, queryParams) {                                                                               // 150
			BlazeLayout.render('layout', {                                                                                      // 151
				bar: "bar",                                                                                                        // 152
				nav: "nav",                                                                                                        // 153
				navOverview: "navOverview",                                                                                        // 154
				navStatistics: "navStatistics",                                                                                    // 155
				main: "total"                                                                                                      // 156
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 159
});                                                                                                                    //
                                                                                                                       //
highRoutes.route('/uebersicht/feedback', {                                                                             // 162
	name: "feedback",                                                                                                     // 163
	action: function () {                                                                                                 // 164
		function action(params, queryParams) {                                                                               // 164
			BlazeLayout.render('layout', {                                                                                      // 165
				bar: "bar",                                                                                                        // 166
				nav: "nav",                                                                                                        // 167
				navOverview: "navOverview",                                                                                        // 168
				main: "feedback"                                                                                                   // 169
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [checkAdmin]                                                                                           // 172
});                                                                                                                    //
highRoutes.route('/fragebogen', {                                                                                      // 174
	name: "fragebogen",                                                                                                   // 175
	triggersEnter: [checkSurveySubmitted],                                                                                // 176
	action: function () {                                                                                                 // 177
		function action(params, queryParams) {                                                                               // 177
			BlazeLayout.render('layout', {                                                                                      // 178
				bar: "bar",                                                                                                        // 179
				nav: "nav",                                                                                                        // 180
				main: "fragebogen"                                                                                                 // 181
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: []                                                                                                     // 184
});                                                                                                                    //
                                                                                                                       //
lowRoutes.route('/low', {                                                                                              // 187
	name: "low",                                                                                                          // 188
	action: function () {                                                                                                 // 189
		function action(params, queryParams) {                                                                               // 189
			BlazeLayout.render('layout', {                                                                                      // 190
				bar: "bar",                                                                                                        // 191
				main: "low",                                                                                                       // 192
				navSource: "navLow"                                                                                                // 193
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: []                                                                                                     // 196
});                                                                                                                    //
                                                                                                                       //
FlowRouter.notFound = {                                                                                                // 199
	name: "notFound",                                                                                                     // 200
	action: function () {                                                                                                 // 201
		function action(params, queryParams) {                                                                               // 201
			BlazeLayout.render('layout', {                                                                                      // 202
				footer: "footer",                                                                                                  // 203
				main: "pageNotFound"                                                                                               // 204
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
//Routes                                                                                                               //
AccountsTemplates.configureRoute('changePwd');                                                                         // 211
// AccountsTemplates.configureRoute('forgotPwd');                                                                      //
AccountsTemplates.configureRoute('resetPwd');                                                                          // 213
AccountsTemplates.configureRoute('signIn');                                                                            // 214
AccountsTemplates.configureRoute('signUp');                                                                            // 215
// AccountsTemplates.configureRoute('verifyEmail');                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/views/high/uebersicht/charts/device/device.html");
require("./client/views/high/uebersicht/charts/mode/chart_bar_modes.html");
require("./client/views/high/uebersicht/charts/mode/mode.html");
require("./client/views/high/uebersicht/charts/status/chart_line_online_user.html");
require("./client/views/high/uebersicht/charts/status/status.html");
require("./client/views/high/uebersicht/charts/total/chart_bar_clicks_per_day.html");
require("./client/views/high/uebersicht/charts/total/chart_pie_attention.html");
require("./client/views/high/uebersicht/charts/total/total.html");
require("./client/views/high/index/charts/wordsAll.html");
require("./client/views/high/index/charts/wordsUser.html");
require("./client/views/high/uebersicht/charts/chart_multibar_attention.html");
require("./client/views/high/fragebogen/fragebogen.html");
require("./client/views/high/index/feedback.html");
require("./client/views/high/index/hello.html");
require("./client/views/high/index/index.html");
require("./client/views/high/register/letter_collapse.html");
require("./client/views/high/register/letter_list.html");
require("./client/views/high/register/register.html");
require("./client/views/high/register/vokabel_detail.html");
require("./client/views/high/trainer/trainer.html");
require("./client/views/high/uebersicht/feedback.html");
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
require("./client/layout/navStatistics.html");
require("./client/layout/nav_low.html");
require("./client/layout/nav_mode.html");
require("./client/layout/nav_mode_trainer.html");
require("./client/layout/nav_overview.html");
require("./client/layout/nav_source.html");
require("./client/layout/nav_source_trainer.html");
require("./client/loading.html");
require("./client/page_not_found.html");
require("./client/views/high/uebersicht/charts/mode/chart_bar_modes.js");
require("./client/views/high/uebersicht/charts/mode/mode.js");
require("./client/views/high/uebersicht/charts/status/chart_line_online_user.js");
require("./client/views/high/uebersicht/charts/status/status.js");
require("./client/views/high/uebersicht/charts/total/chart_bar_clicks_per_day.js");
require("./client/views/high/uebersicht/charts/total/chart_pie_attention.js");
require("./client/views/high/uebersicht/charts/total/total.js");
require("./client/views/high/index/charts/wordsAll.js");
require("./client/views/high/index/charts/wordsUser.js");
require("./client/views/high/uebersicht/charts/chart_multibar_attention.js");
require("./client/views/high/fragebogen/fragebogen.js");
require("./client/views/high/index/feedback.js");
require("./client/views/high/index/hello.js");
require("./client/views/high/register/register.js");
require("./client/views/high/register/vokabel_detail.js");
require("./client/views/high/trainer/trainer.js");
require("./client/views/high/uebersicht/feedback.js");
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