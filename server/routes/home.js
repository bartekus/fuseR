var express = require('express');
var rdb = require('../lib/rethink');
var router = express.Router();

router.get('/', function (request, response) {
    response.json({ message: 'hooray! welcome to our api!' });
});

module.exports = router;
