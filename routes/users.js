const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, restoreUser} = require('../auth.js')

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Show, Watchlist} = db;

const router = express.Router();

const userVal = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an User Name.')
    .isLength({ max: 50 })
    .withMessage('Email cannot be longer than 50 charachters.'),
  check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an email.')
        .isLength({ max: 255 })
        .withMessage('Email cannot be longer than 255 charachters.')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const user = await User.findOne({ where: { email } })
            if (user) throw new Error('Email already in use.')
        }),
  check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain atleast 1 lowercase letter, uppercase letter, number, and special charachter (i.e "!@#$%^&*") '),
  check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password must not be more than 50 characters long')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        })
];

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];

router.get('/:id(\\d+)', asyncHandler(async(req, res)=>{
  const person = req.session.auth;
  const userId = person.userId
  const user = await User.findByPk(userId,{
    include: [Show, Watchlist]
  })
  
  res.render('user-page', {user})
}));

/* GET users listing. */
router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  })
});

router.post('/login', csrfProtection, loginValidators, asyncHandler(async(req,res)=>{
  const {email, password} = req.body;
  const validatorError = validationResult(req);
  
  if(validatorError.isEmpty()){
    const user = await User.findOne({
      where: {email}
    });
    if(user){
      const match = await bcrypt.compare(password, user.hashedPassword.toString());
      if(match){
        loginUser(req,res,user)
        return res.redirect('/users/:id(\\d+)');
      }
    }
  }
}))

router.post('/demo', (async(req, res) => {
  const user = await User.findByPk(1,{
    include: [Show, Watchlist]
  })
  loginUser(req, res, user);
  res.render('user-page', {user})
}));


router.get('/signup', csrfProtection, (req, res) => {
  res.render('signup-form', {
    title: 'Sign-up',
    csrfToken: req.csrfToken(),
  })
});

router.post('/signup', csrfProtection, userVal, asyncHandler(async(req, res) => {
  const {username, email, password} = req.body;

  const user = await User.build({
    username,
    email,

  });
  const validatorError = validationResult(req);
  if(validatorError.isEmpty()){
    const hashPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashPassword;
    await user.save();
    loginUser(req,res,user);
    return res.redirect('/users/:id(\\d+)');
  }else{
    const errors = validatorError.array().map((error) => error.msg);
            res.render('signup-form', {
                title: 'Signup',
                user,
                errors,
                csrfToken: req.csrfToken(),
            });

  }

}));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  
  res.redirect('/');
})
module.exports = router;
