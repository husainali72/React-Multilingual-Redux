import { put, call, takeEvery } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { fileApi } from '../restApi';
import { GET_EMOJI, GET_OURTEAM_MEMBER, GET_ACTIVE_JOBS, UPLOAD_FILE } from '../constants';

const getEmojiAPI = () => fileApi.get('smileys');
const listOurTeamMemberAPI = () => fileApi.get('teamsWithMembers');
const listActiveJobsAPI = () => fileApi.get('activeJobs');
const uploadFileAPI = payload => fileApi.post('files', payload);

function* uploadFile({ payload }) {
  try {
    const response = yield call(uploadFileAPI, payload);
    if (response.ok && response.data.success) {
      yield put({
        type: UPLOAD_FILE.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.meta,
      });
    } else {
      yield put({ type: UPLOAD_FILE.FAILURE, payload: 'NETWORK_ERROR' });
    }
  } catch (err) {
    yield put({ type: UPLOAD_FILE.FAILURE, payload: err });
  }
}

function* getEmojies() {
  try {
    const response = yield call(getEmojiAPI);
    if (response.data.success) {
      yield put({
        type: GET_EMOJI.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: GET_EMOJI.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_EMOJI.FAILURE, payload: err });
  }
}

function* listOurTeamMember() {
  try {
    const response = yield call(listOurTeamMemberAPI);
    if (response.data.success) {
      response.data.data.sort((a, b) => (a.order < b.order ? -1 : 1));
      yield put({
        type: GET_OURTEAM_MEMBER.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: GET_OURTEAM_MEMBER.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_OURTEAM_MEMBER.FAILURE, payload: err });
  }
}

function* listActiveJobs() {
  try {
    const response = yield call(listActiveJobsAPI);
    if (response.data.success) {
      yield put({
        type: GET_ACTIVE_JOBS.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: GET_ACTIVE_JOBS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_ACTIVE_JOBS.FAILURE, payload: err });
  }
}

export function* fileSaga() {
  yield [takeEvery(GET_OURTEAM_MEMBER.REQUEST, listOurTeamMember)];
  yield [takeEvery(GET_EMOJI.REQUEST, getEmojies)];
  yield [takeEvery(UPLOAD_FILE.REQUEST, uploadFile)];
  yield [takeEvery(GET_ACTIVE_JOBS.REQUEST, listActiveJobs)];
}
