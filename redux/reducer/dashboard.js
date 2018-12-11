import {
  CREATE_CLASS_SIDEBAR,
  SAVE_CURRENT_RESOURCE,
  FRIEND_SEARCH_MODAL,
  SELECTED_PRODUCT,
  NO_CREDIT_MODAL,
} from '../constants';

const initialState = {
  createClassSidebar: {},
  currentResource: {},
  friendSearchModal: false,
  selectedProduct: {},
  noCreditModal: false,
};

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case CREATE_CLASS_SIDEBAR.OPEN:
      return {
        ...state,
        createClassSidebar: action.payload,
      };
    case CREATE_CLASS_SIDEBAR.CLOSE:
      return {
        ...state,
        createClassSidebar: {},
      };
    case SAVE_CURRENT_RESOURCE:
      return {
        ...state,
        currentResource: action.payload,
      };
    case FRIEND_SEARCH_MODAL:
      return {
        ...state,
        friendSearchModal: action.payload,
      };
    case SELECTED_PRODUCT:
      localStorage.selectedProduct = JSON.stringify(action.payload);
      return {
        ...state,
        selectedProduct: { ...action.payload },
      };
    case NO_CREDIT_MODAL:
      return {
        ...state,
        noCreditModal: action.payload,
      };
    default:
      return state;
  }
}
