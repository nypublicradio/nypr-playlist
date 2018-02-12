import Component from '@ember/component';

const SiteTitle = Component.extend({
  classNames: ['site-header']
});

SiteTitle.reopenClass({
  positionalParams: ['title', 'blurb']
});

export default SiteTitle;
