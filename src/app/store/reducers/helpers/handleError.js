import { entries } from 'lodash';

// const handleError = (error, requestFailed, reducerName) => (dispatch) => {
//   const { status, info, pureMessage: message } = error;
//   console.error(error);
//   dispatch(requestFailed());
//   dispatch(setError(reducerName, { status, info, message }));
// };

const handleError = (errObj, failed, setError) => (dispatch) => {
  const [key, error] = entries(errObj).flat();
  console.error(error);

  error.message = error.pureMessage;
  delete error.name;
  delete error.pureMessage;
  delete error.stack;

  dispatch(failed());
  dispatch(setError(JSON.stringify({ key, error })));
};

export default handleError;
