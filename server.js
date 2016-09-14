var PORT 		= 3000;
var API 		= require('./api.js');

var winston = require('winston');
var express = require('express');
var app 		= express();

var Logger = require('./logger.js');
var logger = Logger.getLogger('server');

app.locals.api = API;
app.locals.logger = logger;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api-data/:id', function (req, res) {
	var api = req.app.locals.api;
	var params = req.params;
	var logger = req.app.locals.logger;

	logger.info('Server is requesting data from api.');
	logger.debug('Request parameters are: %s', params.toString());

	api.get(params)
		.then(function(apiRes) {
			logger.info('API successfully returned data to the server.');
			logger.debug('API responded with: %s', JSON.stringify(apiRes));
			res.send(JSON.stringify(apiRes));
		})
		.catch(function(err) {
			logger.error('Server was unable to retrieve API data.');
		});
});

app.listen(PORT, function () {
  console.log('listening on port ' + PORT.toString());
});