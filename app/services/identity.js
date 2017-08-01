import Ember from 'ember';

export default Ember.Service.extend({
  apiToken: "",
  organizationId: "",

  present: Ember.computed('apiToken', function() {
    return this.get('apiToken') !== "" && this.get('organizationId') !== "";
  }),
});
