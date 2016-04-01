var require = meteorInstall({"client":{"views":{"favouriten":{"favouriten.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/favouriten/template.favouriten.js                                                                 //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("favouriten");                                                                               // 2
Template["favouriten"] = new Template("Template.favouriten", (function() {                                        // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "container"                                                                                          // 6
  }, HTML.Raw('\n    <div class="page-header clearfix">\n      <h4 class="pull-left">Favouriten</h4>\n      <div class="pull-right"></div>\n    </div>\n\n    '), HTML.UL({
    "class": "list-group"                                                                                         // 8
  }, "\n      ", Blaze.If(function() {                                                                            // 9
    return Spacebars.call(view.lookup("favourites"));                                                             // 10
  }, function() {                                                                                                 // 11
    return [ "\n        ", Blaze.Each(function() {                                                                // 12
      return Spacebars.call(view.lookup("favourites"));                                                           // 13
    }, function() {                                                                                               // 14
      return [ "\n          ", HTML.LI({                                                                          // 15
        "class": "list-group-item clearfix"                                                                       // 16
      }, "\n            ", HTML.DIV({                                                                             // 17
        "class": "media"                                                                                          // 18
      }, "\n              ", HTML.DIV({                                                                           // 19
        "class": "media-body"                                                                                     // 20
      }, "\n                ", HTML.H4({                                                                          // 21
        "class": "media-heading"                                                                                  // 22
      }, Blaze.View("lookup:term", function() {                                                                   // 23
        return Spacebars.mustache(view.lookup("term"));                                                           // 24
      })), "\n                ", Blaze.View("lookup:description", function() {                                    // 25
        return Spacebars.mustache(view.lookup("description"));                                                    // 26
      }), "\n                ", Blaze.View("lookup:createdAt", function() {                                       // 27
        return Spacebars.mustache(view.lookup("createdAt"));                                                      // 28
      }), "\n              "), "\n              ", HTML.DIV({                                                     // 29
        "class": "media-right media-middle btn-delete"                                                            // 30
      }, "\n                ", HTML.H4(HTML.I({                                                                   // 31
        "class": "fa fa-trash-o fa-2x"                                                                            // 32
      })), "\n              "), "\n            "), "\n          "), "\n        " ];                               // 33
    }), "\n      " ];                                                                                             // 34
  }, function() {                                                                                                 // 35
    return [ "\n      ", HTML.P({                                                                                 // 36
      "class": "alert alert-warning"                                                                              // 37
    }, "Keine Favouriten bisher gespeichert. Zum favourisieren von Begriffen klicke auf das Herz-Symbol neben dem jeweiligen Begriff."), "\n      " ];
  }), "\n    "), "\n\n  ");                                                                                       // 39
}));                                                                                                              // 40
                                                                                                                  // 41
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favouriten.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/favouriten/favouriten.js                                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.favouriten.onCreated(function () {                                                                       // 1
	var _this = this;                                                                                                //
                                                                                                                  //
	this.autorun(function () {                                                                                       // 2
		_this.subscribe('ownedFavourites');                                                                             // 3
		_this.subscribe('vocabularyAll');                                                                               // 4
	});                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.favouriten.helpers({                                                                                     // 9
	favourites: function () {                                                                                        // 10
		function favourites() {                                                                                         //
			var favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());                                             // 11
                                                                                                                  //
			if (Favourites.find().count() !== 0) {                                                                         // 13
				return Vocabulary.find({                                                                                      // 14
					_id: {                                                                                                       // 15
						$in: favIds                                                                                                 // 16
					}                                                                                                            //
				}, {                                                                                                          //
					sort: {                                                                                                      // 19
						term: 1                                                                                                     // 20
					}                                                                                                            //
				});                                                                                                           //
			} else {                                                                                                       //
				return null;                                                                                                  // 24
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return favourites;                                                                                              //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.favouriten.events({                                                                                      // 29
	'click .btn-delete': function () {                                                                               // 30
		function clickBtnDelete(event, template) {                                                                      //
                                                                                                                  //
			Meteor.call('deleteFavourite', this._id);                                                                      // 32
		}                                                                                                               //
                                                                                                                  //
		return clickBtnDelete;                                                                                          //
	}()                                                                                                              //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index":{"index.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/index/template.index.js                                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("index");                                                                                    // 2
Template["index"] = new Template("Template.index", (function() {                                                  // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div class="container">\n    <h1>Index - Startseite.</h1>\n<h4>TODO: </h4>\n<ul>\n  <li>TOP 5 last viewed</li>\n  <li>TOP 5 popularity on users fav lists</li>\n  <li>Vocabulary of the day</li>\n</ul>\n\n    <p>\n      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,\n      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.\n    </p>\n  </div>');
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/index/index.js                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"vokabelregister":{"search.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/vokabelregister/template.search.js                                                                //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("search");                                                                                   // 2
Template["search"] = new Template("Template.search", (function() {                                                // 3
  var view = this;                                                                                                // 4
  return [ HTML.Raw('<div class="page-header clearfix">\n    <h4 class="pull-left">Vokabelregister A - Z</h4>\n    <div class="pull-right">\n      <input type="text" name="search" class="form-control" width="300px" placeholder="Finde einen Begriff...">\n    </div>\n  </div>\n\n    '), Blaze.Unless(function() {
    return Spacebars.call(view.lookup("isAlphabetic"));                                                           // 6
  }, function() {                                                                                                 // 7
    return [ "\n    ", HTML.P({                                                                                   // 8
      "class": "alert alert-warning"                                                                              // 9
    }, "Der Suchbegriff darf nur Zeichen des Alphabets (a - Z) und Leerzeichen enthalten."), "\n    " ];          // 10
  }), "\n    ", Blaze.Unless(function() {                                                                         // 11
    return Spacebars.call(view.lookup("isLength64"));                                                             // 12
  }, function() {                                                                                                 // 13
    return [ "\n    ", HTML.P({                                                                                   // 14
      "class": "alert alert-warning"                                                                              // 15
    }, "Der Suchbegriff darf nicht mehr als 64 Zeichen enthalten."), "\n    " ];                                  // 16
  }), "\n\n  ", Blaze.If(function() {                                                                             // 17
    return Spacebars.call(view.lookup("query"));                                                                  // 18
  }, function() {                                                                                                 // 19
    return [ "\n\n  ", HTML.UL({                                                                                  // 20
      "class": "list-group"                                                                                       // 21
    }, "\n    ", Blaze.If(function() {                                                                            // 22
      return Spacebars.call(view.lookup("searching"));                                                            // 23
    }, function() {                                                                                               // 24
      return [ " ", Spacebars.include(view.lookupTemplate("loading")), " " ];                                     // 25
    }, function() {                                                                                               // 26
      return [ " ", Blaze.Each(function() {                                                                       // 27
        return Spacebars.call(view.lookup("vocabulary"));                                                         // 28
      }, function() {                                                                                             // 29
        return [ "\n    ", HTML.H3(Blaze.View("lookup:letter", function() {                                       // 30
          return Spacebars.mustache(view.lookup("letter"));                                                       // 31
        })), " ", Blaze.Each(function() {                                                                         // 32
          return Spacebars.call(view.lookup("entries"));                                                          // 33
        }, function() {                                                                                           // 34
          return [ "\n    ", HTML.LI({                                                                            // 35
            "class": "list-group-item clearfix"                                                                   // 36
          }, "\n      ", HTML.DIV({                                                                               // 37
            "class": "media"                                                                                      // 38
          }, "\n        ", HTML.DIV({                                                                             // 39
            "class": "media-body"                                                                                 // 40
          }, "\n          ", HTML.H4({                                                                            // 41
            "class": "media-heading"                                                                              // 42
          }, Blaze.View("lookup:term", function() {                                                               // 43
            return Spacebars.mustache(view.lookup("term"));                                                       // 44
          })), " ", Blaze.View("lookup:description", function() {                                                 // 45
            return Spacebars.mustache(view.lookup("description"));                                                // 46
          }), "\n        "), "\n        ", HTML.DIV({                                                             // 47
            "class": "media-right media-middle btn-fav"                                                           // 48
          }, "\n          ", HTML.H4(Blaze.If(function() {                                                        // 49
            return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));    // 50
          }, function() {                                                                                         // 51
            return [ "\n            ", HTML.I({                                                                   // 52
              "class": "fa fa-heart fa-2x"                                                                        // 53
            }), "\n            " ];                                                                               // 54
          }, function() {                                                                                         // 55
            return [ "\n            ", HTML.I({                                                                   // 56
              "class": "fa fa-heart-o fa-2x"                                                                      // 57
            }), "\n            " ];                                                                               // 58
          }), "\n          "), "\n\n        "), "\n      "), "\n      ", HTML.Comment(' <span class="pull-left"><strong>{{term}}</strong></span>\n      <span class="pull-right">{{description}}</span> '), "\n    "), "\n    " ];
        }), " " ];                                                                                                // 60
      }, function() {                                                                                             // 61
        return [ "\n    ", HTML.P({                                                                               // 62
          "class": "alert alert-warning"                                                                          // 63
        }, 'Nichts gefunden unter dem Begriff " ', Blaze.View("lookup:query", function() {                        // 64
          return Spacebars.mustache(view.lookup("query"));                                                        // 65
        }), ' ".'), "\n    " ];                                                                                   // 66
      }), " " ];                                                                                                  // 67
    }), "\n  "), "\n\n  " ];                                                                                      // 68
  }, function() {                                                                                                 // 69
    return [ "\n\n  ", HTML.DIV({                                                                                 // 70
      "class": "panel-group",                                                                                     // 71
      id: "accordion"                                                                                             // 72
    }, "\n    ", Blaze.Each(function() {                                                                          // 73
      return Spacebars.call(view.lookup("vocabulary"));                                                           // 74
    }, function() {                                                                                               // 75
      return [ "\n    ", HTML.DIV({                                                                               // 76
        "class": "panel panel-default"                                                                            // 77
      }, "\n\n      ", HTML.DIV({                                                                                 // 78
        "class": "panel-heading"                                                                                  // 79
      }, "\n        ", HTML.A({                                                                                   // 80
        "data-toggle": "collapse",                                                                                // 81
        "data-parent": "#accordion",                                                                              // 82
        href: function() {                                                                                        // 83
          return [ "#collapse", Spacebars.mustache(view.lookup("letter")) ];                                      // 84
        }                                                                                                         // 85
      }, "\n        ", HTML.H4({                                                                                  // 86
        "class": "panel-title"                                                                                    // 87
      }, "\n          ", Blaze.View("lookup:letter", function() {                                                 // 88
        return Spacebars.mustache(view.lookup("letter"));                                                         // 89
      }), "\n        "), "\n        "), "\n      "), "\n\n      ", HTML.DIV({                                     // 90
        id: function() {                                                                                          // 91
          return [ "collapse", Spacebars.mustache(view.lookup("letter")) ];                                       // 92
        },                                                                                                        // 93
        "class": "panel-collapse collapse"                                                                        // 94
      }, "\n        ", HTML.DIV({                                                                                 // 95
        "class": "panel-body"                                                                                     // 96
      }, "\n\n          ", Blaze.Each(function() {                                                                // 97
        return Spacebars.call(view.lookup("entries"));                                                            // 98
      }, function() {                                                                                             // 99
        return [ "\n          ", HTML.LI({                                                                        // 100
          "class": "list-group-item clearfix"                                                                     // 101
        }, "\n            ", HTML.DIV({                                                                           // 102
          "class": "media"                                                                                        // 103
        }, "\n              ", HTML.DIV({                                                                         // 104
          "class": "media-body"                                                                                   // 105
        }, "\n                ", HTML.H4({                                                                        // 106
          "class": "media-heading"                                                                                // 107
        }, Blaze.View("lookup:term", function() {                                                                 // 108
          return Spacebars.mustache(view.lookup("term"));                                                         // 109
        })), " ", Blaze.View("lookup:description", function() {                                                   // 110
          return Spacebars.mustache(view.lookup("description"));                                                  // 111
        }), "\n              "), "\n              ", HTML.DIV({                                                   // 112
          "class": "media-right media-middle btn-fav"                                                             // 113
        }, "\n                ", HTML.H4(Blaze.If(function() {                                                    // 114
          return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));      // 115
        }, function() {                                                                                           // 116
          return [ "\n                  ", HTML.I({                                                               // 117
            "class": "fa fa-heart fa-2x"                                                                          // 118
          }), "\n                  " ];                                                                           // 119
        }, function() {                                                                                           // 120
          return [ "\n                  ", HTML.I({                                                               // 121
            "class": "fa fa-heart-o fa-2x"                                                                        // 122
          }), "\n                  " ];                                                                           // 123
        }), "\n                "), "\n\n              "), "\n            "), "\n          "), "\n          " ];   // 124
      }), "\n\n        "), "\n      "), "\n    "), "\n    " ];                                                    // 125
    }), "\n  "), "\n\n  " ];                                                                                      // 126
  }) ];                                                                                                           // 127
}));                                                                                                              // 128
                                                                                                                  // 129
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vokabelregister.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/vokabelregister/template.vokabelregister.js                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("vokabelregister");                                                                          // 2
Template["vokabelregister"] = new Template("Template.vokabelregister", (function() {                              // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "container"                                                                                          // 6
  }, "\n\n    ", Spacebars.include(view.lookupTemplate("search")), "\n\n  ");                                     // 7
}));                                                                                                              // 8
                                                                                                                  // 9
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"search.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/vokabelregister/search.js                                                                         //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.search.onCreated(function () {                                                                           // 1
	var template = Template.instance();                                                                              // 2
                                                                                                                  //
	template.searchQuery = new ReactiveVar();                                                                        // 4
	template.searching = new ReactiveVar(false);                                                                     // 5
	template.isAlphabetic = new ReactiveVar(true);                                                                   // 6
	template.isLength64 = new ReactiveVar(true);                                                                     // 7
                                                                                                                  //
	Tracker.autorun(function () {                                                                                    // 9
		template.subscribe('vocabularyRegister', template.searchQuery.get(), function () {                              // 10
			setTimeout(function () {                                                                                       // 11
				template.searching.set(false);                                                                                // 12
			}, 300);                                                                                                       //
		});                                                                                                             //
		template.subscribe('ownedFavourites');                                                                          // 15
	});                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.registerHelper("isFavourite", function (vocabularyId) {                                                  // 19
	// console.log(vocabularyId);                                                                                    //
	var favEntry = Favourites.findOne({                                                                              // 21
		vocabularyId: vocabularyId                                                                                      // 22
	});                                                                                                              //
	if (favEntry) {                                                                                                  // 24
		return true;                                                                                                    // 25
	}                                                                                                                //
});                                                                                                               //
                                                                                                                  //
Template.search.helpers({                                                                                         // 29
	searching: function () {                                                                                         // 30
		function searching() {                                                                                          //
			return Template.instance().searching.get();                                                                    // 31
		}                                                                                                               //
                                                                                                                  //
		return searching;                                                                                               //
	}(),                                                                                                             //
	query: function () {                                                                                             // 33
		function query() {                                                                                              //
			return Template.instance().searchQuery.get();                                                                  // 34
		}                                                                                                               //
                                                                                                                  //
		return query;                                                                                                   //
	}(),                                                                                                             //
	isAlphabetic: function () {                                                                                      // 36
		function isAlphabetic() {                                                                                       //
			return Template.instance().isAlphabetic.get();                                                                 // 37
		}                                                                                                               //
                                                                                                                  //
		return isAlphabetic;                                                                                            //
	}(),                                                                                                             //
	isLength64: function () {                                                                                        // 39
		function isLength64() {                                                                                         //
			return Template.instance().isLength64.get();                                                                   // 40
		}                                                                                                               //
                                                                                                                  //
		return isLength64;                                                                                              //
	}(),                                                                                                             //
	vocabulary: function () {                                                                                        // 42
		function vocabulary() {                                                                                         //
			// Sort and group entries by letter and create a new array of iterable objects for cascaded template iteration
			var vocabularyIndexed = [];                                                                                    // 44
			var alphabet = R.split('', 'abcdefghijklmnopqrstuvwxyz'.toUpperCase());                                        // 45
			var regex = function () {                                                                                      // 46
				function regex(letter) {                                                                                      // 46
					return new RegExp("^" + letter, "i");                                                                        //
				}                                                                                                             //
                                                                                                                  //
				return regex;                                                                                                 //
			}();                                                                                                           //
                                                                                                                  //
			alphabet.forEach(function (entry) {                                                                            // 48
				var array = Vocabulary.find({                                                                                 // 49
					term: {                                                                                                      // 50
						$in: [regex(entry)]                                                                                         // 51
					}                                                                                                            //
				}, {                                                                                                          //
					sort: {                                                                                                      // 54
						term: 1                                                                                                     // 55
					}                                                                                                            //
				});                                                                                                           //
				if (array.count() !== 0) {                                                                                    // 58
					vocabularyIndexed.push({                                                                                     // 59
						'letter': entry,                                                                                            // 60
						'entries': array                                                                                            // 61
					});                                                                                                          //
				}                                                                                                             //
			});                                                                                                            //
                                                                                                                  //
			if (vocabularyIndexed) {                                                                                       // 66
				return vocabularyIndexed;                                                                                     // 67
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return vocabulary;                                                                                              //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.search.events({                                                                                          // 72
	'keyup [name="search"]': function () {                                                                           // 73
		function keyupNameSearch(event, template) {                                                                     //
			var value = event.target.value.trim();                                                                         // 74
                                                                                                                  //
			if (value !== '') {                                                                                            // 76
				// check if string is valid                                                                                   //
				if (isAlphabetic(value)) {                                                                                    // 78
					template.isAlphabetic.set(true);                                                                             // 79
				} else {                                                                                                      //
					template.isAlphabetic.set(false);                                                                            // 81
				}                                                                                                             //
				if (isLength64(value)) {                                                                                      // 83
					template.isLength64.set(true);                                                                               // 84
				} else {                                                                                                      //
					template.isLength64.set(false);                                                                              // 86
				}                                                                                                             //
			}                                                                                                              //
                                                                                                                  //
			if (value !== '' && event.keyCode === 13) {                                                                    // 90
				if (template.isAlphabetic.get() && template.isLength64.get()) {                                               // 91
					template.searchQuery.set(value);                                                                             // 92
					template.searching.set(true);                                                                                // 93
				}                                                                                                             //
			}                                                                                                              //
                                                                                                                  //
			if (value === '') {                                                                                            // 97
				template.searchQuery.set(value);                                                                              // 98
				template.isAlphabetic.set(true);                                                                              // 99
				template.isLength64.set(true);                                                                                // 100
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return keyupNameSearch;                                                                                         //
	}(),                                                                                                             //
	'click .btn-fav': function () {                                                                                  // 104
		function clickBtnFav(event, template) {                                                                         //
			Meteor.call('toggleFavourite', this._id);                                                                      // 105
		}                                                                                                               //
                                                                                                                  //
		return clickBtnFav;                                                                                             //
	}()                                                                                                              //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index_low.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/template.index_low.js                                                                             //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("indexLow");                                                                                 // 2
Template["indexLow"] = new Template("Template.indexLow", (function() {                                            // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div class="container">\n    <h1>Index LOW</h1>\n    <p>\n      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,\n      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.\n    </p>\n  </div>');
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"trainer.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/template.trainer.js                                                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("trainer");                                                                                  // 2
Template["trainer"] = new Template("Template.trainer", (function() {                                              // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div class="container">\n    <h1>Trainer</h1>\n\n    <div class="row text-center">\n      <div class="btn-group btn-group-lg" role="group" aria-label="Large button group">\n        <button type="button" class="btn btn-default">Lesen</button>\n        <button type="button" class="btn btn-default">Abfragen mit Eingabe</button>\n        <button type="button" class="btn btn-default">Abfragen ohne Eingabe</button>\n      </div>\n    </div>\n<br>\n    <p>\n      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,\n      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.\n    </p>\n  </div>');
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layout":{"bar.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.bar.js                                                                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("bar");                                                                                      // 2
Template["bar"] = new Template("Template.bar", (function() {                                                      // 3
  var view = this;                                                                                                // 4
  return HTML.A({                                                                                                 // 5
    href: function() {                                                                                            // 6
      return Blaze.If(function() {                                                                                // 7
        return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                // 8
      }, function() {                                                                                             // 9
        return Blaze.View("lookup:getSession", function() {                                                       // 10
          return Spacebars.mustache(view.lookup("getSession"), "lastPath");                                       // 11
        });                                                                                                       // 12
      }, function() {                                                                                             // 13
        return "/low";                                                                                            // 14
      });                                                                                                         // 15
    }                                                                                                             // 16
  }, "\n  ", HTML.NAV({                                                                                           // 17
    "class": function() {                                                                                         // 18
      return [ "navbar navbar-default navbar-fixed-top ", Blaze.If(function() {                                   // 19
        return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                // 20
      }, function() {                                                                                             // 21
        return "alert-success";                                                                                   // 22
      }, function() {                                                                                             // 23
        return "alert-info";                                                                                      // 24
      }), " text-center attention-mode" ];                                                                        // 25
    }                                                                                                             // 26
  }, "\n    ", HTML.DIV({                                                                                         // 27
    "class": "container"                                                                                          // 28
  }, "\n\n        ", HTML.H1(Blaze.If(function() {                                                                // 29
    return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                    // 30
  }, function() {                                                                                                 // 31
    return [ HTML.I({                                                                                             // 32
      "class": "fa fa-eye"                                                                                        // 33
    }), " Attention mode on" ];                                                                                   // 34
  }, function() {                                                                                                 // 35
    return [ " ", HTML.I({                                                                                        // 36
      "class": "fa fa-eye-slash"                                                                                  // 37
    }), " Attention mode off" ];                                                                                  // 38
  }), " "), "\n\n    "), "\n  "), "\n");                                                                          // 39
}));                                                                                                              // 40
                                                                                                                  // 41
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"basic_layout.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.basic_layout.js                                                                         //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("basicLayout");                                                                              // 2
Template["basicLayout"] = new Template("Template.basicLayout", (function() {                                      // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    id: "content"                                                                                                 // 6
  }, "\n    ", Blaze._TemplateWith(function() {                                                                   // 7
    return {                                                                                                      // 8
      template: Spacebars.call(view.lookup("bar"))                                                                // 9
    };                                                                                                            // 10
  }, function() {                                                                                                 // 11
    return Spacebars.include(function() {                                                                         // 12
      return Spacebars.call(Template.__dynamic);                                                                  // 13
    });                                                                                                           // 14
  }), "\n    ", Blaze._TemplateWith(function() {                                                                  // 15
    return {                                                                                                      // 16
      template: Spacebars.call(view.lookup("nav"))                                                                // 17
    };                                                                                                            // 18
  }, function() {                                                                                                 // 19
    return Spacebars.include(function() {                                                                         // 20
      return Spacebars.call(Template.__dynamic);                                                                  // 21
    });                                                                                                           // 22
  }), "\n    ", Blaze._TemplateWith(function() {                                                                  // 23
    return {                                                                                                      // 24
      template: Spacebars.call(view.lookup("main"))                                                               // 25
    };                                                                                                            // 26
  }, function() {                                                                                                 // 27
    return Spacebars.include(function() {                                                                         // 28
      return Spacebars.call(Template.__dynamic);                                                                  // 29
    });                                                                                                           // 30
  }), "\n  ");                                                                                                    // 31
}));                                                                                                              // 32
                                                                                                                  // 33
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"footer.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.footer.js                                                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("footer");                                                                                   // 2
Template["footer"] = new Template("Template.footer", (function() {                                                // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div id="footer">\n    <div class="container">\n      <hr>\n        <p>\n          Vokabeltrainer | Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n        </p>\n    </div>\n  </div>');
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"head.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.head.js                                                                                 //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.body.addContent((function() {                                                                            // 2
  var view = this;                                                                                                // 3
  return "";                                                                                                      // 4
}));                                                                                                              // 5
Meteor.startup(Template.body.renderToDocument);                                                                   // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.nav.js                                                                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("nav");                                                                                      // 2
Template["nav"] = new Template("Template.nav", (function() {                                                      // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "container"                                                                                          // 6
  }, HTML.Raw('\n    <!-- <div class="header item"><img alt="UserAccounts" width="25" height="25" src="/imgs/ua-logo.png"></div>\n    <a class="{{isActiveRoute regex=\'home\'}} item" href="{{pathFor \'home\'}}">Home</a>\n    <a class="{{isActiveRoute regex=\'lists\'}} item" href="{{pathFor \'lists\'}}">Listen</a>\n    <div class="right menu">\n      {{> atNavButton}}\n    </div> -->\n    '), HTML.DIV({
    "class": "row"                                                                                                // 8
  }, "\n      ", Spacebars.include(view.lookupTemplate("atNavButton")), " Logged in as: ", Blaze.If(function() {  // 9
    return Spacebars.call(view.lookup("currentUser"));                                                            // 10
  }, function() {                                                                                                 // 11
    return [ " ", Blaze.View("lookup:userMail", function() {                                                      // 12
      return Spacebars.mustache(view.lookup("userMail"));                                                         // 13
    }), " " ];                                                                                                    // 14
  }), "\n    "), "\n    ", HTML.DIV({                                                                             // 15
    "class": "row"                                                                                                // 16
  }, "\n      ", HTML.UL({                                                                                        // 17
    "class": "nav nav-tabs"                                                                                       // 18
  }, "\n\n        ", HTML.LI({                                                                                    // 19
    role: "presentation",                                                                                         // 20
    "class": function() {                                                                                         // 21
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                      // 22
        regex: "index"                                                                                            // 23
      }));                                                                                                        // 24
    }                                                                                                             // 25
  }, HTML.A({                                                                                                     // 26
    href: function() {                                                                                            // 27
      return Spacebars.mustache(view.lookup("pathFor"), "index");                                                 // 28
    }                                                                                                             // 29
  }, "Index")), "\n        ", HTML.LI({                                                                           // 30
    role: "presentation",                                                                                         // 31
    "class": function() {                                                                                         // 32
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                      // 33
        regex: "trainer"                                                                                          // 34
      }));                                                                                                        // 35
    }                                                                                                             // 36
  }, HTML.A({                                                                                                     // 37
    href: function() {                                                                                            // 38
      return Spacebars.mustache(view.lookup("pathFor"), "trainer");                                               // 39
    }                                                                                                             // 40
  }, "Trainer")), "\n        ", HTML.LI({                                                                         // 41
    role: "presentation",                                                                                         // 42
    "class": function() {                                                                                         // 43
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                      // 44
        regex: "favouriten"                                                                                       // 45
      }));                                                                                                        // 46
    }                                                                                                             // 47
  }, HTML.A({                                                                                                     // 48
    href: function() {                                                                                            // 49
      return Spacebars.mustache(view.lookup("pathFor"), "favouriten");                                            // 50
    }                                                                                                             // 51
  }, "Favouriten")), "\n        ", HTML.LI({                                                                      // 52
    role: "presentation",                                                                                         // 53
    "class": function() {                                                                                         // 54
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                      // 55
        regex: "vokabelregister"                                                                                  // 56
      }));                                                                                                        // 57
    }                                                                                                             // 58
  }, HTML.A({                                                                                                     // 59
    href: function() {                                                                                            // 60
      return Spacebars.mustache(view.lookup("pathFor"), "vokabelregister");                                       // 61
    }                                                                                                             // 62
  }, "Vokabelregister")), "\n\n      "), "\n    "), "\n  ");                                                      // 63
}));                                                                                                              // 64
                                                                                                                  // 65
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"slim_layout.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.slim_layout.js                                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("slimLayout");                                                                               // 2
Template["slimLayout"] = new Template("Template.slimLayout", (function() {                                        // 3
  var view = this;                                                                                                // 4
  return [ HTML.DIV({                                                                                             // 5
    id: "content"                                                                                                 // 6
  }, "\n    ", Blaze._TemplateWith(function() {                                                                   // 7
    return {                                                                                                      // 8
      template: Spacebars.call(view.lookup("main"))                                                               // 9
    };                                                                                                            // 10
  }, function() {                                                                                                 // 11
    return Spacebars.include(function() {                                                                         // 12
      return Spacebars.call(Template.__dynamic);                                                                  // 13
    });                                                                                                           // 14
  }), "\n  "), "\n  ", Blaze._TemplateWith(function() {                                                           // 15
    return {                                                                                                      // 16
      template: Spacebars.call(view.lookup("footer"))                                                             // 17
    };                                                                                                            // 18
  }, function() {                                                                                                 // 19
    return Spacebars.include(function() {                                                                         // 20
      return Spacebars.call(Template.__dynamic);                                                                  // 21
    });                                                                                                           // 22
  }) ];                                                                                                           // 23
}));                                                                                                              // 24
                                                                                                                  // 25
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bar.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/bar.js                                                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
ATTENTION_MODE = 'attentionMode';                                                                                 // 1
Session.setDefault(ATTENTION_MODE, false);                                                                        // 2
                                                                                                                  //
LAST_PATH = 'lastPath';                                                                                           // 4
Session.setDefault(LAST_PATH, '/');                                                                               // 5
                                                                                                                  //
Template.bar.events({                                                                                             // 7
  'click .attention-mode': function () {                                                                          // 8
    function clickAttentionMode() {                                                                               // 8
      var oldValue = Session.get(ATTENTION_MODE) || false;                                                        // 9
      Session.set(ATTENTION_MODE, !oldValue);                                                                     // 10
                                                                                                                  //
      var routePath = FlowRouter.current().path;                                                                  // 12
      Session.set(LAST_PATH, routePath);                                                                          // 13
    }                                                                                                             //
                                                                                                                  //
    return clickAttentionMode;                                                                                    //
  }()                                                                                                             //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"basic_layout.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/basic_layout.js                                                                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// {{getSession "posX"}}                                                                                          //
Template.registerHelper("getSession", function (key) {                                                            // 2
  return Session.get(key);                                                                                        // 3
});                                                                                                               //
Template.registerHelper("userMail", function () {                                                                 // 5
  return Meteor.user().emails[0].address;                                                                         // 6
});                                                                                                               //
                                                                                                                  //
Template.basicLayout.helpers({                                                                                    // 9
  isOwner: function () {                                                                                          // 10
    function isOwner() {                                                                                          //
      return this.userId == Meteor.userId();                                                                      // 11
    }                                                                                                             //
                                                                                                                  //
    return isOwner;                                                                                               //
  }()                                                                                                             //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"loading.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/template.loading.js                                                                                     //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("loading");                                                                                  // 2
Template["loading"] = new Template("Template.loading", (function() {                                              // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div class="alert alert-warning" role="alert">Lade...</div>');                                 // 5
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"page_not_found.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/template.page_not_found.js                                                                              //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("pageNotFound");                                                                             // 2
Template["pageNotFound"] = new Template("Template.pageNotFound", (function() {                                    // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div class="container">\n    <h3>404 - Sprachlos.</h3>\n    <h5>Seite nicht gefunden.</h5>\n  </div>');
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"init.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/init.js                                                                                                 //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Meteor.startup(function () {});                                                                                   // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"common":{"aux":{"validation.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/aux/validation.js                                                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
isAlphabetic = function isAlphabetic(value) {                                                                     // 1
  var filter = /^[A-Za-z\s]+$/;                                                                                   // 2
  if (filter.test(value)) {                                                                                       // 3
    return true;                                                                                                  // 4
  }                                                                                                               //
  return false;                                                                                                   // 6
};                                                                                                                //
                                                                                                                  //
isLength64 = function isLength64(value) {                                                                         // 9
  if (value.length < 65) {                                                                                        // 10
    return true;                                                                                                  // 11
  }                                                                                                               //
  return false;                                                                                                   // 13
};                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"favourites.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/collections/favourites.js                                                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var FavouritesSchema = new SimpleSchema({                                                                         // 1
  userId: {                                                                                                       // 2
    type: String,                                                                                                 // 3
    autoValue: function () {                                                                                      // 4
      function autoValue() {                                                                                      // 4
        return this.userId;                                                                                       // 5
      }                                                                                                           //
                                                                                                                  //
      return autoValue;                                                                                           //
    }()                                                                                                           //
  },                                                                                                              //
  vocabularyId: {                                                                                                 // 8
    type: String                                                                                                  // 9
  },                                                                                                              //
  createdAt: {                                                                                                    // 11
    type: Date,                                                                                                   // 12
    autoValue: function () {                                                                                      // 13
      function autoValue() {                                                                                      // 13
        return new Date();                                                                                        // 14
      }                                                                                                           //
                                                                                                                  //
      return autoValue;                                                                                           //
    }(),                                                                                                          //
    autoform: {                                                                                                   // 16
      type: "hidden"                                                                                              // 17
    }                                                                                                             //
  }                                                                                                               //
});                                                                                                               //
                                                                                                                  //
Favourites = new Mongo.Collection('favourites', {});                                                              // 22
Favourites.attachSchema(FavouritesSchema);                                                                        // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"local.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/collections/local.js                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vocabulary.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/collections/vocabulary.js                                                                               //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Vocabulary = new Mongo.Collection('vocabulary', {});                                                              // 1
                                                                                                                  //
if (Meteor.isServer) {                                                                                            // 3
	Vocabulary._ensureIndex({                                                                                        // 4
		term: 1,                                                                                                        // 5
		description: 1                                                                                                  // 6
	});                                                                                                              //
}                                                                                                                 //
                                                                                                                  //
Vocabulary.allow({                                                                                                // 10
	insert: function () {                                                                                            // 11
		function insert() {                                                                                             // 11
			return false;                                                                                                  //
		}                                                                                                               //
                                                                                                                  //
		return insert;                                                                                                  //
	}(),                                                                                                             //
	update: function () {                                                                                            // 12
		function update() {                                                                                             // 12
			return false;                                                                                                  //
		}                                                                                                               //
                                                                                                                  //
		return update;                                                                                                  //
	}(),                                                                                                             //
	remove: function () {                                                                                            // 13
		function remove() {                                                                                             // 13
			return false;                                                                                                  //
		}                                                                                                               //
                                                                                                                  //
		return remove;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Vocabulary.deny({                                                                                                 // 16
	insert: function () {                                                                                            // 17
		function insert() {                                                                                             // 17
			return true;                                                                                                   //
		}                                                                                                               //
                                                                                                                  //
		return insert;                                                                                                  //
	}(),                                                                                                             //
	update: function () {                                                                                            // 18
		function update() {                                                                                             // 18
			return true;                                                                                                   //
		}                                                                                                               //
                                                                                                                  //
		return update;                                                                                                  //
	}(),                                                                                                             //
	remove: function () {                                                                                            // 19
		function remove() {                                                                                             // 19
			return true;                                                                                                   //
		}                                                                                                               //
                                                                                                                  //
		return remove;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
var VocabularySchema = new SimpleSchema({                                                                         // 22
	term: {                                                                                                          // 23
		type: String                                                                                                    // 24
	},                                                                                                               //
	description: {                                                                                                   // 26
		type: String                                                                                                    // 27
	}                                                                                                                //
});                                                                                                               //
                                                                                                                  //
Vocabulary.attachSchema(VocabularySchema);                                                                        // 31
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"config":{"accounts_t9n.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/config/accounts_t9n.js                                                                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
T9n.setLanguage('de');                                                                                            // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"at_config.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/config/at_config.js                                                                                     //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// Options                                                                                                        //
AccountsTemplates.configure({                                                                                     // 2
  defaultLayout: 'slimLayout',                                                                                    // 3
  defaultLayoutRegions: {                                                                                         // 4
    footer: 'footer'                                                                                              // 5
  },                                                                                                              //
  defaultContentRegion: 'main',                                                                                   // 7
  showForgotPasswordLink: false,                                                                                  // 8
  overrideLoginErrors: true,                                                                                      // 9
  enablePasswordChange: true,                                                                                     // 10
                                                                                                                  //
  // sendVerificationEmail: true,                                                                                 //
  // enforceEmailVerification: true,                                                                              //
  //confirmPassword: true,                                                                                        //
  //continuousValidation: false,                                                                                  //
  //displayFormLabels: true,                                                                                      //
  //forbidClientAccountCreation: true,                                                                            //
  //formValidationFeedback: true,                                                                                 //
  // homeRoutePath: '/',                                                                                          //
  // showAddRemoveServices: false,                                                                                //
  //showPlaceholders: true,                                                                                       //
                                                                                                                  //
  negativeValidation: true,                                                                                       // 23
  positiveValidation: true,                                                                                       // 24
  negativeFeedback: false,                                                                                        // 25
  positiveFeedback: true                                                                                          // 26
                                                                                                                  //
});                                                                                                               //
                                                                                                                  //
// Privacy Policy and Terms of Use                                                                                //
//privacyUrl: 'privacy',                                                                                          //
//termsUrl: 'terms-of-use',                                                                                       //
var logout = function logout() {                                                                                  // 33
  //example redirect after logout                                                                                 //
  FlowRouter.go('/sign-in');                                                                                      // 35
};                                                                                                                //
                                                                                                                  //
AccountsTemplates.configure({                                                                                     // 38
  onLogoutHook: logout                                                                                            // 39
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"router":{"routes.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/router/routes.js                                                                                        //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
// *** ROUTE FUNCTIONS                                                                                            //
                                                                                                                  //
checkAttentionModeOff = function checkAttentionModeOff() {                                                        // 3
	if (Session.get(ATTENTION_MODE)) {                                                                               // 4
		Session.set(ATTENTION_MODE, false);                                                                             // 5
	}                                                                                                                //
};                                                                                                                //
                                                                                                                  //
checkAttentionModeOn = function checkAttentionModeOn() {                                                          // 9
	if (!Session.get(ATTENTION_MODE)) {                                                                              // 10
		Session.set(ATTENTION_MODE, true);                                                                              // 11
	}                                                                                                                //
};                                                                                                                //
                                                                                                                  //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                                                    // 15
                                                                                                                  //
// *** ROUTE GROUPS                                                                                               //
                                                                                                                  //
var lowRoutes = FlowRouter.group({                                                                                // 19
	name: "low",                                                                                                     // 20
	triggersEnter: [checkAttentionModeOn],                                                                           // 21
	triggersExit: []                                                                                                 // 22
});                                                                                                               //
var basicRoutes = FlowRouter.group({                                                                              // 24
	name: "basic",                                                                                                   // 25
	triggersEnter: [checkAttentionModeOff],                                                                          // 26
	triggersExit: []                                                                                                 // 27
});                                                                                                               //
                                                                                                                  //
// *** ROUTES                                                                                                     //
                                                                                                                  //
basicRoutes.route('/', {                                                                                          // 32
	name: "index",                                                                                                   // 33
	action: function () {                                                                                            // 34
		function action(params, queryParams) {                                                                          // 34
			BlazeLayout.render('basicLayout', {                                                                            // 35
				bar: "bar",                                                                                                   // 36
				nav: "nav",                                                                                                   // 37
				main: "index"                                                                                                 // 38
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.route('/favouriten', {                                                                                // 42
	name: "favouriten",                                                                                              // 43
	action: function () {                                                                                            // 44
		function action(params, queryParams) {                                                                          // 44
			BlazeLayout.render('basicLayout', {                                                                            // 45
				bar: "bar",                                                                                                   // 46
				nav: "nav",                                                                                                   // 47
				main: "favouriten"                                                                                            // 48
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.route('/trainer', {                                                                                   // 52
	name: "trainer",                                                                                                 // 53
	action: function () {                                                                                            // 54
		function action(params, queryParams) {                                                                          // 54
			BlazeLayout.render('basicLayout', {                                                                            // 55
				bar: "bar",                                                                                                   // 56
				nav: "nav",                                                                                                   // 57
				main: "trainer"                                                                                               // 58
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.route('/vokabelregister', {                                                                           // 62
	name: "vokabelregister",                                                                                         // 63
	action: function () {                                                                                            // 64
		function action(params, queryParams) {                                                                          // 64
			BlazeLayout.render('basicLayout', {                                                                            // 65
				bar: "bar",                                                                                                   // 66
				nav: "nav",                                                                                                   // 67
				main: "vokabelregister"                                                                                       // 68
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
lowRoutes.route('/low', {                                                                                         // 73
	name: "indexLow",                                                                                                // 74
	action: function () {                                                                                            // 75
		function action(params, queryParams) {                                                                          // 75
			BlazeLayout.render('basicLayout', {                                                                            // 76
				bar: "bar",                                                                                                   // 77
				main: "indexLow"                                                                                              // 78
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}(),                                                                                                             //
	triggersEnter: [function (context, redirect) {}]                                                                 // 81
});                                                                                                               //
                                                                                                                  //
FlowRouter.notFound = {                                                                                           // 84
	action: function () {                                                                                            // 85
		function action() {                                                                                             // 85
			BlazeLayout.render('slimLayout', {                                                                             // 86
				footer: "footer",                                                                                             // 87
				main: "pageNotFound"                                                                                          // 88
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
};                                                                                                                //
                                                                                                                  //
//Routes                                                                                                          //
AccountsTemplates.configureRoute('changePwd');                                                                    // 95
// AccountsTemplates.configureRoute('forgotPwd');                                                                 //
AccountsTemplates.configureRoute('resetPwd');                                                                     // 97
AccountsTemplates.configureRoute('signIn');                                                                       // 98
AccountsTemplates.configureRoute('signUp');                                                                       // 99
// AccountsTemplates.configureRoute('verifyEmail');                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/views/favouriten/favouriten.html");
require("./client/views/index/index.html");
require("./client/views/vokabelregister/search.html");
require("./client/views/vokabelregister/vokabelregister.html");
require("./client/layout/bar.html");
require("./client/layout/basic_layout.html");
require("./client/layout/footer.html");
require("./client/layout/head.html");
require("./client/layout/nav.html");
require("./client/layout/slim_layout.html");
require("./client/views/index_low.html");
require("./client/views/trainer.html");
require("./client/loading.html");
require("./client/page_not_found.html");
require("./client/views/favouriten/favouriten.js");
require("./client/views/index/index.js");
require("./client/views/vokabelregister/search.js");
require("./client/layout/bar.js");
require("./client/layout/basic_layout.js");
require("./common/aux/validation.js");
require("./common/collections/favourites.js");
require("./common/collections/local.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/at_config.js");
require("./common/router/routes.js");
require("./client/init.js");