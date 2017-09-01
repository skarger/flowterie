import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:5000',
  pathForType: function(type) {
    var org = this.get('store').peekRecord('organization', 'a1');
    var prefix = 'orgs/' + org.get('id') + '/content_flow/';
    return prefix + Ember.String.underscore(type).pluralize();
  },
});
