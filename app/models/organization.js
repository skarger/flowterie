import DS from 'ember-data';

export default DS.Model.extend({
  flowTemplates: DS.hasMany('flowTemplates'),

});
