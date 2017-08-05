import Ember from 'ember';

export default Ember.Component.extend({
  identity: Ember.inject.service(),

  organiztionIdInput: "",
  apiTokenInput: "",

  actions: {
    submitLogin() {
      this.get('redirect')();
    }
  }
});
