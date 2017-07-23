import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flow-structure-entry', 'Integration | Component | flow structure entry', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{flow-structure-entry}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#flow-structure-entry}}
      template block text
    {{/flow-structure-entry}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
