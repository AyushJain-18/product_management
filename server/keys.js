const ADMIN = 'ADMIN';
const NON_ADMIN = 'USER';
const images = ['apple', 'google', 'headphone', 'shoe1', 'shoe2', 'watch'];
// it will not be in code, may be configured as env variable or other such thing
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  SECRET_KEY,
  ADMIN,
  NON_ADMIN,
  images,
};
