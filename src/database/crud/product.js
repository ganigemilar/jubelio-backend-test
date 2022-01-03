const { pool } = require('../db')
const initdb = require('../init-db')



async function create(product) {
    if (!product) {
        console.log('product cannot be null')
        return
    }

    try {
        const res = await pool.query(
            "INSERT INTO tbl_product(name, sku, image, price, description) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [product.name, product.sku, product.image, product.price, product.description]
        )
        if (!res) return null

        const id = res.rows[0].id    
        console.log(`product added ${id}`) 
        
        return {
            id: id,
            ...product
        }
    } catch (error) {
        console.error(error)
    }
}

async function getById(id) {
    if (!id) {
        console.log('id cannot be null')
        return
    }

    try {
        const res = await pool.query("SELECT * FROM tbl_product WHERE id = $1 LIMIT 1", id)
        
        if (!res) return null

        return { ...res.rows[0] }
    } catch (error) {
        console.error(error)
    }
}

async function update(product) {
    if (!product) {
        console.log('product cannot be null')
        return
    }

    if (!product.id) {
        console.log('product id cannot be null')
        return
    }

    try {
        const res = await pool.query(
            "UPDATE FROM tbl_product SET name = $2, sku = $3, image = $4, price = $5, description = $6 WHERE id = $1",
            product.id, product.name, product.sku, product.image, product.price
        )

        if (!res) return null

        return { ...res.rows[0] }
    } catch (error) {
        console.error(error)
    }
}

async function deleteById(id) {
    if (!id) {
        console.log('id cannot be null')
        return
    }

    try {
        const res = await pool.query("DELETE FROM tbl_product WHERE id = $1", id)

        if (!res) return null

        return true
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    create,
    getById,
    update,
    deleteById
}

// pool.query('DELETE FROM tbl_product')

// let res = create({ 
//     name: "APAPAA",
//     sku: "sku2",
//     image: "ini image",
//     price: 178000
// }).then(res => {
//     console.log(JSON.stringify(res))
// })

