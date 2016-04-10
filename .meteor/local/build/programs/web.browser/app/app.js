var require = meteorInstall({"client":{"views":{"_shared":{"modus_bedeutung.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/_shared/template.modus_bedeutung.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("modusBedeutung");                                                                                // 2
Template["modusBedeutung"] = new Template("Template.modusBedeutung", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "jumbotron"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "text-center media-middle"                                                                                // 8
  }, "\n			", Blaze.If(function() {                                                                                    // 9
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 10
  }, function() {                                                                                                      // 11
    return HTML.SPAN({                                                                                                 // 12
      "class": "label label-warning"                                                                                   // 13
    }, "Letzter Eintrag");                                                                                             // 14
  }), "\n				", HTML.H2("\n					", Blaze.View("lookup:term", function() {                                              // 15
    return Spacebars.mustache(view.lookup("term"));                                                                    // 16
  }), "\n				"), "\n		"), HTML.Raw("\n\n		<hr>\n		"), HTML.DIV({                                                       // 17
    "class": "btn-switch text-center"                                                                                  // 18
  }, "\n			", HTML.Raw('<i class="fa fa-retweet fa-4x"></i>'), "\n			", Blaze.If(function() {                          // 19
    return Spacebars.dataMustache(view.lookup("getSession"), "termMode");                                              // 20
  }, function() {                                                                                                      // 21
    return [ "\n				", HTML.SPAN({                                                                                     // 22
      "class": "label label-info"                                                                                      // 23
    }, "Gesucht: Wort"), "\n			" ];                                                                                    // 24
  }, function() {                                                                                                      // 25
    return [ "\n				", HTML.SPAN({                                                                                     // 26
      "class": "label label-info"                                                                                      // 27
    }, "Gesucht: Bedeutung"), "\n			" ];                                                                               // 28
  }), "\n		"), HTML.Raw("\n		<hr>\n\n		"), Blaze.Unless(function() {                                                   // 29
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 30
  }, function() {                                                                                                      // 31
    return [ "\n		", HTML.DIV({                                                                                        // 32
      "class": "text-center media-middle"                                                                              // 33
    }, "\n			", HTML.DIV({                                                                                             // 34
      "class": "btn-reveal"                                                                                            // 35
    }, "\n				", HTML.I({                                                                                              // 36
      "class": "fa fa-question fa-4x"                                                                                  // 37
    }), "\n			"), "\n		"), "\n		" ];                                                                                   // 38
  }, function() {                                                                                                      // 39
    return [ "\n		", HTML.H3("\n			", HTML.OL("\n				", HTML.LI(Blaze.View("lookup:description", function() {          // 40
      return Spacebars.mustache(view.lookup("description"));                                                           // 41
    })), "\n			"), "\n		"), "\n		" ];                                                                                  // 42
  }), "\n	");                                                                                                          // 43
}));                                                                                                                   // 44
                                                                                                                       // 45
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"modus_wort.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/_shared/template.modus_wort.js                                                                         //
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
      "class": "label label-warning"                                                                                   // 13
    }, "Letzter Eintrag");                                                                                             // 14
  }), "\n\n			", Blaze.Unless(function() {                                                                             // 15
    return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                              // 16
  }, function() {                                                                                                      // 17
    return [ "\n			", HTML.DIV({                                                                                       // 18
      "class": "btn-reveal"                                                                                            // 19
    }, "\n				", HTML.I({                                                                                              // 20
      "class": "fa fa-question fa-4x"                                                                                  // 21
    }), "\n			"), "\n			" ];                                                                                           // 22
  }, function() {                                                                                                      // 23
    return [ "\n				", HTML.H2("\n					", Blaze.View("lookup:term", function() {                                       // 24
      return Spacebars.mustache(view.lookup("term"));                                                                  // 25
    }), "\n				"), "\n			" ];                                                                                          // 26
  }), "\n		"), HTML.Raw("\n\n		<hr>\n		"), HTML.DIV({                                                                  // 27
    "class": "btn-switch text-center"                                                                                  // 28
  }, "\n			", HTML.Raw('<i class="fa fa-retweet fa-4x"></i>'), "\n			", Blaze.If(function() {                          // 29
    return Spacebars.dataMustache(view.lookup("getSession"), "termMode");                                              // 30
  }, function() {                                                                                                      // 31
    return [ "\n				", HTML.SPAN({                                                                                     // 32
      "class": "label label-info"                                                                                      // 33
    }, "Gesucht: Wort"), "\n			" ];                                                                                    // 34
  }, function() {                                                                                                      // 35
    return [ "\n				", HTML.SPAN({                                                                                     // 36
      "class": "label label-info"                                                                                      // 37
    }, "Gesucht: Bedeutung"), "\n			" ];                                                                               // 38
  }), "\n		"), HTML.Raw("\n		<hr>\n\n		"), HTML.H3("\n		", HTML.OL("\n			", HTML.LI(Blaze.View("lookup:description", function() {
    return Spacebars.mustache(view.lookup("description"));                                                             // 40
  })), "\n		"), "\n	"), "\n	");                                                                                        // 41
}));                                                                                                                   // 42
                                                                                                                       // 43
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vokabel_detail.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/_shared/template.vokabel_detail.js                                                                     //
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

},"vokabel_detail.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/_shared/vokabel_detail.js                                                                              //
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

}},"favouriten":{"favouriten.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/favouriten/template.favouriten.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("favouriten");                                                                                    // 2
Template["favouriten"] = new Template("Template.favouriten", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, HTML.Raw('\n    <div class="page-header clearfix">\n      <h4 class="pull-left">Favouriten</h4>\n      <div class="pull-right"></div>\n    </div>\n\n    '), Blaze.If(function() {
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 8
  }, function() {                                                                                                      // 9
    return [ "\n    ", HTML.UL({                                                                                       // 10
      "class": "list-group"                                                                                            // 11
    }, "\n      ", Blaze.If(function() {                                                                               // 12
      return Spacebars.call(view.lookup("favourites"));                                                                // 13
    }, function() {                                                                                                    // 14
      return [ "\n        ", Blaze.Each(function() {                                                                   // 15
        return Spacebars.call(view.lookup("favourites"));                                                              // 16
      }, function() {                                                                                                  // 17
        return [ "\n          ", HTML.LI({                                                                             // 18
          "class": "list-group-item clearfix"                                                                          // 19
        }, "\n            ", HTML.DIV({                                                                                // 20
          "class": "media"                                                                                             // 21
        }, "\n                ", HTML.DIV({                                                                            // 22
          "class": "media-body"                                                                                        // 23
        }, "\n                  ", HTML.A({                                                                            // 24
          href: function() {                                                                                           // 25
            return [ "/vokabelregister/", Spacebars.mustache(view.lookup("_id")) ];                                    // 26
          }                                                                                                            // 27
        }, "\n                    ", HTML.H4({                                                                         // 28
          "class": "media-heading"                                                                                     // 29
        }, Blaze.View("lookup:term", function() {                                                                      // 30
          return Spacebars.mustache(view.lookup("term"));                                                              // 31
        })), "\n                    ", Blaze.View("lookup:description", function() {                                   // 32
          return Spacebars.mustache(view.lookup("description"));                                                       // 33
        }), "\n                  "), "\n                "), "\n              ", HTML.DIV({                             // 34
          "class": "media-right media-middle btn-delete"                                                               // 35
        }, "\n                ", HTML.I({                                                                              // 36
          "class": "fa fa-trash-o fa-4x"                                                                               // 37
        }), "\n              "), "\n            "), "\n          "), "\n        " ];                                   // 38
      }), "\n      " ];                                                                                                // 39
    }, function() {                                                                                                    // 40
      return [ "\n      ", HTML.P({                                                                                    // 41
        "class": "alert alert-warning"                                                                                 // 42
      }, "Keine Favouriten bisher gespeichert. Zum favourisieren von Begriffen klicke auf das Herz-Symbol neben dem jeweiligen Begriff."), "\n      " ];
    }), "\n    "), "\n    " ];                                                                                         // 44
  }, function() {                                                                                                      // 45
    return [ "\n      ", Spacebars.include(view.lookupTemplate("loading")), "\n    " ];                                // 46
  }), "\n  ");                                                                                                         // 47
}));                                                                                                                   // 48
                                                                                                                       // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"favouriten.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/favouriten/favouriten.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.favouriten.onCreated(function () {                                                                            // 1
	var _this = this;                                                                                                     //
                                                                                                                       //
	this.autorun(function () {                                                                                            // 2
		_this.subscribe('ownedFavourites');                                                                                  // 3
		_this.subscribe('vocabularyFavourised');                                                                             // 4
                                                                                                                       //
		Session.set(LENGTH_FAV, Favourites.find().count());                                                                  // 6
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                                  // 7
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.favouriten.helpers({                                                                                          // 12
	favourites: function () {                                                                                             // 13
		function favourites() {                                                                                              //
			var favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());                                                  // 14
			if (Favourites.find().count() !== 0) {                                                                              // 15
				return Vocabulary.find({                                                                                           // 16
					_id: {                                                                                                            // 17
						$in: favIds                                                                                                      // 18
					}                                                                                                                 //
				}, {                                                                                                               //
					sort: {                                                                                                           // 21
						term: 1                                                                                                          // 22
					}                                                                                                                 //
				});                                                                                                                //
			} else {                                                                                                            //
				return null;                                                                                                       // 26
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return favourites;                                                                                                   //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.favouriten.events({                                                                                           // 31
	'click .btn-delete': function () {                                                                                    // 32
		function clickBtnDelete(event, template) {                                                                           //
			Meteor.call('deleteFavourite', this._id);                                                                           // 33
                                                                                                                       //
			if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                          // 35
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 36
				Session.set(COUNT_VIEWED, val);                                                                                    // 37
			}                                                                                                                   //
			// set random bar buttons to non fav list if the last entry in fav list has been removed via fav menu               //
			if (Session.get(LENGTH_FAV) === 1) {                                                                                // 32
				Session.set(RANDOM_FAV, false);                                                                                    // 41
				Session.set(RANDOM_NOT_FAV, true);                                                                                 // 42
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnDelete;                                                                                               //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index":{"index.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/index/template.index.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("index");                                                                                         // 2
Template["index"] = new Template("Template.index", (function() {                                                       // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div class="container">\n    <h1>Index - Startseite.</h1>\n    <p>\n      5 Tage nach Registration/ nach 5 Logins folgende Meldung:\n    </p>\n    <p class="alert alert-info">Bitte fuelle den Fragebogen aus. Du hast bis zum 03. Juli 2016 dafuer Zeit. Nur mit ausgefuellten Fragebogen ist deine Teilnahme gueltig.\n      <input class="btn btn-default" type="submit" value="Fragebogen">\n    </p>\n    <p>\n\n    </p>\n\n    <h4>TODO: </h4>\n    <ul>\n      <li>TOP 5 last viewed</li>\n      <li>TOP 5 popularity on users fav lists</li>\n      <li>Vocabulary of the day</li>\n    </ul>\n\n    <p>\n      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,\n      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.\n    </p>\n\n    <h4>Log Data: </h4>\n    <ul>\n      <li>Count successful Logins</li>\n      <li> Login and Logout + Timestamp, Browser, OS</li>\n      <li>Clicked Menu items plus timestamp</li>\n      <li>Clicked Attention button plus timestamp</li>\n      <li>Count words viewed and in which mode -> compare attention high/ low plus timestamp -> how did the use evolve?</li>\n      <li></li>\n    </ul>\n\n    <h4>Fragebogen: </h4>\n    <ul>\n      <li>Welchen Trainermodus hast du am liebsten genutzt?</li>\n      <li>Von welchem Endgeraet aus hast du die App genutzt?</li>\n      <li>Falls von mehreren: Inwiefern hat sich dein Nutzerverhalten mit den versch. Endgeraeten veraendert?</li>\n      <li>Hat die Moeglichkeit, den Modus zu wechseln, dein Nutzungsverhalten veraendert? Falls ja, wie?</li>\n      <li>Wie hat dir die Moeglichkeit gefallen das UI zu reduzieren?</li>\n      <li>Hast du vom Attention Mode Gebrauch gemacht? Wann, wo und in welchen Situationen?</li>\n      <li>Wie Zufrieden warst du mit der Benutzeroberflaeche?</li>\n      <li>Fandest du die Bedienung der App verstaendlich?</li>\n      <li>...</li>\n    </ul>\n\n  </div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/index/index.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"trainer":{"eingabe.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/trainer/template.eingabe.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("trainerEingabe");                                                                                // 2
Template["trainerEingabe"] = new Template("Template.trainerEingabe", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return [ HTML.DIV({                                                                                                  // 5
    "class": "container"                                                                                               // 6
  }, "\n\n		", Blaze.Unless(function() {                                                                               // 7
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
  }, "\n			", Blaze.If(function() {                                                                                    // 21
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 22
  }, function() {                                                                                                      // 23
    return [ "\n			", HTML.DIV({                                                                                       // 24
      "class": "media-left media-middle"                                                                               // 25
    }, "\n				", HTML.I({                                                                                              // 26
      "class": "fa fa-ban fa-4x"                                                                                       // 27
    }), "\n			"), "\n			" ];                                                                                           // 28
  }, function() {                                                                                                      // 29
    return [ "\n			", HTML.DIV({                                                                                       // 30
      "class": "media-left media-middle btn-backward"                                                                  // 31
    }, "\n				", HTML.I({                                                                                              // 32
      "class": "fa fa-chevron-left fa-4x"                                                                              // 33
    }), "\n			"), "\n			" ];                                                                                           // 34
  }), "\n\n			", HTML.DIV({                                                                                            // 35
    "class": "media-body"                                                                                              // 36
  }, "\n				", Blaze.If(function() {                                                                                   // 37
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 38
  }, function() {                                                                                                      // 39
    return [ "\n					", Spacebars.With(function() {                                                                    // 40
      return Spacebars.call(view.lookup("entry"));                                                                     // 41
    }, function() {                                                                                                    // 42
      return [ "\n\n\n					", HTML.DIV({                                                                               // 43
        "class": "jumbotron"                                                                                           // 44
      }, "\n\n						", Blaze.If(function() {                                                                           // 45
        return Spacebars.call(view.lookup("lengthIsOne"));                                                             // 46
      }, function() {                                                                                                  // 47
        return HTML.SPAN({                                                                                             // 48
          "class": "label label-warning"                                                                               // 49
        }, "Letzter Eintrag");                                                                                         // 50
      }), "\n\n						", HTML.DIV({                                                                                     // 51
        "class": "media"                                                                                               // 52
      }, "\n							", HTML.DIV({                                                                                       // 53
        "class": "media-left btn-reveal"                                                                               // 54
      }, "\n									", Blaze.Unless(function() {                                                                      // 55
        return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                          // 56
      }, function() {                                                                                                  // 57
        return [ "\n										", HTML.I({                                                                              // 58
          "class": "fa fa-question fa-4x"                                                                              // 59
        }), "\n									" ];                                                                                           // 60
      }, function() {                                                                                                  // 61
        return [ "\n										", HTML.I({                                                                              // 62
          "class": "fa fa-exclamation fa-4x"                                                                           // 63
        }), "\n									" ];                                                                                           // 64
      }), "\n							"), "\n							", HTML.DIV({                                                                        // 65
        "class": "media-body"                                                                                          // 66
      }, "\n								", Blaze.Unless(function() {                                                                       // 67
        return Spacebars.dataMustache(view.lookup("getSession"), "revealed");                                          // 68
      }, function() {                                                                                                  // 69
        return [ "\n									", Blaze.If(function() {                                                                  // 70
          return Spacebars.dataMustache(view.lookup("getSession"), "termWrong");                                       // 71
        }, function() {                                                                                                // 72
          return [ "\n										", HTML.P({                                                                            // 73
            "class": "alert alert-warning"                                                                             // 74
          }, "Zu ", Blaze.View("lookup:termPercent", function() {                                                      // 75
            return Spacebars.mustache(view.lookup("termPercent"));                                                     // 76
          }), "% bisher richtig: ", Blaze.View("lookup:getSession", function() {                                       // 77
            return Spacebars.mustache(view.lookup("getSession"), "termCache");                                         // 78
          })), "\n									" ];                                                                                        // 79
        }), "\n									", Blaze.If(function() {                                                                       // 80
          return Spacebars.dataMustache(view.lookup("getSession"), "termRight");                                       // 81
        }, function() {                                                                                                // 82
          return [ "\n										", HTML.P({                                                                            // 83
            "class": "alert alert-success"                                                                             // 84
          }, "Richtig: ", Blaze.View("lookup:term", function() {                                                       // 85
            return Spacebars.mustache(view.lookup("term"));                                                            // 86
          })), "\n									" ];                                                                                        // 87
        }), "\n								" ];                                                                                            // 88
      }, function() {                                                                                                  // 89
        return [ "\n									", HTML.P({                                                                               // 90
          "class": "alert alert-info"                                                                                  // 91
        }, "Loesung: ", Blaze.View("lookup:term", function() {                                                         // 92
          return Spacebars.mustache(view.lookup("term"));                                                              // 93
        })), "\n								" ];                                                                                           // 94
      }), "\n							"), "\n						"), "\n\n						", HTML.DIV({                                                          // 95
        "class": "input-group-lg "                                                                                     // 96
      }, "\n						      ", HTML.INPUT({                                                                                // 97
        type: "text",                                                                                                  // 98
        name: "term",                                                                                                  // 99
        id: "term",                                                                                                    // 100
        "class": "form-control",                                                                                       // 101
        placeholder: "Was ist..."                                                                                      // 102
      }), "\n						"), "\n						", HTML.HR(), "\n\n						", HTML.H3("\n						", HTML.OL("\n							", HTML.LI(Blaze.View("lookup:description", function() {
        return Spacebars.mustache(view.lookup("description"));                                                         // 104
      })), "\n						"), "\n					"), "\n					"), "\n\n					" ];                                                         // 105
    }), "\n				" ];                                                                                                    // 106
  }, function() {                                                                                                      // 107
    return [ "\n					", Spacebars.include(view.lookupTemplate("loading")), "\n				" ];                                 // 108
  }), "\n			"), "\n\n			", Blaze.If(function() {                                                                       // 109
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 110
  }, function() {                                                                                                      // 111
    return [ "\n			", HTML.DIV({                                                                                       // 112
      "class": "media-right media-middle"                                                                              // 113
    }, "\n				", HTML.I({                                                                                              // 114
      "class": "fa fa-ban fa-4x"                                                                                       // 115
    }), "\n			"), "\n			" ];                                                                                           // 116
  }, function() {                                                                                                      // 117
    return [ "\n			", HTML.DIV({                                                                                       // 118
      "class": "media-right media-middle btn-forward"                                                                  // 119
    }, "\n				", HTML.I({                                                                                              // 120
      "class": "fa fa-chevron-right fa-4x"                                                                             // 121
    }), "\n			"), "\n			" ];                                                                                           // 122
  }), "\n		"), "\n	"), HTML.Raw("\n\n	<br>") ];                                                                        // 123
}));                                                                                                                   // 124
                                                                                                                       // 125
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lesen.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/trainer/template.lesen.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("trainerLesen");                                                                                  // 2
Template["trainerLesen"] = new Template("Template.trainerLesen", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return [ HTML.DIV({                                                                                                  // 5
    "class": "container"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "media"                                                                                                   // 8
  }, "\n			", Blaze.If(function() {                                                                                    // 9
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 10
  }, function() {                                                                                                      // 11
    return [ "\n			", HTML.DIV({                                                                                       // 12
      "class": "media-left media-middle"                                                                               // 13
    }, "\n				", HTML.I({                                                                                              // 14
      "class": "fa fa-ban fa-4x"                                                                                       // 15
    }), "\n			"), "\n			" ];                                                                                           // 16
  }, function() {                                                                                                      // 17
    return [ "\n			", HTML.DIV({                                                                                       // 18
      "class": "media-left media-middle btn-backward"                                                                  // 19
    }, "\n				", HTML.I({                                                                                              // 20
      "class": "fa fa-chevron-left fa-4x"                                                                              // 21
    }), "\n			"), "\n			" ];                                                                                           // 22
  }), "\n\n			", HTML.DIV({                                                                                            // 23
    "class": "media-body"                                                                                              // 24
  }, "\n				", Blaze.If(function() {                                                                                   // 25
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 26
  }, function() {                                                                                                      // 27
    return [ "\n					", Spacebars.With(function() {                                                                    // 28
      return Spacebars.call(view.lookup("entry"));                                                                     // 29
    }, function() {                                                                                                    // 30
      return [ "\n\n					", HTML.DIV({                                                                                 // 31
        "class": "jumbotron"                                                                                           // 32
      }, "\n						", Blaze.If(function() {                                                                             // 33
        return Spacebars.call(view.lookup("lengthIsOne"));                                                             // 34
      }, function() {                                                                                                  // 35
        return HTML.SPAN({                                                                                             // 36
          "class": "label label-warning"                                                                               // 37
        }, "Letzter Eintrag in ", Blaze.If(function() {                                                                // 38
          return Spacebars.dataMustache(view.lookup("getSession"), "randomFavourites");                                // 39
        }, function() {                                                                                                // 40
          return "Favoriten";                                                                                          // 41
        }, function() {                                                                                                // 42
          return "Nicht-Favoriten";                                                                                    // 43
        }));                                                                                                           // 44
      }), "\n						", HTML.H2(Blaze.View("lookup:term", function() {                                                   // 45
        return Spacebars.mustache(view.lookup("term"));                                                                // 46
      }), "\n						", Blaze.If(function() {                                                                            // 47
        return Spacebars.dataMustache(view.lookup("getSession"), "randomFavourites");                                  // 48
      }, function() {                                                                                                  // 49
        return [ "\n							", HTML.DIV({                                                                               // 50
          "class": "btn-delete"                                                                                        // 51
        }, "\n								", HTML.I({                                                                                      // 52
          "class": "fa fa-trash-o fa-2x"                                                                               // 53
        }), "\n							"), "\n						" ];                                                                                // 54
      }, function() {                                                                                                  // 55
        return [ "\n							", HTML.DIV({                                                                               // 56
          "class": "btn-fav"                                                                                           // 57
        }, "\n								", Blaze.If(function() {                                                                         // 58
          return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));           // 59
        }, function() {                                                                                                // 60
          return [ "\n									", HTML.I({                                                                             // 61
            "class": "fa fa-heart fa-2x"                                                                               // 62
          }), "\n									" ];                                                                                         // 63
        }, function() {                                                                                                // 64
          return [ "\n									", HTML.I({                                                                             // 65
            "class": "fa fa-heart-o fa-2x"                                                                             // 66
          }), "\n								" ];                                                                                          // 67
        }), "\n							"), "\n						" ];                                                                                // 68
      }), "\n						"), "\n\n						", HTML.HR(), "\n\n						", HTML.H3("\n						", HTML.OL("\n							", HTML.LI(Blaze.View("lookup:description", function() {
        return Spacebars.mustache(view.lookup("description"));                                                         // 70
      })), "\n						"), "\n					"), "\n					"), "\n\n					" ];                                                         // 71
    }), "\n				" ];                                                                                                    // 72
  }, function() {                                                                                                      // 73
    return [ "\n					", Spacebars.include(view.lookupTemplate("loading")), "\n				" ];                                 // 74
  }), "\n			"), "\n\n			", Blaze.If(function() {                                                                       // 75
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 76
  }, function() {                                                                                                      // 77
    return [ "\n			", HTML.DIV({                                                                                       // 78
      "class": "media-right media-middle"                                                                              // 79
    }, "\n				", HTML.I({                                                                                              // 80
      "class": "fa fa-ban fa-4x"                                                                                       // 81
    }), "\n			"), "\n			" ];                                                                                           // 82
  }, function() {                                                                                                      // 83
    return [ "\n			", HTML.DIV({                                                                                       // 84
      "class": "media-right media-middle btn-forward"                                                                  // 85
    }, "\n				", HTML.I({                                                                                              // 86
      "class": "fa fa-chevron-right fa-4x"                                                                             // 87
    }), "\n			"), "\n			" ];                                                                                           // 88
  }), "\n		"), "\n	"), HTML.Raw("\n\n	<br>") ];                                                                        // 89
}));                                                                                                                   // 90
                                                                                                                       // 91
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wort.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/trainer/template.wort.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("trainerWort");                                                                                   // 2
Template["trainerWort"] = new Template("Template.trainerWort", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return [ HTML.DIV({                                                                                                  // 5
    "class": "container"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "media"                                                                                                   // 8
  }, "\n			", Blaze.If(function() {                                                                                    // 9
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 10
  }, function() {                                                                                                      // 11
    return [ "\n			", HTML.DIV({                                                                                       // 12
      "class": "media-left media-middle"                                                                               // 13
    }, "\n				", HTML.I({                                                                                              // 14
      "class": "fa fa-ban fa-4x"                                                                                       // 15
    }), "\n			"), "\n			" ];                                                                                           // 16
  }, function() {                                                                                                      // 17
    return [ "\n			", HTML.DIV({                                                                                       // 18
      "class": "media-left media-middle btn-backward"                                                                  // 19
    }, "\n				", HTML.I({                                                                                              // 20
      "class": "fa fa-chevron-left fa-4x"                                                                              // 21
    }), "\n			"), "\n			" ];                                                                                           // 22
  }), "\n\n			", HTML.DIV({                                                                                            // 23
    "class": "media-body"                                                                                              // 24
  }, "\n				", Blaze.If(function() {                                                                                   // 25
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 26
  }, function() {                                                                                                      // 27
    return [ "\n					", Spacebars.With(function() {                                                                    // 28
      return Spacebars.call(view.lookup("entry"));                                                                     // 29
    }, function() {                                                                                                    // 30
      return [ "\n						", Blaze.If(function() {                                                                       // 31
        return Spacebars.dataMustache(view.lookup("getSession"), "termMode");                                          // 32
      }, function() {                                                                                                  // 33
        return [ "\n							", Spacebars.include(view.lookupTemplate("modusWort")), "\n						" ];                       // 34
      }, function() {                                                                                                  // 35
        return [ "\n							", Spacebars.include(view.lookupTemplate("modusBedeutung")), "\n						" ];                  // 36
      }), "\n					" ];                                                                                                 // 37
    }), "\n				" ];                                                                                                    // 38
  }, function() {                                                                                                      // 39
    return [ "\n					", Spacebars.include(view.lookupTemplate("loading")), "\n				" ];                                 // 40
  }), "\n			"), "\n\n			", Blaze.If(function() {                                                                       // 41
    return Spacebars.call(view.lookup("lengthIsOne"));                                                                 // 42
  }, function() {                                                                                                      // 43
    return [ "\n			", HTML.DIV({                                                                                       // 44
      "class": "media-right media-middle"                                                                              // 45
    }, "\n				", HTML.I({                                                                                              // 46
      "class": "fa fa-ban fa-4x"                                                                                       // 47
    }), "\n			"), "\n			" ];                                                                                           // 48
  }, function() {                                                                                                      // 49
    return [ "\n			", HTML.DIV({                                                                                       // 50
      "class": "media-right media-middle btn-forward"                                                                  // 51
    }, "\n				", HTML.I({                                                                                              // 52
      "class": "fa fa-chevron-right fa-4x"                                                                             // 53
    }), "\n			"), "\n			" ];                                                                                           // 54
  }), "\n		"), "\n	"), HTML.Raw("\n\n	<br>") ];                                                                        // 55
}));                                                                                                                   // 56
                                                                                                                       // 57
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"eingabe.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/trainer/eingabe.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.trainerEingabe.onCreated(function () {                                                                        // 1
	var template = Template.instance();                                                                                   // 2
	template.isAlphabetic = new ReactiveVar(true);                                                                        // 3
	template.isLength64 = new ReactiveVar(true);                                                                          // 4
});                                                                                                                    //
                                                                                                                       //
Template.trainerEingabe.helpers({                                                                                      // 7
	isAlphabetic: function () {                                                                                           // 8
		function isAlphabetic() {                                                                                            //
			return Template.instance().isAlphabetic.get();                                                                      // 9
		}                                                                                                                    //
                                                                                                                       //
		return isAlphabetic;                                                                                                 //
	}(),                                                                                                                  //
	isLength64: function () {                                                                                             // 11
		function isLength64() {                                                                                              //
			return Template.instance().isLength64.get();                                                                        // 12
		}                                                                                                                    //
                                                                                                                       //
		return isLength64;                                                                                                   //
	}(),                                                                                                                  //
	termPercent: function () {                                                                                            // 14
		function termPercent() {                                                                                             //
			return Math.floor(Session.get(COUNT_LETTERS_MATCH) / this.term.length * 100);                                       // 15
		}                                                                                                                    //
                                                                                                                       //
		return termPercent;                                                                                                  //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.trainerEingabe.events({                                                                                       // 19
	'keyup [name="term"]': function () {                                                                                  // 20
		function keyupNameTerm(event, template) {                                                                            //
			var value = event.target.value.toLowerCase();                                                                       // 21
                                                                                                                       //
			if (value !== '') {                                                                                                 // 23
				// check if string is valid                                                                                        //
				if (Validate.isAlphabetic(value)) {                                                                                // 25
					template.isAlphabetic.set(true);                                                                                  // 26
				} else {                                                                                                           //
					template.isAlphabetic.set(false);                                                                                 // 28
				}                                                                                                                  //
				if (Validate.isLength64(value)) {                                                                                  // 30
					template.isLength64.set(true);                                                                                    // 31
				} else {                                                                                                           //
					template.isLength64.set(false);                                                                                   // 33
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			// TODO exclude spaces                                                                                              //
			// && event.keyCode === 13                                                                                          //
			if (value !== '') {                                                                                                 // 20
				if (template.isAlphabetic.get() && template.isLength64.get()) {                                                    // 40
					var term = this.term.toLowerCase();                                                                               // 41
                                                                                                                       //
					if (term === value) {                                                                                             // 43
						if (Session.get(TERM_WRONG)) {                                                                                   // 44
							Session.set(TERM_WRONG, false);                                                                                 // 45
						}                                                                                                                //
						Session.set(TERM_RIGHT, true);                                                                                   // 47
                                                                                                                       //
						setTimeout(function () {                                                                                         // 49
							Session.set(REVEALED, false);                                                                                   // 50
							Session.set(TERM_RIGHT, false);                                                                                 // 51
							event.target.value = "";                                                                                        // 52
                                                                                                                       //
							var val = 0;                                                                                                    // 54
							if (Session.get(RANDOM_FAV)) {                                                                                  // 55
								val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 56
								Session.set(COUNT_VIEWED, val);                                                                                // 57
							} else {                                                                                                        //
								val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                           // 59
								Session.set(COUNT_VIEWED, val);                                                                                // 60
							}                                                                                                               //
						}, 1000);                                                                                                        //
					} else {                                                                                                          //
						Session.set(TERM_WRONG, true);                                                                                   // 65
                                                                                                                       //
						var termArray = R.split('', term);                                                                               // 67
						var f = function () {                                                                                            // 68
							function f(x, y) {                                                                                              // 68
								var space = "_";                                                                                               // 69
								if (x === y) {                                                                                                 // 70
									return x;                                                                                                     // 71
								} else {                                                                                                       //
									return space;                                                                                                 // 73
								}                                                                                                              //
							}                                                                                                               //
                                                                                                                       //
							return f;                                                                                                       //
						}();                                                                                                             //
						var cheese = R.zipWith(f, term, value);                                                                          // 76
						while (cheese.length < term.length) {                                                                            // 77
							cheese = R.append('_', cheese);                                                                                 // 78
						}                                                                                                                //
                                                                                                                       //
						var countMatch = term.length - R.filter(R.equals('_'), cheese).length;                                           // 81
						Session.set(COUNT_LETTERS_MATCH, countMatch);                                                                    // 82
                                                                                                                       //
						cheese = R.join(' ', cheese);                                                                                    // 84
						Session.set(TERM_CACHE, cheese);                                                                                 // 85
					}                                                                                                                 //
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			if (value === '') {                                                                                                 // 91
				template.isAlphabetic.set(true);                                                                                   // 92
				template.isLength64.set(true);                                                                                     // 93
                                                                                                                       //
				var _cheese = '';                                                                                                  // 95
				while (_cheese.length < this.term.length) {                                                                        // 96
					_cheese = R.append('_', _cheese);                                                                                 // 97
				}                                                                                                                  //
				_cheese = R.join(' ', _cheese);                                                                                    // 99
				Session.set(TERM_CACHE, _cheese);                                                                                  // 100
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return keyupNameTerm;                                                                                                //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"vokabelregister":{"search.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/vokabelregister/template.search.js                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("search");                                                                                        // 2
Template["search"] = new Template("Template.search", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw('<div class="page-header clearfix">\n\n      <input type="text" name="search" class="form-control" width="300px" placeholder="Finde einen Begriff...">\n\n  </div>\n\n    '), Blaze.Unless(function() {
    return Spacebars.call(view.lookup("isAlphabetic"));                                                                // 6
  }, function() {                                                                                                      // 7
    return [ "\n    ", HTML.P({                                                                                        // 8
      "class": "alert alert-warning"                                                                                   // 9
    }, "Der Suchbegriff darf nur Zeichen des Alphabets (a - Z)enthalten. Keine Leer- und Sonderzeichen."), "\n    " ];
  }), "\n    ", Blaze.Unless(function() {                                                                              // 11
    return Spacebars.call(view.lookup("isLength64"));                                                                  // 12
  }, function() {                                                                                                      // 13
    return [ "\n    ", HTML.P({                                                                                        // 14
      "class": "alert alert-warning"                                                                                   // 15
    }, "Der Suchbegriff darf nicht mehr als 64 Zeichen enthalten."), "\n    " ];                                       // 16
  }), "\n\n", Blaze.If(function() {                                                                                    // 17
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                               // 18
  }, function() {                                                                                                      // 19
    return [ "\n  ", Blaze.If(function() {                                                                             // 20
      return Spacebars.call(view.lookup("query"));                                                                     // 21
    }, function() {                                                                                                    // 22
      return [ "\n  ", HTML.UL({                                                                                       // 23
        "class": "list-group"                                                                                          // 24
      }, "\n    ", Blaze.If(function() {                                                                               // 25
        return Spacebars.call(view.lookup("searching"));                                                               // 26
      }, function() {                                                                                                  // 27
        return [ " ", Spacebars.include(view.lookupTemplate("loading")), " " ];                                        // 28
      }, function() {                                                                                                  // 29
        return [ " ", Blaze.Each(function() {                                                                          // 30
          return Spacebars.call(view.lookup("vocabulary"));                                                            // 31
        }, function() {                                                                                                // 32
          return [ "\n    ", HTML.H3(Blaze.View("lookup:letter", function() {                                          // 33
            return Spacebars.mustache(view.lookup("letter"));                                                          // 34
          })), " ", Blaze.Each(function() {                                                                            // 35
            return Spacebars.call(view.lookup("entries"));                                                             // 36
          }, function() {                                                                                              // 37
            return [ "\n    ", HTML.LI({                                                                               // 38
              "class": "list-group-item clearfix"                                                                      // 39
            }, "\n      ", HTML.DIV({                                                                                  // 40
              "class": "media"                                                                                         // 41
            }, "\n        ", HTML.DIV({                                                                                // 42
              "class": "media-body"                                                                                    // 43
            }, "\n          ", HTML.A({                                                                                // 44
              href: function() {                                                                                       // 45
                return [ "/vokabelregister/", Spacebars.mustache(view.lookup("_id")) ];                                // 46
              }                                                                                                        // 47
            }, "\n            ", HTML.H4({                                                                             // 48
              "class": "media-heading"                                                                                 // 49
            }, Blaze.View("lookup:term", function() {                                                                  // 50
              return Spacebars.mustache(view.lookup("term"));                                                          // 51
            })), " ", Blaze.View("lookup:description", function() {                                                    // 52
              return Spacebars.mustache(view.lookup("description"));                                                   // 53
            }), "\n          "), "\n        "), "\n        ", HTML.DIV({                                               // 54
              "class": "media-right media-middle btn-fav"                                                              // 55
            }, "\n          ", Blaze.If(function() {                                                                   // 56
              return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));       // 57
            }, function() {                                                                                            // 58
              return [ "\n            ", HTML.I({                                                                      // 59
                "class": "fa fa-heart fa-4x"                                                                           // 60
              }), "\n            " ];                                                                                  // 61
            }, function() {                                                                                            // 62
              return [ "\n            ", HTML.I({                                                                      // 63
                "class": "fa fa-heart-o fa-4x"                                                                         // 64
              }), "\n          " ];                                                                                    // 65
            }), "\n\n\n        "), "\n      "), "\n    "), "\n\n    " ];                                               // 66
          }), " " ];                                                                                                   // 67
        }, function() {                                                                                                // 68
          return [ "\n    ", HTML.P({                                                                                  // 69
            "class": "alert alert-warning"                                                                             // 70
          }, 'Nichts gefunden unter dem Begriff " ', Blaze.View("lookup:query", function() {                           // 71
            return Spacebars.mustache(view.lookup("query"));                                                           // 72
          }), ' ".'), "\n    " ];                                                                                      // 73
        }), " " ];                                                                                                     // 74
      }), "\n  "), "\n  " ];                                                                                           // 75
    }, function() {                                                                                                    // 76
      return [ "\n  ", HTML.DIV({                                                                                      // 77
        "class": "panel-group",                                                                                        // 78
        id: "accordion"                                                                                                // 79
      }, "\n    ", Blaze.Each(function() {                                                                             // 80
        return Spacebars.call(view.lookup("vocabulary"));                                                              // 81
      }, function() {                                                                                                  // 82
        return [ "\n    ", HTML.DIV({                                                                                  // 83
          "class": "panel panel-default"                                                                               // 84
        }, "\n\n      ", HTML.DIV({                                                                                    // 85
          "class": "panel-heading"                                                                                     // 86
        }, "\n        ", HTML.A({                                                                                      // 87
          "data-toggle": "collapse",                                                                                   // 88
          "data-parent": "#accordion",                                                                                 // 89
          href: function() {                                                                                           // 90
            return [ "#collapse", Spacebars.mustache(view.lookup("letter")) ];                                         // 91
          }                                                                                                            // 92
        }, "\n        ", HTML.H4({                                                                                     // 93
          "class": "panel-title"                                                                                       // 94
        }, "\n          ", Blaze.View("lookup:letter", function() {                                                    // 95
          return Spacebars.mustache(view.lookup("letter"));                                                            // 96
        }), "\n        "), "\n        "), "\n      "), "\n\n      ", HTML.DIV({                                        // 97
          id: function() {                                                                                             // 98
            return [ "collapse", Spacebars.mustache(view.lookup("letter")) ];                                          // 99
          },                                                                                                           // 100
          "class": "panel-collapse collapse"                                                                           // 101
        }, "\n        ", HTML.DIV({                                                                                    // 102
          "class": "panel-body"                                                                                        // 103
        }, "\n\n          ", Blaze.Each(function() {                                                                   // 104
          return Spacebars.call(view.lookup("entries"));                                                               // 105
        }, function() {                                                                                                // 106
          return [ "\n          ", HTML.LI({                                                                           // 107
            "class": "list-group-item clearfix"                                                                        // 108
          }, "\n            ", HTML.DIV({                                                                              // 109
            "class": "media"                                                                                           // 110
          }, "\n              ", HTML.DIV({                                                                            // 111
            "class": "media-body"                                                                                      // 112
          }, "\n                ", HTML.A({                                                                            // 113
            href: function() {                                                                                         // 114
              return [ "/vokabelregister/", Spacebars.mustache(view.lookup("_id")) ];                                  // 115
            }                                                                                                          // 116
          }, "\n                  ", HTML.H4({                                                                         // 117
            "class": "media-heading"                                                                                   // 118
          }, Blaze.View("lookup:term", function() {                                                                    // 119
            return Spacebars.mustache(view.lookup("term"));                                                            // 120
          })), " ", Blaze.View("lookup:description", function() {                                                      // 121
            return Spacebars.mustache(view.lookup("description"));                                                     // 122
          }), "\n                "), "\n              "), "\n              ", HTML.DIV({                               // 123
            "class": "media-right media-middle btn-fav"                                                                // 124
          }, "\n                ", Blaze.If(function() {                                                               // 125
            return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));         // 126
          }, function() {                                                                                              // 127
            return [ "\n                  ", HTML.I({                                                                  // 128
              "class": "fa fa-heart fa-4x"                                                                             // 129
            }), "\n                  " ];                                                                              // 130
          }, function() {                                                                                              // 131
            return [ "\n                  ", HTML.I({                                                                  // 132
              "class": "fa fa-heart-o fa-4x"                                                                           // 133
            }), "\n                " ];                                                                                // 134
          }), "\n\n              "), "\n            "), "\n          "), "\n          " ];                             // 135
        }), "\n\n        "), "\n      "), "\n    "), "\n    " ];                                                       // 136
      }), "\n  "), "\n  " ];                                                                                           // 137
    }), "\n  " ];                                                                                                      // 138
  }, function() {                                                                                                      // 139
    return [ "\n    ", Spacebars.include(view.lookupTemplate("loading")), "\n  " ];                                    // 140
  }) ];                                                                                                                // 141
}));                                                                                                                   // 142
                                                                                                                       // 143
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vokabelregister.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/vokabelregister/template.vokabelregister.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("vokabelregister");                                                                               // 2
Template["vokabelregister"] = new Template("Template.vokabelregister", (function() {                                   // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, "\n\n    ", Spacebars.include(view.lookupTemplate("search")), "\n\n  ");                                          // 7
}));                                                                                                                   // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"search.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/vokabelregister/search.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.search.onCreated(function () {                                                                                // 1
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
		template.subscribe('ownedFavourites');                                                                               // 15
                                                                                                                       //
		Session.set(LENGTH_FAV, Favourites.find().count());                                                                  // 17
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                                  // 18
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.registerHelper("isFavourite", function (vocabularyId) {                                                       // 22
	// console.log(vocabularyId);                                                                                         //
	var favEntry = Favourites.findOne({                                                                                   // 24
		vocabularyId: vocabularyId                                                                                           // 25
	});                                                                                                                   //
	if (favEntry) {                                                                                                       // 27
		return true;                                                                                                         // 28
	}                                                                                                                     //
});                                                                                                                    //
                                                                                                                       //
Template.search.helpers({                                                                                              // 32
	searching: function () {                                                                                              // 33
		function searching() {                                                                                               //
			return Template.instance().searching.get();                                                                         // 34
		}                                                                                                                    //
                                                                                                                       //
		return searching;                                                                                                    //
	}(),                                                                                                                  //
	query: function () {                                                                                                  // 36
		function query() {                                                                                                   //
			return Template.instance().searchQuery.get();                                                                       // 37
		}                                                                                                                    //
                                                                                                                       //
		return query;                                                                                                        //
	}(),                                                                                                                  //
	isAlphabetic: function () {                                                                                           // 39
		function isAlphabetic() {                                                                                            //
			return Template.instance().isAlphabetic.get();                                                                      // 40
		}                                                                                                                    //
                                                                                                                       //
		return isAlphabetic;                                                                                                 //
	}(),                                                                                                                  //
	isLength64: function () {                                                                                             // 42
		function isLength64() {                                                                                              //
			return Template.instance().isLength64.get();                                                                        // 43
		}                                                                                                                    //
                                                                                                                       //
		return isLength64;                                                                                                   //
	}(),                                                                                                                  //
	vocabulary: function () {                                                                                             // 45
		function vocabulary() {                                                                                              //
			// Sort and group entries by letter and create a new array of iterable objects for cascaded template iteration      //
			var vocabularyIndexed = [];                                                                                         // 47
			var alphabet = R.split('', 'abcdefghijklmnopqrstuvwxyz'.toUpperCase());                                             // 48
			var regex = function () {                                                                                           // 49
				function regex(letter) {                                                                                           // 49
					return new RegExp("^" + letter, "i");                                                                             //
				}                                                                                                                  //
                                                                                                                       //
				return regex;                                                                                                      //
			}();                                                                                                                //
                                                                                                                       //
			alphabet.forEach(function (entry) {                                                                                 // 51
				var array = Vocabulary.find({                                                                                      // 52
					term: {                                                                                                           // 53
						$in: [regex(entry)]                                                                                              // 54
					}                                                                                                                 //
				}, {                                                                                                               //
					sort: {                                                                                                           // 57
						term: 1                                                                                                          // 58
					}                                                                                                                 //
				});                                                                                                                //
				if (array.count() !== 0) {                                                                                         // 61
					vocabularyIndexed.push({                                                                                          // 62
						'letter': entry,                                                                                                 // 63
						'entries': array                                                                                                 // 64
					});                                                                                                               //
				}                                                                                                                  //
			});                                                                                                                 //
                                                                                                                       //
			if (vocabularyIndexed) {                                                                                            // 69
				return vocabularyIndexed;                                                                                          // 70
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return vocabulary;                                                                                                   //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.search.events({                                                                                               // 75
	'keyup [name="search"]': function () {                                                                                // 76
		function keyupNameSearch(event, template) {                                                                          //
			var value = event.target.value;                                                                                     // 77
			console.log(value);                                                                                                 // 78
			if (value !== '') {                                                                                                 // 79
				// check if string is valid                                                                                        //
				if (Validate.isAlphabetic(value)) {                                                                                // 81
					template.isAlphabetic.set(true);                                                                                  // 82
				} else {                                                                                                           //
					template.isAlphabetic.set(false);                                                                                 // 84
				}                                                                                                                  //
				if (Validate.isLength64(value)) {                                                                                  // 86
					template.isLength64.set(true);                                                                                    // 87
				} else {                                                                                                           //
					template.isLength64.set(false);                                                                                   // 89
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			if (value !== '' && event.keyCode === 13) {                                                                         // 93
				if (template.isAlphabetic.get() && template.isLength64.get()) {                                                    // 94
					template.searchQuery.set(value);                                                                                  // 95
					template.searching.set(true);                                                                                     // 96
				}                                                                                                                  //
			}                                                                                                                   //
                                                                                                                       //
			if (value === '') {                                                                                                 // 100
				template.searchQuery.set(value);                                                                                   // 101
				template.isAlphabetic.set(true);                                                                                   // 102
				template.isLength64.set(true);                                                                                     // 103
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return keyupNameSearch;                                                                                              //
	}(),                                                                                                                  //
	'click .btn-fav': function () {                                                                                       // 107
		function clickBtnFav(event, template) {                                                                              //
			Meteor.call('toggleFavourite', this._id);                                                                           // 108
                                                                                                                       //
			// TODO DRY                                                                                                         //
			if (Favourites.find({                                                                                               // 107
				vocabularyId: this._id                                                                                             // 112
			}).count() === 0) {                                                                                                 //
				// add to favourites                                                                                               //
				if (Session.get(RANDOM_NOT_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {                 // 115
					var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                          // 116
					Session.set(COUNT_VIEWED, val);                                                                                   // 117
				}                                                                                                                  //
				if (Session.get(LENGTH_NOT_FAV) === 1) {                                                                           // 119
					Session.set(RANDOM_FAV, true);                                                                                    // 120
					Session.set(RANDOM_NOT_FAV, false);                                                                               // 121
				}                                                                                                                  //
			} else {                                                                                                            //
				// remove from favourites                                                                                          //
				if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                         // 125
					var _val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                             // 126
					Session.set(COUNT_VIEWED, _val);                                                                                  // 127
				}                                                                                                                  //
				if (Session.get(LENGTH_FAV) === 1) {                                                                               // 129
					Session.set(RANDOM_FAV, false);                                                                                   // 130
					Session.set(RANDOM_NOT_FAV, true);                                                                                // 131
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnFav;                                                                                                  //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index_low.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/views/template.index_low.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("indexLow");                                                                                      // 2
Template["indexLow"] = new Template("Template.indexLow", (function() {                                                 // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div class="container">\n    <h1>Index LOW</h1>\n    <p>\n      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,\n      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.\n    </p>\n  </div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"layout":{"bar.html":function(){

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
  return HTML.A({                                                                                                      // 5
    href: function() {                                                                                                 // 6
      return Blaze.If(function() {                                                                                     // 7
        return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                     // 8
      }, function() {                                                                                                  // 9
        return Blaze.View("lookup:getSession", function() {                                                            // 10
          return Spacebars.mustache(view.lookup("getSession"), "lastPath");                                            // 11
        });                                                                                                            // 12
      }, function() {                                                                                                  // 13
        return "/low";                                                                                                 // 14
      });                                                                                                              // 15
    }                                                                                                                  // 16
  }, "\n  ", HTML.NAV({                                                                                                // 17
    "class": function() {                                                                                              // 18
      return [ "navbar navbar-default navbar-fixed-top ", Blaze.If(function() {                                        // 19
        return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                     // 20
      }, function() {                                                                                                  // 21
        return "alert-success";                                                                                        // 22
      }, function() {                                                                                                  // 23
        return "alert-info";                                                                                           // 24
      }), " text-center attention-mode" ];                                                                             // 25
    }                                                                                                                  // 26
  }, "\n    ", HTML.DIV({                                                                                              // 27
    "class": "container"                                                                                               // 28
  }, "\n\n        ", HTML.H1(Blaze.If(function() {                                                                     // 29
    return Spacebars.dataMustache(view.lookup("getSession"), "attentionMode");                                         // 30
  }, function() {                                                                                                      // 31
    return [ HTML.I({                                                                                                  // 32
      "class": "fa fa-eye"                                                                                             // 33
    }), " Attention mode on" ];                                                                                        // 34
  }, function() {                                                                                                      // 35
    return [ " ", HTML.I({                                                                                             // 36
      "class": "fa fa-eye-slash"                                                                                       // 37
    }), " Attention mode off" ];                                                                                       // 38
  }), " "), "\n\n    "), "\n  "), "\n");                                                                               // 39
}));                                                                                                                   // 40
                                                                                                                       // 41
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

},"layout_basic.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.layout_basic.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("layoutBasic");                                                                                   // 2
Template["layoutBasic"] = new Template("Template.layoutBasic", (function() {                                           // 3
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
      template: Spacebars.call(view.lookup("main"))                                                                    // 25
    };                                                                                                                 // 26
  }, function() {                                                                                                      // 27
    return Spacebars.include(function() {                                                                              // 28
      return Spacebars.call(Template.__dynamic);                                                                       // 29
    });                                                                                                                // 30
  }), "\n  ");                                                                                                         // 31
}));                                                                                                                   // 32
                                                                                                                       // 33
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout_slim.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.layout_slim.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("layoutSlim");                                                                                    // 2
Template["layoutSlim"] = new Template("Template.layoutSlim", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    id: "content"                                                                                                      // 6
  }, "\n    ", Blaze._TemplateWith(function() {                                                                        // 7
    return {                                                                                                           // 8
      template: Spacebars.call(view.lookup("main"))                                                                    // 9
    };                                                                                                                 // 10
  }, function() {                                                                                                      // 11
    return Spacebars.include(function() {                                                                              // 12
      return Spacebars.call(Template.__dynamic);                                                                       // 13
    });                                                                                                                // 14
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 15
    return {                                                                                                           // 16
      template: Spacebars.call(view.lookup("footer"))                                                                  // 17
    };                                                                                                                 // 18
  }, function() {                                                                                                      // 19
    return Spacebars.include(function() {                                                                              // 20
      return Spacebars.call(Template.__dynamic);                                                                       // 21
    });                                                                                                                // 22
  }), "\n  ");                                                                                                         // 23
}));                                                                                                                   // 24
                                                                                                                       // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout_trainer.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.layout_trainer.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("layoutTrainer");                                                                                 // 2
Template["layoutTrainer"] = new Template("Template.layoutTrainer", (function() {                                       // 3
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
      template: Spacebars.call(view.lookup("navTrainer"))                                                              // 25
    };                                                                                                                 // 26
  }, function() {                                                                                                      // 27
    return Spacebars.include(function() {                                                                              // 28
      return Spacebars.call(Template.__dynamic);                                                                       // 29
    });                                                                                                                // 30
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 31
    return {                                                                                                           // 32
      template: Spacebars.call(view.lookup("main"))                                                                    // 33
    };                                                                                                                 // 34
  }, function() {                                                                                                      // 35
    return Spacebars.include(function() {                                                                              // 36
      return Spacebars.call(Template.__dynamic);                                                                       // 37
    });                                                                                                                // 38
  }), "\n    ", Blaze._TemplateWith(function() {                                                                       // 39
    return {                                                                                                           // 40
      template: Spacebars.call(view.lookup("navRandom"))                                                               // 41
    };                                                                                                                 // 42
  }, function() {                                                                                                      // 43
    return Spacebars.include(function() {                                                                              // 44
      return Spacebars.call(Template.__dynamic);                                                                       // 45
    });                                                                                                                // 46
  }), "\n  ");                                                                                                         // 47
}));                                                                                                                   // 48
                                                                                                                       // 49
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
    return [ " ", Blaze.View("lookup:userMail", function() {                                                           // 12
      return Spacebars.mustache(view.lookup("userMail"));                                                              // 13
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
        regex: "favouriten"                                                                                            // 45
      }));                                                                                                             // 46
    }                                                                                                                  // 47
  }, HTML.A({                                                                                                          // 48
    href: function() {                                                                                                 // 49
      return Spacebars.mustache(view.lookup("pathFor"), "favouriten");                                                 // 50
    }                                                                                                                  // 51
  }, "Favouriten")), "\n        ", HTML.LI({                                                                           // 52
    role: "presentation",                                                                                              // 53
    "class": function() {                                                                                              // 54
      return Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({                                           // 55
        regex: "vokabelregister"                                                                                       // 56
      }));                                                                                                             // 57
    }                                                                                                                  // 58
  }, HTML.A({                                                                                                          // 59
    href: function() {                                                                                                 // 60
      return Spacebars.mustache(view.lookup("pathFor"), "vokabelregister");                                            // 61
    }                                                                                                                  // 62
  }, "Vokabelregister")), "\n      "), "\n    "), "\n  ");                                                             // 63
}));                                                                                                                   // 64
                                                                                                                       // 65
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_random.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav_random.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navRandom");                                                                                     // 2
Template["navRandom"] = new Template("Template.navRandom", (function() {                                               // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "row text-center"                                                                                         // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "btn-group btn-group-justified",                                                                          // 10
    role: "group"                                                                                                      // 11
  }, "\n				", Blaze.If(function() {                                                                                   // 12
    return Spacebars.call(view.lookup("lengthFav"));                                                                   // 13
  }, function() {                                                                                                      // 14
    return [ "\n				", HTML.DIV({                                                                                      // 15
      "class": "btn-group",                                                                                            // 16
      role: "group"                                                                                                    // 17
    }, "\n					", HTML.BUTTON({                                                                                        // 18
      type: "button",                                                                                                  // 19
      "class": function() {                                                                                            // 20
        return [ "btn ", Blaze.If(function() {                                                                         // 21
          return Spacebars.dataMustache(view.lookup("getSession"), "randomFavourites");                                // 22
        }, function() {                                                                                                // 23
          return "btn-success";                                                                                        // 24
        }, function() {                                                                                                // 25
          return "btn-default";                                                                                        // 26
        }), " btn-lg btn-favourites" ];                                                                                // 27
      }                                                                                                                // 28
    }, "\n						", HTML.I({                                                                                            // 29
      "class": "fa fa-heart fa-2x"                                                                                     // 30
    }), "\n						", HTML.P("\n							Woerter aus Favoriten ", HTML.SPAN({                                              // 31
      "class": "label label-default"                                                                                   // 32
    }, Blaze.View("lookup:lengthFav", function() {                                                                     // 33
      return Spacebars.mustache(view.lookup("lengthFav"));                                                             // 34
    })), "\n						"), "\n					"), "\n				"), "\n				" ];                                                               // 35
  }), "\n				", Blaze.If(function() {                                                                                  // 36
    return Spacebars.call(view.lookup("lengthNotFav"));                                                                // 37
  }, function() {                                                                                                      // 38
    return [ "\n				", HTML.DIV({                                                                                      // 39
      "class": "btn-group",                                                                                            // 40
      role: "group"                                                                                                    // 41
    }, "\n					", HTML.BUTTON({                                                                                        // 42
      type: "button",                                                                                                  // 43
      "class": function() {                                                                                            // 44
        return [ "btn ", Blaze.Unless(function() {                                                                     // 45
          return Spacebars.dataMustache(view.lookup("getSession"), "randomFavourites");                                // 46
        }, function() {                                                                                                // 47
          return "btn-success";                                                                                        // 48
        }, function() {                                                                                                // 49
          return "btn-default";                                                                                        // 50
        }), " btn-lg  btn-not-favourites" ];                                                                           // 51
      }                                                                                                                // 52
    }, "\n						", HTML.I({                                                                                            // 53
      "class": "fa fa-list fa-2x"                                                                                      // 54
    }), "\n						", HTML.P("\n							Woerter aus Nicht-Favouriten ", HTML.SPAN({                                       // 55
      "class": "label label-default"                                                                                   // 56
    }, Blaze.View("lookup:lengthNotFav", function() {                                                                  // 57
      return Spacebars.mustache(view.lookup("lengthNotFav"));                                                          // 58
    })), "\n						"), "\n					"), "\n				"), "\n				" ];                                                               // 59
  }), "\n			"), "\n		"), "\n	");                                                                                       // 60
}));                                                                                                                   // 61
                                                                                                                       // 62
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_trainer.html":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/template.nav_trainer.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navTrainer");                                                                                    // 2
Template["navTrainer"] = new Template("Template.navTrainer", (function() {                                             // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<br>\n	<br>\n	"), HTML.DIV({                                                                      // 5
    "class": "container"                                                                                               // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "row text-center"                                                                                         // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "btn-group btn-group-justified",                                                                          // 10
    role: "group",                                                                                                     // 11
    "aria-label": "Large button group"                                                                                 // 12
  }, "\n				", HTML.A({                                                                                                // 13
    "class": function() {                                                                                              // 14
      return [ "btn btn-lg btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({              // 15
        regex: "trainerLesen"                                                                                          // 16
      })) ];                                                                                                           // 17
    },                                                                                                                 // 18
    href: function() {                                                                                                 // 19
      return Spacebars.mustache(view.lookup("pathFor"), "trainerLesen");                                               // 20
    }                                                                                                                  // 21
  }, HTML.Raw("Lesen &amp; Aussuchen")), "\n				", HTML.A({                                                            // 22
    "class": function() {                                                                                              // 23
      return [ "btn btn-lg btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({              // 24
        regex: "trainerEingabe"                                                                                        // 25
      })) ];                                                                                                           // 26
    },                                                                                                                 // 27
    href: function() {                                                                                                 // 28
      return Spacebars.mustache(view.lookup("pathFor"), "trainerEingabe");                                             // 29
    }                                                                                                                  // 30
  }, "Eingabe"), "\n				", HTML.A({                                                                                    // 31
    "class": function() {                                                                                              // 32
      return [ "btn btn-lg btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({              // 33
        regex: "trainerWort"                                                                                           // 34
      })) ];                                                                                                           // 35
    },                                                                                                                 // 36
    href: function() {                                                                                                 // 37
      return Spacebars.mustache(view.lookup("pathFor"), "trainerWort");                                                // 38
    }                                                                                                                  // 39
  }, "Wort"), "\n			"), "\n		"), "\n	"), HTML.Raw("\n	<br>\n	<br>") ];                                                 // 40
}));                                                                                                                   // 41
                                                                                                                       // 42
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
      var routePath = FlowRouter.current().path;                                                                       // 6
      Session.set(LAST_PATH, routePath);                                                                               // 7
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
Template.layoutTrainer.onCreated(function () {                                                                         // 1
	var _this = this;                                                                                                     //
                                                                                                                       //
	this.autorun(function () {                                                                                            // 2
		_this.subscribe('vocabularyAll'); // Vocabulary.find()                                                               // 3
		_this.subscribe('ownedFavourites'); // Favourites.find()                                                             // 2
                                                                                                                       //
		Session.set(LENGTH_FAV, Favourites.find().count());                                                                  // 2
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                                  // 7
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
//  Session variables                                                                                                  //
                                                                                                                       //
ATTENTION_MODE = 'attentionMode';                                                                                      // 13
Session.setDefault(ATTENTION_MODE, false);                                                                             // 14
                                                                                                                       //
LAST_PATH = 'lastPath';                                                                                                // 16
Session.setDefault(LAST_PATH, '/');                                                                                    // 17
                                                                                                                       //
LAST_PATH_TRAINER = 'lastPathTrainer';                                                                                 // 19
Session.setDefault(LAST_PATH_TRAINER, '/trainer/lesen');                                                               // 20
                                                                                                                       //
RANDOM_FAV = 'randomFavourites';                                                                                       // 22
Session.setDefault(RANDOM_FAV, false);                                                                                 // 23
                                                                                                                       //
RANDOM_NOT_FAV = 'randomNotFavourites';                                                                                // 25
Session.setDefault(RANDOM_NOT_FAV, true);                                                                              // 26
                                                                                                                       //
LENGTH_FAV = 'lengthFav';                                                                                              // 28
Session.setDefault(LENGTH_FAV, 0);                                                                                     // 29
                                                                                                                       //
LENGTH_NOT_FAV = 'lengthNotFav';                                                                                       // 31
Session.setDefault(LENGTH_NOT_FAV, 0);                                                                                 // 32
                                                                                                                       //
COUNT_VIEWED = 'countViewed';                                                                                          // 34
Session.setDefault(COUNT_VIEWED, 0);                                                                                   // 35
                                                                                                                       //
REVEALED = 'revealed';                                                                                                 // 37
Session.setDefault(REVEALED, false);                                                                                   // 38
                                                                                                                       //
TERM_MODE = 'termMode';                                                                                                // 40
Session.setDefault(TERM_MODE, true);                                                                                   // 41
                                                                                                                       //
TERM_WRONG = 'termWrong';                                                                                              // 43
Session.setDefault(TERM_WRONG, false);                                                                                 // 44
                                                                                                                       //
TERM_RIGHT = 'termRight';                                                                                              // 46
Session.setDefault(TERM_RIGHT, false);                                                                                 // 47
                                                                                                                       //
TERM_CACHE = 'termCache';                                                                                              // 49
Session.setDefault(TERM_CACHE, '');                                                                                    // 50
                                                                                                                       //
COUNT_LETTERS_MATCH = 'countLettersMatch';                                                                             // 52
Session.setDefault(COUNT_LETTERS_MATCH, 0);                                                                            // 53
                                                                                                                       //
// Global helpers                                                                                                      //
                                                                                                                       //
// e.g. {{getSession "posX"}} in Template                                                                              //
Template.registerHelper('getSession', function (key) {                                                                 // 58
	return Session.get(key);                                                                                              // 59
});                                                                                                                    //
Template.registerHelper('userMail', function () {                                                                      // 61
	return Meteor.user().emails[0].address;                                                                               // 62
});                                                                                                                    //
Template.registerHelper('isOwner', function () {                                                                       // 64
	return this.userId == Meteor.userId();                                                                                // 65
});                                                                                                                    //
Template.registerHelper("lengthIsOne", function () {                                                                   // 67
	return Session.get(LENGTH_FAV) === 1 && Session.get(RANDOM_FAV) || Session.get(LENGTH_NOT_FAV) === 1 && Session.get(RANDOM_NOT_FAV);
});                                                                                                                    //
Template.registerHelper("entry", function () {                                                                         // 71
	var currentUserId = this.userId;                                                                                      // 72
	var favIds = R.pluck('vocabularyId')(Favourites.find().fetch());                                                      // 73
	var vocabulary = [];                                                                                                  // 74
                                                                                                                       //
	if (Session.get('randomFavourites')) {                                                                                // 76
		vocabulary = Vocabulary.find({                                                                                       // 77
			_id: {                                                                                                              // 78
				$in: favIds                                                                                                        // 79
			}                                                                                                                   //
		}).fetch();                                                                                                          //
	} else {                                                                                                              //
		vocabulary = Vocabulary.find({                                                                                       // 83
			_id: {                                                                                                              // 84
				$nin: favIds                                                                                                       // 85
			}                                                                                                                   //
		}).fetch();                                                                                                          //
	}                                                                                                                     //
	return vocabulary[Session.get(COUNT_VIEWED)];                                                                         // 89
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout_trainer.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/layout_trainer.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.layoutTrainer.onCreated(function () {                                                                         // 1
	var _this = this;                                                                                                     //
                                                                                                                       //
	this.autorun(function () {                                                                                            // 2
		_this.subscribe('vocabularyAll');                                                                                    // 3
		_this.subscribe('ownedFavourites');                                                                                  // 4
	});                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.layoutTrainer.events({                                                                                        // 8
	'click .btn-reveal': function () {                                                                                    // 9
		function clickBtnReveal(event, template) {                                                                           //
			if (!Session.get(REVEALED)) {                                                                                       // 10
				Session.set(REVEALED, true);                                                                                       // 11
			}                                                                                                                   //
			if (document.getElementById("term").disabled === false) {                                                           // 13
				document.getElementById("term").disabled = true;                                                                   // 14
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnReveal;                                                                                               //
	}(),                                                                                                                  //
	'click .btn-switch': function () {                                                                                    // 18
		function clickBtnSwitch(event, template) {                                                                           //
			var oldValue = Session.get(TERM_MODE) || false;                                                                     // 19
			Session.set(TERM_MODE, !oldValue);                                                                                  // 20
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnSwitch;                                                                                               //
	}(),                                                                                                                  //
	'click .btn-forward, click .btn-backward': function () {                                                              // 23
		function clickBtnForwardClickBtnBackward(event, template) {                                                          //
			if (Session.get(REVEALED)) {                                                                                        // 24
				Session.set(REVEALED, false);                                                                                      // 25
			}                                                                                                                   //
			if (Session.get(TERM_WRONG)) {                                                                                      // 27
				Session.set(TERM_WRONG, false);                                                                                    // 28
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 30
				document.getElementById("term").value = '';                                                                        // 31
				if (document.getElementById("term").disabled === true) {                                                           // 32
					document.getElementById("term").disabled = false;                                                                 // 33
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnForwardClickBtnBackward;                                                                              //
	}(),                                                                                                                  //
	'click .btn-backward': function () {                                                                                  // 38
		function clickBtnBackward(event, template) {                                                                         //
			var val = 0;                                                                                                        // 39
			if (Session.get(RANDOM_FAV)) {                                                                                      // 40
				// to avoid going into negative numbers and be able to circle backwards                                            //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                             // 42
					val = Session.get(LENGTH_FAV) - 1;                                                                                // 43
					Session.set(COUNT_VIEWED, val);                                                                                   // 44
				} else {                                                                                                           //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_FAV);                                                  // 46
					Session.set(COUNT_VIEWED, val);                                                                                   // 47
				}                                                                                                                  //
			} else {                                                                                                            //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                             // 50
					val = Session.get(LENGTH_NOT_FAV) - 1;                                                                            // 51
					Session.set(COUNT_VIEWED, val);                                                                                   // 52
				} else {                                                                                                           //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_NOT_FAV);                                              // 54
					Session.set(COUNT_VIEWED, val);                                                                                   // 55
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnBackward;                                                                                             //
	}(),                                                                                                                  //
	'click .btn-forward': function () {                                                                                   // 60
		function clickBtnForward(event, template) {                                                                          //
			var val = 0;                                                                                                        // 61
			if (Session.get(RANDOM_FAV)) {                                                                                      // 62
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                                   // 63
				Session.set(COUNT_VIEWED, val);                                                                                    // 64
			} else {                                                                                                            //
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                               // 66
				Session.set(COUNT_VIEWED, val);                                                                                    // 67
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnForward;                                                                                              //
	}(),                                                                                                                  //
	'click .btn-fav': function () {                                                                                       // 71
		function clickBtnFav(event, template) {                                                                              //
			Meteor.call('toggleFavourite', this._id);                                                                           // 72
                                                                                                                       //
			// reset the COUNT VIEW when a list entry has been removed                                                          //
			if (Session.get(RANDOM_NOT_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {                  // 71
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                           // 76
				Session.set(COUNT_VIEWED, val);                                                                                    // 77
			}                                                                                                                   //
                                                                                                                       //
			if (Session.get(LENGTH_NOT_FAV) === 1) {                                                                            // 80
				Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));                                                         // 81
				Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));                                                                 // 82
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnFav;                                                                                                  //
	}(),                                                                                                                  //
	'click .btn-delete': function () {                                                                                    // 86
		function clickBtnDelete(event, template) {                                                                           //
			Meteor.call('deleteFavourite', this._id);                                                                           // 87
                                                                                                                       //
			if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                          // 89
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                               // 90
				Session.set(COUNT_VIEWED, val);                                                                                    // 91
			}                                                                                                                   //
			if (Session.get(LENGTH_FAV) === 1) {                                                                                // 93
				Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));                                                                 // 94
				Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));                                                         // 95
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnDelete;                                                                                               //
	}()                                                                                                                   //
});                                                                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_random.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client/layout/nav_random.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navRandom.events({                                                                                            // 1
	'click .btn-favourites, click .btn-not-favourites': function () {                                                     // 2
		function clickBtnFavouritesClickBtnNotFavourites() {                                                                 //
			if (Session.get(REVEALED)) {                                                                                        // 3
				Session.set(REVEALED, false);                                                                                      // 4
			}                                                                                                                   //
			if (Session.get(TERM_WRONG)) {                                                                                      // 6
				Session.set(TERM_WRONG, false);                                                                                    // 7
			}                                                                                                                   //
			if (document.getElementById("term")) {                                                                              // 9
				document.getElementById("term").value = '';                                                                        // 10
				if (document.getElementById("term").disabled === true) {                                                           // 11
					document.getElementById("term").disabled = false;                                                                 // 12
				}                                                                                                                  //
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnFavouritesClickBtnNotFavourites;                                                                      //
	}(),                                                                                                                  //
	'click .btn-favourites': function () {                                                                                // 16
		function clickBtnFavourites() {                                                                                      //
			if (!Session.get(RANDOM_FAV) && Session.get(RANDOM_NOT_FAV)) {                                                      // 17
				// set values so that each button has its own responsibility                                                       //
				Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));                                                                 // 19
				Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));                                                         // 20
				// reset counter range when switching between fav and not-fav                                                      //
				var val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_FAV);                                                     // 17
				Session.set('countViewed', val);                                                                                   // 23
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnFavourites;                                                                                           //
	}(),                                                                                                                  //
	'click .btn-not-favourites': function () {                                                                            // 26
		function clickBtnNotFavourites() {                                                                                   //
			if (!Session.get(RANDOM_NOT_FAV) && Session.get(RANDOM_FAV)) {                                                      // 27
				Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));                                                         // 28
				Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));                                                                 // 29
				var val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_NOT_FAV);                                                 // 30
				Session.set('countViewed', val);                                                                                   // 31
			}                                                                                                                   //
		}                                                                                                                    //
                                                                                                                       //
		return clickBtnNotFavourites;                                                                                        //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
Template.navRandom.helpers({                                                                                           // 36
	lengthFav: function () {                                                                                              // 37
		function lengthFav() {                                                                                               //
			return Session.get(LENGTH_FAV);                                                                                     // 38
		}                                                                                                                    //
                                                                                                                       //
		return lengthFav;                                                                                                    //
	}(),                                                                                                                  //
	lengthNotFav: function () {                                                                                           // 40
		function lengthNotFav() {                                                                                            //
			return Session.get(LENGTH_NOT_FAV);                                                                                 // 41
		}                                                                                                                    //
                                                                                                                       //
		return lengthNotFav;                                                                                                 //
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
})(this.Aux = {});                                                                                                     //
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

}},"collections":{"favourites.js":function(){

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

},"local.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/collections/local.js                                                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"viewed.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/collections/viewed.js                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var ViewedSchema = new SimpleSchema({                                                                                  // 1
	userId: {                                                                                                             // 2
		type: String,                                                                                                        // 3
		autoValue: function () {                                                                                             // 4
			function autoValue() {                                                                                              // 4
				return this.userId;                                                                                                // 5
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}()                                                                                                                  //
	},                                                                                                                    //
	vocabularyId: {                                                                                                       // 8
		type: String                                                                                                         // 9
	},                                                                                                                    //
	createdAt: {                                                                                                          // 11
		type: Date,                                                                                                          // 12
		autoValue: function () {                                                                                             // 13
			function autoValue() {                                                                                              // 13
				return new Date();                                                                                                 // 14
			}                                                                                                                   //
                                                                                                                       //
			return autoValue;                                                                                                   //
		}(),                                                                                                                 //
		autoform: {                                                                                                          // 16
			type: "hidden"                                                                                                      // 17
		}                                                                                                                    //
	},                                                                                                                    //
	timesViewed: {                                                                                                        // 20
		type: Number,                                                                                                        // 21
		defaultValue: 0                                                                                                      // 22
	}                                                                                                                     //
	// link to page the word was looked up from                                                                           //
});                                                                                                                    // 1
                                                                                                                       //
Viewed = new Mongo.Collection('viewed', {});                                                                           // 27
Viewed.attachSchema(ViewedSchema);                                                                                     // 28
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

},"at_config.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/config/at_config.js                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Options                                                                                                             //
AccountsTemplates.configure({                                                                                          // 2
  defaultLayout: 'layoutSlim',                                                                                         // 3
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

}},"router":{"routes.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// common/router/routes.js                                                                                             //
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
setTrainerPath = function setTrainerPath() {                                                                           // 15
	Session.set(LAST_PATH_TRAINER, FlowRouter.current().route.path);                                                      // 16
};                                                                                                                     //
                                                                                                                       //
resetSession = function resetSession() {                                                                               // 19
	Session.set(REVEALED, false);                                                                                         // 20
	Session.set(TERM_WRONG, false);                                                                                       // 21
};                                                                                                                     //
                                                                                                                       //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                                                         // 24
                                                                                                                       //
// *** ROUTE GROUPS                                                                                                    //
                                                                                                                       //
var lowRoutes = FlowRouter.group({                                                                                     // 28
	name: "low",                                                                                                          // 29
	triggersEnter: [checkAttentionModeOn],                                                                                // 30
	triggersExit: []                                                                                                      // 31
});                                                                                                                    //
var basicRoutes = FlowRouter.group({                                                                                   // 33
	name: "basic",                                                                                                        // 34
	triggersEnter: [checkAttentionModeOff],                                                                               // 35
	triggersExit: []                                                                                                      // 36
});                                                                                                                    //
                                                                                                                       //
basicRoutes.trainerRoutes = FlowRouter.group({                                                                         // 39
	name: "trainer",                                                                                                      // 40
	triggersEnter: [setTrainerPath],                                                                                      // 41
	triggersExit: [resetSession]                                                                                          // 42
});                                                                                                                    //
                                                                                                                       //
// *** ROUTES                                                                                                          //
                                                                                                                       //
basicRoutes.route('/', {                                                                                               // 47
	name: "index",                                                                                                        // 48
	action: function () {                                                                                                 // 49
		function action(params, queryParams) {                                                                               // 49
			BlazeLayout.render('layoutBasic', {                                                                                 // 50
				bar: "bar",                                                                                                        // 51
				nav: "nav",                                                                                                        // 52
				main: "index"                                                                                                      // 53
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
basicRoutes.route('/favouriten', {                                                                                     // 57
	name: "favouriten",                                                                                                   // 58
	action: function () {                                                                                                 // 59
		function action(params, queryParams) {                                                                               // 59
			BlazeLayout.render('layoutBasic', {                                                                                 // 60
				bar: "bar",                                                                                                        // 61
				nav: "nav",                                                                                                        // 62
				main: "favouriten"                                                                                                 // 63
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
basicRoutes.route('/trainer', {                                                                                        // 67
	name: "trainer",                                                                                                      // 68
	action: function () {                                                                                                 // 69
		function action(params, queryParams) {                                                                               // 69
			FlowRouter.go(Session.get('lastPathTrainer'));                                                                      // 70
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
basicRoutes.trainerRoutes.route('/trainer/lesen', {                                                                    // 73
	name: "trainerLesen",                                                                                                 // 74
	action: function () {                                                                                                 // 75
		function action(params, queryParams) {                                                                               // 75
			BlazeLayout.render('layoutTrainer', {                                                                               // 76
				bar: "bar",                                                                                                        // 77
				nav: "nav",                                                                                                        // 78
				navTrainer: "navTrainer",                                                                                          // 79
				main: "trainerLesen",                                                                                              // 80
				navRandom: "navRandom"                                                                                             // 81
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
basicRoutes.trainerRoutes.route('/trainer/eingabe', {                                                                  // 85
	name: "trainerEingabe",                                                                                               // 86
	action: function () {                                                                                                 // 87
		function action(params, queryParams) {                                                                               // 87
			BlazeLayout.render('layoutTrainer', {                                                                               // 88
				bar: "bar",                                                                                                        // 89
				nav: "nav",                                                                                                        // 90
				navTrainer: "navTrainer",                                                                                          // 91
				main: "trainerEingabe",                                                                                            // 92
				navRandom: "navRandom"                                                                                             // 93
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
basicRoutes.trainerRoutes.route('/trainer/wort', {                                                                     // 97
	name: "trainerWort",                                                                                                  // 98
	action: function () {                                                                                                 // 99
		function action(params, queryParams) {                                                                               // 99
			BlazeLayout.render('layoutTrainer', {                                                                               // 100
				bar: "bar",                                                                                                        // 101
				nav: "nav",                                                                                                        // 102
				navTrainer: "navTrainer",                                                                                          // 103
				main: "trainerWort",                                                                                               // 104
				navRandom: "navRandom"                                                                                             // 105
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
basicRoutes.trainerRoutes.route('/trainer/bedeutung', {                                                                // 109
	name: "trainerBedeutung",                                                                                             // 110
	action: function () {                                                                                                 // 111
		function action(params, queryParams) {                                                                               // 111
			BlazeLayout.render('layoutTrainer', {                                                                               // 112
				bar: "bar",                                                                                                        // 113
				nav: "nav",                                                                                                        // 114
				navTrainer: "navTrainer",                                                                                          // 115
				main: "trainerBedeutung",                                                                                          // 116
				navRandom: "navRandom"                                                                                             // 117
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
basicRoutes.route('/vokabelregister', {                                                                                // 122
	name: "vokabelregister",                                                                                              // 123
	action: function () {                                                                                                 // 124
		function action(params, queryParams) {                                                                               // 124
			BlazeLayout.render('layoutBasic', {                                                                                 // 125
				bar: "bar",                                                                                                        // 126
				nav: "nav",                                                                                                        // 127
				main: "vokabelregister"                                                                                            // 128
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
basicRoutes.route('/vokabelregister/:id', {                                                                            // 132
	name: "vokabelDetail",                                                                                                // 133
	action: function () {                                                                                                 // 134
		function action(params, queryParams) {                                                                               // 134
			console.log(params);                                                                                                // 135
			BlazeLayout.render('layoutBasic', {                                                                                 // 136
				bar: "bar",                                                                                                        // 137
				nav: "nav",                                                                                                        // 138
				main: "vokabelDetail"                                                                                              // 139
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
});                                                                                                                    //
                                                                                                                       //
lowRoutes.route('/low', {                                                                                              // 145
	name: "indexLow",                                                                                                     // 146
	action: function () {                                                                                                 // 147
		function action(params, queryParams) {                                                                               // 147
			BlazeLayout.render('layoutBasic', {                                                                                 // 148
				bar: "bar",                                                                                                        // 149
				main: "indexLow"                                                                                                   // 150
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}(),                                                                                                                  //
	triggersEnter: [function (context, redirect) {}]                                                                      // 153
});                                                                                                                    //
                                                                                                                       //
FlowRouter.notFound = {                                                                                                // 156
	action: function () {                                                                                                 // 157
		function action() {                                                                                                  // 157
			BlazeLayout.render('layoutSlim', {                                                                                  // 158
				footer: "footer",                                                                                                  // 159
				main: "pageNotFound"                                                                                               // 160
			});                                                                                                                 //
		}                                                                                                                    //
                                                                                                                       //
		return action;                                                                                                       //
	}()                                                                                                                   //
};                                                                                                                     //
                                                                                                                       //
//Routes                                                                                                               //
AccountsTemplates.configureRoute('changePwd');                                                                         // 167
// AccountsTemplates.configureRoute('forgotPwd');                                                                      //
AccountsTemplates.configureRoute('resetPwd');                                                                          // 169
AccountsTemplates.configureRoute('signIn');                                                                            // 170
AccountsTemplates.configureRoute('signUp');                                                                            // 171
// AccountsTemplates.configureRoute('verifyEmail');                                                                    //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/views/_shared/modus_bedeutung.html");
require("./client/views/_shared/modus_wort.html");
require("./client/views/_shared/vokabel_detail.html");
require("./client/views/favouriten/favouriten.html");
require("./client/views/index/index.html");
require("./client/views/trainer/eingabe.html");
require("./client/views/trainer/lesen.html");
require("./client/views/trainer/wort.html");
require("./client/views/vokabelregister/search.html");
require("./client/views/vokabelregister/vokabelregister.html");
require("./client/layout/bar.html");
require("./client/layout/footer.html");
require("./client/layout/head.html");
require("./client/layout/layout_basic.html");
require("./client/layout/layout_slim.html");
require("./client/layout/layout_trainer.html");
require("./client/layout/nav.html");
require("./client/layout/nav_random.html");
require("./client/layout/nav_trainer.html");
require("./client/views/index_low.html");
require("./client/loading.html");
require("./client/page_not_found.html");
require("./client/views/_shared/vokabel_detail.js");
require("./client/views/favouriten/favouriten.js");
require("./client/views/index/index.js");
require("./client/views/trainer/eingabe.js");
require("./client/views/vokabelregister/search.js");
require("./client/layout/bar.js");
require("./client/layout/layout.js");
require("./client/layout/layout_trainer.js");
require("./client/layout/nav_random.js");
require("./common/aux/aux.js");
require("./common/aux/validation.js");
require("./common/collections/favourites.js");
require("./common/collections/local.js");
require("./common/collections/viewed.js");
require("./common/collections/vocabulary.js");
require("./common/config/accounts_t9n.js");
require("./common/config/at_config.js");
require("./common/router/routes.js");
require("./client/init.js");