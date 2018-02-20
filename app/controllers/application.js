import Controller from '@ember/controller';
import { bind } from '@ember/runloop';
import { or } from '@ember/object/computed';
import { schedule } from '@ember/runloop';

export default Controller.extend({
  queryParams: ['title', 'blurb', 'stories', 'brand'],
  title: null,
  blurb: null,
  stories: '',
  brand: null,

  showApp: or('{title,blurb,stories}'),

  init() {
    this._super(...arguments);
    let media = window.matchMedia("(max-width: 767px)");
    this.setTextCrawl(media);

    this.set('media', media);
    this.set('boundListener', bind(this, 'setTextCrawl'));
    media.addListener(this.get('boundListener'));

    let pym = this.get('pym');
    pym.onMessage('incoming', bind(this, 'listener'));
    schedule('afterRender', () => this.get('pym').sendMessage('mounted'));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('media').removeListener(this.get('boundListener'));
  },

  setTextCrawl(mql) {
    this.set('crawl', mql.matches);
  },

  listener(data) {
    let query = this.parse(data);
    this.setProperties(query);
  },

  parse(data) {
    let message = {};
    if (typeof data === 'string') {
      try {
        message = JSON.parse(data);
      } catch(e) {/* Ignored */}
    }
    return message;
  }
});
