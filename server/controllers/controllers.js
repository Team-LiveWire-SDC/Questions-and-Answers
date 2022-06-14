const models = require('../models/models.js');

module.exports = {
  getAllQuestionsByProduct: function (req, res) {
    models.getAllQuestionsByProduct(req.params.count, req.params.page, req.params.product_id)
      .then(data => res.send(data))
      .catch(err => res.sendStatus(501));
  },

  getAllAnswersByQuestion: function (req, res) {
    models.getAllAnswersByQuestion(req.params.count, req.params.page, req.params.question_id)
      .then(data => res.send(data))
      .catch(err =>  res.sendStatus(501));
  },

  addQuestion: function(req, res) {
    const { body, name, email } = req.body;
    const productId = req.body.product_id;
    models.addQuestion(body, name, email, productId)
      .then(data => res.sendStatus(201))
      .catch(err => res.sendStatus(422));
  },

  addAnswer: function(req, res) {
    const { body, name, email } = req.body;
    const questionId = req.params.question_id;
    models.addAnswer(body, name, email, questionId)
      .then(data => res.sendStatus(201))
      .catch(err => res.sendStatus(422));
  },

  updateQuestionHelpful: function(req, res) {
    models.incrementQuestionHelpfulness(req)
      .then(data => res.sendStatus(204))
      .catch(err => console.log(err));
  },

  updateAnswerHelpful: function(req, res) {
    models.incrementAnswerHelpfulness(req)
      .then(data => res.sendStatus(204))
      .catch(err => console.log(err));
  },

  reportQuestion: function(req, res) {
    models.reportQuestion(req)
      .then(data => res.sendStatus(204))
      .catch(err => console.log(err));
  },

  reportAnswer: function(req, res) {
    models.reportAnswer(req)
      .then(data => res.sendStatus(204))
      .catch(err => console.log(err));
  },
}
