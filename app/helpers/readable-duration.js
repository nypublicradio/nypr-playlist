import { helper } from '@ember/component/helper';
import moment from 'moment';

export function readableDuration([ d ]/*, hash*/) {
  let duration = moment.duration(d, 'seconds');
  let hours = duration.hours();
  let minutes = duration.minutes();

  if (isNaN(minutes) || isNaN(hours)) {
    return '';
  }
  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  } else {
    return `${minutes} min`;
  }
}

export default helper(readableDuration);
