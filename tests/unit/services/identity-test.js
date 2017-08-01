import { moduleFor, test } from 'ember-qunit';

moduleFor('service:identity', 'Unit | Service | identity', {
  // Specify the other units that are required for this test.
  //needs: ['service:foo']
});

test('it defaults apiToken and organiztionId to empty strings', function(assert) {
  let service = this.subject();
  assert.equal(service.get('apiToken'), '');
  assert.equal(service.get('organizationId'), '');
});

test('it defaults present to false', function(assert) {
  let service = this.subject();
  assert.equal(service.get('present'), false);
});

test('it allows setting apiToken and organizationId', function(assert) {
  let service = this.subject();
  service.set('apiToken', 'token');
  service.set('organizationId', 's-org-id');

  assert.equal(service.get('apiToken'), 'token');
  assert.equal(service.get('organizationId'), 's-org-id');
});

test('it computes whether identity is present', function(assert) {
  let service = this.subject();

  service.set('apiToken', 'abc');
  assert.equal(service.get('present'), false);

  service.set('apiToken', '');
  service.set('organizationId', 's-123');
  assert.equal(service.get('present'), false);

  service.set('apiToken', 'abc');
  assert.equal(service.get('present'), true);
});
