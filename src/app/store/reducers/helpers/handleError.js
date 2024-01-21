import { setError } from '../errors';

const handleError = (error, requestFailed, reducerName) => (dispatch) => {
  const { status, info, pureMessage: message } = error;
  console.error(error);
  dispatch(requestFailed());
  dispatch(setError(reducerName, { status, info, message }));
};

export default handleError;
