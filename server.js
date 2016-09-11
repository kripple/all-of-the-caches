var express = require('express');
var app = express();

var API = require('./api.js');
app.set('API', API);

var Cache = require('./cache.js');
app.set('cache', Cache);



var port = 3000;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api-data/:id', function (req, res) {
	var api = req.app.get('API');
	var requestObj = {};
	requestObj.cache = req.app.get('cache');
	requestObj.params = req.params;

	api.get(requestObj)
		.then(function(apiRes) {
			debugger
			res.send(apiRes);
		})
		.catch(function(err) {
			debugger
			res.send('error: ' + err.toString());
		});
});

app.listen(port, function () {
  console.log('listening on port ' + port.toString());
});