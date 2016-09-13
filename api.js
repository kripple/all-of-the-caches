var Cache 		= require('./cache.js');
var prequest 	= require('prequest');
var util 			= require('util');

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
	// not using params
	return this.cache.get(this.requestOptions,this.retrieve);
}

API.prototype.retrieve = function(url) {
	var openIssuesCount = 0;
	return prequest(url)
		.then(function(res) {
			openIssuesCount = getOpenIssuesCount(res.items);
			return openIssuesCount;
		})
		.catch(function(err) {
			util.error(err);
			return openIssuesCount;
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