const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'insecuredb',
    password: process.env.DB_PASS || 'postgres',
    port: process.env.DB_PORT || 5432,
});

module.exports = pool;
