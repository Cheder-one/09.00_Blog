export const nameCheck = {
  required: 'Name must be at least 3 characters',
  minLength: {
    value: 3,
    message: 'Name must be at least 3 characters',
  },
  maxLength: {
    value: 20,
    message: 'Name must be less than 20 characters',
  },
  pattern: {
    value: /^[a-zа-я0-9]+$/,
    message: 'Only lowercase letters and numbers',
  },
};

export const emailCheck = {
  required: 'Email must be valid',
  pattern: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    message: 'Email must be valid',
  },
};

export const imageUrlCheck = {
  validate: (url) => {
    return new Promise((resolve) => {
      if (!url) resolve(true);

      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve('URL must be valid');
      img.src = url;
    });
  },
};

export const passwordCheck = {
  required: 'Password needs to be at least 6 characters',
  minLength: {
    value: 6,
    message: 'Password needs to be at least 6 characters',
  },
  maxLength: {
    value: 40,
    message: 'Password needs to be less than 40 characters',
  },
};

export const confirmPassCheck = (prevPass) => ({
  required: 'Passwords must match',
  validate: (pass) => prevPass === pass || 'Passwords must match',
});

export const titleCheck = {
  required: 'Title is required',
  minLength: {
    value: 1,
    message: 'Title must be at least 1 characters',
  },
  maxLength: {
    value: 100,
    message: 'Title must be less than 100 characters',
  },
};

export const descriptionCheck = {
  maxLength: {
    value: 200,
    message: 'Title must be less than 200 characters',
  },
};

export const textCheck = {
  maxLength: {
    value: 5000,
    message: 'Text must be less than 5000 characters',
  },
};

export const tagsCheck = {
  required: 'Tag must be at least 1 characters',
  minLength: {
    value: 1,
    message: 'Tag must be at least 1 characters',
  },
  maxLength: {
    value: 20,
    message: 'Tag must be less than 20 characters',
  },
  pattern: {
    value: /^[a-zа-я0-9+-_@\s]+$/,
    message: 'Only lowercase letters and numbers',
  },
};
