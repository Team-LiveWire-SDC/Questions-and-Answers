const pool = require('../db.js')

module.exports =
  (question_id) => {
    return new Promise((resolve, reject) => {

      let sql = `UPDATE question SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id};`

      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }