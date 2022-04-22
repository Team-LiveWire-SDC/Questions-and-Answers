const pool = require('../db.js')

module.exports = {
  getAllQuestionsByProduct: function () {
    return new Promise((resolve, reject) => {
      let sql = `SELECT question.queston_id, question.question_body, question.question_date, question.asker_name, question.reported,
      (SELECT (json_build_object(
        answer.answer_id, json_build_object(
          'id', answer.answer_id,
          'body', answer.body,
          'date', answer.answer_date,
          'answerer_name', answer.answerer_name,
          'helpfulness', answer.helpfulness,
          'photos', json_agg(json_build_object(
          'photo_id', photo.photo_id,
           'photo_url', photo.photo_url
          )
        )
      )
    )
  )
)
        AS answers
        FROM question
        INNER JOIN answer ON question.queston_id = answer.queston_id
        INNER JOIN photo ON photo.answer_id = answer.answer_id
        WHERE product_id = 1
        GROUP BY question.queston_id, answer.answer_id;`

      pool.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
}

// 'SELECT question.queston_id, question.question_body, question.question_date, question.asker_name, question.reported, question.question_helpfulness, (SELECT array_to_json(coalesce(array_agg(answer), array[]::record[])) FROM (SELECT answer.answer_id, answer.body FROM question inner join answer answer on question.queston_id = answer.queston_id where answer.queston_id = question.queston_id ) answer ) as answers from question question where question.product_id = 1 and question.reported = false'


//`SELECT json_agg(json_build_object('question_id', question.queston_id, 'question_body', question.question_body, 'question_date', question.question_date, 'asker_name', question.asker_name, 'reported', question.reported, 'answers', json_build_object(answer.answer_id, json_build_object('id', answer.answer_id, 'body', answer.body, 'date', answer.answer_date, 'answerer_name', answer.answerer_name, 'helpfulness', answer.helpfulness )))) AS results FROM question INNER JOIN answer ON question.queston_id = answer.queston_id WHERE product_id = 1 LIMIT 5;`

//json_build_object('id', answer.answer_id, 'body', answer.body, 'date', answer.answer_date, 'answerer_name', answer.answerer_name, 'helpfulness', answer.helpfulness )

// json_build_object('question_id', question.queston_id,'question_body', question.question_body,
//   'question_date', question.question_date
//   'asker_name', question.asker_name,
//   'question_helpfulness', question.question_helpfulness,
//   'reported', question.reported,
//   'answers', json_build_object(
//           'id', answer.answer_id,
//           'body', answer.body,
//           'photos', json_build_object(
//                   'id', photo.photo_id,
//           )
//   )
// )
// FROM question INNER JOIN answer ON question.queston_id = answer.queston_id INNER JOIN photo ON photo.answer_id = answer.answer_id WHERE question.product_id = ${productID} AND answer.reported = false AND question.reported = false ORDER BY question_helpfulness LIMIT ${count};'


// select row_to_json(question) as question
// from(
//   select question.queston_id, question.question_body,
//   (select json_agg(answer)
//   from (
//     select answer.answer_id, answer.body from answer where question.queston_id = answer.answer_id
//   ) answer
// ) as answer
// from question as a) answer;

//SELECT json_agg(question) FROM (SELECT question.queston_id, question.question_body FROM question WHERE product_id = 1) as question;

// SELECT question.queston_id, question.question_body, question.question_date, question.question_helpfulness, answer_id, answer.body, answer_date, answerer_name, answer.helpfulness FROM question INNER JOIN answer ON question.queston_id = answer.queston_id WHERE question.product_id = 1 AND answer.reported = false AND question.reported = false ORDER BY question_helpfulness LIMIT 5;

// product ID and limit need to come from the query parameters - limit defaults to 5

// need to account for empty photo array

// SELECT question.queston_id, question.question_body, question.question_date, question.question_helpfulness, answer.answer_id, answer.body, answer.answer_date, answer.answerer_name, answer.helpfulness, photo.photo_id, photo.photo_url  FROM question INNER JOIN answer ON question.queston_id = answer.queston_id INNER JOIN photo ON photo.answer_id = answer.answer_id WHERE question.product_id = 1 AND answer.reported = false AND question.reported = false ORDER BY question_helpfulness;




//`SELECT product_id, question.queston_id, question.question_body, question.question_date, question.asker_name, question.question_helpfulness, question.reported, answer.answer_id, answer.body, answer.answer_date, answer.answerer_name, answer.helpfulness, photo.photo_id, photo.photo_url FROM question INNER JOIN answer ON question.queston_id = answer.queston_id INNER JOIN photo ON photo.answer_id = answer.answer_id WHERE question.product_id = ${productID} AND answer.reported = false AND question.reported = false ORDER BY question_helpfulness LIMIT ${count};`;

//'SELECT json_agg (question) FROM (SELECT question.queston_id, question.question_body, question.question_date, question.question_helpfulness, answer.answer_id, answer.body, answer.answer_date, answer.answerer_name, answer.helpfulness, photo.photo_id, photo.photo_url FROM question INNER JOIN answer ON question.queston_id = answer.queston_id INNER JOIN photo ON photo.answer_id = answer.answer_id WHERE question.product_id = 1 AND answer.reported = false AND question.reported = false ORDER BY question_helpfulness) as question;'

//'SELECT json_agg(question) FROM (SELECT question.queston_id, question.question_body FROM question INNER JOIN row_to_json(answer) FROM (SELECT answer.answerer_name) as answers ON answer.queston_id = question.queston_id WHERE product_id = 1) as question'


//'SELECT json_agg(question) AS results FROM (SELECT question.queston_id, question.question_body, question.question_date, question.asker_name, question.question_helpfulness, question.reported, (SELECT json_agg(answer) AS answers FROM (SELECT answer.*) answer WHERE product_id = 1) question);'

// `SELECT json_agg(json_build_object('question_id', question.queston_id, 'question_body', question.question_body, 'question_date', question.question_date, 'asker_name', question.asker_name, 'reported', question.reported, 'answers', json_build_object('answer_id', answer.answer_id, 'body', answer.body, 'date', answer.answer_date, 'answerer_name', answer.answerer_name, 'helpfulness', answer.helpfulness, 'photos', json_agg(json_build_object('photo_id', photo.photo_id))))) AS results FROM question INNER JOIN answer ON question.queston_id = answer.queston_id INNER JOIN photo ON photo.answer_id = answer.answer_id WHERE product_id = 1 LIMIT 5;`


// CLOSEST TO ACTUALLY WORKING

//`SELECT json_agg(json_build_object('question_id', question.queston_id, 'question_body', question.question_body, 'question_date', question.question_date, 'asker_name', question.asker_name, 'reported', question.reported, 'answers', json_build_object('id', answer.answer_id, 'body', answer.body, 'date', answer.answer_date, 'answerer_name', answer.answerer_name, 'helpfulness', answer.helpfulness ))) AS results FROM question INNER JOIN answer ON question.queston_id = answer.queston_id WHERE product_id = 1 LIMIT 5;`

// `SELECT
//         json_build_object(
//           'question_id', question.queston_id,
//           'question_body', question.question_body,
//           'question_date', question.question_date,
//           'asker_name', question.asker_name,
//           'reported', question.reported,
//           'answers', (SELECT (json_build_object(
//             answer.answer_id, json_build_object(
//               'id', answer.answer_id,
//               'body', answer.body,
//               'date', answer.answer_date,
//               'answerer_name', answer.answerer_name,
//               'helpfulness', answer.helpfulness,
//               'photos', (SELECT (json_agg(json_build_object(
//                 'photo_id', photo.photo_id,
//                 'photo_url', photo.photo_url
//               )
//               )
//               )
//               FROM photo LIMIT 1
//             )
//           )
//           )
//         )
//         FROM answer LIMIT 1
//       )
//       )
//                AS results
//                FROM question
//                INNER JOIN answer ON question.queston_id = answer.queston_id
//                INNER JOIN photo ON photo.answer_id = answer.answer_id
//                WHERE product_id = 1
//                GROUP BY question.queston_id, answer.answer_id;`
