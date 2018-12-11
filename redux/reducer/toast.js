import { ADD_TOAST, REMOVE_TOAST } from '../constants';

const initialState = {
  toasts: [],
};

export default function toast(state = initialState, action) {
  switch (action.type) {
    case ADD_TOAST:
      return {
        ...state,
        toasts:
          state.toasts.length && state.toasts[state.toasts.length - 1].text === action.payload.text
            ? state.toasts
            : [...state.toasts, action.payload],
      };
    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(o => o.id !== action.payload),
      };
    default:
      return state;
  }
}
