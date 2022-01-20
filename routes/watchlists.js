const express = require('express');
const { check, validationResult } = require('express-validator');
const { asyncHandler } = require('./utils');

const db = require('../db/models');
const { Watchlist } = db;

const router = express.Router();

const watchlistVal = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a watchlist name.')
        .isLength({ max: 50 })
        .withMessage('Watchlist name cannot be longer than 50 charachters.')
        .custom(async(name)=>{
            const watchlist = await Watchlist.findOne({where:{name}})
            if(watchlist) throw new Error('Watchlist name already exists')
        }),
];

router.get('/', asyncHandler(async (req, res) => {
    const watchlists = await Watchlist.findAll();
    res.render('watchlists', { watchlists })
}));

router.get('/create', (req, res) => {
    res.render('create-watchlist');
});

router.post('/create', watchlistVal, asyncHandler(async (req, res) => {
    const { name } = req.body;

    const validatorError = validationResult(req);

    if (validatorError.isEmpty()) {
        const user = req.session.auth;
        const userId = user.userId;

        const watchlist = await Watchlist.build({
            name,
            userId
        });

        await watchlist.save();

        res.redirect('/watchlists');
    } else {
        const errors = validatorError.array().map((error) => error.msg);

        res.render('create-watchlist', { errors });
    }

    res.redirect('/watchlists');
}));

module.exports = router;
