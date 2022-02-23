const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail) {
    return false;
  }
  return true;
};

const validatePassword = (password) => {
  const maxLength = 6;
  if (password.length < maxLength) {
    return false;
  }
  return true;
};

module.exports = {
  validateEmail,
  validatePassword,
};
