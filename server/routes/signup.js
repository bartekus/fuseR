var express = require('express');
var rdb = require('../lib/rethink');
var auth = require('../lib/auth');
var token = require('../lib/token');
var router = express.Router();

router.post('/', function (request, response, next) {
    rdb.findBy('users', 'email', request.body.email)
    .then(function (user) {
        user = user[0];
        var newUser = {};

        if(!user) {
          auth.hash_password(request.body.password)
          .then(function (hash) {
              var newUser = {
                  name: request.body.name,
                  email: request.body.email,
                  password: hash
              };

              rdb.save('users', newUser)
              .then(function (result) {
                  response.json(result);
              });
          });
        } else if (user) {
          var userNotFoundError = new Error('User already exists');
          userAlreadyExistsError.status = 404;
          return next(userAlreadyExistsError);
        }
    });
});

module.exports = router;
