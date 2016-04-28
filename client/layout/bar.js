Template.bar.events({
  'click .attention-mode' () {
    let oldValue = Session.get(ATTENTION_MODE) || false;
    Session.set(ATTENTION_MODE, !oldValue);

    Session.set(NAV_LOW, false);
    Session.set(EXAMPLE, false);

    let routePath = FlowRouter.current().path;
    Session.set(LAST_PATH, routePath);

    // reset mode if set to 'eingabe'
    if (Session.get(NAV_MODE_ENTER)) {
      setModeTrainer(NAV_MODE_READ);
    };

    // log
		Log.detail('bar');
  }
});
