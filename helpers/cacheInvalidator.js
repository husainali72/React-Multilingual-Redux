/* eslint-disable */
import { CHECK_INVALIDATION_INTERVAL } from '../constants';
export default function cacheInvalidator() {
  if (process.env.NODE_ENV !== 'production') return;
  setInterval(() => {
    const xhr = new XMLHttpRequest();
    const dt = new Date();
    xhr.open('GET', '/assets/version.json?ver=' + dt.getTime());
    xhr.send(null);

    xhr.onreadystatechange = function() {
      const DONE = 4;
      const OK = 200;
      if (xhr.readyState === DONE && xhr.status === OK) {
        var response = xhr.responseText ? JSON.parse(xhr.responseText) : {};
        if (response.version !== process.env.VERSION) {
          window.location.reload(true);
        }
      }
    };
  }, CHECK_INVALIDATION_INTERVAL * 60 * 1000);
}
