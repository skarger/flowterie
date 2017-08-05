import Ember from 'ember';

export default Ember.Component.extend({
  identity: Ember.inject.service(),

  organiztionIdInput: "",
  apiTokenInput: "",

  actions: {
    submitLogin() {
      this.get('identity').set('organizationId', this.get('organizationIdInput'));
      this.get('identity').set('apiToken', this.get('apiTokenInput'));
      this.get('redirect')();
    }
  }
});
