import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { clearErrors } from '../app/store/reducers/errors';

const useNotFound = (error) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const handleErrors = () => {
      if (error?.status === 404) {
        history.push('/404');
        dispatch(clearErrors());
      }
    };

    handleErrors();
  }, [error]);
};

export default useNotFound;
