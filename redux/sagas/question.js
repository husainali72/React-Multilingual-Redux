import { put, call, takeEvery, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { questionApi } from '../restApi';
import {
  GET_QUESTION,
  SAVE_CHOICE,
  QUESTION_LIST_WITH_USER_RESULT,
  QUESTION_LOGGER,
  UPDATE_QUESTION_LOGGER,
  TEST_HISTORY,
} from '../constants';

const getQuestionAPI = id => questionApi.get(`questions/${id}`);
const saveChoiceAPI = data => questionApi.post('questionLoggerEntryForCategory', data);
const questionListWithUserResultAPI = ({ folderId }) => questionApi.get(`questionListWithUserResult/${folderId}`);
const questionLoggerAPI = data => questionApi.post('questionLogger', data);
const updateQuestionLoggerAPI = ({ question_id, ...rest }) => questionApi.put(`questionLogger/${question_id}`, rest);
const testHistoryAPI = testLoggerId => questionApi.get(`testHistory/${testLoggerId}`);

const geQuestion = state => state.toJS().question;

function* getQuestion({ payload: id }) {
  try {
    const response = yield call(getQuestionAPI, id);
    if (response.data.success) {
      yield put({
        type: GET_QUESTION.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: GET_QUESTION.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_QUESTION.FAILURE, payload: err });
  }
}

function* saveChoice({ payload: data }) {
  try {
    const response = yield call(saveChoiceAPI, data);
    if (response.data && response.data.success) {
      yield put({
        type: SAVE_CHOICE.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: SAVE_CHOICE.FAILURE, payload: 'error' });
    }
  } catch (err) {
    yield put({ type: SAVE_CHOICE.FAILURE, payload: err });
  }
}

function* questionListWithUserResult({ payload }) {
  try {
    const response = yield call(questionListWithUserResultAPI, payload);
    if (response.data.success) {
      yield put({
        type: QUESTION_LIST_WITH_USER_RESULT.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: QUESTION_LIST_WITH_USER_RESULT.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: QUESTION_LIST_WITH_USER_RESULT.FAILURE, payload: err });
  }
}

function* questionLogger({ payload }) {
  try {
    const response = yield call(questionLoggerAPI, payload);
    if (response.data.success) {
      const result = isEmpty(response.data.data) ? [] : response.data.data;
      if (result.length) {
        const { questionListWithUserResult, testHistory } = yield select(geQuestion);
        if (testHistory.length && payload.test_logger_id) {
          const index = testHistory.findIndex(o => o.question_id === payload.question_id);
          if (index >= 0) {
            testHistory[index] = {
              ...testHistory[index],
              time_spent: payload.time_spent,
            };
            yield put({
              type: TEST_HISTORY.SUCCESS,
              payload: testHistory,
            });
          }
        }
        if (questionListWithUserResult.length && !payload.test_logger_id) {
          const index = questionListWithUserResult.findIndex(o => o.id === payload.question_id);
          if (index >= 0) {
            questionListWithUserResult[index].userResult = {
              ...result[0],
            };
            yield put({
              type: QUESTION_LIST_WITH_USER_RESULT.SUCCESS,
              payload: questionListWithUserResult,
            });
          }
        }
      }
      yield put({
        type: QUESTION_LOGGER.SUCCESS,
        payload: result,
      });
    } else {
      yield put({ type: QUESTION_LOGGER.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: QUESTION_LOGGER.FAILURE, payload: err });
  }
}

function* updateQuestionLogger({ payload }) {
  try {
    const response = yield call(updateQuestionLoggerAPI, payload);
    if (response.data.success) {
      const result = isEmpty(response.data.data) ? [] : response.data.data[0];
      if (result) {
        const { questionListWithUserResult, testHistory } = yield select(geQuestion);
        if (testHistory.length) {
          const index = testHistory.findIndex(o => o.id === payload.question_id);
          if (index >= 0) {
            testHistory[index] = {
              ...testHistory[index],
              time_spent: payload.time_spent,
              result_time_spent: payload.result_time_spent,
            };
            yield put({
              type: TEST_HISTORY.SUCCESS,
              payload: testHistory,
            });
          }
        }
        if (questionListWithUserResult.length) {
          const index = questionListWithUserResult.findIndex(o => o.id === payload.question_id);
          if (index >= 0) {
            questionListWithUserResult[index].userResult = {
              ...questionListWithUserResult[index].userResult,
              time_spent: payload.time_spent,
              result_time_spent: payload.result_time_spent,
            };
            yield put({
              type: QUESTION_LIST_WITH_USER_RESULT.SUCCESS,
              payload: questionListWithUserResult,
            });
          }
        }
      }
      yield put({
        type: UPDATE_QUESTION_LOGGER.SUCCESS,
        payload: [result],
      });
    } else {
      yield put({ type: UPDATE_QUESTION_LOGGER.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: UPDATE_QUESTION_LOGGER.FAILURE, payload: err });
  }
}

function* testHistory({ payload }) {
  try {
    const response = yield call(testHistoryAPI, payload);
    if (response.data.success) {
      yield put({
        type: TEST_HISTORY.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: TEST_HISTORY.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: TEST_HISTORY.FAILURE, payload: err });
  }
}

export function* questionSaga() {
  yield [
    takeEvery(GET_QUESTION.REQUEST, getQuestion),
    takeEvery(SAVE_CHOICE.REQUEST, saveChoice),
    takeEvery(QUESTION_LIST_WITH_USER_RESULT.REQUEST, questionListWithUserResult),
    takeEvery(QUESTION_LOGGER.REQUEST, questionLogger),
    takeEvery(UPDATE_QUESTION_LOGGER.REQUEST, updateQuestionLogger),
    takeEvery(TEST_HISTORY.REQUEST, testHistory),
  ];
}
