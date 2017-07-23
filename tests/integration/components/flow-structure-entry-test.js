import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('flow-structure-entry', 'Integration | Component | flow structure entry', {
  integration: true
});

test('should initially show nothing', function(assert) {
    this.on('basicList', (text) => {
        if (text === '') {
            return RSVP.resolve([]);
        } else {
            return RSVP.resolve(["task 1", "task 2"]);
        }
    });

    this.render(hbs`
    {{#flow-structure-entry format=(action 'basicList') as |tasks|}}
        {{#each tasks as |task|}}
            <li class='task'>{{task}}</li>
        {{/each}}
    {{/flow-structure-entry}}
    `);

    return wait().then(() => {
        assert.equal(this.$('li.task').length, 0);
    });
});

test('should show a list when text entered', function(assert) {
    this.on('basicList', (text) => {
        if (text === '') {
            return RSVP.resolve([]);
        } else {
            return RSVP.resolve(["task 1", "task 2"]);
        }
    });

    this.render(hbs`
    {{#flow-structure-entry format=(action 'basicList') as |tasks|}}
        {{#each tasks as |task|}}
            <li class='task'>{{task}}</li>
        {{/each}}
    {{/flow-structure-entry}}
    `);

    this.$('.flow-structure-entry textarea').val("task 1'\ntask 2").keyup();

    return wait().then(() => {
        assert.equal(this.$('li.task').length, 2);
        assert.equal(this.$('li.task').first().text().trim(), 'task 1');
    });
});
