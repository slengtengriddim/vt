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
var Roles = Package['alanning:roles'].Roles;
var Helpers = Package['raix:handlebar-helpers'].Helpers;
var moment = Package['momentjs:moment'].moment;
var Tabular = Package['aldeed:tabular'].Tabular;
var check = Package.check.check;
var Match = Package.check.Match;
var Email = Package.email.Email;
var EmailInternals = Package.email.EmailInternals;
var Collection2 = Package['aldeed:collection2-core'].Collection2;
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var __coffeescriptShare, AdminDashboard;

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

var fadminRoutes = FlowRouter.group({
  name: "AdminController",
  prefix: '/admin',
  subscriptions: function() {
    this.register('fadminUsers', Meteor.subscribe('adminUsers'));
    this.register('fadminUser', Meteor.subscribe('adminUser'));
    this.register('fadminCollectionsCount', Meteor.subscribe('adminCollectionsCount'));
  },
 triggersEnter: [
  	function(context) {
  		if(!Roles.userIsInRole (Meteor.userId(),['admin']))
  		{
  			Meteor.call('adminCheckAdmin');
  			//if (typeof AdminConfig.nonAdminRedirectRoute == 'string')
  			//	FlowRouter.go(AdminController.nonAdminRedirectRoute);
  		}
  	},
    function(context) {
      Session.set('adminSuccess', null);
      Session.set('adminError', null);
      Session.set('admin_title', null);
      Session.set('admin_subtitle', null);
      Session.set('admin_collection_name', null);
      Session.set('admin_collection_page', null);
      Session.set('admin_id',null);
      Session.set('admin_doc', null);
    }
  ]
});

fadminRoutes.route('/',{
	name: 'adminDashboard',
	triggersEnter: [
	 function(context){
	 	Session.set('admin_title',"Dashboard");
	 	Session.set('admin_collection_name',"");
	 	Session.set('admin_collection_page',"");
	 }
	],
	action: function ()
	{
		BlazeLayout.render('fAdminLayout', {main: 'AdminDashboard'});
	}
});


fadminRoutes.route('/view/:collectionName',{
	triggersEnter: [
		function(context){
		Session.set('admin_title', context.params.collectionName);
		Session.set('admin_subtitle', 'View');
		Session.set('admin_collection_page', 'view');
		Session.set('admin_collection_name', context.params.collectionName);
	}],
	triggersExit: [
		function(context){
			BlazeLayout.render('fAdminLayout',{main: 'AdminLoading'});
		}
	],
	action: function(params)
	{
		BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardView'});
	}
});

fadminRoutes.route('/new/:collectionName',{
	triggersEnter: [function(context){
		Session.set('admin_title', context.params.collectionName);
		Session.set('admin_subtitle', 'Create New');
		Session.set('admin_collection_page', 'new');
		Session.set('admin_collection_name', context.params.collectionName);
	}],
	triggersExit: [
		function(context){
			BlazeLayout.render('fAdminLayout',{main: 'AdminLoading'});
		}
	],
	action: function(params)
	{	if(params.collectionName == 'Users')
			BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardUsersNew'});
		else
			BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardNew'});
	}
});

fadminRoutes.route('/edit/:collectionName/:_id',{
	triggersEnter: [function(context){
		Session.set('admin_title', context.params.collectionName);
		Session.set('admin_subtitle', 'Edit');
		Session.set('admin_collection_page', 'edit');
		Session.set('admin_collection_name', context.params.collectionName);
		if (context.params.collectionName == 'Users')
			Session.set('admin_id', context.params._id);
		else
			Session.set('admin_id', null);

	}],
	triggersExit: [
		function(context){
			BlazeLayout.render('fAdminLayout',{main: 'AdminLoading'});
			Session.set('admin_id',null);
		}
	],
	subscriptions : function(params){
		if (params.collectionName !== 'Users')
		this.register('admindoc2edit', Meteor.subscribe('adminCollectionDoc', params.collectionName, parseID(params._id)));
	},
	action: function(params)
	{
		if(params.collectionName == 'Users')
			BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardUsersEdit'});
		else
			BlazeLayout.render('fAdminLayout',{main: 'AdminDashboardEdit'});
	}
});

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
// packages/sach_flow-db-admin/lib/server/publish.coffee.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.publishComposite('adminCollectionDoc', function(collection, id) {                                               // 1
  var ref, ref1;                                                                                                       // 2
  check(collection, String);                                                                                           // 2
  check(id, Match.OneOf(String, Mongo.ObjectID));                                                                      // 2
  if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                    // 4
    return {                                                                                                           //
      find: function() {                                                                                               // 5
        return adminCollectionObject(collection).find(id);                                                             //
      },                                                                                                               //
      children: (typeof AdminConfig !== "undefined" && AdminConfig !== null ? (ref = AdminConfig.collections) != null ? (ref1 = ref[collection]) != null ? ref1.children : void 0 : void 0 : void 0) || []
    };                                                                                                                 //
  } else {                                                                                                             //
    return this.ready();                                                                                               //
  }                                                                                                                    //
});                                                                                                                    // 1
                                                                                                                       //
Meteor.publish('adminUsers', function() {                                                                              // 1
  if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                    // 12
    return Meteor.users.find();                                                                                        //
  } else {                                                                                                             //
    return this.ready();                                                                                               //
  }                                                                                                                    //
});                                                                                                                    // 11
                                                                                                                       //
Meteor.publish('adminUser', function() {                                                                               // 1
  return Meteor.users.find(this.userId);                                                                               //
});                                                                                                                    // 17
                                                                                                                       //
Meteor.publish('adminCollectionsCount', function() {                                                                   // 1
  var handles, self;                                                                                                   // 21
  handles = [];                                                                                                        // 21
  self = this;                                                                                                         // 21
  _.each(AdminTables, function(table, name) {                                                                          // 21
    var count, id, ready;                                                                                              // 25
    id = new Mongo.ObjectID;                                                                                           // 25
    count = 0;                                                                                                         // 25
    ready = false;                                                                                                     // 25
    handles.push(table.collection.find().observeChanges({                                                              // 25
      added: function() {                                                                                              // 30
        count += 1;                                                                                                    // 31
        return ready && self.changed('adminCollectionsCount', id, {                                                    //
          count: count                                                                                                 // 32
        });                                                                                                            //
      },                                                                                                               //
      removed: function() {                                                                                            // 30
        count -= 1;                                                                                                    // 34
        return ready && self.changed('adminCollectionsCount', id, {                                                    //
          count: count                                                                                                 // 35
        });                                                                                                            //
      }                                                                                                                //
    }));                                                                                                               //
    ready = true;                                                                                                      // 25
    return self.added('adminCollectionsCount', id, {                                                                   //
      collection: name,                                                                                                // 38
      count: count                                                                                                     // 38
    });                                                                                                                //
  });                                                                                                                  //
  self.onStop(function() {                                                                                             // 21
    return _.each(handles, function(handle) {                                                                          //
      return handle.stop();                                                                                            //
    });                                                                                                                //
  });                                                                                                                  //
  return self.ready();                                                                                                 //
});                                                                                                                    // 20
                                                                                                                       //
Meteor.publish(null, function() {                                                                                      // 1
  return Meteor.roles.find({});                                                                                        //
});                                                                                                                    // 44
                                                                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/sach_flow-db-admin/lib/server/methods.coffee.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.methods({                                                                                                       // 1
  adminInsertDoc: function(doc, collection) {                                                                          // 2
    var Future, fut;                                                                                                   // 3
    check(arguments, [Match.Any]);                                                                                     // 3
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 4
      Future = Npm.require('fibers/future');                                                                           // 5
      fut = new Future();                                                                                              // 5
      adminCollectionObject(collection).insert(doc, function(e, _id) {                                                 // 5
        return fut['return']({                                                                                         //
          e: e,                                                                                                        // 9
          _id: _id                                                                                                     // 9
        });                                                                                                            //
      });                                                                                                              //
      return fut.wait();                                                                                               // 10
    }                                                                                                                  //
  },                                                                                                                   //
  adminUpdateDoc: function(modifier, collection, _id) {                                                                // 2
    var Future, fut;                                                                                                   // 13
    check(arguments, [Match.Any]);                                                                                     // 13
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 14
      Future = Npm.require('fibers/future');                                                                           // 15
      fut = new Future();                                                                                              // 15
      adminCollectionObject(collection).update({                                                                       // 15
        _id: _id                                                                                                       // 17
      }, modifier, function(e, r) {                                                                                    //
        return fut['return']({                                                                                         //
          e: e,                                                                                                        // 18
          r: r                                                                                                         // 18
        });                                                                                                            //
      });                                                                                                              //
      return fut.wait();                                                                                               // 19
    }                                                                                                                  //
  },                                                                                                                   //
  adminRemoveDoc: function(collection, _id) {                                                                          // 2
    check(arguments, [Match.Any]);                                                                                     // 22
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 23
      if (collection === 'Users') {                                                                                    // 24
        return Meteor.users.remove({                                                                                   //
          _id: _id                                                                                                     // 25
        });                                                                                                            //
      } else {                                                                                                         //
        return adminCollectionObject(collection).remove({                                                              //
          _id: _id                                                                                                     // 28
        });                                                                                                            //
      }                                                                                                                //
    }                                                                                                                  //
  },                                                                                                                   //
  adminNewUser: function(doc) {                                                                                        // 2
    var emails;                                                                                                        // 32
    check(arguments, [Match.Any]);                                                                                     // 32
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 33
      emails = doc.email.split(',');                                                                                   // 34
      return _.each(emails, function(email) {                                                                          //
        var _id, user;                                                                                                 // 36
        user = {};                                                                                                     // 36
        user.email = email;                                                                                            // 36
        if (!doc.chooseOwnPassword) {                                                                                  // 38
          user.password = doc.password;                                                                                // 39
        }                                                                                                              //
        _id = Accounts.createUser(user);                                                                               // 36
        if (doc.sendPassword && (AdminConfig.fromEmail != null)) {                                                     // 43
          Email.send({                                                                                                 // 44
            to: user.email,                                                                                            // 45
            from: AdminConfig.fromEmail,                                                                               // 45
            subject: 'Your account has been created',                                                                  // 45
            html: 'You\'ve just had an account created for ' + Meteor.absoluteUrl() + ' with password ' + doc.password
          });                                                                                                          //
        }                                                                                                              //
        if (!doc.sendPassword) {                                                                                       // 50
          return Accounts.sendEnrollmentEmail(_id);                                                                    //
        }                                                                                                              //
      });                                                                                                              //
    }                                                                                                                  //
  },                                                                                                                   //
  adminUpdateUser: function(modifier, _id) {                                                                           // 2
    var Future, fut;                                                                                                   // 54
    check(arguments, [Match.Any]);                                                                                     // 54
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 55
      Future = Npm.require('fibers/future');                                                                           // 56
      fut = new Future();                                                                                              // 56
      Meteor.users.update({                                                                                            // 56
        _id: _id                                                                                                       // 58
      }, modifier, function(e, r) {                                                                                    //
        return fut['return']({                                                                                         //
          e: e,                                                                                                        // 59
          r: r                                                                                                         // 59
        });                                                                                                            //
      });                                                                                                              //
      return fut.wait();                                                                                               // 60
    }                                                                                                                  //
  },                                                                                                                   //
  adminSendResetPasswordEmail: function(doc) {                                                                         // 2
    check(arguments, [Match.Any]);                                                                                     // 63
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 64
      console.log('Changing password for user ' + doc._id);                                                            // 65
      return Accounts.sendResetPasswordEmail(doc._id);                                                                 //
    }                                                                                                                  //
  },                                                                                                                   //
  adminChangePassword: function(doc) {                                                                                 // 2
    check(arguments, [Match.Any]);                                                                                     // 69
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 70
      console.log('Changing password for user ' + doc._id);                                                            // 71
      Accounts.setPassword(doc._id, doc.password);                                                                     // 71
      return {                                                                                                         //
        label: 'Email user their new password'                                                                         // 73
      };                                                                                                               //
    }                                                                                                                  //
  },                                                                                                                   //
  adminCheckAdmin: function() {                                                                                        // 2
    var adminEmails, email, user;                                                                                      // 76
    check(arguments, [Match.Any]);                                                                                     // 76
    user = Meteor.users.findOne({                                                                                      // 76
      _id: this.userId                                                                                                 // 77
    });                                                                                                                //
    if (this.userId && !Roles.userIsInRole(this.userId, ['admin']) && (user.emails.length > 0)) {                      // 78
      email = user.emails[0].address;                                                                                  // 79
      if (typeof Meteor.settings.adminEmails !== 'undefined') {                                                        // 80
        adminEmails = Meteor.settings.adminEmails;                                                                     // 81
        if (adminEmails.indexOf(email) > -1) {                                                                         // 82
          console.log('Adding admin user: ' + email);                                                                  // 83
          return Roles.addUsersToRoles(this.userId, ['admin'], Roles.GLOBAL_GROUP);                                    //
        }                                                                                                              //
      } else if (typeof AdminConfig !== 'undefined' && typeof AdminConfig.adminEmails === 'object') {                  //
        adminEmails = AdminConfig.adminEmails;                                                                         // 86
        if (adminEmails.indexOf(email) > -1) {                                                                         // 87
          console.log('Adding admin user: ' + email);                                                                  // 88
          return Roles.addUsersToRoles(this.userId, ['admin'], Roles.GLOBAL_GROUP);                                    //
        }                                                                                                              //
      } else if (this.userId === Meteor.users.findOne({}, {                                                            //
        sort: {                                                                                                        // 90
          createdAt: 1                                                                                                 // 90
        }                                                                                                              //
      })._id) {                                                                                                        //
        console.log('Making first user admin: ' + email);                                                              // 91
        return Roles.addUsersToRoles(this.userId, ['admin']);                                                          //
      }                                                                                                                //
    }                                                                                                                  //
  },                                                                                                                   //
  adminAddUserToRole: function(_id, role) {                                                                            // 2
    check(arguments, [Match.Any]);                                                                                     // 95
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 96
      return Roles.addUsersToRoles(_id, role, Roles.GLOBAL_GROUP);                                                     //
    }                                                                                                                  //
  },                                                                                                                   //
  adminRemoveUserToRole: function(_id, role) {                                                                         // 2
    check(arguments, [Match.Any]);                                                                                     // 100
    if (Roles.userIsInRole(this.userId, ['admin'])) {                                                                  // 101
      return Roles.removeUsersFromRoles(_id, role, Roles.GLOBAL_GROUP);                                                //
    }                                                                                                                  //
  },                                                                                                                   //
  adminSetCollectionSort: function(collection, _sort) {                                                                // 2
    check(arguments, [Match.Any]);                                                                                     // 105
    return global.AdminPages[collection].set({                                                                         //
      sort: _sort                                                                                                      // 107
    });                                                                                                                //
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

//# sourceMappingURL=sach_flow-db-admin.js.map
