import Component from '@ember/component';

export default Component.extend({
  classNames: ['track-info'],
  classNameBindings: ['watch:is-crawling']
});
