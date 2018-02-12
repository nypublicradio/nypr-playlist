import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';
import { find, click } from 'ember-native-dom-helpers';

moduleForComponent('play-pause-button', 'Integration | Component | play pause button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{play-pause-button}}`);

  assert.ok(find('.play-pause'), 'it renders');
});

test('it updates its UI and calls the expected actions', function(assert) {
  let done = assert.async();
  this.set('play', this.mock('play').once());
  this.set('pause', this.mock('pause').once());

  this.render(hbs`
    {{play-pause-button
      isPlaying=isPlaying
      play=play
      pause=pause
    }}
  `);

  assert.ok(find('.playlist-play'), 'should render in paused state');
  click('.play-pause').then(() => {
    this.set('isPlaying', true);
    assert.ok(find('.playlist-pause'), '`isPlaying` controls UI');
    click('.play-pause').then(done);
  });
});
