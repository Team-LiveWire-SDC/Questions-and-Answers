const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_id: Number,
  product_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  question_reported: String,
  question_helpfulness: Number,
  answer_id: Number,
  answer_body: String,
  answer_date: String,
  answerer_name: String,
  answerer_email: String,
  answer_reported: String,
  helpfulness: Number,
  photo_id: Number,
  photo_url: String

});

const Blog = mongoose.model('Question', questionSchema);

module.exports = Question;