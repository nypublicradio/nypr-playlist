import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('nypr-playlist/item-title', 'Integration | Component | nypr playlist/item title', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nypr-playlist/item-title}}`);

  assert.ok(find('.item-title'))

  // Template block usage:
  this.render(hbs`
    {{#nypr-playlist/item-title}}
      template block text
    {{/nypr-playlist/item-title}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
