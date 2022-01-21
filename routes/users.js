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
    .withMessage('Email cannot be longer than 50 charachters.')
    .custom(async (username) => {
      const user = await User.findOne({ where: { username } })
      if (user) throw new Error('User name already in use.')
  }),
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
    .withMessage('Please provide a value for Email Address')
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } })
      if (!user) throw new Error('Please provide a valid Email')
  }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .custom(async(password, { req }) => {
      const email = req.body.email;
      const user = await User.findOne({where:{email}});
      const match = await bcrypt.compare(password, user.hashedPassword.toString());
      if (!match) {
          throw new Error('Password does not match to the given email');
      }
      return true;
  })
];

router.get('/:id(\\d+)', asyncHandler(async(req, res)=>{
  const users = req.session.auth;

    if (users) {
  const userId = req.params.id;
  const user = await User.findByPk(userId,{
    include: [Show, Watchlist]
  })

  res.render('user-page', {user})
}
else {
    res.redirect('/');
}
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
        console.log('heeeeeeeeeeeeeeeeeeeellllllllllllllllllllllllllloooooooooooooooooooo', match)
        loginUser(req,res,user)
        return res.redirect(`/users/${user.id}`);
      }
    }
  }else{
    const errors = validatorError.array().map((error) => error.msg);
    console.log(errors)
            res.render('user-login', {
                title: 'Login',
                errors,
                csrfToken: req.csrfToken(),
            });

  }
}))

router.post('/demo', asyncHandler(async(req, res) => {
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

  const validatorError = validationResult(req);
  if(validatorError.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    const wantTowatch = await Watchlist.create({
      name: 'Wants to Watch',
      userId: `${user.id}`
    });
    const current = await Watchlist.create({
      name: 'Currently Watch',
      userId: `${user.id}`
    });
    const watched = await Watchlist.create({
      name: 'Have Watched',
      userId: `${user.id}`
    });
    const haventWatch = await Watchlist.create({
      name: 'Havent Watched',
      userId: `${user.id}`
    });
    loginUser(req,res,user);
    return res.redirect(`/users/${user.id}`);
  }else{
    const errors = validatorError.array().map((error) => error.msg);
    console.log(errors)
            res.render('signup-form', {
                title: 'Signup',
                errors,
                csrfToken: req.csrfToken(),
            });

  }

}));

router.post('/logout', async(req, res) => {
  await logoutUser(req, res);
  return req.session.save(() => {res.redirect('/')})


})
module.exports = router;
