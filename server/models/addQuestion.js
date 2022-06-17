const pool = require('../db.js')

module.exports =
  (body, name, email, product_id) => {
    return new Promise((resolve, reject) => {

      const date = new Date();
      let sql = `
      INSERT INTO question (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, false, 0)`;

      pool.query(sql, [product_id, body, date.toISOString(), name, email], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    })
  }
