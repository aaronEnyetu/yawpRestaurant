const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
   
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM yawp_restaurants
    `);
    return rows.map(row => new Restaurant(row));
  }
};
