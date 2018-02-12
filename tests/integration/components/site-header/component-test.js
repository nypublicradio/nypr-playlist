import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('site-header', 'Integration | Component | site header', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{site-header}}`);

  assert.ok(find('.site-header'));

  this.render(hbs`{{site-header 'foo' 'bar'}}`);

  assert.equal(find('.site-header__title').textContent.trim(), 'foo');
  assert.equal(find('.site-header__blurb').textContent.trim(), 'bar');
});
