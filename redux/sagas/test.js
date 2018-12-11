import { put, call, takeEvery } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { testApi } from '../restApi';

import {
  LAST_VALID_TEST_QUESTIONS,
  TEST_LOGGER,
  TEST_LOGGER_START,
  LEADER_BOARD,
  TEST_BY_TYPE_WITH_SECTION_WITH_RESULT,
  TEST_BY_ID_WITH_SECTION_WITH_RESULT,
} from '../constants';

const lastValidTestQuestionsAPI = ({ testType, queryParams }) =>
  testApi.get(`lastValidTestQuestions/${testType}`, queryParams);
const testLoggerAPI = ({ testLoggerId, ...rest }) => testApi.put(`testLogger/${testLoggerId}`, rest);
const testLoggerStartAPI = ({ testSectionId, folderIds, isRetest }) =>
  testApi.get(`testLoggerStart/${testSectionId}`, { folder_ids: folderIds, isRetest });
const leaderBoardAPI = ({ idOrType, queryParams }) => testApi.get(`leaderBoard/${idOrType}`, queryParams);
const testByTypeWithSectionWithResultAPI = ({ type, folderId }) =>
  testApi.get(`testByTypeWithSectionWithResult/${type}`, { folder_ids: folderId });
const testByIdWithSectionWithResultAPI = ({ id, queryParams }) =>
  testApi.get(`testByIdWithSectionWithResult/${id}`, queryParams);

function* lastValidTestQuestions({ payload }) {
  try {
    const response = yield call(lastValidTestQuestionsAPI, payload);
    if (response.data.success) {
      yield put({
        type: LAST_VALID_TEST_QUESTIONS.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: LAST_VALID_TEST_QUESTIONS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: LAST_VALID_TEST_QUESTIONS.FAILURE, payload: err });
  }
}

function* testLogger({ payload }) {
  try {
    const response = yield call(testLoggerAPI, payload);
    if (response.data.success) {
      yield put({
        type: TEST_LOGGER.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: TEST_LOGGER.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: TEST_LOGGER.FAILURE, payload: err });
  }
}

function* testLoggerStart({ payload }) {
  try {
    const response = yield call(testLoggerStartAPI, payload);
    if (response.data.success) {
      yield put({
        type: TEST_LOGGER_START.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: TEST_LOGGER_START.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: TEST_LOGGER_START.FAILURE, payload: err });
  }
}

function* leaderBoard({ payload }) {
  try {
    const response = yield call(leaderBoardAPI, payload);
    if (response.data.success) {
      yield put({
        type: LEADER_BOARD.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: LEADER_BOARD.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: LEADER_BOARD.FAILURE, payload: err });
  }
}

function* testByTypeWithSectionWithResult({ payload }) {
  try {
    const response = yield call(testByTypeWithSectionWithResultAPI, payload);
    if (response.data.success) {
      yield put({
        type: TEST_BY_TYPE_WITH_SECTION_WITH_RESULT.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: TEST_BY_TYPE_WITH_SECTION_WITH_RESULT.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: TEST_BY_TYPE_WITH_SECTION_WITH_RESULT.FAILURE, payload: err });
  }
}

function* testByIdWithSectionWithResult({ payload }) {
  try {
    const response = yield call(testByIdWithSectionWithResultAPI, payload);
    if (response.data.success) {
      yield put({
        type: TEST_BY_ID_WITH_SECTION_WITH_RESULT.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: TEST_BY_ID_WITH_SECTION_WITH_RESULT.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: TEST_BY_ID_WITH_SECTION_WITH_RESULT.FAILURE, payload: err });
  }
}

export function* testSaga() {
  yield [
    takeEvery(LAST_VALID_TEST_QUESTIONS.REQUEST, lastValidTestQuestions),
    takeEvery(TEST_LOGGER.REQUEST, testLogger),
    takeEvery(TEST_LOGGER_START.REQUEST, testLoggerStart),
    takeEvery(LEADER_BOARD.REQUEST, leaderBoard),
    takeEvery(TEST_BY_TYPE_WITH_SECTION_WITH_RESULT.REQUEST, testByTypeWithSectionWithResult),
    takeEvery(TEST_BY_ID_WITH_SECTION_WITH_RESULT.REQUEST, testByIdWithSectionWithResult),
  ];
}
