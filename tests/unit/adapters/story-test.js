import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import DS from 'ember-data';

module('Unit | Adapter | story', function(hooks) {
  setupTest(hooks);

  test('it includes the final URL segment with 404 errors', function(assert) {
    let adapter = this.owner.lookup('adapter:story');
    assert.ok(adapter);

    const SLUG = 'foo';
    const URL = `http://example.com/${SLUG}/`;
    let error = adapter.handleResponse(404, 'headers', 'payload', {url: URL});

    assert.ok(error instanceof DS.NotFoundError, 'returned error should be a NotFoundError');
    assert.equal(error.errors[0].detail, SLUG, 'should set the detail to the slug key');
  });
});
