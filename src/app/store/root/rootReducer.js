import { combineReducers } from 'redux';

import { articles, errors, pagination } from '../reducers';

const rootReducer = combineReducers({
  errors,
  articles,
  pagination,
});

export default rootReducer;
