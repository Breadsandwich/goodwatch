const express = require('express');
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, restoreUser } = require('../auth.js')

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const  {Show, Review, Watchlist } = db

const router = express.Router()

//get all shows
router.get('/all', asyncHandler(async(req, res)=>{
    const shows = await Show.findAll({include: Show.id})
    res.render('all-shows', {title: 'Shows', shows})
}));

//new show form
router.get('/add', csrfProtection, (req, res)=>{
    res.render('show-add', {
        title: 'Add Show',
        csrfToken: req.csrfToken()
    });
});

const showValidator = [
    check('name')
    .exists({checkFalsy:true})
    .withMessage('Please provide a show name')
    .isLength({max: 50})
    .withMessage('Show name cannot be longer than 50 charachters')
    .custom(async(name)=>{
        const show = await Show.findOne({where:{name}})
        if(show) throw new Error('Show name already exists')
    }),
    check('description')
    .exists({checkFalsy:true})
    .withMessage('Please provide a description'),

    check('genre')
    .exists({checkFalsy: true})

]
//new show post
router.post('/add', csrfProtection, showValidator, asyncHandler(async(req, res)=>{
    const {name, description, overallRating, watchStatus, genre} = req.body

    const show = await Show.build({
        name,
        description,
        overallRating,
        watchStatus,
        genre
    });

    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()){
        await show.save()
        res.redirect('/shows/all')
    }else{
        const errors = validatorErrors.array() .map((error)=>error.msg)
        res.render('show-add', {
            title: 'Add Show',
            show,
            errors,
            csrfToken: req.csrfToken()
        });
    }

}));

router.get('/:id(\\d+)', asyncHandler(async(req, res)=>{
    const user = req.session.auth;
    const userId = user.userId;
    const showId = parseInt(req.params.id, 10);
    const show = await Show.findByPk(showId);
    const reviews = await Review.findAll({ where: { showId } });
    const watchlists = await Watchlist.findAll({ where: { userId } });

    res.render('single-show',{
        title: 'Show',
        show,
        reviews,
        user,
        watchlists
    });
}));

router.get('/:id(\\d+)/reviews', csrfProtection, asyncHandler(async(req, res) => {
    const showId = parseInt(req.params.id, 10);
    res.render('reviews', {showId, csrfToken: req.csrfToken()})

}));

router.post('/:id(\\d+)/reviews', csrfProtection, asyncHandler(async(req, res) => {
    const { review, rating } = req.body
    const showId = parseInt(req.params.id, 10);
    // const show = await Show.findByPk(showId)
    const person = req.session.auth;
    const userId = person.userId

    const reviewPost = await Review.build({
        review,
        rating,
        userId,
        showId
    })
    // console.log(showId)
    await reviewPost.save()
    res.redirect(`/shows/${showId}`)
}));

router.post('/search', async(req, res) => {
    const { name } = req.body;

    const shows = await Show.findAll({ where: {
        name: {
            [Op.or]: [
                { [Op.substring]: name }, { [Op.startsWith]: name }, { [Op.like]: `%${name}` }
            ]
        }
    } });

    res.render('shows-search', { shows });
});

module.exports = router
