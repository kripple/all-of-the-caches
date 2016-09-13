var PORT 		= 3000;
var API 		= require('./api.js');

var util 		= require('util');
var express = require('express');
var app 		= express();

// app.set('API', API);
app.locals.api = API;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api-data/:id', function (req, res) {
	var api = req.app.locals.api;
	var params = req.params;
	// var requestObj = {};
	// requestObj.cache = req.app.get('cache');
	// requestObj.params = req.params;
	api.get(params)
		.then(function(apiRes) {
			res.send(JSON.stringify(apiRes));
		})
		.catch(function(err) {
			util.error(JSON.stringify(err));
		});
});

app.listen(PORT, function () {
  console.log('listening on port ' + PORT.toString());
});