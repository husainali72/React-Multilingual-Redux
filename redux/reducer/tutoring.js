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
  UPCOMING_TEACHER_SESSION,
  MY_LIVE_SESSION,
  FEATURED_SESSION,
} from '../constants';

const initialState = {
  sessionData: {},
  players: [],
  teachers: [],
  voteTeacher: {},
  searchingTeacherForClass: {},
  unsubscribeCourses: {},
  subscribeCourses: {},
  upcomingGroupTutoring: [],
  isLoadingUpcomingGroupTutoring: false,
  myScheduledSession: {
    page: 1,
    list: [],
    isLoading: false,
  },
  upcomingTeacherSession: [],
  isLoadingUpcomingTeacherSession: false,
  subscribeGroupTutoring: {},
  unsubscribeGroupTutoring: {},
  courses: [],
  createClass: {},
  creditDetail: [],
  ondemandSessions: {},
  myLiveSessions: [],
  featuredSessions: [],
  error: {},
};

export default function tutoring(state = initialState, action) {
  switch (action.type) {
    case GET_CLASS.SUCCESS:
      return {
        ...state,
        sessionData: action.payload,
      };
    case GET_CLASS.FAILURE:
      return {
        ...state,
        error: { getClass: action.payload },
      };
    case GET_TEACHERLIST.SUCCESS:
      return {
        ...state,
        teachers: action.payload,
      };
    case GET_TEACHERLIST.FAILURE:
      return {
        ...state,
        error: { teachers: action.payload },
      };
    case SEARCHING_TEACHER_FOR_CLASS.SUCCESS:
      return {
        ...state,
        searchingTeacherForClass: action.payload,
      };
    case SEARCHING_TEACHER_FOR_CLASS.FAILURE:
      return {
        ...state,
        error: { searchingTeacherForClass: action.payload },
      };
    case VOTE_TEACHER.SUCCESS:
      return {
        ...state,
        voteTeacher: action.payload,
      };
    case VOTE_TEACHER.FAILURE:
      return {
        ...state,
        error: { voteTeacher: action.payload },
      };
    case UNSUBSCRIBE_COURSES.SUCCESS:
      return {
        ...state,
        unsubscribeCourses: action.payload,
      };
    case UNSUBSCRIBE_COURSES.FAILURE:
      return {
        ...state,
        error: { unsubscribeCourses: action.payload },
      };
    case COURSES.SUCCESS:
      return {
        ...state,
        courses: action.payload,
      };
    case COURSES.FAILURE:
      return {
        ...state,
        error: { courses: action.payload },
      };
    case SUBSCRIBE_COURSES.SUCCESS:
      return {
        ...state,
        subscribeCourses: action.payload,
      };
    case SUBSCRIBE_COURSES.FAILURE:
      return {
        ...state,
        error: { subscribeCourses: action.payload },
      };
    case UPCOMING_GROUP_TUTORING.REQUEST:
      return {
        ...state,
        isLoadingUpcomingGroupTutoring: !action['@@redux-saga/SAGA_ACTION'],
      };
    case UPCOMING_GROUP_TUTORING.SUCCESS:
      return {
        ...state,
        upcomingGroupTutoring: action.payload,
        isLoadingUpcomingGroupTutoring: false,
      };
    case UPCOMING_GROUP_TUTORING.FAILURE:
      return {
        ...state,
        error: { upcomingGroupTutoring: action.payload },
        isLoadingUpcomingGroupTutoring: false,
      };
    case MY_LIVE_SESSION.REQUEST:
      return {
        ...state,
        isLoadingMyLiveSession: !action['@@redux-saga/SAGA_ACTION'],
      };
    case MY_LIVE_SESSION.SUCCESS:
      return {
        ...state,
        myLiveSessions: action.payload,
        isLoadingMyLiveSession: false,
      };
    case MY_LIVE_SESSION.FAILURE:
      return {
        ...state,
        error: { myLiveSessions: action.payload },
        isLoadingMyLiveSession: false,
      };
    case FEATURED_SESSION.REQUEST:
      return {
        ...state,
        isLoadingFeaturedSession: !action['@@redux-saga/SAGA_ACTION'],
      };
    case FEATURED_SESSION.SUCCESS:
      return {
        ...state,
        featuredSessions: action.payload,
        isLoadingFeaturedSession: false,
      };
    case FEATURED_SESSION.FAILURE:
      return {
        ...state,
        error: { featuredSessions: action.payload },
        isLoadingFeaturedSession: false,
      };
    case UPCOMING_TEACHER_SESSION.REQUEST:
      return {
        ...state,
        isLoadingUpcomingTeacherSession: !action['@@redux-saga/SAGA_ACTION'],
      };
    case UPCOMING_TEACHER_SESSION.SUCCESS:
      return {
        ...state,
        upcomingTeacherSession: action.payload,
        isLoadingUpcomingTeacherSession: false,
      };
    case UPCOMING_TEACHER_SESSION.FAILURE:
      return {
        ...state,
        error: { upcomingTeacherSession: action.payload },
        isLoadingUpcomingTeacherSession: false,
      };
    case ONDEMAND_SESSION.SUCCESS:
      return {
        ...state,
        ondemandSessions: action.payload,
      };
    case ONDEMAND_SESSION.FAILURE:
      return {
        ...state,
        error: { ondemandSessions: action.payload },
      };
    case MY_SCHEDULED_SESSION.REQUEST:
      return {
        ...state,
        myScheduledSession: {
          ...state.myScheduledSession,
          isLoading: !action['@@redux-saga/SAGA_ACTION'],
        },
      };
    case MY_SCHEDULED_SESSION.SUCCESS:
      return {
        ...state,
        myScheduledSession: {
          ...action.payload,
          list:
            action.payload.page > 1
              ? [...state.myScheduledSession.list, ...action.payload.list]
              : [...action.payload.list],
          isLoading: false,
        },
      };
    case MY_SCHEDULED_SESSION.FAILURE:
      return {
        ...state,
        myScheduledSession: {
          ...state.myScheduledSession,
          isLoading: false,
        },
        error: { myScheduledSession: action.payload },
      };
    case SUBSCRIBE_GROUP_TUTORING.SUCCESS:
      return {
        ...state,
        subscribeGroupTutoring: action.payload,
      };
    case SUBSCRIBE_GROUP_TUTORING.FAILURE:
      return {
        ...state,
        error: { subscribeGroupTutoring: action.payload },
      };
    case UNSUBSCRIBE_GROUP_TUTORING.SUCCESS:
      return {
        ...state,
        unsubscribeGroupTutoring: action.payload,
      };
    case UNSUBSCRIBE_GROUP_TUTORING.FAILURE:
      return {
        ...state,
        error: { unsubscribeGroupTutoring: action.payload },
      };
    case CREDIT_DETAIL.SUCCESS:
      return {
        ...state,
        creditDetail: action.payload,
      };
    case CREDIT_DETAIL.FAILURE:
      return {
        ...state,
        error: { creditDetail: action.payload },
      };
    case CREATE_CLASS.SUCCESS:
      return {
        ...state,
        createClass: action.payload,
      };
    case CREATE_CLASS.FAILURE:
      return {
        ...state,
        error: {
          createClass: action.payload,
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
