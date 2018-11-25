import actionTypes from "./actionTypes";

const actions = {
  requestUser: userId  => ({
    type: actionTypes.REQUEST,
    payload: userId
    
  }),
  requestUserSuccess: user  => ({
    type: actionTypes.REQUEST_SUCCESS,
    payload: {
      user
    }
  }),
  requestUserFailure: msg => ({
    type: actionTypes.REQUEST_FAILURE,
    payload: {
      clientMessage: "Failed to fetch user",
      devMessage: msg
    }
  }),
  clearUser: () => ({
    type: actionTypes.CLEAR
  }),
  resetUserStore: () => ({
    type: actionTypes.RESET
  })
};

export default actions;
