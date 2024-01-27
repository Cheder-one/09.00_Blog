import { combineReducers } from 'redux';

import { articles, pagination } from '../reducers';
import auth from '../reducers/auth';

const rootReducer = combineReducers({
  auth,
  articles,
  pagination,
});

export default rootReducer;
