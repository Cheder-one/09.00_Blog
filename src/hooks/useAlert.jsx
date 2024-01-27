import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useAlert = (error, key) => {
  useEffect(() => {
    if (error) {
      toast.error(error[key]);
    }
  }, [error]);
};

export default useAlert;
