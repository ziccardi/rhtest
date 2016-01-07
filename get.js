/**
 * 
 */
var oboe = require('oboe');
var fs = require('fs');
var config = require('./config.js');

var events = require('events');

function accept(obj, path, value) {
	for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
		obj = obj[path[i]];
		if (!obj) {
			// invalid filter. Ignoring.
			return true;
		}
	}

	return obj === value;
}

function acceptWithPath(obj, filters) {

	if (!filters) {
		// No filters has been specified. Accepting everything.
		return true;
	}

	for ( var key in filters) {
		if (filters.hasOwnProperty(key)) {
			var value = filters[key];
			if (!accept(obj, key, value)) {
				return false;
			}
		}
	}
	return true;
}

/**
 * Returns the list of users corresponding to the received filter. The filter
 * must follows this syntax:
 * 
 * /users?key=value&key1=value1...
 * 
 * An example of filter on multiple field would be:
 * 
 * /users?user.gender=female&user.name.last=willis
 * 
 * The filter is CASE SENSITIVE.
 */
module.exports.getUsers = function getUsers(filter, doneCallback, failCallback,
		negate) {

	var results = [];

	var readStream = fs.createReadStream(config.jsonFile);

	oboe(readStream).node('results.*', function(userData) {

		var accepted = acceptWithPath(userData, filter);
		if (negate) {
			accepted = !accepted;
		}

		if (!accepted) {
			return;
		}

		results.push(userData);
	}).done(function() {
		var resultsValue = {
			'results' : results
		};
		if (doneCallback) {
			doneCallback(resultsValue);
		}

		return;
	}).fail(function(errorReport) {
		console.log('Error: ', errorReport.thrown, errorReport.thrown.stack);
		if (failCallback) {
			failCallback(errorReport);
		}

		return;
	});
};