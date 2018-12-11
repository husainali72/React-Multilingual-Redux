import { put, call, takeEvery } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { elasticApi } from '../restApi';
import {
  GET_ELASTIC,
  CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID,
  FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID,
  USER_ELASTIC_DATA,
  UPDATE_USER_ELASTIC_DATA,
  CREATE_USER_ELASTIC_DATA,
  GET_CURRICULUM,
} from '../constants';

const getUserDataAPI = slug => elasticApi.get(`userElasticData/${slug}`);
const childrenTreeWithProgressForFolderIdAPI = ({ product_slug, folder_id }) =>
  elasticApi.get(`childrenTreeWithProgressForFolderId/${folder_id}?product_slug=${product_slug}`);
const folderTreeWithProgressForProductIdAPI = ({ product_id, product_slug }) =>
  elasticApi.get(`folderTreeWithProgressForProductId/${product_id}?product_slug=${product_slug}`);
const userElasticDataAPI = product_slug => elasticApi.get(`userElasticData/${product_slug}`);
const updateUserElasticDataAPI = ({ product_slug, ...rest }) => elasticApi.put(`userElasticData/${product_slug}`, rest);
const createUserElasticDataAPI = ({ product_slug, userData }) =>
  elasticApi.post(`userElasticData/${product_slug}`, userData);

function* getUserData({ payload: slug }) {
  try {
    const response = yield call(getUserDataAPI, slug);
    if (response.data.success) {
      yield put({
        type: GET_ELASTIC.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: GET_ELASTIC.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_ELASTIC.FAILURE, payload: err });
  }
}

function* childrenTreeWithProgressForFolderId({ payload }) {
  try {
    const response = yield call(childrenTreeWithProgressForFolderIdAPI, payload);
    if (response.data.success) {
      yield put({
        type: CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID.FAILURE, payload: err });
  }
}

function* folderTreeWithProgressForProductId({ payload }) {
  try {
    const response = yield call(folderTreeWithProgressForProductIdAPI, payload);
    if (response.data.success) {
      yield put({
        type: FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID.FAILURE, payload: err });
  }
}

function* userElasticData({ payload: slug }) {
  try {
    const response = yield call(userElasticDataAPI, slug);
    if (response.data.success) {
      yield put({
        type: USER_ELASTIC_DATA.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: USER_ELASTIC_DATA.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: USER_ELASTIC_DATA.FAILURE, payload: err });
  }
}

function* updateUserElasticData({ payload }) {
  try {
    const response = yield call(updateUserElasticDataAPI, payload);
    if (response.ok) {
      yield put({
        type: UPDATE_USER_ELASTIC_DATA.SUCCESS,
        payload: { success: response.status === 204 },
      });
    } else {
      yield put({
        type: UPDATE_USER_ELASTIC_DATA.FAILURE,
        payload: 'error',
      });
    }
  } catch (err) {
    yield put({ type: UPDATE_USER_ELASTIC_DATA.FAILURE, payload: err });
  }
}

function* createUserElasticData({ payload }) {
  try {
    const response = yield call(createUserElasticDataAPI, payload);
    if (response.ok) {
      yield put({
        type: CREATE_USER_ELASTIC_DATA.SUCCESS,
        payload: { success: response.status === 200 },
      });
    } else {
      yield put({
        type: CREATE_USER_ELASTIC_DATA.FAILURE,
        payload: 'error',
      });
    }
  } catch (err) {
    yield put({ type: CREATE_USER_ELASTIC_DATA.FAILURE, payload: err });
  }
}

function* getCurriculum({ payload }) {
  try {
    const response = payload.folder_id
      ? yield call(childrenTreeWithProgressForFolderIdAPI, payload)
      : yield call(folderTreeWithProgressForProductIdAPI, payload);

    if (response.data.success) {
      let curriculum = [];
      if (!isEmpty(response.data.data)) {
        if (payload.folder_id) {
          curriculum = response.data.data || [];
        } else {
          response.data.data.map((section) => {
            curriculum.push(...section.nodes);
          });
        }
      }
      yield put({
        type: UPDATE_USER_ELASTIC_DATA.REQUEST,
        payload: {
          product_slug: payload.product_slug,
          semester_id: payload.folder_id,
          semester_name: payload.semester_name,
        },
      });
      yield put({
        type: GET_CURRICULUM.SUCCESS,
        payload: curriculum,
      });
    } else {
      yield put({
        type: GET_CURRICULUM.FAILURE,
        payload: 'api error',
      });
    }
  } catch (err) {
    yield put({ type: GET_CURRICULUM.FAILURE, payload: err });
  }
}

export function* elasticSaga() {
  yield [
    takeEvery(GET_ELASTIC.REQUEST, getUserData),
    takeEvery(CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID.REQUEST, childrenTreeWithProgressForFolderId),
    takeEvery(FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID.REQUEST, folderTreeWithProgressForProductId),
    takeEvery(USER_ELASTIC_DATA.REQUEST, userElasticData),
    takeEvery(UPDATE_USER_ELASTIC_DATA.REQUEST, updateUserElasticData),
    takeEvery(CREATE_USER_ELASTIC_DATA.REQUEST, createUserElasticData),
    takeEvery(GET_CURRICULUM.REQUEST, getCurriculum),
  ];
}
