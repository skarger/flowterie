import { test } from 'qunit';
import moduleForAcceptance from 'flowterie/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | home page');

test('visiting / without authentication', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting / with authentication shows logged in nav', function(assert) {
  authenticate();

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('a.nav[href="/"]').text().trim(), "Home");

    assert.equal(find('a.nav[href="/new-flow"]').length, 1);
    assert.equal(find('a.nav[href="/new-flow"]').text().trim(), "Create");

    assert.equal(find('a.nav[href="/logout"]').length, 1);
    assert.equal(find('a.nav[href="/logout"]').text().trim(), "Logout");

    assert.equal(find('ul.identity').length, 1);
    assert.equal(find('ul.identity > li').length, 2);
    assert.equal(find('ul.identity > li#api-token').text(), 'API token: 007');
    assert.equal(find('ul.identity > li#organization-id').text(), 'Organization: s-MI6');
  });
});

test('listing flows on home page', function(assert) {
  authenticate();

  visit('/');

  andThen(function() {
    assert.equal(find('h2').text().trim(), "List of Flows");
  });
});
