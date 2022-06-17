const getQuestions = require('../models/getAllQuestions')
const getAnswers = require('../models/getAllAnswers')
const addAQuestion = require('../models/addQuestion')
const addAnAnswer = require('../models/addAnswer')
const incrementQuestionHelpful = require('../models/incrementQuestionHelpful')
const incrementAnswerHelpful = require('../models/incrementAnswerHelpful')
const reportQuestion = require('../models/reportQuestion')
const reportAnswer = require('../models/reportAnswer')

module.exports = {
  getAllQuestionsByProduct: function (req, res) {
    const { count, page, product_id } = req.params
    getQuestions(count, page, product_id)
      .then(data => res.send(data))
      .catch(err => res.sendStatus(501));
  },

  getAllAnswersByQuestion: function (req, res) {
    const { count, page, question_id } = req.params
    getAnswers(count, page, question_id)
      .then(data => res.send(data))
      .catch(err => res.sendStatus(501));
  },

  addQuestion: function (req, res) {
    const { body, name, email, product_id } = req.body;
    addAQuestion(body, name, email, product_id)
      .then(data => res.sendStatus(201))
      .catch(err => res.sendStatus(422));
  },

  addAnswer: function (req, res) {
    const { body, name, email } = req.body;
    const question_id = req.params.question_id;
    addAnAnswer(body, name, email, question_id)
      .then(data => res.sendStatus(201))
      .catch(err => res.sendStatus(422));
  },

  updateQuestionHelpful: function (req, res) {
    const question_id = req.params.question_id
    incrementQuestionHelpful(question_id)
      .then(data => res.sendStatus(204))
      .catch(err => res.sendStatus(400));
  },

  updateAnswerHelpful: function (req, res) {
    const answer_id = req.params.answer_id
    incrementAnswerHelpful(answer_id)
      .then(data => res.sendStatus(204))
      .catch(err => res.sendStatus(400));
  },

  reportQuestion: function (req, res) {
    const question_id = req.params.question_id
    reportQuestion(question_id)
      .then(data => res.sendStatus(204))
      .catch(err => res.sendStatus(400));
  },

  reportAnswer: function (req, res) {
    const answer_id = req.params.answer_id
    reportAnswer(answer_id)
      .then(data => res.sendStatus(204))
      .catch(err => res.sendStatus(400));
  }
}
