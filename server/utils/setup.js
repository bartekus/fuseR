var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var rdb = require('../lib/rethink');
var token = require('../lib/token');

var hash_password = function (password) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, function (error, salt) {
            if(error) return reject(error);
            console.log('Now creating a hash...');

            bcrypt.hash(password, salt, function (error, hash) {
                if(error) return reject(error);
                console.log(hash);
                return resolve(hash);
            });
        });
    });
};

var createAdmin = function () {
  console.log("Creating an Admin");
    hash_password('password')
    .then(function (hash) {
        var newUser = {
            name: 'admin',
            email: 'admin@email.com',
            password: hash
        };

        rdb.save('users', newUser)
        .then(function (result) {
            console.log(result);
            process.exit();
        });

    });
}

createAdmin();
