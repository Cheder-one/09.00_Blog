import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useAlert = (error, key) => {
  useEffect(() => {
    if (error) {
      console.log(error, key);
      toast.error(error[key]);
    }
  }, [error]);
};

export default useAlert;
