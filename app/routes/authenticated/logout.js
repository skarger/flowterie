import Ember from 'ember';

export default Ember.Route.extend({
  identity: Ember.inject.service(),

  model() {
    this.set('identity.organizationId', '');
    this.set('identity.apiToken', '');
    this.transitionTo('login');
  }
});
