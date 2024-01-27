import { useEffect, useState } from 'react';

const useSubmitStatus = (serverError) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (serverError) {
      setIsSubmitted(false);
    }
  }, [serverError]);

  return [isSubmitted, setIsSubmitted];
};

export default useSubmitStatus;
