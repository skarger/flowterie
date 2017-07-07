import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    showFlow(flow) {
      alert(flow);
    }
  }
});
