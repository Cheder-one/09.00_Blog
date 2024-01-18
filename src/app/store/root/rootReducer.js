import { combineReducers } from 'redux';

import { articles, errors, pagination } from '../reducers';

const rootReducer = combineReducers({
  articles,
  errors,
  pagination,
});

export default rootReducer;
