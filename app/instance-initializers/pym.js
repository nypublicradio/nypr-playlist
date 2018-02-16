import pym from 'pym';

export function initialize(appInstance) {
  let embed = new pym.Child({polling: 200});
  appInstance.register('pym:main', embed, {instantiate: false});
  appInstance.inject('controller', 'pym', 'pym:main');
}

export default {
  initialize
};
