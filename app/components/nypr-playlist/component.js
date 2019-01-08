import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { mapBy, reads, sum } from '@ember/object/computed';
import { run } from '@ember/runloop';

export default Component.extend({
  classNames:  ['nypr-playlist'],

  dataLayer: service('nypr-metrics/data-layer'),
  dj:           service(),
  hifi:         service(),
  currentItem:  reads('hifi.currentMetadata.item'),
  allDurations: mapBy('items', 'estimatedDuration'),
  duration:     sum('allDurations'),

  init() {
    this._super(...arguments);
    get(this, 'hifi').on('audio-ended', () => run(this, 'queueUp'));
  },

  play(item, djOptions={}) {
    set(this, 'showPlayer', true);
    let listPosition = get(this, 'items').indexOf(item);
    let options = Object.assign({}, {metadata: {item, listPosition}}, djOptions)
    return get(this, 'dj').play(item, options);
  },

  pause() {
    get(this, 'hifi').pause();
  },

  queueUp() {
    let currentItem = get(this, 'currentItem');
    let currentIndex = get(this, 'items').indexOf(currentItem);
    let nextItem = get(this, 'items').objectAt(currentIndex + 1);

    if (currentIndex === (get(this, 'items.length') - 1)) {
      set(this, 'showPlayer', false);
    } else {
      this.play(nextItem, {playContext: 'playlist'});
    }
  },

  playAll() {
    let firstItem = get(this, 'items.firstObject');
    this.play(firstItem);
  },
});
