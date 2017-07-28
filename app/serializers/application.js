import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) { // eslint-disable-line no-unused-vars
    payload.data.forEach(function(obj) {
      obj.attributes = {};
      for(var key in obj) {
        if (key !== "id" && key !== "type" && key !== "attributes" && key !== "relationships") {
          obj.attributes[key] = obj[key];
          delete obj[key];
        }
      }
    });

    return this._super(...arguments);
  },
  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  }
});
