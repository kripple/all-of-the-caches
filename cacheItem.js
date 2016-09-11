var CacheItem = function(item) {
	this.data = item;
	this.lastUsed = getTimestamp();
}

CacheItem.prototype.getData = function() {
	this.lastUsed = getTimestamp();
	return this.data;
}

function create(item) {
	return new CacheItem(item);
}

function getTimestamp() {
	return new Date().getTime();
}

exports.create = create;