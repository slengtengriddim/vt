//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var FlowRouter = Package['kadira:flow-router'].FlowRouter;
var BlazeLayout = Package['kadira:blaze-layout'].BlazeLayout;
var ActiveRoute = Package['zimme:active-route'].ActiveRoute;
var AutoForm = Package['aldeed:autoform'].AutoForm;
var Roles = Package['alanning:roles'].Roles;
var Helpers = Package['raix:handlebar-helpers'].Helpers;
var moment = Package['momentjs:moment'].moment;
var Tabular = Package['aldeed:tabular'].Tabular;
var check = Package.check.check;
var Match = Package.check.Match;
var Session = Package.session.Session;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Template = Package.templating.Template;
var Collection2 = Package['aldeed:collection2-core'].Collection2;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Mongo = Package.mongo.Mongo;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var __coffeescriptShare, AdminDashboard, dataTableOptions, t, pageY, currTop;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/both/AdminDashboard.coffee.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                                                                                                                       // 1
                                                                                                                       //
AdminDashboard = {                                                                                                     // 1
  schemas: {},                                                                                                         // 2
  sidebarItems: [],                                                                                                    // 2
  collectionItems: [],                                                                                                 // 2
  alertSuccess: function(message) {                                                                                    // 2
    Session.set('adminError', null);                                                                                   // 6
    return Session.set('adminSuccess', message);                                                                       //
  },                                                                                                                   //
  alertFailure: function(message) {                                                                                    // 2
    Session.set('adminSuccess', null);                                                                                 // 9
    return Session.set('adminError', message);                                                                         //
  },                                                                                                                   //
  checkAdmin: function() {                                                                                             // 2
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {                                                             // 13
      Meteor.call('adminCheckAdmin');                                                                                  // 14
      if (typeof (typeof AdminConfig !== "undefined" && AdminConfig !== null ? AdminConfig.nonAdminRedirectRoute : void 0) === "string") {
        Router.go(AdminConfig.nonAdminRedirectRoute);                                                                  // 16
      }                                                                                                                //
    }                                                                                                                  //
    if (typeof this.next === 'function') {                                                                             // 17
      return this.next();                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  adminRoutes: ['adminDashboard', 'adminDashboardUsersNew', 'adminDashboardUsersEdit', 'adminDashboardView', 'adminDashboardNew', 'adminDashboardEdit'],
  collectionLabel: function(collection) {                                                                              // 2
    if (collection === 'Users') {                                                                                      // 21
      return 'Users';                                                                                                  //
    } else if ((collection != null) && typeof AdminConfig.collections[collection].label === 'string') {                //
      return AdminConfig.collections[collection].label;                                                                //
    } else {                                                                                                           //
      return Session.get('admin_collection_name');                                                                     //
    }                                                                                                                  //
  },                                                                                                                   //
  addSidebarItem: function(title, url, options) {                                                                      // 2
    var item;                                                                                                          // 28
    item = {                                                                                                           // 28
      title: title                                                                                                     // 28
    };                                                                                                                 //
    if (_.isObject(url) && typeof options === 'undefined') {                                                           // 29
      item.options = url;                                                                                              // 30
    } else {                                                                                                           //
      item.url = url;                                                                                                  // 32
      item.options = options;                                                                                          // 32
    }                                                                                                                  //
    return this.sidebarItems.push(item);                                                                               //
  },                                                                                                                   //
  extendSidebarItem: function(title, urls) {                                                                           // 2
    var existing;                                                                                                      // 38
    if (_.isObject(urls)) {                                                                                            // 38
      urls = [urls];                                                                                                   // 38
    }                                                                                                                  //
    existing = _.find(this.sidebarItems, function(item) {                                                              // 38
      return item.title === title;                                                                                     //
    });                                                                                                                //
    if (existing) {                                                                                                    // 41
      return existing.options.urls = _.union(existing.options.urls, urls);                                             //
    }                                                                                                                  //
  },                                                                                                                   //
  addCollectionItem: function(fn) {                                                                                    // 2
    return this.collectionItems.push(fn);                                                                              //
  },                                                                                                                   //
  path: function(s) {                                                                                                  // 2
    var path;                                                                                                          // 48
    path = '/admin';                                                                                                   // 48
    if (typeof s === 'string' && s.length > 0) {                                                                       // 49
      path += (s[0] === '/' ? '' : '/') + s;                                                                           // 50
    }                                                                                                                  //
    return path;                                                                                                       //
  }                                                                                                                    //
};                                                                                                                     //
                                                                                                                       //
AdminDashboard.schemas.newUser = new SimpleSchema({                                                                    // 1
  email: {                                                                                                             // 55
    type: String,                                                                                                      // 56
    label: "Email address"                                                                                             // 56
  },                                                                                                                   //
  chooseOwnPassword: {                                                                                                 // 55
    type: Boolean,                                                                                                     // 59
    label: 'Let this user choose their own password with an email',                                                    // 59
    defaultValue: true                                                                                                 // 59
  },                                                                                                                   //
  password: {                                                                                                          // 55
    type: String,                                                                                                      // 63
    label: 'Password',                                                                                                 // 63
    optional: true                                                                                                     // 63
  },                                                                                                                   //
  sendPassword: {                                                                                                      // 55
    type: Boolean,                                                                                                     // 67
    label: 'Send this user their password by email',                                                                   // 67
    optional: true                                                                                                     // 67
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
AdminDashboard.schemas.sendResetPasswordEmail = new SimpleSchema({                                                     // 1
  _id: {                                                                                                               // 72
    type: String                                                                                                       // 73
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
AdminDashboard.schemas.changePassword = new SimpleSchema({                                                             // 1
  _id: {                                                                                                               // 76
    type: String                                                                                                       // 77
  },                                                                                                                   //
  password: {                                                                                                          // 76
    type: String                                                                                                       // 79
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/both/routes.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
var fadminRoutes = FlowRouter.group({                                                                                  // 2
  name: "AdminController",                                                                                             // 3
  prefix: '/admin',                                                                                                    // 4
  subscriptions: function() {                                                                                          // 5
    this.register('fadminUsers', Meteor.subscribe('adminUsers'));                                                      // 6
    this.register('fadminUser', Meteor.subscribe('adminUser'));                                                        // 7
    this.register('fadminCollectionsCount', Meteor.subscribe('adminCollectionsCount'));                                // 8
  },                                                                                                                   // 9
 triggersEnter: [                                                                                                      // 10
  	function(context) {                                                                                                 // 11
  		if(!Roles.userIsInRole (Meteor.userId(),['admin']))                                                                // 12
  		{                                                                                                                  // 13
  			Meteor.call('adminCheckAdmin');                                                                                   // 14
  			//if (typeof AdminConfig.nonAdminRedirectRoute == 'string')                                                       // 15
  			//	FlowRouter.go(AdminController.nonAdminRedirectRoute);                                                          // 16
  		}                                                                                                                  // 17
  	},                                                                                                                  // 18
    function(context) {                                                                                                // 19
      Session.set('adminSuccess', null);                                                                               // 20
      Session.set('adminError', null);                                                                                 // 21
      Session.set('admin_title', null);                                                                                // 22
      Session.set('admin_subtitle', null);                                                                             // 23
      Session.set('admin_collection_name', null);                                                                      // 24
      Session.set('admin_collection_page', null);                                                                      // 25
      Session.set('admin_id',null);                                                                                    // 26
      Session.set('admin_doc', null);                                                                                  // 27
    }                                                                                                                  // 28
  ]                                                                                                                    // 29
});                                                                                                                    // 30
                                                                                                                       // 31
fadminRoutes.route('/',{                                                                                               // 32
	name: 'adminDashboard',                                                                                               // 33
	triggersEnter: [                                                                                                      // 34
	 function(context){                                                                                                   // 35
	 	Session.set('admin_title',"Dashboard");                                                                             // 36
	 	Session.set('admin_collection_name',"");                                                                            // 37
	 	Session.set('admin_collection_page',"");                                                                            // 38
	 }                                                                                                                    // 39
	],                                                                                                                    // 40
	action: function ()                                                                                                   // 41
	{                                                                                                                     // 42
		BlazeLayout.render('fAdminLayout', {main: 'AdminDashboard'});                                                        // 43
	}                                                                                                                     // 44
});                                                                                                                    // 45
                                                                                                                       // 46
                                                                                                                       // 47
fadminRoutes.route('/view/:collectionName',{                                                                           // 48
	triggersEnter: [                                                                                                      // 49
		function(context){                                                                                                   // 50
		Session.set('admin_title', context.params.collectionName);                                                           // 51
		Session.set('admin_subtitle', 'View');                                                                               // 52
		Session.set('admin_collection_page', 'view');                                                                        // 53
		Session.set('admin_collection_name', context.params.collectionName);                                                 // 54
	}],                                                                                                                   // 55
	triggersExit: [                                                                                                       // 56
		function(context){                                                                                                   // 57
			BlazeLayout.render('fAdminLayout',{main: 'AdminLoading'});                                                          // 58
		}                                                                                                                    // 59
	],                                                                                                                    // 60
	action: function(params)                                                                                              // 61
	{                                                                                                                     // 62
		BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardView'});                                                     // 63
	}                                                                                                                     // 64
});                                                                                                                    // 65
                                                                                                                       // 66
fadminRoutes.route('/new/:collectionName',{                                                                            // 67
	triggersEnter: [function(context){                                                                                    // 68
		Session.set('admin_title', context.params.collectionName);                                                           // 69
		Session.set('admin_subtitle', 'Create New');                                                                         // 70
		Session.set('admin_collection_page', 'new');                                                                         // 71
		Session.set('admin_collection_name', context.params.collectionName);                                                 // 72
	}],                                                                                                                   // 73
	triggersExit: [                                                                                                       // 74
		function(context){                                                                                                   // 75
			BlazeLayout.render('fAdminLayout',{main: 'AdminLoading'});                                                          // 76
		}                                                                                                                    // 77
	],                                                                                                                    // 78
	action: function(params)                                                                                              // 79
	{	if(params.collectionName == 'Users')                                                                                // 80
			BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardUsersNew'});                                                // 81
		else                                                                                                                 // 82
			BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardNew'});                                                     // 83
	}                                                                                                                     // 84
});                                                                                                                    // 85
                                                                                                                       // 86
fadminRoutes.route('/edit/:collectionName/:_id',{                                                                      // 87
	triggersEnter: [function(context){                                                                                    // 88
		Session.set('admin_title', context.params.collectionName);                                                           // 89
		Session.set('admin_subtitle', 'Edit');                                                                               // 90
		Session.set('admin_collection_page', 'edit');                                                                        // 91
		Session.set('admin_collection_name', context.params.collectionName);                                                 // 92
		if (context.params.collectionName == 'Users')                                                                        // 93
			Session.set('admin_id', context.params._id);                                                                        // 94
		else                                                                                                                 // 95
			Session.set('admin_id', null);                                                                                      // 96
                                                                                                                       // 97
	}],                                                                                                                   // 98
	triggersExit: [                                                                                                       // 99
		function(context){                                                                                                   // 100
			BlazeLayout.render('fAdminLayout',{main: 'AdminLoading'});                                                          // 101
			Session.set('admin_id',null);                                                                                       // 102
		}                                                                                                                    // 103
	],                                                                                                                    // 104
	subscriptions : function(params){                                                                                     // 105
		if (params.collectionName !== 'Users')                                                                               // 106
		this.register('admindoc2edit', Meteor.subscribe('adminCollectionDoc', params.collectionName, parseID(params._id)));  // 107
	},                                                                                                                    // 108
	action: function(params)                                                                                              // 109
	{                                                                                                                     // 110
		if(params.collectionName == 'Users')                                                                                 // 111
			BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardUsersEdit'});                                               // 112
		else                                                                                                                 // 113
			BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardEdit'});                                                    // 114
	}                                                                                                                     // 115
});                                                                                                                    // 116
                                                                                                                       // 117
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/both/utils.coffee.js                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.adminCollectionObject = function(collection) {                                                                    // 1
  if (typeof AdminConfig.collections[collection] !== 'undefined' && typeof AdminConfig.collections[collection].collectionObject !== 'undefined') {
    return AdminConfig.collections[collection].collectionObject;                                                       //
  } else {                                                                                                             //
    return lookup(collection);                                                                                         //
  }                                                                                                                    //
};                                                                                                                     // 1
                                                                                                                       //
this.adminCallback = function(name, args, callback) {                                                                  // 1
  var ref1, ref2, stop;                                                                                                // 8
  stop = false;                                                                                                        // 8
  if (typeof (typeof AdminConfig !== "undefined" && AdminConfig !== null ? (ref1 = AdminConfig.callbacks) != null ? ref1[name] : void 0 : void 0) === 'function') {
    stop = (ref2 = AdminConfig.callbacks)[name].apply(ref2, args) === false;                                           // 10
  }                                                                                                                    //
  if (typeof callback === 'function') {                                                                                // 11
    if (!stop) {                                                                                                       // 12
      return callback.apply(null, args);                                                                               //
    }                                                                                                                  //
  }                                                                                                                    //
};                                                                                                                     // 7
                                                                                                                       //
this.lookup = function(obj, root, required) {                                                                          // 1
  var arr, ref;                                                                                                        // 15
  if (required == null) {                                                                                              //
    required = true;                                                                                                   //
  }                                                                                                                    //
  if (typeof root === 'undefined') {                                                                                   // 15
    root = Meteor.isServer ? global : window;                                                                          // 16
  }                                                                                                                    //
  if (typeof obj === 'string') {                                                                                       // 17
    ref = root;                                                                                                        // 18
    arr = obj.split('.');                                                                                              // 18
    while (arr.length && (ref = ref[arr.shift()])) {                                                                   // 20
      continue;                                                                                                        // 20
    }                                                                                                                  //
    if (!ref && required) {                                                                                            // 21
      throw new Error(obj + ' is not in the ' + root.toString());                                                      // 22
    } else {                                                                                                           //
      return ref;                                                                                                      // 24
    }                                                                                                                  //
  }                                                                                                                    //
  return obj;                                                                                                          // 25
};                                                                                                                     // 14
                                                                                                                       //
this.parseID = function(id) {                                                                                          // 1
  if (typeof id === 'string') {                                                                                        // 28
    if (id.indexOf("ObjectID") > -1) {                                                                                 // 29
      return new Mongo.ObjectID(id.slice(id.indexOf('"') + 1, id.lastIndexOf('"')));                                   // 30
    } else {                                                                                                           //
      return id;                                                                                                       // 32
    }                                                                                                                  //
  } else {                                                                                                             //
    return id;                                                                                                         // 34
  }                                                                                                                    //
};                                                                                                                     // 27
                                                                                                                       //
this.parseIDs = function(ids) {                                                                                        // 1
  return _.map(ids, function(id) {                                                                                     // 37
    return parseID(id);                                                                                                //
  });                                                                                                                  //
};                                                                                                                     // 36
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/both/startup.coffee.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var adminCreateTables, adminDelButton, adminEditButton, adminEditDelButtons, adminPublishTables, adminTablePubName, adminTablesDom, defaultColumns;
                                                                                                                       //
this.AdminTables = {};                                                                                                 // 1
                                                                                                                       //
adminTablesDom = '<"box"<"box-header"<"box-toolbar"<"pull-left"<lf>><"pull-right"p>>><"box-body"t>>';                  // 1
                                                                                                                       //
adminEditButton = {                                                                                                    // 1
  data: '_id',                                                                                                         // 5
  title: 'Edit',                                                                                                       // 5
  createdCell: function(node, cellData, rowData) {                                                                     // 5
    return $(node).html(Blaze.toHTMLWithData(Template.adminEditBtn, {                                                  //
      _id: cellData                                                                                                    // 9
    }, node));                                                                                                         //
  },                                                                                                                   //
  width: '40px',                                                                                                       // 5
  orderable: false                                                                                                     // 5
};                                                                                                                     //
                                                                                                                       //
adminDelButton = {                                                                                                     // 1
  data: '_id',                                                                                                         // 13
  title: 'Delete',                                                                                                     // 13
  createdCell: function(node, cellData, rowData) {                                                                     // 13
    return $(node).html(Blaze.toHTMLWithData(Template.adminDeleteBtn, {                                                //
      _id: cellData                                                                                                    // 17
    }, node));                                                                                                         //
  },                                                                                                                   //
  width: '40px',                                                                                                       // 13
  orderable: false                                                                                                     // 13
};                                                                                                                     //
                                                                                                                       //
adminEditDelButtons = [adminEditButton, adminDelButton];                                                               // 1
                                                                                                                       //
defaultColumns = function() {                                                                                          // 1
  return [                                                                                                             //
    {                                                                                                                  //
      data: '_id',                                                                                                     // 28
      title: 'ID'                                                                                                      // 28
    }                                                                                                                  //
  ];                                                                                                                   //
};                                                                                                                     // 27
                                                                                                                       //
AdminTables.Users = new Tabular.Table({                                                                                // 1
  changeSelector: function(selector, userId) {                                                                         // 34
    var $or;                                                                                                           // 35
    $or = selector['$or'];                                                                                             // 35
    $or && (selector['$or'] = _.map($or, function(exp) {                                                               // 35
      var ref;                                                                                                         // 37
      if (((ref = exp.emails) != null ? ref['$regex'] : void 0) != null) {                                             // 37
        return {                                                                                                       //
          emails: {                                                                                                    // 38
            $elemMatch: {                                                                                              // 38
              address: exp.emails                                                                                      // 38
            }                                                                                                          //
          }                                                                                                            //
        };                                                                                                             //
      } else {                                                                                                         //
        return exp;                                                                                                    //
      }                                                                                                                //
    }));                                                                                                               //
    return selector;                                                                                                   //
  },                                                                                                                   //
  name: 'Users',                                                                                                       // 34
  collection: Meteor.users,                                                                                            // 34
  columns: _.union([                                                                                                   // 34
    {                                                                                                                  //
      data: '_id',                                                                                                     // 46
      title: 'Admin',                                                                                                  // 46
      createdCell: function(node, cellData, rowData) {                                                                 // 46
        return $(node).html(Blaze.toHTMLWithData(Template.adminUsersIsAdmin, {                                         //
          _id: cellData                                                                                                // 51
        }, node));                                                                                                     //
      },                                                                                                               //
      width: '40px'                                                                                                    // 46
    }, {                                                                                                               //
      data: 'emails',                                                                                                  // 54
      title: 'Email',                                                                                                  // 54
      render: function(value) {                                                                                        // 54
        if (value) {                                                                                                   // 58
          return value[0].address;                                                                                     //
        } else {                                                                                                       //
          return '';                                                                                                   //
        }                                                                                                              //
      },                                                                                                               //
      searchable: true                                                                                                 // 54
    }, {                                                                                                               //
      data: 'emails',                                                                                                  // 61
      title: 'Mail',                                                                                                   // 61
      createdCell: function(node, cellData, rowData) {                                                                 // 61
        return $(node).html(Blaze.toHTMLWithData(Template.adminUsersMailBtn, {                                         //
          emails: cellData                                                                                             // 66
        }, node));                                                                                                     //
      },                                                                                                               //
      width: '40px'                                                                                                    // 61
    }, {                                                                                                               //
      data: 'createdAt',                                                                                               // 69
      title: 'Joined'                                                                                                  // 69
    }                                                                                                                  //
  ], adminEditDelButtons),                                                                                             //
  dom: adminTablesDom                                                                                                  // 34
});                                                                                                                    //
                                                                                                                       //
adminTablePubName = function(collection) {                                                                             // 1
  return "admin_tabular_" + collection;                                                                                //
};                                                                                                                     // 73
                                                                                                                       //
adminCreateTables = function(collections) {                                                                            // 1
  return _.each(typeof AdminConfig !== "undefined" && AdminConfig !== null ? AdminConfig.collections : void 0, function(collection, name) {
    var columns;                                                                                                       // 78
    _.defaults(collection, {                                                                                           // 78
      showEditColumn: true,                                                                                            // 78
      showDelColumn: true                                                                                              // 78
    });                                                                                                                //
    columns = _.map(collection.tableColumns, function(column) {                                                        // 78
      var createdCell;                                                                                                 // 84
      if (column.template) {                                                                                           // 84
        createdCell = function(node, cellData, rowData) {                                                              // 85
          $(node).html('');                                                                                            // 86
          return Blaze.renderWithData(Template[column.template], {                                                     //
            value: cellData,                                                                                           // 87
            doc: rowData                                                                                               // 87
          }, node);                                                                                                    //
        };                                                                                                             //
      }                                                                                                                //
      return {                                                                                                         //
        data: column.name,                                                                                             // 89
        title: column.label,                                                                                           // 89
        createdCell: createdCell                                                                                       // 89
      };                                                                                                               //
    });                                                                                                                //
    if (columns.length === 0) {                                                                                        // 93
      columns = defaultColumns();                                                                                      // 94
    }                                                                                                                  //
    if (collection.showEditColumn) {                                                                                   // 96
      columns.push(adminEditButton);                                                                                   // 97
    }                                                                                                                  //
    if (collection.showDelColumn) {                                                                                    // 98
      columns.push(adminDelButton);                                                                                    // 99
    }                                                                                                                  //
    return AdminTables[name] = new Tabular.Table({                                                                     //
      name: name,                                                                                                      // 102
      collection: adminCollectionObject(name),                                                                         // 102
      pub: collection.children && adminTablePubName(name),                                                             // 102
      sub: collection.sub,                                                                                             // 102
      columns: columns,                                                                                                // 102
      extraFields: collection.extraFields,                                                                             // 102
      dom: adminTablesDom                                                                                              // 102
    });                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     // 76
                                                                                                                       //
adminPublishTables = function(collections) {                                                                           // 1
  return _.each(collections, function(collection, name) {                                                              //
    if (!collection.children) {                                                                                        // 113
      return void 0;                                                                                                   // 113
    }                                                                                                                  //
    return Meteor.publishComposite(adminTablePubName(name), function(tableName, ids, fields) {                         //
      var extraFields;                                                                                                 // 115
      check(tableName, String);                                                                                        // 115
      check(ids, Array);                                                                                               // 115
      check(fields, Match.Optional(Object));                                                                           // 115
      extraFields = _.reduce(collection.extraFields, function(fields, name) {                                          // 115
        fields[name] = 1;                                                                                              // 120
        return fields;                                                                                                 //
      }, {});                                                                                                          //
      _.extend(fields, extraFields);                                                                                   // 115
      this.unblock();                                                                                                  // 115
      return {                                                                                                         //
        find: function() {                                                                                             // 127
          this.unblock();                                                                                              // 128
          return adminCollectionObject(name).find({                                                                    //
            _id: {                                                                                                     // 129
              $in: ids                                                                                                 // 129
            }                                                                                                          //
          }, {                                                                                                         //
            fields: fields                                                                                             // 129
          });                                                                                                          //
        },                                                                                                             //
        children: collection.children                                                                                  // 127
      };                                                                                                               //
    });                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     // 111
                                                                                                                       //
Meteor.startup(function() {                                                                                            // 1
  adminCreateTables(typeof AdminConfig !== "undefined" && AdminConfig !== null ? AdminConfig.collections : void 0);    // 133
  if (Meteor.isServer) {                                                                                               // 134
    return adminPublishTables(typeof AdminConfig !== "undefined" && AdminConfig !== null ? AdminConfig.collections : void 0);
  }                                                                                                                    //
});                                                                                                                    // 132
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/both/collections.coffee.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.AdminCollectionsCount = new Mongo.Collection('adminCollectionsCount');                                            // 1
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/html/template.admin_templates.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("AdminDashboard");                                                                                // 2
Template["AdminDashboard"] = new Template("Template.AdminDashboard", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return Blaze.Each(function() {                                                                                       // 5
    return Spacebars.call(view.lookup("adminWidgets"));                                                                // 6
  }, function() {                                                                                                      // 7
    return [ "\n	", Blaze._TemplateWith(function() {                                                                   // 8
      return {                                                                                                         // 9
        template: Spacebars.call(view.lookup("template")),                                                             // 10
        data: Spacebars.call(view.lookup("data"))                                                                      // 11
      };                                                                                                               // 12
    }, function() {                                                                                                    // 13
      return Spacebars.include(function() {                                                                            // 14
        return Spacebars.call(Template.__dynamic);                                                                     // 15
      });                                                                                                              // 16
    }), "\n	" ];                                                                                                       // 17
  }, function() {                                                                                                      // 18
    return [ "\n	", Spacebars.include(view.lookupTemplate("adminDefaultWidgets")), "\n	" ];                            // 19
  });                                                                                                                  // 20
}));                                                                                                                   // 21
                                                                                                                       // 22
Template.__checkName("AdminDashboardNew");                                                                             // 23
Template["AdminDashboardNew"] = new Template("Template.AdminDashboardNew", (function() {                               // 24
  var view = this;                                                                                                     // 25
  return [ Spacebars.include(view.lookupTemplate("adminAlert")), "\n	", Blaze.If(function() {                          // 26
    return Spacebars.dataMustache(view.lookup("adminTemplate"), view.lookup("admin_collection_name"), "new");          // 27
  }, function() {                                                                                                      // 28
    return [ "\n		", Spacebars.With(function() {                                                                       // 29
      return Spacebars.dataMustache(view.lookup("adminTemplate"), view.lookup("admin_collection_name"), "new");        // 30
    }, function() {                                                                                                    // 31
      return [ "\n		", HTML.P("start of dynamic temp"), "\n		", Blaze._TemplateWith(function() {                       // 32
        return {                                                                                                       // 33
          template: Spacebars.call(view.lookup("name")),                                                               // 34
          data: Spacebars.call(view.lookup("data"))                                                                    // 35
        };                                                                                                             // 36
      }, function() {                                                                                                  // 37
        return Spacebars.include(function() {                                                                          // 38
          return Spacebars.call(Template.__dynamic);                                                                   // 39
        });                                                                                                            // 40
      }), "\n		", HTML.P("end of dynamic temp"), "\n		" ];                                                             // 41
    }), "\n	" ];                                                                                                       // 42
  }, function() {                                                                                                      // 43
    return [ "\n		", HTML.DIV({                                                                                        // 44
      "class": "box box-default"                                                                                       // 45
    }, "\n			", HTML.DIV({                                                                                             // 46
      "class": "box-body"                                                                                              // 47
    }, "\n				", Blaze._TemplateWith(function() {                                                                      // 48
      return {                                                                                                         // 49
        id: Spacebars.call("admin_insert"),                                                                            // 50
        collection: Spacebars.call(view.lookup("admin_collection_name")),                                              // 51
        fields: Spacebars.call(view.lookup("admin_fields")),                                                           // 52
        omitFields: Spacebars.call(view.lookup("admin_omit_fields")),                                                  // 53
        buttonContent: Spacebars.call("Create")                                                                        // 54
      };                                                                                                               // 55
    }, function() {                                                                                                    // 56
      return Spacebars.include(view.lookupTemplate("quickForm"));                                                      // 57
    }), "\n			"), "\n		"), "\n	" ];                                                                                    // 58
  }) ];                                                                                                                // 59
}));                                                                                                                   // 60
                                                                                                                       // 61
Template.__checkName("AdminDashboardEdit");                                                                            // 62
Template["AdminDashboardEdit"] = new Template("Template.AdminDashboardEdit", (function() {                             // 63
  var view = this;                                                                                                     // 64
  return Blaze.If(function() {                                                                                         // 65
    return Spacebars.call(view.lookup("isSubReady"));                                                                  // 66
  }, function() {                                                                                                      // 67
    return [ "\n	", Spacebars.include(view.lookupTemplate("adminAlert")), "\n	", Blaze.If(function() {                 // 68
      return Spacebars.dataMustache(view.lookup("adminTemplate"), view.lookup("admin_collection_name"), "edit");       // 69
    }, function() {                                                                                                    // 70
      return [ "\n		", Spacebars.With(function() {                                                                     // 71
        return Spacebars.dataMustache(view.lookup("adminTemplate"), view.lookup("admin_collection_name"), "edit");     // 72
      }, function() {                                                                                                  // 73
        return [ "\n		", Blaze._TemplateWith(function() {                                                              // 74
          return {                                                                                                     // 75
            template: Spacebars.call(view.lookup("name")),                                                             // 76
            data: Spacebars.call(view.lookup("data"))                                                                  // 77
          };                                                                                                           // 78
        }, function() {                                                                                                // 79
          return Spacebars.include(function() {                                                                        // 80
            return Spacebars.call(Template.__dynamic);                                                                 // 81
          });                                                                                                          // 82
        }), "\n		" ];                                                                                                  // 83
      }), "\n	" ];                                                                                                     // 84
    }, function() {                                                                                                    // 85
      return [ "\n	 ", Blaze.If(function() {                                                                           // 86
        return Spacebars.call(view.lookup("action"));                                                                  // 87
      }, function() {                                                                                                  // 88
        return [ "\n			", Spacebars.include(view.lookupTemplate("adminDeleteWidget")), "\n	 " ];                       // 89
      }), "\n		", HTML.DIV({                                                                                           // 90
        "class": "box box-default"                                                                                     // 91
      }, "\n			", HTML.DIV({                                                                                           // 92
        "class": "box-body"                                                                                            // 93
      }, "\n				", Blaze.If(function() {                                                                               // 94
        return Spacebars.call(view.lookup("fadmin_doc"));                                                              // 95
      }, function() {                                                                                                  // 96
        return [ "\n				", Blaze._TemplateWith(function() {                                                            // 97
          return {                                                                                                     // 98
            id: Spacebars.call("admin_update"),                                                                        // 99
            collection: Spacebars.call(view.lookup("admin_collection_name")),                                          // 100
            doc: Spacebars.call(view.lookup("fadmin_doc")),                                                            // 101
            fields: Spacebars.call(view.lookup("admin_fields")),                                                       // 102
            omitFields: Spacebars.call(view.lookup("admin_omit_fields")),                                              // 103
            buttonContent: Spacebars.call("Update")                                                                    // 104
          };                                                                                                           // 105
        }, function() {                                                                                                // 106
          return Spacebars.include(view.lookupTemplate("quickForm"));                                                  // 107
        }), "\n				" ];                                                                                                // 108
      }, function() {                                                                                                  // 109
        return "\n					can't find current doc\n				";                                                                  // 110
      }), "\n			"), "\n		"), "\n	" ];                                                                                  // 111
    }), "\n	" ];                                                                                                       // 112
  }, function() {                                                                                                      // 113
    return [ "\n		", HTML.DIV({                                                                                        // 114
      "class": "box box-default"                                                                                       // 115
    }, HTML.DIV({                                                                                                      // 116
      "class": "box-body"                                                                                              // 117
    }, "Loading...")), "\n	" ];                                                                                        // 118
  });                                                                                                                  // 119
}));                                                                                                                   // 120
                                                                                                                       // 121
Template.__checkName("AdminDashboardViewWrapper");                                                                     // 122
Template["AdminDashboardViewWrapper"] = new Template("Template.AdminDashboardViewWrapper", (function() {               // 123
  var view = this;                                                                                                     // 124
  return HTML.Raw("<div></div>\n	");                                                                                   // 125
}));                                                                                                                   // 126
                                                                                                                       // 127
Template.__checkName("AdminDashboardView");                                                                            // 128
Template["AdminDashboardView"] = new Template("Template.AdminDashboardView", (function() {                             // 129
  var view = this;                                                                                                     // 130
  return Blaze.If(function() {                                                                                         // 131
    return Spacebars.call(view.lookup("isSubReady"));                                                                  // 132
  }, function() {                                                                                                      // 133
    return [ "\n	", Spacebars.include(view.lookupTemplate("adminAlert")), "\n	", Blaze.If(function() {                 // 134
      return Spacebars.dataMustache(view.lookup("adminTemplate"), view.lookup("admin_collection_name"), "view");       // 135
    }, function() {                                                                                                    // 136
      return [ "\n		", Spacebars.With(function() {                                                                     // 137
        return Spacebars.dataMustache(view.lookup("adminTemplate"), view.lookup("admin_collection_name"), "view");     // 138
      }, function() {                                                                                                  // 139
        return [ "\n		", Blaze._TemplateWith(function() {                                                              // 140
          return {                                                                                                     // 141
            template: Spacebars.call(view.lookup("name")),                                                             // 142
            data: Spacebars.call(view.lookup("data"))                                                                  // 143
          };                                                                                                           // 144
        }, function() {                                                                                                // 145
          return Spacebars.include(function() {                                                                        // 146
            return Spacebars.call(Template.__dynamic);                                                                 // 147
          });                                                                                                          // 148
        }), "\n		" ];                                                                                                  // 149
      }), "\n	" ];                                                                                                     // 150
    }, function() {                                                                                                    // 151
      return [ "\n		", Blaze.If(function() {                                                                           // 152
        return Spacebars.call(view.lookup("hasDocuments"));                                                            // 153
      }, function() {                                                                                                  // 154
        return [ "\n			", Blaze._TemplateWith(function() {                                                             // 155
          return {                                                                                                     // 156
            table: Spacebars.call(view.lookup("admin_table")),                                                         // 157
            "class": Spacebars.call("table dataTable")                                                                 // 158
          };                                                                                                           // 159
        }, function() {                                                                                                // 160
          return Spacebars.include(view.lookupTemplate("tabular"));                                                    // 161
        }), "\n		" ];                                                                                                  // 162
      }, function() {                                                                                                  // 163
        return [ "\n			", HTML.DIV({                                                                                   // 164
          "class": "alert alert-info"                                                                                  // 165
        }, "\n				", HTML.P("There are no visible items in this collection."), "\n				", HTML.P(HTML.A({               // 166
          href: function() {                                                                                           // 167
            return Spacebars.mustache(view.lookup("newPath"));                                                         // 168
          },                                                                                                           // 169
          "class": "btn btn-primary"                                                                                   // 170
        }, HTML.I({                                                                                                    // 171
          "class": "fa fa-plus"                                                                                        // 172
        }), " Add one")), "\n			"), "\n		" ];                                                                          // 173
      }), "\n	" ];                                                                                                     // 174
    }), "\n	" ];                                                                                                       // 175
  }, function() {                                                                                                      // 176
    return [ "\n		", HTML.DIV({                                                                                        // 177
      "class": "box box-default"                                                                                       // 178
    }, HTML.DIV({                                                                                                      // 179
      "class": "box-body"                                                                                              // 180
    }, "Loading...")), "\n	" ];                                                                                        // 181
  });                                                                                                                  // 182
}));                                                                                                                   // 183
                                                                                                                       // 184
Template.__checkName("AdminDashboardUsersNew");                                                                        // 185
Template["AdminDashboardUsersNew"] = new Template("Template.AdminDashboardUsersNew", (function() {                     // 186
  var view = this;                                                                                                     // 187
  return HTML.DIV({                                                                                                    // 188
    "class": "box box-default"                                                                                         // 189
  }, "\n		", HTML.DIV({                                                                                                // 190
    "class": "box-body"                                                                                                // 191
  }, "\n			", Spacebars.include(view.lookupTemplate("adminAlert")), "\n			", Blaze._TemplateWith(function() {          // 192
    return {                                                                                                           // 193
      id: Spacebars.call("adminNewUser"),                                                                              // 194
      schema: Spacebars.call(Spacebars.dot(view.lookup("AdminSchemas"), "newUser")),                                   // 195
      type: Spacebars.call("method"),                                                                                  // 196
      meteormethod: Spacebars.call("adminNewUser")                                                                     // 197
    };                                                                                                                 // 198
  }, function() {                                                                                                      // 199
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 200
      return [ "\n			", Blaze._TemplateWith(function() {                                                               // 201
        return {                                                                                                       // 202
          name: Spacebars.call("email")                                                                                // 203
        };                                                                                                             // 204
      }, function() {                                                                                                  // 205
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 206
      }), "\n			", Blaze._TemplateWith(function() {                                                                    // 207
        return {                                                                                                       // 208
          name: Spacebars.call("chooseOwnPassword")                                                                    // 209
        };                                                                                                             // 210
      }, function() {                                                                                                  // 211
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 212
      }), "\n			", Blaze.If(function() {                                                                               // 213
        return Spacebars.dataMustache(view.lookup("afFieldValueIs"), Spacebars.kw({                                    // 214
          name: "chooseOwnPassword",                                                                                   // 215
          value: false                                                                                                 // 216
        }));                                                                                                           // 217
      }, function() {                                                                                                  // 218
        return [ "\n			", Blaze._TemplateWith(function() {                                                             // 219
          return {                                                                                                     // 220
            name: Spacebars.call("password")                                                                           // 221
          };                                                                                                           // 222
        }, function() {                                                                                                // 223
          return Spacebars.include(view.lookupTemplate("afQuickField"));                                               // 224
        }), "\n			", Blaze._TemplateWith(function() {                                                                  // 225
          return {                                                                                                     // 226
            name: Spacebars.call("sendPassword")                                                                       // 227
          };                                                                                                           // 228
        }, function() {                                                                                                // 229
          return Spacebars.include(view.lookupTemplate("afQuickField"));                                               // 230
        }), "\n			" ];                                                                                                 // 231
      }), "\n			", HTML.BUTTON({                                                                                       // 232
        type: "submit",                                                                                                // 233
        "class": "btn btn-primary"                                                                                     // 234
      }, "Add User"), "\n			" ];                                                                                       // 235
    });                                                                                                                // 236
  }), "\n		"), "\n	");                                                                                                 // 237
}));                                                                                                                   // 238
                                                                                                                       // 239
Template.__checkName("AdminDashboardUsersEdit");                                                                       // 240
Template["AdminDashboardUsersEdit"] = new Template("Template.AdminDashboardUsersEdit", (function() {                   // 241
  var view = this;                                                                                                     // 242
  return [ Blaze.If(function() {                                                                                       // 243
    return Spacebars.call(view.lookup("action"));                                                                      // 244
  }, function() {                                                                                                      // 245
    return [ "\n		", Spacebars.include(view.lookupTemplate("adminDeleteWidget")), "\n	" ];                             // 246
  }), "\n	", HTML.DIV({                                                                                                // 247
    "class": "box box-default"                                                                                         // 248
  }, "\n		", HTML.DIV({                                                                                                // 249
    "class": "box-body"                                                                                                // 250
  }, "\n			", Spacebars.include(view.lookupTemplate("adminAlert")), "\n			", Blaze.If(function() {                     // 251
    return Spacebars.call(view.lookup("adminGetUserSchema"));                                                          // 252
  }, function() {                                                                                                      // 253
    return [ "\n			", Blaze._TemplateWith(function() {                                                                 // 254
      return {                                                                                                         // 255
        id: Spacebars.call("adminUpdateUser"),                                                                         // 256
        buttonContent: Spacebars.call("Update"),                                                                       // 257
        buttonClasses: Spacebars.call("btn btn-primary btn-sm"),                                                       // 258
        collection: Spacebars.call(view.lookup("adminGetUsers")),                                                      // 259
        schema: Spacebars.call(view.lookup("adminGetUserSchema")),                                                     // 260
        doc: Spacebars.call(view.lookup("admin_current_doc")),                                                         // 261
        omitFields: Spacebars.call("roles,services")                                                                   // 262
      };                                                                                                               // 263
    }, function() {                                                                                                    // 264
      return Spacebars.include(view.lookupTemplate("quickForm"));                                                      // 265
    }), "\n			", HTML.HR(), "\n			" ];                                                                                 // 266
  }), "\n\n			", HTML.Raw("<h4>User Roles</h4>"), "\n			", Blaze.Each(function() {                                     // 267
    return Spacebars.call(view.lookup("roles"));                                                                       // 268
  }, function() {                                                                                                      // 269
    return [ "\n			", HTML.BUTTON({                                                                                    // 270
      "class": "btn btn-primary btn-xs btn-remove-role",                                                               // 271
      role: function() {                                                                                               // 272
        return Spacebars.mustache(view.lookup("."));                                                                   // 273
      },                                                                                                               // 274
      user: function() {                                                                                               // 275
        return Spacebars.mustache(view.lookup("admin_current_id"));                                                    // 276
      }                                                                                                                // 277
    }, Blaze.View("lookup:.", function() {                                                                             // 278
      return Spacebars.mustache(view.lookup("."));                                                                     // 279
    })), "\n			" ];                                                                                                    // 280
  }), "\n			", Blaze.Each(function() {                                                                                 // 281
    return Spacebars.call(view.lookup("otherRoles"));                                                                  // 282
  }, function() {                                                                                                      // 283
    return [ "\n			", HTML.BUTTON({                                                                                    // 284
      "class": "btn btn-default btn-xs btn-add-role",                                                                  // 285
      role: function() {                                                                                               // 286
        return Spacebars.mustache(view.lookup("."));                                                                   // 287
      },                                                                                                               // 288
      user: function() {                                                                                               // 289
        return Spacebars.mustache(view.lookup("admin_current_id"));                                                    // 290
      }                                                                                                                // 291
    }, Blaze.View("lookup:.", function() {                                                                             // 292
      return Spacebars.mustache(view.lookup("."));                                                                     // 293
    })), "\n			" ];                                                                                                    // 294
  }), "\n			", Blaze.If(function() {                                                                                   // 295
    return Spacebars.call(view.lookup("roles"));                                                                       // 296
  }, function() {                                                                                                      // 297
    return [ "\n			", HTML.P({                                                                                         // 298
      style: "margin-top:5px;"                                                                                         // 299
    }, "Click a role to toggle it."), "\n			" ];                                                                       // 300
  }, function() {                                                                                                      // 301
    return [ "\n			", HTML.P("User not in any roles. Click a role to add it to a user."), "\n			" ];                   // 302
  }), "\n\n			", HTML.Raw("<hr>"), "\n			", HTML.Raw("<h4>Reset Password</h4>"), "\n			", Blaze._TemplateWith(function() {
    return {                                                                                                           // 304
      id: Spacebars.call("adminSendResetPasswordEmail"),                                                               // 305
      schema: Spacebars.call(Spacebars.dot(view.lookup("AdminSchemas"), "sendResetPasswordEmail")),                    // 306
      type: Spacebars.call("method"),                                                                                  // 307
      meteormethod: Spacebars.call("adminSendResetPasswordEmail")                                                      // 308
    };                                                                                                                 // 309
  }, function() {                                                                                                      // 310
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 311
      return [ "\n			", HTML.DIV({                                                                                     // 312
        "class": "form-group hidden"                                                                                   // 313
      }, "\n				", HTML.LABEL({                                                                                        // 314
        "class": "control-label",                                                                                      // 315
        "for": "title"                                                                                                 // 316
      }, "ID"), "\n				", HTML.INPUT({                                                                                 // 317
        value: function() {                                                                                            // 318
          return Spacebars.mustache(view.lookup("admin_current_id"));                                                  // 319
        },                                                                                                             // 320
        type: "text",                                                                                                  // 321
        name: "_id",                                                                                                   // 322
        omitfields: "createdAtupdatedAt",                                                                              // 323
        required: "",                                                                                                  // 324
        "data-schema-key": "_id",                                                                                      // 325
        "class": "form-control",                                                                                       // 326
        autocomplete: "off"                                                                                            // 327
      }), "\n				", HTML.SPAN({                                                                                        // 328
        "class": "help-block"                                                                                          // 329
      }), "\n			"), "\n			", HTML.P("Send a reset password email to ", Blaze.View("lookup:admin_current_doc.emails.0.address", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("admin_current_doc"), "emails", "0", "address"));          // 331
      })), "\n			", HTML.BUTTON({                                                                                      // 332
        type: "submit",                                                                                                // 333
        "class": "btn btn-primary btn-sm"                                                                              // 334
      }, "Send Email"), "\n			" ];                                                                                     // 335
    });                                                                                                                // 336
  }), "\n\n			", HTML.Raw("<hr>"), "\n			", HTML.Raw("<h4>Change Password</h4>"), "\n			", Blaze._TemplateWith(function() {
    return {                                                                                                           // 338
      id: Spacebars.call("adminChangePassword"),                                                                       // 339
      schema: Spacebars.call(Spacebars.dot(view.lookup("AdminSchemas"), "changePassword")),                            // 340
      type: Spacebars.call("method"),                                                                                  // 341
      meteormethod: Spacebars.call("adminChangePassword")                                                              // 342
    };                                                                                                                 // 343
  }, function() {                                                                                                      // 344
    return Spacebars.include(view.lookupTemplate("autoForm"), function() {                                             // 345
      return [ "\n			", HTML.DIV({                                                                                     // 346
        "class": "form-group hidden"                                                                                   // 347
      }, "\n				", HTML.LABEL({                                                                                        // 348
        "class": "control-label",                                                                                      // 349
        "for": "title"                                                                                                 // 350
      }, "ID"), "\n				", HTML.INPUT({                                                                                 // 351
        value: function() {                                                                                            // 352
          return Spacebars.mustache(view.lookup("admin_current_id"));                                                  // 353
        },                                                                                                             // 354
        type: "text",                                                                                                  // 355
        name: "_id",                                                                                                   // 356
        omitfields: "createdAtupdatedAt",                                                                              // 357
        required: "",                                                                                                  // 358
        "data-schema-key": "_id",                                                                                      // 359
        "class": "form-control",                                                                                       // 360
        autocomplete: "off"                                                                                            // 361
      }), "\n				", HTML.SPAN({                                                                                        // 362
        "class": "help-block"                                                                                          // 363
      }), "\n			"), "\n			", Blaze._TemplateWith(function() {                                                          // 364
        return {                                                                                                       // 365
          name: Spacebars.call("password")                                                                             // 366
        };                                                                                                             // 367
      }, function() {                                                                                                  // 368
        return Spacebars.include(view.lookupTemplate("afQuickField"));                                                 // 369
      }), "\n			", HTML.BUTTON({                                                                                       // 370
        type: "submit",                                                                                                // 371
        "class": "btn btn-primary btn-sm"                                                                              // 372
      }, "Change Password"), "\n			" ];                                                                                // 373
    });                                                                                                                // 374
  }), "\n		"), "\n	") ];                                                                                               // 375
}));                                                                                                                   // 376
                                                                                                                       // 377
Template.__checkName("adminAlert");                                                                                    // 378
Template["adminAlert"] = new Template("Template.adminAlert", (function() {                                             // 379
  var view = this;                                                                                                     // 380
  return [ Blaze.If(function() {                                                                                       // 381
    return Spacebars.dataMustache(Spacebars.dot(view.lookup("$"), "Session", "get"), "adminSuccess");                  // 382
  }, function() {                                                                                                      // 383
    return [ "\n	", HTML.DIV({                                                                                         // 384
      "class": "alert alert-success admin-alert"                                                                       // 385
    }, "\n		", Blaze.View("lookup:$.Session.get", function() {                                                         // 386
      return Spacebars.mustache(Spacebars.dot(view.lookup("$"), "Session", "get"), "adminSuccess");                    // 387
    }), "\n	"), "\n	" ];                                                                                               // 388
  }), "\n\n	", Blaze.If(function() {                                                                                   // 389
    return Spacebars.dataMustache(Spacebars.dot(view.lookup("$"), "Session", "get"), "adminError");                    // 390
  }, function() {                                                                                                      // 391
    return [ "\n	", HTML.DIV({                                                                                         // 392
      "class": "alert alert-danger admin-alert"                                                                        // 393
    }, "\n		", Blaze.View("lookup:$.Session.get", function() {                                                         // 394
      return Spacebars.mustache(Spacebars.dot(view.lookup("$"), "Session", "get"), "adminError");                      // 395
    }), "\n	"), "\n	" ];                                                                                               // 396
  }) ];                                                                                                                // 397
}));                                                                                                                   // 398
                                                                                                                       // 399
Template.__checkName("adminUsersIsAdmin");                                                                             // 400
Template["adminUsersIsAdmin"] = new Template("Template.adminUsersIsAdmin", (function() {                               // 401
  var view = this;                                                                                                     // 402
  return Blaze.If(function() {                                                                                         // 403
    return Spacebars.call(view.lookup("checkadmin"));                                                                  // 404
  }, function() {                                                                                                      // 405
    return HTML.I({                                                                                                    // 406
      "class": "fa fa-check"                                                                                           // 407
    });                                                                                                                // 408
  });                                                                                                                  // 409
}));                                                                                                                   // 410
                                                                                                                       // 411
Template.__checkName("adminUsersMailBtn");                                                                             // 412
Template["adminUsersMailBtn"] = new Template("Template.adminUsersMailBtn", (function() {                               // 413
  var view = this;                                                                                                     // 414
  return HTML.A({                                                                                                      // 415
    href: function() {                                                                                                 // 416
      return [ "mailto:", Spacebars.mustache(view.lookup("adminUserEmail")) ];                                         // 417
    },                                                                                                                 // 418
    "class": "btn btn-default btn-xs"                                                                                  // 419
  }, HTML.Raw('<i class="fa fa-envelope"></i>'));                                                                      // 420
}));                                                                                                                   // 421
                                                                                                                       // 422
Template.__checkName("adminEditBtn");                                                                                  // 423
Template["adminEditBtn"] = new Template("Template.adminEditBtn", (function() {                                         // 424
  var view = this;                                                                                                     // 425
  return [ HTML.A({                                                                                                    // 426
    href: function() {                                                                                                 // 427
      return Spacebars.mustache(view.lookup("path"));                                                                  // 428
    },                                                                                                                 // 429
    "class": "hidden-xs btn btn-xs btn-primary"                                                                        // 430
  }, HTML.Raw('<i class="fa fa-pencil"></i>')), "\n	", HTML.A({                                                        // 431
    href: function() {                                                                                                 // 432
      return Spacebars.mustache(view.lookup("path"));                                                                  // 433
    },                                                                                                                 // 434
    "class": "visible-xs btn btn-sm btn-primary"                                                                       // 435
  }, HTML.Raw('<i class="fa fa-pencil"></i>'), " Edit") ];                                                             // 436
}));                                                                                                                   // 437
                                                                                                                       // 438
Template.__checkName("adminDeleteBtn");                                                                                // 439
Template["adminDeleteBtn"] = new Template("Template.adminDeleteBtn", (function() {                                     // 440
  var view = this;                                                                                                     // 441
  return [ HTML.A({                                                                                                    // 442
    href: function() {                                                                                                 // 443
      return Spacebars.mustache(view.lookup("path"));                                                                  // 444
    },                                                                                                                 // 445
    "class": "hidden-xs btn btn-xs btn-primary"                                                                        // 446
  }, HTML.Raw('<i class="fa fa-times"></i>')), "\n	 ", HTML.A({                                                        // 447
    href: function() {                                                                                                 // 448
      return Spacebars.mustache(view.lookup("path"));                                                                  // 449
    },                                                                                                                 // 450
    "class": "visible-xs btn btn-sm btn-primary"                                                                       // 451
  }, HTML.Raw('<i class="fa fa-times"></i>'), "Delete") ];                                                             // 452
}));                                                                                                                   // 453
                                                                                                                       // 454
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/html/template.admin_widgets.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("adminDefaultWidgets");                                                                           // 2
Template["adminDefaultWidgets"] = new Template("Template.adminDefaultWidgets", (function() {                           // 3
  var view = this;                                                                                                     // 4
  return Blaze.Each(function() {                                                                                       // 5
    return Spacebars.call(view.lookup("admin_collections"));                                                           // 6
  }, function() {                                                                                                      // 7
    return [ "\n		", Blaze.Unless(function() {                                                                         // 8
      return Spacebars.dataMustache(view.lookup("$eq"), view.lookup("showWidget"), false);                             // 9
    }, function() {                                                                                                    // 10
      return [ "\n			", Blaze._TemplateWith(function() {                                                               // 11
        return {                                                                                                       // 12
          collection: Spacebars.call(view.lookup("name"))                                                              // 13
        };                                                                                                             // 14
      }, function() {                                                                                                  // 15
        return Spacebars.include(view.lookupTemplate("adminCollectionWidget"));                                        // 16
      }), "\n		" ];                                                                                                    // 17
    }), "\n	" ];                                                                                                       // 18
  });                                                                                                                  // 19
}));                                                                                                                   // 20
                                                                                                                       // 21
Template.__checkName("adminCollectionWidget");                                                                         // 22
Template["adminCollectionWidget"] = new Template("Template.adminCollectionWidget", (function() {                       // 23
  var view = this;                                                                                                     // 24
  return HTML.DIV({                                                                                                    // 25
    "class": function() {                                                                                              // 26
      return Blaze.If(function() {                                                                                     // 27
        return Spacebars.call(view.lookup("class"));                                                                   // 28
      }, function() {                                                                                                  // 29
        return Blaze.View("lookup:class", function() {                                                                 // 30
          return Spacebars.mustache(view.lookup("class"));                                                             // 31
        });                                                                                                            // 32
      }, function() {                                                                                                  // 33
        return "col-lg-3 col-xs-6";                                                                                    // 34
      });                                                                                                              // 35
    }                                                                                                                  // 36
  }, "\n	", Spacebars.With(function() {                                                                                // 37
    return Spacebars.dataMustache(view.lookup("adminGetCollection"), view.lookup("collection"));                       // 38
  }, function() {                                                                                                      // 39
    return [ "\n		", HTML.A({                                                                                          // 40
      href: function() {                                                                                               // 41
        return Spacebars.mustache(view.lookup("adminViewPath"), Spacebars.dot(view.lookup("."), "name"));              // 42
      }                                                                                                                // 43
    }, "\n			", HTML.DIV({                                                                                             // 44
      "class": function() {                                                                                            // 45
        return [ "small-box bg-", Spacebars.mustache(view.lookup("color")) ];                                          // 46
      }                                                                                                                // 47
    }, "\n				", HTML.DIV({                                                                                            // 48
      "class": "inner"                                                                                                 // 49
    }, "\n					", HTML.H3("\n						", Blaze.View("lookup:adminCollectionCount", function() {                           // 50
      return Spacebars.mustache(view.lookup("adminCollectionCount"), view.lookup("name"));                             // 51
    }), "\n					"), "\n					", HTML.P("\n						", Blaze.View("lookup:..label", function() {                            // 52
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 53
    }), "\n					"), "\n				"), "\n				", HTML.DIV({                                                                    // 54
      "class": "icon"                                                                                                  // 55
    }, "\n					", HTML.I({                                                                                             // 56
      "class": function() {                                                                                            // 57
        return [ "fa fa-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "icon")) ];                              // 58
      }                                                                                                                // 59
    }), "\n				"), "\n				", HTML.A({                                                                                  // 60
      "class": "small-box-footer"                                                                                      // 61
    }, "\n					See all ", HTML.I({                                                                                     // 62
      "class": "fa fa-arrow-circle-right"                                                                              // 63
    }), "\n				"), "\n			"), "\n		"), "\n		" ];                                                                        // 64
  }), "\n	");                                                                                                          // 65
}));                                                                                                                   // 66
                                                                                                                       // 67
Template.__checkName("adminDeleteWidget");                                                                             // 68
Template["adminDeleteWidget"] = new Template("Template.adminDeleteWidget", (function() {                               // 69
  var view = this;                                                                                                     // 70
  return HTML.Raw('<div class="alert alert-warning admin-alert">\n		<h4>Confirm delete</h4>\n		<div>\n			<p>Are you sure you want to delete this document ? </p>\n		</div>\n		<div>\n			<button type="button" id="confirm-delete" class="btn btn-danger">Delete</button>\n		</div>\n	</div>');
}));                                                                                                                   // 72
                                                                                                                       // 73
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/html/template.fadmin_layouts.js                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("fAdminLayout");                                                                                  // 2
Template["fAdminLayout"] = new Template("Template.fAdminLayout", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return Blaze.If(function() {                                                                                         // 5
    return Spacebars.call(view.lookup("AdminConfig"));                                                                 // 6
  }, function() {                                                                                                      // 7
    return [ "\n  ", Blaze.If(function() {                                                                             // 8
      return Spacebars.dataMustache(view.lookup("isInRole"), "admin");                                                 // 9
    }, function() {                                                                                                    // 10
      return [ "\n    ", HTML.DIV({                                                                                    // 11
        "class": "admin-layout"                                                                                        // 12
      }, "\n    ", Blaze._TemplateWith(function() {                                                                    // 13
        return {                                                                                                       // 14
          skin: Spacebars.call(view.lookup("admin_skin"))                                                              // 15
        };                                                                                                             // 16
      }, function() {                                                                                                  // 17
        return Spacebars.include(view.lookupTemplate("AdminLTE"), function() {                                         // 18
          return [ "\n  			", Spacebars.include(view.lookupTemplate("AdminHeader")), "\n  			", Spacebars.include(view.lookupTemplate("AdminSidebar")), "\n				", HTML.DIV({
            "class": "content-wrapper",                                                                                // 20
            style: function() {                                                                                        // 21
              return [ "min-height: ", Spacebars.mustache(view.lookup("minHeight")) ];                                 // 22
            }                                                                                                          // 23
          }, "\n					", HTML.SECTION({                                                                                 // 24
            "class": "content-header"                                                                                  // 25
          }, "\n						", HTML.H1("\n							", Blaze.View("lookup:$.Session.get", function() {                          // 26
            return Spacebars.mustache(Spacebars.dot(view.lookup("$"), "Session", "get"), "admin_title");               // 27
          }), "\n							", HTML.SMALL(Blaze.View("lookup:$.Session.get", function() {                                  // 28
            return Spacebars.mustache(Spacebars.dot(view.lookup("$"), "Session", "get"), "admin_subtitle");            // 29
          })), "\n						"), "\n						", HTML.BR(), "\n						", HTML.OL({                                               // 30
            "class": "breadcrumb"                                                                                      // 31
          }, "\n							", HTML.LI(HTML.A({                                                                             // 32
            href: "/admin/"                                                                                            // 33
          }, "Dashboard")), "\n							", Blaze.If(function() {                                                         // 34
            return Spacebars.dataMustache(Spacebars.dot(view.lookup("$"), "Session", "get"), "admin_collection_name");
          }, function() {                                                                                              // 36
            return [ "\n							", HTML.LI(HTML.A({                                                                     // 37
              href: function() {                                                                                       // 38
                return [ "/admin/view/", Spacebars.mustache(Spacebars.dot(view.lookup("$"), "Session", "get"), "admin_collection_name"), "/" ];
              }                                                                                                        // 40
            }, Blaze.View("lookup:adminCollectionLabel", function() {                                                  // 41
              return Spacebars.mustache(view.lookup("adminCollectionLabel"), view.lookup("admin_collection_name"));    // 42
            }))), "\n							" ];                                                                                       // 43
          }), "\n							", Blaze.If(function() {                                                                       // 44
            return Spacebars.dataMustache(Spacebars.dot(view.lookup("$"), "Session", "equals"), "admin_collection_page", "new");
          }, function() {                                                                                              // 46
            return [ "\n							", HTML.LI("New"), "\n							" ];                                                       // 47
          }), "\n							", Blaze.If(function() {                                                                       // 48
            return Spacebars.dataMustache(Spacebars.dot(view.lookup("$"), "Session", "equals"), "admin_collection_page", "edit");
          }, function() {                                                                                              // 50
            return [ "\n							", HTML.LI("Edit"), "\n							" ];                                                      // 51
          }), "\n						"), "\n					"), "\n					", HTML.SECTION({                                                       // 52
            "class": "content"                                                                                         // 53
          }, "\n						", Blaze._TemplateWith(function() {                                                              // 54
            return {                                                                                                   // 55
              template: Spacebars.call(view.lookup("main"))                                                            // 56
            };                                                                                                         // 57
          }, function() {                                                                                              // 58
            return Spacebars.include(function() {                                                                      // 59
              return Spacebars.call(Template.__dynamic);                                                               // 60
            });                                                                                                        // 61
          }), "\n					"), "\n				"), "\n    " ];                                                                       // 62
        });                                                                                                            // 63
      }), "\n    "), "\n	" ];                                                                                          // 64
    }, function() {                                                                                                    // 65
      return [ "\n	", Spacebars.include(view.lookupTemplate("NotAdmin")), "\n	" ];                                     // 66
    }), "\n	" ];                                                                                                       // 67
  }, function() {                                                                                                      // 68
    return [ "\n	", Spacebars.include(view.lookupTemplate("NoConfig")), "\n	" ];                                       // 69
  });                                                                                                                  // 70
}));                                                                                                                   // 71
                                                                                                                       // 72
Template.__checkName("NotAdmin");                                                                                      // 73
Template["NotAdmin"] = new Template("Template.NotAdmin", (function() {                                                 // 74
  var view = this;                                                                                                     // 75
  return HTML.Raw('<div class="container">\n<div class="row">\n	<div class="col-md-4 col-md-offset-4">\n		<p class="alert alert-info" style="margin-top:100px;">\n			You need to be an admin to view this page\n		</p>\n	</div>\n</div>\n</div>');
}));                                                                                                                   // 77
                                                                                                                       // 78
Template.__checkName("AdminLoading");                                                                                  // 79
Template["AdminLoading"] = new Template("Template.AdminLoading", (function() {                                         // 80
  var view = this;                                                                                                     // 81
  return HTML.Raw("<p> Loading....</p>");                                                                              // 82
}));                                                                                                                   // 83
                                                                                                                       // 84
Template.__checkName("NoConfig");                                                                                      // 85
Template["NoConfig"] = new Template("Template.NoConfig", (function() {                                                 // 86
  var view = this;                                                                                                     // 87
  return HTML.Raw("<p class=\"alert alert-info\">\n		You need to define an AdminConfig object to use the admin dashboard.\n		<br>\n		A basic config to manage the 'Posts' and 'Comments' collection would look like this:\n		<br>\n		<code>\n		AdminConfig = {\n		<br>\n			adminEmails: ['	ben@code2create.com'],\n		<br>\n			collections:\n		<br>\n				{\n		<br>\n					Posts: {},\n		<br>\n					Comments: {}\n		<br>\n				}\n		<br>\n		}\n		</code>\n	</p>");
}));                                                                                                                   // 89
                                                                                                                       // 90
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/html/template.admin_sidebar.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("AdminSidebar");                                                                                  // 2
Template["AdminSidebar"] = new Template("Template.AdminSidebar", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.ASIDE({                                                                                                  // 5
    "class": "main-sidebar"                                                                                            // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "sidebar"                                                                                                 // 8
  }, "\n			", HTML.UL({                                                                                                // 9
    "class": "sidebar-menu"                                                                                            // 10
  }, "\n				", HTML.LI({                                                                                               // 11
    "class": function() {                                                                                              // 12
      return Spacebars.mustache(view.lookup("isActiveRoute"), "adminDashboard");                                       // 13
    }                                                                                                                  // 14
  }, "\n					", HTML.Raw('<a href="/admin">\n						<i class="fa fa-dashboard"></i> <span>Dashboard</span>\n					</a>'), "\n				"), "\n				", Blaze.Each(function() {
    return Spacebars.call(view.lookup("admin_collections"));                                                           // 16
  }, function() {                                                                                                      // 17
    return [ "\n				", HTML.LI({                                                                                       // 18
      "class": "treeview"                                                                                              // 19
    }, "\n					", HTML.A({                                                                                             // 20
      href: "#"                                                                                                        // 21
    }, "\n						", HTML.I({                                                                                            // 22
      "class": function() {                                                                                            // 23
        return [ "fa fa-", Spacebars.mustache(Spacebars.dot(view.lookup("."), "icon")) ];                              // 24
      }                                                                                                                // 25
    }), "\n						", HTML.SPAN(Blaze.View("lookup:..label", function() {                                                // 26
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));                                             // 27
    })), "\n						", HTML.I({                                                                                          // 28
      "class": "fa fa-angle-left pull-right"                                                                           // 29
    }), "\n					"), "\n					", HTML.UL({                                                                               // 30
      "class": "treeview-menu"                                                                                         // 31
    }, "\n						", HTML.LI({                                                                                           // 32
      "class": function() {                                                                                            // 33
        return Spacebars.mustache(view.lookup("isActivePath"), view.lookup("newPath"));                                // 34
      }                                                                                                                // 35
    }, HTML.A({                                                                                                        // 36
      href: function() {                                                                                               // 37
        return Spacebars.mustache(view.lookup("newPath"));                                                             // 38
      }                                                                                                                // 39
    }, HTML.I({                                                                                                        // 40
      "class": "fa fa-angle-double-right"                                                                              // 41
    }), " New")), "\n						", HTML.LI({                                                                                // 42
      "class": function() {                                                                                            // 43
        return Spacebars.mustache(view.lookup("isActivePath"), view.lookup("viewPath"));                               // 44
      }                                                                                                                // 45
    }, HTML.A({                                                                                                        // 46
      href: function() {                                                                                               // 47
        return Spacebars.mustache(view.lookup("viewPath"));                                                            // 48
      }                                                                                                                // 49
    }, HTML.I({                                                                                                        // 50
      "class": "fa fa-angle-double-right"                                                                              // 51
    }), " View All")), "\n						", Blaze.Each(function() {                                                             // 52
      return Spacebars.call(view.lookup("admin_collection_items"));                                                    // 53
    }, function() {                                                                                                    // 54
      return [ "\n						", HTML.LI({                                                                                   // 55
        "class": function() {                                                                                          // 56
          return Spacebars.mustache(view.lookup("isActivePath"), view.lookup("url"));                                  // 57
        }                                                                                                              // 58
      }, HTML.A({                                                                                                      // 59
        href: function() {                                                                                             // 60
          return Spacebars.mustache(view.lookup("url"));                                                               // 61
        }                                                                                                              // 62
      }, HTML.I({                                                                                                      // 63
        "class": "fa fa-angle-double-right"                                                                            // 64
      }), " ", Blaze.View("lookup:title", function() {                                                                 // 65
        return Spacebars.mustache(view.lookup("title"));                                                               // 66
      }))), "\n						" ];                                                                                              // 67
    }), "\n					"), "\n				"), "\n				" ];                                                                             // 68
  }), "\n				", Blaze.Each(function() {                                                                                // 69
    return Spacebars.call(view.lookup("admin_sidebar_items"));                                                         // 70
  }, function() {                                                                                                      // 71
    return [ "\n					", Blaze.If(function() {                                                                          // 72
      return Spacebars.call(Spacebars.dot(view.lookup("options"), "urls"));                                            // 73
    }, function() {                                                                                                    // 74
      return [ "\n						", Spacebars.include(view.lookupTemplate("adminSidebarItemTree")), " -->\n					" ];            // 75
    }, function() {                                                                                                    // 76
      return [ "\n						", Spacebars.include(view.lookupTemplate("adminSidebarItem")), " -->\n					" ];                // 77
    }), "\n				" ];                                                                                                    // 78
  }), "\n			"), "\n		"), "\n	");                                                                                       // 79
}));                                                                                                                   // 80
                                                                                                                       // 81
Template.__checkName("adminSidebarItem");                                                                              // 82
Template["adminSidebarItem"] = new Template("Template.adminSidebarItem", (function() {                                 // 83
  var view = this;                                                                                                     // 84
  return HTML.LI({                                                                                                     // 85
    "class": function() {                                                                                              // 86
      return Spacebars.mustache(view.lookup("isActivePath"), view.lookup("url"));                                      // 87
    }                                                                                                                  // 88
  }, "\n		", HTML.A({                                                                                                  // 89
    href: function() {                                                                                                 // 90
      return Spacebars.mustache(view.lookup("url"));                                                                   // 91
    }                                                                                                                  // 92
  }, "\n			", Blaze.If(function() {                                                                                    // 93
    return Spacebars.call(Spacebars.dot(view.lookup("options"), "icon"));                                              // 94
  }, function() {                                                                                                      // 95
    return [ "\n			", HTML.I({                                                                                         // 96
      "class": function() {                                                                                            // 97
        return [ "fa fa-", Spacebars.mustache(Spacebars.dot(view.lookup("options"), "icon")) ];                        // 98
      }                                                                                                                // 99
    }), "\n			" ];                                                                                                     // 100
  }), "\n			", HTML.SPAN(Blaze.View("lookup:title", function() {                                                       // 101
    return Spacebars.mustache(view.lookup("title"));                                                                   // 102
  })), "\n		"), "\n	");                                                                                                // 103
}));                                                                                                                   // 104
                                                                                                                       // 105
Template.__checkName("adminSidebarItemTree");                                                                          // 106
Template["adminSidebarItemTree"] = new Template("Template.adminSidebarItemTree", (function() {                         // 107
  var view = this;                                                                                                     // 108
  return HTML.LI({                                                                                                     // 109
    "class": "treeview"                                                                                                // 110
  }, "\n		", HTML.A({                                                                                                  // 111
    href: "#"                                                                                                          // 112
  }, "\n			", Blaze.If(function() {                                                                                    // 113
    return Spacebars.call(Spacebars.dot(view.lookup("options"), "icon"));                                              // 114
  }, function() {                                                                                                      // 115
    return [ "\n			", HTML.I({                                                                                         // 116
      "class": function() {                                                                                            // 117
        return [ "fa fa-", Spacebars.mustache(Spacebars.dot(view.lookup("options"), "icon")) ];                        // 118
      }                                                                                                                // 119
    }), "\n			" ];                                                                                                     // 120
  }), "\n			", HTML.SPAN(Blaze.View("lookup:title", function() {                                                       // 121
    return Spacebars.mustache(view.lookup("title"));                                                                   // 122
  })), "\n			", HTML.Raw('<i class="fa fa-angle-left pull-right"></i>'), "\n		"), "\n		", HTML.UL({                    // 123
    "class": "treeview-menu"                                                                                           // 124
  }, "\n			", Blaze.Each(function() {                                                                                  // 125
    return Spacebars.call(Spacebars.dot(view.lookup("options"), "urls"));                                              // 126
  }, function() {                                                                                                      // 127
    return [ "\n			", HTML.LI({                                                                                        // 128
      "class": function() {                                                                                            // 129
        return Spacebars.mustache(view.lookup("isActivePath"), view.lookup("url"));                                    // 130
      }                                                                                                                // 131
    }, HTML.A({                                                                                                        // 132
      href: function() {                                                                                               // 133
        return Spacebars.mustache(view.lookup("url"));                                                                 // 134
      }                                                                                                                // 135
    }, HTML.I({                                                                                                        // 136
      "class": "fa fa-angle-double-right"                                                                              // 137
    }), Blaze.View("lookup:title", function() {                                                                        // 138
      return Spacebars.mustache(view.lookup("title"));                                                                 // 139
    }))), "\n			" ];                                                                                                   // 140
  }), "\n		"), "\n	");                                                                                                 // 141
}));                                                                                                                   // 142
                                                                                                                       // 143
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/html/template.admin_header.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("AdminHeader");                                                                                   // 2
Template["AdminHeader"] = new Template("Template.AdminHeader", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.HEADER({                                                                                                 // 5
    "class": "main-header"                                                                                             // 6
  }, "\n        ", HTML.A({                                                                                            // 7
    href: "/admin",                                                                                                    // 8
    "class": "logo"                                                                                                    // 9
  }, "\n            ", Blaze.If(function() {                                                                           // 10
    return Spacebars.call(Spacebars.dot(view.lookup("AdminConfig"), "name"));                                          // 11
  }, function() {                                                                                                      // 12
    return [ "\n            ", Blaze.View("lookup:AdminConfig.name", function() {                                      // 13
      return Spacebars.mustache(Spacebars.dot(view.lookup("AdminConfig"), "name"));                                    // 14
    }), "\n            " ];                                                                                            // 15
  }, function() {                                                                                                      // 16
    return "\n            Flow-DB-Admin\n            ";                                                                // 17
  }), "\n        "), "\n        ", HTML.NAV({                                                                          // 18
    "class": "navbar navbar-static-top",                                                                               // 19
    role: "navigation"                                                                                                 // 20
  }, "\n            ", HTML.Raw("<!-- Sidebar toggle button-->"), "\n            ", HTML.Raw('<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">\n                <span class="sr-only">Toggle navigation</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </a>'), "\n            ", HTML.DIV({
    "class": "navbar-custom-menu"                                                                                      // 22
  }, "\n                ", HTML.UL({                                                                                   // 23
    "class": "nav navbar-nav"                                                                                          // 24
  }, "\n                    ", HTML.LI("\n                        ", Blaze.If(function() {                             // 25
    return Spacebars.call(Spacebars.dot(view.lookup("AdminConfig"), "dashboard", "homeUrl"));                          // 26
  }, function() {                                                                                                      // 27
    return [ "\n                        ", HTML.A({                                                                    // 28
      href: function() {                                                                                               // 29
        return Spacebars.mustache(Spacebars.dot(view.lookup("AdminConfig"), "dashboard", "homeUrl"));                  // 30
      }                                                                                                                // 31
    }, "Home"), "\n                        " ];                                                                        // 32
  }, function() {                                                                                                      // 33
    return [ "\n                        ", HTML.A({                                                                    // 34
      href: "/"                                                                                                        // 35
    }, "Home"), "\n                        " ];                                                                        // 36
  }), "\n\n                    "), "\n                    ", HTML.LI({                                                 // 37
    "class": "dropdown"                                                                                                // 38
  }, "\n                        ", HTML.Raw('<a href="#" class="dropdown-toggle" data-toggle="dropdown">\n                            <span>Admin<i class="caret"></i></span>\n                        </a>'), "\n                        ", HTML.UL({
    "class": "dropdown-menu"                                                                                           // 40
  }, "\n                            ", HTML.LI({                                                                       // 41
    "class": ""                                                                                                        // 42
  }, "\n                            ", HTML.A({                                                                        // 43
    href: function() {                                                                                                 // 44
      return Spacebars.mustache(view.lookup("profilepath"));                                                           // 45
    }                                                                                                                  // 46
  }, "\n                                Your profile\n                                "), "\n                            "), "\n                            ", HTML.Raw('<li class="">\n                                <a href="#" class="btn-sign-out">Sign out\n                                </a>\n                            </li>'), "\n                        "), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    ");
}));                                                                                                                   // 48
                                                                                                                       // 49
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/js/admin_layout.js                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
BlazeLayout.setRoot('body');                                                                                           // 1
Template.fAdminLayout.created = function () {                                                                          // 2
  var self = this;                                                                                                     // 3
                                                                                                                       // 4
  self.minHeight = new ReactiveVar(                                                                                    // 5
    $(window).height() - $('.main-header').height());                                                                  // 6
                                                                                                                       // 7
  $(window).resize(function () {                                                                                       // 8
    self.minHeight.set($(window).height() - $('.main-header').height());                                               // 9
  });                                                                                                                  // 10
                                                                                                                       // 11
  $('body').addClass('fixed');                                                                                         // 12
};                                                                                                                     // 13
                                                                                                                       // 14
Template.fAdminLayout.helpers({                                                                                        // 15
  minHeight: function () {                                                                                             // 16
    return Template.instance().minHeight.get() + 'px'                                                                  // 17
  }                                                                                                                    // 18
});                                                                                                                    // 19
                                                                                                                       // 20
                                                                                                                       // 21
dataTableOptions = {                                                                                                   // 22
    "aaSorting": [],                                                                                                   // 23
    "bPaginate": true,                                                                                                 // 24
    "bLengthChange": false,                                                                                            // 25
    "bFilter": true,                                                                                                   // 26
    "bSort": true,                                                                                                     // 27
    "bInfo": true,                                                                                                     // 28
    "bAutoWidth": false                                                                                                // 29
};                                                                                                                     // 30
                                                                                                                       // 31
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/js/helpers.coffee.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var adminCollections;                                                                                                  // 1
                                                                                                                       //
Template.registerHelper('AdminTables', AdminTables);                                                                   // 1
                                                                                                                       //
adminCollections = function() {                                                                                        // 1
  var collections;                                                                                                     // 4
  collections = {};                                                                                                    // 4
  if (typeof AdminConfig !== 'undefined' && typeof AdminConfig.collections === 'object') {                             // 6
    collections = AdminConfig.collections;                                                                             // 7
  }                                                                                                                    //
  collections.Users = {                                                                                                // 4
    collectionObject: Meteor.users,                                                                                    // 10
    icon: 'user',                                                                                                      // 10
    label: 'Users'                                                                                                     // 10
  };                                                                                                                   //
  return _.map(collections, function(obj, key) {                                                                       //
    obj = _.extend(obj, {                                                                                              // 15
      name: key                                                                                                        // 15
    });                                                                                                                //
    obj = _.defaults(obj, {                                                                                            // 15
      label: key,                                                                                                      // 16
      icon: 'plus',                                                                                                    // 16
      color: 'blue'                                                                                                    // 16
    });                                                                                                                //
    return obj = _.extend(obj, {                                                                                       //
      viewPath: FlowRouter.path("/admin/view/:coll", {                                                                 // 18
        coll: key                                                                                                      // 18
      }),                                                                                                              //
      newPath: FlowRouter.path("/admin/new/:coll", {                                                                   // 18
        coll: key                                                                                                      // 19
      })                                                                                                               //
    });                                                                                                                //
  });                                                                                                                  //
};                                                                                                                     // 3
                                                                                                                       //
Template.registerHelper('AdminConfig', function() {                                                                    // 1
  if (typeof AdminConfig !== 'undefined') {                                                                            // 22
    return AdminConfig;                                                                                                //
  }                                                                                                                    //
});                                                                                                                    // 21
                                                                                                                       //
Template.registerHelper('admin_skin', function() {                                                                     // 1
  return (typeof AdminConfig !== "undefined" && AdminConfig !== null ? AdminConfig.skin : void 0) || 'black-light';    //
});                                                                                                                    // 24
                                                                                                                       //
Template.registerHelper('admin_collections', adminCollections);                                                        // 1
                                                                                                                       //
Template.registerHelper('admin_collection_name', function() {                                                          // 1
  return Session.get('admin_collection_name');                                                                         //
});                                                                                                                    // 29
                                                                                                                       //
Template.registerHelper('admin_current_id', function() {                                                               // 1
  return Session.get('admin_id');                                                                                      //
});                                                                                                                    // 32
                                                                                                                       //
Template.registerHelper('admin_current_doc', function() {                                                              // 1
  return Session.get('admin_doc');                                                                                     //
});                                                                                                                    // 35
                                                                                                                       //
Template.registerHelper('admin_is_users_collection', function() {                                                      // 1
  return Session.get('admin_collection_name') === 'Users';                                                             //
});                                                                                                                    // 38
                                                                                                                       //
Template.registerHelper('admin_sidebar_items', function() {                                                            // 1
  return AdminDashboard.sidebarItems;                                                                                  //
});                                                                                                                    // 41
                                                                                                                       //
Template.registerHelper('admin_collection_items', function() {                                                         // 1
  var items;                                                                                                           // 45
  items = [];                                                                                                          // 45
  _.each(AdminDashboard.collectionItems, (function(_this) {                                                            // 45
    return function(fn) {                                                                                              //
      var item;                                                                                                        // 47
      item = fn(_this.name, '/admin/' + _this.name);                                                                   // 47
      if ((item != null ? item.title : void 0) && (item != null ? item.url : void 0)) {                                // 48
        return items.push(item);                                                                                       //
      }                                                                                                                //
    };                                                                                                                 //
  })(this));                                                                                                           //
  return items;                                                                                                        //
});                                                                                                                    // 44
                                                                                                                       //
Template.registerHelper('admin_omit_fields', function() {                                                              // 1
  var collection, global;                                                                                              // 53
  if (typeof AdminConfig.autoForm !== 'undefined' && typeof AdminConfig.autoForm.omitFields === 'object') {            // 53
    global = AdminConfig.autoForm.omitFields;                                                                          // 54
  }                                                                                                                    //
  if (!Session.equals('admin_collection_name', 'Users') && typeof AdminConfig !== 'undefined' && typeof AdminConfig.collections[Session.get('admin_collection_name')].omitFields === 'object') {
    collection = AdminConfig.collections[Session.get('admin_collection_name')].omitFields;                             // 56
  }                                                                                                                    //
  if (typeof global === 'object' && typeof collection === 'object') {                                                  // 57
    return _.union(global, collection);                                                                                //
  } else if (typeof global === 'object') {                                                                             //
    return global;                                                                                                     //
  } else if (typeof collection === 'object') {                                                                         //
    return collection;                                                                                                 //
  }                                                                                                                    //
});                                                                                                                    // 52
                                                                                                                       //
Template.registerHelper('AdminSchemas', function() {                                                                   // 1
  return AdminDashboard.schemas;                                                                                       //
});                                                                                                                    // 64
                                                                                                                       //
Template.registerHelper('adminGetUsers', function() {                                                                  // 1
  return Meteor.users;                                                                                                 //
});                                                                                                                    // 70
                                                                                                                       //
Template.registerHelper('adminGetUserSchema', function() {                                                             // 1
  var schema;                                                                                                          // 74
  if (_.has(AdminConfig, 'userSchema')) {                                                                              // 74
    schema = AdminConfig.userSchema;                                                                                   // 75
  } else if (typeof Meteor.users._c2 === 'object') {                                                                   //
    schema = Meteor.users.simpleSchema();                                                                              // 77
  }                                                                                                                    //
  return schema;                                                                                                       // 79
});                                                                                                                    // 73
                                                                                                                       //
Template.registerHelper('adminCollectionLabel', function(collection) {                                                 // 1
  if (collection != null) {                                                                                            // 82
    return AdminDashboard.collectionLabel(collection);                                                                 //
  }                                                                                                                    //
});                                                                                                                    // 81
                                                                                                                       //
Template.registerHelper('adminCollectionCount', function(collection) {                                                 // 1
  var ref;                                                                                                             // 85
  if (collection === 'Users') {                                                                                        // 85
    return Meteor.users.find().count();                                                                                //
  } else {                                                                                                             //
    return (ref = AdminCollectionsCount.findOne({                                                                      //
      collection: collection                                                                                           //
    })) != null ? ref.count : void 0;                                                                                  //
  }                                                                                                                    //
});                                                                                                                    // 84
                                                                                                                       //
Template.registerHelper('adminTemplate', function(collection, mode) {                                                  // 1
  var ref, ref1;                                                                                                       // 91
  if ((collection != null ? collection.toLowerCase() : void 0) !== 'users' && typeof (typeof AdminConfig !== "undefined" && AdminConfig !== null ? (ref = AdminConfig.collections) != null ? (ref1 = ref[collection]) != null ? ref1.templates : void 0 : void 0 : void 0) !== 'undefined') {
    return AdminConfig.collections[collection].templates[mode];                                                        //
  }                                                                                                                    //
});                                                                                                                    // 90
                                                                                                                       //
Template.registerHelper('adminGetCollection', function(collection) {                                                   // 1
  return _.find(adminCollections(), function(item) {                                                                   //
    return item.name === collection;                                                                                   //
  });                                                                                                                  //
});                                                                                                                    // 94
                                                                                                                       //
Template.registerHelper('adminWidgets', function() {                                                                   // 1
  if (typeof AdminConfig.dashboard !== 'undefined' && typeof AdminConfig.dashboard.widgets !== 'undefined') {          // 98
    return AdminConfig.dashboard.widgets;                                                                              //
  }                                                                                                                    //
});                                                                                                                    // 97
                                                                                                                       //
Template.registerHelper('adminViewPath', function(collection) {                                                        // 1
  return FlowRouter.path("/admin/view/:coll", {                                                                        //
    coll: collection                                                                                                   // 110
  });                                                                                                                  //
});                                                                                                                    // 109
                                                                                                                       //
Template.registerHelper('adminNewPath', function(collection) {                                                         // 1
  return FlowRouter.path("/admin/new/:coll", {                                                                         //
    coll: collection                                                                                                   // 113
  });                                                                                                                  //
});                                                                                                                    // 112
                                                                                                                       //
Template.registerHelper('AdminDashboardPath', function() {                                                             // 1
  return FlowRouter.path('AdminDashboard');                                                                            //
});                                                                                                                    // 115
                                                                                                                       //
Template.registerHelper('isSubReady', function(sub) {                                                                  // 1
  if (sub) {                                                                                                           // 119
    return FlowRouter.subsReady(sub);                                                                                  //
  } else {                                                                                                             //
    return FlowRouter.subsReady();                                                                                     //
  }                                                                                                                    //
});                                                                                                                    // 118
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/js/templates.coffee.js                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.AdminDashboardView.rendered = function() {                                                                    // 1
  var table;                                                                                                           // 2
  return table = this.$('.dataTable').DataTable();                                                                     //
};                                                                                                                     // 1
                                                                                                                       //
Template.AdminDashboardView.helpers({                                                                                  // 1
  hasDocuments: function() {                                                                                           // 5
    var ref;                                                                                                           // 6
    return ((ref = AdminCollectionsCount.findOne({                                                                     //
      collection: Session.get('admin_collection_name')                                                                 //
    })) != null ? ref.count : void 0) > 0;                                                                             //
  },                                                                                                                   //
  newPath: function() {                                                                                                // 5
    return FlowRouter.path("/admin/new/:coll", {                                                                       //
      coll: Session.get('admin_collection_name')                                                                       // 8
    });                                                                                                                //
  },                                                                                                                   //
  admin_table: function() {                                                                                            // 5
    return AdminTables[Session.get('admin_collection_name')];                                                          //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.adminUsersIsAdmin.helpers({                                                                                   // 1
  checkadmin: function() {                                                                                             // 12
    return Roles.userIsInRole(this._id, 'admin');                                                                      //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.adminUsersMailBtn.helpers({                                                                                   // 1
  adminUserEmail: function() {                                                                                         // 15
    var user;                                                                                                          // 16
    user = this;                                                                                                       // 16
    if (user && user.emails && user.emails[0] && user.emails[0].address) {                                             // 17
      return user.emails[0].address;                                                                                   //
    } else if (user && user.services && user.services.facebook && user.services.facebook.email) {                      //
      return user.services.facebook.email;                                                                             //
    } else if (user && user.services && user.services.google && user.services.google.email) {                          //
      return user.services.google.email;                                                                               //
    } else {                                                                                                           //
      return 'null@null.null';                                                                                         //
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.adminEditBtn.helpers({                                                                                        // 1
  path: function() {                                                                                                   // 25
    return FlowRouter.path('/admin/edit/:coll/:_id', {                                                                 //
      coll: Session.get('admin_collection_name'),                                                                      // 27
      _id: this._id                                                                                                    // 27
    });                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.adminDeleteBtn.helpers({                                                                                      // 1
  path: function() {                                                                                                   // 30
    return FlowRouter.path('/admin/edit/:coll/:_id', {                                                                 //
      coll: Session.get('admin_collection_name'),                                                                      // 31
      _id: this._id                                                                                                    // 31
    }, {                                                                                                               //
      action: 'delete'                                                                                                 // 34
    });                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.AdminHeader.helpers({                                                                                         // 1
  profilepath: function() {                                                                                            // 37
    return FlowRouter.path('/admin/edit/:coll/:_id', {                                                                 //
      coll: 'Users',                                                                                                   // 38
      _id: Meteor.userId()                                                                                             // 38
    });                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.AdminDashboardEdit.rendered = function() {                                                                    // 1
  var editId, editcollectionName;                                                                                      // 42
  editcollectionName = FlowRouter.getParam('collectionName');                                                          // 42
  editId = FlowRouter.getParam('_id');                                                                                 // 42
  return Session.set('admin_doc', adminCollectionObject(editcollectionName).findOne({                                  //
    _id: editId                                                                                                        // 44
  }));                                                                                                                 //
};                                                                                                                     // 41
                                                                                                                       //
Template.AdminDashboardEdit.helpers({                                                                                  // 1
  fadmin_doc: function() {                                                                                             // 47
    var editId, editcollectionName;                                                                                    // 48
    editcollectionName = FlowRouter.getParam('collectionName');                                                        // 48
    editId = FlowRouter.getParam('_id');                                                                               // 48
    if (editcollectionName && editId) {                                                                                // 50
      return adminCollectionObject(editcollectionName).findOne({                                                       //
        _id: editId                                                                                                    // 50
      });                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  action: function() {                                                                                                 // 47
    return FlowRouter.getQueryParam('action');                                                                         //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.AdminDashboardUsersEdit.helpers({                                                                             // 1
  user: function() {                                                                                                   // 54
    return Meteor.users.find(FlowRouter.getParam('_id')).fetch();                                                      //
  },                                                                                                                   //
  action: function() {                                                                                                 // 54
    return FlowRouter.getQueryParam('action');                                                                         //
  },                                                                                                                   //
  roles: function() {                                                                                                  // 54
    return Roles.getRolesForUser(FlowRouter.getParam('_id'));                                                          //
  },                                                                                                                   //
  otherRoles: function() {                                                                                             // 54
    return _.difference(_.map(Meteor.roles.find().fetch(), function(role) {                                            //
      return role.name;                                                                                                //
    }), Roles.getRolesForUser(FlowRouter.getParam('_id')));                                                            //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/js/events.coffee.js                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.fAdminLayout.events({                                                                                         // 1
  'click .btn-delete': function(e, t) {                                                                                // 2
    var _id;                                                                                                           // 3
    _id = $(e.target).attr('doc');                                                                                     // 3
    if (Session.equals('admin_collection_name', 'Users')) {                                                            // 4
      Session.set('admin_id', _id);                                                                                    // 5
      return Session.set('admin_doc', Meteor.users.findOne(_id));                                                      //
    } else {                                                                                                           //
      Session.set('admin_id', parseID(_id));                                                                           // 8
      return Session.set('admin_doc', adminCollectionObject(Session.get('admin_collection_name')).findOne(parseID(_id)));
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.AdminDashboardUsersEdit.events({                                                                              // 1
  'click .btn-add-role': function(e, t) {                                                                              // 12
    console.log('adding user to role');                                                                                // 13
    return Meteor.call('adminAddUserToRole', $(e.target).attr('user'), $(e.target).attr('role'));                      //
  },                                                                                                                   //
  'click .btn-remove-role': function(e, t) {                                                                           // 12
    console.log('removing user from role');                                                                            // 16
    return Meteor.call('adminRemoveUserToRole', $(e.target).attr('user'), $(e.target).attr('role'));                   //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.AdminHeader.events({                                                                                          // 1
  'click .btn-sign-out': function() {                                                                                  // 20
    return Meteor.logout(function() {                                                                                  //
      return FlowRouter.go('/');                                                                                       //
    });                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
Template.adminDeleteWidget.events({                                                                                    // 1
  'click #confirm-delete': function() {                                                                                // 25
    var _id, collection;                                                                                               // 26
    collection = FlowRouter.getParam('collectionName');                                                                // 26
    _id = FlowRouter.getParam('_id');                                                                                  // 26
    return Meteor.call('adminRemoveDoc', collection, _id, function(e, r) {                                             //
      return FlowRouter.go('/admin/view/' + collection);                                                               //
    });                                                                                                                //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/js/slim_scroll.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)                                                                 // 1
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)                                    // 2
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.                                              // 3
 *                                                                                                                     // 4
 * Version: 1.3.0                                                                                                      // 5
 *                                                                                                                     // 6
 */                                                                                                                    // 7
(function(f){jQuery.fn.extend({slimScroll:function(h){var a=f.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:0.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:0.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},h);this.each(function(){function r(d){if(s){d=d||
window.event;var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);f(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&m(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function m(d,f,h){k=!1;var e=d,g=b.outerHeight()-c.outerHeight();f&&(e=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),e=Math.min(Math.max(e,0),g),e=0<d?Math.ceil(e):Math.floor(e),c.css({top:e+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
e=l*(b[0].scrollHeight-b.outerHeight());h&&(e=d,d=e/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),g),c.css({top:d+"px"}));b.scrollTop(e);b.trigger("slimscrolling",~~e);v();p()}function C(){window.addEventListener?(this.addEventListener("DOMMouseScroll",r,!1),this.addEventListener("mousewheel",r,!1),this.addEventListener("MozMousePixelScroll",r,!1)):document.attachEvent("onmousewheel",r)}function w(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),D);c.css({height:u+"px"});
var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function v(){w();clearTimeout(A);l==~~l?(k=a.allowPageScroll,B!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;B=l;u>=b.outerHeight()?k=!0:(c.stop(!0,!0).fadeIn("fast"),a.railVisible&&g.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(A=setTimeout(function(){a.disableFadeOut&&s||(x||y)||(c.fadeOut("slow"),g.fadeOut("slow"))},1E3))}var s,x,y,A,z,u,l,B,D=30,k=!1,b=f(this);if(b.parent().hasClass(a.wrapperClass)){var n=b.scrollTop(),
c=b.parent().find("."+a.barClass),g=b.parent().find("."+a.railClass);w();if(f.isPlainObject(h)){if("height"in h&&"auto"==h.height){b.parent().css("height","auto");b.css("height","auto");var q=b.parent().parent().height();b.parent().css("height",q);b.css("height",q)}if("scrollTo"in h)n=parseInt(a.scrollTo);else if("scrollBy"in h)n+=parseInt(a.scrollBy);else if("destroy"in h){c.remove();g.remove();b.unwrap();return}m(n,!1,!0)}}else{a.height="auto"==a.height?b.parent().height():a.height;n=f("<div></div>").addClass(a.wrapperClass).css({position:"relative",
overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var g=f("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=f("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?
"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),q="right"==a.position?{right:a.distance}:{left:a.distance};g.css(q);c.css(q);b.wrap(n);b.parent().append(c);b.parent().append(g);a.railDraggable&&c.bind("mousedown",function(a){var b=f(document);y=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);m(0,c.position().top,!1)});
b.bind("mouseup.slimscroll",function(a){y=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();a.preventDefault();return!1});g.hover(function(){v()},function(){p()});c.hover(function(){x=!0},function(){x=!1});b.hover(function(){s=!0;v();p()},function(){s=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(z=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&
(m((z-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),z=b.originalEvent.touches[0].pageY)});w();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),m(0,!0)):"top"!==a.start&&(m(f(a.start).position().top,null,!0),a.alwaysVisible||c.hide());C()}});return this}});jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll})})(jQuery);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/client/js/autoForm.coffee.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
AutoForm.addHooks(['admin_insert', 'admin_update', 'adminNewUser', 'adminUpdateUser', 'adminSendResetPasswordEmail', 'adminChangePassword'], {
  beginSubmit: function() {                                                                                            // 9
    return $('.btn-primary').addClass('disabled');                                                                     //
  },                                                                                                                   //
  endSubmit: function() {                                                                                              // 9
    return $('.btn-primary').removeClass('disabled');                                                                  //
  },                                                                                                                   //
  onError: function(formType, error) {                                                                                 // 9
    return AdminDashboard.alertFailure(error.message);                                                                 //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
AutoForm.hooks({                                                                                                       // 2
  admin_insert: {                                                                                                      // 17
    onSubmit: function(insertDoc, updateDoc, currentDoc) {                                                             // 18
      var hook;                                                                                                        // 19
      hook = this;                                                                                                     // 19
      Meteor.call('adminInsertDoc', insertDoc, Session.get('admin_collection_name'), function(e, r) {                  // 19
        if (e) {                                                                                                       // 21
          return hook.done(e);                                                                                         //
        } else {                                                                                                       //
          return adminCallback('onInsert', [Session.get('admin_collection_name', insertDoc, updateDoc, currentDoc)], function(collection) {
            return hook.done(null, collection);                                                                        //
          });                                                                                                          //
        }                                                                                                              //
      });                                                                                                              //
      return false;                                                                                                    // 26
    },                                                                                                                 //
    onSuccess: function(formType, collection) {                                                                        // 18
      AdminDashboard.alertSuccess('Successfully created');                                                             // 28
      return FlowRouter.go("/admin/view/" + collection);                                                               //
    }                                                                                                                  //
  },                                                                                                                   //
  admin_update: {                                                                                                      // 17
    onSubmit: function(insertDoc, updateDoc, currentDoc) {                                                             // 32
      var hook;                                                                                                        // 33
      hook = this;                                                                                                     // 33
      Meteor.call('adminUpdateDoc', updateDoc, Session.get('admin_collection_name'), this.docId, function(e, r) {      // 33
        if (e) {                                                                                                       // 35
          return hook.done(e);                                                                                         //
        } else {                                                                                                       //
          return adminCallback('onUpdate', [Session.get('admin_collection_name', insertDoc, updateDoc, currentDoc)], function(collection) {
            return hook.done(null, collection);                                                                        //
          });                                                                                                          //
        }                                                                                                              //
      });                                                                                                              //
      return false;                                                                                                    // 40
    },                                                                                                                 //
    onSuccess: function(formType, collection) {                                                                        // 32
      return AdminDashboard.alertSuccess('Successfully updated');                                                      //
    }                                                                                                                  //
  },                                                                                                                   //
  adminNewUser: {                                                                                                      // 17
    onSuccess: function(formType, result) {                                                                            // 45
      return AdminDashboard.alertSuccess('Created user');                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  adminUpdateUser: {                                                                                                   // 17
    onSubmit: function(insertDoc, updateDoc, currentDoc) {                                                             // 49
      Meteor.call('adminUpdateUser', updateDoc, Session.get('admin_id'), this.done);                                   // 50
      return false;                                                                                                    // 51
    },                                                                                                                 //
    onSuccess: function(formType, result) {                                                                            // 49
      return AdminDashboard.alertSuccess('Updated user');                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  adminSendResetPasswordEmail: {                                                                                       // 17
    onSuccess: function(formType, result) {                                                                            // 56
      return AdminDashboard.alertSuccess('Email sent');                                                                //
    }                                                                                                                  //
  },                                                                                                                   //
  adminChangePassword: {                                                                                               // 17
    onSuccess: function(operation, result, template) {                                                                 // 60
      return AdminDashboard.alertSuccess('Password reset');                                                            //
    }                                                                                                                  //
  }                                                                                                                    //
});                                                                                                                    //
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['sach:flow-db-admin'] = {}, {
  AdminDashboard: AdminDashboard
});

})();
