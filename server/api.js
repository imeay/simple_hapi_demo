var Joi = require('Joi')
exports.register = (server, options, next) => {

  server.route({
    method : 'get',
    path : '/hello',
    config : {
      description : 'Say hello!',
      tags : ['api'],
      validate : {
        query : {
          name : Joi.string().description('访问姓名')
        }
      },
      response : {
          schema : Joi.object({
              code : Joi.number().required().description('it is err code'),
              msg : Joi.string().description('it is msg'),
              data : Joi.required(),

            })
      },
      notes : "accept name and return greetings",
      handler : (request, reply) => {
        let name = request.query.name || 'chen xiaochi';
        reply({
          code : 200,
          msg: 'success',
          data : `hello ${name}`
        })
        server.log('info', 'it will return a object')
      }
    }
  })
  next()
}
exports.register.attributes = {
  name: 'api'
}
