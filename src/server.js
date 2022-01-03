'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route({
        method: "GET",
        path: "/",
        handler: (request, reply) => {
            return "HELLO GANI GEMILAR"
        }
    })
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();