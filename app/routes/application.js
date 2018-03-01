import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import DS from 'ember-data';

export default Route.extend({
  queryParams: {
    stories: {
      refreshModel: true
    }
  },
  model({ stories }) {
    let slugs = stories.split(',').filter(Boolean);
    let requests = slugs.map(slug => this.store.findRecord('story', slug));

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
