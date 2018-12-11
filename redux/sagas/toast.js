import { put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { ADD_TOAST, REMOVE_TOAST } from '../constants';

function* addToast({ payload: data }) {
  const { time, id } = data;
  if (time) {
    yield delay(time);
    yield put({ type: REMOVE_TOAST, payload: id });
  }
}

export function* toastSaga() {
  yield [takeEvery(ADD_TOAST, addToast)];
}
