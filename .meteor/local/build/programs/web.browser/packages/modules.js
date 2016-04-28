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
var _ = Package.underscore._;
var meteorInstall = Package['modules-runtime'].meteorInstall;

/* Package-scope variables */
var Buffer, process;

var require = meteorInstall({"node_modules":{"meteor":{"modules":{"client.js":["./install-packages.js","./stubs.js","./buffer.js","./process.js","./css",function(require,exports){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/modules/client.js                                             //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
require("./install-packages.js");                                         // 1
require("./stubs.js");                                                    // 2
require("./buffer.js");                                                   // 3
require("./process.js");                                                  // 4
                                                                          // 5
exports.addStyles = require("./css").addStyles;                           // 6
                                                                          // 7
////////////////////////////////////////////////////////////////////////////

}],"buffer.js":["buffer",function(require){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/modules/buffer.js                                             //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
try {                                                                     // 1
  Buffer = global.Buffer || require("buffer").Buffer;                     // 2
} catch (noBuffer) {}                                                     // 3
                                                                          // 4
////////////////////////////////////////////////////////////////////////////

}],"css.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/modules/css.js                                                //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
var doc = document;                                                       // 1
var head = doc.getElementsByTagName("head").item(0);                      // 2
                                                                          // 3
exports.addStyles = function (css) {                                      // 4
  var style = doc.createElement("style");                                 // 5
                                                                          // 6
  style.setAttribute("type", "text/css");                                 // 7
                                                                          // 8
  // https://msdn.microsoft.com/en-us/library/ms535871(v=vs.85).aspx      // 9
  var internetExplorerSheetObject =                                       // 10
    style.sheet || // Edge/IE11.                                          // 11
    style.styleSheet; // Older IEs.                                       // 12
                                                                          // 13
  if (internetExplorerSheetObject) {                                      // 14
    internetExplorerSheetObject.cssText = css;                            // 15
  } else {                                                                // 16
    style.appendChild(doc.createTextNode(css));                           // 17
  }                                                                       // 18
                                                                          // 19
  return head.appendChild(style);                                         // 20
};                                                                        // 21
                                                                          // 22
////////////////////////////////////////////////////////////////////////////

},"install-packages.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/modules/install-packages.js                                   //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
function install(name) {                                                  // 1
  var meteorDir = {};                                                     // 2
                                                                          // 3
  // Given a package name <name>, install a stub module in the            // 4
  // /node_modules/meteor directory called <name>.js, so that             // 5
  // require.resolve("meteor/<name>") will always return                  // 6
  // /node_modules/meteor/<name>.js instead of something like             // 7
  // /node_modules/meteor/<name>/index.js, in the rare but possible event
  // that the package contains a file called index.js (#6590).            // 9
  meteorDir[name + ".js"] = function (r, e, module) {                     // 10
    module.exports = Package[name];                                       // 11
  };                                                                      // 12
                                                                          // 13
  meteorInstall({                                                         // 14
    node_modules: {                                                       // 15
      meteor: meteorDir                                                   // 16
    }                                                                     // 17
  });                                                                     // 18
}                                                                         // 19
                                                                          // 20
// This file will be modified during computeJsOutputFilesMap to include   // 21
// install(<name>) calls for every Meteor package.                        // 22
                                                                          // 23
install("underscore");                                                    // 24
install("meteor");                                                        // 25
install("meteor-base");                                                   // 26
install("mobile-experience");                                             // 27
install("babel-compiler");                                                // 28
install("ecmascript");                                                    // 29
install("base64");                                                        // 30
install("ejson");                                                         // 31
install("id-map");                                                        // 32
install("ordered-dict");                                                  // 33
install("tracker");                                                       // 34
install("modules-runtime");                                               // 35
install("modules");                                                       // 36
install("es5-shim");                                                      // 37
install("promise");                                                       // 38
install("ecmascript-runtime");                                            // 39
install("babel-runtime");                                                 // 40
install("random");                                                        // 41
install("mongo-id");                                                      // 42
install("diff-sequence");                                                 // 43
install("geojson-utils");                                                 // 44
install("minimongo");                                                     // 45
install("check");                                                         // 46
install("retry");                                                         // 47
install("ddp-common");                                                    // 48
install("reload");                                                        // 49
install("ddp-client");                                                    // 50
install("ddp");                                                           // 51
install("ddp-server");                                                    // 52
install("allow-deny");                                                    // 53
install("mongo");                                                         // 54
install("blaze-html-templates");                                          // 55
install("reactive-dict");                                                 // 56
install("session");                                                       // 57
install("jquery");                                                        // 58
install("reactive-var");                                                  // 59
install("logging");                                                       // 60
install("deps");                                                          // 61
install("htmljs");                                                        // 62
install("observe-sequence");                                              // 63
install("blaze");                                                         // 64
install("spacebars");                                                     // 65
install("anti:fake");                                                     // 66
install("ddp-rate-limiter");                                              // 67
install("localstorage");                                                  // 68
install("callback-hook");                                                 // 69
install("accounts-base");                                                 // 70
install("coffeescript");                                                  // 71
install("url");                                                           // 72
install("http");                                                          // 73
install("mizzao:timesync");                                               // 74
install("mizzao:user-status");                                            // 75
install("npm-bcrypt");                                                    // 76
install("sha");                                                           // 77
install("srp");                                                           // 78
install("accounts-password");                                             // 79
install("service-configuration");                                         // 80
install("templating");                                                    // 81
install("useraccounts:core");                                             // 82
install("kadira:flow-router");                                            // 83
install("kadira:blaze-layout");                                           // 84
install("softwarerero:accounts-t9n");                                     // 85
install("useraccounts:flow-routing");                                     // 86
install("useraccounts:bootstrap");                                        // 87
install("zimme:active-route");                                            // 88
install("alanning:roles");                                                // 89
install("arillo:flow-router-helpers");                                    // 90
install("aldeed:simple-schema");                                          // 91
install("raix:eventemitter");                                             // 92
install("aldeed:collection2-core");                                       // 93
install("aldeed:schema-index");                                           // 94
install("aldeed:schema-deny");                                            // 95
install("aldeed:collection2");                                            // 96
install("livedata");                                                      // 97
install("ui");                                                            // 98
install("momentjs:moment");                                               // 99
install("aldeed:autoform");                                               // 100
install("fastclick");                                                     // 101
install("chrismbeckett:toastr");                                          // 102
install("fortawesome:fontawesome");                                       // 103
install("ramda:ramda");                                                   // 104
install("standard-minifier-css");                                         // 105
install("standard-minifier-js");                                          // 106
install("d3js:d3");                                                       // 107
install("nvd3:nvd3");                                                     // 108
install("autoupdate");                                                    // 109
install("meteor-platform");                                               // 110
install("arsnebula:classx");                                              // 111
install("webapp");                                                        // 112
install("launch-screen");                                                 // 113
install("arsnebula:darwin");                                              // 114
install("meteorhacks:meteorx");                                           // 115
install("meteorhacks:unblock");                                           // 116
install("reywood:publish-composite");                                     // 117
install("aldeed:template-extension");                                     // 118
install("raix:handlebar-helpers");                                        // 119
install("aldeed:tabular");                                                // 120
install("twbs:bootstrap");                                                // 121
install("mfactory:admin-lte");                                            // 122
install("less");                                                          // 123
install("sach:flow-db-admin");                                            // 124
install("natestrauser:animate-css");                                      // 125
install("webtempest:animate");                                            // 126
install("fourseven:scss");                                                // 127
install("hot-code-push");                                                 // 128
install("mdg:validation-error");                                          // 129
                                                                          // 130
////////////////////////////////////////////////////////////////////////////

},"process.js":["process",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/modules/process.js                                            //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
try {                                                                     // 1
  // The application can run `npm install process` to provide its own     // 2
  // process stub; otherwise this module will provide a partial stub.     // 3
  process = global.process || require("process");                         // 4
} catch (noProcess) {                                                     // 5
  process = {};                                                           // 6
}                                                                         // 7
                                                                          // 8
if (Meteor.isServer) {                                                    // 9
  // Make require("process") work on the server in all versions of Node.  // 10
  meteorInstall({                                                         // 11
    node_modules: {                                                       // 12
      "process.js": function (r, e, module) {                             // 13
        module.exports = process;                                         // 14
      }                                                                   // 15
    }                                                                     // 16
  });                                                                     // 17
} else {                                                                  // 18
  process.platform = "browser";                                           // 19
  process.nextTick = process.nextTick || Meteor._setImmediate;            // 20
}                                                                         // 21
                                                                          // 22
if (typeof process.env !== "object") {                                    // 23
  process.env = {};                                                       // 24
}                                                                         // 25
                                                                          // 26
_.extend(process.env, meteorEnv);                                         // 27
                                                                          // 28
////////////////////////////////////////////////////////////////////////////

}],"stubs.js":["meteor-node-stubs",function(require){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/modules/stubs.js                                              //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
try {                                                                     // 1
  // When meteor-node-stubs is installed in the application's root        // 2
  // node_modules directory, requiring it here installs aliases for stubs
  // for all Node built-in modules, such as fs, util, and http.           // 4
  require("meteor-node-stubs");                                           // 5
} catch (noStubs) {}                                                      // 6
                                                                          // 7
////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
var exports = require("./node_modules/meteor/modules/client.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.modules = exports, {
  meteorInstall: meteorInstall,
  Buffer: Buffer,
  process: process
});

})();
