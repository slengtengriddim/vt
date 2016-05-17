Template.navOrderTrainer.events({
  'click .btn-order' () {
    let oldValue = Session.get(NAV_ORDER_RANDOM) || false;
    Session.set(NAV_ORDER_RANDOM, !oldValue);
    // log
		Log.detail();
  }
});
