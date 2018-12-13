import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { run, bind } from '@ember/runloop';
import { sum, mapBy } from '@ember/object/computed';

export default Component.extend({
  classNames:  ['nypr-playlist'],

  hifi:         service(),
  currentItem:  reads('hifi.currentMetadata.item'),

  allDurations: mapBy('items', 'estimatedDuration'),
  duration:     sum('allDurations'),

  init() {
    this._super(...arguments);
    get(this, 'hifi').on('audio-ended', () => run(this, 'queueUp'));
    get(this, 'hifi').on('audio-played', bind(this, 'analytics'));
    get(this, 'hifi').on('audio-paused', () => {
      // we're seeing an extra 'audio-paused' event from ember-hifi
      // when one track finishes, before switching to the next track.
      // not sure yet why or where this is happening.

      // As a workaround that's good enough for analytics, ignoring
      // pause events that happen at the end of a track.
      if (window.dataLayer && !this.isEndOfTrack()) {
        window.dataLayer.push({event: 'playlist-pause'});
      }
    });
  },

  play(item, event) {
    set(this, 'lastEvent', event);
    set(this, 'showPlayer', true);

    let audio = get(item, 'audio');
    return get(this, 'hifi').play(audio, {metadata: {item}});
  },

  pause() {
    get(this, 'hifi').pause();
  },

  queueUp() {
    if (window.dataLayer) {
      window.dataLayer.push({event: 'playlist-end'});
    }
    let currentItem = get(this, 'currentItem');
    let currentIndex = get(this, 'items').indexOf(currentItem);
    let nextItem = get(this, 'items').objectAt(currentIndex + 1);

    if (currentIndex === (get(this, 'items.length') - 1)) {
      set(this, 'showPlayer', false);
    } else {
      this.play(nextItem, 'playlist-passiveStart');
    }
  },

  playAll() {
    let firstItem = get(this, 'items.firstObject');
    this.play(firstItem, 'playlist-passiveStart');
  },

  analytics(sound) {
    if (!window.dataLayer || get(this, 'isDestroying') || get(this, 'isDestroyed')) {
      return;
    }
    let { item } = sound.get('metadata');
    let currentIndex = get(this, 'items').indexOf(item);
    let event = get(this, 'lastEvent');

    if (!event) {
      if (Math.floor(sound.get('position')) === 0) {
        event = 'playlist-start';
      } else {
        event = 'playlist-resume';
      }
    }
    window.dataLayer.push({
      event,
      'playlist-currentPosition': currentIndex + 1,
      'playlist-currentStory': get(item, 'title'),
      'playlist-currentShow': get(item, 'showTitle')
    });
    set(this, 'lastEvent', null);
  },

  isEndOfTrack() {
    // 'End of track' here means within the final 1% of a track
    let position = get(this, 'hifi.position');
    let duration = get(this, 'hifi.duration');
    if (position && duration && position/duration > 0.99) {
      return true;
    }
    return false;
  }
});
