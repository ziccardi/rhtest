var config = require('./config.js');
var getMethods = require('./get.js');
var postMethods = require('./post.js');
var deleteMethods = require('./delete.js');
var putMethods = require('./put.js');
var express = require('express');
var http = express();
var bodyParser = require('body-parser');


/**
 * Returns the list of users that corresponds to the filter
 * passed through the request parameter 'filter'
 * 
 * If multiple filter are passed, they are combined as 'AND'.
 * 
 * @param req the request
 * @param res the response
 * @returns 
 */
function getUsersRest(req, response) {
	//var filter = req.query.filter;
	
	getMethods.getUsers(req.query, function(result) {
		response.status(200).json(result);
		return;
	},
	 function() {
		response.status(500).send('Error\n');
		return;
	})
	;
	
}

/**
 * Adds the user passed through the PUT method to the JSON file.
 * 
 * @param req the request
 * @param res the response
 * @returns
 */
function addUserRest(req, res) {
	var jsonUser = req.body.user;
	
	postMethods.addUser(JSON.parse(jsonUser),function() {
		res.writeHead(200, {
			'Content-Type' : 'application/json'
		});
		res.end(JSON.stringify({'outcome': 'success'})+'\n');
	});
}

/**
 * Deletes all the users that corresponds to the passed in filter.
 * 
 * If multiple filter are passed, they are combined as 'AND'.
 * 
 * @param req request
 * @param res response
 * @returns
 */
function deleteUserRest(req, res) {
	var filter = req.body;
	
	deleteMethods.deleteUsers(function() {
		res.writeHead(200, {
			'Content-Type' : 'application/json'
		});
		res.end(JSON.stringify({'outcome': 'success'})+'\n');
	}, filter);
}

function editUserRest(req, res) {
	var filter = req.body;
	var newUser = req.body.user;
	
	delete filter.user;
	
	putMethods.updateUser(filter, JSON.parse(newUser), function() {
		res.json({'outcome': 'success'});
	}, function(msg) {
		res.json({'outcome' : 'fail', 'message' : msg});
	});
}

http.use( bodyParser.json() );       // to support JSON-encoded bodies
http.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

http.get('/users', getUsersRest);
http.put('/users', editUserRest); 
http.post('/users', addUserRest); 
http.delete('/users', deleteUserRest);

var server = http.listen(config.port, config.ip, function() {

	var host = server.address().address;
	var port = server.address().port;
	console.log("Server running at http://%s:%s", host, port);

});
