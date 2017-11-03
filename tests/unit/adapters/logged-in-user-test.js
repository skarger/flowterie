import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:logged-in-user', 'Unit | Adapter | logged in user', {
  // Specify the other units that are required for this test.
  needs: ['service:identity']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});
