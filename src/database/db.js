const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    database: 'db_jubelio',
    port: 5432,
    host: 'localhost'
})

module.exports = { pool }