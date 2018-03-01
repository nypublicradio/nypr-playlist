import StoryAdapter from 'nypr-publisher-lib/adapters/story';
import DS from 'ember-data';

export default StoryAdapter.extend({
  handleResponse(status, headers, payload, {url}) {
    let maybeError = this._super(...arguments);
    if (maybeError instanceof DS.NotFoundError) {
      let slug = url.split('/').filter(i => i).slice(-1)[0];
      maybeError.errors[0].detail = slug;
    }
    return maybeError;
  }
});
