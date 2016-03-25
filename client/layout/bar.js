ATTENTION_MODE = 'attentionMode';
Session.setDefault(ATTENTION_MODE, false);

LAST_PATH = 'lastPath';
Session.setDefault(LAST_PATH, '/');

Template.bar.events({
  'click .attention-mode': function() {
    var oldValue = Session.get(ATTENTION_MODE) || false;
    Session.set(ATTENTION_MODE, !oldValue);

    var routePath = FlowRouter.current().path;
    Session.set(LAST_PATH, routePath);
  }
});
