var CacheItem = require('./cacheItem.js');

var THIRTY_MINUTES = (60*30*1000);

var Cache = function() {
	this.cache = {};
	this.ttl = THIRTY_MINUTES;
	this.size = 10;
}

Cache.prototype.get = function(opts, selfLoadingFunc) {
	var url = opts.url;
	if(!this.cache[url]) {
		this.put(url, selfLoadingFunc(opts));
	}
	return this.cache[url].getData();
};

Cache.prototype.put = function(key, value) {
	// manageCacheSize(cache);
	setTimeout(this.delete(key), this.ttl);
	this.cache[key] = CacheItem.create(value); 
};

Cache.prototype.delete = function(key) {
	this.cache[key] = undefined;
};

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

// function manageCacheSize(cache) {
// 	var count = Objects.keys(cache.cache).length;
// 	if(count > cache.size) {
// 		cache.evictLRU();
// 		// cache.evictLFU();
// 	}
// };

module.exports = new Cache();



