import { put, call, takeEvery, select, take, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import isEmpty from 'lodash/isEmpty';
import { flashcardApi } from '../restApi';
import {
  GET_FLASHCARD,
  FLASH_CARD_IMAGE_USER,
  UPDATE_FLASH_CARD_IMAGE_USER,
  FLASH_CARD_IMAGE,
  GET_RANDOM_QUESTION,
  UPDATE_FLASH_CARD_VIEW_DATA,
  POLL_START_UPDATE_FLASH_CARD_IMAGE_USER,
  POLL_STOP_UPDATE_FLASH_CARD_IMAGE_USER,
} from '../constants';
import { FLASHCARD_POLLING_TIME, FLASHCARD_MAX_POLLING_TIME } from '../../constants';
import { formatSecondsToString, formatStringToSeconds } from '../../helpers';

const getFlashcardAPI = id => flashcardApi.get(`flashcardImagesByLeafId/${id}`);
const flashcardImageUserAPI = flashcardImageId => flashcardApi.get(`flashcardImageUser/${flashcardImageId}`);
const updateFlashcardImageUserAPI = ({ flashcardImageId, view, product_name, folder_id, time_spent }) =>
  flashcardApi.put(`flashcardImageUser/${flashcardImageId}`, { view, product_name, folder_id, time_spent });
const flashcardImageAPI = flashcardImageId => flashcardApi.get(`flashcardImage/${flashcardImageId}`);
const getRandomQuestionAPI = ({ flashcardId, flashcardData }) =>
  flashcardApi.get(`getRandomQuestion/${flashcardId}`, flashcardData);

const getFlashcardView = state => state.toJS().flashcard.flashcardView;
const selectedProduct = state => state.toJS().dashboard.selectedProduct;

function* updateFlashcardImageUser({ payload }) {
  try {
    const response = yield call(updateFlashcardImageUserAPI, payload);
    if (response.data.success) {
      yield put({
        type: UPDATE_FLASH_CARD_IMAGE_USER.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: UPDATE_FLASH_CARD_IMAGE_USER.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: UPDATE_FLASH_CARD_IMAGE_USER.FAILURE, payload: err });
  }
}

function* pollUpdateFlashcardImageUser() {
  while (true) {
    yield call(delay, FLASHCARD_POLLING_TIME * 1000);
    const flashcardView = yield select(getFlashcardView);
    const { selectedId, views, timeSpent, productName: product_name, folderId: folder_id } = flashcardView;
    if (timeSpent && formatStringToSeconds(timeSpent[selectedId]) >= FLASHCARD_MAX_POLLING_TIME) {
      console.log('stop polling');
      yield put({ type: POLL_STOP_UPDATE_FLASH_CARD_IMAGE_USER });
    }
    yield call(updateFlashcardImageUser, {
      payload: {
        flashcardImageId: selectedId,
        view: views[selectedId],
        product_name,
        folder_id,
        time_spent: formatSecondsToString(formatStringToSeconds(timeSpent[selectedId]) + FLASHCARD_POLLING_TIME),
      },
    });
    yield put({
      type: UPDATE_FLASH_CARD_VIEW_DATA.SUCCESS,
      payload: {
        ...flashcardView,
        timeSpent: {
          ...flashcardView.timeSpent,
          [selectedId]: formatSecondsToString(formatStringToSeconds(timeSpent[selectedId]) + FLASHCARD_POLLING_TIME),
        },
      },
    });
  }
}

function* startPollUpdateFlashcardImageUser() {
  yield race([call(pollUpdateFlashcardImageUser), take(POLL_STOP_UPDATE_FLASH_CARD_IMAGE_USER)]);
}

function* getFlashcards({ payload: id }) {
  try {
    const response = yield call(getFlashcardAPI, id);
    if (response.data.success) {
      yield put({
        type: GET_FLASHCARD.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
      const product = yield select(selectedProduct);
      yield put({
        type: UPDATE_FLASH_CARD_VIEW_DATA.SUCCESS,
        payload: {
          selectedIndex: 0,
          selectedId: response.data.data[0].id,
          folderId: id,
          productName: product.slug,
          views: {},
          timeSpent: {},
        },
      });
    } else {
      yield put({ type: GET_FLASHCARD.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_FLASHCARD.FAILURE, payload: err });
  }
}

function* flashcardImageUser({ payload: flashcardImageId }) {
  try {
    const response = yield call(flashcardImageUserAPI, flashcardImageId);
    if (response.data.success) {
      yield put({
        type: FLASH_CARD_IMAGE_USER.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : { ...response.data.data[0], flashcardImageId },
      });
    } else {
      yield put({ type: FLASH_CARD_IMAGE_USER.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: FLASH_CARD_IMAGE_USER.FAILURE, payload: err });
  }
}

function* flashcardImage({ payload: flashcardImageId }) {
  try {
    const response = yield call(flashcardImageAPI, flashcardImageId);
    if (response.data.success) {
      yield put({
        type: FLASH_CARD_IMAGE.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: FLASH_CARD_IMAGE.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: FLASH_CARD_IMAGE.FAILURE, payload: err });
  }
}

function* getRandomQuestion({ payload }) {
  try {
    const response = yield call(getRandomQuestionAPI, payload);
    if (response.data.success) {
      yield put({
        type: GET_RANDOM_QUESTION.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: GET_RANDOM_QUESTION.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_RANDOM_QUESTION.FAILURE, payload: err });
  }
}

export function* flashcardSaga() {
  yield [
    takeEvery(GET_FLASHCARD.REQUEST, getFlashcards),
    takeEvery(FLASH_CARD_IMAGE_USER.REQUEST, flashcardImageUser),
    takeEvery(UPDATE_FLASH_CARD_IMAGE_USER.REQUEST, updateFlashcardImageUser),
    takeEvery(FLASH_CARD_IMAGE.REQUEST, flashcardImage),
    takeEvery(GET_RANDOM_QUESTION.REQUEST, getRandomQuestion),
    takeEvery(POLL_START_UPDATE_FLASH_CARD_IMAGE_USER, startPollUpdateFlashcardImageUser),
  ];
}
