import { test } from 'qunit';
import moduleForAcceptance from 'flowterie/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | new flow');

test('visiting /new-flow', function(assert) {
  authenticate();

  visit('/new-flow');

  andThen(function() {
    assert.equal(currentURL(), '/new-flow');
    assert.equal(find('h2').text().trim(), "New Flow");
  });
});

test('/new-flow has a link back to the home page', function(assert) {
  authenticate();

  visit('/new-flow');

  andThen(function() {
    assert.equal(find('a.app-header[href="/"]').text().trim(), "Flowterie");
  });
});

test('/new-flow has inputs for the flow template', function(assert) {
  authenticate();

  visit('/new-flow');

  andThen(function() {
    assert.equal(find('label[for="template_name"]').text().trim(), "Name:");
    assert.equal(find('input#template_name').length, 1);
  });
});
