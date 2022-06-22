const express = require('express');
const router = new express.Router();
const {ctrlWrapper} = require('../helpers/apiHelpers');
const {
  registrationController,
  loginController,
} = require('../controllers/authController');

router.post('/registration', ctrlWrapper(registrationController));
router.post('/login', ctrlWrapper(loginController));

module.exports = {authRouter: router};
