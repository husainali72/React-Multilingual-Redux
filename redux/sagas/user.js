import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import isEmpty from 'lodash/isEmpty';
import { usersApi } from '../restApi';
import { store } from '../../app';
import { setAuthorizationHeader, numberWithCommas } from '../../helpers';
import {
  LOGIN_USER,
  GET_PROFILE,
  SIGNUP_USER,
  ORGANISATION_SIGNUP_USER,
  LIST_TEACHERS,
  LIST_STUDENTS,
  LOGGED_OUT_USER,
  GET_USER_BY_EMAIL,
  SEND_SMS,
  VERIFY_OTP,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  VERIFY_EMAIL,
  FRIENDS,
  FRIEND_RECOMMENDATIONS,
  FOLLOW_RECOMMENDATIONS,
  SEND_FRIEND_REQUEST,
  REQUESTS_PENDING_ON_OTHERS,
  REQUESTS_PENDING_ON_ME,
  ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
  USERS_BY_NAME_OR_EMAIL,
  FOLLOWERS,
  TIMELINE,
  FOLLOWING,
  UNFOLLOW,
  FOLLOW,
  PROFILE,
  GET_TEACHER_DETAIL,
  LIST_PRODUCTS,
  TIMELINE_UPDATE,
} from '../constants';

const loginUserAPI = user => usersApi.post('teacherAuthenticate', user);
const getProfileAPI = () => usersApi.get('teacherProfile');
const getTeacherDetailAPI = id => usersApi.get(`teachers/${id}`);
const getUserByEmailAPI = email => usersApi.post('findUserByEmailId', { email });
const organisationSignUpAPI = user => usersApi.post('organisationStudentRegister', user);
const signUpUserAPI = user => usersApi.post('registerTeacher', user);
const listTeacherAPI = () => usersApi.get('pinnedTeacher');
const listStudentsAPI = () => usersApi.get('totalStudents');
const logoutAPI = token => usersApi.post('logout', { token });
const sendSmsAPI = phone => usersApi.post('sendSms', { phone });
const verifyOtpAPI = ({ phone, code }) => usersApi.post('verifyPhone', { phone, code });
const verifyEmailAPI = token => usersApi.get('verifyEmail', { token });
const resetPasswordAPI = email =>
  usersApi.post('resetPasswordMail', { email, url: `${process.env.TEACHER_URL}password-reset` });
const changePasswordAPI = data => usersApi.post('resetPassword', data);
const friendsAPI = start => usersApi.get(`friends?start=${start}`);
const friendRecommendationsAPI = data => usersApi.get('friendRecommendations', data);
const followRecommendationsAPI = data => usersApi.get('followRecommendations', data);
const sendFriendRequestAPI = data => usersApi.post('sendFriendRequest', data);
const requestsPendingOnOthersAPI = () => usersApi.get('requestsPendingOnOthers');
const requestsPendingOnMeAPI = () => usersApi.get('requestsPendingOnMe');
const acceptFriendRequestAPI = data => usersApi.post('acceptFriendRequest', data);
const rejectFriendRequestAPI = data => usersApi.post('rejectFriendRequest', data);
const usersByNameOrEmailAPI = ({ searchedText, limit = 12, lastId = 0 }) =>
  usersApi.get(`usersByNameOrEmail/?nameOrEmail=${searchedText}&limit=${limit}&lastId=${lastId}`);
const timelineAPI = data => usersApi.get(`timeline?feed_type=${data.feed_type}`);
const timelineUpdateAPI = data => usersApi.put('timeline', data);
const followersAPI = () => usersApi.get('followers');
const followingAPI = () => usersApi.get('following');
const unfollowAPI = data => usersApi.post('unfollow', data);
const followAPI = data => usersApi.post('follow', data);
const updateProfileAPI = data => usersApi.put('teacherProfile', data);

const getUser = state => state.toJS().user;

function* loginUser({ payload: user }) {
  try {
    const response = yield call(loginUserAPI, user);
    if (response.data.success) {
      yield put({ type: LOGIN_USER.SUCCESS, payload: isEmpty(response.data.data) ? {} : response.data.data[0] });
      if (!isEmpty(response.data.data)) {
        yield setAuthorizationHeader(response.data.data[0].jwtToken);
        yield put({ type: GET_PROFILE.REQUEST });
      }
    } else {
      yield put({ type: LOGIN_USER.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: LOGIN_USER.FAILURE, payload: 'server error' });
  }
}

function* getProfile() {
  try {
    const response = yield call(getProfileAPI);
    if (response.data.success) {
      yield put({ type: GET_PROFILE.SUCCESS, payload: isEmpty(response.data.data) ? {} : response.data.data[0] });
    } else {
      yield put({ type: GET_PROFILE.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_PROFILE.FAILURE, payload: 'server error' });
  }
}

function* getUserByEmail({ payload: email }) {
  try {
    const response = yield call(getUserByEmailAPI, email);
    if (response.data.success) {
      yield put({ type: GET_USER_BY_EMAIL.SUCCESS, payload: isEmpty(response.data.data) ? {} : response.data.data[0] });
    } else {
      yield put({ type: GET_USER_BY_EMAIL.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_USER_BY_EMAIL.FAILURE, payload: 'server error' });
  }
}

function* createUser({ payload: user }) {
  try {
    const response = yield call(signUpUserAPI, user);
    if (response.data && response.data.success) {
      yield put({
        type: SIGNUP_USER.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
      if (!isEmpty(response.data.data)) {
        yield setAuthorizationHeader(response.data.data[0].jwtToken);
        yield put({ type: GET_PROFILE.REQUEST });
      }
    } else {
      yield put({ type: SIGNUP_USER.FAILURE, payload: response.data ? response.data.message : 'network failure' });
    }
  } catch (err) {
    yield put({ type: SIGNUP_USER.FAILURE, payload: 'server error' });
  }
}

function* organisationSignUp({ payload: user }) {
  try {
    const response = yield call(organisationSignUpAPI, user);
    if (response.data.success) {
      yield put({
        type: ORGANISATION_SIGNUP_USER.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
      if (!isEmpty(response.data.data)) {
        setAuthorizationHeader(response.data.data[0].jwtToken);
      }
    } else {
      yield put({ type: ORGANISATION_SIGNUP_USER.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: ORGANISATION_SIGNUP_USER.FAILURE, payload: 'server error' });
  }
}

function* listTeachers() {
  try {
    const response = yield call(listTeacherAPI);
    yield put({
      type: LIST_TEACHERS.SUCCESS,
      payload: isEmpty(response.data.data) ? [] : response.data.data,
    });
  } catch (err) {
    yield put({ type: LIST_TEACHERS.FAILURE, payload: err });
  }
}

function* getTeacherDetail({ payload: id }) {
  try {
    const response = yield call(getTeacherDetailAPI, id);
    if (response.data.success) {
      yield put({
        type: GET_TEACHER_DETAIL.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: GET_TEACHER_DETAIL.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: GET_TEACHER_DETAIL.FAILURE, payload: err });
  }
}

function* listStudents() {
  try {
    const response = yield call(listStudentsAPI);
    yield put({
      type: LIST_STUDENTS.SUCCESS,
      payload: isEmpty(response.data.data) ? '0' : numberWithCommas(response.data.data[0]),
    });
  } catch (err) {
    yield put({ type: LIST_STUDENTS.FAILURE, payload: err });
  }
}

function* logout({ payload: tokenAlreadyInvalidated }) {
  try {
    if (!tokenAlreadyInvalidated) {
      yield call(logoutAPI, localStorage.token);
    }
    setAuthorizationHeader();
    yield put({ type: LOGGED_OUT_USER.SUCCESS, payload: 'success' });
  } catch (err) {
    setAuthorizationHeader();
    yield put({ type: LOGGED_OUT_USER.FAILURE, payload: err });
  }
}

function* sendSms({ payload: phone }) {
  try {
    const response = yield call(sendSmsAPI, phone);
    if (response.data.success) {
      yield put({
        type: SEND_SMS.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: SEND_SMS.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: SEND_SMS.FAILURE, payload: err });
  }
}

function* verifyOtp({ payload: data }) {
  try {
    const response = yield call(verifyOtpAPI, data);
    if (response.data.success) {
      yield put({
        type: VERIFY_OTP.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({ type: VERIFY_OTP.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: VERIFY_OTP.FAILURE, payload: err });
  }
}

function* resetPassword({ payload: email }) {
  try {
    const response = yield call(resetPasswordAPI, email);
    if (response.data.success) {
      yield put({
        type: RESET_PASSWORD.SUCCESS,
        payload: { message: 'success.mailSent' },
      });
    } else {
      yield put({ type: RESET_PASSWORD.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: RESET_PASSWORD.FAILURE, payload: err });
  }
}

function* changePassword({ payload: data }) {
  try {
    const response = yield call(changePasswordAPI, data);
    if (response.data.success) {
      yield put({
        type: CHANGE_PASSWORD.SUCCESS,
        payload: { message: response.data.message },
      });
    } else {
      yield put({ type: CHANGE_PASSWORD.FAILURE, payload: response.data.message });
    }
  } catch (err) {
    yield put({ type: CHANGE_PASSWORD.FAILURE, payload: err });
  }
}

function* verifyEmail({ payload: token }) {
  try {
    const response = yield call(verifyEmailAPI, token);
    if (response.data.success) {
      yield put({
        type: VERIFY_EMAIL.SUCCESS,
        payload: { message: 'success.mailSent' },
      });
    } else {
      yield put({ type: VERIFY_EMAIL.FAILURE, payload: 'error.token' });
    }
  } catch (err) {
    yield put({ type: VERIFY_EMAIL.FAILURE, payload: err });
  }
}

function* friends({ payload: offset }) {
  try {
    const response = yield call(friendsAPI, offset);
    if (response.data.success) {
      yield put({
        type: FRIENDS.SUCCESS,
        payload: isEmpty(response.data.data)
          ? { list: [], count: 0, offset: 0 }
          : { list: response.data.data, count: response.data.count, offset: response.data.next_offset },
      });
    } else {
      yield put({
        type: FRIENDS.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: FRIENDS.FAILURE,
      payload: err,
    });
  }
}

function* followRecommendations({ payload }) {
  try {
    const response = yield call(followRecommendationsAPI, payload);
    if (response.data.success) {
      yield put({
        type: FOLLOW_RECOMMENDATIONS.SUCCESS,
        payload: isEmpty(response.data.data)
          ? { list: [], count: 0, offset: 0 }
          : { list: response.data.data, count: response.data.count, offset: response.data.next_offset },
      });
    } else {
      yield put({
        type: FOLLOW_RECOMMENDATIONS.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: FOLLOW_RECOMMENDATIONS.FAILURE,
      payload: err,
    });
  }
}

function* friendRecommendations({ payload }) {
  try {
    const response = yield call(friendRecommendationsAPI, payload);
    if (response.data.success) {
      yield put({
        type: FRIEND_RECOMMENDATIONS.SUCCESS,
        payload: isEmpty(response.data.data)
          ? { list: [], count: 0, offset: 0 }
          : { list: response.data.data, count: response.data.count, offset: response.data.next_offset },
      });
    } else {
      yield put({
        type: FRIEND_RECOMMENDATIONS.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: FRIEND_RECOMMENDATIONS.FAILURE,
      payload: err,
    });
  }
}

function* sendFriendRequest({ payload }) {
  try {
    const response = yield call(sendFriendRequestAPI, payload);
    if (response.data.success) {
      yield put({
        type: SEND_FRIEND_REQUEST.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data,
      });
    } else {
      yield put({
        type: SEND_FRIEND_REQUEST.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: SEND_FRIEND_REQUEST.FAILURE,
      payload: err,
    });
  }
}

function* requestsPendingOnOthers() {
  try {
    const response = yield call(requestsPendingOnOthersAPI);
    if (response.data.success) {
      yield put({
        type: REQUESTS_PENDING_ON_OTHERS.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: REQUESTS_PENDING_ON_OTHERS.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: REQUESTS_PENDING_ON_OTHERS.FAILURE,
      payload: err,
    });
  }
}

function* requestsPendingOnMe() {
  try {
    const response = yield call(requestsPendingOnMeAPI);
    if (response.data.success) {
      yield put({
        type: REQUESTS_PENDING_ON_ME.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: REQUESTS_PENDING_ON_ME.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: REQUESTS_PENDING_ON_ME.FAILURE,
      payload: err,
    });
  }
}

function* acceptFriendRequest({ payload }) {
  try {
    const response = yield call(acceptFriendRequestAPI, payload);
    if (response.ok) {
      yield put({
        type: ACCEPT_FRIEND_REQUEST.SUCCESS,
        payload: { id: payload.to },
      });
    } else {
      yield put({
        type: ACCEPT_FRIEND_REQUEST.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: ACCEPT_FRIEND_REQUEST.FAILURE,
      payload: err,
    });
  }
}

function* rejectFriendRequest({ payload }) {
  try {
    const response = yield call(rejectFriendRequestAPI, payload);
    if (response.ok) {
      yield put({
        type: REJECT_FRIEND_REQUEST.SUCCESS,
        payload: { id: payload.to },
      });
    } else {
      yield put({
        type: REJECT_FRIEND_REQUEST.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: REJECT_FRIEND_REQUEST.FAILURE,
      payload: err,
    });
  }
}

function* usersByNameOrEmail({ payload }) {
  yield call(delay, 300);
  try {
    const response = yield call(usersByNameOrEmailAPI, payload);
    if (response.data.success) {
      yield put({
        type: USERS_BY_NAME_OR_EMAIL.SUCCESS,
        payload: isEmpty(response.data.data)
          ? { list: [], searchedText: payload.searchedText, lastId: 0 }
          : {
            list: response.data.data,
            lastId: response.data.data[response.data.data.length - 1].id,
            searchedText: payload.searchedText,
          },
      });
    } else {
      yield put({
        type: USERS_BY_NAME_OR_EMAIL.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: USERS_BY_NAME_OR_EMAIL.FAILURE,
      payload: err,
    });
  }
}

function* timeline({ payload }) {
  try {
    const response = yield call(timelineAPI, payload);
    if (response.data.success) {
      yield put({
        type: TIMELINE.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: TIMELINE.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: TIMELINE.FAILURE,
      payload: err,
    });
  }
}

function* timelineUpdate({ payload }) {
  try {
    const response = yield call(timelineUpdateAPI, payload);
    if (response.data.success) {
      yield put({
        type: TIMELINE_UPDATE.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: TIMELINE_UPDATE.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: TIMELINE_UPDATE.FAILURE,
      payload: err,
    });
  }
}

function* followers() {
  try {
    const response = yield call(followersAPI);
    if (response.data.success) {
      yield put({
        type: FOLLOWERS.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: FOLLOWERS.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: FOLLOWERS.FAILURE,
      payload: err,
    });
  }
}

function* following() {
  try {
    const response = yield call(followingAPI);
    if (response.data.success) {
      yield put({
        type: FOLLOWING.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: FOLLOWING.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: FOLLOWING.FAILURE,
      payload: err,
    });
  }
}

function* unfollow({ payload: id }) {
  try {
    const response = yield call(unfollowAPI, { to: id });
    if (response.data.success) {
      const user = yield select(getUser);
      if (user.teacherDetail && user.teacherDetail.user_id === id) {
        yield put({
          type: GET_TEACHER_DETAIL.SUCCESS,
          payload: { ...user.teacherDetail, is_following: false },
        });
      }

      const state = store.getState();
      const notifications = state.toJS().user.timeline;
      const notificationIndex = notifications.findIndex(
        o => o.notification_feed.meta_data.user_id === id && o.notification_feed.event_type === 'teacher_register',
      );
      if (notificationIndex >= 0 && notifications && notifications.length) {
        notifications[notificationIndex].notification_feed.following = false;
        yield put({
          type: TIMELINE.SUCCESS,
          payload: [...notifications],
        });
      }

      const followRecommendations = state.toJS().user.followRecommendations;
      const followRecommendationsIndex = followRecommendations.list.findIndex(o => o.id === id);
      if (followRecommendationsIndex >= 0 && followRecommendations && followRecommendations.list.length) {
        followRecommendations.list[followRecommendationsIndex].following = false;
        yield put({
          type: FOLLOW_RECOMMENDATIONS.SUCCESS,
          payload: [...followRecommendations],
        });
      }

      yield put({
        type: UNFOLLOW.SUCCESS,
        payload: { id },
      });
    } else {
      yield put({
        type: UNFOLLOW.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: UNFOLLOW.FAILURE,
      payload: err,
    });
  }
}

function* follow({ payload: id }) {
  try {
    const response = yield call(followAPI, { to: id });
    if (response.data.success) {
      const user = yield select(getUser);
      if (user.teacherDetail && user.teacherDetail.user_id === id) {
        yield put({
          type: GET_TEACHER_DETAIL.SUCCESS,
          payload: { ...user.teacherDetail, is_following: true },
        });
      }

      const state = store.getState();
      const notifications = state.toJS().user.timeline;
      const notificationIndex = notifications.findIndex(
        o => o.notification_feed.meta_data.user_id === id && o.notification_feed.event_type === 'teacher_register',
      );
      if (notificationIndex >= 0 && notifications && notifications.length) {
        notifications[notificationIndex].notification_feed.following = true;
        yield put({
          type: TIMELINE.SUCCESS,
          payload: [...notifications],
        });
      }

      const { followRecommendations } = state.toJS().user;
      const followRecommendationsIndex = followRecommendations.list.findIndex(o => o.id === id);
      if (followRecommendationsIndex >= 0 && followRecommendations && followRecommendations.list.length) {
        followRecommendations.list[followRecommendationsIndex].following = true;
        yield put({
          type: FOLLOW_RECOMMENDATIONS.SUCCESS,
          payload: [...followRecommendations],
        });
      }

      yield put({
        type: FOLLOW.SUCCESS,
        payload: { id },
      });
    } else {
      yield put({
        type: FOLLOW.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: FOLLOW.FAILURE,
      payload: err,
    });
  }
}

function* updateProfile({ payload }) {
  try {
    const response = yield call(updateProfileAPI, payload);
    if (response.ok) {
      yield put({ type: GET_PROFILE.REQUEST });
      yield put({
        type: PROFILE.SUCCESS,
        payload: { success: response.status === 204 },
      });
    } else {
      yield put({
        type: PROFILE.FAILURE,
        payload: 'server error',
      });
    }
  } catch (err) {
    yield put({
      type: PROFILE.FAILURE,
      payload: 'server error',
    });
  }
}

export function* userSaga() {
  yield [
    takeEvery(LOGIN_USER.REQUEST, loginUser),
    takeEvery(GET_PROFILE.REQUEST, getProfile),
    takeEvery(GET_USER_BY_EMAIL.REQUEST, getUserByEmail),
    takeEvery(SIGNUP_USER.REQUEST, createUser),
    takeEvery(ORGANISATION_SIGNUP_USER.REQUEST, organisationSignUp),
    takeEvery(LIST_TEACHERS.REQUEST, listTeachers),
    takeEvery(LIST_STUDENTS.REQUEST, listStudents),
    takeEvery(LOGGED_OUT_USER.REQUEST, logout),
    takeEvery(SEND_SMS.REQUEST, sendSms),
    takeEvery(VERIFY_OTP.REQUEST, verifyOtp),
    takeEvery(RESET_PASSWORD.REQUEST, resetPassword),
    takeEvery(CHANGE_PASSWORD.REQUEST, changePassword),
    takeEvery(VERIFY_EMAIL.REQUEST, verifyEmail),
    takeEvery(FRIENDS.REQUEST, friends),
    takeEvery(FRIEND_RECOMMENDATIONS.REQUEST, friendRecommendations),
    takeEvery(FOLLOW_RECOMMENDATIONS.REQUEST, followRecommendations),
    takeEvery(SEND_FRIEND_REQUEST.REQUEST, sendFriendRequest),
    takeEvery(REQUESTS_PENDING_ON_OTHERS.REQUEST, requestsPendingOnOthers),
    takeEvery(REQUESTS_PENDING_ON_ME.REQUEST, requestsPendingOnMe),
    takeEvery(ACCEPT_FRIEND_REQUEST.REQUEST, acceptFriendRequest),
    takeEvery(REJECT_FRIEND_REQUEST.REQUEST, rejectFriendRequest),
    takeLatest(USERS_BY_NAME_OR_EMAIL.REQUEST, usersByNameOrEmail),
    takeEvery(FOLLOWERS.REQUEST, followers),
    takeEvery(TIMELINE.REQUEST, timeline),
    takeEvery(TIMELINE_UPDATE.REQUEST, timelineUpdate),
    takeEvery(FOLLOWING.REQUEST, following),
    takeEvery(UNFOLLOW.REQUEST, unfollow),
    takeEvery(FOLLOW.REQUEST, follow),
    takeEvery(PROFILE.REQUEST, updateProfile),
    takeEvery(GET_TEACHER_DETAIL.REQUEST, getTeacherDetail),
  ];
}
