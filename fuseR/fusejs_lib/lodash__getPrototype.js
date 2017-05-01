'use strict';

var overArg = require('fusejs_lib/lodash__overArg.js');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;