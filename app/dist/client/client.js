'use strict';

require('babel-polyfill');

require('./sass/index.scss');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _App = require('./containers/App.jsx');

var _App2 = _interopRequireDefault(_App);

var _index = require('./js/reducers/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the state from a global injected into server-generated HTML
var initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state
var store = (0, _redux.createStore)(_index2.default, initialState);

(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(_App2.default, null)
), document.getElementById('app'));