import { put, call, takeEvery } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { schoolApi } from '../restApi';

import { SEARCH_SCHOOL } from '../constants';

const searchSchoolAPI = payload => schoolApi.get('searchSchool', payload);

function* searchSchool({ payload }) {
  try {
    const response = yield call(searchSchoolAPI, { section: '', grade: 0, s: '', ...payload });
    if (response.data.success) {
      yield put({
        type: SEARCH_SCHOOL.SUCCESS,
        payload: isEmpty(response.data.data) ? { page: 1, list: [] } : { page: payload.page, list: response.data.data },
      });
    } else {
      yield put({ type: SEARCH_SCHOOL.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: SEARCH_SCHOOL.FAILURE, payload: err });
  }
}

export function* schoolSaga() {
  yield [takeEvery(SEARCH_SCHOOL.REQUEST, searchSchool)];
}
