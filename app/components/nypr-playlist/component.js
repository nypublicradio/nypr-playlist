import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { run } from '@ember/runloop';
import { sum, mapBy } from '@ember/object/computed';

export default Component.extend({
  classNames:  ['nypr-playlist'],

  hifi:        service(),
  currentItem: reads('hifi.currentSound.metadata.item'),

  allDurations: mapBy('items', 'estimatedDuration'),
  duration:     sum('allDurations'),

  init() {
    this._super(...arguments);
    get(this, 'hifi').on('audio-ended', () => run(this, 'queueUp'));
  },

  play(item) {
    set(this, 'showPlayer', true);

    let audio = get(item, 'audio');
    get(this, 'hifi').play(audio, {metadata: {item}});
  },

  pause() {
    get(this, 'hifi').pause();
  },

  queueUp() {
    let currentItem = get(this, 'currentItem');
    let currentIndex = get(this, 'items').indexOf(currentItem);
    if (currentIndex === (get(this, 'items.length') - 1)) {
      set(this, 'showPlayer', false);
    } else {
      this.play(get(this, 'items').objectAt(currentIndex + 1))
    }
  }
});
