import { put, call, take, takeEvery, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { START_TIMER, STOP_TIMER, RESET_TIMER, SET_TIMER } from '../constants';

function* timerWorker({ payload }) {
  const { startTime, antiClockwise } = payload;
  while (true) {
    yield delay(startTime * 1000);
    const time = antiClockwise ? -startTime : startTime;
    yield put({ type: SET_TIMER, payload: time });
  }
}

function* resetTimer() {
  yield put({ type: RESET_TIMER });
}

function* startTimer(data) {
  yield race([call(timerWorker, data), take(RESET_TIMER, resetTimer), take(STOP_TIMER)]);
}

export function* timerSaga() {
  yield takeEvery(START_TIMER, startTimer);
}
