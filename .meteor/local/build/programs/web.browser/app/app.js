var require = meteorInstall({"client":{"views":{"_shared":{"vokabel_detail.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/_shared/template.vokabel_detail.js                                                                //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("vokabelDetail");                                                                            // 2
Template["vokabelDetail"] = new Template("Template.vokabelDetail", (function() {                                  // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "container"                                                                                          // 6
  }, "\n		", Blaze.If(function() {                                                                                // 7
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                          // 8
  }, function() {                                                                                                 // 9
    return [ "\n		    ", Spacebars.With(function() {                                                              // 10
      return Spacebars.call(view.lookup("entry"));                                                                // 11
    }, function() {                                                                                               // 12
      return [ "\n		      ", HTML.H3(Blaze.View("lookup:term", function() {                                       // 13
        return Spacebars.mustache(view.lookup("term"));                                                           // 14
      })), "\n		      ", HTML.P(Blaze.View("lookup:description", function() {                                     // 15
        return Spacebars.mustache(view.lookup("description"));                                                    // 16
      })), "\n		    " ];                                                                                          // 17
    }), "\n		  " ];                                                                                               // 18
  }, function() {                                                                                                 // 19
    return [ "\n		      ", Spacebars.include(view.lookupTemplate("loading")), "\n		  " ];                         // 20
  }), HTML.Raw("\n\n			<p>\n				noch weitere Details.\n				<ul>\n					<li>Fav button</li>\n					<li>Beispielsatz</li>\n					<li>Synonym</li>\n				</ul>\n			</p>\n\n	"));
}));                                                                                                              // 22
                                                                                                                  // 23
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"vokabel_detail.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/_shared/vokabel_detail.js                                                                         //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.vokabelDetail.onCreated(function () {                                                                    // 1
  var self = this;                                                                                                // 2
  self.autorun(function () {                                                                                      // 3
    var entryId = FlowRouter.getParam('id');                                                                      // 4
    self.subscribe('singleEntry', entryId);                                                                       // 5
  });                                                                                                             //
});                                                                                                               //
                                                                                                                  //
Template.vokabelDetail.helpers({                                                                                  // 9
  entry: function () {                                                                                            // 10
    function entry() {                                                                                            //
      var entryId = FlowRouter.getParam('id');                                                                    // 11
      var entry = Vocabulary.findOne({ _id: entryId }) || {};                                                     // 12
      return entry;                                                                                               // 13
    }                                                                                                             //
                                                                                                                  //
    return entry;                                                                                                 //
  }()                                                                                                             //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"favouriten":{"favouriten.html":function(){

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
  }, HTML.Raw('\n    <div class="page-header clearfix">\n      <h4 class="pull-left">Favouriten</h4>\n      <div class="pull-right"></div>\n    </div>\n\n    '), Blaze.If(function() {
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                          // 8
  }, function() {                                                                                                 // 9
    return [ "\n    ", HTML.UL({                                                                                  // 10
      "class": "list-group"                                                                                       // 11
    }, "\n      ", Blaze.If(function() {                                                                          // 12
      return Spacebars.call(view.lookup("favourites"));                                                           // 13
    }, function() {                                                                                               // 14
      return [ "\n        ", Blaze.Each(function() {                                                              // 15
        return Spacebars.call(view.lookup("favourites"));                                                         // 16
      }, function() {                                                                                             // 17
        return [ "\n          ", HTML.LI({                                                                        // 18
          "class": "list-group-item clearfix"                                                                     // 19
        }, "\n            ", HTML.DIV({                                                                           // 20
          "class": "media"                                                                                        // 21
        }, "\n                ", HTML.DIV({                                                                       // 22
          "class": "media-body"                                                                                   // 23
        }, "\n                  ", HTML.A({                                                                       // 24
          href: function() {                                                                                      // 25
            return [ "/vokabelregister/", Spacebars.mustache(view.lookup("_id")) ];                               // 26
          }                                                                                                       // 27
        }, "\n                    ", HTML.H4({                                                                    // 28
          "class": "media-heading"                                                                                // 29
        }, Blaze.View("lookup:term", function() {                                                                 // 30
          return Spacebars.mustache(view.lookup("term"));                                                         // 31
        })), "\n                    ", Blaze.View("lookup:description", function() {                              // 32
          return Spacebars.mustache(view.lookup("description"));                                                  // 33
        }), "\n                  "), "\n                "), "\n              ", HTML.DIV({                        // 34
          "class": "media-right media-middle btn-delete"                                                          // 35
        }, "\n                ", HTML.I({                                                                         // 36
          "class": "fa fa-trash-o fa-4x"                                                                          // 37
        }), "\n              "), "\n            "), "\n          "), "\n        " ];                              // 38
      }), "\n      " ];                                                                                           // 39
    }, function() {                                                                                               // 40
      return [ "\n      ", HTML.P({                                                                               // 41
        "class": "alert alert-warning"                                                                            // 42
      }, "Keine Favouriten bisher gespeichert. Zum favourisieren von Begriffen klicke auf das Herz-Symbol neben dem jeweiligen Begriff."), "\n      " ];
    }), "\n    "), "\n    " ];                                                                                    // 44
  }, function() {                                                                                                 // 45
    return [ "\n      ", Spacebars.include(view.lookupTemplate("loading")), "\n    " ];                           // 46
  }), "\n  ");                                                                                                    // 47
}));                                                                                                              // 48
                                                                                                                  // 49
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
		_this.subscribe('vocabularyFavourised');                                                                        // 4
                                                                                                                  //
		Session.set(LENGTH_FAV, Favourites.find().count());                                                             // 6
		Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                             // 7
	});                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.favouriten.helpers({                                                                                     // 12
	favourites: function () {                                                                                        // 13
		function favourites() {                                                                                         //
			var favIds = R.pluck('vocabularyId')(Favourites.find({}).fetch());                                             // 14
			if (Favourites.find().count() !== 0) {                                                                         // 15
				return Vocabulary.find({                                                                                      // 16
					_id: {                                                                                                       // 17
						$in: favIds                                                                                                 // 18
					}                                                                                                            //
				}, {                                                                                                          //
					sort: {                                                                                                      // 21
						term: 1                                                                                                     // 22
					}                                                                                                            //
				});                                                                                                           //
			} else {                                                                                                       //
				return null;                                                                                                  // 26
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return favourites;                                                                                              //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.favouriten.events({                                                                                      // 31
	'click .btn-delete': function () {                                                                               // 32
		function clickBtnDelete(event, template) {                                                                      //
			Meteor.call('deleteFavourite', this._id);                                                                      // 33
                                                                                                                  //
			if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                     // 35
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                          // 36
				Session.set(COUNT_VIEWED, val);                                                                               // 37
			}                                                                                                              //
			// set random bar buttons to non fav list if the last entry in fav list has been removed via fav menu          //
			if (Session.get(LENGTH_FAV) === 1) {                                                                           // 32
				Session.set(RANDOM_FAV, false);                                                                               // 41
				Session.set(RANDOM_NOT_FAV, true);                                                                            // 42
			}                                                                                                              //
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
  return HTML.Raw('<div class="container">\n    <h1>Index - Startseite.</h1>\n    <p>\n      5 Tage nach Registration/ nach 5 Logins folgende Meldung:\n    </p>\n    <p class="alert alert-info">Bitte fuelle den Fragebogen aus. Du hast bis zum 03. Juli 2016 dafuer Zeit. Nur mit ausgefuellten Fragebogen ist deine Teilnahme gueltig.\n      <input class="btn btn-default" type="submit" value="Fragebogen">\n    </p>\n    <p>\n\n    </p>\n\n    <h4>TODO: </h4>\n    <ul>\n      <li>TOP 5 last viewed</li>\n      <li>TOP 5 popularity on users fav lists</li>\n      <li>Vocabulary of the day</li>\n    </ul>\n\n    <p>\n      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,\n      sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.\n    </p>\n\n    <h4>Log Data: </h4>\n    <ul>\n      <li>Count successful Logins</li>\n      <li> Login and Logout + Timestamp, Browser, OS</li>\n      <li>Clicked Menu items plus timestamp</li>\n      <li>Clicked Attention button plus timestamp</li>\n      <li>Count words viewed and in which mode -> compare attention high/ low plus timestamp -> how did the use evolve?</li>\n      <li></li>\n    </ul>\n\n    <h4>Fragebogen: </h4>\n    <ul>\n      <li>Welchen Trainermodus hast du am liebsten genutzt?</li>\n      <li>Von welchem Endgeraet aus hast du die App genutzt?</li>\n      <li>Falls von mehreren: Inwiefern hat sich dein Nutzerverhalten mit den versch. Endgeraeten veraendert?</li>\n      <li>Hat die Moeglichkeit, den Modus zu wechseln, dein Nutzungsverhalten veraendert? Falls ja, wie?</li>\n      <li>Wie hat dir die Moeglichkeit gefallen das UI zu reduzieren?</li>\n      <li>Hast du vom Attention Mode Gebrauch gemacht? Wann, wo und in welchen Situationen?</li>\n      <li>Wie Zufrieden warst du mit der Benutzeroberflaeche?</li>\n      <li>Fandest du die Bedienung der App verstaendlich?</li>\n      <li>...</li>\n    </ul>\n\n  </div>');
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

}},"trainer":{"bedeutung.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/trainer/template.bedeutung.js                                                                     //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("trainerBedeutung");                                                                         // 2
Template["trainerBedeutung"] = new Template("Template.trainerBedeutung", (function() {                            // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div class="container">\n		<div class="row">\n			<h1>Bedeutung</h1>\n		</div>\n	</div>');      // 5
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"eingabe.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/trainer/template.eingabe.js                                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("trainerEingabe");                                                                           // 2
Template["trainerEingabe"] = new Template("Template.trainerEingabe", (function() {                                // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div class="container">\n		<div class="row">\n			<h1>Eingabe</h1>\n		</div>\n	</div>');        // 5
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lesen.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/trainer/template.lesen.js                                                                         //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("trainerLesen");                                                                             // 2
Template["trainerLesen"] = new Template("Template.trainerLesen", (function() {                                    // 3
  var view = this;                                                                                                // 4
  return [ HTML.DIV({                                                                                             // 5
    "class": "container"                                                                                          // 6
  }, "\n		", HTML.DIV({                                                                                           // 7
    "class": "media"                                                                                              // 8
  }, "\n\n			", Blaze.If(function() {                                                                             // 9
    return Spacebars.call(view.lookup("lengthIsOne"));                                                            // 10
  }, function() {                                                                                                 // 11
    return [ "\n			", HTML.DIV({                                                                                  // 12
      "class": "media-left media-middle"                                                                          // 13
    }, "\n				", HTML.I({                                                                                         // 14
      "class": "fa fa-ban fa-4x"                                                                                  // 15
    }), "\n			"), "\n			" ];                                                                                      // 16
  }, function() {                                                                                                 // 17
    return [ "\n			", HTML.DIV({                                                                                  // 18
      "class": "media-left media-middle btn-backward"                                                             // 19
    }, "\n				", HTML.I({                                                                                         // 20
      "class": "fa fa-chevron-left fa-4x"                                                                         // 21
    }), "\n			"), "\n			" ];                                                                                      // 22
  }), "\n\n			", HTML.DIV({                                                                                       // 23
    "class": "media-body"                                                                                         // 24
  }, "\n				", Blaze.If(function() {                                                                              // 25
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                          // 26
  }, function() {                                                                                                 // 27
    return [ "\n				", HTML.DIV({                                                                                 // 28
      "class": "jumbotron"                                                                                        // 29
    }, "\n					", Spacebars.With(function() {                                                                     // 30
      return Spacebars.call(view.lookup("entry"));                                                                // 31
    }, function() {                                                                                               // 32
      return [ "\n					", HTML.H2(Blaze.View("lookup:term", function() {                                          // 33
        return Spacebars.mustache(view.lookup("term"));                                                           // 34
      }), " ", Blaze.If(function() {                                                                              // 35
        return Spacebars.call(view.lookup("lengthIsOne"));                                                        // 36
      }, function() {                                                                                             // 37
        return HTML.SPAN({                                                                                        // 38
          "class": "label label-info"                                                                             // 39
        }, "Letzter Eintrag");                                                                                    // 40
      }), "\n						", Blaze.If(function() {                                                                       // 41
        return Spacebars.dataMustache(view.lookup("getSession"), "randomFavourites");                             // 42
      }, function() {                                                                                             // 43
        return [ "\n							", HTML.DIV({                                                                          // 44
          "class": "btn-delete"                                                                                   // 45
        }, "\n								", HTML.I({                                                                                 // 46
          "class": "fa fa-trash-o fa-2x"                                                                          // 47
        }), "\n							"), "\n						" ];                                                                           // 48
      }, function() {                                                                                             // 49
        return [ "\n							", HTML.DIV({                                                                          // 50
          "class": "btn-fav"                                                                                      // 51
        }, "\n								", Blaze.If(function() {                                                                    // 52
          return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));      // 53
        }, function() {                                                                                           // 54
          return [ "\n									", HTML.I({                                                                        // 55
            "class": "fa fa-heart fa-2x"                                                                          // 56
          }), "\n									" ];                                                                                    // 57
        }, function() {                                                                                           // 58
          return [ "\n									", HTML.I({                                                                        // 59
            "class": "fa fa-heart-o fa-2x"                                                                        // 60
          }), "\n								" ];                                                                                     // 61
        }), "\n							"), "\n						" ];                                                                           // 62
      }), "\n				"), "\n					", HTML.H3("\n						", HTML.OL("\n							", HTML.LI(Blaze.View("lookup:description", function() {
        return Spacebars.mustache(view.lookup("description"));                                                    // 64
      })), "\n						"), "\n					"), "\n					", HTML.HR(), "\n				" ];                                             // 65
    }), "\n				"), "\n				" ];                                                                                    // 66
  }, function() {                                                                                                 // 67
    return [ "\n					", Spacebars.include(view.lookupTemplate("loading")), "\n				" ];                            // 68
  }), "\n			"), "\n\n			", Blaze.If(function() {                                                                  // 69
    return Spacebars.call(view.lookup("lengthIsOne"));                                                            // 70
  }, function() {                                                                                                 // 71
    return [ "\n			", HTML.DIV({                                                                                  // 72
      "class": "media-right media-middle"                                                                         // 73
    }, "\n				", HTML.I({                                                                                         // 74
      "class": "fa fa-ban fa-4x"                                                                                  // 75
    }), "\n			"), "\n			" ];                                                                                      // 76
  }, function() {                                                                                                 // 77
    return [ "\n			", HTML.DIV({                                                                                  // 78
      "class": "media-right media-middle btn-forward"                                                             // 79
    }, "\n				", HTML.I({                                                                                         // 80
      "class": "fa fa-chevron-right fa-4x"                                                                        // 81
    }), "\n			"), "\n			" ];                                                                                      // 82
  }), "\n		"), "\n		", HTML.P("\n			countViewed: ", Blaze.View("lookup:countViewed", function() {                 // 83
    return Spacebars.mustache(view.lookup("countViewed"));                                                        // 84
  }), "\n		"), "\n		", HTML.P("\n			mod: ", Blaze.View("lookup:mod", function() {                                 // 85
    return Spacebars.mustache(view.lookup("mod"));                                                                // 86
  }), "\n		"), "\n\n	"), HTML.Raw("\n	<br>") ];                                                                   // 87
}));                                                                                                              // 88
                                                                                                                  // 89
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"wort.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/trainer/template.wort.js                                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("trainerWort");                                                                              // 2
Template["trainerWort"] = new Template("Template.trainerWort", (function() {                                      // 3
  var view = this;                                                                                                // 4
  return HTML.Raw('<div class="container">\n		<div class="row">\n			<h1>Wort</h1>\n		</div>\n	</div>');           // 5
}));                                                                                                              // 6
                                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lesen.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/views/trainer/lesen.js                                                                                  //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.trainerLesen.onCreated(function () {                                                                     // 1
	var _this = this;                                                                                                //
                                                                                                                  //
	this.autorun(function () {                                                                                       // 2
		_this.subscribe('vocabularyAll');                                                                               // 3
		_this.subscribe('ownedFavourites');                                                                             // 4
	});                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.trainerLesen.helpers({                                                                                   // 8
	entry: function () {                                                                                             // 9
		function entry() {                                                                                              //
			var currentUserId = this.userId;                                                                               // 10
			var favIds = R.pluck('vocabularyId')(Favourites.find().fetch());                                               // 11
			var vocabulary = [];                                                                                           // 12
                                                                                                                  //
			if (Session.get('randomFavourites')) {                                                                         // 14
				vocabulary = Vocabulary.find({                                                                                // 15
					_id: {                                                                                                       // 16
						$in: favIds                                                                                                 // 17
					}                                                                                                            //
				}).fetch();                                                                                                   //
			} else {                                                                                                       //
				vocabulary = Vocabulary.find({                                                                                // 21
					_id: {                                                                                                       // 22
						$nin: favIds                                                                                                // 23
					}                                                                                                            //
				}).fetch();                                                                                                   //
			}                                                                                                              //
			return vocabulary[Session.get(COUNT_VIEWED)];                                                                  // 27
		}                                                                                                               //
                                                                                                                  //
		return entry;                                                                                                   //
	}(),                                                                                                             //
	countViewed: function () {                                                                                       // 29
		function countViewed() {                                                                                        //
			return Session.get(COUNT_VIEWED);                                                                              // 30
		}                                                                                                               //
                                                                                                                  //
		return countViewed;                                                                                             //
	}(),                                                                                                             //
	lengthIsOne: function () {                                                                                       // 32
		function lengthIsOne() {                                                                                        //
			return Session.get(LENGTH_FAV) === 1 && Session.get(RANDOM_FAV) || Session.get(LENGTH_NOT_FAV) === 1 && Session.get(RANDOM_NOT_FAV);
		}                                                                                                               //
                                                                                                                  //
		return lengthIsOne;                                                                                             //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.trainerLesen.events({                                                                                    // 38
	'click .btn-backward': function () {                                                                             // 39
		function clickBtnBackward(event, template) {                                                                    //
			var val = 0;                                                                                                   // 40
			if (Session.get(RANDOM_FAV)) {                                                                                 // 41
				// to avoid going into negative numbers                                                                       //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                        // 43
					val = Session.get(LENGTH_FAV) - 1;                                                                           // 44
					Session.set(COUNT_VIEWED, val);                                                                              // 45
				} else {                                                                                                      //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_FAV);                                             // 47
					Session.set(COUNT_VIEWED, val);                                                                              // 48
				}                                                                                                             //
			} else {                                                                                                       //
				if (Session.get(COUNT_VIEWED) === 0) {                                                                        // 52
					val = Session.get(LENGTH_NOT_FAV) - 1;                                                                       // 53
					Session.set(COUNT_VIEWED, val);                                                                              // 54
				} else {                                                                                                      //
					val = (Session.get(COUNT_VIEWED) - 1) % Session.get(LENGTH_NOT_FAV);                                         // 56
					Session.set(COUNT_VIEWED, val);                                                                              // 57
				}                                                                                                             //
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return clickBtnBackward;                                                                                        //
	}(),                                                                                                             //
	'click .btn-forward': function () {                                                                              // 62
		function clickBtnForward(event, template) {                                                                     //
			var val = 0;                                                                                                   // 63
			if (Session.get(RANDOM_FAV)) {                                                                                 // 64
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                              // 65
				Session.set(COUNT_VIEWED, val);                                                                               // 66
			} else {                                                                                                       //
				val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                          // 68
				Session.set(COUNT_VIEWED, val);                                                                               // 69
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return clickBtnForward;                                                                                         //
	}(),                                                                                                             //
	'click .btn-fav': function () {                                                                                  // 73
		function clickBtnFav(event, template) {                                                                         //
			Meteor.call('toggleFavourite', this._id);                                                                      // 74
                                                                                                                  //
			// reset the COUNT VIEW when a list entry has been removed                                                     //
			if (Session.get(RANDOM_NOT_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {             // 73
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                      // 78
				Session.set(COUNT_VIEWED, val);                                                                               // 79
			}                                                                                                              //
                                                                                                                  //
			if (Session.get(LENGTH_NOT_FAV) === 1) {                                                                       // 82
				Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));                                                    // 83
				Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));                                                            // 84
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return clickBtnFav;                                                                                             //
	}(),                                                                                                             //
	'click .btn-delete': function () {                                                                               // 88
		function clickBtnDelete(event, template) {                                                                      //
			Meteor.call('deleteFavourite', this._id);                                                                      // 89
                                                                                                                  //
			if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                     // 91
				var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                          // 92
				Session.set(COUNT_VIEWED, val);                                                                               // 93
			}                                                                                                              //
			if (Session.get(LENGTH_FAV) === 1) {                                                                           // 95
				Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));                                                            // 96
				Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));                                                    // 97
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return clickBtnDelete;                                                                                          //
	}()                                                                                                              //
});                                                                                                               //
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
  return [ HTML.Raw('<div class="page-header clearfix">\n\n      <input type="text" name="search" class="form-control" width="300px" placeholder="Finde einen Begriff...">\n\n  </div>\n\n    '), Blaze.Unless(function() {
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
  }), "\n\n", Blaze.If(function() {                                                                               // 17
    return Spacebars.call(view.templateInstance().subscriptionsReady());                                          // 18
  }, function() {                                                                                                 // 19
    return [ "\n  ", Blaze.If(function() {                                                                        // 20
      return Spacebars.call(view.lookup("query"));                                                                // 21
    }, function() {                                                                                               // 22
      return [ "\n  ", HTML.UL({                                                                                  // 23
        "class": "list-group"                                                                                     // 24
      }, "\n    ", Blaze.If(function() {                                                                          // 25
        return Spacebars.call(view.lookup("searching"));                                                          // 26
      }, function() {                                                                                             // 27
        return [ " ", Spacebars.include(view.lookupTemplate("loading")), " " ];                                   // 28
      }, function() {                                                                                             // 29
        return [ " ", Blaze.Each(function() {                                                                     // 30
          return Spacebars.call(view.lookup("vocabulary"));                                                       // 31
        }, function() {                                                                                           // 32
          return [ "\n    ", HTML.H3(Blaze.View("lookup:letter", function() {                                     // 33
            return Spacebars.mustache(view.lookup("letter"));                                                     // 34
          })), " ", Blaze.Each(function() {                                                                       // 35
            return Spacebars.call(view.lookup("entries"));                                                        // 36
          }, function() {                                                                                         // 37
            return [ "\n    ", HTML.LI({                                                                          // 38
              "class": "list-group-item clearfix"                                                                 // 39
            }, "\n      ", HTML.DIV({                                                                             // 40
              "class": "media"                                                                                    // 41
            }, "\n        ", HTML.DIV({                                                                           // 42
              "class": "media-body"                                                                               // 43
            }, "\n          ", HTML.A({                                                                           // 44
              href: function() {                                                                                  // 45
                return [ "/vokabelregister/", Spacebars.mustache(view.lookup("_id")) ];                           // 46
              }                                                                                                   // 47
            }, "\n            ", HTML.H4({                                                                        // 48
              "class": "media-heading"                                                                            // 49
            }, Blaze.View("lookup:term", function() {                                                             // 50
              return Spacebars.mustache(view.lookup("term"));                                                     // 51
            })), " ", Blaze.View("lookup:description", function() {                                               // 52
              return Spacebars.mustache(view.lookup("description"));                                              // 53
            }), "\n          "), "\n        "), "\n        ", HTML.DIV({                                          // 54
              "class": "media-right media-middle btn-fav"                                                         // 55
            }, "\n          ", Blaze.If(function() {                                                              // 56
              return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));  // 57
            }, function() {                                                                                       // 58
              return [ "\n            ", HTML.I({                                                                 // 59
                "class": "fa fa-heart fa-4x"                                                                      // 60
              }), "\n            " ];                                                                             // 61
            }, function() {                                                                                       // 62
              return [ "\n            ", HTML.I({                                                                 // 63
                "class": "fa fa-heart-o fa-4x"                                                                    // 64
              }), "\n          " ];                                                                               // 65
            }), "\n\n\n        "), "\n      "), "\n    "), "\n\n    " ];                                          // 66
          }), " " ];                                                                                              // 67
        }, function() {                                                                                           // 68
          return [ "\n    ", HTML.P({                                                                             // 69
            "class": "alert alert-warning"                                                                        // 70
          }, 'Nichts gefunden unter dem Begriff " ', Blaze.View("lookup:query", function() {                      // 71
            return Spacebars.mustache(view.lookup("query"));                                                      // 72
          }), ' ".'), "\n    " ];                                                                                 // 73
        }), " " ];                                                                                                // 74
      }), "\n  "), "\n  " ];                                                                                      // 75
    }, function() {                                                                                               // 76
      return [ "\n  ", HTML.DIV({                                                                                 // 77
        "class": "panel-group",                                                                                   // 78
        id: "accordion"                                                                                           // 79
      }, "\n    ", Blaze.Each(function() {                                                                        // 80
        return Spacebars.call(view.lookup("vocabulary"));                                                         // 81
      }, function() {                                                                                             // 82
        return [ "\n    ", HTML.DIV({                                                                             // 83
          "class": "panel panel-default"                                                                          // 84
        }, "\n\n      ", HTML.DIV({                                                                               // 85
          "class": "panel-heading"                                                                                // 86
        }, "\n        ", HTML.A({                                                                                 // 87
          "data-toggle": "collapse",                                                                              // 88
          "data-parent": "#accordion",                                                                            // 89
          href: function() {                                                                                      // 90
            return [ "#collapse", Spacebars.mustache(view.lookup("letter")) ];                                    // 91
          }                                                                                                       // 92
        }, "\n        ", HTML.H4({                                                                                // 93
          "class": "panel-title"                                                                                  // 94
        }, "\n          ", Blaze.View("lookup:letter", function() {                                               // 95
          return Spacebars.mustache(view.lookup("letter"));                                                       // 96
        }), "\n        "), "\n        "), "\n      "), "\n\n      ", HTML.DIV({                                   // 97
          id: function() {                                                                                        // 98
            return [ "collapse", Spacebars.mustache(view.lookup("letter")) ];                                     // 99
          },                                                                                                      // 100
          "class": "panel-collapse collapse"                                                                      // 101
        }, "\n        ", HTML.DIV({                                                                               // 102
          "class": "panel-body"                                                                                   // 103
        }, "\n\n          ", Blaze.Each(function() {                                                              // 104
          return Spacebars.call(view.lookup("entries"));                                                          // 105
        }, function() {                                                                                           // 106
          return [ "\n          ", HTML.LI({                                                                      // 107
            "class": "list-group-item clearfix"                                                                   // 108
          }, "\n            ", HTML.DIV({                                                                         // 109
            "class": "media"                                                                                      // 110
          }, "\n              ", HTML.DIV({                                                                       // 111
            "class": "media-body"                                                                                 // 112
          }, "\n                ", HTML.A({                                                                       // 113
            href: function() {                                                                                    // 114
              return [ "/vokabelregister/", Spacebars.mustache(view.lookup("_id")) ];                             // 115
            }                                                                                                     // 116
          }, "\n                  ", HTML.H4({                                                                    // 117
            "class": "media-heading"                                                                              // 118
          }, Blaze.View("lookup:term", function() {                                                               // 119
            return Spacebars.mustache(view.lookup("term"));                                                       // 120
          })), " ", Blaze.View("lookup:description", function() {                                                 // 121
            return Spacebars.mustache(view.lookup("description"));                                                // 122
          }), "\n                "), "\n              "), "\n              ", HTML.DIV({                          // 123
            "class": "media-right media-middle btn-fav"                                                           // 124
          }, "\n                ", Blaze.If(function() {                                                          // 125
            return Spacebars.dataMustache(view.lookup("isFavourite"), Spacebars.dot(view.lookup("."), "_id"));    // 126
          }, function() {                                                                                         // 127
            return [ "\n                  ", HTML.I({                                                             // 128
              "class": "fa fa-heart fa-4x"                                                                        // 129
            }), "\n                  " ];                                                                         // 130
          }, function() {                                                                                         // 131
            return [ "\n                  ", HTML.I({                                                             // 132
              "class": "fa fa-heart-o fa-4x"                                                                      // 133
            }), "\n                " ];                                                                           // 134
          }), "\n\n              "), "\n            "), "\n          "), "\n          " ];                        // 135
        }), "\n\n        "), "\n      "), "\n    "), "\n    " ];                                                  // 136
      }), "\n  "), "\n  " ];                                                                                      // 137
    }), "\n  " ];                                                                                                 // 138
  }, function() {                                                                                                 // 139
    return [ "\n    ", Spacebars.include(view.lookupTemplate("loading")), "\n  " ];                               // 140
  }) ];                                                                                                           // 141
}));                                                                                                              // 142
                                                                                                                  // 143
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
                                                                                                                  //
			// TODO DRY                                                                                                    //
			if (Favourites.find({                                                                                          // 104
				vocabularyId: this._id                                                                                        // 109
			}).count() === 0) {                                                                                            //
				// add to favourites                                                                                          //
				if (Session.get(RANDOM_NOT_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_NOT_FAV) - 1) {            // 112
					var val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_NOT_FAV);                                     // 113
					Session.set(COUNT_VIEWED, val);                                                                              // 114
				}                                                                                                             //
				if (Session.get(LENGTH_NOT_FAV) === 1) {                                                                      // 116
					Session.set(RANDOM_FAV, true);                                                                               // 117
					Session.set(RANDOM_NOT_FAV, false);                                                                          // 118
				}                                                                                                             //
			} else {                                                                                                       //
				// remove from favourites                                                                                     //
				if (Session.get(RANDOM_FAV) && Session.get(COUNT_VIEWED) >= Session.get(LENGTH_FAV) - 1) {                    // 122
					var _val = (Session.get(COUNT_VIEWED) + 1) % Session.get(LENGTH_FAV);                                        // 123
					Session.set(COUNT_VIEWED, _val);                                                                             // 124
				}                                                                                                             //
				if (Session.get(LENGTH_FAV) === 1) {                                                                          // 126
					Session.set(RANDOM_FAV, false);                                                                              // 127
					Session.set(RANDOM_NOT_FAV, true);                                                                           // 128
				}                                                                                                             //
			}                                                                                                              //
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
  return HTML.Raw('<div id="footer">\n    <hr>\n    <p>\n      Chalimo Vokabeltrainer | <a href="#">FAQ</a>\n    </p>\n\n  </div>');
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

},"layout_basic.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.layout_basic.js                                                                         //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("layoutBasic");                                                                              // 2
Template["layoutBasic"] = new Template("Template.layoutBasic", (function() {                                      // 3
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

},"layout_slim.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.layout_slim.js                                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("layoutSlim");                                                                               // 2
Template["layoutSlim"] = new Template("Template.layoutSlim", (function() {                                        // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    id: "content"                                                                                                 // 6
  }, "\n    ", Blaze._TemplateWith(function() {                                                                   // 7
    return {                                                                                                      // 8
      template: Spacebars.call(view.lookup("main"))                                                               // 9
    };                                                                                                            // 10
  }, function() {                                                                                                 // 11
    return Spacebars.include(function() {                                                                         // 12
      return Spacebars.call(Template.__dynamic);                                                                  // 13
    });                                                                                                           // 14
  }), "\n    ", Blaze._TemplateWith(function() {                                                                  // 15
    return {                                                                                                      // 16
      template: Spacebars.call(view.lookup("footer"))                                                             // 17
    };                                                                                                            // 18
  }, function() {                                                                                                 // 19
    return Spacebars.include(function() {                                                                         // 20
      return Spacebars.call(Template.__dynamic);                                                                  // 21
    });                                                                                                           // 22
  }), "\n  ");                                                                                                    // 23
}));                                                                                                              // 24
                                                                                                                  // 25
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout_trainer.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.layout_trainer.js                                                                       //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("layoutTrainer");                                                                            // 2
Template["layoutTrainer"] = new Template("Template.layoutTrainer", (function() {                                  // 3
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
      template: Spacebars.call(view.lookup("navTrainer"))                                                         // 25
    };                                                                                                            // 26
  }, function() {                                                                                                 // 27
    return Spacebars.include(function() {                                                                         // 28
      return Spacebars.call(Template.__dynamic);                                                                  // 29
    });                                                                                                           // 30
  }), "\n    ", Blaze._TemplateWith(function() {                                                                  // 31
    return {                                                                                                      // 32
      template: Spacebars.call(view.lookup("main"))                                                               // 33
    };                                                                                                            // 34
  }, function() {                                                                                                 // 35
    return Spacebars.include(function() {                                                                         // 36
      return Spacebars.call(Template.__dynamic);                                                                  // 37
    });                                                                                                           // 38
  }), "\n    ", Blaze._TemplateWith(function() {                                                                  // 39
    return {                                                                                                      // 40
      template: Spacebars.call(view.lookup("navRandom"))                                                          // 41
    };                                                                                                            // 42
  }, function() {                                                                                                 // 43
    return Spacebars.include(function() {                                                                         // 44
      return Spacebars.call(Template.__dynamic);                                                                  // 45
    });                                                                                                           // 46
  }), "\n  ");                                                                                                    // 47
}));                                                                                                              // 48
                                                                                                                  // 49
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
  }, "\n    ", HTML.DIV({                                                                                         // 7
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
    "class": "nav nav-tabs nav-justified"                                                                         // 18
  }, "\n        ", HTML.LI({                                                                                      // 19
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
  }, "Vokabelregister")), "\n      "), "\n    "), "\n  ");                                                        // 63
}));                                                                                                              // 64
                                                                                                                  // 65
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_random.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.nav_random.js                                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("navRandom");                                                                                // 2
Template["navRandom"] = new Template("Template.navRandom", (function() {                                          // 3
  var view = this;                                                                                                // 4
  return HTML.DIV({                                                                                               // 5
    "class": "container"                                                                                          // 6
  }, "\n		", HTML.DIV({                                                                                           // 7
    "class": "row text-center"                                                                                    // 8
  }, "\n			", HTML.DIV({                                                                                          // 9
    "class": "btn-group btn-group-justified",                                                                     // 10
    role: "group"                                                                                                 // 11
  }, "\n				", Blaze.If(function() {                                                                              // 12
    return Spacebars.call(view.lookup("lengthFav"));                                                              // 13
  }, function() {                                                                                                 // 14
    return [ "\n				", HTML.DIV({                                                                                 // 15
      "class": "btn-group",                                                                                       // 16
      role: "group"                                                                                               // 17
    }, "\n					", HTML.BUTTON({                                                                                   // 18
      type: "button",                                                                                             // 19
      "class": function() {                                                                                       // 20
        return [ "btn ", Blaze.If(function() {                                                                    // 21
          return Spacebars.dataMustache(view.lookup("getSession"), "randomFavourites");                           // 22
        }, function() {                                                                                           // 23
          return "btn-success";                                                                                   // 24
        }, function() {                                                                                           // 25
          return "btn-default";                                                                                   // 26
        }), " btn-lg btn-favourites" ];                                                                           // 27
      }                                                                                                           // 28
    }, "\n						", HTML.I({                                                                                       // 29
      "class": "fa fa-random fa-2x"                                                                               // 30
    }), " ", HTML.I({                                                                                             // 31
      "class": "fa fa-heart fa-2x"                                                                                // 32
    }), "\n						", HTML.P("\n							Zufaelliger Favorit ", HTML.SPAN({                                           // 33
      "class": "label label-default"                                                                              // 34
    }, Blaze.View("lookup:lengthFav", function() {                                                                // 35
      return Spacebars.mustache(view.lookup("lengthFav"));                                                        // 36
    })), "\n						"), "\n					"), "\n				"), "\n				" ];                                                          // 37
  }), "\n				", Blaze.If(function() {                                                                             // 38
    return Spacebars.call(view.lookup("lengthNotFav"));                                                           // 39
  }, function() {                                                                                                 // 40
    return [ "\n				", HTML.DIV({                                                                                 // 41
      "class": "btn-group",                                                                                       // 42
      role: "group"                                                                                               // 43
    }, "\n					", HTML.BUTTON({                                                                                   // 44
      type: "button",                                                                                             // 45
      "class": function() {                                                                                       // 46
        return [ "btn ", Blaze.Unless(function() {                                                                // 47
          return Spacebars.dataMustache(view.lookup("getSession"), "randomFavourites");                           // 48
        }, function() {                                                                                           // 49
          return "btn-success";                                                                                   // 50
        }, function() {                                                                                           // 51
          return "btn-default";                                                                                   // 52
        }), " btn-lg  btn-not-favourites" ];                                                                      // 53
      }                                                                                                           // 54
    }, "\n						", HTML.I({                                                                                       // 55
      "class": "fa fa-random fa-2x"                                                                               // 56
    }), " ", HTML.I({                                                                                             // 57
      "class": "fa fa-list fa-2x"                                                                                 // 58
    }), "\n						", HTML.P("\n							Zufaelliger Registereintrag ", HTML.SPAN({                                   // 59
      "class": "label label-default"                                                                              // 60
    }, Blaze.View("lookup:lengthNotFav", function() {                                                             // 61
      return Spacebars.mustache(view.lookup("lengthNotFav"));                                                     // 62
    })), "\n						"), "\n					"), "\n				"), "\n				" ];                                                          // 63
  }), "\n			"), "\n		"), "\n	");                                                                                  // 64
}));                                                                                                              // 65
                                                                                                                  // 66
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_trainer.html":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/template.nav_trainer.js                                                                          //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
                                                                                                                  // 1
Template.__checkName("navTrainer");                                                                               // 2
Template["navTrainer"] = new Template("Template.navTrainer", (function() {                                        // 3
  var view = this;                                                                                                // 4
  return [ HTML.Raw("<br>\n	<br>\n	"), HTML.DIV({                                                                 // 5
    "class": "container"                                                                                          // 6
  }, "\n		", HTML.DIV({                                                                                           // 7
    "class": "row text-center"                                                                                    // 8
  }, "\n			", HTML.DIV({                                                                                          // 9
    "class": "btn-group btn-group-justified",                                                                     // 10
    role: "group",                                                                                                // 11
    "aria-label": "Large button group"                                                                            // 12
  }, "\n				", HTML.A({                                                                                           // 13
    "class": function() {                                                                                         // 14
      return [ "btn btn-lg btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({         // 15
        regex: "trainerLesen"                                                                                     // 16
      })) ];                                                                                                      // 17
    },                                                                                                            // 18
    href: function() {                                                                                            // 19
      return Spacebars.mustache(view.lookup("pathFor"), "trainerLesen");                                          // 20
    }                                                                                                             // 21
  }, "Lesen"), "\n				", HTML.A({                                                                                 // 22
    "class": function() {                                                                                         // 23
      return [ "btn btn-lg btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({         // 24
        regex: "trainerEingabe"                                                                                   // 25
      })) ];                                                                                                      // 26
    },                                                                                                            // 27
    href: function() {                                                                                            // 28
      return Spacebars.mustache(view.lookup("pathFor"), "trainerEingabe");                                        // 29
    }                                                                                                             // 30
  }, "Eingabe"), "\n				", HTML.A({                                                                               // 31
    "class": function() {                                                                                         // 32
      return [ "btn btn-lg btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({         // 33
        regex: "trainerWort"                                                                                      // 34
      })) ];                                                                                                      // 35
    },                                                                                                            // 36
    href: function() {                                                                                            // 37
      return Spacebars.mustache(view.lookup("pathFor"), "trainerWort");                                           // 38
    }                                                                                                             // 39
  }, "Wort"), "\n				", HTML.A({                                                                                  // 40
    "class": function() {                                                                                         // 41
      return [ "btn btn-lg btn-default ", Spacebars.mustache(view.lookup("isActiveRoute"), Spacebars.kw({         // 42
        regex: "trainerBedeutung"                                                                                 // 43
      })) ];                                                                                                      // 44
    },                                                                                                            // 45
    href: function() {                                                                                            // 46
      return Spacebars.mustache(view.lookup("pathFor"), "trainerBedeutung");                                      // 47
    }                                                                                                             // 48
  }, "Bedeutung"), "\n			"), "\n		"), "\n	"), HTML.Raw("\n	<br>\n	<br>") ];                                       // 49
}));                                                                                                              // 50
                                                                                                                  // 51
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"bar.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/bar.js                                                                                           //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.bar.events({                                                                                             // 1
  'click .attention-mode': function () {                                                                          // 2
    function clickAttentionMode() {                                                                               //
      var oldValue = Session.get(ATTENTION_MODE) || false;                                                        // 3
      Session.set(ATTENTION_MODE, !oldValue);                                                                     // 4
                                                                                                                  //
      var routePath = FlowRouter.current().path;                                                                  // 6
      Session.set(LAST_PATH, routePath);                                                                          // 7
    }                                                                                                             //
                                                                                                                  //
    return clickAttentionMode;                                                                                    //
  }()                                                                                                             //
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"layout.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/layout.js                                                                                        //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.trainerLesen.onCreated(function () {                                                                     // 1
  var _this = this;                                                                                               //
                                                                                                                  //
  this.autorun(function () {                                                                                      // 2
    _this.subscribe('vocabularyAll'); // Vocabulary.find()                                                        // 3
    _this.subscribe('ownedFavourites'); // Favourites.find()                                                      // 2
                                                                                                                  //
    Session.set(LENGTH_FAV, Favourites.find().count());                                                           // 2
    Session.set(LENGTH_NOT_FAV, Vocabulary.find().count() - Favourites.find().count());                           // 7
  });                                                                                                             //
});                                                                                                               //
                                                                                                                  //
//  Session variables                                                                                             //
                                                                                                                  //
ATTENTION_MODE = 'attentionMode';                                                                                 // 13
Session.setDefault(ATTENTION_MODE, false);                                                                        // 14
                                                                                                                  //
LAST_PATH = 'lastPath';                                                                                           // 16
Session.setDefault(LAST_PATH, '/');                                                                               // 17
                                                                                                                  //
LAST_PATH_TRAINER = 'lastPathTrainer';                                                                            // 19
Session.setDefault(LAST_PATH_TRAINER, '/trainer/lesen');                                                          // 20
                                                                                                                  //
RANDOM_FAV = 'randomFavourites';                                                                                  // 22
Session.setDefault(RANDOM_FAV, false);                                                                            // 23
                                                                                                                  //
RANDOM_NOT_FAV = 'randomNotFavourites';                                                                           // 25
Session.setDefault(RANDOM_NOT_FAV, true);                                                                         // 26
                                                                                                                  //
LENGTH_FAV = 'lengthFav';                                                                                         // 28
Session.setDefault(LENGTH_FAV, 0);                                                                                // 29
                                                                                                                  //
LENGTH_NOT_FAV = 'lengthNotFav';                                                                                  // 31
Session.setDefault(LENGTH_NOT_FAV, 0);                                                                            // 32
                                                                                                                  //
COUNT_VIEWED = 'countViewed';                                                                                     // 34
Session.setDefault(COUNT_VIEWED, 0);                                                                              // 35
                                                                                                                  //
// Global helpers                                                                                                 //
                                                                                                                  //
// e.g. {{getSession "posX"}} in Template                                                                         //
Template.registerHelper('getSession', function (key) {                                                            // 42
  return Session.get(key);                                                                                        // 43
});                                                                                                               //
Template.registerHelper('userMail', function () {                                                                 // 45
  return Meteor.user().emails[0].address;                                                                         // 46
});                                                                                                               //
Template.registerHelper('isOwner', function () {                                                                  // 48
  return this.userId == Meteor.userId();                                                                          // 49
});                                                                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"nav_random.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// client/layout/nav_random.js                                                                                    //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
Template.navRandom.events({                                                                                       // 1
	'click .btn-favourites': function () {                                                                           // 2
		function clickBtnFavourites() {                                                                                 //
			if (!Session.get(RANDOM_FAV) && Session.get(RANDOM_NOT_FAV)) {                                                 // 3
				// set values so that each button has its own responsibility                                                  //
				Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));                                                            // 5
				Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));                                                    // 6
				// reset counter range when switching between fav and not-fav                                                 //
				var val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_FAV);                                                // 3
				Session.set('countViewed', val);                                                                              // 9
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return clickBtnFavourites;                                                                                      //
	}(),                                                                                                             //
	'click .btn-not-favourites': function () {                                                                       // 12
		function clickBtnNotFavourites() {                                                                              //
			if (!Session.get(RANDOM_NOT_FAV) && Session.get(RANDOM_FAV)) {                                                 // 13
				Session.set(RANDOM_NOT_FAV, !Session.get(RANDOM_NOT_FAV));                                                    // 14
				Session.set(RANDOM_FAV, !Session.get(RANDOM_FAV));                                                            // 15
				var val = Session.get(COUNT_VIEWED) % Session.get(LENGTH_NOT_FAV);                                            // 16
				Session.set('countViewed', val);                                                                              // 17
			}                                                                                                              //
		}                                                                                                               //
                                                                                                                  //
		return clickBtnNotFavourites;                                                                                   //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
Template.navRandom.helpers({                                                                                      // 22
	lengthFav: function () {                                                                                         // 23
		function lengthFav() {                                                                                          //
			return Session.get(LENGTH_FAV);                                                                                // 24
		}                                                                                                               //
                                                                                                                  //
		return lengthFav;                                                                                               //
	}(),                                                                                                             //
	lengthNotFav: function () {                                                                                      // 26
		function lengthNotFav() {                                                                                       //
			return Session.get(LENGTH_NOT_FAV);                                                                            // 27
		}                                                                                                               //
                                                                                                                  //
		return lengthNotFav;                                                                                            //
	}()                                                                                                              //
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
  return HTML.Raw('<div class="alert alert-warning" role="alert">Lade Daten...</div>');                           // 5
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

}},"common":{"aux":{"aux.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/aux/aux.js                                                                                              //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
(function (exports) {                                                                                             // 1
    /**                                                                                                           //
    * Randomize array element order in-place.                                                                     //
    * Using Durstenfeld shuffle algorithm.                                                                        //
    */                                                                                                            //
    exports.shuffle = function (array) {                                                                          // 6
        for (var i = array.length - 1; i > 0; i--) {                                                              // 7
            var j = Math.floor(Math.random() * (i + 1));                                                          // 8
            var temp = array[i];                                                                                  // 9
            array[i] = array[j];                                                                                  // 10
            array[j] = temp;                                                                                      // 11
        }                                                                                                         //
        return array;                                                                                             // 13
    };                                                                                                            //
})(this.Aux = {});                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"validation.js":function(){

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

},"viewed.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// common/collections/viewed.js                                                                                   //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var ViewedSchema = new SimpleSchema({                                                                             // 1
	userId: {                                                                                                        // 2
		type: String,                                                                                                   // 3
		autoValue: function () {                                                                                        // 4
			function autoValue() {                                                                                         // 4
				return this.userId;                                                                                           // 5
			}                                                                                                              //
                                                                                                                  //
			return autoValue;                                                                                              //
		}()                                                                                                             //
	},                                                                                                               //
	vocabularyId: {                                                                                                  // 8
		type: String                                                                                                    // 9
	},                                                                                                               //
	createdAt: {                                                                                                     // 11
		type: Date,                                                                                                     // 12
		autoValue: function () {                                                                                        // 13
			function autoValue() {                                                                                         // 13
				return new Date();                                                                                            // 14
			}                                                                                                              //
                                                                                                                  //
			return autoValue;                                                                                              //
		}(),                                                                                                            //
		autoform: {                                                                                                     // 16
			type: "hidden"                                                                                                 // 17
		}                                                                                                               //
	},                                                                                                               //
	timesViewed: {                                                                                                   // 20
		type: Number,                                                                                                   // 21
		defaultValue: 0                                                                                                 // 22
	}                                                                                                                //
	// link to page the word was looked up from                                                                      //
});                                                                                                               // 1
                                                                                                                  //
Viewed = new Mongo.Collection('viewed', {});                                                                      // 27
Viewed.attachSchema(ViewedSchema);                                                                                // 28
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
		type: String,                                                                                                   // 24
		regEx: /^[a-zA-Z]+$/                                                                                            // 25
	},                                                                                                               //
	description: {                                                                                                   // 27
		type: String                                                                                                    // 28
	}                                                                                                                //
});                                                                                                               //
                                                                                                                  //
Vocabulary.attachSchema(VocabularySchema);                                                                        // 32
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
  defaultLayout: 'layoutSlim',                                                                                    // 3
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
setTrainerPath = function setTrainerPath() {                                                                      // 15
	Session.set('lastPathTrainer', FlowRouter.current().route.path);                                                 // 16
};                                                                                                                //
                                                                                                                  //
FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);                                                    // 19
                                                                                                                  //
// *** ROUTE GROUPS                                                                                               //
                                                                                                                  //
var lowRoutes = FlowRouter.group({                                                                                // 23
	name: "low",                                                                                                     // 24
	triggersEnter: [checkAttentionModeOn],                                                                           // 25
	triggersExit: []                                                                                                 // 26
});                                                                                                               //
var basicRoutes = FlowRouter.group({                                                                              // 28
	name: "basic",                                                                                                   // 29
	triggersEnter: [checkAttentionModeOff],                                                                          // 30
	triggersExit: []                                                                                                 // 31
});                                                                                                               //
                                                                                                                  //
basicRoutes.trainerRoutes = FlowRouter.group({                                                                    // 34
	name: "trainer",                                                                                                 // 35
	triggersEnter: [setTrainerPath],                                                                                 // 36
	triggersExit: []                                                                                                 // 37
});                                                                                                               //
                                                                                                                  //
// *** ROUTES                                                                                                     //
                                                                                                                  //
basicRoutes.route('/', {                                                                                          // 42
	name: "index",                                                                                                   // 43
	action: function () {                                                                                            // 44
		function action(params, queryParams) {                                                                          // 44
			BlazeLayout.render('layoutBasic', {                                                                            // 45
				bar: "bar",                                                                                                   // 46
				nav: "nav",                                                                                                   // 47
				main: "index"                                                                                                 // 48
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.route('/favouriten', {                                                                                // 52
	name: "favouriten",                                                                                              // 53
	action: function () {                                                                                            // 54
		function action(params, queryParams) {                                                                          // 54
			BlazeLayout.render('layoutBasic', {                                                                            // 55
				bar: "bar",                                                                                                   // 56
				nav: "nav",                                                                                                   // 57
				main: "favouriten"                                                                                            // 58
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.route('/trainer', {                                                                                   // 62
	name: "trainer",                                                                                                 // 63
	action: function () {                                                                                            // 64
		function action(params, queryParams) {                                                                          // 64
			FlowRouter.go(Session.get('lastPathTrainer'));                                                                 // 65
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.trainerRoutes.route('/trainer/lesen', {                                                               // 68
	name: "trainerLesen",                                                                                            // 69
	action: function () {                                                                                            // 70
		function action(params, queryParams) {                                                                          // 70
			BlazeLayout.render('layoutTrainer', {                                                                          // 71
				bar: "bar",                                                                                                   // 72
				nav: "nav",                                                                                                   // 73
				navTrainer: "navTrainer",                                                                                     // 74
				main: "trainerLesen",                                                                                         // 75
				navRandom: "navRandom"                                                                                        // 76
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.trainerRoutes.route('/trainer/eingabe', {                                                             // 80
	name: "trainerEingabe",                                                                                          // 81
	action: function () {                                                                                            // 82
		function action(params, queryParams) {                                                                          // 82
			BlazeLayout.render('layoutTrainer', {                                                                          // 83
				bar: "bar",                                                                                                   // 84
				nav: "nav",                                                                                                   // 85
				navTrainer: "navTrainer",                                                                                     // 86
				main: "trainerEingabe",                                                                                       // 87
				navRandom: "navRandom"                                                                                        // 88
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.trainerRoutes.route('/trainer/wort', {                                                                // 92
	name: "trainerWort",                                                                                             // 93
	action: function () {                                                                                            // 94
		function action(params, queryParams) {                                                                          // 94
			BlazeLayout.render('layoutTrainer', {                                                                          // 95
				bar: "bar",                                                                                                   // 96
				nav: "nav",                                                                                                   // 97
				navTrainer: "navTrainer",                                                                                     // 98
				main: "trainerWort",                                                                                          // 99
				navRandom: "navRandom"                                                                                        // 100
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.trainerRoutes.route('/trainer/bedeutung', {                                                           // 104
	name: "trainerBedeutung",                                                                                        // 105
	action: function () {                                                                                            // 106
		function action(params, queryParams) {                                                                          // 106
			BlazeLayout.render('layoutTrainer', {                                                                          // 107
				bar: "bar",                                                                                                   // 108
				nav: "nav",                                                                                                   // 109
				navTrainer: "navTrainer",                                                                                     // 110
				main: "trainerBedeutung",                                                                                     // 111
				navRandom: "navRandom"                                                                                        // 112
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
basicRoutes.route('/vokabelregister', {                                                                           // 117
	name: "vokabelregister",                                                                                         // 118
	action: function () {                                                                                            // 119
		function action(params, queryParams) {                                                                          // 119
			BlazeLayout.render('layoutBasic', {                                                                            // 120
				bar: "bar",                                                                                                   // 121
				nav: "nav",                                                                                                   // 122
				main: "vokabelregister"                                                                                       // 123
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
basicRoutes.route('/vokabelregister/:id', {                                                                       // 127
	name: "vokabelDetail",                                                                                           // 128
	action: function () {                                                                                            // 129
		function action(params, queryParams) {                                                                          // 129
			console.log(params);                                                                                           // 130
			BlazeLayout.render('layoutBasic', {                                                                            // 131
				bar: "bar",                                                                                                   // 132
				nav: "nav",                                                                                                   // 133
				main: "vokabelDetail"                                                                                         // 134
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
});                                                                                                               //
                                                                                                                  //
lowRoutes.route('/low', {                                                                                         // 140
	name: "indexLow",                                                                                                // 141
	action: function () {                                                                                            // 142
		function action(params, queryParams) {                                                                          // 142
			BlazeLayout.render('layoutBasic', {                                                                            // 143
				bar: "bar",                                                                                                   // 144
				main: "indexLow"                                                                                              // 145
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}(),                                                                                                             //
	triggersEnter: [function (context, redirect) {}]                                                                 // 148
});                                                                                                               //
                                                                                                                  //
FlowRouter.notFound = {                                                                                           // 151
	action: function () {                                                                                            // 152
		function action() {                                                                                             // 152
			BlazeLayout.render('layoutSlim', {                                                                             // 153
				footer: "footer",                                                                                             // 154
				main: "pageNotFound"                                                                                          // 155
			});                                                                                                            //
		}                                                                                                               //
                                                                                                                  //
		return action;                                                                                                  //
	}()                                                                                                              //
};                                                                                                                //
                                                                                                                  //
//Routes                                                                                                          //
AccountsTemplates.configureRoute('changePwd');                                                                    // 162
// AccountsTemplates.configureRoute('forgotPwd');                                                                 //
AccountsTemplates.configureRoute('resetPwd');                                                                     // 164
AccountsTemplates.configureRoute('signIn');                                                                       // 165
AccountsTemplates.configureRoute('signUp');                                                                       // 166
// AccountsTemplates.configureRoute('verifyEmail');                                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/views/_shared/vokabel_detail.html");
require("./client/views/favouriten/favouriten.html");
require("./client/views/index/index.html");
require("./client/views/trainer/bedeutung.html");
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
require("./client/views/trainer/lesen.js");
require("./client/views/vokabelregister/search.js");
require("./client/layout/bar.js");
require("./client/layout/layout.js");
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