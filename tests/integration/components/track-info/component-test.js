import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('track-info', 'Integration | Component | track info', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{track-info}}`);

  assert.ok(find('.track-info'));

  // Template block usage:
  this.render(hbs`
    {{#track-info as |info|}}
      {{#info.title}}title{{/info.title}}
      {{#info.show}}show{{/info.show}}
    {{/track-info}}
  `);

  assert.equal(find('.track-info__title').textContent.trim(), 'title');
  assert.equal(find('.track-info__show').textContent.trim(), 'show');
});
