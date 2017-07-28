import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:21012',
  pathForType: function(type) {
    return Ember.String.underscore(type).pluralize();
  }
});
