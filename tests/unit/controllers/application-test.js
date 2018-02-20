import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { run } from '@ember/runloop';

moduleFor('controller:application', 'Unit | Controller | application');

test('it specifies the expected queryParams', function(assert) {
  assert.expect(7);

  const PARAMS = ['title', 'blurb', 'stories', 'brand'];
  run(() => {
    let controller = this.subject({
      pym: {
        onMessage: this.mock('onMessage').once().withArgs('incoming'),
        sendMessage: this.mock('sendMessage').once().withArgs('mounted')
      }
    });

    assert.deepEqual(controller.queryParams, PARAMS);
    PARAMS.forEach(param => assert.ok(param in controller));
  });
});
