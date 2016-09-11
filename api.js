var prequest = require('prequest');

var API = function() {
	this.root = '';
	this.testURLs = {
		1: '',
		2: '',
		3: ''
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