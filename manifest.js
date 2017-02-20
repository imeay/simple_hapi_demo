const Confidence = require('confidence')

const criteria = {
  env: process.env.NODE_ENV
}
function pad(num) {
    return (num > 9 ? "" : "0") + num;
}

function generator(time, index) {
    if(! time)
        return "file.log";

    var month  = time.getFullYear() + "" + pad(time.getMonth() + 1);
    var day    = pad(time.getDate());
    var hour   = pad(time.getHours());
    var minute = pad(time.getMinutes());

    return "/storage/" + month + "/" +
        month + day + "-" + hour + minute + "-" + index + "-file.log";
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
        plugin : 'vision',
    },
    {
        plugin :'inert'
    },{
        plugin : 'lout'
    },
    {
        plugin : 'hapi-swagger'
    },
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
            ],
            file: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            },
              {
                module: 'good-squeeze',
                name: 'SafeJson',
                args: [
                  null,
                  { separator: ',' }

                ]
              }
              // {
              //    module : 'good-file',
              //    args : ['./logs/xxx_log']
              // } 
              , {
                module: 'rotating-file-stream',
                args: [
                    generator,{
                        path : './logs',
                        size: '1000B',
                    }
                ]
              }
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

const store = new Confidence.Store(manifest)

module.exports = {
  get: (key) => {
    return store.get(key, criteria)
  },
  meta: (key) => {
    return store.meta(key, criteria)
  }
}
