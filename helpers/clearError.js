import { store } from '../app';
import { CLEAR_ERROR } from '../redux/constants';

export default function clearError(reducer) {
  if (!reducer) return;
  store.dispatch({ type: CLEAR_ERROR, payload: reducer });
}
