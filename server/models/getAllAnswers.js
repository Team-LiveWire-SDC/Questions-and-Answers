const pool = require('../db.js')

module.exports =
  (count, page, question_id) => {
    return new Promise((resolve, reject) => {
      var limit = count || 5
      var questionID = question_id
      var pageNum = page || 1
      var offset = (pageNum - 1) * limit;

      var obj = {
        question: questionID,
        page: pageNum,
        count: limit,
        results: []
      }

      const sql = `SELECT answer.answer_id, answer.body, answer.answer_date, answer.answerer_name, answer.helpfulness, (SELECT (COALESCE(array_agg(json_build_object('photo_id', photo.photo_id,'photo_url', photo.photo_url)), array[]::json[])) FROM photo WHERE photo.answer_id = answer.answer_id) AS photos FROM answer WHERE answer.question_id = ${questionID} AND answer.reported = false ORDER BY answer.helpfulness DESC LIMIT ${limit} OFFSET ${offset};`

      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        obj.results = results.rows
        resolve(obj);
      });
    });
  }