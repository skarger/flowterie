import Ember from 'ember';

export default Ember.Route.extend({
  identity: Ember.inject.service(),

  //beforeModel(transition) {
  //  if (!this.get('identity').get('present')) {
  //    let loginController = this.controllerFor('login');
  //    loginController.set('previousTransition', transition);
  //    this.transitionTo('login');
  //  }
  //},

  model() {
    return {
      flow_template: {
        template_name: "",
      },
      task_configurations: [
      ]
    }
  }
});
