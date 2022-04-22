const models = require('../models/models.js');

module.exports = {
  get: function (req, res) {
    models.getAllQuestionsByProduct()
      .then(data => res.send(data.rows))
      .catch(err => console.log(err));
  },
}