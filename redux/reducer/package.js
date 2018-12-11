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
  SUBMIT_PACKAGE_FEEDBACK,
  GET_CREDIT_HISTORY,
  GET_PAYMENT_HISTORY,
  DEMO_TRANSACTION,
  GET_PENDING_TRANSACTION,
} from '../constants';

const initialState = {
  packageList: [],
  bankList: [],
  packageDetails: {},
  voucherByCode: {},
  applyVoucher: {},
  lastUsedVoucher: {},
  payment: {},
  sendBankDetails: {},
  getBankDetails: {},
  packageFeedback: {},
  creditHistoy: [],
  paymentHistory: [],
  payLaterTransaction: {},
  pendingTransaction: [],
  error: {},
};

export default function packages(state = initialState, action) {
  if (action.type.indexOf('_REQUEST') !== -1) {
    return {
      ...state,
      error: {},
    };
  }
  switch (action.type) {
    case LIST_PACKAGE_WITH_ADDON.SUCCESS:
      return {
        ...state,
        packageList: action.payload,
      };
    case LIST_PACKAGE_WITH_ADDON.FAILURE:
      return {
        ...state,
        packageList: [],
        error: {
          packageList: action.payload,
        },
      };
    case GET_PACKAGE_BY_ID.SUCCESS:
      return {
        ...state,
        packageDetails: action.payload,
      };
    case GET_PACKAGE_BY_ID.FAILURE:
      return {
        ...state,
        packageDetails: {},
        error: {
          packageDetails: action.payload,
        },
      };
    case LIST_BANKS.SUCCESS:
      return {
        ...state,
        bankList: action.payload,
      };
    case LIST_BANKS.FAILURE:
      return {
        ...state,
        bankList: [],
        error: {
          bankList: action.payload,
        },
      };
    case GET_VOUCHER_BY_CODE.SUCCESS:
      return {
        ...state,
        voucherByCode: action.payload,
      };
    case GET_VOUCHER_BY_CODE.FAILURE:
      return {
        ...state,
        voucherByCode: {},
        error: {
          voucherByCode: action.payload,
        },
      };
    case APPLY_VOUCHER.SUCCESS:
      return {
        ...state,
        applyVoucher: action.payload,
      };
    case APPLY_VOUCHER.FAILURE:
      return {
        ...state,
        error: {
          applyVoucher: action.payload,
        },
      };
    case GET_LAST_USED_VOUCHER.SUCCESS:
      return {
        ...state,
        lastUsedVoucher: action.payload,
      };
    case GET_LAST_USED_VOUCHER.FAILURE:
      return {
        ...state,
        error: {
          lastUsedVoucher: action.payload,
        },
      };
    case PAYMENT.SUCCESS:
      return {
        ...state,
        payment: action.payload,
      };
    case PAYMENT.FAILURE:
      return {
        ...state,
        error: {
          payment: action.payload,
        },
      };
    case SEND_BANK_DETAILS.SUCCESS:
      return {
        ...state,
        sendBankDetails: action.payload,
      };
    case SEND_BANK_DETAILS.FAILURE:
      return {
        ...state,
        error: {
          sendBankDetails: action.payload,
        },
      };
    case GET_BANK_DETAILS.SUCCESS:
      return {
        ...state,
        getBankDetails: action.payload,
      };
    case GET_BANK_DETAILS.FAILURE:
      return {
        ...state,
        error: {
          getBankDetails: action.payload,
        },
      };
    case SUBMIT_PACKAGE_FEEDBACK.SUCCESS:
      return {
        ...state,
        packageFeedback: action.payload,
      };
    case SUBMIT_PACKAGE_FEEDBACK.FAILURE:
      return {
        ...state,
        error: {
          packageFeedback: action.payload,
        },
      };
    case GET_CREDIT_HISTORY.SUCCESS:
      return {
        ...state,
        creditHistoy: action.payload,
      };
    case GET_CREDIT_HISTORY.FAILURE:
      return {
        ...state,
        error: {
          creditHistoy: action.payload,
        },
      };
    case GET_PAYMENT_HISTORY.SUCCESS:
      return {
        ...state,
        paymentHistory: action.payload,
      };
    case GET_PAYMENT_HISTORY.FAILURE:
      return {
        ...state,
        error: {
          paymentHistory: action.payload,
        },
      };
    case DEMO_TRANSACTION.SUCCESS:
      return {
        ...state,
        payLaterTransaction: action.payload,
      };
    case DEMO_TRANSACTION.FAILURE:
      return {
        ...state,
        error: {
          payLaterTransaction: action.payload,
        },
      };
    case GET_PENDING_TRANSACTION.SUCCESS:
      return {
        ...state,
        pendingTransaction: action.payload,
      };
    case GET_PENDING_TRANSACTION.FAILURE:
      return {
        ...state,
        error: {
          pendingTransaction: action.payload,
        },
      };
    default:
      return state;
  }
}
