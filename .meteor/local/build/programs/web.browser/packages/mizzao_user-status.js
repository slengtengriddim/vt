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
var Accounts = Package['accounts-base'].Accounts;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Mongo = Package.mongo.Mongo;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var TimeSync = Package['mizzao:timesync'].TimeSync;

/* Package-scope variables */
var __coffeescriptShare, MonitorInternals, UserStatus;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/mizzao_user-status/monitor.coffee.js                                           //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                           // 1
/*                                                                                         // 1
  The idle monitor watches for mouse, keyboard, and blur events,                           //
  and reports idle status to the server.                                                   //
                                                                                           //
  It uses TimeSync to report accurate time.                                                //
                                                                                           //
  Everything is reactive, of course!                                                       //
 */                                                                                        //
var activityDep, focused, idle, idleDep, isIdle, isMonitoring, lastActivity, lastActivityTime, monitor, monitorDep, monitorId, start, stop, touch;                              
                                                                                           //
monitorId = null;                                                                          // 1
                                                                                           //
idle = false;                                                                              // 1
                                                                                           //
lastActivityTime = void 0;                                                                 // 1
                                                                                           //
monitorDep = new Deps.Dependency;                                                          // 1
                                                                                           //
idleDep = new Deps.Dependency;                                                             // 1
                                                                                           //
activityDep = new Deps.Dependency;                                                         // 1
                                                                                           //
focused = true;                                                                            // 1
                                                                                           //
MonitorInternals = {                                                                       // 1
  idleThreshold: null,                                                                     // 22
  idleOnBlur: false,                                                                       // 22
  computeState: function(lastActiveTime, currentTime, isWindowFocused) {                   // 22
    var inactiveTime;                                                                      // 27
    inactiveTime = currentTime - lastActiveTime;                                           // 27
    if (MonitorInternals.idleOnBlur && !isWindowFocused) {                                 // 28
      return true;                                                                         // 28
    }                                                                                      //
    if (inactiveTime > MonitorInternals.idleThreshold) {                                   // 29
      return true;                                                                         //
    } else {                                                                               //
      return false;                                                                        //
    }                                                                                      //
  },                                                                                       //
  connectionChange: function(isConnected, wasConnected) {                                  // 22
    if (isConnected && !wasConnected && idle) {                                            // 38
      return MonitorInternals.reportIdle(lastActivityTime);                                //
    }                                                                                      //
  },                                                                                       //
  onWindowBlur: function() {                                                               // 22
    focused = false;                                                                       // 42
    return monitor();                                                                      //
  },                                                                                       //
  onWindowFocus: function() {                                                              // 22
    focused = true;                                                                        // 46
    return monitor(true);                                                                  //
  },                                                                                       //
  reportIdle: function(time) {                                                             // 22
    return Meteor.call("user-status-idle", time);                                          //
  },                                                                                       //
  reportActive: function(time) {                                                           // 22
    return Meteor.call("user-status-active", time);                                        //
  }                                                                                        //
};                                                                                         //
                                                                                           //
start = function(settings) {                                                               // 1
  var interval;                                                                            // 60
  if (!TimeSync.isSynced()) {                                                              // 60
    throw new Error("Can't start idle monitor until synced to server");                    // 60
  }                                                                                        //
  if (monitorId) {                                                                         // 61
    throw new Error("Idle monitor is already active. Stop it first.");                     // 61
  }                                                                                        //
  settings = settings || {};                                                               // 60
  MonitorInternals.idleThreshold = settings.threshold || 60000;                            // 60
  interval = Math.max(settings.interval || 1000, 1000);                                    // 60
  MonitorInternals.idleOnBlur = settings.idleOnBlur != null ? settings.idleOnBlur : false;
  monitorId = Meteor.setInterval(monitor, interval);                                       // 60
  monitorDep.changed();                                                                    // 60
  if (lastActivityTime == null) {                                                          // 79
    lastActivityTime = Deps.nonreactive(function() {                                       // 80
      return TimeSync.serverTime();                                                        //
    });                                                                                    //
    activityDep.changed();                                                                 // 80
  }                                                                                        //
  monitor();                                                                               // 60
};                                                                                         // 59
                                                                                           //
stop = function() {                                                                        // 1
  if (!monitorId) {                                                                        // 87
    throw new Error("Idle monitor is not running.");                                       // 87
  }                                                                                        //
  Meteor.clearInterval(monitorId);                                                         // 87
  monitorId = null;                                                                        // 87
  lastActivityTime = void 0;                                                               // 87
  monitorDep.changed();                                                                    // 87
  if (idle) {                                                                              // 94
    idle = false;                                                                          // 95
    idleDep.changed();                                                                     // 95
    MonitorInternals.reportActive(Deps.nonreactive(function() {                            // 95
      return TimeSync.serverTime();                                                        //
    }));                                                                                   //
  }                                                                                        //
};                                                                                         // 86
                                                                                           //
monitor = function(setAction) {                                                            // 1
  var currentTime, newIdle;                                                                // 104
  if (!monitorId) {                                                                        // 104
    return;                                                                                // 104
  }                                                                                        //
  currentTime = Deps.nonreactive(function() {                                              // 104
    return TimeSync.serverTime();                                                          //
  });                                                                                      //
  if (currentTime == null) {                                                               // 109
    return;                                                                                // 109
  }                                                                                        //
  if (setAction && (focused || !MonitorInternals.idleOnBlur)) {                            // 113
    lastActivityTime = currentTime;                                                        // 114
    activityDep.changed();                                                                 // 114
  }                                                                                        //
  newIdle = MonitorInternals.computeState(lastActivityTime, currentTime, focused);         // 104
  if (newIdle !== idle) {                                                                  // 119
    idle = newIdle;                                                                        // 120
    idleDep.changed();                                                                     // 120
  }                                                                                        //
};                                                                                         // 102
                                                                                           //
touch = function() {                                                                       // 1
  if (!monitorId) {                                                                        // 125
    Meteor._debug("Cannot touch as idle monitor is not running.");                         // 126
    return;                                                                                // 127
  }                                                                                        //
  return monitor(true);                                                                    //
};                                                                                         // 124
                                                                                           //
isIdle = function() {                                                                      // 1
  idleDep.depend();                                                                        // 131
  return idle;                                                                             // 132
};                                                                                         // 130
                                                                                           //
isMonitoring = function() {                                                                // 1
  monitorDep.depend();                                                                     // 135
  return monitorId != null;                                                                // 136
};                                                                                         // 134
                                                                                           //
lastActivity = function() {                                                                // 1
  if (!isMonitoring()) {                                                                   // 139
    return;                                                                                // 139
  }                                                                                        //
  activityDep.depend();                                                                    // 139
  return lastActivityTime;                                                                 // 141
};                                                                                         // 138
                                                                                           //
Meteor.startup(function() {                                                                // 1
  var wasConnected;                                                                        // 146
  $(window).on("click keydown", function() {                                               // 146
    return monitor(true);                                                                  //
  });                                                                                      //
  $(window).blur(MonitorInternals.onWindowBlur);                                           // 146
  $(window).focus(MonitorInternals.onWindowFocus);                                         // 146
  if (Meteor.isCordova) {                                                                  // 156
    document.addEventListener("pause", MonitorInternals.onWindowBlur);                     // 157
    document.addEventListener("resume", MonitorInternals.onWindowFocus);                   // 157
  }                                                                                        //
  focused = document.hasFocus();                                                           // 146
  Deps.autorun(function() {                                                                // 146
    if (!isMonitoring()) {                                                                 // 167
      return;                                                                              // 167
    }                                                                                      //
    if (isIdle()) {                                                                        // 172
      MonitorInternals.reportIdle(lastActivityTime);                                       // 173
    } else {                                                                               //
      MonitorInternals.reportActive(lastActivityTime);                                     // 176
    }                                                                                      //
  });                                                                                      //
  wasConnected = Meteor.status().connected;                                                // 146
  return Deps.autorun(function() {                                                         //
    var connected;                                                                         // 182
    connected = Meteor.status().connected;                                                 // 182
    MonitorInternals.connectionChange(connected, wasConnected);                            // 182
    wasConnected = connected;                                                              // 182
  });                                                                                      //
});                                                                                        // 143
                                                                                           //
UserStatus = {                                                                             // 1
  startMonitor: start,                                                                     // 189
  stopMonitor: stop,                                                                       // 189
  pingMonitor: touch,                                                                      // 189
  isIdle: isIdle,                                                                          // 189
  isMonitoring: isMonitoring,                                                              // 189
  lastActivity: lastActivity                                                               // 189
};                                                                                         //
                                                                                           //
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['mizzao:user-status'] = {}, {
  UserStatus: UserStatus,
  MonitorInternals: MonitorInternals
});

})();
