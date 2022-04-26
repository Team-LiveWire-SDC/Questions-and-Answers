const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '172.31.30.27',
  database: 'questionsandanswers2',
  password: '',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
