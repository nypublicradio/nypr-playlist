import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cssify', 'helper:cssify', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('css', {backgroundColor: 'blue', fontFamily: 'Open Sans'});

  this.render(hbs`{{cssify css}}`);

  assert.equal(this.$().text().trim(), 'background-color: blue; font-family: Open Sans;');
});
