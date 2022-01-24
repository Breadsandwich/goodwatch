const express = require('express');
const { check, validationResult } = require('express-validator');
const { asyncHandler } = require('./utils');

const db = require('../db/models');
const { Watchlist, User } = db;

const router = express.Router();

// Watchlists validator
const watchlistVal = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a watchlist name.')
        .isLength({ max: 50 })
        .withMessage('Watchlist name cannot be longer than 50 charachters.')
        .custom(async (name, { req }) => {
            const person = req.session.auth;
            const userId = person.userId;
            const user = await User.findByPk(userId);
            const watchlist = await Watchlist.findOne({ where: { name, userId } })
            if (watchlist) throw new Error('Watchlist name already exists')
        }),
];

// Renders ALL User's watchlists
router.get('/', asyncHandler(async (req, res) => {
    const users = req.session.auth;

    if (users) {
        const userId = users.userId;
        const user = await User.findByPk(userId);
        const watchlists = await Watchlist.findAll({ where: { userId } });
        res.render('watchlists', { watchlists, user })
    }
    else {
        res.redirect('/');
    }
}));

// GET specific watchlist
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const users = req.session.auth;

    if (users) {
        const watchlistId = parseInt(req.params.id, 10);
        const watchlist = await Watchlist.findOne({ where: { id: watchlistId } });

        res.render('watchlist-profile', { watchlist, watchlistId })
    }
    else {
        res.redirect('/');
    }
}));

// Renders create watchlist form
router.get('/create', (req, res) => {
    const users = req.session.auth;

    if (users) {
        res.render('create-watchlist');
    }
    else {
        res.redirect('/');
    }
});

// Creates watchlists
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

router.post('/api-create', watchlistVal, asyncHandler(async (req, res) => {
    const { name } = req.body;

    const validatorError = validationResult(req);

    if (validatorError.isEmpty()) {
        const user = req.session.auth;
        const userId = user.userId;

        const watchlist = await Watchlist.build({
            name,
            userId,
            showsList: []
        });

        await watchlist.save();

        res.json({ message: "success", newId: watchlist.id });
    } else {
        const errors = validatorError.array().map((error) => error.msg);

        res.json({
            message: "fail",
            errors
        });
    }
}));

// Renders watchlist edit form
router.get('/:id(\\d+)/edit', asyncHandler(async (req, res) => {
    const users = req.session.auth;

    if (users) {
        const watchlistId = parseInt(req.params.id, 10);
        const watchlist = await Watchlist.findOne({ where: { id: watchlistId } });

        res.render('watchlist-edit', { watchlist, watchlistId })
    }
    else {
        res.redirect('/');
    }
}));

// Edits watchlist
router.post('/:id(\\d+)/edit', watchlistVal, asyncHandler(async (req, res) => {
    const { name } = req.body;

    const validatorError = validationResult(req);
    const watchlistId = parseInt(req.params.id, 10);
    const watchlist = await Watchlist.findOne({ where: { id: watchlistId } });

    if (validatorError.isEmpty()) {

        watchlist.name = name;

        await watchlist.save();

        res.redirect('/watchlists');
    } else {
        const errors = validatorError.array().map((error) => error.msg);

        res.render('watchlist-edit', { watchlistId, errors });
    }

    res.redirect('/watchlists');
}));

// Renders delete watchlist confirmation form
router.get('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
    const users = req.session.auth;

    if (users) {
        const watchlistId = parseInt(req.params.id, 10);
        const watchlist = await Watchlist.findOne({ where: { id: watchlistId } });

        res.render('watchlist-delete', { watchlist, watchlistId })
    }
    else {
        res.redirect('/');
    }
}));

// DELETES watchlist
router.post('/:id(\\d+)/delete', asyncHandler(async (req, res) => {
    const watchlistId = parseInt(req.params.id, 10);
    const watchlist = await Watchlist.findOne({ where: { id: watchlistId } });

    await watchlist.destroy();
    res.redirect('/watchlists');
}));

module.exports = router;
