import {
  GET_FLASHCARD,
  FLASH_CARD_IMAGE_USER,
  UPDATE_FLASH_CARD_IMAGE_USER,
  FLASH_CARD_IMAGE,
  GET_RANDOM_QUESTION,
  UPDATE_FLASH_CARD_VIEW_DATA,
  POLL_START_UPDATE_FLASH_CARD_IMAGE_USER,
  POLL_STOP_UPDATE_FLASH_CARD_IMAGE_USER,
} from '../constants';

const initialState = {
  flashcards: [],
  flashcardImageUser: {},
  flashcardImage: [],
  randomQuestion: [],
  flashcardView: {},
  polling: false,
  error: {},
};

export default function flashcard(state = initialState, action) {
  switch (action.type) {
    case GET_FLASHCARD.SUCCESS:
      return {
        ...state,
        flashcards: action.payload,
      };
    case GET_FLASHCARD.FAILURE:
      return {
        ...state,
        error: { flashcards: action.payload },
      };
    case FLASH_CARD_IMAGE_USER.SUCCESS:
      return {
        ...state,
        flashcardImageUser: action.payload,
      };
    case FLASH_CARD_IMAGE_USER.FAILURE:
      return {
        ...state,
        error: { flashcardImageUser: action.payload },
      };
    case UPDATE_FLASH_CARD_IMAGE_USER.SUCCESS:
      return {
        ...state,
        flashcardImageUser: action.payload,
      };
    case UPDATE_FLASH_CARD_IMAGE_USER.FAILURE:
      return {
        ...state,
        error: { flashcardImageUser: action.payload },
      };
    case FLASH_CARD_IMAGE.SUCCESS:
      return {
        ...state,
        flashcardImage: action.payload,
      };
    case FLASH_CARD_IMAGE.FAILURE:
      return {
        ...state,
        error: { flashcardImage: action.payload },
      };
    case GET_RANDOM_QUESTION.SUCCESS:
      return {
        ...state,
        randomQuestion: action.payload,
      };
    case GET_RANDOM_QUESTION.FAILURE:
      return {
        ...state,
        error: { randomQuestion: action.payload },
      };
    case UPDATE_FLASH_CARD_VIEW_DATA.SUCCESS:
      return {
        ...state,
        flashcardView: action.payload,
      };
    case POLL_START_UPDATE_FLASH_CARD_IMAGE_USER:
      return {
        ...state,
        polling: true,
      };
    case POLL_STOP_UPDATE_FLASH_CARD_IMAGE_USER:
      return {
        ...state,
        polling: true,
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
