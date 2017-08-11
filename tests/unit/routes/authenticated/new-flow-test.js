import { moduleFor, test } from 'ember-qunit';

moduleFor('route:authenticated.new-flow', 'Unit | Route | new flow', {
  // Specify the other units that are required for this test.
  needs: ['service:identity']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
