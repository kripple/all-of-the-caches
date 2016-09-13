var CacheItem = function(item) {
	this.data = item;
	this.lastUsed = getTimestamp();
}

CacheItem.prototype.getData = function() {
	this.lastUsed = getTimestamp();
	return this.data;
}

// CacheItem.prototype.setData = function(data) {
// 	this.lastUsed = getTimestamp();
// 	this.data = data;
// 	return this.data;
// }

function create(item) {
	return new CacheItem(item);
}

function getTimestamp() {
	return new Date().getTime();
}

exports.create = create;