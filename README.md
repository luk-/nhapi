nhapi
====

node.js Voxel.net Hosting API Client

###Usage

* Create client

```javascript

var nhapi = require('nhapi')

var client = nhapi.create({
  key: 'user key'
, secret: 'user secret'
, url: 'https://api.voxel.net'
});
```

* Call a hAPI method

```javascript

client.call({method: 'voxel.devices.metrics.read', device_id: 1324, metric: 'bandwidth', start_time: 1341100800, interface: 'eth0', format: 'json_v2'}, function (err, res) {
  if (err) return console.log(err)
  console.log(res)
})
```
