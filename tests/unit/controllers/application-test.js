import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import { run } from '@ember/runloop';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  test('it specifies the expected queryParams', function(assert) {
    assert.expect(7);

    const PARAMS = ['title', 'blurb', 'stories', 'brand'];
    run(() => {
      let controller = this.owner.factoryFor('controller:application').create({
        pym: {
          onMessage: this.mock('onMessage').once().withArgs('incoming'),
          sendMessage: this.mock('sendMessage').once().withArgs('mounted')
        }
      });

      assert.deepEqual(controller.queryParams, PARAMS);
      PARAMS.forEach(param => assert.ok(param in controller));
    });
  });
});