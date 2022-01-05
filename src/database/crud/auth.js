const { pool } = require('../db')
const bcrpyt = require('bcrypt')

const { toJsonStandard } = require('../utils')


async function hash(plaintData) {
    const app_salt = "4ppJub3l10"
    const saltRounds = 10;
    const _plaintData = app_salt + plaintData

    return bcrpyt.hash(_plaintData, saltRounds)
}

async function salt(plaintData) {
    const app_salt = "4ppJub3l10"
    const _plaintData = app_salt + plaintData

    return _plaintData
}

async function create(auth) {
    if (!auth) {
        console.warn('auth cannot be null')
        return
    }

    try {
        auth.apiKey = await hash(auth.username)

        const res = await pool.query(
            "INSERT INTO tbl_auth(username, api_key) VALUES($1, $2) RETURNING id",
            [auth.username, auth.apiKey]
        )

        return { id: res.rows[0].id, ...auth }
    } catch (error) {
        console.error(error)
        return
    }
}

async function getById(id) {
    if (!id) {
        console.warn('id cannot be null')
        return
    }

    try {
        const res = await pool.query(
            "SELECT * FROM tbl_auth WHERE id = $1", [id]
        )

        return toJsonStandard({ ...res.rows[0] })
    } catch (error) {
        console.error(error)
        return
    }
}

async function getByUsername(username) {
    if (!username) {
        console.warn('username cannot be null')
        return
    }

    try {
        const res = await pool.query(
            "SELECT * FROM tbl_auth WHERE username = $1", [username]
        )

        return toJsonStandard({ ...res.rows[0] })
    } catch (error) {
        console.error(error)
        return
    }
}

async function getByApiKey(apiKey) {
    if (!apiKey) {
        console.warn('apikey cannot be null')
        return
    }

    try {
        const res = await pool.query(
            "SELECT * FROM tbl_auth WHERE api_key = $1", [apiKey]
        )

        return toJsonStandard({ ...res.rows[0] })
    } catch (error) {
        console.error(error)
        return
    }
}

async function update(auth) {
    if (!auth) {
        console.warn('auth cannot be null')
        return
    }

    try {
        const res = await pool.query(
            "UPDATE tbl_auth SET username = $1, api_key = $2", [auth.username, auth.apiKey]
        )

        return res.rows[0]
    } catch (error) {
        console.error(error)
        return
    }
}

async function deleteById(id) {
    if (!id) {
        console.warn('id cannot be null')
        return
    }

    try {
        const res = await pool.query(
            "DELETE FROM tbl_auth WHERE id = $1", [id]
        )

        return true
    } catch (error) {
        console.error(error)
        return
    }
}

module.exports = {
    salt,
    create,
    getById,
    getByUsername,
    getByApiKey,
    update,
    deleteById
}

create({ username: "jubelio_test_app" })