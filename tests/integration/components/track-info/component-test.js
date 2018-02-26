import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | track info', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{track-info}}`);

    assert.ok(find('.track-info'));

    // Template block usage:
    await render(hbs`
      {{#track-info as |info|}}
        {{#info.title}}title{{/info.title}}
        {{#info.show}}show{{/info.show}}
      {{/track-info}}
    `);

    assert.equal(find('.track-info__title').textContent.trim(), 'title');
    assert.equal(find('.track-info__show').textContent.trim(), 'show');
  });
});