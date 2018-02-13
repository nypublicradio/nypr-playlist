import Controller from '@ember/controller';
import { bind } from '@ember/runloop';

export default Controller.extend({
  queryParams: ['title', 'blurb', 'stories'],
  title: null,
  blurb: null,
  stories: null,

  init() {
    this._super(...arguments);
    let media = window.matchMedia("(max-width: 767px)");
    this.setTextCrawl(media);

    this.set('media', media);
    this.set('boundListener', bind(this, 'setTextCrawl'));
    media.addListener(this.get('boundListener'));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('media').removeListener(this.get('boundListener'));
  },

  setTextCrawl(mql) {
    this.set('crawl', mql.matches);
  }
});
