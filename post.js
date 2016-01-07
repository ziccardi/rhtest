var fs = require('fs');
var config = require('./config.js');
var get = require('./get.js');

/**
 * Adds a new user at the end of the list.
 * No checks against duplicated are done.
 * 
 * This method is fairly inefficient, since it loads the whole list
 * in memory, adds the new element and then saves again the list.
 */
module.exports.addUser = function addUser(user, doneFunction) {

	if (!user) {
		doneFunction();
		return;
	}
	
	get.getUsers(undefined, function(users) {
		if (user) {
			users.results.push({'user': user.user});
			var fs = require('fs');
			fs.writeFile(config.jsonFile, JSON.stringify(users)); 
			doneFunction();
		}
	});
};