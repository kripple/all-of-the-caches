var winston = require('winston');

function formatMessage(args) {
	var now = new Date();
	var timestamp = [
			(now.getMonth()+1),'/',now.getDate(),' ',
			now.getHours(),':',now.getMinutes(),':',now.getSeconds()
		].join('');
	var log = [args.label,' ',args.level,': ',args.message,' ',timestamp].join('');
	return log;
}

function getLineNumber() {
	var originalError = Error.prepareStackTrace;
	Error.prepareStackTrace = function(_, stack){ return stack; };
	var error = new Error;
	Error.captureStackTrace(error, arguments.callee);
	var stack = error.stack;
	Error.prepareStackTrace = originalError;
	return stack[1].getLineNumber();
}

function getLogger(name) {
  return new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
      	label: name,
      	timestamp: true,
    		handleExceptions: true,
    		humanReadableUnhandledException: true,
    		colorize: true,
    		// formatter: function(args) { return formatMessage(args); }
    	})
    ]
  });
};

exports.getLogger 		= getLogger;
exports.getLineNumber = getLineNumber;


















