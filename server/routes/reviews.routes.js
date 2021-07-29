const router = require("express").Router();
const mongoose = require('mongoose');
const Review = require('../models/Review.model');
const User = require("../models/User.model");


//ADD REVIEW
router.post('/:bookId/new-review', (req, res) => {
    const {bookId} = req.params
    const {owner, comment, rating} = req.body
  
    Review.create({owner, comment, bookId, rating})
    .then(newReview => {
        User.findById(owner).then(user => {
            user.reviews.push(newReview)
            return user.save()
        }).then(user => res.json(newReview))
    })
    .catch(err => res.json(err))
})
  
  

//LIST BOOK REVIEWS
router.get('/:bookId/reviews', (req, res) => {
      
    Review.find({"bookId": req.params.bookId})
    .populate("owner")
    .then(reviews => res.json(reviews))
    .catch(err => res.json(err))
})


    module.exports = router;