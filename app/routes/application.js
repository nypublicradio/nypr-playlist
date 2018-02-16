import Route from '@ember/routing/route';
import RSVP from 'rsvp';

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
      if (e && e.errors) {
        if (e.errors[0].status === '404') {
          return;
        } else {
          throw e;
        }
      } else {
        throw e;
      }
    }
  }
});
