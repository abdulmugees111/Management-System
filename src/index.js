import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import Router from "./router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import reducers from "./redux/reducers";
import * as serviceWorker from "./serviceWorker";
import sagas from "./redux/sagas";
import "./services/internationalization/i18";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// middlewared
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];
const queryClient = new QueryClient();
const store = createStore(reducers(history), compose(applyMiddleware(...middlewares)));
sagaMiddleware.run(sagas);

ReactDOM.render(
  <React.Suspense fallback="Loading...">
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <QueryClientProvider client={queryClient} >
        <Router history={history} />
     
      </QueryClientProvider>
    </Provider>
  </React.Suspense>,
  document.getElementById("root")
);

serviceWorker.unregister();
export { store, history };
