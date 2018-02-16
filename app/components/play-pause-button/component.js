import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  buttonColor: computed('styles', function() {
    return htmlSafe(`color: ${this.get('styles.accent.color')}`)
  }),
  actions: {
    toggle() {
      if (this.get('isPlaying')) {
        this.get('pause')();
      } else {
        this.get('play')();
      }
    }
  }
});
