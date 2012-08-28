var HapiClient = require('./lib').HapiClient

exports.create = function (auth) {
  return new HapiClient(auth)
}
