const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../db/userModel');
const {NotAuthorizedError} = require('../helpers/errors');

const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new NotAuthorizedError(`no found user with email ${email} `);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password `);
  }
  const token = await jwt.sign(
      {
        _id: user._id,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET,
  );
  return token;
};

module.exports = {
  registration,
  login,
};
