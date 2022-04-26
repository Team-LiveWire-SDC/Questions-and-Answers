const { Pool } = require('pg');

const pool = new Pool({
  user: 'superuser',
  host: '172.31.22.163',
  database: 'questionsandanswers2',
  password: '',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
