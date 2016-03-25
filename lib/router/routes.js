// *** ROUTE FUNCTIONS

checkAttentionModeOff = () => {
 if (Session.get(ATTENTION_MODE)) {
	 Session.set(ATTENTION_MODE, false)
 }
}

checkAttentionModeOn = () => {
 if (! Session.get(ATTENTION_MODE)) {
	 Session.set(ATTENTION_MODE, true)
 }
}

FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

// *** ROUTE GROUPS

let lowRoutes = FlowRouter.group({
	name: "low",
	triggersEnter: [checkAttentionModeOn],
	triggersExit: []
});
let basicRoutes = FlowRouter.group({
	name: "basic",
		triggersEnter: [checkAttentionModeOff],
		triggersExit: []
});

// *** ROUTES

basicRoutes.route('/', {
	name: "index",
	action: function(params, queryParams) {
		BlazeLayout.render('basicLayout', {
			bar: "bar",
			nav: "nav",
			main: "index"
		});
	}
});
basicRoutes.route('/listen', {
	name: "listen",
	action: function(params, queryParams) {
		BlazeLayout.render('basicLayout', {
			bar: "bar",
			nav: "nav",
			main: "listen"
		});
	}
});
basicRoutes.route('/favouriten', {
	name: "favouriten",
	action: function(params, queryParams) {
		BlazeLayout.render('basicLayout', {
			bar: "bar",
			nav: "nav",
			main: "favouriten"
		});
	}
});
basicRoutes.route('/vokabelregister', {
	name: "vokabelregister",
	action: function(params, queryParams) {
		BlazeLayout.render('basicLayout', {
			bar: "bar",
			nav: "nav",
			main: "vokabelregister"
		});
	}
});

lowRoutes.route('/low', {
	name: "indexLow",
	action: function(params, queryParams) {
		BlazeLayout.render('basicLayout', {
			bar: "bar",
			main: "indexLow"
		});
	},
	triggersEnter: [function(context, redirect) {}]
});

FlowRouter.notFound = {
	action: function() {
		BlazeLayout.render('slimLayout', {
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
