import { USER_PUSH_TOKEN, USER_PUSH_TOKEN_DELETE } from '../constants';

const initialState = {
  userPushToken: false,
  userPushTokenDelete: false,
  hbwText: {},
  error: {},
};

export default function notification(state = initialState, action) {
  switch (action.type) {
    case USER_PUSH_TOKEN.SUCCESS:
      return {
        ...state,
        userPushToken: true,
      };
    case USER_PUSH_TOKEN.FAILURE:
      return {
        ...state,
        error: { userPushToken: action.payload },
      };
    case USER_PUSH_TOKEN_DELETE.SUCCESS:
      return {
        ...state,
        userPushTokenDelete: true,
      };
    case USER_PUSH_TOKEN_DELETE.FAILURE:
      return {
        ...state,
        error: { userPushTokenDelete: action.payload },
      };
    default:
      return state;
  }
}
