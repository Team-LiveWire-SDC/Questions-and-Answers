const pool = require('../db.js')

module.exports = {
  getAllQuestionsByProduct: function (count, page, product_id) {
    return new Promise((resolve, reject) => {
      var limit = count || 5
      var productID = product_id || 1
      var pageNum = page || 1
      var offset = (pageNum - 1) * limit;

      var obj = {
        product_id: productID,
        results: []
      }

      let sql = `SELECT question.question_id, question.question_body, question.question_date, question.asker_name, question.question_helpfulness, question.reported, (SELECT (COALESCE(json_object_agg(answer.answer_id, json_build_object('id', answer.answer_id,'body', answer.body,'date', answer.answer_date,'answerer_name', answer.answerer_name,'helpfulness', answer.helpfulness,'photos', (SELECT (COALESCE(array_agg(json_build_object('photo_id', photo.photo_id,'photo_url', photo.photo_url)), array[]::json[])) FROM photo WHERE photo.answer_id = answer.answer_id)))::json, '{}')) FROM answer WHERE answer.question_id = question.question_id) AS answers FROM question WHERE product_id = ${productID} AND question.reported = false ORDER BY question.question_helpfulness DESC LIMIT ${limit} OFFSET ${offset};`

      // EXPLAIN ANALYZE SELECT question.question_id, question.question_body, question.question_date, question.asker_name, question.question_helpfulness, question.reported, (SELECT (COALESCE(json_object_agg(answer.answer_id, json_build_object('id', answer.answer_id,'body', answer.body,'date', answer.answer_date,'answerer_name', answer.answerer_name,'helpfulness', answer.helpfulness,'photos', (SELECT (COALESCE(array_agg(json_build_object('photo_id', photo.photo_id,'photo_url', photo.photo_url)), array[]::json[])) FROM photo WHERE photo.answer_id = answer.answer_id))) FROM answer WHERE answer.question_id = question.question_id) AS answers FROM question WHERE product_id = 1 AND question.reported = false ORDER BY question.question_helpfulness DESC LIMIT 5;

      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        obj.results = results.rows
        resolve(obj);
      });
    });
  },

  getAllAnswersByQuestion: function (count, page, question_id) {
    return new Promise((resolve, reject) => {
      var limit = count || 5
      var questionID = question_id || 1
      var pageNum = page || 1
      var offset = (pageNum - 1) * limit;

      var obj = {
        question: questionID,
        page: pageNum,
        count: limit,
        results: []
      }

      let sql = `SELECT answer.answer_id, answer.body, answer.answer_date, answer.answerer_name, answer.helpfulness, (SELECT (COALESCE(array_agg(json_build_object('photo_id', photo.photo_id,'photo_url', photo.photo_url)), array[]::json[])) FROM photo WHERE photo.answer_id = answer.answer_id) AS photos FROM answer WHERE answer.question_id = ${questionID} AND answer.reported = false ORDER BY answer.helpfulness DESC LIMIT ${limit} OFFSET ${offset};`

      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        obj.results = results.rows
        resolve(obj);
      });
    });
  },

  addQuestion: function (req) {
    return new Promise((resolve, reject) => {

      let sql = `INSERT INTO question (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES
      (${req.body.product_id}, ${req.body.body}, ${new Date()}, ${req.body.name}, ${req.body.email}, false, 0)`

      pool.query(sql, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  addAnswer: function (req) {
    return new Promise((resolve, reject) => {

      let sql = `INSERT INTO answer (question_id, body, answer_date, answerer_name, answerer_email, reported, helpfulness) VALUES
      (${req.params.question_id}, ${req.body.body}, ${new Date()}, ${req.body.name}, ${req.body.email}, false, 0)`

      pool.query(sql, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  incrementQuestionHelpfulness: function (req) {
    return new Promise((resolve, reject) => {
      var id = Number(req.params.question_id)

      let sql = `UPDATE question SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${id};`

      pool.query(sql, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  incrementAnswerHelpfulness: function (req) {
    return new Promise((resolve, reject) => {
      var id = Number(req.params.answer_id)

      let sql = `UPDATE answer SET helpfulness = helpfulness + 1 WHERE answer_id = ${id};`

      pool.query(sql, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  reportQuestion: function (req) {
    return new Promise((resolve, reject) => {
      var id = Number(req.params.question_id)

      let sql = `UPDATE question SET reported = true WHERE question_id = ${id};`

      pool.query(sql, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  reportAnswer: function (req) {
    return new Promise((resolve, reject) => {
      var id = Number(req.params.answer_id)

      let sql = `UPDATE answer SET reported = true WHERE answer_id = ${id};`

      pool.query(sql, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
}
