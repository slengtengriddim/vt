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
			label: 'Feedback-Nachricht',
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
	clickArea: {
		type: String,
		allowedValues: ['bar', 'mode', 'source', 'favDel', 'browse', 'reveal']
	},
	mode: {
		type: String,
		allowedValues: ['lesen', 'wort', 'definition', 'eingabe', 'null']
	},
	attention: {
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
	age: {
		type: Number,
		label: 'Dein Alter',
		min: 18,
		max: 99
	 }
	,
	previousExperience: {
		type: String,
		label: 'Ich verfuege ueber Vorerfahrung mit digitalen Vokabeltrainern.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
				}];
			}
		}
	},
	learningCurve: {
		type: String,
		label: 'Die Einarbeitung in den Fremdworttrainer ist mir leicht gefallen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
				}];
			}
		}
	},
	everydayUse: {
		type: String,
		label: 'Den Gebrauch der App konnte ich muehelos in meinen Alltag integrieren.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
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
		label: 'Mit der Bedienung der App zurecht komme ich prima zurecht.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
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
		label: '... Mobile Endgeraet (z.B. Smartphone, kein Laptop) aufgerufen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
				}];
			}
		}
	},
	deviceTablet: {
		type: String,
		label: '... Tablet Endgeraet aufgerufen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
				}];
			}
		}
	},
	deviceDesktop: {
		type: String,
		label: '... Desktop Endgeraet (z.B. Laptop, Desktop PC) aufgerufen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
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
		label: 'Folgenden Trainingsmodus habe ich am liebsten genutzt:',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Lesen",
					value: "lesen"
				}, {
					label: "Wort",
					value: "wort"
				}, {
					label: "Definition",
					value: "definition"
				}, {
					label: "Texteingabe",
					value: "eingabe"
				}, {
					label: "Lesen im Register",
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
		label: 'Die Texteingabe-Option habe ich im Kompaktmodus vermisst.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
				}];
			}
		}
	},
	attentionBenefit: {
		type: String,
		label: 'Mir hat die Moeglichkeit, in den Kompaktmodus zu wechseln, gefallen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
				}];
			}
		}
	},
	attentionBehavior: {
		type: String,
		label: 'Die Moeglichkeit, den Kompaktmodus zu nutzen, hat mein Nutzungsverhalten der App beeinflusst.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
				}];
			}
		}
	},
	attentionBehaviorText: {
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
	attentionSituation: {
		type: String,
		max: 1000,
		label: 'In welcher Situation hast du beschlossen, das UI zu wechseln und warum? (Beispiel)',
		optional: true,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	attentionUse: {
		type: String,
		label: 'Ich sehe generell einen klaren Vorteil in der Moeglichkeit die Benutzeroberflaeche kontextorientiert anzupassen und wuerde mir die Moeglichkeit auch fuer andere Apps wuenschen.',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "trifft zu",
					value: "trifftZu"
				}, {
					label: "trifft eher zu",
					value: "trifftEherZu"
				}, {
					label: "teils-teils",
					value: "teilsTeils"
				}, {
					label: "trifft eher nicht zu",
					value: "trifftEherNichtZu"
				}, {
					label: "trifft nicht zu",
					value: "trifftNichtZu"
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
		}

});


Data.Detail.attachSchema(Data.Detail.Schema);
Data.Words.attachSchema(Data.Words.Schema);
Data.Survey.attachSchema(Data.Survey.Schema);
Data.Feedback.attachSchema(Data.Feedback.Schema);
Data.Status.attachSchema(Data.Status.Schema);
