import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Component.extend({
  classNames:  ['nypr-playlist'],

  hifi:        service(),
  currentItem: reads('hifi.currentSound.metadata.item'),

  play(item) {
    let audio = get(item, 'audio');
    get(this, 'hifi').play(audio, {metadata: {item}});
  },

  pause() {
    get(this, 'hifi').pause();
  },
});
