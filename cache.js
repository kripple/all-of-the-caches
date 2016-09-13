var THIRTY_MINUTES 	= (60*30*1000);
var CacheItem 			= require('./cacheItem.js');
var util 						= require('util');

var Cache = function() {
	this.cache = {};
	this.ttl = THIRTY_MINUTES;
	this.size = 10;
}

Cache.prototype.get = function(opts, retrieveData) {
	var url = opts.url;
	var cacheItem = this.cache[url];
	if(cacheItem) {
		return Promise.resolve(cacheItem.getData());
	} else {
		return retrieveData(opts)
			.bind(this)
			.then(function(data) {
				return this.put(url,data);
			})
			.catch(function(err) {
				util.error(err);
			})
			.bind();
	}
};

Cache.prototype.put = function(key, promise) {
	// manageSize(this);
	setExpiration(key, this);
	var newCacheItem = CacheItem.create(data);
	this.cache[key] = newCacheItem;
	return newCacheItem.getData();
};

Cache.prototype.delete = function(key) {
	this.cache[key] = undefined;
};

function setExpiration(key, cache) {
	setTimeout(cache.delete(key), cache.ttl);
}

// Cache.prototype.evictLRU = function() {
// 	var lru = undefined;
// 	var lruKey = undefined;

// 	foreach(this, function(cacheItem, key) {
// 		if(lru === undefined) {
// 			lru = cacheItem;
// 			lruKey = key;
// 		} else if(lru.lastUsed > cacheItem.lastUsed) {
// 			lru = cacheItem;
// 			lruKey = key;
// 		}
// 	});
// 	this[lruKey] = undefined;
// };

// Cache.prototype.evictLFU = function() {
	
// };

// function manageSize(cache) {
// 	var count = Objects.keys(cache.cache).length;
// 	if(count > cache.size) {
// 		cache.evictLRU();
// 		// cache.evictLFU();
// 	}
// };

module.exports = new Cache();



