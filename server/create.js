const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const controllers = require('./controllers/controllers.js')

const createServer = () => {
  const app = express();

  const corsOptions = { origin: process.env.URL || '*' };

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));

  app.get('/qa/questions/:product_id', controllers.getAllQuestionsByProduct)

  app.get('/qa/questions/:question_id/answers', controllers.getAllAnswersByQuestion)

  app.post('/qa/questions', controllers.addQuestion)

  app.post('/qa/questions/:question_id/answers', controllers.addAnswer)

  app.put('/qa/questions/:question_id/helpful', controllers.updateQuestionHelpful)

  app.put('/qa/answers/:answer_id/helpful', controllers.updateAnswerHelpful)

  app.put('/qa/questions/:question_id/report', controllers.reportQuestion)

  app.put('/qa/answers/:answer_id/report', controllers.reportAnswer)

  app.patch(`/qa/questions/:question_id/edit`, controllers.editQuestion)

  return app;
};

module.exports = { createServer };