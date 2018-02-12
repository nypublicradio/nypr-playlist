import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('nypr-playlist/item', 'Integration | Component | nypr playlist/item', {
  integration: true
});

test('it renders', function(assert) {
  const item = {title: 'foo title', duration: 'foo duration'};
  this.setProperties({
    item,
    play() {},
    pause() {}
  })
  this.render(hbs`{{nypr-playlist/item item play=play pause=pause}}`);

  assert.ok(find('.playlist-item'));
  assert.equal(find('.playlist-item .item-title').textContent.trim(), item.title);
  assert.equal(find('.playlist-item .item-duration').textContent.trim(), item.duration);
});

test('block usage', function(assert) {
  const TITLE    = 'foo title';
  const DURATION = 'foo duration';
  this.setProperties({
    title: TITLE,
    duration: DURATION,
    play() {},
    pause() {}
  })
  this.render(hbs`
    {{#nypr-playlist/item play=play pause=pause as |item|}}
      {{#item.center}}
        {{title}}
      {{/item.center}}

      {{#item.right}}
        {{duration}}
      {{/item.right}}
    {{/nypr-playlist/item}}
  `);

  assert.ok(find('.playlist-item'));
  assert.equal(find('.playlist-item .item-title').textContent.trim(), TITLE);
  assert.equal(find('.playlist-item .item-duration').textContent.trim(), DURATION);
});
