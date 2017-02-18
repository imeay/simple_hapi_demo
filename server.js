const Composer = require('./app.js');

Composer((err, server) => {
    if(err){
        console.log(err);
        throw err;
    }
    server.start(() => {
        console.log(server.info.port)
    })
})
