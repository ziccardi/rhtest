var fs = require('fs');
var config = require('./config.js');
var get = require('./get.js');
var del = require('./delete.js');
var post = require('./post.js');

module.exports.updateUser = function updateUser(filter, newUser, doneFunction, errorFunction) {

	if (!filter || !newUser) {
		doneFunction();
		return;
	}

	del.deleteUsers(function() {
		post.addUser(newUser, doneFunction);
	}, filter)
};