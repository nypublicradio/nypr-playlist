import Component from '@ember/component';
import fetch from 'fetch';
import config from 'nypr-playlist/config/environment';
import { computed } from '@ember/object';
import { cssify } from 'nypr-playlist/helpers/cssify';

const ThemeWrapper = Component.extend({
  classNames: ['theme-wrapper'],
  attributeBindings: ['style'],

  style: computed('styles', function() {
    let styles = this.get('styles');
    if (styles) {
      return cssify(styles.body);
    }
  }),


  didReceiveAttrs() {
    this._super(...arguments);
    let theme = this.get('theme');
    if (!theme) {
      return {};
    }
    fetch(`${config.themes}/${theme}.json`)
      .then(r => r.json())
      .then(styles => this.set('styles', styles));
  },
});

ThemeWrapper.reopenClass({
  positionalParams: ['theme']
});

export default ThemeWrapper;
