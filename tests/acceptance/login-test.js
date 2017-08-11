import { test } from 'qunit';
import moduleForAcceptance from 'flowterie/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

test('visiting /login', function(assert) {
  visit('/login');
  fillIn('input#organization-id', 's-MI6');
  fillIn('input#api-token', '007');
  click('button#login');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('visiting another route, redirecting to /login, then redirecting back', function(assert) {
  visit('/new-flow');
  andThen(function() {
    assert.equal(currentURL(), '/login');

    fillIn('input#organization-id', 's-MI6');
    fillIn('input#api-token', '007');
    click('button#login');
    andThen(function() {
      assert.equal(currentURL(), '/new-flow');
    });
  });
});
