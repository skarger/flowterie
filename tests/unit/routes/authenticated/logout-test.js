import { moduleFor, test } from 'ember-qunit';

moduleFor('route:authenticated.logout', 'Unit | Route | logout', {
  // Specify the other units that are required for this test.
  needs: ['service:identity']
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
  route.transitionTo = function() {};
  route.model();
  assert.equal(identityService.get('apiToken'), '');
  assert.equal(identityService.get('organizationId'), '');
});
