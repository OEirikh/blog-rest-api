const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  title: String,
  bio: String,
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function () {
  // console.log('this', this.is, 'this');
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  // TODO if user changed his password
});

const User = mongoose.model('users', userSchema);

module.exports = {
  User,
};
