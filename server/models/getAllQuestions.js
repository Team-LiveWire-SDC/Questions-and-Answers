const pool = require('../db.js')

module.exports =
  function (count, page, product_id) {
    return new Promise((resolve, reject) => {
      var limit = count || 5
      var productID = product_id
      var pageNum = page || 1
      var offset = (pageNum - 1) * limit;

      var obj = {
        product_id: productID,
        results: []
      }

      const sql = `SELECT question.question_id, question.question_body, question.question_date, question.asker_name, question.question_helpfulness, question.reported, (SELECT (COALESCE(json_object_agg(answer.answer_id, json_build_object('id', answer.answer_id,'body', answer.body,'date', answer.answer_date,'answerer_name', answer.answerer_name,'helpfulness', answer.helpfulness,'photos', (SELECT (COALESCE(array_agg(json_build_object('photo_id', photo.photo_id,'photo_url', photo.photo_url)), array[]::json[])) FROM photo WHERE photo.answer_id = answer.answer_id)))::json, '{}')) FROM answer WHERE answer.question_id = question.question_id) AS answers FROM question WHERE product_id = ${productID} AND question.reported = false ORDER BY question.question_helpfulness DESC LIMIT ${limit} OFFSET ${offset};`

      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        obj.results = results.rows
        resolve(obj);
      });
    });
  }
