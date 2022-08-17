const { Router } = require('express');
const authenticated = require('../middleware/authenticated');
const Review = require('../models/Review');

module.exports = Router()
  .delete('/:id', [authenticated], async (req, res, next) => {
    try {
      const review = await Review.getReviewById(req.params.id);
      console.log('req.user', req.user);
      console.log('review', review);
      if (req.user.email !== 'admin@example.com' && review.user_id !== req.user.id)   
        throw new Error('Must be an Admin to delete');

      const deleteReview = await Review.delete(review.id);
      res.json(deleteReview);
    } catch (e) {
      next(e);
    }
  });
