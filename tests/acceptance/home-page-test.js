import { test } from 'qunit';
import moduleForAcceptance from 'flowterie/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | home page');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('a[href="/new-flow"]').length, 1);
    assert.equal(find('a[href="/new-flow"]').text().trim(), "Create New Flow");
  });
});
