import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';

export default combineReducers({
  routing,
  app: combineReducers({
    auth
  })
});
