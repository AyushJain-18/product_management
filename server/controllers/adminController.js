const { ADMIN, NON_ADMIN } = require('../keys');

let getAllProducts = (req, res) => {
  let { userId, role } = req.user;
  if (role === ADMIN) {
  }
};

module.exports = {
  getAllProducts,
};
