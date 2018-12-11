import {
  CLEAR_ERROR,
  LOGIN_USER,
  GET_PROFILE,
  SIGNUP_USER,
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
  FOLLOWING,
  UNFOLLOW,
  FOLLOW,
  PROFILE,
  ORGANISATION_SIGNUP_USER,
  TIMELINE,
  GET_TEACHER_DETAIL,
  TIMELINE_UPDATE,
} from '../constants';

const initialState = {
  loggedUser: {},
  pinnedTeachers: [],
  totalStudents: 0,
  userByEmail: {},
  sendSmsResponse: {},
  verifyOtpResponse: {},
  changePasswordResponse: {},
  resetPasswordResponse: {},
  verifyPasswordResponse: {},
  friendRecommendations: {
    offset: 0,
    count: 0,
    list: [],
  },
  followRecommendations: {
    offset: 0,
    count: 0,
    list: [],
  },
  friends: {
    offset: 0,
    count: 0,
    list: [],
  },
  sendFriendRequest: {},
  requestsPendingOnOthers: [],
  requestsPendingOnMe: [],
  acceptFriendRequest: {},
  rejectFriendRequest: {},
  usersByNameOrEmail: {
    searchedText: '',
    lastId: 0,
    list: [],
  },
  isFriendSearching: false,
  followers: [],
  following: [],
  unfollow: {},
  follow: {},
  profile: {},
  teacherDetail: {},
  timeline: [],
  timelineUpdate: [],
  error: {},
};

function addTakafulflag(data) {
  const newData = {
    ...data,
    is_takaful: data.roles.indexOf(5) !== -1 || data.roles.indexOf(16) !== -1,
  };
  localStorage.setItem('loggedUser', JSON.stringify(newData));
  return newData;
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR:
      if (action.payload === 'user') {
        return {
          ...state,
          error: {},
        };
      }
      return {
        ...state,
      };
    case LOGIN_USER.SUCCESS:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case LOGIN_USER.FAILURE:
      return {
        ...state,
        error: {
          login: action.payload,
        },
      };
    case GET_PROFILE.SUCCESS:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case GET_PROFILE.FAILURE:
      return {
        ...state,
        error: { getProfile: action.payload },
      };
    case SIGNUP_USER.SUCCESS:
      localStorage.newUser = true;
      return {
        ...state,
        loggedUser: action.payload,
      };
    case SIGNUP_USER.FAILURE:
      return {
        ...state,
        error: {
          signup: action.payload,
        },
      };
    case ORGANISATION_SIGNUP_USER.SUCCESS:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case ORGANISATION_SIGNUP_USER.FAILURE:
      return {
        ...state,
        error: { organisationSignup: action.payload },
      };
    case LOGGED_OUT_USER.SUCCESS:
      return {
        ...state,
        loggedUser: {},
      };
    case LOGGED_OUT_USER.FAILURE:
      return {
        ...state,
        loggedUser: {},
      };
    case LIST_TEACHERS.SUCCESS:
      return {
        ...state,
        pinnedTeachers: action.payload,
      };
    case LIST_TEACHERS.FAILURE:
      return {
        ...state,
        error: {
          pinnedTeachers: action.payload,
        },
      };
    case LIST_STUDENTS.SUCCESS:
      return {
        ...state,
        totalStudents: action.payload,
      };
    case LIST_STUDENTS.FAILURE:
      return {
        ...state,
        error: {
          totalStudents: action.payload,
        },
      };
    case GET_USER_BY_EMAIL.SUCCESS:
      return {
        ...state,
        userByEmail: action.payload,
      };
    case GET_USER_BY_EMAIL.FAILURE:
      return {
        ...state,
        error: {
          userByEmail: action.payload,
        },
      };
    case GET_TEACHER_DETAIL.SUCCESS:
      return {
        ...state,
        teacherDetail: action.payload,
      };
    case GET_TEACHER_DETAIL.FAILURE:
      return {
        ...state,
        error: { teacherDetail: action.payload },
      };
    case SEND_SMS.SUCCESS:
      return {
        ...state,
        sendSmsResponse: action.payload,
      };
    case SEND_SMS.FAILURE:
      return {
        ...state,
        error: {
          sendSms: action.payload,
        },
      };
    case VERIFY_OTP.SUCCESS:
      return {
        ...state,
        verifyOtpResponse: action.payload,
      };
    case VERIFY_OTP.FAILURE:
      return {
        ...state,
        error: {
          verifyOtp: action.payload,
        },
      };
    case RESET_PASSWORD.SUCCESS:
      return {
        ...state,
        resetPasswordResponse: action.payload,
      };
    case RESET_PASSWORD.FAILURE:
      return {
        ...state,
        error: {
          resetPassword: action.payload,
        },
      };
    case CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        changePasswordResponse: action.payload,
      };
    case CHANGE_PASSWORD.FAILURE:
      return {
        ...state,
        error: {
          changePassword: action.payload,
        },
      };
    case VERIFY_EMAIL.SUCCESS:
      return {
        ...state,
        verifyEmailResponse: action.payload,
      };
    case VERIFY_EMAIL.FAILURE:
      return {
        ...state,
        error: {
          verifyEmail: action.payload,
        },
      };
    case FRIENDS.SUCCESS:
      return {
        ...state,
        friends:
          state.friends.offset >= action.payload.offset
            ? action.payload
            : { ...action.payload, list: [...state.friends.list, ...action.payload.list] },
      };
    case FRIENDS.FAILURE:
      return {
        ...state,
        error: {
          friends: action.payload,
        },
      };
    case FRIEND_RECOMMENDATIONS.SUCCESS:
      return {
        ...state,
        friendRecommendations:
          state.friendRecommendations.offset >= action.payload.offset
            ? action.payload
            : { ...action.payload, list: [...state.friendRecommendations.list, ...action.payload.list] },
      };
    case FRIEND_RECOMMENDATIONS.FAILURE:
      return {
        ...state,
        error: {
          friendRecommendations: action.payload,
        },
      };
    case FOLLOW_RECOMMENDATIONS.SUCCESS:
      return {
        ...state,
        followRecommendations:
          state.followRecommendations.offset >= action.payload.offset
            ? action.payload
            : { ...action.payload, list: [...state.followRecommendations.list, ...action.payload.list] },
      };
    case FOLLOW_RECOMMENDATIONS.FAILURE:
      return {
        ...state,
        error: {
          followRecommendations: action.payload,
        },
      };

    case SEND_FRIEND_REQUEST.SUCCESS:
      return {
        ...state,
        sendFriendRequest: action.payload,
      };
    case SEND_FRIEND_REQUEST.FAILURE:
      return {
        ...state,
        error: {
          sendFriendRequest: action.payload,
        },
      };
    case REQUESTS_PENDING_ON_OTHERS.SUCCESS:
      return {
        ...state,
        requestsPendingOnOthers: action.payload,
      };
    case REQUESTS_PENDING_ON_OTHERS.FAILURE:
      return {
        ...state,
        error: {
          requestsPendingOnOthers: action.payload,
        },
      };
    case REQUESTS_PENDING_ON_ME.SUCCESS:
      return {
        ...state,
        requestsPendingOnMe: action.payload,
      };
    case REQUESTS_PENDING_ON_ME.FAILURE:
      return {
        ...state,
        error: {
          requestsPendingOnMe: action.payload,
        },
      };
    case ACCEPT_FRIEND_REQUEST.SUCCESS:
      return {
        ...state,
        acceptFriendRequest: action.payload,
      };
    case ACCEPT_FRIEND_REQUEST.FAILURE:
      return {
        ...state,
        error: {
          acceptFriendRequest: action.payload,
        },
      };
    case REJECT_FRIEND_REQUEST.SUCCESS:
      return {
        ...state,
        rejectFriendRequest: action.payload,
      };
    case REJECT_FRIEND_REQUEST.FAILURE:
      return {
        ...state,
        error: {
          rejectFriendRequest: action.payload,
        },
      };
    case USERS_BY_NAME_OR_EMAIL.REQUEST:
      return {
        ...state,
        isFriendSearching: true,
      };
    case USERS_BY_NAME_OR_EMAIL.SUCCESS:
      return {
        ...state,
        isFriendSearching: false,
        usersByNameOrEmail:
          state.usersByNameOrEmail.searchedText !== action.payload.searchedText
            ? action.payload
            : {
              ...action.payload,
              list: [...state.usersByNameOrEmail.list, ...action.payload.list],
            },
      };
    case USERS_BY_NAME_OR_EMAIL.FAILURE:
      return {
        ...state,
        isFriendSearching: false,
        error: {
          usersByNameOrEmail: action.payload,
        },
      };
    case TIMELINE.SUCCESS:
      return {
        ...state,
        timeline: action.payload,
      };
    case TIMELINE.FAILURE:
      return {
        ...state,
        error: {
          timeline: action.payload,
        },
      };
    case TIMELINE_UPDATE.SUCCESS:
      return {
        ...state,
        timelineUpdate: action.payload,
      };
    case TIMELINE_UPDATE.FAILURE:
      return {
        ...state,
        error: {
          timelineUpdate: action.payload,
        },
      };
    case FOLLOWERS.SUCCESS:
      return {
        ...state,
        followers: action.payload,
      };
    case FOLLOWERS.FAILURE:
      return {
        ...state,
        error: {
          followers: action.payload,
        },
      };
    case FOLLOWING.SUCCESS:
      return {
        ...state,
        following: action.payload,
      };
    case FOLLOWING.FAILURE:
      return {
        ...state,
        error: {
          following: action.payload,
        },
      };
    case UNFOLLOW.SUCCESS:
      return {
        ...state,
        unfollow: action.payload,
      };
    case UNFOLLOW.FAILURE:
      return {
        ...state,
        error: {
          unfollow: action.payload,
        },
      };
    case FOLLOW.SUCCESS:
      return {
        ...state,
        follow: action.payload,
      };
    case FOLLOW.FAILURE:
      return {
        ...state,
        error: {
          follow: action.payload,
        },
      };
    case PROFILE.SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case PROFILE.FAILURE:
      return {
        ...state,
        error: {
          profile: action.payload,
        },
      };
    default:
      if (action.type.indexOf('_REQUEST') !== -1) {
        return {
          ...state,
          error: {},
        };
      }
      return state;
  }
}
