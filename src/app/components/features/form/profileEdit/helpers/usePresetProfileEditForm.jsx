import { useEffect } from 'react';

const usePresetProfileEditForm = (user, setValue) => {
  useEffect(() => {
    setValue('name', user.username);
    setValue('email', user.email);
    setValue('image', user.image);
  }, [user]);
};

export default usePresetProfileEditForm;
