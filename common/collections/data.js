Data = {};
Data.Detail = new Mongo.Collection('dataDetail', {});
Data.Words = new Mongo.Collection('dataWords', {});
Data.Survey = new Mongo.Collection('dataSurvey', {});
Data.Feedback = new Mongo.Collection('dataFeedback', {});

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
		label: 'Wie steht es um deine Vorerfahrung mit digitalen Vokabeltrainern?',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "gar keine",
					value: "keine"
				}, {
					label: "mal probiert",
					value: "probiert"
				}, {
					label: "nutze ich regelmaessig",
					value: "regelmaessig"
				}];
			}
		}
	},
	learningCurve: {
		type: String,
		label: 'Wie ist dir die Einarbeitung in die App gefallen?',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Leicht",
					value: "leicht"
				}, {
					label: "Mittel",
					value: "mittel"
				}, {
					label: "Schwer",
					value: "schwer"
				}];
			}
		}
	},
	everydayUse: {
		type: String,
		label: 'Konntest du den Gebrauch der App muehelos in deinen Alltag integrieren?',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Ja",
					value: "ja"
				}, {
					label: "Nein",
					value: "nein"
				}];
			}
		}
	},
	everydayUseText: {
		type: String,
		max: 1000,
		label: 'Weshalb?',
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	usability: {
		type: String,
		label: 'Wie kommst du mit der Bedienung der App zurecht?',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "gar nicht",
					value: "nicht"
				}, {
					label: "ok",
					value: "ok"
				}, {
					label: "super",
					value: "super"
				}];
			}
		}
	},
	usabilityText: {
		type: String,
		max: 1000,
		label: 'Teile deine Ideen zur Bedienung (optional)',
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
		label: 'Mobile:',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Ja",
					value: "ja"
				}, {
					label: "Nein",
					value: "nein"
				}];
			}
		}
	},
	deviceTablet: {
		type: String,
		label: 'Tablet:',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Ja",
					value: "ja"
				}, {
					label: "Nein",
					value: "nein"
				}];
			}
		}
	},
	deviceDesktop: {
		type: String,
		label: 'Desktop:',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Ja",
					value: "ja"
				}, {
					label: "Nein",
					value: "nein"
				}];
			}
		}
	},
	deviceBehavior: {
		type: String,
		max: 1000,
		label: 'Falls du mehrere Endgeraete benutzt hast um die App aufzurufen: Inwiefern hat sich dein Nutzungsverhalten unterschieden?',
		optional: false,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	favouriteMode: {
		type: String,
		label: 'Welchen Trainermodus hast du am liebsten genutzt?',
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
					label: "Register",
					value: "register"
				}];
			}
		}
	},
	favouriteModeText: {
		type: String,
		max: 1000,
		label: 'Weshalb?',
		optional: false,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	attentionBenefit: {
		type: String,
		label: 'Hat dir die Moeglichkeit, das UI kontextorientiert zu veraendern, gefallen?',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Ja",
					value: "ja"
				}, {
					label: "Nein",
					value: "nein"
				}];
			}
		}
	},
	attentionBehavior: {
		type: String,
		label: 'Hat die Moeglichkeit, das UI kontextorientiert zu veraendern, dein Nutzungsverhalten beeinflusst?',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Ja",
					value: "ja"
				}, {
					label: "Nein",
					value: "nein"
				}];
			}
		}
	},
	attentionBehaviorText: {
		type: String,
		max: 1000,
		label: 'Weshalb?',
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	attentionSituation: {
		type: String,
		label: 'Wann, wo und in welcher Situation hast du beschlossen, das UI zu wechseln? (Beispiel)',
		optional: false,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	attentionUse: {
		type: String,
		label: 'Siehst du generell einen Vorteil in der Moeglichkeit das UI kontextorientiert anzupassen?',
		autoform: {
			type: "select-radio-inline",
			options: function() {
				return [{
					label: "Ja",
					value: "ja"
				}, {
					label: "Nein",
					value: "nein"
				}];
			}
		}
	},
	attentionUseText: {
		type: String,
		max: 1000,
		label: 'Weshalb?',
		optional: false,
		autoform: {
			afFieldInput: {
				type: "textarea"
			}
		}
	},
	prospects: {
			type: String,
			max: 1000,
			label: 'Welche alternativen Anwendungsgebiete fuer ein kontextsensitives UI kannst du dir vorstellen?',
			optional: false,
			autoform: {
				afFieldInput: {
					type: "textarea"
				}
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
	clickArea: {
		type: String,
		allowedValues: ['favDel', 'browse', 'source', 'reveal', 'bar', 'mode']
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

Data.Detail.attachSchema(Data.Detail.Schema);
Data.Words.attachSchema(Data.Words.Schema);
Data.Survey.attachSchema(Data.Survey.Schema);
Data.Feedback.attachSchema(Data.Feedback.Schema);
