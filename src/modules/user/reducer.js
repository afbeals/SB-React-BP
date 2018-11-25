import actionTypes from "./actionTypes";
import userUtility from "../../util/modules/user/userUtility";

const initialState = userUtility.buildInitialStore();

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoaded: false
      };
    }

    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        isLoading: false,
        isLoaded: true,
        user: payload
      };
    }

    case actionTypes.LOGIN_FAIL: {
      return {
        ...state,
        error: payload.clientMessage,
        isLoading: false,
        isLoaded: false
      };
    }

    case actionTypes.LOGOUT_REQUEST: {
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoaded: false
      };
    }

    case actionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        error: null,
        isLoading: false,
        isLoaded: false,
        user: null
      };
    }

    case actionTypes.LOGOUT_FAIL: {
      return {
        ...state,
        error: payload.clientMessage,
        isLoading: false,
        isLoaded: false
      };
    }

    case actionTypes.REGISTER_REQUEST: {
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoaded: false
      };
    }

    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        error: null,
        isLoading: false,
        isLoaded: false,
        user: payload
      };
    }

    case actionTypes.REGISTER_FAIL: {
      return {
        ...state,
        error: payload.clientMessage,
        isLoading: false,
        isLoaded: false
      };
    }

    case actionTypes.CLEAR: {
      return {
        ...state,
        user: null
      };
    }

    case actionTypes.RESET: {
      return initialState;
    }

    default:
      return state;
  }
}
