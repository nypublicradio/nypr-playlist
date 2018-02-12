import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('readable-duration', 'helper:readable-duration', {
  integration: true
});

const ONE_MINUTE = 60;
const ONE_HOUR   = ONE_MINUTE * 60;

test('it renders durations less than an hour correctly', function(assert) {
  this.set('duration', ONE_MINUTE * 59);

  this.render(hbs`{{readable-duration duration}}`);

  assert.equal(this.$().text().trim(), '59 min');
});

test('it renders durations longer than an hour correctly', function(assert) {
  this.set('duration', ONE_HOUR + (ONE_MINUTE * 40));

  this.render(hbs`{{readable-duration duration}}`);

  assert.equal(this.$().text().trim(), '1 hr 40 min');
});

test('it renders durations less than the minutes correctly', function(assert) {
  this.set('duration', ONE_MINUTE * 9);

  this.render(hbs`{{readable-duration duration}}`);

  assert.equal(this.$().text().trim(), '9 min');
})
