import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, click } from 'ember-native-dom-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import { dummyHifi } from 'nypr-playlist/tests/helpers/hifi-integration-helpers';

moduleForComponent('nypr-playlist', 'Integration | Component | nypr playlist', {
  integration: true,
  beforeEach() {
    this.register('service:hifi', dummyHifi);
    this.inject.service('hifi');
  }
});

test('playlist usage with block params', function(assert) {
  const story1 = {title: 'foo', show: 'foo show', duration: '20 min'};
  const story2 = {title: 'bar', duration: '2 min'};
  const story3 = {title: 'baz', duration: '1h 30min'};

  this.setProperties({ items: [story1, story2, story3] });

  this.render(hbs`
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

test('non block usage', function(assert) {
  const story1 = {title: 'foo', duration: '20 min'};
  const story2 = {title: 'bar', duration: '2 min'};
  const story3 = {title: 'baz', duration: '1h 30min'};

  this.setProperties({ items: [story1, story2, story3] });

  this.render(hbs`
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


test('clicking play switches to the player', function(assert) {
  const story = {title: 'foo', duration: '20 min', audio: '/good/500/test'};
  this.set('items', [story]);

  this.render(hbs`
    {{#nypr-playlist items=items as |playlist|}}
      {{playlist.player}}
      {{playlist.row}}
    {{/nypr-playlist}}
  `);

  click('.playlist-header > .play-pause').then(() => {
    assert.ok(find('.nypr-player'), 'player should be visible');
  });
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
