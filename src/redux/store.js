// store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
const routerMiddlewareInstance = routerMiddleware(history);

const store = createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(sagaMiddleware, routerMiddlewareInstance)
);

sagaMiddleware.run(rootSaga);

export default store;
