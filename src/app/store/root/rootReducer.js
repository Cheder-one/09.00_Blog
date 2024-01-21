import { combineReducers } from 'redux';

import { articles, errors, pagination } from '../reducers';
import auth from '../reducers/auth';

const rootReducer = combineReducers({
  auth,
  articles,
  errors,
  pagination,
});

export default rootReducer;
