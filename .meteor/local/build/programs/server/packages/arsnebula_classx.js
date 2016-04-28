(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var ClassX;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/arsnebula_classx/packages/arsnebula_classx.js            //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/arsnebula:classx/lib/js/classx.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
ClassX = {};                                                                                                           // 1
                                                                                                                       // 2
ClassX.extend = function(base, ext) {                                                                                  // 3
                                                                                                                       // 4
  var baseP = base.prototype;                                                                                          // 5
  var childP = Object.create(baseP);                                                                                   // 6
  ext.call(childP, baseP);                                                                                             // 7
                                                                                                                       // 8
  var constructor;                                                                                                     // 9
  if ( !childP.hasOwnProperty("constructor") ) {                                                                       // 10
    constructor = function() {                                                                                         // 11
      if ( typeof base !== 'undefined' && base.hasOwnProperty("constructor") ) { base.constructor.call(this); }        // 12
    };                                                                                                                 // 13
  }                                                                                                                    // 14
  else {                                                                                                               // 15
    constructor = childP.constructor;                                                                                  // 16
  }                                                                                                                    // 17
                                                                                                                       // 18
  constructor.prototype = childP;                                                                                      // 19
  return constructor;                                                                                                  // 20
                                                                                                                       // 21
};                                                                                                                     // 22
                                                                                                                       // 23
ClassX.Exception = ClassX.extend(Error, function(base) {                                                               // 24
                                                                                                                       // 25
  this.constructor = function Exception(message) {                                                                     // 26
                                                                                                                       // 27
    this.name = this.constructor.name;                                                                                 // 28
    this.type = this.constructor.name;                                                                                 // 29
    this.message = message;                                                                                            // 30
                                                                                                                       // 31
    if (Error.captureStackTrace) {                                                                                     // 32
      Error.captureStackTrace(this, this.constructor);                                                                 // 33
    } else {                                                                                                           // 34
      var stack = new Error().stack;                                                                                   // 35
      if (typeof stack === "string") {                                                                                 // 36
        stack = stack.split("\n");                                                                                     // 37
        stack.shift();                                                                                                 // 38
        this.stack = stack.join("\n");                                                                                 // 39
      }                                                                                                                // 40
    }                                                                                                                  // 41
  }                                                                                                                    // 42
                                                                                                                       // 43
});                                                                                                                    // 44
                                                                                                                       // 45
ClassX.Class = ClassX.extend(Object, function() {                                                                      // 46
                                                                                                                       // 47
  this.__globalEvents = {};                                                                                            // 48
                                                                                                                       // 49
  this.raiseEvent = function (event, data, global) {                                                                   // 50
    function raiseEvents(target) {                                                                                     // 51
      if ( typeof target[event]  !== 'undefined' ) {                                                                   // 52
        for (var i = target[event].length - 1; i >= 0; i -= 1) {                                                       // 53
          var callback = target[event][i];                                                                             // 54
          if ( typeof callback !== 'undefined' && callback instanceof Function ) {                                     // 55
            callback(data);                                                                                            // 56
          }                                                                                                            // 57
        }                                                                                                              // 58
      }                                                                                                                // 59
    }                                                                                                                  // 60
    global = ( typeof global === 'undefined' ) ? false : true;                                                         // 61
    if ( typeof this.__globalEvents[event]  !== 'undefined' && global === true ) { raiseEvents(this.__globalEvents); } // 62
    if ( typeof this.__localEvents[event]  !== 'undefined' ) { raiseEvents(this.__localEvents); }                      // 63
  };                                                                                                                   // 64
                                                                                                                       // 65
  this.addEventListener = function (event, callback, global) {                                                         // 66
    function addEventListener(target) {                                                                                // 67
      if ( typeof target[event] === 'undefined' ) { target[event] = []; }                                              // 68
      target[event].push(callback);                                                                                    // 69
    }                                                                                                                  // 70
    global = ( typeof global === 'undefined' ) ? false : true;                                                         // 71
    if ( global === true ) { addEventListener(this.__globalEvents); }                                                  // 72
    else { addEventListener(this.__localEvents); }                                                                     // 73
  };                                                                                                                   // 74
                                                                                                                       // 75
  this.removeEventListener = function (event, callback, global) {                                                      // 76
    function removeEventListener(target) {                                                                             // 77
      if ( typeof target[event]  === 'undefined' ) { return; }                                                         // 78
      for (var i = target[event].length - 1; i >= 0; i -= 1) {                                                         // 79
        if ( target[event][i] === callback ) {                                                                         // 80
          target[event].splice(i, 1);                                                                                  // 81
          break;                                                                                                       // 82
        }                                                                                                              // 83
      }                                                                                                                // 84
    }                                                                                                                  // 85
    global = ( typeof global === 'undefined' ) ? false : true;                                                         // 86
    if ( global === true ) { removeEventListener(this.__globalEvents); }                                               // 87
    else { removeEventListener(this.__localEvents); }                                                                  // 88
  }                                                                                                                    // 89
                                                                                                                       // 90
  this.constructor = function Class() {                                                                                // 91
    this.__localEvents = {};                                                                                           // 92
  };                                                                                                                   // 93
});                                                                                                                    // 94
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/arsnebula:classx/lib/js/classx.argument.exceptions.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
* The exception that is thrown when one of the arguments provided to a method is not valid.                            // 2
*/                                                                                                                     // 3
ClassX.ArgumentException = ClassX.extend(ClassX.Exception, function(base) {                                            // 4
  this.constructor = function ArgumentException(argName, message) {                                                    // 5
    if ( ! message ) {                                                                                                 // 6
      message = "The argument is invalid";                                                                             // 7
      if ( argName && typeof argName === "string" ) { message = message + ": " + argName; }                            // 8
    }                                                                                                                  // 9
    base.constructor.call(this, message);                                                                              // 10
    this.argName = argName;                                                                                            // 11
  }                                                                                                                    // 12
});                                                                                                                    // 13
                                                                                                                       // 14
/**                                                                                                                    // 15
* The exception that is thrown when a required argument provided to a method is null.                                  // 16
*/                                                                                                                     // 17
ClassX.ArgumentNullException = ClassX.extend(ClassX.ArgumentException, function(base) {                                // 18
  this.constructor = function ArgumentNullException(argName, message) {                                                // 19
    if ( ! message ) {                                                                                                 // 20
      message = "The argument is null or undefined";                                                                   // 21
      if ( argName && typeof argName === "string" ) { message = message + ": " + argName; }                            // 22
    }                                                                                                                  // 23
    base.constructor.call(this, argName, message);                                                                     // 24
  }                                                                                                                    // 25
});                                                                                                                    // 26
                                                                                                                       // 27
/**                                                                                                                    // 28
* The exception thrown when an argument is outside the range of acceptable values.                                     // 29
*/                                                                                                                     // 30
ClassX.ArgumentOutOfRangeException = ClassX.extend(ClassX.ArgumentException, function(base) {                          // 31
  this.constructor = function ArgumentOutOfRangeException(argName, message) {                                          // 32
    if ( ! message ) {                                                                                                 // 33
      message = "The argument is outside the range of acceptable values";                                              // 34
      if ( argName && typeof argName === "string" ) { message = message + ": " + argName; }                            // 35
    }                                                                                                                  // 36
    base.constructor.call(this, argName, message);                                                                     // 37
  }                                                                                                                    // 38
});                                                                                                                    // 39
                                                                                                                       // 40
/**                                                                                                                    // 41
* The exception that is thrown when the format of an argument is invalid.                                              // 42
*/                                                                                                                     // 43
ClassX.ArgumentFormatException = ClassX.extend(ClassX.ArgumentException, function(base) {                              // 44
  this.constructor = function ArgumentFormatException(argName, message) {                                              // 45
    if ( ! message ) {                                                                                                 // 46
      message = "The format of the argument is invalid";                                                               // 47
      if ( argName && typeof argName === "string" ) { message = message + ": " + argName; }                            // 48
    }                                                                                                                  // 49
    base.constructor.call(this, argName, message);                                                                     // 50
  }                                                                                                                    // 51
});                                                                                                                    // 52
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['arsnebula:classx'] = {}, {
  ClassX: ClassX
});

})();

//# sourceMappingURL=arsnebula_classx.js.map
