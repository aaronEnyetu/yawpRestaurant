const { Router } = require('express');
const UserService = require('../services/UserService');
const authenticated = require('../middleware/authenticated');
const authorized = require('../middleware/authorized');
const User = require('../models/User');


const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const [user, token] = await UserService.create(req.body);
      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
        .json({ user,  message: 'successfully signed in!' });
    } catch(e) {
      next(e);
    }
  })


  .post('/sessions', async (req, res, next) => {
    
    try {
      const token = await UserService.signIn(req.body);
      console.log(token);

      res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
        .json({ message: 'successfully signed in' });
    } catch(e) {
      next(e);
    }
  })


  .get('/authUsers', [authenticated, authorized], async (req, res, next) => {
    try {
      const response = await User.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });
  
