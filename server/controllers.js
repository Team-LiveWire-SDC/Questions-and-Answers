const models = require('./models');

module.exports = {
  get: function (req, res) {
    models.get()
      .then(data => res.send(data.rows))
      .catch(err => console.log(err));
  },
}