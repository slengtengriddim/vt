Template.vokabelDetail.onCreated(function() {
  let self = this;
  self.autorun(function() {
    let entryId = FlowRouter.getParam('id');
    self.subscribe('singleEntry', entryId);
  });
});

Template.vokabelDetail.helpers({
  entry() {
    let entryId = FlowRouter.getParam('id');
    let entry = Vocabulary.findOne({_id: entryId}) || {};
    return entry;
  }
});
