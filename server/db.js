const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '54.241.44.185',
  database: 'questionsandanswers2',
  password: '',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
