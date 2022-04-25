const express = require('express');
const cors = require('cors');
const controllers = require('./controllers/controllers.js');
const PORT = 3000

const app = express();

app.get('/qa/questions/:product_id', controllers.getAllQuestionsByProduct)

app.get('/qa/questions/:question_id/answers', controllers.getAllAnswersByQuestion)

app.post('/qa/questions', controllers.addQuestion)

app.post('/qa/questions/:question_id/answers', controllers.addAnswer)

app.put('/qa/questions/:question_id/helpful', controllers.updateQuestionHelpful)

app.put('/qa/answers/:answer_id/helpful', controllers.updateAnswerHelpful)

app.put('/qa/questions/:question_id/report', controllers.reportQuestion)

app.put('/qa/answers/:answer_id/report', controllers.reportAnswer)


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})