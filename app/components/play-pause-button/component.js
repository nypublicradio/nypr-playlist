import Component from '@ember/component';

export default Component.extend({
  tagName: '',
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
