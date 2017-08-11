import { moduleFor, test } from 'ember-qunit';

moduleFor('route:authenticated', 'Unit | Route | authenticated', {
  // Specify the other units that are required for this test.
  needs: ['service:identity', 'controller:login', 'route:login']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

test('it determines not identified from identity service', function(assert) {
  let route = this.subject();
  let identityService = route.get('identity');
  identityService.set('organizationId', '');
  identityService.set('apiToken', '');
  assert.equal(route.model()['identified'], false)
});

test('it determines identified from identity service', function(assert) {
  let route = this.subject();
  let identityService = route.get('identity');
  identityService.set('organizationId', 'abc');
  identityService.set('apiToken', 'def');
  assert.equal(route.model()['identified'], true)
});

test('does not redirect when identified', function(assert) {
  assert.expect(0);

  let route = this.subject();
  let identityService = route.get('identity');
  identityService.set('organizationId', 'abc');
  identityService.set('apiToken', 'def');
  route.model();
  route.transitionTo = function() {
    assert.notOk();
  };
  route.afterModel();
});

test('redirects when not identified', function(assert) {
  assert.expect(1);

  let route = this.subject();
  let identityService = route.get('identity');
  identityService.set('organizationId', '');
  identityService.set('apiToken', '');
  route.model();
  route.transitionTo = function(destination) {
    assert.equal(destination, 'login');
  };
  route.afterModel();
});

test('preserves desired route when not identified', function(assert) {
  assert.expect(1);

  let route = this.subject();
  let identityService = route.get('identity');
  identityService.set('organizationId', '');
  identityService.set('apiToken', '');
  route.transitionTo = function() {};

  let model = route.model();
  let transition = {test: 'test'};
  route.afterModel(model, transition);

  assert.equal(route.controllerFor('login').get('previousTransition'), transition);
});
