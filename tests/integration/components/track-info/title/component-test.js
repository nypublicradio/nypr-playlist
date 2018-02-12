import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('track-info/title', 'Integration | Component | track info/title', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{track-info/title}}`);
  assert.ok(find('.track-info__title'));
});
