Template.bar.events({
  'click .attention-mode' () {
    let oldValue = Session.get(ATTENTION_MODE) || false;
    Session.set(ATTENTION_MODE, !oldValue);

    let routePath = FlowRouter.current().path;
    Session.set(LAST_PATH, routePath);
  }
});
