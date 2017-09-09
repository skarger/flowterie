import flowParser from 'flowterie/utils/flow-parser';
import { module, test } from 'qunit';

module('Unit | Utility | flow parser');

test('it parses an empty string into an empty flow', function(assert) {
  let result = flowParser('');
  assert.deepEqual(result, {
    flow: [],
    errors: [],
  });
});

test('it provides an error if parse fails', function(assert) {
  let result = flowParser('#garbage');
    assert.deepEqual(result, {
        flow: [],
        errors: [{
          title: "Line 1: syntax error",
          detail: "Expected [\\-_0-9A-Za-z:] or end of input but \"#\" found."
        }]
    });
});

test('it parses a basic task name', function(assert) {
  let result = flowParser('task');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 'task',
      label: 'task',
    }],
    errors: [],
  });
});

test('it parses a task ID with numbers, underscores, and hyphens', function(assert) {
  let result = flowParser('task1');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 'task1',
      label: 'task1',
    }],
    errors: [],
  });
});

test('it parses a task ID with underscores, hyphens', function(assert) {
  let result = flowParser('dog-tested_cat-approved');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 'dog-tested_cat-approved',
      label: 'dog-tested_cat-approved',
    }],
    errors: [],
  });
});

test('it parses a task ID with colons', function(assert) {
  let result = flowParser('code:red');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 'code:red',
      label: 'code:red',
    }],
    errors: [],
  });
});

test('it parses a task ID with capital letters', function(assert) {
  let result = flowParser('MyTask');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 'MyTask',
      label: 'MyTask',
    }],
    errors: [],
  });
});

test('it parses a quoted task label', function(assert) {
  let resultDouble = flowParser('t "task"');
  assert.deepEqual(resultDouble, {
    flow: [{
      type: 'task_decl',
      id: 't',
      label: 'task',
    }],
    errors: [],
  });

  let resultSingle = flowParser("t 'task'");
  assert.deepEqual(resultSingle, {
    flow: [{
      type: 'task_decl',
      id: 't',
      label: 'task',
    }],
    errors: [],
  });
});

test('it parses a quoted task label with spaces', function(assert) {
  let result = flowParser('t0 "Task 0 - Create task manager"');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't0',
      label: 'Task 0 - Create task manager',
    }],
    errors: [],
  });
});

test('it parses multiple task names', function(assert) {
  let result = flowParser('t0 "Task 0" task2 task3:profit tp "Peace"');
  assert.deepEqual(result, {
    flow: ['Task 0', 'task2', 'task3:profit', 'Peace'],
    flow: [{
      type: 'task_decl',
      id: 't0',
      label: 'Task 0',
    },
    {
      type: 'task_decl',
      id: 'task2',
      label: 'task2',
    },
    {
      type: 'task_decl',
      id: 'task3:profit',
      label: 'task3:profit',
    },
    {
      type: 'task_decl',
      id: 'tp',
      label: 'Peace',
    }],
    errors: [],
  });
});

test('it parses a task id followed by a task label', function(assert) {
  let result = flowParser('t1 "Task 1"');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't1',
      label: 'Task 1'
    }],
    errors: [],
  });
});
