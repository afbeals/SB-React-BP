import { all } from "redux-saga/effects";
import { watchRequestForUser as requestUser } from "./user/sagas";

export default function* rootSaga() {
  yield all([requestUser()]);
}
