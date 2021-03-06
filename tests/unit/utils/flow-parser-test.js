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
          detail: "Expected [_0-9A-Za-z:] or end of input but \"#\" found."
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

test('it parses a task ID with numbers', function(assert) {
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

test('it does not allow a task ID to have a hyphen', function(assert) {
  let result = flowParser('task-1');
  assert.deepEqual(result, {
    flow: [],
    errors: [
      {
        "detail": "Expected \"'\", \"->\", \"\\\"\", \"start\", [_0-9A-Za-z:], or end of input but \"-\" found.",
        "title": "Line 1: syntax error"
      }
    ],
  });
});

test('it parses a task ID with underscores', function(assert) {
  let result = flowParser('dog_tested_cat_approved');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 'dog_tested_cat_approved',
      label: 'dog_tested_cat_approved',
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

test('it parses a task marked as a start', function(assert) {
  let result = flowParser('task start');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 'task',
      label: 'task',
      start: true,
    }],
    errors: [],
  });
});

test('it parses a transition', function(assert) {
  let result = flowParser('t1 -> t2');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't1',
      label: 't1'
    },
    {
      type: 'transition',
      from: 't1',
      to: 't2'
    },
    {
      type: 'task_decl',
      id: 't2',
      label: 't2'
    }
    ],
    errors: [],
  });
});

test('it parses a sequence of transitions', function(assert) {
  let result = flowParser('t1 -> t2 -> t3');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't1',
      label: 't1'
    },
    {
      type: 'transition',
      from: 't1',
      to: 't2'
    },
    {
      type: 'task_decl',
      id: 't2',
      label: 't2'
    },
    {
      type: 'transition',
      from: 't2',
      to: 't3'
    },
    {
      type: 'task_decl',
      id: 't3',
      label: 't3'
    }
    ],
    errors: [],
  });
});

test('it de-dupes transitions', function(assert) {
  let result = flowParser('t1 -> t2\nt3\nt1 -> t2');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't1',
      label: 't1'
    },
    {
      type: 'transition',
      from: 't1',
      to: 't2'
    },
    {
      type: 'task_decl',
      id: 't2',
      label: 't2'
    },
    {
      type: 'task_decl',
      id: 't3',
      label: 't3'
    }
    ],
    errors: [],
  });
});

test('it merges task_decl start attribute', function(assert) {
  let result = flowParser('t1 t1 start');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't1',
      label: 't1',
      start: true
    }],
    errors: [],
  });
});

test('it merges task_decl label attribute', function(assert) {
  let result = flowParser('t1 t1 "Task 1"');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't1',
      label: 'Task 1'
    }],
    errors: [],
  });
});

test('it does not overwrite custom label attribute to ID', function(assert) {
  let result = flowParser('t1 "Task 1" t1');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't1',
      label: 'Task 1'
    }],
    errors: [],
  });
});

test('it merges task_decl attributes when declared in transitions', function(assert) {
  let result = flowParser('t1 t2 t1 "Task 1" -> t2 "Task 2"' +
                          't3 "Task 3" -> t4 t3 start');
  assert.deepEqual(result, {
    flow: [{
      type: 'task_decl',
      id: 't1',
      label: 'Task 1'
    },
    {
      type: 'task_decl',
      id: 't2',
      label: 'Task 2'
    },
    {
      type: 'transition',
      from: 't1',
      to: 't2'
    },
    {
      type: 'task_decl',
      id: 't3',
      label: 'Task 3',
      start: true
    },
    {
      type: 'transition',
      from: 't3',
      to: 't4'
    },
    {
      type: 'task_decl',
      id: 't4',
      label: 't4'
    },
    ],
    errors: [],
  });
});
