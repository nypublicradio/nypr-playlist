import { module } from 'qunit';
import { visit, currentURL, findAll, find, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import pym from 'pym';

module('Acceptance | application', function(hooks) {
  setupApplicationTest(hooks);

  test('basic usage', async function(assert) {
    const TITLE = 'Best Playlist Ever';
    const BLURB = 'A great lineup';
    const STORIES = ['foo', 'bar', 'baz'];

    STORIES.forEach(slug => server.create('story', {slug, title: `${slug} story`}));
    await visit(`/?title=${TITLE}&blurb=${BLURB}&stories=${STORIES.join(',')}`);

    assert.equal(currentURL(), `/?title=${TITLE}&blurb=${BLURB}&stories=${STORIES.join(',')}`);

    assert.equal(findAll('.playlist-item').length, 3, 'should be an item for each slug in the url');
    assert.ok(find('.playlist-item:nth-child(1) .track-info__title').textContent.trim(), 'foo story', 'should be in the correct order');
    assert.ok(find('.playlist-item:nth-child(2) .track-info__title').textContent.trim(), 'bar story', 'should be in the correct order');
    assert.ok(find('.playlist-item:nth-child(3) .track-info__title').textContent.trim(), 'baz story', 'should be in the correct order');
  });

  test('pym messages', async function(assert) {
    let embed = new pym.Child();
    let sendSpy = this.spy(embed, 'sendMessage');
    let receiveSpy = this.spy(embed, 'onMessage');
    this.owner.register('pym:main', embed, {instantiate: false});

    const TITLE = 'Best Playlist Ever';
    const BLURB = 'A great lineup';
    const STORY = 'foo';

    server.db.stories.remove({slug: STORY});
    await visit(`/?title=${TITLE}&blurb=${BLURB}&stories=${STORY}`);
    await settled();

    assert.ok(receiveSpy.calledWith('incoming'), 'set up a listener for incoming messages');
    assert.ok(sendSpy.calledTwice, 'pym sends two messages');
    assert.ok(sendSpy.firstCall.calledWith('mounted'));
    assert.ok(sendSpy.secondCall.calledWith('not-found', 'foo'));
  });
});
