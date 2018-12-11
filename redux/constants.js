function generateConstants(service, base) {
  return {
    REQUEST: `${service}/${base}_REQUEST`,
    SUCCESS: `${service}/${base}_SUCCESS`,
    FAILURE: `${service}/${base}_FAILURE`,
  };
}

// ## ELASTIC SERVICE ##
export const GET_ELASTIC = generateConstants('elastic', 'GET_ELASTIC');
export const CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID = generateConstants(
  'elastic',
  'CHILDREN_TREE_WITH_PROGRESS_FOR_FOLDER_ID',
);
export const FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID = generateConstants(
  'elastic',
  'FOLDER_TREE_WITH_PROGRESS_FOR_PRODUCT_ID',
);
export const USER_ELASTIC_DATA = generateConstants('elastic', 'USER_ELASTIC_DATA');
export const UPDATE_USER_ELASTIC_DATA = generateConstants('elastic', 'UPDATE_USER_ELASTIC_DATA');
export const CREATE_USER_ELASTIC_DATA = generateConstants('elastic', 'CREATE_USER_ELASTIC_DATA');
export const GET_CURRICULUM = generateConstants('elastic', 'GET_CURRICULUM');

// ## FILE SERVICE ##
export const GET_EMOJI = generateConstants('file', 'GET_EMOJI');
export const UPLOAD_FILE = generateConstants('file', 'UPLOAD_FILE');
export const GET_OURTEAM_MEMBER = generateConstants('file', 'GET_OURTEAM_MEMBER');
export const GET_ACTIVE_JOBS = generateConstants('file', 'GET_ACTIVE_JOBS');

// ## FLASHCARD SERVICE ##
export const GET_FLASHCARD = generateConstants('flashcard', 'GET_FLASHCARD');
export const FLASH_CARD_IMAGE_USER = generateConstants('flashcard', 'FLASH_CARD_IMAGE_USER');
export const UPDATE_FLASH_CARD_IMAGE_USER = generateConstants('flashcard', 'UPDATE_FLASH_CARD_IMAGE_USER');
export const FLASH_CARD_IMAGE = generateConstants('flashcard', 'FLASH_CARD_IMAGE');
export const GET_RANDOM_QUESTION = generateConstants('flashcard', 'GET_RANDOM_QUESTION');
export const UPDATE_FLASH_CARD_VIEW_DATA = generateConstants('flashcard', 'UPDATE_FLASH_CARD_VIEW_DATA');

export const POLL_START_UPDATE_FLASH_CARD_IMAGE_USER = 'POLL_START_UPDATE_FLASH_CARD_IMAGE_USER';
export const POLL_STOP_UPDATE_FLASH_CARD_IMAGE_USER = 'POLL_STOP_UPDATE_FLASH_CARD_IMAGE_USER';
// ## FOLDER SERVICE ##
export const LIST_PRODUCTS = generateConstants('folder', 'LIST_PRODUCTS');
export const GET_MAIN_FOLDERS = generateConstants('folder', 'GET_MAIN_FOLDERS');
export const GET_FOLDER_BY_ID = generateConstants('folder', 'GET_FOLDER_BY_ID');
export const LIST_COUNTRY = generateConstants('folder', 'LIST_COUNTRY');
export const GET_CHILDREN = generateConstants('folder', 'GET_CHILDREN');
export const SEARCH_REGIONS = generateConstants('folder', 'SEARCH_REGIONS');
export const SEARCH_CITIES = generateConstants('folder', 'SEARCH_CITIES');

// ## PACKAGE SERVICE ##
export const LIST_PACKAGE_WITH_ADDON = generateConstants('package', 'LIST_PACKAGE_WITH_ADDON');
export const GET_PACKAGE_BY_ID = generateConstants('package', 'GET_PACKAGE_BY_ID');
export const LIST_BANKS = generateConstants('package', 'LIST_BANKS');
export const GET_VOUCHER_BY_CODE = generateConstants('package', 'GET_VOUCHER_BY_CODE');
export const APPLY_VOUCHER = generateConstants('package', 'APPLY_VOUCHER');
export const GET_LAST_USED_VOUCHER = generateConstants('package', 'GET_LAST_USED_VOUCHER');
export const PAYMENT = generateConstants('package', 'PAYMENT');
export const GET_BANK_DETAILS = generateConstants('package', 'GET_BANK_DETAILS');
export const SEND_BANK_DETAILS = generateConstants('package', 'SEND_BANK_DETAILS');
export const GET_CREDIT_HISTORY = generateConstants('package', 'GET_CREDIT_HISTORY');
export const GET_PAYMENT_HISTORY = generateConstants('package', 'PACKAGE_HISTORY');
export const SUBMIT_PACKAGE_FEEDBACK = generateConstants('package', 'SUBMIT_PACKAGE_FEEDBACK');
export const DEMO_TRANSACTION = generateConstants('package', 'DEMO_TRANSCATION');
export const GET_PENDING_TRANSACTION = generateConstants('package', 'GET_PENDING_TRANSCATION');

// ## QUESTION SERVICE ##
export const GET_QUESTION = generateConstants('question', 'GET_QUESTION');
export const SAVE_CHOICE = generateConstants('question', 'SAVE_CHOICE');
export const QUESTION_LIST_WITH_USER_RESULT = generateConstants('question', 'QUESTION_LIST_WITH_USER_RESULT');
export const QUESTION_LOGGER = generateConstants('question', 'QUESTION_LOGGER');
export const UPDATE_QUESTION_LOGGER = generateConstants('question', 'UPDATE_QUESTION_LOGGER');
export const TEST_HISTORY = generateConstants('question', 'TEST_HISTORY');

export const TEST_QUESTION_SELECTED = 'TEST_QUESTION_SELECTED';

// ## TRANSLATION SERVICE ##
export const GET_TRANSLATION = generateConstants('translate', 'GET_TRANSLATION');

// ## TUTORING SERVICE ##
export const GET_CLASS = generateConstants('tutoring', 'GET_CLASS');
export const GET_TEACHERLIST = generateConstants('tutoring', 'GET_TEACHERLIST');
export const SEARCHING_TEACHER_FOR_CLASS = generateConstants('tutoring', 'SEARCHING_TEACHER_FOR_CLASS ');
export const VOTE_TEACHER = generateConstants('tutoring', 'VOTE_TEACHER');
export const UNSUBSCRIBE_COURSES = generateConstants('tutoring', 'UNSUBSCRIBE_COURSES');
export const SUBSCRIBE_COURSES = generateConstants('tutoring', 'SUBSCRIBE_COURSES');
export const COURSES = generateConstants('tutoring', 'COURSES');
export const SUBSCRIBE_GROUP_TUTORING = generateConstants('tutoring', 'SUBSCRIBE_GROUP_TUTORING');
export const UNSUBSCRIBE_GROUP_TUTORING = generateConstants('tutoring', 'UNSUBSCRIBE_GROUP_TUTORING');
export const CREDIT_DETAIL = generateConstants('tutoring', 'CREDIT_DETAIL');
export const CREATE_CLASS = generateConstants('tutoring', 'CREATE_CLASS');
export const UPCOMING_GROUP_TUTORING = generateConstants('tutoring', 'UPCOMING_GROUP_TUTORING');
export const UPCOMING_GROUP_COMPETITION = generateConstants('tutoring', 'UPCOMING_GROUP_COMPETITION');
export const MY_SCHEDULED_SESSION = generateConstants('tutoring', 'MY_SCHEDULED_SESSION');
export const MY_LIVE_SESSION = generateConstants('tutoring', 'MY_LIVE_SESSION');
export const FEATURED_SESSION = generateConstants('tutoring', 'FEATURED_SESSION');
export const UPCOMING_TEACHER_SESSION = generateConstants('tutoring', 'UPCOMING_TEACHER_SESSION');
export const ONDEMAND_SESSION = generateConstants('tutoring', 'ONDEMAND_SESSION');
export const GET_TEACHER_DETAIL = generateConstants('tutoring', 'GET_TEACHER_DEATIL');

// ## USER SERVICE ##
export const LOGIN_USER = generateConstants('user', 'LOGIN_USER');
export const GET_PROFILE = generateConstants('user', 'GET_PROFILE');
export const SIGNUP_USER = generateConstants('user', 'SIGNUP_USER');
export const ORGANISATION_SIGNUP_USER = generateConstants('user', 'ORGANISATION_SIGNUP_USER');
export const LOGGED_OUT_USER = generateConstants('user', 'LOGGED_OUT_USER');
export const LIST_TEACHERS = generateConstants('user', 'LIST_TEACHERS');
export const LIST_STUDENTS = generateConstants('user', 'LIST_STUDENTS');
export const GET_USER_BY_EMAIL = generateConstants('user', 'GET_USER_BY_EMAIL');
export const SEND_SMS = generateConstants('user', 'SEND_SMS');
export const VERIFY_OTP = generateConstants('user', 'VERIFY_OTP');
export const VERIFY_EMAIL = generateConstants('user', 'VERIFY_EMAIL');
export const RESET_PASSWORD = generateConstants('user', 'RESET_PASSWORD');
export const CHANGE_PASSWORD = generateConstants('user', 'CHANGE_PASSWORD');
export const FRIENDS = generateConstants('user', 'FRIENDS');
export const FRIEND_RECOMMENDATIONS = generateConstants('user', 'FRIEND_RECOMMENDATIONS');
export const FOLLOW_RECOMMENDATIONS = generateConstants('user', 'FOLLOW_RECOMMENDATIONS');
export const SEND_FRIEND_REQUEST = generateConstants('user', 'SEND_FRIEND_REQUEST');
export const REQUESTS_PENDING_ON_OTHERS = generateConstants('user', 'REQUESTS_PENDING_ON_OTHERS');
export const REQUESTS_PENDING_ON_ME = generateConstants('user', 'REQUESTS_PENDING_ON_ME');
export const ACCEPT_FRIEND_REQUEST = generateConstants('user', 'ACCEPT_FRIEND_REQUEST');
export const REJECT_FRIEND_REQUEST = generateConstants('user', 'REJECT_FRIEND_REQUEST');
export const USERS_BY_NAME_OR_EMAIL = generateConstants('user', 'USERS_BY_NAME_OR_EMAIL');
export const FOLLOWERS = generateConstants('user', 'FOLLOWERS');
export const TIMELINE = generateConstants('user', 'TIMELINE');
export const FOLLOWING = generateConstants('user', 'FOLLOWING');
export const UNFOLLOW = generateConstants('user', 'UNFOLLOW');
export const FOLLOW = generateConstants('user', 'FOLLOW');
export const PROFILE = generateConstants('user', 'PROFILE');
export const TIMELINE_UPDATE = generateConstants('user', 'TIMELINE_UPDATE');

// ## Toast ##
export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

// ## School ##
export const SEARCH_SCHOOL = generateConstants('school', 'SEARCH_SCHOOL');

// ## Test ##
export const LAST_VALID_TEST_QUESTIONS = generateConstants('test', 'LAST_VALID_TEST_QUESTIONS');
export const TEST_LOGGER = generateConstants('test', 'TEST_LOGGER');
export const TEST_LOGGER_START = generateConstants('test', 'TEST_LOGGER_START');
export const LEADER_BOARD = generateConstants('test', 'LEADER_BOARD');
export const TEST_BY_TYPE_WITH_SECTION_WITH_RESULT = generateConstants('test', 'TEST_BY_TYPE_WITH_SECTION_WITH_RESULT');
export const TEST_BY_ID_WITH_SECTION_WITH_RESULT = generateConstants('test', 'TEST_BY_ID_WITH_SECTION_WITH_RESULT');

// # polling ##
export const START_POLLING = 'START_POLLING';
export const STOP_POLLING = 'STOP_POLLING';

// # timer ##
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const SET_TIMER = 'SET_TIMER';

// # dashboard ##
export const CREATE_CLASS_SIDEBAR = {
  OPEN: 'CREATE_CLASS_SIDEBAR_OPEN',
  CLOSE: 'CREATE_CLASS_SIDEBAR_CLOSE',
};
export const SAVE_CURRENT_RESOURCE = 'SAVE_CURRENT_RESOURCE';
export const FRIEND_SEARCH_MODAL = 'FRIEND_SEARCH_MODAL';
export const SELECTED_PRODUCT = 'SELECTED_PRODUCT';
export const NO_CREDIT_MODAL = 'NO_PAYMENT_MODAL';

// # Notification ##
export const USER_PUSH_TOKEN = generateConstants('notification', 'USER_PUSH_TOKEN');
export const USER_PUSH_TOKEN_DELETE = generateConstants('notification', 'USER_PUSH_TOKEN_DELETE');

export const CLEAR_ERROR = 'CLEAR_ERROR';
