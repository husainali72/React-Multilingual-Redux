import { SEARCH_SCHOOL } from '../constants';

const initialState = {
  schoolsList: [],
  error: {},
};

export default function school(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SCHOOL.SUCCESS:
      return {
        ...state,
        schoolsList: action.payload.page > 1 ? [...state.schoolsList, ...action.payload.list] : action.payload.list,
      };
    case SEARCH_SCHOOL.FAILURE:
      return {
        ...state,
        error: {
          schoolsList: action.payload,
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
