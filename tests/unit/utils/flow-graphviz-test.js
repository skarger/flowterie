import flowGraphviz from 'flowterie/utils/flow-graphviz';
import { module, test } from 'qunit';

module('Unit | Utility | flow graphviz');

test('it returns an empty string for an empty flow', function(assert) {
  let result = flowGraphviz([]);
  assert.equal(result, '');
});

test('it returns graphviz dot for a task', function(assert) {
    let result = flowGraphviz([{
        type: 'task_decl',
        id: 't1',
        label: 'Task 1'
    }]);
    assert.equal(result,
        'digraph Flow { rankdir="LR"\n' +
          't1 [label="Task 1"]\n' +
        '}'
    );
});

test('it returns graphviz dot for a transition', function(assert) {
    let result = flowGraphviz([{
        type: 'transition',
        from: 't1',
        to: 't2'
    }]);
    assert.equal(result,
        'digraph Flow { rankdir="LR"\n' +
          't1 -> t2\n' +
        '}'
    );
});
