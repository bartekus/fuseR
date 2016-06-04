var auth = require('../lib/auth');
var token = require('../lib/token');

var rdb = require('rethinkdb');
var dbConfig = require('../config/database');

var userObject = {
  email: 'admin@email.com',
  password: 'password'
}

var connection = rdb.connect(dbConfig)
.then(function (connection) {

    var findBy = function (tableName, fieldName, value) {
        return rdb.table(tableName).filter(rdb.row(fieldName).eq(value)).run(connection)
        .then(function (cursor) {
            return cursor.toArray();
        });
    };

    findBy('users', 'email', userObject.email)
    .then(function (user) {
        user = user[0];

        if(!user) {
            var userNotFoundError = new Error('User not found');
            userNotFoundError.status = 404;
            console.log(userNotFoundError);
        }

        auth.authenticate(userObject.password, user.password)
        .then(function (authenticated) {
            if(authenticated) {
                var currentUser = {
                    name: user.name,
                    email: user.email,
                    token: token.generate(user)
                };
                console.log(currentUser);
                process.exit();
            } else {
                var authenticationFailedError = new Error('Authentication failed');
                authenticationFailedError.status = 401;
                console.log(authenticationFailedError);
            }
        });
    });

});
