import { combineReducers } from 'redux-immutable';
import elastic from './reducer/elastic';
import file from './reducer/file';
import flashcard from './reducer/flashcard';
import folder from './reducer/folder';
import packages from './reducer/package';
import question from './reducer/question';
import school from './reducer/school';
import test from './reducer/test';
import toast from './reducer/toast';
import translation from './reducer/translation';
import tutoring from './reducer/tutoring';
import user from './reducer/user';
import timer from './reducer/timer';
import dashboard from './reducer/dashboard';
import notification from './reducer/notification';

const rootReducer = combineReducers({
  elastic,
  file,
  flashcard,
  folder,
  packages,
  question,
  school,
  test,
  toast,
  translation,
  tutoring,
  user,
  timer,
  dashboard,
  notification,
});

export default rootReducer;
