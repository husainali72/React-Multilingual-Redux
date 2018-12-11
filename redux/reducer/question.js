import {
  GET_QUESTION,
  SAVE_CHOICE,
  QUESTION_LIST_WITH_USER_RESULT,
  QUESTION_LOGGER,
  UPDATE_QUESTION_LOGGER,
  TEST_HISTORY,
  TEST_QUESTION_SELECTED,
} from '../constants';

const initialState = {
  questionData: {},
  saveChoice: {},
  questionListWithUserResult: [],
  questionLogger: [],
  updateQuestionLogger: [],
  testHistory: [],
  selectedQuestion: {},
  error: {},
};

export default function question(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION.SUCCESS:
      return {
        ...state,
        questionData: action.payload,
      };
    case GET_QUESTION.FAILURE:
      return {
        ...state,
        questionData: {},
        error: { questionData: action.payload },
      };
    case SAVE_CHOICE.SUCCESS:
      return {
        ...state,
        saveChoice: action.payload,
      };
    case SAVE_CHOICE.FAILURE:
      return {
        ...state,
        error: { saveChoice: action.payload },
      };
    case QUESTION_LIST_WITH_USER_RESULT.SUCCESS:
      return {
        ...state,
        questionListWithUserResult: action.payload,
      };
    case QUESTION_LIST_WITH_USER_RESULT.FAILURE:
      return {
        ...state,
        error: { questionListWithUserResult: action.payload },
      };
    case QUESTION_LOGGER.SUCCESS:
      return {
        ...state,
        questionLogger: action.payload,
      };
    case QUESTION_LOGGER.FAILURE:
      return {
        ...state,
        error: { questionLogger: action.payload },
      };
    case UPDATE_QUESTION_LOGGER.SUCCESS:
      return {
        ...state,
        updateQuestionLogger: action.payload,
      };
    case UPDATE_QUESTION_LOGGER.FAILURE:
      return {
        ...state,
        error: { updateQuestionLogger: action.payload },
      };
    case TEST_HISTORY.SUCCESS:
      return {
        ...state,
        testHistory: action.payload,
      };
    case TEST_HISTORY.FAILURE:
      return {
        ...state,
        error: { testHistory: action.payload },
      };
    case TEST_QUESTION_SELECTED:
      return {
        ...state,
        selectedQuestion: action.payload,
        questionLogger: [],
      };
    default:
      return state;
  }
}
