import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('nypr-playlist/item-duration', 'Integration | Component | nypr playlist/item duration', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nypr-playlist/item-duration}}`);

  assert.ok(find('.item-duration'))

  // Template block usage:
  this.render(hbs`
    {{#nypr-playlist/item-duration}}
      template block text
    {{/nypr-playlist/item-duration}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
