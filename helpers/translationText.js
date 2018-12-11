import merge from 'lodash/merge';
import debounce from 'lodash/debounce';
import difference from 'lodash/difference';
import { store } from '../app';
import { GET_TRANSLATION } from '../redux/constants';

// const getDifference = (old, newText) => {
//   const temp = {};
//   for (const k in newText) {
//     if (old[k]) {
//       const diff = difference(newText[k], Object.keys(old[k]));
//       if (diff.length) {
//         temp[k] = diff;
//       }
//     } else if (newText[k] && newText[k].length) {
//       temp[k] = newText[k];
//     }
//   }
//   return temp;
// };

const getTranslation = (json) => {
  store.dispatch({ type: GET_TRANSLATION.REQUEST, payload: json });
};

const debounceQuery = debounce(getTranslation, 50);

const getText = (hbwTranslate, param) => {
  const params = param.split('.');
  let translate = hbwTranslate || {};
  for (const p of params) {
    if (translate[p]) {
      translate = translate[p];
    } else {
      translate = '';
      break;
    }
  }
  return translate;
};

export default function translationText(allTexts, param) {
  const params = param.split('.');
  const locale = {
    locale: localStorage.getItem('language') || 'ar',
  };
  const oldTranslation = JSON.parse(localStorage.getItem('translation'));
  if (oldTranslation && oldTranslation.locale !== locale.locale) {
    debounceQuery(merge(oldTranslation, locale));
  }
  const translations = merge(oldTranslation, locale);
  if (translations[params[0]]) {
    if (translations[params[0]].indexOf(params[1]) === -1) {
      translations[params[0]].push(params[1]);
      debounceQuery(translations);
    }
  } else {
    translations[params[0]] = [params[1]];
    debounceQuery(translations);
  }
  localStorage.setItem('translation', JSON.stringify(translations));
  return getText(allTexts, param) || ' ';
}

export function addTranslation(param) {
  const params = param.split('.');
  const locale = {
    locale: localStorage.getItem('language') || 'ar',
  };
  const oldTranslation = JSON.parse(localStorage.getItem('translation'));
  const translations = merge(oldTranslation, locale);
  if (translations[params[0]]) {
    if (translations[params[0]].indexOf(params[1]) === -1) {
      translations[params[0]].push(params[1]);
    }
  } else {
    translations[params[0]] = [params[1]];
  }
  localStorage.setItem('translation', JSON.stringify(translations));
}
