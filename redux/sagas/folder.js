import { put, call, takeEvery } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { folderApi } from '../restApi';
import { getCountryId } from '../../constants';
import {
  GET_MAIN_FOLDERS,
  GET_FOLDER_BY_ID,
  LIST_PRODUCTS,
  LIST_COUNTRY,
  GET_CHILDREN,
  SEARCH_REGIONS,
  SEARCH_CITIES,
} from '../constants';

const listGradesAPI = productId => folderApi.get(`getMainFolders/${productId}`);
const getFolderByIdAPI = folderId => folderApi.get(`folders/${folderId}`);
const listProductAPI = ({ countryId, payload }) => folderApi.get(`productsOfCountry/${countryId}`, payload);
const regionSearchAPI = payload => folderApi.get(`regions/${payload.country_id}`, payload);
const citySearchAPI = payload => folderApi.get(`cities/${payload.country_id}`, payload);
const listCountryAPI = () => folderApi.get('countries');
const getChildrenAPI = folderId => folderApi.get(`getChildren/${folderId}`);

function* listGrades({ payload: productId }) {
  try {
    const response = yield call(listGradesAPI, productId);
    if (response.data.success) {
      yield put({
        type: GET_MAIN_FOLDERS.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: GET_MAIN_FOLDERS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_MAIN_FOLDERS.FAILURE, payload: err });
  }
}

function* folderDetailsById({ payload: folderId }) {
  try {
    const response = yield call(getFolderByIdAPI, folderId);
    if (response.data.success) {
      yield put({
        type: GET_FOLDER_BY_ID.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : { [folderId]: response.data.data },
      });
    } else {
      yield put({ type: GET_FOLDER_BY_ID.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_FOLDER_BY_ID.FAILURE, payload: err });
  }
}

function* listProducts({ payload }) {
  try {
    const response = yield call(listProductAPI, { countryId: 1 /* getCountryId() */, payload });
    if (response.data.success) {
      const productsAllowed = [];
      for (const i in response.data.data) {
        if ([1, 2, 3, 5, 7].indexOf(response.data.data[i].id) > -1) {
          productsAllowed.push(response.data.data[i]);
        }
      }
      yield put({
        type: LIST_PRODUCTS.SUCCESS,
        payload: productsAllowed,
      });
    } else {
      yield put({ type: LIST_PRODUCTS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: LIST_PRODUCTS.FAILURE, payload: err });
  }
}

function* regionSearch({ payload }) {
  try {
    const response = yield call(regionSearchAPI, payload);
    if (response.data.success) {
      yield put({
        type: SEARCH_REGIONS.SUCCESS,
        payload: isEmpty(response.data.data) ? { page: 1, list: [] } : { page: payload.page, list: response.data.data },
      });
    } else {
      yield put({ type: SEARCH_REGIONS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: SEARCH_REGIONS.FAILURE, payload: err });
  }
}

function* citySearch({ payload }) {
  try {
    const response = yield call(citySearchAPI, payload);
    if (response.data.success) {
      yield put({
        type: SEARCH_CITIES.SUCCESS,
        payload: isEmpty(response.data.data) ? { page: 1, list: [] } : { page: payload.page, list: response.data.data },
      });
    } else {
      yield put({ type: SEARCH_CITIES.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: SEARCH_CITIES.FAILURE, payload: err });
  }
}

function* listCountry() {
  try {
    const response = yield call(listCountryAPI);
    if (response.data.success) {
      let countryList = response.data.data;
      const selectedCountry = response.data.meta;
      if (!isEmpty(selectedCountry)) {
        countryList = [...countryList.filter(country => country.id !== selectedCountry.id), selectedCountry];
      }
      // if (!localStorage.language) localStorage.language = selectedCountry.locale;
      yield put({
        type: LIST_COUNTRY.SUCCESS,
        payload: { countryList, selectedCountry },
      });
    } else {
      yield put({ type: LIST_COUNTRY.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: LIST_COUNTRY.FAILURE, payload: err });
  }
}

function* getChildren({ payload: folderId }) {
  try {
    const response = yield call(getChildrenAPI, folderId);
    if (response.data.success) {
      yield put({
        type: GET_CHILDREN.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : { [folderId]: response.data.data },
      });
    } else {
      yield put({ type: GET_CHILDREN.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_CHILDREN.FAILURE, payload: err });
  }
}

export function* folderSaga() {
  yield [
    takeEvery(LIST_COUNTRY.REQUEST, listCountry),
    takeEvery(GET_MAIN_FOLDERS.REQUEST, listGrades),
    takeEvery(GET_FOLDER_BY_ID.REQUEST, folderDetailsById),
    takeEvery(LIST_PRODUCTS.REQUEST, listProducts),
    takeEvery(GET_CHILDREN.REQUEST, getChildren),
    takeEvery(SEARCH_REGIONS.REQUEST, regionSearch),
    takeEvery(SEARCH_CITIES.REQUEST, citySearch),
  ];
}
