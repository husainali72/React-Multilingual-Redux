import { GET_TRANSLATION } from '../constants';

const initialState = {
  translationRequesting: true,
  hbwText: {},
  error: {},
};

export default function translation(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSLATION.REQUEST:
      return {
        ...state,
        error: {},
        translationRequesting: true,
      };
    case GET_TRANSLATION.SUCCESS:
      localStorage.setItem('globalText', JSON.stringify(action.payload));
      return {
        ...state,
        hbwText: action.payload,
        translationRequesting: false,
      };
    case GET_TRANSLATION.FAILURE:
      return {
        ...state,
        error: { hbwText: action.payload },
        translationRequesting: false,
      };
    default:
      return state;
  }
}
