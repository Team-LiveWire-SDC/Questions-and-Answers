const express = require('express');
const cors = require('cors');
const controllers = require('./controllers/controllers.js');
const PORT = 3000

const app = express();

app.get('/questions', controllers.get)

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})