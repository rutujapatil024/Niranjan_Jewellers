const mongoose = require('mongoose');
const any = require('../plugin/any');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true,
    unique:true
  }
});

userSchema.plugin(any)

userSchema.methods.matchPassword = function (password) {
  return password == this.password
};

module.exports = mongoose.model('User', userSchema);