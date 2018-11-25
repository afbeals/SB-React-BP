import { call, put, takeLatest, select } from "redux-saga/effects";
import actionTypes from "./actionTypes";
import actions from "./actions";
import api from "../../util/api";
import normalize from "../../util/normalize";
import { selectors as userSelectors} from "../user/";
// WATCHERS
export function* watchRequestToFetchLedger() {
  yield takeLatest(actionTypes.FETCH_REQUEST, fetch);
}

// PROMISES
export function* fetch() {
  try {
    const request = {
        client: {
          id: yield select(userSelectors.getUserId)
        }
      };
    const  response = yield call(api.fetchLedger, { request });
    const ledgers = normalize.arrayToIndexed(response.data);

    yield put(actions.resetLegerStore());
    yield put(actions.fetchLedgerSuccess(ledgers));
  } catch (e) {
    yield put(actions.fetchLedgerFail(e));
  }
}

export default watchRequestToFetchLedger;