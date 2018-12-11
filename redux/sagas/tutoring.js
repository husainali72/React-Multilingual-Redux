import { put, call, takeEvery, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { tutoringApi } from '../restApi';
import { store } from '../../app';
import { getCountryId } from '../../constants';
import {
  GET_CLASS,
  GET_TEACHERLIST,
  SEARCHING_TEACHER_FOR_CLASS,
  VOTE_TEACHER,
  UNSUBSCRIBE_COURSES,
  SUBSCRIBE_COURSES,
  COURSES,
  UPCOMING_GROUP_TUTORING,
  MY_SCHEDULED_SESSION,
  SUBSCRIBE_GROUP_TUTORING,
  UNSUBSCRIBE_GROUP_TUTORING,
  CREDIT_DETAIL,
  CREATE_CLASS,
  ONDEMAND_SESSION,
  TIMELINE,
  UPCOMING_TEACHER_SESSION,
  MY_LIVE_SESSION,
  FEATURED_SESSION,
} from '../constants';

const getClassAPI = id => tutoringApi.get(`getClass/${id}`);
const getTeachersAPI = folder_ids => tutoringApi.get(`teachersOfFolder?folder_ids=[${folder_ids}]`);
const createTeacherRequestAPI = data => tutoringApi.post('createRequest', data);
const voteTeacherAPI = data => tutoringApi.post('rating', data);
const unsubscribeCoursesAPI = id => tutoringApi.post(`unsubscribeCourses/${id}`);
const subscribeCoursesAPI = id => tutoringApi.post(`subscribeCourses/${id}`);
const coursesAPI = data => tutoringApi.get('courses', data);
const upcomingGroupTutoringAPI = data => tutoringApi.get('upcommingGroupTutoring', data);
const liveGroupTutoringAPI = data => tutoringApi.get('liveCarouselSessions', data);
const featuredGroupTutoringAPI = data => tutoringApi.get('recommendedUpcommingGroupTutoring', data);
const subscribeGroupTutoringAPI = data => tutoringApi.post(`subscribeGroupTutoring/${data.id}`, data);
const unsubscribeGroupTutoringAPI = id => tutoringApi.post(`unsubscribeGroupTutoring/${id}`);
const creditDetailAPI = () => tutoringApi.get('creditDetail');
const createClassAPI = data => tutoringApi.post('createClass', data);

const getUser = state => state.toJS().user.loggedUser;
const getTutoring = state => state.toJS().tutoring;


function* updateSubscribeSessions(listArray, payload, type) {
  const user = yield select(getUser);
  const list = listArray;
  const index = listArray.findIndex(o => o.id === payload.id);
  if (index >= 0 && list && list.length) {
    list[index] = {
      ...list[index],
      myState: 'reserved',
      total_students: list[index].total_students + 1,
      students:
        list[index].students.length < 4
          ? [...list[index].students, { id: user.id, profile_pic: user.profile_pic }]
          : list[index].students,
    };
    yield put({
      type,
      payload: [...list],
    });
    if (FEATURED_SESSION.SUCCESS) {
      const { upcomingGroupTutoring = [] } = yield select(getTutoring);
      const upcomingIndex = upcomingGroupTutoring.findIndex(o => o.id === payload.id);
      if (upcomingIndex === -1) {
        yield put({
          type: UPCOMING_GROUP_TUTORING.SUCCESS,
          payload: [...upcomingGroupTutoring, list[index]],
        });
      }
    }
  }
}

// function* updateSubscribeSessionsWithPagination(listObject, id, type) {
//   const user = yield select(getUser);
//   const { list } = listObject;
//   const index = list.findIndex(o => o.id === id);
//   if (index >= 0 && list && list.length) {
//     list[index] = {
//       ...list[index],
//       myState: '',
//       total_students: list[index].total_students - 1,
//       students: list[index].students.length ? list[index].students.filter(o => o.id !== user.id) : [],
//     };
//     yield put({
//       type,
//       payload: { page: listObject.page, limit: listObject.limit || 20, list },
//     });
//   }
// }

function* updateUnSubscribeSessions(listArray, id, type) {
  const user = yield select(getUser);
  const list = listArray;
  const index = listArray.findIndex(o => o.id === id);
  if (index >= 0 && list && list.length) {
    list[index] = {
      ...list[index],
      myState: '',
      total_students: list[index].total_students - 1,
      students: list[index].students.length ? list[index].students.filter(o => o.id !== user.id) : [],
    };
    yield put({
      type,
      payload: [...list],
    });
  }
}

// function* updateUnSubscribeSessionsWithPagination(listObject, id, type) {
//   const user = yield select(getUser);
//   const { list } = listObject;
//   const index = list.findIndex(o => o.id === id);
//   if (index >= 0 && list && list.length) {
//     list[index] = {
//       ...list[index],
//       myState: '',
//       total_students: list[index].total_students - 1,
//       students: list[index].students.length ? list[index].students.filter(o => o.id !== user.id) : [],
//     };
//     yield put({
//       type,
//       payload: { page: listObject.page, limit: listObject.limit || 20, list },
//     });
//   }
// }

function* getClass({ payload: id }) {
  try {
    const response = yield call(getClassAPI, id);
    if (response.data.success) {
      yield put({
        type: GET_CLASS.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: GET_CLASS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_CLASS.FAILURE, payload: err });
  }
}

function* getTeachers({ payload }) {
  try {
    const response = yield call(getTeachersAPI, payload);
    if (response.data.success) {
      yield put({
        type: GET_TEACHERLIST.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: GET_TEACHERLIST.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_TEACHERLIST.FAILURE, payload: err });
  }
}

function* createTeacherRequest({ payload }) {
  try {
    const response = yield call(createTeacherRequestAPI, payload);
    if (response.data.success) {
      yield put({
        type: SEARCHING_TEACHER_FOR_CLASS.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: SEARCHING_TEACHER_FOR_CLASS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: SEARCHING_TEACHER_FOR_CLASS.FAILURE, payload: err });
  }
}

function* voteTeacher({ payload }) {
  try {
    const response = yield call(voteTeacherAPI, payload);
    if (response.ok) {
      yield put({ type: VOTE_TEACHER.SUCCESS, payload: { success: response.status === 204 } });
    } else {
      yield put({ type: VOTE_TEACHER.FAILURE, payload: 'error' });
    }
  } catch (err) {
    yield put({ type: VOTE_TEACHER.FAILURE, payload: err });
  }
}

function* unsubscribeCourses({ payload: id }) {
  try {
    const response = yield call(unsubscribeCoursesAPI, id);
    if (response.ok) {
      yield put({
        type: UNSUBSCRIBE_COURSES.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
      const state = store.getState();
      const user = state.toJS().user.loggedUser;
      const list = state.toJS().tutoring.courses;
      const index = list.findIndex(o => o.id === id);
      list[index] = {
        ...list[index],
        myState: '',
        total_students: list[index].total_students - 1,
        students: list[index].students.length ? list[index].students.filter(o => o.id !== user.id) : [],
      };
      yield put({
        type: COURSES.SUCCESS,
        payload: [...list],
      });
    } else {
      yield put({
        type: UNSUBSCRIBE_COURSES.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: UNSUBSCRIBE_COURSES.FAILURE,
      payload: err,
    });
  }
}

function* subscribeCourses({ payload: id }) {
  try {
    const response = yield call(subscribeCoursesAPI, id);
    if (response.ok) {
      yield put({
        type: SUBSCRIBE_COURSES.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
      const state = store.getState();
      const user = state.toJS().user.loggedUser;
      const list = state.toJS().tutoring.courses;
      const index = list.findIndex(o => o.id === id);
      list[index] = {
        ...list[index],
        myState: 'reserved',
        total_students: list[index].total_students + 1,
        students:
          list[index].students.length < 4
            ? [...list[index].students, { id: user.id, profile_pic: user.profile_pic }]
            : list[index].students,
      };
      yield put({
        type: COURSES.SUCCESS,
        payload: [...list],
      });
    } else {
      yield put({
        type: SUBSCRIBE_COURSES.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: SUBSCRIBE_COURSES.FAILURE,
      payload: err,
    });
  }
}

function* courses({ payload }) {
  try {
    const response = yield call(coursesAPI, payload);
    if (response.data.success) {
      yield put({
        type: COURSES.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: COURSES.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: COURSES.FAILURE, payload: err });
  }
}

function* upcomingGroupTutoring({ payload }) {
  try {
    const user = yield select(getUser);

    const response = yield call(upcomingGroupTutoringAPI, {
      grade: user.grade,
      country_id: getCountryId(),
      ...payload,
    });
    if (response.data.success) {
      yield put({
        type: UPCOMING_GROUP_TUTORING.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: UPCOMING_GROUP_TUTORING.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: UPCOMING_GROUP_TUTORING.FAILURE, payload: err });
  }
}

function* myLiveSessions({ payload }) {
  try {
    const user = yield select(getUser);

    const response = yield call(liveGroupTutoringAPI, {
      grade: user.grade,
      country_id: getCountryId(),
      ...payload,
    });
    if (response.data.success) {
      yield put({
        type: MY_LIVE_SESSION.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: MY_LIVE_SESSION.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: MY_LIVE_SESSION.FAILURE, payload: err });
  }
}

function* featuredSessions({ payload }) {
  try {
    const user = yield select(getUser);

    const response = yield call(featuredGroupTutoringAPI, {
      grade: user.grade,
      country_id: getCountryId(),
      ...payload,
    });
    if (response.data.success) {
      yield put({
        type: FEATURED_SESSION.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: FEATURED_SESSION.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: FEATURED_SESSION.FAILURE, payload: err });
  }
}

function* upcomingTeacherSessions({ payload }) {
  try {
    const user = yield select(getUser);

    const response = yield call(upcomingGroupTutoringAPI, {
      grade: user.grade,
      state: 'scheduled',
      country_id: getCountryId(),
      ...payload,
    });
    if (response.data.success) {
      yield put({
        type: UPCOMING_TEACHER_SESSION.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: UPCOMING_TEACHER_SESSION.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: UPCOMING_TEACHER_SESSION.FAILURE, payload: err });
  }
}

function* ondemandSession({ payload }) {
  try {
    const user = yield select(getUser);

    const response = yield call(upcomingGroupTutoringAPI, {
      country_id: getCountryId(),
      on_demand: 1,
      page: 1,
      limit: 20,
      grade: user.grade,
      ...payload,
    });
    if (response.data.success) {
      const ondemandSession = {};
      if (!isEmpty(response.data.data)) {
        response.data.data.map((item) => {
          if (ondemandSession[item.resource_id]) {
            ondemandSession[item.resource_id].push(item);
          } else {
            ondemandSession[item.resource_id] = [];
            ondemandSession[item.resource_id].push(item);
          }
        });
      }
      yield put({
        type: ONDEMAND_SESSION.SUCCESS,
        payload: ondemandSession,
      });
    } else {
      yield put({ type: ONDEMAND_SESSION.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: ONDEMAND_SESSION.FAILURE, payload: err });
  }
}

function* myScheduledSession({ payload }) {
  try {
    const response = yield call(upcomingGroupTutoringAPI, {
      country_id: getCountryId(),
      page: 1,
      limit: 20,
      myState: 'reserved',
      ...payload,
    });

    if (response.data.success) {
      const { limit, page } = payload;
      yield put({
        type: MY_SCHEDULED_SESSION.SUCCESS,
        payload: isEmpty(response.data.data)
          ? { page, list: [] }
          : { page, limit: limit || 20, list: response.data.data },
      });
    } else {
      yield put({ type: MY_SCHEDULED_SESSION.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: MY_SCHEDULED_SESSION.FAILURE, payload: err });
  }
}

function* subscribeGroupTutoring({ payload }) {
  try {
    const response = yield call(subscribeGroupTutoringAPI, payload);
    if (response.data.success) {
      yield put({
        type: SUBSCRIBE_GROUP_TUTORING.SUCCESS,
        payload: { id: payload.id },
      });

      const state = store.getState();
      const notifications = state.toJS().user.timeline;
      const notificationIndex = notifications.findIndex(
        o =>
          o.notification_feed.meta_data.tutoring_logger_id === payload.id &&
          o.notification_feed.event_type === 'publish_session',
      );
      if (notificationIndex >= 0 && notifications && notifications.length) {
        notifications[notificationIndex].notification_feed.subscription = true;
        yield put({
          type: TIMELINE.SUCCESS,
          payload: [...notifications],
        });
      }
      yield updateSubscribeSessions(
        state.toJS().tutoring.upcomingGroupTutoring,
        payload,
        UPCOMING_GROUP_TUTORING.SUCCESS,
      );
      // yield updateSubscribeSessionsWithPagination(state.toJS().tutoring.myScheduledSession, payload, MY_SCHEDULED_SESSION.SUCCESS);
      yield updateSubscribeSessions(
        state.toJS().tutoring.upcomingTeacherSession,
        payload,
        UPCOMING_TEACHER_SESSION.SUCCESS,
      );
      yield updateSubscribeSessions(
        state.toJS().tutoring.featuredSessions,
        payload,
        FEATURED_SESSION.SUCCESS,
      );
    } else {
      yield put({ type: SUBSCRIBE_GROUP_TUTORING.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: SUBSCRIBE_GROUP_TUTORING.FAILURE, payload: err });
  }
}

function* unsubscribeGroupTutoring({ payload: id }) {
  try {
    const response = yield call(unsubscribeGroupTutoringAPI, id);
    if (response.data.success) {
      yield put({
        type: UNSUBSCRIBE_GROUP_TUTORING.SUCCESS,
        payload: { id },
      });
      const state = store.getState();
      const notifications = state.toJS().user.timeline;
      const notificationIndex = notifications.findIndex(
        o =>
          o.notification_feed.meta_data.tutoring_logger_id === id &&
          o.notification_feed.event_type === 'publish_session',
      );
      if (notificationIndex >= 0 && notifications && notifications.length) {
        notifications[notificationIndex].notification_feed.subscription = false;
        yield put({
          type: TIMELINE.SUCCESS,
          payload: [...notifications],
        });
      }
      yield updateUnSubscribeSessions(state.toJS().tutoring.upcomingGroupTutoring, id, UPCOMING_GROUP_TUTORING.SUCCESS);
      // yield updateUnSubscribeSessionsWithPagination(state.toJS().tutoring.myScheduledSession, id, MY_SCHEDULED_SESSION.SUCCESS);
      yield updateUnSubscribeSessions(
        state.toJS().tutoring.upcomingTeacherSession,
        id,
        UPCOMING_TEACHER_SESSION.SUCCESS,
      );
      yield updateUnSubscribeSessions(
        state.toJS().tutoring.featuredSessions,
        id,
        FEATURED_SESSION.SUCCESS,
      );
    } else {
      yield put({ type: UNSUBSCRIBE_GROUP_TUTORING.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: UNSUBSCRIBE_GROUP_TUTORING.FAILURE, payload: err });
  }
}

function* creditDetail({ payload }) {
  try {
    const response = yield call(creditDetailAPI, payload);
    if (response.ok) {
      yield put({
        type: CREDIT_DETAIL.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({ type: CREDIT_DETAIL.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: CREDIT_DETAIL.FAILURE, payload: err });
  }
}

function* createClass({ payload }) {
  try {
    const response = yield call(createClassAPI, payload);
    if (response.ok) {
      yield put({
        type: CREATE_CLASS.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: CREATE_CLASS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: CREATE_CLASS.FAILURE, payload: err });
  }
}

export function* tutoringSaga() {
  yield [
    takeEvery(GET_CLASS.REQUEST, getClass),
    takeEvery(GET_TEACHERLIST.REQUEST, getTeachers),
    takeEvery(SEARCHING_TEACHER_FOR_CLASS.REQUEST, createTeacherRequest),
    takeEvery(VOTE_TEACHER.REQUEST, voteTeacher),
    takeEvery(UNSUBSCRIBE_COURSES.REQUEST, unsubscribeCourses),
    takeEvery(SUBSCRIBE_COURSES.REQUEST, subscribeCourses),
    takeEvery(COURSES.REQUEST, courses),
    takeEvery(UPCOMING_GROUP_TUTORING.REQUEST, upcomingGroupTutoring),
    takeEvery(ONDEMAND_SESSION.REQUEST, ondemandSession),
    takeEvery(MY_SCHEDULED_SESSION.REQUEST, myScheduledSession),
    takeEvery(SUBSCRIBE_GROUP_TUTORING.REQUEST, subscribeGroupTutoring),
    takeEvery(UNSUBSCRIBE_GROUP_TUTORING.REQUEST, unsubscribeGroupTutoring),
    takeEvery(CREDIT_DETAIL.REQUEST, creditDetail),
    takeEvery(CREATE_CLASS.REQUEST, createClass),
    takeEvery(MY_LIVE_SESSION.REQUEST, myLiveSessions),
    takeEvery(FEATURED_SESSION.REQUEST, featuredSessions),
    takeEvery(UPCOMING_TEACHER_SESSION.REQUEST, upcomingTeacherSessions),
  ];
}
