import 'babel-polyfill';
import './sass/index.scss';
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import routes from './js/routes';
// import reducers from './js/reducers/index';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from './store'

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state
// const store = createStore(reducers, initialState, window.devToolsExtension && window.devToolsExtension());

const store = configureStore(browserHistory, initialState)

const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('root')
);
