const { pool } = require('./db')

async function createTables() {
    let res = await pool.query(`
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
    console.log("create table tbl_product DONE!")
}

module.exports = {
    createTables
}