import Ember from 'ember';

export default Ember.Route.extend({
  identity: Ember.inject.service(),

  model() {
    return {
      identified: this.get('identity').get('present')
    };
  },

  afterModel(model, transition) {
    if (!this.get('identity').get('present')) {
      let loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});
