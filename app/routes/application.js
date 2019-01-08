import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default Route.extend({
  dataLayer: service('nypr-metrics/data-layer'),
  queryParams: {
    stories: {
      refreshModel: true
    }
  },
  model({ stories, title }) {
    let slugs = stories.split(',').filter(Boolean);
    let requests = slugs.map(slug => this.store.findRecord('story', slug));
    this.get('dataLayer').push({playlistTitle: title, gaCategory: 'Playlist Widget'});
    return RSVP.Promise.all(requests);
  },
  actions: {
    error(e) {
      if (e instanceof DS.NotFoundError) {
        let slug = e.errors[0].detail;
        this.controllerFor('application').get('pym').sendMessage('not-found', slug);
      } else {
        throw e;
      }
    }
  }
});
