import { put, call, takeEvery } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { packageApi } from '../restApi';
import {
  LIST_PACKAGE_WITH_ADDON,
  GET_PACKAGE_BY_ID,
  LIST_BANKS,
  GET_VOUCHER_BY_CODE,
  APPLY_VOUCHER,
  GET_LAST_USED_VOUCHER,
  PAYMENT,
  SEND_BANK_DETAILS,
  GET_BANK_DETAILS,
  GET_CREDIT_HISTORY,
  GET_PAYMENT_HISTORY,
  DEMO_TRANSACTION,
  GET_PENDING_TRANSACTION,
  SUBMIT_PACKAGE_FEEDBACK,
} from '../constants';

const getPackagesAPI = () => packageApi.get('packagesWithAddon');
const getPackageByIdAPI = packageId => packageApi.get(`packages/${packageId}`);
const getBanksAPI = () => packageApi.get('banks');
const getVoucherByCodeAPI = code => packageApi.get(`voucherByCode/${code}`);
const applyVoucherAPI = ({ API_TYPE, ...data }) => packageApi.post(`applyVoucher${API_TYPE}`, data);
const getLastUsedVoucherAPI = ({ package_id, product_id }) =>
  packageApi.get(`lastUsedVoucher/${package_id}?product_id=${product_id}`);
const paymentAPI = ({ API_TYPE, ...data }) => packageApi.post(`transactions${API_TYPE}`, data);
const sendBankDetailsAPI = data => packageApi.post('sendBankDetailsPublic', data);
const getBankDetailsAPI = transactionId => packageApi.get(`myBankTransactions/${transactionId}`);
const getPaymentHistoryAPI = () => packageApi.get('paymentHistory');
const getCreditHistoryAPI = () => packageApi.get('creditHistory');
const demoTransactionAPI = data => packageApi.post('demoTransactionPublic', data);
const getPendingTransactionAPI = packageId => packageApi.get(`pendingTransactions/${packageId}`);
const submitPackageFeedbackAPI = data => packageApi.post('userFeedback', data);

function* getPackages() {
  try {
    const response = yield call(getPackagesAPI);
    if (response.data.success) {
      yield put({
        type: LIST_PACKAGE_WITH_ADDON.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: LIST_PACKAGE_WITH_ADDON.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: LIST_PACKAGE_WITH_ADDON.FAILURE, payload: err });
  }
}

function* getPackageById({ payload: packageId }) {
  try {
    const response = yield call(getPackageByIdAPI, packageId);
    if (response.data.success) {
      yield put({
        type: GET_PACKAGE_BY_ID.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({
        type: GET_PACKAGE_BY_ID.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: GET_PACKAGE_BY_ID.FAILURE, payload: err });
  }
}

function* getBanks() {
  try {
    const response = yield call(getBanksAPI);
    if (response.data) {
      yield put({
        type: LIST_BANKS.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: LIST_BANKS.FAILURE,
        payload: response.data,
      });
    }
  } catch (err) {
    yield put({ type: LIST_BANKS.FAILURE, payload: err });
  }
}

function* getVoucherByCode({ payload: code }) {
  try {
    const response = yield call(getVoucherByCodeAPI, code);
    if (response.data.success) {
      yield put({
        type: GET_VOUCHER_BY_CODE.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({
        type: GET_VOUCHER_BY_CODE.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: GET_VOUCHER_BY_CODE.FAILURE, payload: err });
  }
}

// If user is not authorized add { API_TYPE: 'Public', userId: id } property
function* applyVoucher({ payload: data }) {
  try {
    const response = yield call(applyVoucherAPI, data);
    if (response.data.success) {
      yield put({
        type: APPLY_VOUCHER.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({
        type: APPLY_VOUCHER.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: APPLY_VOUCHER.FAILURE, payload: err });
  }
}

function* getLastUsedVoucher({ payload: data }) {
  try {
    const response = yield call(getLastUsedVoucherAPI, data);
    if (response.data.success) {
      yield put({
        type: GET_LAST_USED_VOUCHER.SUCCESS,
        payload: response.data.data.length ? response.data.data[0] : {},
      });
    } else {
      yield put({
        type: GET_LAST_USED_VOUCHER.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: GET_LAST_USED_VOUCHER.FAILURE, payload: err });
  }
}

// If user is not authorized add { API_TYPE: 'Public'} property
function* payment({ payload: data }) {
  try {
    const response = yield call(paymentAPI, data);
    if (response.data.success) {
      yield put({
        type: PAYMENT.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({
        type: PAYMENT.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: PAYMENT.FAILURE, payload: err });
  }
}

function* sendBankDetails({ payload: data }) {
  try {
    const response = yield call(sendBankDetailsAPI, data);
    if (response.data.success) {
      yield put({
        type: SEND_BANK_DETAILS.SUCCESS,
        payload: { success: true },
      });
    } else {
      yield put({
        type: SEND_BANK_DETAILS.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: SEND_BANK_DETAILS.FAILURE, payload: err });
  }
}

function* getBankDetails({ payload: transactionsId }) {
  try {
    const response = yield call(getBankDetailsAPI, transactionsId);
    if (response.data.success) {
      yield put({
        type: GET_BANK_DETAILS.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({
        type: GET_BANK_DETAILS.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: GET_BANK_DETAILS.FAILURE, payload: err });
  }
}

function* getPaymentHistory() {
  try {
    const response = yield call(getPaymentHistoryAPI);
    if (response.data.success) {
      yield put({
        type: GET_PAYMENT_HISTORY.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: GET_PAYMENT_HISTORY.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: GET_PAYMENT_HISTORY.FAILURE, payload: err });
  }
}

function* getCreditHistory() {
  try {
    const response = yield call(getCreditHistoryAPI);
    if (response.data.success) {
      yield put({
        type: GET_CREDIT_HISTORY.SUCCESS,
        payload: isEmpty(response.data.data) ? [] : response.data.data,
      });
    } else {
      yield put({
        type: GET_CREDIT_HISTORY.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: GET_CREDIT_HISTORY.FAILURE, payload: err });
  }
}

function* demoTransaction({ payload: data }) {
  try {
    const response = yield call(demoTransactionAPI, data);
    if (response.data.success) {
      yield put({
        type: DEMO_TRANSACTION.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({
        type: DEMO_TRANSACTION.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: DEMO_TRANSACTION.FAILURE, payload: err });
  }
}

function* getPendingTransaction({ payload: packageId }) {
  try {
    const response = yield call(getPendingTransactionAPI, packageId);
    if (response.data.success) {
      yield put({
        type: GET_PENDING_TRANSACTION.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({
        type: GET_PENDING_TRANSACTION.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: GET_PENDING_TRANSACTION.FAILURE, payload: err });
  }
}

function* submitPackageFeedback({ payload: data }) {
  try {
    const response = yield call(submitPackageFeedbackAPI, data);
    if (response.data.success) {
      yield put({
        type: SUBMIT_PACKAGE_FEEDBACK.SUCCESS,
        payload: isEmpty(response.data.data) ? {} : response.data.data[0],
      });
    } else {
      yield put({
        type: SUBMIT_PACKAGE_FEEDBACK.FAILURE,
        payload: response.data.message,
      });
    }
  } catch (err) {
    yield put({ type: SUBMIT_PACKAGE_FEEDBACK.FAILURE, payload: err });
  }
}

export function* packageSaga() {
  yield [
    takeEvery(LIST_PACKAGE_WITH_ADDON.REQUEST, getPackages),
    takeEvery(GET_PACKAGE_BY_ID.REQUEST, getPackageById),
    takeEvery(LIST_BANKS.REQUEST, getBanks),
    takeEvery(GET_VOUCHER_BY_CODE.REQUEST, getVoucherByCode),
    takeEvery(APPLY_VOUCHER.REQUEST, applyVoucher),
    takeEvery(GET_LAST_USED_VOUCHER.REQUEST, getLastUsedVoucher),
    takeEvery(PAYMENT.REQUEST, payment),
    takeEvery(SEND_BANK_DETAILS.REQUEST, sendBankDetails),
    takeEvery(GET_BANK_DETAILS.REQUEST, getBankDetails),
    takeEvery(GET_PAYMENT_HISTORY.REQUEST, getPaymentHistory),
    takeEvery(GET_CREDIT_HISTORY.REQUEST, getCreditHistory),
    takeEvery(DEMO_TRANSACTION.REQUEST, demoTransaction),
    takeEvery(GET_PENDING_TRANSACTION.REQUEST, getPendingTransaction),
    takeEvery(SUBMIT_PACKAGE_FEEDBACK.REQUEST, submitPackageFeedback),
  ];
}
