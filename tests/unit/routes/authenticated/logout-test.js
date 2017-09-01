import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:authenticated.logout', 'Unit | Route | logout', {
  // Specify the other units that are required for this test.
  needs: ['service:identity', 'model:organization']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it clears identity', function(assert) {
  let route = this.subject();
  let identityService = route.get('identity');
  identityService.set('apiToken', 'Bjorn');
  identityService.set('organizationId', 'Borg');
  Ember.run(() => {
    route.get('store').pushPayload({
      data: [{
        id: 'Borg',
        type: 'organization',
      }]
    })
  });
  route.transitionTo = function() {};
  Ember.run(() =>  route.model());
  assert.equal(identityService.get('apiToken'), '');
  assert.equal(identityService.get('organizationId'), '');
});

test('it clears organization model', function(assert) {
  let route = this.subject();
  let identityService = route.get('identity');
  identityService.set('apiToken', 'Bjorn');
  identityService.set('organizationId', 'Borg');
  Ember.run(() => {
    route.get('store').pushPayload({
      data: [{
        id: 'Borg',
        type: 'organization',
      }]
    })
  });
  route.transitionTo = function() {};
  Ember.run(() =>  route.model());
  assert.equal(route.get('store').peekAll('organization').get('length'), 0);
});
