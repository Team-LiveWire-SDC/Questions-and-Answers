const pool = require('../db.js')

module.exports =
  (answer_id) => {
    return new Promise((resolve, reject) => {

      const sql = `UPDATE answer SET reported = true WHERE answer_id = ${answer_id};`

      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }