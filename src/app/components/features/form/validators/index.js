export const emailCheck = {
  required: true,
  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
};

export const passwordCheck = {
  required: 'Your password needs to be at least 6 characters.',
  minLength: {
    value: 6,
    message: 'Your password needs to be at least 6 characters.',
  },
};

export const confirmPassCheck = (prevPass) => ({
  required: 'Passwords must match',
  validate: (pass) => prevPass === pass || 'Passwords must match',
});
