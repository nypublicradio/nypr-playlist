import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('it specifies the expected queryParams', function(assert) {
  const PARAMS = ['title', 'blurb', 'stories'];
  let controller = this.subject();
  assert.deepEqual(controller.queryParams, PARAMS);

  PARAMS.forEach(param => assert.ok(param in controller));
});
