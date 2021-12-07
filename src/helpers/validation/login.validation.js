const validateLogin = (login) => {
  const errors = {};
  if (!login.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(login.email)) {
    errors.email = 'Invalid email address';
  }
  if (!login.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

export default validateLogin;
