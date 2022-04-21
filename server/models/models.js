const pool = require('./db.js')

module.exports = {
  get: function () {
    return new Promise((res, rej) => {
      let sql = 'SELECT * FROM question WHERE product_id = 1';
      pool.query(sql, (err, results) => {
        if (err) {
          return rej(err);
        }
        res(results);
      });
    });
  },
}


// 'SELECT characteristics.*, characteristics_reviews.value, characteristics_reviews.review_id FROM characteristics INNER JOIN characteristics_reviews ON characteristics.id = characteristics_reviews.characteristic_id ORDER BY characteristics.id LIMIT 100';