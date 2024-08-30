export const validateUsername = username => {
  if (username.trim().length === 0) {
    return 'Username is required';
  }
  if (username.trim().length < 3) {
    return 'Invalid Name';
  }
  return null;
};

export const validatePassword = password => {
  if (password.trim().length === 0) {
    return 'Password is required';
  }
  if (password.trim().length < 8) {
    return 'Password is less than 8 characters';
  }
  return null;
};
