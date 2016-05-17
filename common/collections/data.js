SimpleSchema.debug = false;

Data = {};
Data.Detail = new Mongo.Collection('dataDetail', {});
Data.Words = new Mongo.Collection('dataWords', {});
Data.Survey = new Mongo.Collection('dataSurvey', {});
Data.Feedback = new Mongo.Collection('dataFeedback', {});
Data.Status = new Mongo.Collection('dataStatus', {});

Data.Survey.allow({
  insert: function () {
    return true;
  }
});
Data.Feedback.allow({
  insert: function () {
    return true;
  }
});

Data.Status.Schema = new SimpleSchema({
	userId: {
		type: String
	},
	userMail: {
		type: String
	},
	timestamp: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	},
	status: {
		type: String,
		allowedValues: ['online', 'offline']
	}
});

Data.Feedback.Schema = new SimpleSchema({
	userId: {
		type: String,
		autoValue: function() {
			return this.userId;
		}
	},
	userMail: {
		type: String,
		autoValue: function() {
			return Meteor.user().emails[0].address;
		}
	},
	message: {
	    type: String,
			label: 'Deine Nachricht',
			max: 1000,
	    autoform: {
	      afFieldInput: {
	        type: "textarea"
	      }
	    }
	  },
	createdAt: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	}
});

Data.Detail.Schema = new SimpleSchema({
	userId: {
		type: String,
		autoValue: function() {
			return this.userId;
		}
	},
	userMail: {
		type: String,
		autoValue: function() {
			return Meteor.user().emails[0].address;
		}
	},
	timestamp: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	},
	deviceType: {
		type: String
	},
	devicePlatform: {
		type: String
	},
	route: {
		type: String
	},
	mode: {
		type: String,
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']
	},
	settingsTrainer: {
		type: Boolean
	},
	heartClicked: {
		type: Boolean
	}
});

Data.Words.Schema = new SimpleSchema({
	userId: {
		type: String,
		autoValue: function() {
			return this.userId;
		}
	},
	vocabularyId: {
		type: String
	},
	vocabularyName: {
		type: String
	},
	viewed: {
		type: Number
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	}
});

Data.Survey.Schema = new SimpleSchema({
	// GENERAL
	userId: {
		type: String,
		autoValue: function() {
			return this.userId;
		},
		autoform: {
      type: "hidden",
      label: false
    }
	},
	userMail: {
		type: String,
		autoValue: function() {
			return Meteor.user().emails[0].address;
		}
	},
	age: {
		type: Number,
		label: 'Dein Alter',
		min: 18,
		max: 99
	 },
	 gender: {
    type: String,
		label: 'Dein Geschlecht',
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "weiblich", value: "female"},
          {label: "männlich", value: "male"}
        ];
      }
    }
  },
	previousExperience: {
		type: String,
		label: 'Ich verfüge über Vorerfahrung mit digitalen Vokabeltrainern.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	learningCurve: {
		type: String,
		label: 'Die Einarbeitung in die App war für mich mühelos.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	everydayUse: {
		type: String,
		label: 'Den Gebrauch der App kann ich mühelos in meinen Alltag integrieren.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	everydayUseText: {
		type: String,
		max: 1000,
		optional: true,
		label: 'Aus folgendem Grund (optional):',
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	usability: {
		type: String,
		label: 'Mit der Bedienung der App komme ich mühelos zurecht.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	usabilityText: {
		type: String,
		max: 1000,
		optional: true,
		label: 'Aus folgendem Grund (optional):',
		optional: true,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	// NUTZUNGSVERHALTEN
	deviceMobile: {
		type: String,
		label: '... mobiles Endgerät (z.B. Smartphone, kein Laptop) aufgerufen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	deviceTablet: {
		type: String,
		label: '... Tablet Endgerät aufgerufen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	deviceDesktop: {
		type: String,
		label: '... Desktop Endgerät (z.B. Laptop, Desktop PC) aufgerufen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	deviceBehavior: {
		type: String,
		max: 1000,
		optional: true,
		label: 'Aus folgendem Grund (optional):',
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	favouriteMode: {
		type: String,
		label: 'Folgende Trainingsmethode habe ich am liebsten genutzt:',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Lesen",
					value: "lesen"
				}, {
					label: "Rate Wort",
					value: "wort"
				}, {
					label: "Rate Definition",
					value: "definition"
				}, {
					label: "Eingabetest",
					value: "eingabe"
				}, {
					label: "Keine Methode sondern das Register",
					value: "register"
				}, {
					label: "Weiss ich nicht",
					value: "ka"
				}];
			}
		}
	},
	favouriteModeText: {
		type: String,
		max: 1000,
		optional: true,
		label: 'Aus folgendem Grund (optional):',
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	modeEnter: {
		type: String,
		label: "Die Methode 'Eingabetest' habe ich im Kompaktmodus vermisst.",
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	attentionBenefit: {
		type: String,
		label: 'Mir hat das Konzept des Kompaktmodus gefallen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	attentionEasy: {
		type: String,
		label: 'Ich kann mühelos in den Kompaktmodus wechseln.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	attentionFast: {
		type: String,
		label: 'Ich kann schnell in den Kompaktmodus wechseln.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	attentionOften: {
		type: String,
		label: 'Ich verwende den Kompaktmodus häufig.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	attentionSituation: {
		type: String,
		max: 1000,
		label: 'Beschreibe eine Beispielsituation, in der du beschlossen hast, in den Kompaktmodus zu wechseln.',
		optional: true,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	attentionUse: {
		type: String,
		label: 'Unabhängig von dieser App finde ich das Konzept, die Benutzeroberfläche kontextorientiert anzupassen, sinnvoll.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	attentionUseText: {
		type: String,
		max: 1000,
		label: 'Aus folgendem Grund (optional):',
		optional: true,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	attentionOthers: {
		type: String,
		label: 'Ich würde mir das Konzept, die Benutzeroberfläche kontextorientiert anzupassen, auch fuer andere Apps wünschen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: 5
				}, {
					label: "trifft eher zu",
					value: 4
				}, {
					label: "teils-teils",
					value: 3
				}, {
					label: "trifft eher nicht zu",
					value: 2
				}, {
					label: "trifft nicht zu",
					value: 1
				}];
			}
		}
	},
	attentionOthersText: {
		type: String,
		max: 1000,
		label: 'Aus folgendem Grund (optional):',
		optional: true,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	prospects: {
			type: String,
			max: 1000,
			optional: true,
			label: 'Sonstige Anmerkungen',
			autoform: {
				afFieldInput: {
					type: "textarea"
				}
			}
		},
		surveyAcknowledged: {
    type: Boolean,
		label: "Mir ist bewusst, dass ich den Fragenbogen nur einmal abschicken kann.",
    optional: false,
		allowedValues: [true],
    autoform: {
      afFieldInput: {
        type: "boolean-checkbox"
      }
    }
  }

});


Data.Detail.attachSchema(Data.Detail.Schema);
Data.Words.attachSchema(Data.Words.Schema);
Data.Survey.attachSchema(Data.Survey.Schema);
Data.Feedback.attachSchema(Data.Feedback.Schema);
Data.Status.attachSchema(Data.Status.Schema);
