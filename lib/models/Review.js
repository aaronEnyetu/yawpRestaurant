const pool = require('../utils/pool');

module.exports = class Review {
  id;
  stars;
  detail;
  user_id;
  rest_id;

  constructor(row) {
    this.id = row.id;
    this.stars = row.stars;
    this.detail = row.detail;
    this.user_id = row.user_id;
    this.rest_id = row.rest_id;
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE from yawp_reviews
        WHERE id = $1
        RETURNING *`, [id]
    );
    return new Review(rows[0]);
  }

  static async getReviewById(id) {
    const { rows } = await pool.query(
      `SELECT yawp_reviews.* FROM yawp_reviews
      INNER JOIN yawp_users on yawp_reviews.user_id = yawp_users.id
      WHERE yawp_reviews.id = $1`, [id]
    );
    return new Review(rows[0]);
  }
};
