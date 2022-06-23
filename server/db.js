require("dotenv").config()

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = pool;
