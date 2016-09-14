var Cache 		= require('./cache.js');
var prequest 	= require('prequest');
var winston 	= require('winston');

var Logger = require('./logger.js');
var logger = Logger.getLogger('api');

var API = function() {
	this.requestOptions = {
		url: 'https://api.github.com/search/repositories?q=user%3Akripple+repo%3Aall-of-the-caches&ref=searchresults&type=Repositories',
		headers: {
    	'User-Agent': 'kripple'
  	}
	};
	this.cache = Cache;
}

API.prototype.get = function(params) {
	logger.info('API is requesting data from the cache.');
	return this.cache.get(this.requestOptions,this.retrieve);
}

API.prototype.retrieve = function(opts) {
	var openIssuesCount = 0;

	logger.info('API is making a GET request.');
	logger.info('API is requesting data at %s.', opts.url);

	return prequest(opts)
		.then(function(res) {
			logger.info('API successfully retrieved data from the internet.')

			openIssuesCount = getOpenIssuesCount(res.items);
			logger.info('API is responding to server with %s.', openIssuesCount.toString());
	
			return openIssuesCount;
		})
		.catch(function(err) {
			logger.error('API was unable to retrieve data.');
		});	
}

function getOpenIssuesCount(items) {
	var openIssues = 0;
	for(var i = 0; i < items.length; i++) {
		openIssues += items[i].open_issues;
	}
	return openIssues;
}

module.exports = new API();

