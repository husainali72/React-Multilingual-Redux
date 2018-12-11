import { put, call, takeEvery } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { translationApi } from '../restApi';
import { GET_TRANSLATION } from '../constants';

const getTranslationAPI = json => translationApi.post('translate/', json);

function* getTranslation({ payload: json }) {
  try {
    const response = yield call(getTranslationAPI, json);
    if (response.data.success) {
      yield put({
        type: GET_TRANSLATION.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: GET_TRANSLATION.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_TRANSLATION.FAILURE, payload: err });
  }
}

export function* translationSaga() {
  yield [takeEvery(GET_TRANSLATION.REQUEST, getTranslation)];
}
