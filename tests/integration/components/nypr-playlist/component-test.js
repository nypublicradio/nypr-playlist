import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findAll, click } from 'ember-native-dom-helpers';
import test from 'ember-sinon-qunit/test-support/test';

moduleForComponent('nypr-playlist', 'Integration | Component | nypr playlist', {
  integration: true,
});

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
});
