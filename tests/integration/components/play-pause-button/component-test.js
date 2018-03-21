import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';

module('Integration | Component | play pause button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{play-pause-button}}`);

    assert.ok(find('.play-pause'), 'it renders');
  });

  test('it updates its UI and calls the expected actions', async function(assert) {
    assert.expect(4);
    let done = assert.async();
    this.set('play', this.mock('play').once());
    this.set('pause', this.mock('pause').once());

    await render(hbs`
      {{play-pause-button
        isPlaying=isPlaying
        play=play
        pause=pause
      }}
    `);

    assert.ok(find('.playlist-play'), 'should render in paused state');
    await click('.play-pause');

    this.set('isPlaying', true);
    assert.ok(find('.playlist-pause'), '`isPlaying` controls UI');
    await click('.play-pause');

    done();
  });

  test('it accepts element attributes', async function(assert) {
    await render(hbs`{{play-pause-button data-action='foo' data-label='bar' class='baz'}}`);

    assert.equal(find('.play-pause').getAttribute('data-action'), 'foo', 'sets data-action');
    assert.equal(find('.play-pause').getAttribute('data-label'), 'bar', 'sets data-label');
    assert.ok(find('.play-pause.baz'), 'sets a class');
  });
});
