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

checkAdmin	= () => {
	if (! Roles.userIsInRole(Meteor.userId(), 'admin')) {
		// FlowRouter.redirect('/notFound');
	}
};

checkSurveySubmitted = () => {
	let query = UserExt.findOne({userId: Meteor.userId(), surveySubmitted: true});
	if (query) {
		FlowRouter.redirect('/');
	}
};

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

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
			footer:"footer"
		});
	}
});
highRoutes.route('/faq', {
	name: "faq",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "faq",
			footer:"footer"
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
			footer:"footer"
		});
	}
});

highRoutes.route('/register/:id', {
	name: "vokabelDetail",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "vokabelDetail",
			footer:"footer"
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
			footer:"footer"
		});
	}
});
highRoutes.route('/verwaltung', {
	name: "verwaltung",
	action: function(params, queryParams) {
		FlowRouter.redirect('/verwaltung/feedback');
	},
	triggersEnter: [checkAdmin]
});
highRoutes.route('/verwaltung/statistik', {
	name: "statistik",
	action: function(params, queryParams) {
		FlowRouter.redirect('/verwaltung/statistik/total');
	},
	triggersEnter: [checkAdmin]
});
highRoutes.route('/verwaltung/statistik/device', {
	name: "device",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "device",
			footer:"footer"
		});
	},
	triggersEnter: [checkAdmin]
});
highRoutes.route('/verwaltung/statistik/mode', {
	name: "mode",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "mode",
			footer:"footer"
		});
	},
	triggersEnter: [checkAdmin]
});
highRoutes.route('/verwaltung/statistik/status', {
	name: "status",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "status",
			footer:"footer"
		});
	},
	triggersEnter: [checkAdmin]
});
highRoutes.route('/verwaltung/statistik/total', {
	name: "total",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			navStatistics: "navStatistics",
			main: "total",
			footer:"footer"
		});
	},
	triggersEnter: [checkAdmin]
});

highRoutes.route('/verwaltung/feedback', {
	name: "feedback",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			main: "feedback",
			footer:"footer"
		});
	},
	triggersEnter: [checkAdmin]
});
highRoutes.route('/fragebogen', {
	name: "fragebogen",
	triggersEnter:[checkSurveySubmitted],
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "fragebogen",
			footer:"footer"
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
			// ,
			// navSource: "navLow"
		});
	},
	triggersEnter: []
});

FlowRouter.notFound = {
	name: "notFound",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			footer: "footer",
			main: "pageNotFound",
			footer:"footer"
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
