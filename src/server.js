'use strict';

const Hapi = require('@hapi/hapi');
const bcrypt = require('bcrypt')
const authCrud = require('./database/crud/auth')


const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: true
    }
});

const start = async () => {
    await server.register(require('@hapi/basic'))

    server.auth.strategy('simple', 'basic', { validate })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

const validate = async (request, username, password) => {
    const auth = await authCrud.getByUsername(username)

    if (!auth) {
        console.warn(`user by username : ${username} not found!`)
        return { credentials: null, isValid: false }
    }

    const isValid = (password == auth.apiKey)
    const credentials = { id: auth.id, name: auth.username }

    return { isValid, credentials }
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

module.exports = { start, server }