import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:21012',
  pathForType: function(type) {
    var org = this.get('store').peekRecord('organization', 'a1');
    var prefix = 'organizations/' + org.get('id') + '/';
    return prefix + Ember.String.underscore(type).pluralize();
  },
});
