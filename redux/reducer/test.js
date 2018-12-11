import {
  LAST_VALID_TEST_QUESTIONS,
  TEST_LOGGER,
  TEST_LOGGER_START,
  LEADER_BOARD,
  TEST_BY_TYPE_WITH_SECTION_WITH_RESULT,
  TEST_BY_ID_WITH_SECTION_WITH_RESULT,
} from '../constants';

const initialState = {
  lastValidTestQuestions: [],
  testLogger: [],
  testLoggerStart: {},
  leaderBoard: [],
  testByTypeWithSectionWithResult: [],
  testByIdWithSectionWithResult: [],
  error: {},
};

export default function test(state = initialState, action) {
  switch (action.type) {
    case LAST_VALID_TEST_QUESTIONS.SUCCESS:
      return {
        ...state,
        lastValidTestQuestions: action.payload,
      };
    case LAST_VALID_TEST_QUESTIONS.FAILURE:
      return {
        ...state,
        error: {
          lastValidTestQuestions: action.payload,
        },
      };
    case TEST_LOGGER.SUCCESS:
      return {
        ...state,
        testLogger: action.payload,
      };
    case TEST_LOGGER.FAILURE:
      return {
        ...state,
        error: {
          testLogger: action.payload,
        },
      };
    case TEST_LOGGER_START.SUCCESS:
      return {
        ...state,
        testLoggerStart: action.payload,
      };
    case TEST_LOGGER_START.FAILURE:
      return {
        ...state,
        error: {
          testLoggerStart: action.payload,
        },
      };
    case LEADER_BOARD.SUCCESS:
      return {
        ...state,
        leaderBoard: action.payload,
      };
    case LEADER_BOARD.FAILURE:
      return {
        ...state,
        error: {
          leaderBoard: action.payload,
        },
      };
    case TEST_BY_TYPE_WITH_SECTION_WITH_RESULT.SUCCESS:
      return {
        ...state,
        testByTypeWithSectionWithResult: action.payload,
      };
    case TEST_BY_TYPE_WITH_SECTION_WITH_RESULT.FAILURE:
      return {
        ...state,
        error: {
          testByTypeWithSectionWithResult: action.payload,
        },
      };
    case TEST_BY_ID_WITH_SECTION_WITH_RESULT.SUCCESS:
      return {
        ...state,
        testByIdWithSectionWithResult: action.payload,
      };
    case TEST_BY_ID_WITH_SECTION_WITH_RESULT.FAILURE:
      return {
        ...state,
        error: {
          testByIdWithSectionWithResult: action.payload,
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
