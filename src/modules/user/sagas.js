import { call, put, takeLatest } from "redux-saga/effects";
import actionTypes from "./actionTypes";
import actions from "./actions";
import {actions as ledgerActions} from "../ledger/";
import api from "../../util/api";
import { push } from "connected-react-router";
// WATCHERS
export function* watchRequestToLogin() {
  yield takeLatest(actionTypes.LOGIN_REQUEST, login);
}

export function* watchRequestToLogout() {
  yield takeLatest(actionTypes.LOGOUT_REQUEST, logout);
}

export function* watchRequestToRegister() {
  yield takeLatest(actionTypes.REGISTER_REQUEST, register);
}

// PROMISES
export function* login({ payload: { username, password } }) {
  try {
    const request = {
        client: {
          username,
          password
        }
      },
      response = yield call(api.loginUser, { request });
    yield put(actions.clearUser());
    yield put(actions.loginUserSuccess(response.data));
    yield put(push("/home"));
  } catch (e) {
    yield put(actions.loginUserFail(e));
  }
}

export function* logout() {
  try {
    //const request = {};
    //yield call(api.logoutUser, { request });
    yield put(actions.resetUserStore());
    yield put(ledgerActions.resetLegerStore());
    yield put(actions.logoutUserSuccess());
    yield put(push("/"));
  } catch (e) {
    yield put(actions.logoutUserFail(e));
  }
}

export function* register({payload}) {
  try {
    const request = {
      client: {
        "username": payload.username,
        "password": payload.password,
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "email": payload.email,
      }
    },
      response = yield call(api.registerUser, { request });
    yield put(actions.clearUser());
    yield put(actions.registerUserSuccess(response.data))
    yield put(push("/home"));
  } catch (e) {
    yield put(actions.registerUserFail(e));
  }
}

export default watchRequestToLogin;
