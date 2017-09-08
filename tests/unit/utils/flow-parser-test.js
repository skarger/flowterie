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

test('it parses a task ID with numbers, underscores, and hyphens', function(assert) {
  let result = flowParser('task1');
  assert.deepEqual(result, ['task1']);
});

test('it parses a task ID with underscores, hyphens', function(assert) {
  let result = flowParser('dog-tested_cat-approved');
  assert.deepEqual(result, ['dog-tested_cat-approved']);
});

test('it parses a task ID with colons', function(assert) {
  let result = flowParser('code:red');
  assert.deepEqual(result, ['code:red']);
});

test('it parses a task ID with capital letters', function(assert) {
  let result = flowParser('MyTask');
  assert.deepEqual(result, ['MyTask']);
});

test('it parses a quoted task label', function(assert) {
  let resultDouble = flowParser('"task"');
  assert.deepEqual(resultDouble, ['task']);

  let resultSingle = flowParser("'task'");
  assert.deepEqual(resultSingle, ['task']);
});

test('it parses a quoted task label with spaces', function(assert) {
  let result = flowParser('"Task 0 - Create task manager"');
  assert.deepEqual(result, ['Task 0 - Create task manager']);
});

test('it parses multiple task names', function(assert) {
  let result = flowParser('"Task 0" task2 task3:profit "Peace"');
  assert.deepEqual(result, ['Task 0', 'task2', 'task3:profit', 'Peace']);
});
