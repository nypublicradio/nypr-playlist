import Component from '@ember/component';

const PlaylistItem = Component.extend({
  classNames: ['playlist-item'],
});

PlaylistItem.reopenClass({
  positionalParams: ['item']
});

export default PlaylistItem;
