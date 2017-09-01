import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  identity: Ember.inject.service(),
  namespace: 'api',
  host: 'http://localhost:4200',
  headers: Ember.computed('identity.apiToken', function() {
    return {
      'Authorization': 'Bearer ' + this.get('identity.apiToken')
    };
  }),
  pathForType: function(type) {
    var prefix = 'orgs/' + this.get('identity').get('organizationId') + '/content_flow/';
    return prefix + Ember.String.underscore(type).pluralize();
  },
});
