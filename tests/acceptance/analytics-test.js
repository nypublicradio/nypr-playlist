import { module } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import dummyConnection from 'ember-hifi/hifi-connections/dummy-connection';

module('Acceptance | analytics', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    let service = this.owner.lookup('service:hifi');
    this.owner.register('hifi-connection:local-dummy-connection', dummyConnection, { instantiate: false });

    let activeDummy = service._activateConnection({ name: 'LocalDummyConnection' });
    service.set('_connections', [activeDummy]);
    window.dataLayer = [];
  });
  hooks.afterEach(() => delete window.dataLayer);

  test('sets the playlistTitle dataLayer variable', async function(assert) {
    const TITLE = 'Hello World';
    this.mock(window.dataLayer).expects('push').withArgs({playlistTitle: TITLE});

    await visit(`/?title=${TITLE}`);

    assert.equal(currentURL(), '/?title=Hello World');
  });

  test('it sets the currentPosition variable', async function() {
    server.create('story', {slug: 'foo', audio: '/good/5000/foo'});
    server.create('story', {slug: 'bar', audio: '/good/5000/bar'});
    server.create('story', {slug: 'baz', audio: '/good/5000/baz'});

    await visit('/?title=foo&stories=foo,bar,baz');

    this.mock(window.dataLayer).expects('push').withArgs({currentPosition: 2});
    await click('.playlist-item:nth-child(2) .play-pause');
  });
});
