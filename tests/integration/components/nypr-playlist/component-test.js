import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, click, settled } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';
import { dummyHifi } from 'nypr-playlist/tests/helpers/hifi-integration-helpers';

module('Integration | Component | nypr playlist', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:hifi', dummyHifi);
    this.hifi = this.owner.lookup('service:hifi');

    const store = this.owner.lookup('service:store');
    run(() => {
      this.story1 = store.createRecord('story', {title: 'foo', duration: '20 min', estimatedDuration: 1200, audio: '/good/500/test', show: 'foo show',});
      this.story2 = store.createRecord('story', {title: 'bar', duration: '2 min', estimatedDuration: 120, audio: '/good/500/test2'});
      this.story3 = store.createRecord('story', {title: 'baz', duration: '1h 30min', estimatedDuration: 5400, audio: '/good/500/test3'});
    });
  });

  test('playlist usage with block params', async function(assert) {
    this.setProperties({ items: [this.story1, this.story2, this.story3] });

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{#playlist.player as |player|}}

          {{#player.player as |content|}}
            {{#content.for 'trackInfo'}}
              {{current.title}} <span class="heavy-text">{{current.show}}</span>
            {{/content.for}}
          {{/player.player}}

        {{/playlist.player}}

        {{#playlist.row as |row|}}
          {{#row.center}}
            {{row.item.title}} - {{row.item.show}}
          {{/row.center}}

          {{#row.right}}
            {{row.item.duration}}
          {{/row.right}}
        {{/playlist.row}}

      {{/nypr-playlist}}
    `);

    assert.ok(find('.playlist-header').textContent.trim().match(/Play All/), 'renders initial screen');
    assert.equal(findAll('.playlist-item').length, 3, 'renders playlist items');

    assert.equal(find('.playlist-item:nth-child(1) .item-title').textContent.trim(), `${this.story1.get('title')} - ${this.story1.get('show')}`, 'can render item-title as a block');
    assert.equal(find('.playlist-item:nth-child(1) .item-duration').textContent.trim(), this.story1.duration, 'can render item-duration as a block');

  });

  test('non block usage', async function(assert) {
    this.setProperties({ items: [this.story1, this.story2, this.story3] });

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    assert.ok(find('.playlist-header').textContent.trim().match(/Play All/), 'renders initial screen');
    assert.equal(findAll('.playlist-item').length, 3, 'renders playlist items');

    assert.equal(find('.playlist-item:nth-child(2) .item-title').textContent.trim(), this.story2.get('title'), 'can render item-title without a block');
    assert.equal(find('.playlist-item:nth-child(2) .item-duration').textContent.trim(), this.story2.get('duration'), 'can render item-duration without a block');
  });


  test('clicking play switches to the player', async function(assert) {
    assert.expect(1);
    this.set('items', [this.story1]);

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    await click('.playlist-header .play-pause');
    assert.ok(find('.nypr-player'), 'player should be visible');
  });

  test('it displays the sum total duration in a readable format', async function(assert) {
    this.setProperties({ items: [this.story1, this.story2, this.story3] });

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    assert.equal(find('.playlist-header__duration').textContent.trim(), '1 hr 52 min');
  });

  skip('when a piece ends it moves onto the next', function(assert) {
    assert.async();
    this.setProperties({ items: [this.story1, this.story2] });

    this.render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    click('.playlist-header > .play-pause');

  });

  skip('when the last item finishes it switches to the Play All screen');
});

module('Integration | Component | nypr playlist analytics', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    window.dataLayer = [];
    this.owner.register('service:hifi', dummyHifi);
    this.hifi = this.owner.lookup('service:hifi');

    const store = this.owner.lookup('service:store');
    run(() => {
      this.story1 = store.createRecord('story', {title: 'foo', duration: '20 min', estimatedDuration: 1200, audio: '/good/500/test', showTitle: 'foo show',});
      this.story2 = store.createRecord('story', {title: 'bar', duration: '2 min', estimatedDuration: 120, audio: '/good/500/test2', showTitle: 'bar show'});
      this.story3 = store.createRecord('story', {title: 'baz', duration: '1h 30min', estimatedDuration: 5400, audio: '/good/500/test3'});
    });
  });

  hooks.afterEach(() => delete window.dataLayer);

  test('Play All triggers a play event', async function(assert) {
    assert.expect(1);
    this.set('items', [this.story1, this.story2]);

    let dataSpy = this.spy(window.dataLayer, 'push')

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    await click('.playlist-header__body .play-pause');

    assert.ok(dataSpy.calledWith({
      'Audio Playback Position': 0,
      'Audio Playback Source': null,
      'Audio Playback State': "play",
      'Audio Show Title': this.story1.get('showTitle'),
      'Audio Story Title': this.story1.get('title'),
      'Audio URL': this.story1.get('audio'),
      event: "On Demand Audio Playback",
    }), 'the expected values are pushed into the data layer');
  });

  test('A piece of audio playing after another triggers a passive play event', async function(assert) {
    assert.expect(1);
    this.set('items', [this.story1, this.story2]);

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    await click('.playlist-header__body .play-pause');
    let dataSpy = this.spy(window.dataLayer, 'push')

    this.hifi.trigger('audio-ended', this.hifi.currentSound);
    await settled();
    assert.ok(dataSpy.calledWith({
      'Audio Playback Position': 1,
      'Audio Playback Source': 'playlist',
      'Audio Playback State': "play",
      'Audio Show Title': this.story2.get('showTitle'),
      'Audio Story Title': this.story2.get('title'),
      'Audio URL': this.story2.get('audio'),
      event: "On Demand Audio Playback",
    }));
  });

  test('Pausing from the main player triggers a pause event', async function(assert) {
    assert.expect(1);
    let dataSpy = this.spy(window.dataLayer, 'push')
    this.set('items', [this.story1]);

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    await click('.playlist-header__body .play-pause');
    await click('.playlist-header .nypr-player-button.mod-listen');
    await settled();

    assert.ok(dataSpy.calledWith({
      'Audio Playback Position': 0,
      'Audio Playback Source': null,
      'Audio Playback State': "pause",
      'Audio Show Title': this.story1.get('showTitle'),
      'Audio Story Title': this.story1.get('title'),
      'Audio URL': this.story1.get('audio'),
      event: "On Demand Audio Playback",
    }));
  })
});
