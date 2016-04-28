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
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var ClassX = Package['arsnebula:classx'].ClassX;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package.templating.Template;
var check = Package.check.check;
var Match = Package.check.Match;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Darwin;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/arsnebula_darwin/packages/arsnebula_darwin.js                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
(function () {                                                                                                      // 1
                                                                                                                    // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                           //     // 4
// packages/arsnebula:darwin/lib/js/darwin.namespace.js                                                      //     // 5
//                                                                                                           //     // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                             //     // 8
Darwin = {};                                                                                                 // 1   // 9
                                                                                                             // 2   // 10
Darwin.settings = {                                                                                          // 3   // 11
  "trace": null      // event hook or trace callback                                                         // 4   // 12
}                                                                                                            // 5   // 13
                                                                                                             // 6   // 14
Darwin.Class = ClassX.extend(ClassX.Class, function(base) {                                                  // 7   // 15
                                                                                                             // 8   // 16
  Object.defineProperty(this, "namespace", { "get": function() { return Darwin; } });                        // 9   // 17
                                                                                                             // 10  // 18
  this._trace = function(level, msg, meta) {                                                                 // 11  // 19
    var trace = this.namespace.settings.trace;                                                               // 12  // 20
    if ( trace ) {                                                                                           // 13  // 21
      if ( typeof trace === "string" ) {                                                                     // 14  // 22
        this.raiseEvent(trace, {"level": level, "msg": msg, "meta": meta}, true);                            // 15  // 23
      }                                                                                                      // 16  // 24
      if (typeof trace === "function" ) {                                                                    // 17  // 25
        trace(level, msg, meta);                                                                             // 18  // 26
      }                                                                                                      // 19  // 27
    }                                                                                                        // 20  // 28
  }                                                                                                          // 21  // 29
                                                                                                             // 22  // 30
  this.constructor = function Class() {                                                                      // 23  // 31
    if ( base && base.constructor ) base.constructor.call(this);                                             // 24  // 32
    this.__private = this.__private || {};                                                                   // 25  // 33
  }                                                                                                          // 26  // 34
                                                                                                             // 27  // 35
});                                                                                                          // 28  // 36
                                                                                                             // 29  // 37
Darwin.Exception = ClassX.extend(ClassX.Exception, function(base) {                                          // 30  // 38
  this.constructor = function Exception(message) {                                                           // 31  // 39
    if ( base && base.constructor ) base.constructor.call(this, message);                                    // 32  // 40
  }                                                                                                          // 33  // 41
});                                                                                                          // 34  // 42
///////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 43
                                                                                                                    // 44
}).call(this);                                                                                                      // 45
                                                                                                                    // 46
                                                                                                                    // 47
                                                                                                                    // 48
                                                                                                                    // 49
                                                                                                                    // 50
                                                                                                                    // 51
(function () {                                                                                                      // 52
                                                                                                                    // 53
///////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 54
//                                                                                                           //     // 55
// packages/arsnebula:darwin/lib/js/darwin.device.js                                                         //     // 56
//                                                                                                           //     // 57
///////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 58
                                                                                                             //     // 59
Darwin.Device = ClassX.extend(Darwin.Class, function(base) {                                                 // 1   // 60
                                                                                                             // 2   // 61
  var TYPES = ["phone", "tablet", "desktop"];                                                                // 3   // 62
  var ORIENTATIONS = ["portrait", "landscape"];                                                              // 4   // 63
  var USER_AGENT;    // shared user agent string set once on startup                                         // 5   // 64
                                                                                                             // 6   // 65
  var find = function(match) {                                                                               // 7   // 66
    return USER_AGENT.indexOf(match) !== -1;                                                                 // 8   // 67
  };                                                                                                         // 9   // 68
                                                                                                             // 10  // 69
  var getScreenResolution = function() {                                                                     // 11  // 70
    return Math.max(window.screen.width, window.screen.height);                                              // 12  // 71
  };                                                                                                         // 13  // 72
                                                                                                             // 14  // 73
  var findPlatform = function() {                                                                            // 15  // 74
    var platform;                                                                                            // 16  // 75
    if ( find("iphone") || find("ipod") || find("ipad") ) { return "ios";}                                   // 17  // 76
    else if ( find("silk") ) { return "kindle"; }                                                            // 18  // 77
    else if ( find("android") ) { return "android"; }                                                        // 19  // 78
    else if ( find("blackberry") || find("bb10") || find("rim") ) { return "blackberry"; }                   // 20  // 79
    else if ( find("sailfish") ) { return "sailfish"; }                                                      // 21  // 80
    else if ( find("meego") ) { return "meego"; }                                                            // 22  // 81
    else if ( find("firefox") && find("mobile") ) { return "fxos"; }                                         // 23  // 82
    else if ( find("tizen") ) { return "tizen"; }                                                            // 24  // 83
    else if ( find("ubuntu") && ( find("mobile") || find("tablet") ) ) { return "ubuntu-touch"; }            // 25  // 84
    else if ( find("xbox") ) { return "xbox"; }                                                              // 26  // 85
    else if ( find("nintendo wii") ) { return "wii"; }                                                       // 27  // 86
    else if ( find("nintendo wiiu") ) { return "wiiu"; }                                                     // 28  // 87
    else if ( find("linux") ) { return "linux"; }                                                            // 29  // 88
    else if ( find("mac os") ) { return "mac"; }                                                             // 30  // 89
    else if ( find("windows") || find("wpdesktop") ) { return "windows"; }                                   // 31  // 90
    else { return null; }                                                                                    // 32  // 91
  };                                                                                                         // 33  // 92
                                                                                                             // 34  // 93
  var findMobile = function(platform, type) {                                                                // 35  // 94
                                                                                                             // 36  // 95
    var parseMobile = function(prefix, match, precision) {                                                   // 37  // 96
      var version = "";                                                                                      // 38  // 97
      var matched = USER_AGENT.match(match);                                                                 // 39  // 98
      if ( matched && _.isArray(matched) && matched.length === 1 ) {                                         // 40  // 99
        var numbers = matched[0].match(/\d+/g);                                                              // 41  // 100
        if ( numbers && _.isArray(numbers) ) {                                                               // 42  // 101
          var nums = ( precision < numbers.length ) ? precision : numbers.length;                            // 43  // 102
          for (var i=0; i < nums; i++) {                                                                     // 44  // 103
            version = version + numbers[i].toString();                                                       // 45  // 104
          }                                                                                                  // 46  // 105
        }                                                                                                    // 47  // 106
        return prefix + version;                                                                             // 48  // 107
      }                                                                                                      // 49  // 108
      return null;                                                                                           // 50  // 109
    }                                                                                                        // 51  // 110
                                                                                                             // 52  // 111
    switch(platform) {                                                                                       // 53  // 112
      case "ios":                                                                                            // 54  // 113
        // eg. OS 7_0 returns ios7                                                                           // 55  // 114
        return parseMobile("ios", /(OS )\d+(_\d){1,2}/ig, 1);                                                // 56  // 115
      case "android":                                                                                        // 57  // 116
        // eg. Android 4.1.2; returns android4                                                               // 58  // 117
        return parseMobile("android", /(Android )\d+(\.\d){1,2}(?=;)/ig, 1);                                 // 59  // 118
      case "windows":                                                                                        // 60  // 119
        if ( type === "phone" ) {                                                                            // 61  // 120
          //eg. Windows Phone 8.0; returns wp8                                                               // 62  // 121
          return parseMobile("wp", /(Windows Phone )\d+(\.\d){0,1}(?=;)/ig, 1);                              // 63  // 122
        }                                                                                                    // 64  // 123
    }                                                                                                        // 65  // 124
                                                                                                             // 66  // 125
    return null;                                                                                             // 67  // 126
                                                                                                             // 68  // 127
  };                                                                                                         // 69  // 128
                                                                                                             // 70  // 129
  var findType = function(platform) {                                                                        // 71  // 130
    switch(platform) {                                                                                       // 72  // 131
      case "ios":                                                                                            // 73  // 132
        if ( find("iphone" || find("ipod" )) ) { return "phone"; }                                           // 74  // 133
        else { return "tablet"; }                                                                            // 75  // 134
        break;                                                                                               // 76  // 135
      case "kindle":                                                                                         // 77  // 136
        if ( find("android") && find("mobile") ) { return "phone"; }                                         // 78  // 137
        else if ( find("android") ) { return "tablet"; }                                                     // 79  // 138
        else { return "desktop"; }                                                                           // 80  // 139
        break;                                                                                               // 81  // 140
      case "android":                                                                                        // 82  // 141
        if ( find("mobile" ) ) { return "phone"; }                                                           // 83  // 142
        else { return "tablet"; }                                                                            // 84  // 143
        break;                                                                                               // 85  // 144
      case "blackberry":                                                                                     // 86  // 145
        if ( find("tablet") ) { return "tablet"; }                                                           // 87  // 146
        else { return "phone"; }                                                                             // 88  // 147
        break;                                                                                               // 89  // 148
      case "windows":                                                                                        // 90  // 149
        if ( find("phone" ) ) { return "phone"; }                                                            // 91  // 150
        else if ( find("tablet" ) ) { return "tablet"; }                                                     // 92  // 151
        else if ( find("windows nt") && find("touch") && find("arm") ) {return "tablet"; }                   // 93  // 152
        else if ( find("windows nt") && find("touch") && getScreenResolution() <= 1440 ) {return "tablet"; } // 94  // 153
        else { return "desktop"; }                                                                           // 95  // 154
        break;                                                                                               // 96  // 155
      default:                                                                                               // 97  // 156
        if ( find("tablet") ) { return "tablet"; }                                                           // 98  // 157
        else if ( ( find("phone") || find("mobile") ) && !find("tablet") ) { return "phone"; }               // 99  // 158
        else { return "desktop"; }                                                                           // 100
    }                                                                                                        // 101
  };                                                                                                         // 102
                                                                                                             // 103
  var findOrientation = function() {                                                                         // 104
    if ( window.orientation )                                                                                // 105
      if ( window.orientation === 0 || window.orientation === 180 ) { return "portrait"; }                   // 106
      else { return "landscape"; }                                                                           // 107
    else {                                                                                                   // 108
      if ( (window.innerHeight / window.innerWidth) > 1) { return "portrait"; }                              // 109
      else { return "landscape"; }                                                                           // 110
    }                                                                                                        // 111
  };                                                                                                         // 112
                                                                                                             // 113
  var setDevice = function() {                                                                               // 114
                                                                                                             // 115
    var htmlElement = document.querySelector("html");                                                        // 116
    var platform = findPlatform();                                                                           // 117
    var type = findType(platform);                                                                           // 118
    var mobile = findMobile(platform, type);                                                                 // 119
                                                                                                             // 120
    if ( platform ) {                                                                                        // 121
      this.__private.platform.set(platform);                                                                 // 122
      htmlElement.classList.add(platform);                                                                   // 123
    }                                                                                                        // 124
                                                                                                             // 125
    if ( type ) {                                                                                            // 126
      this.__private.type.set(type);                                                                         // 127
      htmlElement.classList.add(type);                                                                       // 128
    }                                                                                                        // 129
                                                                                                             // 130
    if ( mobile ) {                                                                                          // 131
      this.__private.mobile.set(mobile);                                                                     // 132
      htmlElement.classList.add(mobile);                                                                     // 133
    }                                                                                                        // 134
                                                                                                             // 135
    // if phantomjs then add a class for that                                                                // 136
    if ( find("phantomjs") ) {                                                                               // 137
      htmlElement.classList.add("phantomjs");                                                                // 138
    }                                                                                                        // 139
                                                                                                             // 140
    // if running in an iFrame, add the iFrame name as well if set                                           // 141
    if ( window.frameElement && window.frameElement.getAttribute("name") ) {                                 // 142
      htmlElement.classList.add(window.frameElement.getAttribute("name"));                                   // 143
    }                                                                                                        // 144
                                                                                                             // 145
    // if running within a Cordova application                                                               // 146
    if ( Meteor.isCordova ) {                                                                                // 147
      htmlElement.classList.add("cordova");                                                                  // 148
    }                                                                                                        // 149
                                                                                                             // 150
  };                                                                                                         // 151
                                                                                                             // 152
  var setOrientation = function() {                                                                          // 153
                                                                                                             // 154
    var current = this.__private.orientation.get();                                                          // 155
    var orientation = findOrientation();                                                                     // 156
                                                                                                             // 157
    if ( current !== orientation ) {                                                                         // 158
                                                                                                             // 159
      this.__private.orientation.set(orientation);                                                           // 160
                                                                                                             // 161
      // just to be sure we don't get this screwed up remove both orientation options                        // 162
      // before adding the new one                                                                           // 163
      var htmlElement = document.querySelector("html");                                                      // 164
      htmlElement.classList.remove("portrait");                                                              // 165
      htmlElement.classList.remove("landscape");                                                             // 166
      htmlElement.classList.add(orientation);                                                                // 167
                                                                                                             // 168
    }                                                                                                        // 169
                                                                                                             // 170
  };                                                                                                         // 171
                                                                                                             // 172
  var compareIndex = function(current, target) {                                                             // 173
                                                                                                             // 174
    if ( current < 0 ) { return null; }                                                                      // 175
    else if ( current === target) { return 0; }                                                              // 176
    else if ( current > target ) { return 1; }                                                               // 177
    else if ( current < target ) { return -1; }                                                              // 178
                                                                                                             // 179
    return null;                                                                                             // 180
                                                                                                             // 181
  };                                                                                                         // 182
                                                                                                             // 183
  var onOrientationChange = function() {                                                                     // 184
    var ctx = this;                                                                                          // 185
    return function() {                                                                                      // 186
      setOrientation.call(ctx);                                                                              // 187
    };                                                                                                       // 188
  };                                                                                                         // 189
                                                                                                             // 190
  var watchOrientationChange = function() {                                                                  // 191
                                                                                                             // 192
    var supportsOrientation = "onorientationchange" in window;                                               // 193
    var eventName = supportsOrientation ? "orientationchange" : "resize";                                    // 194
                                                                                                             // 195
    if (window.addEventListener) {                                                                           // 196
      window.addEventListener(eventName, _.bind(setOrientation, this), false);                               // 197
    } else if (window.attachEvent) {                                                                         // 198
      window.attachEvent(eventName, _.bind(setOrientation, this));                                           // 199
    } else {                                                                                                 // 200
      window[eventName] = _.bind(setOrientation, this);                                                      // 201
    }                                                                                                        // 202
                                                                                                             // 203
    // android doesn't always raise events correctly, so we also poll                                        // 204
    if ( this.platform === "android") {                                                                      // 205
      setInterval(_.bind(setOrientation, this), 2000);                                                       // 206
    }                                                                                                        // 207
                                                                                                             // 208
  };                                                                                                         // 209
                                                                                                             // 210
  this.isPhantomJS = function() {                                                                            // 211
    if ( find("phantomjs") ) { return true; }                                                                // 212
  }                                                                                                          // 213
                                                                                                             // 214
  this.isParentFrame = function() {                                                                          // 215
    return ( window !== window.parent );                                                                     // 216
  }                                                                                                          // 217
                                                                                                             // 218
  this.compare = function(classList, ltValue, eqValue, gtValue, nullValue) {                                 // 219
                                                                                                             // 220
    ltValue = ltValue || -1;                                                                                 // 221
    eqValue = eqValue || 0;                                                                                  // 222
    gtValue = gtValue || 1;                                                                                  // 223
    nullValue = nullValue || null;                                                                           // 224
                                                                                                             // 225
    if ( classList && typeof classList === "string" ) { classList = classList.split(" "); }                  // 226
    if ( classList && _.isArray(classList) ) {                                                               // 227
      // loop through classes, if the class is a device type or orientation, the do                          // 228
      // a comparison, otherwise do a match and aggregate results                                            // 229
      var htmlElement = document.querySelector("html");                                                      // 230
      var typeCompare = null;                                                                                // 231
      var orientationCompare = null;                                                                         // 232
      for (var i = 0, length = classList.length; i < length; i++) {                                          // 233
        if ( _.contains(TYPES, classList[i]) ) {                                                             // 234
          // compare device type                                                                             // 235
          typeCompare = compareIndex(_.indexOf(TYPES, this.type), _.indexOf(TYPES, classList[i]));           // 236
        }                                                                                                    // 237
        else if ( _.contains(ORIENTATIONS, classList[i]) ) {                                                 // 238
          // compare orientation                                                                             // 239
          orientationCompare = compareIndex(_.indexOf(ORIENTATIONS, this.orientation), _.indexOf(ORIENTATIONS, classList[i]));
        }                                                                                                    // 241
        else {                                                                                               // 242
          // otherwise just look for class match, if we don't find                                           // 243
          // a match, then comparison is invalid and we can return null                                      // 244
          if ( ! htmlElement.classList.contains(classList[i]) ) { return nullValue; }                        // 245
        }                                                                                                    // 246
      }                                                                                                      // 247
                                                                                                             // 248
      // if we got this far then everything matched                                                          // 249
      // if type and orientation comparisons are null, then its a match                                      // 250
      if ( _.isNull(typeCompare) && _.isNull(orientationCompare) ) { return eqValue; }                       // 251
                                                                                                             // 252
      // otherwise if device match is not equal, then we can just return it                                  // 253
      if ( ! _.isNull(typeCompare) ) {                                                                       // 254
        if ( typeCompare > 0 ) { return gtValue; }                                                           // 255
        if ( typeCompare < 0 ) { return ltValue; }                                                           // 256
      }                                                                                                      // 257
                                                                                                             // 258
      // otherwise if we got this far either device type is equal or null,                                   // 259
      // so it all comes down to orientation                                                                 // 260
      if ( ! _.isNull(orientationCompare) ) {                                                                // 261
        if ( orientationCompare > 0 ) { return gtValue; }                                                    // 262
        if ( orientationCompare < 0 ) { return ltValue; }                                                    // 263
        if ( orientationCompare === 0 ) { return eqValue; }                                                  // 264
      }                                                                                                      // 265
    }                                                                                                        // 266
    else { throw ClassX.ArgumentFormatException("classList"); }                                              // 267
                                                                                                             // 268
  };                                                                                                         // 269
                                                                                                             // 270
  // match the class names against the current device                                                        // 271
  this.match = function(classList, trueValue, falseValue) {                                                  // 272
                                                                                                             // 273
    trueValue = trueValue || true;                                                                           // 274
    falseValue = falseValue || false;                                                                        // 275
                                                                                                             // 276
    if ( classList && typeof classList === "string" ) { classList = classList.split(" "); }                  // 277
    if ( classList && _.isArray(classList) ) {                                                               // 278
      var htmlElement = document.querySelector("html");                                                      // 279
      var match = 0;                                                                                         // 280
      for (var i = 0, length = classList.length; i < length; i++) {                                          // 281
        if ( htmlElement.classList.contains(classList[i]) ) { match = match + 1; }                           // 282
      }                                                                                                      // 283
      return ( match === classList.length ) ? trueValue : falseValue;                                        // 284
    }                                                                                                        // 285
    else { throw ClassX.ArgumentFormatException("classList"); }                                              // 286
                                                                                                             // 287
  };                                                                                                         // 288
                                                                                                             // 289
  var getPlatform = function() { return this.__private.platform.get(); }                                     // 290
  var getType = function() { return this.__private.type.get(); }                                             // 291
  var getMobile = function() { return this.__private.mobile.get(); }                                         // 292
  var getOrientation = function() { return this.__private.orientation.get(); }                               // 293
                                                                                                             // 294
  Object.defineProperty(this, "platform", {                                                                  // 295
    "get": function() { return this.__private.platform.get(); },                                             // 296
    "enumerable": true                                                                                       // 297
  });                                                                                                        // 298
                                                                                                             // 299
  Object.defineProperty(this, "mobile", {                                                                    // 300
    "get": function() { return this.__private.mobile.get(); },                                               // 301
    "enumerable": true                                                                                       // 302
  });                                                                                                        // 303
                                                                                                             // 304
  Object.defineProperty(this, "type", {                                                                      // 305
    "get": function() { return this.__private.type.get(); },                                                 // 306
    "enumerable": true                                                                                       // 307
  });                                                                                                        // 308
                                                                                                             // 309
  Object.defineProperty(this, "orientation", {                                                               // 310
    "get": function() { return this.__private.orientation.get(); },                                          // 311
    "enumerable": true                                                                                       // 312
  });                                                                                                        // 313
                                                                                                             // 314
  var registerHelpers = function() {                                                                         // 315
                                                                                                             // 316
    Template.registerHelper('deviceCompare', _.bind(this.compare, this));                                    // 317
    Template.registerHelper('deviceMatch', _.bind(this.match, this));                                        // 318
    Template.registerHelper('deviceType', _.bind(getType, this));                                            // 319
    Template.registerHelper('deviceMobile', _.bind(getMobile, this));                                        // 320
    Template.registerHelper('devicePlatform', _.bind(getPlatform, this));                                    // 321
    Template.registerHelper('deviceOrientation', _.bind(getOrientation, this));                              // 322
                                                                                                             // 323
  };                                                                                                         // 324
                                                                                                             // 325
  var onStartup = function() {                                                                               // 326
    var ctx = this;                                                                                          // 327
    return function() {                                                                                      // 328
      USER_AGENT = window.navigator.userAgent.toLowerCase();                                                 // 329
      setDevice.call(ctx);                                                                                   // 330
      setOrientation.call(ctx);                                                                              // 331
      watchOrientationChange.call(ctx);                                                                      // 332
    }                                                                                                        // 333
  }                                                                                                          // 334
                                                                                                             // 335
  this.constructor = function Device() {                                                                     // 336
                                                                                                             // 337
    // force singleton                                                                                       // 338
    if ( this.namespace.device ) { return this.namespace.device; }                                           // 339
                                                                                                             // 340
    if ( base && base.constructor ) base.constructor.call(this);                                             // 341
    this.__private.platform = new ReactiveVar();                                                             // 342
    this.__private.mobile = new ReactiveVar();                                                               // 343
    this.__private.type = new ReactiveVar();                                                                 // 344
    this.__private.orientation = new ReactiveVar();                                                          // 345
                                                                                                             // 346
    registerHelpers.call(this);                                                                              // 347
    Meteor.startup(onStartup.call(this));                                                                    // 348
                                                                                                             // 349
  };                                                                                                         // 350
                                                                                                             // 351
});                                                                                                          // 352
                                                                                                             // 353
Darwin.device = new Darwin.Device();                                                                         // 354
                                                                                                             // 355
///////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 415
                                                                                                                    // 416
}).call(this);                                                                                                      // 417
                                                                                                                    // 418
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['arsnebula:darwin'] = {}, {
  Darwin: Darwin
});

})();
