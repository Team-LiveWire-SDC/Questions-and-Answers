const { Pool } = require('pg');

const pool = new Pool({
  user: 'elliotlandon',
  host: 'localhost',
  database: 'questionsandanswers',
  password: '',
  port: 3000,
});

module.exports = pool;