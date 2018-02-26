import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nypr playlist/item duration', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{nypr-playlist/item-duration}}`);

    assert.ok(find('.item-duration'))

    // Template block usage:
    await render(hbs`
      {{#nypr-playlist/item-duration}}
        template block text
      {{/nypr-playlist/item-duration}}
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });
});