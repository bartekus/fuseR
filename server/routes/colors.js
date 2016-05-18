var express = require('express');
var rdb = require('../lib/rethink');
var router = express.Router();

router.get('/', function (request, response) {
  rdb.findAll('colors')
  .then(function (colors) {
      response.json(colors);
  });
});

module.exports = router;
