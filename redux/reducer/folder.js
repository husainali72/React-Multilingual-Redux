import {
  GET_MAIN_FOLDERS,
  GET_FOLDER_BY_ID,
  LIST_PRODUCTS,
  SEARCH_REGIONS,
  SEARCH_CITIES,
  LIST_COUNTRY,
  GET_CHILDREN,
} from '../constants';

const initialState = {
  listGrades: [],
  folderDetailsById: {},
  products: [],
  regionsList: [],
  citiesList: [],
  countries: {},
  children: {},
  error: {},
};

export default function folder(state = initialState, action) {
  if (action.type.indexOf('_REQUEST') !== -1) {
    return {
      ...state,
      error: {},
    };
  }
  switch (action.type) {
    case GET_MAIN_FOLDERS.SUCCESS:
      return {
        ...state,
        listGrades: action.payload,
      };
    case GET_MAIN_FOLDERS.FAILURE:
      return {
        ...state,
        error: { listGrades: action.payload },
      };
    case GET_FOLDER_BY_ID.SUCCESS:
      return {
        ...state,
        folderDetailsById: { ...state.folderDetailsById, ...action.payload },
      };
    case GET_FOLDER_BY_ID.FAILURE:
      return {
        ...state,
        error: { folderDetailsById: action.payload },
      };
    case LIST_PRODUCTS.SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case LIST_PRODUCTS.FAILURE:
      return {
        ...state,
        error: { products: action.payload },
      };
    case SEARCH_REGIONS.SUCCESS:
      return {
        ...state,
        regionsList: action.payload.page > 1 ? [...state.regionsList, ...action.payload.list] : action.payload.list,
      };
    case SEARCH_REGIONS.FAILURE:
      return {
        ...state,
        error: { region: action.payload },
      };
    case SEARCH_CITIES.SUCCESS:
      return {
        ...state,
        citiesList: action.payload.page > 1 ? [...state.citiesList, ...action.payload.list] : action.payload.list,
      };
    case SEARCH_CITIES.FAILURE:
      return {
        ...state,
        error: { city: action.payload },
      };
    case LIST_COUNTRY.SUCCESS:
      localStorage.country = JSON.stringify(action.payload);
      return {
        ...state,
        countries: action.payload,
      };
    case LIST_COUNTRY.FAILURE:
      return {
        ...state,
        error: { countries: action.payload },
      };
    case GET_CHILDREN.SUCCESS:
      return {
        ...state,
        children: { ...state.children, ...action.payload },
      };
    case GET_CHILDREN.FAILURE:
      return {
        ...state,
        error: { children: action.payload },
      };

    default:
      return state;
  }
}
