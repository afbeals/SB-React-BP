import actionTypes from "./actionTypes";
import ledgerUtility from "../../util/modules/ledger/ledgerUtility";

const initialState = ledgerUtility.buildInitialStore();

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.FETCH_REQUEST: {
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoaded: false
      };
    }

    case actionTypes.FETCH_FAIL: {
      return {
        ...state,
        error: payload.clientMessage,
        isLoading: false,
        isLoaded: false
      };
    }

    case actionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        error: null,
        isLoading: false,
        isLoaded: true,
        ledgerList: payload.ledgerList
      };
    }

    case actionTypes.ADD_REQUEST: {
      return {
        ...state,
        error: null,
        isUpdating: true,
        isUpdated: false,
        ledgerList: {...state.ledgerList,[payload.id]:payload}
      };
    }

    case actionTypes.ADD_FAIL: {
      return {
        ...state,
        error: payload.clientMessage,
        isUpdating: false,
        isUpdated: false
      };
    }

    case actionTypes.ADD_SUCCESS: {
      return {
        ...state,
        error: null,
        isUpdating: false,
        isUpdated: true,
        ledgerList: payload.ledgerList
      };
    }

    case actionTypes.CLEAR: {
      return {
        ...state,
        ledgerList: null
      };
    }

    case actionTypes.RESET: {
      return initialState;
    }

    default:
      return state;
  }
}
