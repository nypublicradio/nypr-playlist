import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['title', 'blurb', 'stories'],
  title: null,
  blurb: null,
  stories: null
});
