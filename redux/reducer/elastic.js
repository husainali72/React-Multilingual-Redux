import {
  GET_ELASTIC,
  CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID,
  FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID,
  USER_ELASTIC_DATA,
  UPDATE_USER_ELASTIC_DATA,
  CREATE_USER_ELASTIC_DATA,
  GET_CURRICULUM,
} from '../constants';

const initialState = {
  getUserData: {},
  childrenTreeWithProgressForFolderId: [],
  folderTreeWithProgressForProductId: [],
  userElasticData: {},
  updateUserElasticData: {},
  createUserElasticData: {},
  curriculum: [],
  error: {},
};

export default function elastic(state = initialState, action) {
  switch (action.type) {
    case GET_ELASTIC.SUCCESS:
      return {
        ...state,
        getUserData: action.payload,
      };
    case GET_ELASTIC.FAILURE:
      return {
        ...state,
        error: { getUserData: action.payload },
      };
    case CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID.SUCCESS:
      return {
        ...state,
        childrenTreeWithProgressForFolderId: action.payload,
      };
    case CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID.FAILURE:
      return {
        ...state,
        error: { childrenTreeWithProgressForFolderId: action.payload },
      };
    case FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID.SUCCESS:
      return {
        ...state,
        folderTreeWithProgressForProductId: action.payload,
      };
    case FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID.FAILURE:
      return {
        ...state,
        error: { folderTreeWithProgressForProductId: action.payload },
      };
    case USER_ELASTIC_DATA.SUCCESS:
      return {
        ...state,
        userElasticData: action.payload,
      };
    case USER_ELASTIC_DATA.FAILURE:
      return {
        ...state,
        error: { userElasticData: action.payload },
      };
    case UPDATE_USER_ELASTIC_DATA.SUCCESS:
      return {
        ...state,
        updateUserElasticData: action.payload,
      };
    case UPDATE_USER_ELASTIC_DATA.FAILURE:
      return {
        ...state,
        error: { updateUserElasticData: action.payload },
      };
    case CREATE_USER_ELASTIC_DATA.SUCCESS:
      return {
        ...state,
        createUserElasticData: action.payload,
      };
    case CREATE_USER_ELASTIC_DATA.FAILURE:
      return {
        ...state,
        error: { createUserElasticData: action.payload },
      };
    case GET_CURRICULUM.SUCCESS:
      localStorage.curriculum = JSON.stringify(action.payload);
      return {
        ...state,
        curriculum: action.payload,
      };
    case GET_CURRICULUM.FAILURE:
      return {
        ...state,
        error: { curriculum: action.payload },
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
