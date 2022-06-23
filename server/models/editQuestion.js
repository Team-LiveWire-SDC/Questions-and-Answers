const pool = require('../db.js')

module.exports =
  function (question_body, question_id) {
    return new Promise((resolve, reject) => {

      if (question_body) {
        const sql = `UPDATE question SET question_body = '${question_body}' WHERE question_id = ${question_id} RETURNING question_body AS updated_question_body`

        pool.query(sql, (err, results) => {
          if (err) {
            return reject(err)
          }
          resolve(results)
        })
      } else {
        return err
      }
    })
  }