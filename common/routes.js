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
		FlowRouter.redirect('/notFound');
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
			main: "index"
		});
	}
});
highRoutes.route('/eingabe', {
	name: "eingabe",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "eingabe",
			navSource: "navSource"
		});
	}
});

highRoutes.route('/register/:id', {
	name: "vokabelDetail",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "vokabelDetail"
		});
	}
});
highRoutes.route('/register', {
	name: "register",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			main: "register"
		});
	}
});
highRoutes.route('/uebersicht', {
	name: "uebersicht",
	action: function(params, queryParams) {
		FlowRouter.redirect('/uebersicht/feedback');
	},
	triggersEnter: [checkAdmin]
});
highRoutes.route('/uebersicht/statistik', {
	name: "statistik",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			main: "statistik"
		});
	},
	triggersEnter: [checkAdmin]
});
highRoutes.route('/uebersicht/feedback', {
	name: "feedback",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "nav",
			navOverview: "navOverview",
			main: "feedback"
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
			main: "fragebogen"
		});
	},
	triggersEnter: []
});

lowRoutes.route('/low', {
	name: "low",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			bar: "bar",
			nav: "navMode",
			main: "low",
			navSource: "navSource"
		});
	},
	triggersEnter: []
});

FlowRouter.notFound = {
	name: "notFound",
	action: function(params, queryParams) {
		BlazeLayout.render('layout', {
			footer: "footer",
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
