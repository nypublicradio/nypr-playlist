import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:application');
    assert.ok(route);
  });

  test('it splits makes a findRecord call for each passed in slug', function(assert) {
    const stories = 'list,of,story,slugs';
    const findRecord = this.mock('findRecord').exactly(4)
                        .onFirstCall().resolves('list')
                        .onSecondCall().resolves('of')
                        .onThirdCall().resolves('story')
                        .onCall(3).resolves('slugs');

    let route = this.owner.factoryFor('route:application').create({
      store: {
        findRecord
      }
    });

    let promise = route.model({ stories });
    promise.then(slugs => assert.equal(slugs.join(','), stories));
  });

  test('it works with blank stories', function(assert) {
    let route = this.owner.factoryFor('route:application').create({
      store: {
        findRecord: this.mock('findRecord').never()
      }
    });

    let promise = route.model({ stories: '' });
    promise.then(requests => assert.deepEqual(requests, []));
  });
});