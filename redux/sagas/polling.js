import { put, call, take, takeEvery, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { START_POLLING, STOP_POLLING } from '../constants';

function* pollingWorker({ payload }) {
  const { time, type, data = {} } = payload;
  while (true) {
    yield delay(time * 1000 || 30000);
    yield put({ type, payload: data });
  }
}
function* startPoll(data) {
  yield race([call(pollingWorker, data), take(STOP_POLLING)]);
}
export function* pollingSaga() {
  yield takeEvery(START_POLLING, startPoll);
}
