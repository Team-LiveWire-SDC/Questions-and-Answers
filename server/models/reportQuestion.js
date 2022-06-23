const pool = require('../db.js')

module.exports =
  (question_id) => {
    return new Promise((resolve, reject) => {

      const sql = `UPDATE question SET reported = true WHERE question_id = ${question_id};`

      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }