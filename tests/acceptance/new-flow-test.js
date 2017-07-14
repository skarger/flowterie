import { test } from 'qunit';
import moduleForAcceptance from 'flowterie/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new flow');

test('visiting /new-flow', function(assert) {
  visit('/new-flow');

  andThen(function() {
    assert.equal(currentURL(), '/new-flow');
    assert.equal(find('h2').text().trim(), "New Flow");
  });
});

test('/new-flow has a link back to the home page', function(assert) {
  visit('/new-flow');

  andThen(function() {
    assert.equal(find('a.app-header[href="/"]').text().trim(), "Flowterie");
  });
});
