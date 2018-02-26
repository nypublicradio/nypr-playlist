import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:readable-duration', function(hooks) {
  setupRenderingTest(hooks);

  const ONE_MINUTE = 60;
  const ONE_HOUR   = ONE_MINUTE * 60;

  test('it renders durations less than an hour correctly', async function(assert) {
    this.set('duration', ONE_MINUTE * 59);

    await render(hbs`{{readable-duration duration}}`);

    assert.equal(find('*').textContent.trim(), '59 min');
  });

  test('it renders durations longer than an hour correctly', async function(assert) {
    this.set('duration', ONE_HOUR + (ONE_MINUTE * 40));

    await render(hbs`{{readable-duration duration}}`);

    assert.equal(find('*').textContent.trim(), '1 hr 40 min');
  });

  test('it renders durations less than the minutes correctly', async function(assert) {
    this.set('duration', ONE_MINUTE * 9);

    await render(hbs`{{readable-duration duration}}`);

    assert.equal(find('*').textContent.trim(), '9 min');
  })
});