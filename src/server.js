'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// init()

module.exports = { init, server }