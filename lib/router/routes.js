FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

let lowRoutes = FlowRouter.group({
	name: "low"
});
let basicRoutes = FlowRouter.group({
	name: "basic"
});

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
	triggersEnter: [function(context, redirect) {
    console.log(context);
	}]
});

// privateRoutes.route('/lists', {
//   name: "lists",
//   action: function(params, queryParams) {
//     BlazeLayout.render('basicLayout', {
//       footer: "footer",
//       main: "lists"
//     });
//   }
// });

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
