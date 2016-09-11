var prequest = require('prequest');

var API = function() {
	this.root = 'https://api.github.com';
	this.testURLs = {
		1: '/users/kripple/repos',
		2: '/search/repositories?q=nyan&cat',
		3: '/search/users?q=nyan&cat'
	}
}

API.prototype.get = function(args) {
	var cache = args.cache;
	var params = args.params;
	var url = this.testURLs[params.id];
	
	cache.get(url,this.retrieve);
}

API.prototype.retrieve = function(url) {
	prequest(url)
		.then(function() {
			debugger
		})
		.catch(function() {
			debugger
		});	

}

module.exports = new API();