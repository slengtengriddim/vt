(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Template = Package.templating.Template;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/mfactory_admin-lte/packages/mfactory_admin-lte.js                                     //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
(function () {                                                                                    // 1
                                                                                                  // 2
/////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                         //     // 4
// packages/mfactory:admin-lte/template.admin-lte.js                                       //     // 5
//                                                                                         //     // 6
/////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                           //     // 8
                                                                                           // 1   // 9
Template.__checkName("AdminLTE");                                                          // 2   // 10
Template["AdminLTE"] = new Template("Template.AdminLTE", (function() {                     // 3   // 11
  var view = this;                                                                         // 4   // 12
  return Blaze.Unless(function() {                                                         // 5   // 13
    return Spacebars.call(view.lookup("isReady"));                                         // 6   // 14
  }, function() {                                                                          // 7   // 15
    return [ "\n    ", Blaze._TemplateWith(function() {                                    // 8   // 16
      return {                                                                             // 9   // 17
        template: Spacebars.call(view.lookup("loadingTemplate"))                           // 10  // 18
      };                                                                                   // 11  // 19
    }, function() {                                                                        // 12  // 20
      return Spacebars.include(function() {                                                // 13  // 21
        return Spacebars.call(Template.__dynamic);                                         // 14  // 22
      });                                                                                  // 15  // 23
    }), "\n  " ];                                                                          // 16  // 24
  }, function() {                                                                          // 17  // 25
    return [ "\n    ", HTML.DIV({                                                          // 18  // 26
      "class": function() {                                                                // 19  // 27
        return [ "skin-", Spacebars.mustache(view.lookup("skin")) ];                       // 20  // 28
      }                                                                                    // 21  // 29
    }, "\n      ", HTML.DIV({                                                              // 22  // 30
      "class": "wrapper"                                                                   // 23  // 31
    }, "\n        ", Blaze._InOuterTemplateScope(view, function() {                        // 24  // 32
      return Spacebars.include(function() {                                                // 25  // 33
        return Spacebars.call(view.templateContentBlock);                                  // 26  // 34
      });                                                                                  // 27  // 35
    }), "\n      "), "\n    "), "\n  " ];                                                  // 28  // 36
  });                                                                                      // 29  // 37
}));                                                                                       // 30  // 38
                                                                                           // 31  // 39
Template.__checkName("AdminLTE_loading");                                                  // 32  // 40
Template["AdminLTE_loading"] = new Template("Template.AdminLTE_loading", (function() {     // 33  // 41
  var view = this;                                                                         // 34  // 42
  return HTML.Raw("<b>Loading</b>");                                                       // 35  // 43
}));                                                                                       // 36  // 44
                                                                                           // 37  // 45
/////////////////////////////////////////////////////////////////////////////////////////////     // 46
                                                                                                  // 47
}).call(this);                                                                                    // 48
                                                                                                  // 49
                                                                                                  // 50
                                                                                                  // 51
                                                                                                  // 52
                                                                                                  // 53
                                                                                                  // 54
(function () {                                                                                    // 55
                                                                                                  // 56
/////////////////////////////////////////////////////////////////////////////////////////////     // 57
//                                                                                         //     // 58
// packages/mfactory:admin-lte/admin-lte.js                                                //     // 59
//                                                                                         //     // 60
/////////////////////////////////////////////////////////////////////////////////////////////     // 61
                                                                                           //     // 62
var screenSizes = {                                                                        // 1   // 63
  xs: 480,                                                                                 // 2   // 64
  sm: 768,                                                                                 // 3   // 65
  md: 992,                                                                                 // 4   // 66
  lg: 1200                                                                                 // 5   // 67
};                                                                                         // 6   // 68
                                                                                           // 7   // 69
Template.AdminLTE.onCreated(function () {                                                  // 8   // 70
  var self = this;                                                                         // 9   // 71
  var skin = 'blue';                                                                       // 10  // 72
  var fixed = false;                                                                       // 11  // 73
  var sidebarMini = false;                                                                 // 12  // 74
                                                                                           // 13  // 75
  if (this.data) {                                                                         // 14  // 76
    skin = this.data.skin || skin;                                                         // 15  // 77
    fixed = this.data.fixed || fixed;                                                      // 16  // 78
    sidebarMini = this.data.sidebarMini || sidebarMini;                                    // 17  // 79
  }                                                                                        // 18  // 80
                                                                                           // 19  // 81
  self.isReady = new ReactiveVar(false);                                                   // 20  // 82
  self.style = waitOnCSS(cssUrl());                                                        // 21  // 83
  self.skin = waitOnCSS(skinUrl(skin));                                                    // 22  // 84
                                                                                           // 23  // 85
  fixed && $('body').addClass('fixed');                                                    // 24  // 86
  sidebarMini && $('body').addClass('sidebar-mini');                                       // 25  // 87
  self.removeClasses = function () {                                                       // 26  // 88
    fixed && $('body').removeClass('fixed');                                               // 27  // 89
    sidebarMini && $('body').removeClass('sidebar-mini');                                  // 28  // 90
  }                                                                                        // 29  // 91
                                                                                           // 30  // 92
  this.autorun(function () {                                                               // 31  // 93
    if (self.style.ready() && self.skin.ready()) {                                         // 32  // 94
      self.isReady.set(true);                                                              // 33  // 95
    }                                                                                      // 34  // 96
  });                                                                                      // 35  // 97
});                                                                                        // 36  // 98
                                                                                           // 37  // 99
Template.AdminLTE.onDestroyed(function () {                                                // 38  // 100
  this.removeClasses();                                                                    // 39  // 101
  this.style.remove();                                                                     // 40  // 102
  this.skin.remove();                                                                      // 41  // 103
});                                                                                        // 42  // 104
                                                                                           // 43  // 105
Template.AdminLTE.helpers({                                                                // 44  // 106
  isReady: function () {                                                                   // 45  // 107
    return Template.instance().isReady.get();                                              // 46  // 108
  },                                                                                       // 47  // 109
                                                                                           // 48  // 110
  loadingTemplate: function () {                                                           // 49  // 111
    return this.loadingTemplate || 'AdminLTE_loading';                                     // 50  // 112
  },                                                                                       // 51  // 113
                                                                                           // 52  // 114
  skin: function () {                                                                      // 53  // 115
    return this.skin || 'blue';                                                            // 54  // 116
  }                                                                                        // 55  // 117
});                                                                                        // 56  // 118
                                                                                           // 57  // 119
Template.AdminLTE.events({                                                                 // 58  // 120
  'click [data-toggle=offcanvas]': function (e, t) {                                       // 59  // 121
    e.preventDefault();                                                                    // 60  // 122
                                                                                           // 61  // 123
    //Enable sidebar push menu                                                             // 62  // 124
    if ($(window).width() > (screenSizes.sm - 1)) {                                        // 63  // 125
      $("body").toggleClass('sidebar-collapse');                                           // 64  // 126
    }                                                                                      // 65  // 127
    //Handle sidebar push menu for small screens                                           // 66  // 128
    else {                                                                                 // 67  // 129
      if ($("body").hasClass('sidebar-open')) {                                            // 68  // 130
        $("body").removeClass('sidebar-open');                                             // 69  // 131
        $("body").removeClass('sidebar-collapse')                                          // 70  // 132
      } else {                                                                             // 71  // 133
        $("body").addClass('sidebar-open');                                                // 72  // 134
      }                                                                                    // 73  // 135
    }                                                                                      // 74  // 136
  },                                                                                       // 75  // 137
                                                                                           // 76  // 138
  'click .content-wrapper': function (e, t) {                                              // 77  // 139
    //Enable hide menu when clicking on the content-wrapper on small screens               // 78  // 140
    if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) { // 79  // 141
      $("body").removeClass('sidebar-open');                                               // 80  // 142
    }                                                                                      // 81  // 143
  },                                                                                       // 82  // 144
                                                                                           // 83  // 145
  'click .sidebar li a': function (e, t) {                                                 // 84  // 146
    //Get the clicked link and the next element                                            // 85  // 147
    var $this = $(e.currentTarget);                                                        // 86  // 148
    var checkElement = $this.next();                                                       // 87  // 149
                                                                                           // 88  // 150
    //Check if the next element is a menu and is visible                                   // 89  // 151
    if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {            // 90  // 152
      //Close the menu                                                                     // 91  // 153
      checkElement.slideUp('normal', function () {                                         // 92  // 154
        checkElement.removeClass('menu-open');                                             // 93  // 155
      });                                                                                  // 94  // 156
      checkElement.parent("li").removeClass("active");                                     // 95  // 157
    }                                                                                      // 96  // 158
    //If the menu is not visible                                                           // 97  // 159
    else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {      // 98  // 160
      //Get the parent menu                                                                // 99  // 161
      var parent = $this.parents('ul').first();                                            // 100
      //Close all open menus within the parent                                             // 101
      var ul = parent.find('ul:visible').slideUp('normal');                                // 102
      //Remove the menu-open class from the parent                                         // 103
      ul.removeClass('menu-open');                                                         // 104
      //Get the parent li                                                                  // 105
      var parent_li = $this.parent("li");                                                  // 106
                                                                                           // 107
      //Open the target menu and add the menu-open class                                   // 108
      checkElement.slideDown('normal', function () {                                       // 109
        //Add the class active to the parent li                                            // 110
        checkElement.addClass('menu-open');                                                // 111
        parent.find('li.active').removeClass('active');                                    // 112
        parent_li.addClass('active');                                                      // 113
      });                                                                                  // 114
    }                                                                                      // 115
    //if this isn't a link, prevent the page from being redirected                         // 116
    if (checkElement.is('.treeview-menu')) {                                               // 117
      e.preventDefault();                                                                  // 118
    }                                                                                      // 119
  }                                                                                        // 120
});                                                                                        // 121
                                                                                           // 122
function cssUrl () {                                                                       // 123
  return Meteor.absoluteUrl('packages/mfactory_admin-lte/css/AdminLTE.min.css');           // 124
}                                                                                          // 125
                                                                                           // 126
function skinUrl (name) {                                                                  // 127
  return Meteor.absoluteUrl(                                                               // 128
    'packages/mfactory_admin-lte/css/skins/skin-' + name + '.min.css');                    // 129
}                                                                                          // 130
                                                                                           // 131
function waitOnCSS (url, timeout) {                                                        // 132
  var isLoaded = new ReactiveVar(false);                                                   // 133
  timeout = timeout || 5000;                                                               // 134
                                                                                           // 135
  var link = document.createElement('link');                                               // 136
  link.type = 'text/css';                                                                  // 137
  link.rel = 'stylesheet';                                                                 // 138
  link.href = url;                                                                         // 139
                                                                                           // 140
  link.onload = function () {                                                              // 141
    isLoaded.set(true);                                                                    // 142
  };                                                                                       // 143
                                                                                           // 144
  if (link.addEventListener) {                                                             // 145
    link.addEventListener('load', function () {                                            // 146
      isLoaded.set(true);                                                                  // 147
    }, false);                                                                             // 148
  }                                                                                        // 149
                                                                                           // 150
  link.onreadystatechange = function () {                                                  // 151
    var state = link.readyState;                                                           // 152
    if (state === 'loaded' || state === 'complete') {                                      // 153
      link.onreadystatechange = null;                                                      // 154
      isLoaded.set(true);                                                                  // 155
    }                                                                                      // 156
  };                                                                                       // 157
                                                                                           // 158
  var cssnum = document.styleSheets.length;                                                // 159
  var ti = setInterval(function () {                                                       // 160
    if (document.styleSheets.length > cssnum) {                                            // 161
      isLoaded.set(true);                                                                  // 162
      clearInterval(ti);                                                                   // 163
    }                                                                                      // 164
  }, 10);                                                                                  // 165
                                                                                           // 166
  setTimeout(function () {                                                                 // 167
    isLoaded.set(true);                                                                    // 168
  }, timeout);                                                                             // 169
                                                                                           // 170
  $(document.head).append(link);                                                           // 171
                                                                                           // 172
  return {                                                                                 // 173
    ready: function () {                                                                   // 174
      return isLoaded.get();                                                               // 175
    },                                                                                     // 176
                                                                                           // 177
    remove: function () {                                                                  // 178
      $('link[url="' + url + '"]').remove();                                               // 179
    }                                                                                      // 180
  };                                                                                       // 181
}                                                                                          // 182
                                                                                           // 183
/////////////////////////////////////////////////////////////////////////////////////////////     // 246
                                                                                                  // 247
}).call(this);                                                                                    // 248
                                                                                                  // 249
////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mfactory:admin-lte'] = {};

})();
