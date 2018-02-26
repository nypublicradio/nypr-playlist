import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | site header', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{site-header}}`);

    assert.ok(find('.site-header'));

    await render(hbs`{{site-header 'foo' 'bar'}}`);

    assert.equal(find('.site-header__title').textContent.trim(), 'foo');
    assert.equal(find('.site-header__blurb').textContent.trim(), 'bar');
  });
});