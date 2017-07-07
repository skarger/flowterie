import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flow-list', 'Integration | Component | flow list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{flow-list title="My Flow List" flows=["Flow 1"]}}`);

  assert.equal(this.$().text().trim(), 'My Flow List');
});
