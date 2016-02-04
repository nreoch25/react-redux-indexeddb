import React from 'react';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from './reducers';
import promise from 'redux-promise';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const initialState = window.__INITIAL_STATE__;
const store = createStoreWithMiddleware(reducers, initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>, document.getElementById("app"));