import { all } from 'redux-saga/effects';
import { elasticSaga } from './elastic';
import { fileSaga } from './file';
import { flashcardSaga } from './flashcard';
import { folderSaga } from './folder';
import { packageSaga } from './package';
import { questionSaga } from './question';
import { toastSaga } from './toast';
import { translationSaga } from './translation';
import { tutoringSaga } from './tutoring';
import { userSaga } from './user';
import { pollingSaga } from './polling';
import { timerSaga } from './timer';
import { testSaga } from './test';
import { notificationSaga } from './notification';
import { schoolSaga } from './school';

export default function* rootSaga() {
  yield all([
    elasticSaga(),
    fileSaga(),
    flashcardSaga(),
    folderSaga(),
    packageSaga(),
    questionSaga(),
    toastSaga(),
    translationSaga(),
    tutoringSaga(),
    userSaga(),
    testSaga(),
    pollingSaga(),
    testSaga(),
    timerSaga(),
    notificationSaga(),
    schoolSaga(),
  ]);
}
