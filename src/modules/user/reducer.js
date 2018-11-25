import actionTypes from "./actionTypes";
import userUtility from "../../util/modules/user/userUtility";

const initialState = userUtility.buildInitialStore();

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.REQUEST: {
      return {
        ...state,
        error: null,
        isLoading: true,
        isLoaded: false
      };
    }

    case actionTypes.REQUEST_SUCCESS: {
      return {
        ...state,
        error: null,
        isLoading: false,
        isLoaded: true,
        user: payload
      };
    }

    case actionTypes.REQUEST_FAILURE: {
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
