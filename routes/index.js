var express = require('express');
const {restoreUser} = require('../auth.js')
const db = require('../db/models');
const { asyncHandler } = require('./utils');
const { Show, Watchlist } = db;
var router = express.Router();

/* GET home page. */
router.get('/', restoreUser, asyncHandler(async(req, res, next)=> {

  const showsDrama = await Show.findAll({
    where: {
      genre: 'Drama'
    },
    limit: 3
  })

  const showsSciFi = await Show.findAll({
    where: {
      genre: 'Sci-Fi'
    },
    limit: 3
  })

  const showsFood = await Show.findAll({
    where: {
      genre: 'Food'
    },
    limit: 3
  })

  const showsAction = await Show.findAll({
    where: {
      genre: 'Action'
    },
    limit: 3
  })

  const showsComedy = await Show.findAll({
    where: {
      genre: 'Comedy'
    },
    limit: 3
  })

  const showsKids = await Show.findAll({
    where: {
      genre: 'Kids'
    },
    limit: 3
  })

  res.render('index', { title: 'Welcome to Goodwatch',
    showsDrama,
    showsSciFi,
    showsFood,
    showsAction,
    showsComedy,
    showsKids
  });
}));

module.exports = router;
