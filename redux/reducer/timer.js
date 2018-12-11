import { RESET_TIMER, SET_TIMER } from '../constants';

const initialState = {
  seconds: 0,
  error: {},
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case RESET_TIMER:
      return {
        ...state,
        seconds: 0,
      };
    case SET_TIMER:
      return {
        ...state,
        seconds: state.seconds + action.payload,
      };
    default:
      return state;
  }
}
