var qs      = require('querystring')
  , request = require('request')
  , crypto  = require('crypto')


var HapiClient = exports.HapiClient = function (auth) {
  var self = this
  typeof (auth) === 'object' || (function () {throw new Error('argument must be an object')})()
  this.url          = auth.url 
  this.key          = auth.key
  this.secret       = auth.secret

  this.call = function (method, cb) {
    return Request(auth, method, this.url, cb)
  }
}

var getCredentials = exports.getCredentials = function (auth, cb) {
  this.url      = auth.url || 'api.voxel.net'
  this.username = auth.username
  this.password = auth.password
  this.method   = '/?method=voxel.hapi.authkeys.read'
  
  this.uri = 'https://' + this.username + ':' + this.password + '@' + this.url + this.method
  
  return request.post({url: this.uri}, function (err, res, body) {
    if (err) {
      return cb (err)
    }
    cb(null, body)
  })
}

var Request = function (auth, method, url, cb) {
  auth.timestamp = new Date().toISOString()

  var api_sig = (function () {
    var md5 = crypto.createHash('md5')
    var sig = {}

    Object.keys(auth).forEach(function (val) {
      method[val] = auth[val]
    })

    var sort = Object.keys(method).sort().forEach(function (val, key) {
      sig[val] = method[val];
    })

    var query = auth.secret + qs.unescape(qs.stringify(sig).replace(/\=|&/g, ''))
    md5.update(query)
    method.api_sig = md5.digest('hex')
  })()

  var query = qs.stringify(method)

  return request(
    {
      method: 'POST',
      uri: url + '?' + query
    },
    function (err, res, body) {
      if (err) {
	return cb(err)
      }
      return cb(null, body)
    })
}
