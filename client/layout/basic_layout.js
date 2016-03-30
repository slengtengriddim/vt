// {{getSession "posX"}}
Template.registerHelper("getSession",function(key){
  return Session.get(key);
});
Template.registerHelper("userMail", function() {
  return Meteor.user().emails[0].address;
});

Template.basicLayout.helpers({
  isOwner() {
    return this.userId == Meteor.userId();
  }
});
