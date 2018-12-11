import { put, call, takeEvery } from 'redux-saga/effects';
import { notificationApi } from '../restApi';
import { USER_PUSH_TOKEN, USER_PUSH_TOKEN_DELETE } from '../constants';

const userPushTokenApi = data => notificationApi.post('userPushToken/', data);
const userPushTokenDeleteApi = data => notificationApi.delete('userPushToken/', {}, { data });

function* userPushToken({ payload: token }) {
  try {
    const response = yield call(userPushTokenApi, { token, device: 'browser', app_name: 'hbw_student_app' });
    if (response.data.success) {
      yield put({
        type: USER_PUSH_TOKEN.SUCCESS,
        payload: true,
      });
    } else {
      yield put({ type: USER_PUSH_TOKEN.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: USER_PUSH_TOKEN.FAILURE, payload: err });
  }
}

function* userPushTokenDelete() {
  try {
    const response = yield call(userPushTokenDeleteApi, { device: 'browser', app_name: 'hbw_student_app' });
    if (response.data.success) {
      yield put({
        type: USER_PUSH_TOKEN_DELETE.SUCCESS,
        payload: false,
      });
    } else {
      yield put({ type: USER_PUSH_TOKEN_DELETE.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: USER_PUSH_TOKEN_DELETE.FAILURE, payload: err });
  }
}


export function* notificationSaga() {
  yield [takeEvery(USER_PUSH_TOKEN.REQUEST, userPushToken)];
  yield [takeEvery(USER_PUSH_TOKEN_DELETE.REQUEST, userPushTokenDelete)];
}
