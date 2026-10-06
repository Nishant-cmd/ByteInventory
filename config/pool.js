const { Pool } = require('pg');
const path = require('node:path');
const { loadEnvFile } = require('node:process');
loadEnvFile(path.join(__dirname, '../.env'));

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
});
