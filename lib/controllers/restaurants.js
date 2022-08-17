const { Router } = require('express');

const router = Router();
const Restaurant = require('../models/Restaurant');


module.exports = router

  .get('/', async (req, res, next) => {
    try {
      const response = await Restaurant.getAll();
      console.log(response);
      res.json(response);
    } catch (e) {
      next(e);
    }
  });
