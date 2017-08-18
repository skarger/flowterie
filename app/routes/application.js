import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.get('store').pushPayload({
      data: [{
        id: 'a1',
        type: 'organization',
        name: 'Org A1',
      }]
    });

  }
});
