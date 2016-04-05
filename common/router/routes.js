// *** ROUTE FUNCTIONS

checkAttentionModeOff = () => {
	if (Session.get(ATTENTION_MODE)) {
		Session.set(ATTENTION_MODE, false)
	}
}

checkAttentionModeOn = () => {
	if (!Session.get(ATTENTION_MODE)) {
		Session.set(ATTENTION_MODE, true)
	}
}

setTrainerPath = () => {
	Session.set('lastPathTrainer', FlowRouter.current().route.path)
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

basicRoutes.trainerRoutes = FlowRouter.group({
	name: "trainer",
	triggersEnter: [setTrainerPath],
	triggersExit: []
});

// *** ROUTES

basicRoutes.route('/', {
	name: "index",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutBasic', {
			bar: "bar",
			nav: "nav",
			main: "index"
		});
	}
});
basicRoutes.route('/favouriten', {
	name: "favouriten",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutBasic', {
			bar: "bar",
			nav: "nav",
			main: "favouriten"
		});
	}
});
basicRoutes.route('/trainer', {
	name: "trainer",
	action: function(params, queryParams) {
		FlowRouter.go(Session.get('lastPathTrainer'));
	}
});
basicRoutes.trainerRoutes.route('/trainer/lesen', {
	name: "trainerLesen",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutTrainer', {
			bar: "bar",
			nav: "nav",
			navTrainer: "navTrainer",
			main: "trainerLesen",
			navRandom: "navRandom"
		});
	}
});
basicRoutes.trainerRoutes.route('/trainer/eingabe', {
	name: "trainerEingabe",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutTrainer', {
			bar: "bar",
			nav: "nav",
			navTrainer: "navTrainer",
			main: "trainerEingabe",
			navRandom: "navRandom"
		});
	}
});
basicRoutes.trainerRoutes.route('/trainer/wort', {
	name: "trainerWort",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutTrainer', {
			bar: "bar",
			nav: "nav",
			navTrainer: "navTrainer",
			main: "trainerWort",
			navRandom: "navRandom"
		});
	}
});
basicRoutes.trainerRoutes.route('/trainer/bedeutung', {
	name: "trainerBedeutung",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutTrainer', {
			bar: "bar",
			nav: "nav",
			navTrainer: "navTrainer",
			main: "trainerBedeutung",
			navRandom: "navRandom"
		});
	}
});

basicRoutes.route('/vokabelregister', {
	name: "vokabelregister",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutBasic', {
			bar: "bar",
			nav: "nav",
			main: "vokabelregister"
		});
	}
});
basicRoutes.route('/vokabelregister/:id', {
	name: "vokabelDetail",
	action: function(params, queryParams) {
		console.log(params);
		BlazeLayout.render('layoutBasic', {
			bar: "bar",
			nav: "nav",
			main: "vokabelDetail"
		});
	}
});


lowRoutes.route('/low', {
	name: "indexLow",
	action: function(params, queryParams) {
		BlazeLayout.render('layoutBasic', {
			bar: "bar",
			main: "indexLow"
		});
	},
	triggersEnter: [function(context, redirect) {}]
});

FlowRouter.notFound = {
	action: function() {
		BlazeLayout.render('layoutSlim', {
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
