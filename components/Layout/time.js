import React from 'react';
import { BASIC_TRANSLATION, getSelectedCountry } from '../../constants';

function sec2time(seconds, wantHour) {
  let sec = seconds;
  if (sec > 0) {
    if (sec >= 60) {
      let min = Math.floor(sec / 60);
      sec %= 60;
      sec = sec < 10 ? `0${sec}` : sec;
      let hour = 0;
      if (min >= 60) {
        hour = Math.floor(min / 60);
        hour %= 60;
        min %= 60;
      }
      min = min < 10 ? `0${min}` : min;
      if (!wantHour && hour <= 0) {
        return `${min}:${sec}`;
      }
      hour = hour < 10 ? `0${hour}` : hour;
      return `${hour}:${min}:${sec}`;
    }
    sec = sec < 10 ? `0${sec}` : sec;
    if (!wantHour) {
      return `00:${sec}`;
    }
    return `00:00:${sec}`;
  }
  if (!wantHour) {
    return '00:00';
  }
  return '00:00:00';
}

function getTimeWithSuffix(tempDate, locale, suffix) {
  let hh = tempDate.getHours();
  let mm = tempDate.getMinutes();
  mm = mm < 10 ? `0${mm}` : mm;
  let timeType = BASIC_TRANSLATION[locale].AM;
  if (hh >= 12) {
    hh -= 12;
    timeType = BASIC_TRANSLATION[locale].PM;
  }
  if (!hh) hh = 12;
  hh = hh < 10 ? `0${hh}` : hh;
  if (suffix) {
    return `${hh}:${mm} ${timeType}`;
  }
  return `${hh}:${mm}`;
}

export default function Time(prop) {
  const { className, style, value, withHour, suffix, unit } = prop;
  let timeInSec = value;
  const { locale } = getSelectedCountry();
  let timeWithSuffix = null;

  if (unit === 'ms') {
    timeInSec = Math.floor(value / 1000);
  } else if (unit === 'm' || unit === 'min') {
    timeInSec = Math.floor(value * 60);
  } else if (unit === 'h' || unit === 'hour') {
    timeInSec = Math.floor(value * 60 * 60);
  } else if (unit === 'timestamp' && value && value.split('T').length) {
    const fullDate = value;
    const date = fullDate.split('T')[0];
    let time = null;
    if (fullDate.split('T')[1]) {
      [time] = fullDate.split('T')[1].split('.');
    } else {
      time = '00:00:00';
    }
    const arr = `${date} ${time}`.split(/[- :]/);
    const d = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
    const utc = d.getTime();
    const offset = d.getTimezoneOffset() * 60 * 1000;
    const tempDate = new Date(utc - offset);
    timeWithSuffix = getTimeWithSuffix(tempDate, locale, suffix);
  } else if (unit === 'epoch' && value) {
    const tempDate = new Date(value);
    return getTimeWithSuffix(tempDate, locale, suffix);
  }

  return (
    // BASIC_TRANSLATION[localStorage.language || 'ar']
    <span className={className} style={style}>
      {timeWithSuffix || sec2time(timeInSec, withHour)}
    </span>
  );
}
