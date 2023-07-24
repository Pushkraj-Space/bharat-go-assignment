const Pool = require('pg').Pool;

module.exports = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'bharat_go',
  password: process.env.DB_PASSWORD || 'root123',
  port: process.env.DB_PORT || 5432,
})