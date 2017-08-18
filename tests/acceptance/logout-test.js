import { test } from 'qunit';
import moduleForAcceptance from 'flowterie/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | logout');

test('visiting /logout redirects to login page', function(assert) {
  visit('/logout');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('when starting logged in, logout still redirects to login page', function(assert) {
  visit('/login');
  fillIn('input#organization-id', 's-MI6');
  fillIn('input#api-token', '007');
  click('button#login');
  andThen(function() {
    click('a.logout');
    andThen(function() {
      assert.equal(currentURL(), '/login');
    });
  });

});

test('when logged out, nav links do not show', function(assert) {
  visit('/login');
  andThen(function() {
    assert.equal(find('a.nav[href="/logout"]').length, 0);
    assert.equal(find('a.nav[href="/"]').length, 0);
    assert.equal(find('a.nav[href="/new-flow"]').length, 0);
  });

});
