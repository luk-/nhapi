var HapiClient = require('./lib').HapiClient
var hapi = require('./lib')

exports.create = function (auth) {
  return new HapiClient(auth)
}

exports.getCredentials = function (auth, cb) {
  return hapi.getCredentials(auth, cb)
}
