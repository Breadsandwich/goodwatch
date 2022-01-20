var express = require('express');

const db = require('../db/models');
const { asyncHandler } = require('./utils');
const { Show } = db;
var router = express.Router();

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next)=> {
  const showsDrama = await Show.findAll({
    where: {
      genre: 'Drama'
    }
  })
  
  const showsSciFi = await Show.findAll({
    where: {
      genre: 'Sci-Fi'
    }
  })

  const showsFood = await Show.findAll({
    where: {
      genre: 'Food'
    }
  })
  
  const showsAction = await Show.findAll({
    where: {
      genre: 'Action'
    }
  })
  res.render('index', { title: 'Welcome to Goodwatch' , showsDrama, showsSciFi, showsFood, showsAction});
}));

module.exports = router;
