import actionTypes from "./actionTypes";

const actions = {
  loginUser: ({ username, password }) => ({
    type: actionTypes.LOGIN_REQUEST,
    payload: {
      username,
      password
    }
  }),
  loginUserFail: msg => ({
    type: actionTypes.LOGIN_FAIL,
    payload: {
      clientMessage: "Failed to fetch users",
      devMessage: msg
    }
  }),
  loginUserSuccess: user => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user
  }),
  logoutUserRequest: () => ({
    type: actionTypes.LOGOUT_REQUEST
  }),
  logoutUserFail: msg => ({
    type: actionTypes.LOGOUT_FAIL,
    payload: {
      clientMessage: "Failed to fetch users",
      devMessage: msg
    }
  }),
  logoutUserSuccess: user => ({
    type: actionTypes.LOGOUT_SUCCESS,
    payload: user
  }),
  registerUserRequest: user => ({
    type: actionTypes.REGISTER_REQUEST,
    payload: user
  }),
  registerUserFail: msg => ({
    type: actionTypes.REGISTER_FAIL,
    payload: {
      clientMessage: "Failed to regisetr users",
      devMessage: msg
    }
  }),
  registerUserSuccess: user => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload: user
  }),
  clearUser: () => ({
    type: actionTypes.CLEAR
  }),
  resetUserStore: () => ({
    type: actionTypes.RESET
  })
};

export default actions;
