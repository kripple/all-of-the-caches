var prequest = require('prequest');

var API = function() {
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
	var promise = cache.get(opts,this.retrieve);
	return promise;
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
			console.log('error: ' + err);
			return 0;
		});	

}

module.exports = new API();