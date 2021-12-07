const registerValidation = (register) => {
  const errors = {};
  const { name, email, password, confirmPassword } = register;
  if (!name) {
    errors.name = 'Name is required';
  }
  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

export default registerValidation;
