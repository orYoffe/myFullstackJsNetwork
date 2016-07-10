import { combineReducers } from 'redux';


function reducer(state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
import auth from './auth';
const reducers =  combineReducers({  auth, reducer  })
export default reducers;
