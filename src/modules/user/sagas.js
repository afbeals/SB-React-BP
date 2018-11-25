import { call, put, takeLatest } from "redux-saga/effects";
import actionTypes from "./actionTypes";
import actions from "./actions";
import api from "../../util/api";
//import { push } from "connected-react-router";

// WATCHERS
export function* watchRequestForUser() {
  yield takeLatest(actionTypes.REQUEST, getUser);
}

// PROMISES
export function* getUser({ payload: { userId } }) {
  try {
    const request = { userId },
          response = yield call(api.requestUser, { request });
    yield put(actions.clearUser());
    yield put(actions.requestUserSuccess(response.data));

  } catch (e) {
    yield put(actions.requestUserFailure(e));
  }
}


export default watchRequestForUser;
