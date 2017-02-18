const Confidence = require('confidence');

const criteria = {
    env: process.env.NODE_ENV
}
const manifest = {
    $meta: 'this is a config file',
    server: {
        debug: {
            request: ['error']
        }
    },
    connections: [{
        port: 30000,
        labels: ['web']
    }],
    registrations: [
       {
            plugin: {
                register: 'good',
                options: {
                    reporters: {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{
                                    response: '*',
                                    log: '*'
                                }]
                            },
                            {
                                module: 'good-console'
                            },
                            'stdout'
                        ]
                    }
                }
            }
        }, {
            plugin: './server/api',
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        }
    ]
}

const store = new Confidence.Store(manifest);

module.exports = {
    get: (key) => {
        return store.get(key, criteria);
    },
    meta: (key) => {
        return store.meta(key, criteria);
    }
}
