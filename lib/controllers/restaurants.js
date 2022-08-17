const { Router } = require('express');
const authenticated = require('../middleware/authenticated');

const router = Router();
const Restaurant = require('../models/Restaurant');


module.exports = router

  .get('/', async (req, res, next) => {
    try {
      const response = await Restaurant.getAll();
      // console.log(response);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {      
      const restaurant = await Restaurant.getByID(req.params.id);
      await restaurant.getReviews();
      res.json(restaurant);
    } catch (e) {
      next(e);
    }
  })

  .post('/:id/reviews', authenticated, async (req, res, next) => {
    try{
      const newReview = await Restaurant.addReview({ ...req.body, rest_id: req.params.id, user_id: req.user.id });
      
      console.log('break.req.params.id', req.params.id);
      console.log('req.user', req.user);
      console.log('req.body', req.body);
      res.json(newReview);
    } catch(e) {
      next(e);
    }
  });
