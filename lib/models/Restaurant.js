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


  static async getByID(id) {
    const { rows } = await pool.query(
      `SELECT * FROM yawp_restaurants 
        WHERE id = $1;`,
      [id]
    );
    return new Restaurant(rows[0]);
  }
  async getReviews() {
    const { rows } = await pool.query(
      `SELECT yawp_reviews.*
        FROM yawp_reviews
        INNER JOIN yawp_restaurants on yawp_restaurants.id = yawp_reviews.rest_id
        WHERE yawp_restaurants.id = $1`,
      [this.id]
    );
    console.log(rows);
    this.reviews = rows;
  }


};
