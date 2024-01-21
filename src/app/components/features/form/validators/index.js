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
    value: /^[a-zA-Zа-яА-Я0-9]+$/,
    message: 'Only letters and numbers',
  },
};

export const emailCheck = {
  required: 'Email must be valid',
  pattern: { value: /\S+@\S+\.\S+/, message: 'Email must be valid' },
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
