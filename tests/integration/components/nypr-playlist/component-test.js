import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, click, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import test from 'ember-sinon-qunit/test-support/test';
import { dummyHifi } from 'nypr-playlist/tests/helpers/hifi-integration-helpers';

module('Integration | Component | nypr playlist', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:hifi', dummyHifi);
    this.hifi = this.owner.lookup('service:hifi');
  });

  test('playlist usage with block params', async function(assert) {
    const story1 = {title: 'foo', show: 'foo show', duration: '20 min'};
    const story2 = {title: 'bar', duration: '2 min'};
    const story3 = {title: 'baz', duration: '1h 30min'};

    this.setProperties({ items: [story1, story2, story3] });

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

    assert.equal(find('.playlist-header').textContent.trim(), 'Play All', 'renders initial screen');
    assert.equal(findAll('.playlist-item').length, 3, 'renders playlist items');

    assert.equal(find('.playlist-item:nth-child(1) .item-title').textContent.trim(), `${story1.title} - ${story1.show}`, 'can render item-title as a block');
    assert.equal(find('.playlist-item:nth-child(1) .item-duration').textContent.trim(), story1.duration, 'can render item-duration as a block');

  });

  test('non block usage', async function(assert) {
    const story1 = {title: 'foo', duration: '20 min'};
    const story2 = {title: 'bar', duration: '2 min'};
    const story3 = {title: 'baz', duration: '1h 30min'};

    this.setProperties({ items: [story1, story2, story3] });

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    assert.equal(find('.playlist-header').textContent.trim(), 'Play All', 'renders initial screen');
    assert.equal(findAll('.playlist-item').length, 3, 'renders playlist items');

    assert.equal(find('.playlist-item:nth-child(2) .item-title').textContent.trim(), story2.title, 'can render item-title without a block');
    assert.equal(find('.playlist-item:nth-child(2) .item-duration').textContent.trim(), story2.duration, 'can render item-duration without a block');
  });


  test('clicking play switches to the player', async function(assert) {
    assert.expect(1);
    const story = {title: 'foo', duration: '20 min', audio: '/good/500/test'};
    this.set('items', [story]);

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
    const story1 = {title: 'foo', estimatedDuration: 1200};
    const story2 = {title: 'bar', estimatedDuration: 120};
    const story3 = {title: 'baz', estimatedDuration: 2400};

    this.setProperties({ items: [story1, story2, story3] });

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    assert.equal(find('.playlist-header__duration').textContent.trim(), '1 hr 2 min');
  });

  skip('when a piece ends it moves onto the next', function(assert) {
    assert.async();
    const story1 = {title: 'foo', audio: '/good/1000/test'};
    const story2 = {title: 'bar', audio: '/good/1000/test2'};
    this.setProperties({ items: [story1, story2] });

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
  });
  hooks.afterEach(() => delete window.dataLayer);

  test('Play All triggers a passive play event', async function(assert) {
    assert.expect(1);
    const story1 = {title: 'foo', duration: '20 min', audio: '/good/500/test', showTitle: 'foo show'};
    const story2 = {title: 'bar', duration: '20 min', audio: '/good/500/test2', showTitle: 'bar show'};
    this.set('items', [story1, story2]);

    let dataSpy = this.spy(window.dataLayer, 'push')

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    await click('.playlist-header__body .play-pause');
    assert.ok(dataSpy.calledWith({event: 'playlist-passiveStart', 'playlist-currentStory': story1.title, 'playlist-currentShow': story1.showTitle}));
  });

  test('A piece of audio playing after another triggers a passive play event', async function(assert) {
    assert.expect(1);
    const story1 = {title: 'foo', duration: '20 min', audio: '/good/500/test', showTitle: 'foo show'};
    const story2 = {title: 'bar', duration: '20 min', audio: '/good/500/test2', showTitle: 'bar show'};
    this.set('items', [story1, story2]);

    await render(hbs`
      {{#nypr-playlist items=items as |playlist|}}
        {{playlist.player}}
        {{playlist.row}}
      {{/nypr-playlist}}
    `);

    await click('.playlist-header__body .play-pause');
    let dataSpy = this.spy(window.dataLayer, 'push')

    this.hifi.trigger('audio-ended');
    await settled();
    assert.ok(dataSpy.calledWith({event: 'playlist-passiveStart', 'playlist-currentStory': story2.title, 'playlist-currentShow': story2.showTitle}))
  });
});
