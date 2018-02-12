import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('track-info/show', 'Integration | Component | track info/show', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{track-info/show}}`);
  assert.ok(find('.track-info__show'));
});
