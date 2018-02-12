import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames:  ['nypr-playlist'],

  hifi:        service(),

  play(item) {
    let audio = get(item, 'audio');
    get(this, 'hifi').play(audio, {metadata: {item}});
  },

  pause() {
    get(this, 'hifi').pause();
  },
});
