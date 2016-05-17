// *** ROUTE FUNCTIONS

checkAttentionModeOff = () => {
	if (Session.get(ATTENTION_MODE)) {
		Session.set(ATTENTION_MODE, false)
	}
};

checkAttentionModeOn = () => {
	if (!Session.get(ATTENTION_MODE)) {
		Session.set(ATTENTION_MODE, true)
	}
};

resetSession = () => {
	Session.set(REVEALED, false);
	Session.set(TERM_WRONG, false);
};

// checkAdmin = () => {
// 	console.log(Meteor.userId());
// 	console.log(Roles.userIsInRole(Meteor.userId(), 'admin'));
// 	console.log(Roles.subscription.ready());
// 	if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
// 		console.log(Roles.userIsInRole(Meteor.userId(), 'admin'));
// 		FlowRouter.redirect('/notFound');
// 	}
// };

checkSurveySubmitted = () => {
	let query = UserExt.findOne({
		userId: Meteor.userId(),
		surveySubmitted: true
	});
	if (query) {
		FlowRouter.redirect('/');
	}
};

d3Reset = () => {
	window.onresize = null;
}

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn, d3Reset]);

// *** ROUTE GROUPS

let lowRoutes = FlowRouter.group({
	name: "low",
	triggersEnter: [checkAttentionModeOn],
	triggersExit: []
});
let highRoutes = FlowRouter.group({
	name: "high",
	triggersEnter: [checkAttentionModeOff],
	triggersExit: []
});

// *** ROUTES



highRoutes.route('/', {
	name: "index",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "index",
			footer: "footer"
		});
	}
});
highRoutes.route('/doc', {
	name: "doc",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "doc",
			footer: "footer"
		});
	}
});
highRoutes.route('/law', {
	name: "law",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "law",
			footer: "footer"
		});
	}
});
highRoutes.route('/impressum', {
	name: "impressum",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "impressum",
			footer: "footer"
		});
	}
});

highRoutes.route('/trainer', {
	name: "trainer",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "trainer",
			footer: "footer"
		});
	}
});

highRoutes.route('/register', {
	name: "register",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "register",
			footer: "footer"
		});
	}
});
highRoutes.route('/verwaltung', {
	name: "verwaltung",
	action: function(params, queryParams) {
		FlowRouter.redirect('/verwaltung/feedback');
	},
	triggersEnter: []
});
highRoutes.route('/verwaltung/statistik', {
	name: "statistik",
	action: function(params, queryParams) {
		FlowRouter.redirect('/verwaltung/statistik/statTotal');
	},
	triggersEnter: []
});


// VERWALTUNG

highRoutes.route('/verwaltung/statistik/statTotal', {
	name: "statTotal",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "statTotal",
			footer: "footer"
		});
	},
	triggersEnter: []
});
highRoutes.route('/verwaltung/statistik/statDevice', {
	name: "statDevice",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "statDevice",
			footer: "footer"
		});
	},
	triggersEnter: []
});
highRoutes.route('/verwaltung/statistik/statMethod', {
	name: "statMethod",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "statMethod",
			footer: "footer"
		});
	},
	triggersEnter: []
});
highRoutes.route('/verwaltung/statistik/statUsers', {
	name: "statUsers",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "statUsers",
			footer: "footer"
		});
	},
	triggersEnter: []
});
highRoutes.route('/verwaltung/statistik/statAttention', {
	name: "statAttention",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "statAttention",
			footer: "footer"
		});
	},
	triggersEnter: []
});
highRoutes.route('/verwaltung/statistik/statBrowse', {
	name: "statBrowse",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "statBrowse",
			footer: "footer"
		});
	},
	triggersEnter: []
});
highRoutes.route('/verwaltung/statistik/statFav', {
	name: "statFav",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "statFav",
			footer: "footer"
		});
	},
	triggersEnter: []
});
highRoutes.route('/verwaltung/statistik/statLOD', {
	name: "statLOD",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "statLOD",
			footer: "footer"
		});
	},
	triggersEnter: []
});



highRoutes.route('/verwaltung/feedback', {
	name: "feedback",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutAdmin', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			main: "feedback",
			footer: "footer"
		});
	},
	triggersEnter: []
});
highRoutes.route('/fragebogen', {
	name: "fragebogen",
	triggersEnter: [checkSurveySubmitted],
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "fragebogen",
			footer: "footer"
		});
	},
	triggersEnter: []
});

lowRoutes.route('/low', {
	name: "low",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			main: "low"
		});
	},
	triggersEnter: []
});

FlowRouter.notFound = {
	name: "notFound",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			main: "pageNotFound"
		});
	}
};


//Routes
AccountsTemplates.configureRoute('changePwd');
// AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
// AccountsTemplates.configureRoute('verifyEmail');
