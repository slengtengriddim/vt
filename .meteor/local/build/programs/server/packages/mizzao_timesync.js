(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"mizzao:timesync":{"timesync-server.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/mizzao_timesync/timesync-server.js                                                           //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
// Use rawConnectHandlers so we get a response as quickly as possible                                    //
// https://github.com/meteor/meteor/blob/devel/packages/webapp/webapp_server.js                          //
                                                                                                         //
WebApp.rawConnectHandlers.use("/_timesync", function (req, res, next) {                                  // 4
  // Never ever cache this, otherwise weird times are shown on reload                                    //
  // http://stackoverflow.com/q/18811286/586086                                                          //
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");                                 // 8
  res.setHeader("Pragma", "no-cache");                                                                   // 9
  res.setHeader("Expires", 0);                                                                           // 10
                                                                                                         //
  // Avoid MIME type warnings in browsers                                                                //
  res.setHeader("Content-Type", "text/plain");                                                           // 5
                                                                                                         //
  // Cordova lives in a local webserver, so it does CORS                                                 //
  // we need to bless it's requests in order for it to accept our results                                //
  // Match http://localhost:<port> for Cordova clients in Meteor 1.3                                     //
  // and http://meteor.local for earlier versions                                                        //
  var origin = req.headers.origin;                                                                       // 5
                                                                                                         //
  if (origin && (origin === 'http://meteor.local' || /^http:\/\/localhost:1[23]\d\d\d$/.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);                                                // 23
  }                                                                                                      //
                                                                                                         //
  res.end(Date.now().toString());                                                                        // 26
});                                                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/mizzao:timesync/timesync-server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mizzao:timesync'] = {};

})();

//# sourceMappingURL=mizzao_timesync.js.map
