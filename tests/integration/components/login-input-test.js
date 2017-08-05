import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('login-input', 'Integration | Component | login input', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{login-input}}`);

  assert.equal(this.$('input#organization-id').length, 1);
  assert.equal(this.$('input#api-token').length, 1);
  assert.equal(this.$().text().trim(), 'Login');
});
