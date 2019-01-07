import { module } from 'qunit';
import { visit, currentURL, click, find } from '@ember/test-helpers';
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

  test('sets the playlistTitle and gaCategory dataLayer variables', async function(assert) {
    server.create('story', {slug: 'foo', audio: '/good/5000/foo'});
    const TITLE = 'Hello World';
    let dataSpy = this.spy(window.dataLayer, 'push');

    await visit(`/?title=${TITLE}&stories=foo`);

    assert.equal(currentURL(), '/?title=Hello World&stories=foo');
    assert.ok(dataSpy.calledWith({playlistTitle: TITLE, gaCategory: 'Playlist Widget'}), 'sets vars');
    assert.ok(find(`.playlist-header .gtm__click-tracking[data-label="${TITLE}"]`), 'play all button renders with the playlist title');
  });

  test('it sets dataLayer variables on play', async function(assert) {
    server.create('story', {slug: 'foo', audio: '/good/5000/foo'});
    let story2 = server.create('story', {slug: 'bar', audio: '/good/5000/bar'});
    server.create('story', {slug: 'baz', audio: '/good/5000/baz'});
    let dataSpy = this.spy(window.dataLayer, 'push')
    .withArgs({
      'Audio Playback Position': 1,
      'Audio Playback Source': null,
      'Audio Playback State': "play",
      'Audio Show Title': story2.showTitle,
      'Audio Story Title': story2.title,
      'Audio URL': story2.audio,
      'event': "On Demand Audio Playback"
    });

    await visit('/?title=foo&stories=foo,bar,baz');

    await click('.playlist-item:nth-child(2) .play-pause');
    assert.ok(dataSpy.calledOnce);
  });
});
