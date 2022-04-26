const { Pool } = require('pg');

const pool = new Pool({
  user: 'superuser',
  host: '172.31.30.27',
  database: 'questionsandanswers2',
  password: '1234',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
