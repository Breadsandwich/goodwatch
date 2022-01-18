const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth.js')

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User } = db;

const router = express.Router();

/* GET users listing. */
router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  })
});

router.post('/login', csrfProtection, asyncHandler(async(req, res) => {
  const {username, email, hashPassword} = req.body;
  const password = await bcrypt(hashPassword, 10);
  const user = await User.build({
    username,
    email,
    hashPassword = password
  })
  res.render('user-login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  })
}));
router.get('/signup', csrfProtection, (req, res) => {
  res.render('signup-form', {
    title: 'Sign-up',
    csrfToken: req.csrfToken(),
  })
});

module.exports = router;
