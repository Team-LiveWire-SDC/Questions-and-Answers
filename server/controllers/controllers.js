const models = require('../models/models.js');

module.exports = {
  getAllQuestionsByProduct: function (req, res) {
    models.getAllQuestionsByProduct(req.params.count, req.params.page, req.params.product_id)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  },

  getAllAnswersByQuestion: function (req, res) {
    models.getAllAnswersByQuestion(req.params.count, req.params.page, req.params.question_id)
      .then(data => res.send(data))
      .catch(err => console.log(err));
  },

  addQuestion: function(req, res) {
    models.addQuestion(req)
      .then(data => res.sendStatus(201))
      .catch(err => console.log(err));
  },

  addAnswer: function(req, res) {
    models.addAnswer(req)
      .then(data => res.sendStatus(201))
      .catch(err => console.log(err));
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
