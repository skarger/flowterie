import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    redirectHome: function() {
      this.transitionToRoute('index');
    }
  }
});
