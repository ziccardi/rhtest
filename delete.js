/**
 * 
 */
var fs = require('fs');
var config = require('./config.js');
var get = require('./get.js');

module.exports.deleteUsers = function deleteUsers(doneFunction, filter) {
	get.getUsers(filter, function(users) {
		var fs = require('fs');
		fs.writeFile(config.jsonFile, JSON.stringify(users)); 
		doneFunction();
	}, undefined, true);
};