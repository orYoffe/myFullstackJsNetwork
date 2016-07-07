import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import counter from './counter';

export default combineReducers({
  routing,
  app: combineReducers({
    auth
  });
});
