import { all } from "redux-saga/effects";
import { watchRequestToFetchLedger as fetchLedger } from "./ledger/sagas";
import { watchRequestToLogin as loginUser } from "./user/sagas";
import { watchRequestToLogout as logoutUser } from "./user/sagas";
import { watchRequestToRegister as registerUser } from "./user/sagas";

export default function* rootSaga() {
  yield all([fetchLedger(), loginUser(), logoutUser(), registerUser()]);
}
