var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
require('dotenv').load();

var home = require('./routes/home');
var users = require('./routes/users');
var login = require('./routes/login');
var colors = require('./routes/colors');

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.use('/', home);
app.use('/colors', colors);
app.use('/login', login);
app.use('/users', users);

app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});

var server = app.listen(3333, function () {
  var host = 'localhost'
  if (server.domain !== null) host = server.domain;
  var port = server.address().port;

  console.log('Server is listening on http://%s:%s', host, port);
});
