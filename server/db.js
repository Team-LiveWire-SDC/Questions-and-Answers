const { Pool } = require('pg');

const pool = new Pool({
  user: 'elliotlandon',
  host: 'localhost',
  database: 'questionsandanswers',
  password: '',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
