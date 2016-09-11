var prequest = require('prequest');

var API = function() {
	this.root = 'https://api.github.com';
	this.testURLs = {
		1: '/users/kripple/repos',
		2: '/search/repositories?q=nyan&cat',
		3: '/search/users?q=nyan&cat'
	};
	this.requestOptions = {
		url: 'https://api.github.com/search/repositories?q=user%3Akripple+repo%3Aall-of-the-caches&ref=searchresults&type=Repositories',
		headers: {
    	'User-Agent': 'kripple'
  	}
	};
}

API.prototype.get = function(args) {
	var cache = args.cache;
	var params = args.params;
	var opts = this.requestOptions;
	
	cache.get(opts,this.retrieve);
}

API.prototype.retrieve = function(url) {
	return prequest(url)
		.then(function(res) {
			var items = res.items; 
			var openIssues = 0;
			for(var i = 0; i < items.length; i++) {
				openIssues += items[i].open_issues;
			}
			return openIssues;
		})
		.catch(function(err) {
			debugger
		});	

}

module.exports = new API();