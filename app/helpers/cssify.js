import { helper } from '@ember/component/helper';
import { htmlSafe, dasherize } from '@ember/string';

export function cssify(styles/*, hash*/) {
  if (!styles) {
    return htmlSafe('');
  }
  let rules = Object.keys(styles).map(key => `${dasherize(key)}: ${styles[key]};`)
  return htmlSafe(rules.join(' '));
}

export default helper(([params], ...rest) => cssify(params, ...rest));
