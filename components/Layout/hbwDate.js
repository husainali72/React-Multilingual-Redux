import React from 'react';
import { DateTime } from 'luxon';
import { BASIC_TRANSLATION } from '../../constants';

export default function HBWDate(prop) {
  const { value, humanize, short, ...rest } = prop;
  const locale = localStorage.language;
  let finalDate = '';
  if (value) {
    const dt = DateTime.fromISO(value);
    const today = DateTime.local();
    const nextDay = today.plus({ day: 1 });
    finalDate = short ? dt.setLocale(locale).toFormat('d LLL') : dt.setLocale(locale).toFormat('cccc, d LLLL');
    if (humanize && dt.hasSame(today, 'day')) {
      finalDate = BASIC_TRANSLATION[locale].TODAY;
    } else if (humanize && dt.hasSame(nextDay, 'day')) {
      finalDate = BASIC_TRANSLATION[locale].TOMMOROW;
    }
  }
  return <span {...rest}>{finalDate}</span>;
}
