var THIRTY_MINUTES 	= (60*30*1000);
var CacheItem 			= require('./cacheItem.js');
var winston 				= require('winston');

// var logger = new (winston.Logger)({
//     transports: [
//       new (winston.transports.Console)({
//       	timestamp: true,
//     		exitOnError: true,
//     		handleExceptions: true,
//     		humanReadableUnhandledException: true,
//     		colorize: true
//     	})
//     ]
//   });
var Logger = require('./logger.js');
var logger = Logger.getLogger('cache');
// var getLine = Logger.getLineNumber();

var Cache = function() {
	this.cache = {};
	this.ttl = THIRTY_MINUTES;
	this.size = 10;
}

Cache.prototype.get = function(opts, retrieveData) {
	var url = opts.url;
	var cacheItem = this.cache[url];
	
	logger.info('Cache recieved API request for data.');

	if(cacheItem) {
		logger.info('Requested item is contained in cache, cache is returning cached item.');
		logger.info('Cache is returning %s', cacheItem.getData());

		return Promise.resolve(cacheItem.getData());
	} else {
		logger.info('Requested item is not contained in cache, cache is retrieving data.')
		return retrieveData(opts)
			.bind(this)
			.then(function(data) {
				logger.info('Cache successfully retrieved data and is storing it in cache.');
				logger.info('Cache is storing %s in cache.', data.toString());
				return this.put(url,data);
			})
			.catch(function(err) {
				logger.error('API cache was unable to retrieve data.');
				// throw new Error('API cache was unable to retrieve data.');
			})
			.bind();
	}
};

Cache.prototype.put = function(key, data) {
	// manageSize(this);
	setExpiration(key, this);
	var newCacheItem = CacheItem.create(data);
	this.cache[key] = newCacheItem;
	return newCacheItem.getData();
};

Cache.prototype.delete = function(key) {
	logger.info('Cache is deleting an item.');
	logger.info('Cache is deleting %s', this.cache[key].toString());
	this.cache[key] = undefined;
};

function setExpiration(key, cache) {
	logger.info('Cache is setting an item to expire in %s minutes.', (cache.ttl/60/1000).toString());
	setTimeout(function() { cache.delete(key); }, cache.ttl);
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



