const { Pool } = require('pg');

const pool = new Pool({
  user: 'superuser',
  host: '204.236.138.189',
  database: 'questionsandanswers2',
  password: '1234',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
