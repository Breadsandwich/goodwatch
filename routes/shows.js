const express = require('express');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth } = require('../auth.js')

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const  {Show, Review } = db

const router = express.Router()

//get all shows
router.get('/all', asyncHandler(async(req, res)=>{
    const shows = await Show.findAll()
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
        const errors = validatorErrors.array().map((error)=>error.msg)
        res.render('show-add', {
            title: 'Add Show',
            show,
            errors,
            csrfToken: req.csrfToken()
        });
    }

}));

router.get('/:id(\\d+)', asyncHandler(async(req, res)=>{
    const showId = parseInt(req.params.id, 10);
    const show = await Show.findByPk(showId);
    const allReviews = await Show.findAll({
        include: {model: Review,
        where: {
            showId
        }}
    })


    res.render('single-show',{
        title: 'Show',
        show,
        // allReviews
    });
}));

router.get('/:id(\\d+)/reviews', csrfProtection, asyncHandler(async(req, res) => {
    res.render('reviews')

}));
router.post('/:id(\\d+)/reviews', csrfProtection, asyncHandler(async(req, res) => {
    console.log('------')
    const { review, overallRating } = req.body
    const showId = parseInt(req.params.id, 10);

    const reviewPost = await Review.build({
        review,
        overallRating
    })
    console.log(showId)
    await reviewPost.save()
    res.redirect(`/shows/${showId}`)

}));


module.exports = router
