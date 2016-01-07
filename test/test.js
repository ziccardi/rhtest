var config = require('../config.js');
var get = require('../get.js');
var put = require('../put.js');
var del = require('../delete.js');

config.jsonFile = './test/testUsers.json';
var assert = require('assert');

var fs = require('fs');

fs.createReadStream('./test/testUsers-orig.json').pipe(fs.createWriteStream(config.jsonFile));

describe('GET', function() {
	describe('#getUsers(ALL)', function() {
		it('should return 100 users', function(done) {
			get.getUsers(undefined, function(users) {
				assert.equal(100, users.results.length);
				done();

			}, function(error) {
				//assert.fail("fail");
				throw new Error();
			});
		});
	}),
	describe('#getUsers(MALE)', function() {
		it('should return 51 users', function(done) {
			get.getUsers({'user.gender' : 'male'}, function(users) {
				assert.equal(51, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#getUsers(FEMALE)', function() {
		it('should return 49 users', function(done) {
			get.getUsers({'user.gender' : 'female'}, function(users) {
				assert.equal(49, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#getUsers(stanley beck)', function() {
		it('should return 1 user', function(done) {
			get.getUsers({'user.name.first' : 'stanley', 'user.name.last':'beck'}, function(users) {
				assert.equal(1, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#getUsers(lastname: kelly)', function() {
		it('should return 2 user', function(done) {
			get.getUsers({'user.name.last' : 'kelly'}, function(users) {
				assert.equal(2, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#addUser(name: user1, lastname: user1)', function() {
		
		it('should return outcome success', function(done) {
			
			var user1 = require('./user1.json');
			
			put.addUser(user1, function() {
				done();
			})
		});
	}),
	describe('#getUsers(name: user1, lastname: user1)', function() {
		
		it('should return 1 user', function(done) {
			
			get.getUsers({'user.name.last' : 'user1'}, function(users) {
				assert.equal(1, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#getUsers(user.gender=male - after insert)', function() {
		
		it('should return 52 user', function(done) {
			
			get.getUsers({'user.gender' : 'male'}, function(users) {
				assert.equal(52, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#addUser(name: user2, lastname: user2)', function() {
		
		it('should return outcome success', function(done) {
			
			var user2 = require('./user2.json');
			
			put.addUser(user2, function() {
				done();
			})
		});
	}),
	describe('#addUser(undefined)', function() {
		
		it('should return outcome success', function(done) {
			
			put.addUser(undefined, function() {
				done();
			})
		});
	}),
	describe('#getUsers(user.gender=male - after insert)', function() {
		
		it('should return 53 user', function(done) {
			
			get.getUsers({'user.gender' : 'male'}, function(users) {
				assert.equal(53, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#deleteUser(name: user1, lastname: user1)', function() {
		
		it('should return success', function(done) {
			del.deleteUsers(function() {
				done();
			}, {'user.name.last' : 'user1'});
		});
	}),
	describe('#deleteUser(name: user2, lastname: user2)', function() {
		
		it('should return success', function(done) {
			del.deleteUsers(function() {
				done();
			}, {'user.name.last' : 'user2'});
		});
	}),
	describe('#getUsers(user.name.first=user1 - after delete)', function() {
		
		it('should return 0 user', function(done) {
			
			get.getUsers({'user.name.first' : 'user1'}, function(users) {
				assert.equal(0, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#deleteUser(user.name.last=kelly)', function() {
		
		it('should return success', function(done) {
			del.deleteUsers(function() {
				done();
			}, {'user.name.last' : 'kelly'});
		});
	}),
	describe('#getUsers(ALL)', function() {
		
		it('should return 98 user', function(done) {
			
			get.getUsers(undefined, function(users) {
				assert.equal(98, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#deleteUser(user.gender=male)', function() {
		
		it('should return success', function(done) {
			del.deleteUsers(function() {
				done();
			}, {'user.gender' : 'male'});
		});
	}),
	describe('#getUsers(ALL)', function() {
		
		it('should return 49 users', function(done) {
			
			get.getUsers(undefined, function(users) {
				assert.equal(49, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#getUsers(INVALID FILTER)', function() {
		
		it('should return 49 users', function(done) {
			
			get.getUsers({'invalid.field' : 'useless'}, function(users) {
				assert.equal(49, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	}),
	describe('#getUsers(INVALID FILTER - LAST PART)', function() {
		
		it('should return 49 users', function(done) {
			
			get.getUsers({'user.invalid' : 'useless'}, function(users) {
				assert.equal(49, users.results.length);
				done();

			}, function(error) {
				throw new Error();
			});
		});
	})
});