const ADMIN = 'ADMIN';
const NON_ADMIN = 'USER';
// it will not be in code, may be configured as env variable or other such thing
const SECRET_KEY = 'some_random_secret_key';

module.exports = {
  SECRET_KEY,
  ADMIN,
  NON_ADMIN,
};
