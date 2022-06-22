const {registration, login} = require('../servises/authServise');

const registrationController = async (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);
  await registration(email, password);
  res.json({status: 'success'});
};

const loginController = async (req, res) => {};

module.exports = {
  registrationController,
  loginController,
};
