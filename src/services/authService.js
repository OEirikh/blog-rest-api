const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const {User} = require('../db/userModel');
const {NotAuthorizedError} = require('../helpers/errors');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();

  const msg = {
    to: email,
    from: 'o.eyrikh@gmail.com', // Use the email address or domain you verified above
    subject: 'thank you for registrations',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<h1>and easy to do anywhere, even with Node.js</h1>',
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
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
