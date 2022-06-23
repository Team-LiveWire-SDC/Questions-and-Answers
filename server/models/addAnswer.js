const pool = require('../db.js')

module.exports =
  (body, name, email, question_id) => {
    return new Promise((resolve, reject) => {

      const date = new Date();
      const sql = `
      INSERT INTO answer (question_id, body, answer_date, answerer_name, answerer_email, reported, helpfulness) VALUES ($1, $2, $3, $4, $5, false, 0)`

      pool.query(sql, [question_id, body, date.toISOString(), name, email], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }