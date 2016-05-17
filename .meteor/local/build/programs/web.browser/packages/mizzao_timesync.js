//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var HTTP = Package.http.HTTP;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var TimeSync, SyncInternals;

var require = meteorInstall({"node_modules":{"meteor":{"mizzao:timesync":{"timesync-client.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/mizzao_timesync/timesync-client.js                                                           //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
//IE8 doesn't have Date.now()                                                                            //
Date.now = Date.now || function () {                                                                     // 2
  return +new Date();                                                                                    // 2
};                                                                                                       //
                                                                                                         //
TimeSync = {                                                                                             // 4
  loggingEnabled: true                                                                                   // 5
};                                                                                                       //
                                                                                                         //
function log() /* arguments */{                                                                          // 8
  if (TimeSync.loggingEnabled) {                                                                         // 9
    Meteor._debug.apply(this, arguments);                                                                // 10
  }                                                                                                      //
}                                                                                                        //
                                                                                                         //
var defaultInterval = 1000;                                                                              // 14
                                                                                                         //
// Internal values, exported for testing                                                                 //
SyncInternals = {                                                                                        // 17
  offset: undefined,                                                                                     // 18
  roundTripTime: undefined,                                                                              // 19
  offsetDep: new Deps.Dependency(),                                                                      // 20
  timeTick: {},                                                                                          // 21
                                                                                                         //
  timeCheck: function () {                                                                               // 23
    function timeCheck(lastTime, currentTime, interval, tolerance) {                                     // 23
      if (Math.abs(currentTime - lastTime - interval) < tolerance) {                                     // 24
        // Everything is A-OK                                                                            //
        return true;                                                                                     // 26
      }                                                                                                  //
      // We're no longer in sync.                                                                        //
      return false;                                                                                      // 23
    }                                                                                                    //
                                                                                                         //
    return timeCheck;                                                                                    //
  }()                                                                                                    //
};                                                                                                       //
                                                                                                         //
SyncInternals.timeTick[defaultInterval] = new Deps.Dependency();                                         // 33
                                                                                                         //
var maxAttempts = 5;                                                                                     // 35
var attempts = 0;                                                                                        // 36
                                                                                                         //
/*                                                                                                       //
  This is an approximation of                                                                            //
  http://en.wikipedia.org/wiki/Network_Time_Protocol                                                     //
                                                                                                         //
  If this turns out to be more accurate under the connect handlers,                                      //
  we should try taking multiple measurements.                                                            //
 */                                                                                                      //
                                                                                                         //
var syncUrl;                                                                                             // 46
if (Meteor.isCordova) {                                                                                  // 47
  // Only use Meteor.absoluteUrl for Cordova; see                                                        //
  // https://github.com/meteor/meteor/issues/4696                                                        //
  // https://github.com/mizzao/meteor-timesync/issues/30                                                 //
  // Cordova should never be running out of a subdirectory...                                            //
  syncUrl = Meteor.absoluteUrl("_timesync");                                                             // 52
} else {                                                                                                 //
  // Support Meteor running in relative paths, based on computed root url prefix                         //
  // https://github.com/mizzao/meteor-timesync/pull/40                                                   //
  var basePath = __meteor_runtime_config__.ROOT_URL_PATH_PREFIX || '';                                   // 57
  syncUrl = basePath + "/_timesync";                                                                     // 58
}                                                                                                        //
                                                                                                         //
var updateOffset = function updateOffset() {                                                             // 61
  var t0 = Date.now();                                                                                   // 62
                                                                                                         //
  HTTP.get(syncUrl, function (err, response) {                                                           // 64
    var t3 = Date.now(); // Grab this now                                                                // 65
    if (err) {                                                                                           // 64
      //  We'll still use our last computed offset if is defined                                         //
      log("Error syncing to server time: ", err);                                                        // 68
      if (++attempts <= maxAttempts) Meteor.setTimeout(TimeSync.resync, 1000);else log("Max number of time sync attempts reached. Giving up.");
      return;                                                                                            // 73
    }                                                                                                    //
                                                                                                         //
    attempts = 0; // It worked                                                                           // 76
                                                                                                         //
    var ts = parseInt(response.content);                                                                 // 64
    SyncInternals.offset = Math.round((ts - t0 + (ts - t3)) / 2);                                        // 79
    SyncInternals.roundTripTime = t3 - t0; // - (ts - ts) which is 0                                     // 80
    SyncInternals.offsetDep.changed();                                                                   // 64
  });                                                                                                    //
};                                                                                                       //
                                                                                                         //
// Reactive variable for server time that updates every second.                                          //
TimeSync.serverTime = function (clientTime, interval) {                                                  // 86
  check(interval, Match.Optional(Match.Integer));                                                        // 87
  // If we don't know the offset, we can't provide the server time.                                      //
  if (!TimeSync.isSynced()) return undefined;                                                            // 86
  // If a client time is provided, we don't need to depend on the tick.                                  //
  if (!clientTime) getTickDependency(interval || defaultInterval).depend();                              // 86
                                                                                                         //
  // SyncInternals.offsetDep.depend(); implicit as we call isSynced()                                    //
  // Convert Date argument to epoch as necessary                                                         //
  return (+clientTime || Date.now()) + SyncInternals.offset;                                             // 86
};                                                                                                       //
                                                                                                         //
// Reactive variable for the difference between server and client time.                                  //
TimeSync.serverOffset = function () {                                                                    // 99
  SyncInternals.offsetDep.depend();                                                                      // 100
  return SyncInternals.offset;                                                                           // 101
};                                                                                                       //
                                                                                                         //
TimeSync.roundTripTime = function () {                                                                   // 104
  SyncInternals.offsetDep.depend();                                                                      // 105
  return SyncInternals.roundTripTime;                                                                    // 106
};                                                                                                       //
                                                                                                         //
TimeSync.isSynced = function () {                                                                        // 109
  SyncInternals.offsetDep.depend();                                                                      // 110
  return SyncInternals.offset !== undefined;                                                             // 111
};                                                                                                       //
                                                                                                         //
var resyncIntervalId = null;                                                                             // 114
                                                                                                         //
TimeSync.resync = function () {                                                                          // 116
  if (resyncIntervalId !== null) Meteor.clearInterval(resyncIntervalId);                                 // 117
  updateOffset();                                                                                        // 118
  resyncIntervalId = Meteor.setInterval(updateOffset, 600000);                                           // 119
};                                                                                                       //
                                                                                                         //
// Run this as soon as we load, even before Meteor.startup()                                             //
// Run again whenever we reconnect after losing connection                                               //
var wasConnected = false;                                                                                // 124
                                                                                                         //
Deps.autorun(function () {                                                                               // 126
  var connected = Meteor.status().connected;                                                             // 127
  if (connected && !wasConnected) TimeSync.resync();                                                     // 128
  wasConnected = connected;                                                                              // 129
});                                                                                                      //
                                                                                                         //
// Resync if unexpected change by more than a few seconds. This needs to be                              //
// somewhat lenient, or a CPU-intensive operation can trigger a re-sync even                             //
// when the offset is still accurate. In any case, we're not going to be able to                         //
// catch very small system-initiated NTP adjustments with this, anyway.                                  //
var tickCheckTolerance = 5000;                                                                           // 136
                                                                                                         //
var lastClientTime = Date.now();                                                                         // 138
                                                                                                         //
// Set up a new interval for any amount of reactivity.                                                   //
function getTickDependency(interval) {                                                                   // 141
                                                                                                         //
  if (!SyncInternals.timeTick[interval]) {                                                               // 143
    var dep = new Deps.Dependency();                                                                     // 144
                                                                                                         //
    Meteor.setInterval(function () {                                                                     // 146
      dep.changed();                                                                                     // 147
    }, interval);                                                                                        //
                                                                                                         //
    SyncInternals.timeTick[interval] = dep;                                                              // 150
  }                                                                                                      //
                                                                                                         //
  return SyncInternals.timeTick[interval];                                                               // 153
}                                                                                                        //
                                                                                                         //
// Set up special interval for the default tick, which also watches for re-sync                          //
Meteor.setInterval(function () {                                                                         // 157
  var currentClientTime = Date.now();                                                                    // 158
                                                                                                         //
  if (SyncInternals.timeCheck(lastClientTime, currentClientTime, defaultInterval, tickCheckTolerance)) {
    // No problem here, just keep ticking along                                                          //
    SyncInternals.timeTick[defaultInterval].changed();                                                   // 163
  } else {                                                                                               //
    // resync on major client clock changes                                                              //
    // based on http://stackoverflow.com/a/3367542/1656818                                               //
    log("Clock discrepancy detected. Attempting re-sync.");                                              // 168
    // Refuse to compute server time.                                                                    //
    SyncInternals.offset = undefined;                                                                    // 165
    SyncInternals.offsetDep.changed();                                                                   // 171
    TimeSync.resync();                                                                                   // 172
  }                                                                                                      //
                                                                                                         //
  lastClientTime = currentClientTime;                                                                    // 175
}, defaultInterval);                                                                                     //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/mizzao:timesync/timesync-client.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['mizzao:timesync'] = {}, {
  TimeSync: TimeSync,
  SyncInternals: SyncInternals
});

})();
