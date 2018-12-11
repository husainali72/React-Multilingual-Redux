export const CHECK_INVALIDATION_INTERVAL = 5; // in mins;
export const TOAST_DEFAULT_DISMISS_TIME = 5; // in seconds
export const DISABLE_CHAT_SUPPORT_PAGES = ['egypt', 'global', 'class'];
export const DO_NOT_REMOVE_TOKEN_PAGES = ['/password-reset', '/verify-email'];
export const SHOW_QUICK_ACTION_MENU = ['home', 'study', 'flashcard', 'practice'];
export const LOADING_TIMEOUT = 300; // in milli seconds
export const RTL_LOCALE = ['ar', 'ar_Gg'];
export const FB_ID = '1687890221530435';
export const ANDROID_APP_LINK = 'https://play.google.com/store/apps/details?id=com.hbwEdu.k12App';
export const IOS_APP_LINK = 'https://itunes.apple.com/us/app/id1214874641';
export const DEFAULT_COUNTRY = {
  id: 1,
  calling_code: '91',
  capital: 'New Delhi',
  currency: 'Indian rupee',
  currency_sub_unit: 'halala',
  currency_symbol: '﷼',
  emblem: 'https://cdn.non.sa/images/emblem//FILE_1522315602022_20609_SA_SA.png',
  flag: 'https://cdn.non.sa/images/flags/FILE_1522495068124_20609_SA_SA.png',
  full_name: 'Kingdom of Saudi Arabia',
  iso_code: 'SA',
  locale: 'ar',
  name: 'السعودية',
};
/* eslint-disable */
export const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
/* phont pattern by country id */
export const PHONE_PATTERN = {
  DEFAULT: /\d{8}/,
  1: /^5\d{8}$/,
};
/* eslint-enable */

export const COLORS = {
  brand: {
    base: '#18a2d5',
    dark: '#0b9bd0',
    light: '#4fc1e9',
  },
  red: {
    base: '#ef4438',
    dark: '#e22012',
    light: '#f37067',
  },
  green: {
    base: '#9dd163',
    dark: '#84c53c',
    light: '#b6dd8a',
  },
  text: {
    base: '#586774',
    light: '#919a9e',
    dark: '#222c3c',
  },
};

export const BASIC_TRANSLATION = {
  en: {
    AM: 'AM',
    PM: 'PM',
    TODAY: 'Today',
    TOMMOROW: 'Tomorrow',
  },
  ar: {
    AM: 'صباحا',
    PM: 'مساءا',
    TODAY: 'اليوم',
    TOMMOROW: 'غدا',
  },
  ar_Eg: {
    AM: 'صباحا',
    PM: 'مساءا',
    TODAY: 'اليوم',
    TOMMOROW: 'غدا',
  },
};

export const getSelectedCountry = () => {
  const countries = JSON.parse(localStorage.getItem('country')) || {};
  if (localStorage.user) {
    const user = JSON.parse(localStorage.user);
    const selectedCountry = countries.filter(o => o.id === user.country_id);
    countries.selectedCountry = selectedCountry.length ? selectedCountry : DEFAULT_COUNTRY;
    return countries.selectedCountry;
  }
  return countries.selectedCountry && countries.selectedCountry.id !== 123
    ? countries.selectedCountry
    : DEFAULT_COUNTRY;
};

export const getCountryId = () => {
  const selectedCountry = getSelectedCountry();
  return selectedCountry.id;
};
