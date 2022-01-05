const { pool } = require('./db')

async function createTables() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tbl_product(
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            sku VARCHAR NOT NULL,
            image TEXT NOT NULL,
            price INTEGER NOT NULL,
            description VARCHAR,

            CONSTRAINT sku_uniq UNIQUE (sku)
        )
    `)
    console.info("create table tbl_product DONE!")

    await pool.query(`
        CREATE TABLE IF NOT EXISTS tbl_auth(
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            api_key VARCHAR,

            CONSTRAINT username_uniq UNIQUE (username),
            CONSTRAINT api_key_uniq UNIQUE (api_key)
        )
    `)
    console.info("create table tbl_auth DONE!")
}

module.exports = {
    createTables
}