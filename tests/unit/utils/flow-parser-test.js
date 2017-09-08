import flowParser from 'flowterie/utils/flow-parser';
import { module, test } from 'qunit';

module('Unit | Utility | flow parser');

test('it parses an empty string into an empty flow', function(assert) {
  let result = flowParser('');
  assert.deepEqual(result, []);
});

test('it parses a basic task name', function(assert) {
  let result = flowParser('task');
  assert.deepEqual(result, ['task']);
});
