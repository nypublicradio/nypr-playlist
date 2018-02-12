import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, click } from 'ember-native-dom-helpers';
import test from 'ember-sinon-qunit/test-support/test';

moduleForComponent('nypr-playlist', 'Integration | Component | nypr playlist', {
  integration: true,
});

test('playlist usage with block params', function(assert) {
  const story1 = {title: 'foo', show: 'foo show', duration: '20 min'};
  const story2 = {title: 'bar', duration: '2 min'};
  const story3 = {title: 'baz', duration: '1h 30min'};

  this.setProperties({ items: [story1, story2, story3] });

  this.render(hbs`
    {{#nypr-playlist items=items as |playlist|}}
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
      {{playlist.row}}
    {{/nypr-playlist}}
  `);

  assert.equal(findAll('.playlist-item').length, 3, 'renders playlist items');

  assert.equal(find('.playlist-item:nth-child(2) .item-title').textContent.trim(), story2.title, 'can render item-title without a block');
  assert.equal(find('.playlist-item:nth-child(2) .item-duration').textContent.trim(), story2.duration, 'can render item-duration without a block');
});
