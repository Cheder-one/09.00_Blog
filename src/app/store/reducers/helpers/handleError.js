import { setError } from '../errors';

const handleError = (error, requestFailed, reducerName) => (dispatch) => {
  console.error(error);
  dispatch(requestFailed());
  dispatch(setError(reducerName, error.message));
};

export default handleError;
