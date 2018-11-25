import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { connectRouter, routerMiddleware } from "connected-react-router";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

const reducers = combineReducers({
  ...rootReducer
});
const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
const store = createStore(
  connectRouter(history)(reducers),
  {},
  compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);
sagaMiddleware.run(rootSaga);

export { history, store };
