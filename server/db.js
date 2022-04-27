const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '52.53.255.117',
  database: 'questionsandanswers2',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
