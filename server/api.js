exports.register = (server, options, next) => {

    server.route({
        method: 'get',
        path: '/hello',
        handler: (request, reply) => {
            reply({
                msg : 'hello world'
            })
            server.log('info','it will return a object')
        }
    });

    next();
}
exports.register.attributes = {
    name: 'api'
}
