import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import Router from './router'

import { Provider } from 'react-redux'

import { createHashHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import reducers from './redux/reducers'
import * as serviceWorker from './serviceWorker'
import sagas from './redux/sagas'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// middlewared
const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [sagaMiddleware, routeMiddleware]
const queryClient = new QueryClient()
const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)


ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router history={history} />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister()
export { store, history }