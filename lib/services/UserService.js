const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports = class UserService {
  static async create({ username, email, password }) {
    const passwordHash = await bcrypt.hash(
      password, Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      username,
      email, 
      passwordHash
    });

    console.log(user);

    try {
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return [user, token];
    } catch(error) {
      error.status = 401;
      throw error;
    }

  }


  
};
