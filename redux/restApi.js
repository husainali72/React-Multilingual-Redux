import { create } from "apisauce";
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
  mobileVendor,
  mobileModel
} from "react-device-detect";
import { store } from "../app";
import { LOGGED_OUT_USER, NO_CREDIT_MODAL } from "./constants";
import { addToast, TOAST_TYPE } from "../components/Toast";
import { setAuthorizationHeader } from "../helpers";

const headers = {
  country: 1,
  locale: localStorage.getItem("language") || "ar",
  platform: "web",
  browser: `${browserName}:${browserVersion}`,
  os_details: `${osName}:${osVersion}`,
  device_details: `${mobileVendor}:${mobileModel}`,
  resolution: `${window.innerWidth}:${window.innerHeight}`
};

// Intercept all api responses
const apiMonitor = response => {
  if (response.status === 401) {
    store.dispatch({ type: LOGGED_OUT_USER.REQUEST, payload: true });
    addToast("User not Authorized, Please login", TOAST_TYPE.ERROR, 5);
    return false;
  }
  // no credit
  if (response.status === 402) {
    store.dispatch({ type: NO_CREDIT_MODAL, payload: true });
    return false;
  }
  if (
    response.headers["x-token-refresh"] &&
    response.config.url.indexOf("logout") === -1
  ) {
    return setAuthorizationHeader(response.headers["x-token-refresh"]);
  }
  return true;
};

export const usersApi = create({
  baseURL: process.env.API_USER_URL,
  headers
});
usersApi.addMonitor(apiMonitor);

export const translationApi = create({
  baseURL: process.env.API_TRANSLATION_URL,
  headers
});
translationApi.addMonitor(apiMonitor);

export const folderApi = create({
  baseURL: process.env.API_FOLDER_URL,
  headers
});
folderApi.addMonitor(apiMonitor);

export const packageApi = create({
  baseURL: process.env.API_PACKAGE_URL,
  headers
});
packageApi.addMonitor(apiMonitor);

export const tutoringApi = create({
  baseURL: process.env.API_TUTORING_URL,
  headers
});
tutoringApi.addMonitor(apiMonitor);

export const questionApi = create({
  baseURL: process.env.API_QUESTION_URL,
  headers
});
questionApi.addMonitor(apiMonitor);

export const flashcardApi = create({
  baseURL: process.env.API_FLASHCARD_URL,
  headers
});
flashcardApi.addMonitor(apiMonitor);

export const schoolApi = create({
  baseURL: process.env.API_SCHOOL_URL,
  headers
});
schoolApi.addMonitor(apiMonitor);

export const fileApi = create({
  baseURL: process.env.API_FILE_URL,
  headers
});
fileApi.addMonitor(apiMonitor);

export const elasticApi = create({
  baseURL: process.env.API_ELASTIC_URL,
  headers
});
elasticApi.addMonitor(apiMonitor);

export const testApi = create({
  baseURL: process.env.API_TEST_URL,
  headers
});
testApi.addMonitor(apiMonitor);

export const notificationApi = create({
  baseURL: process.env.API_NOTIFICATION_URL,
  headers
});
