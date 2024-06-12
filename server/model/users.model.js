const mongoose = require('mongoose');
const { ADMIN, NON_ADMIN } = require('../keys');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [ADMIN, NON_ADMIN], default: NON_ADMIN },
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
