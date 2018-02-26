import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:cssify', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('css', {backgroundColor: 'blue', fontFamily: 'Open Sans'});

    await render(hbs`{{cssify css}}`);

    assert.equal(find('*').textContent.trim(), 'background-color: blue; font-family: Open Sans;');
  });
});