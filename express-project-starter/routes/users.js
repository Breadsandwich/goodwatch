const express = require('express');
const router = express.Router();
const { loginUser, logoutUser } = require('../auth.js')

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
