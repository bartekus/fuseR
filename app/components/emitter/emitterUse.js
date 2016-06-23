'use strict';

var _changeEmitter = require('change-emitter');

var emitter = (0, _changeEmitter.createChangeEmitter)();

// Called `listen` instead of `subscribe` to avoid confusion with observable spec
var unlisten = emitter.listen(function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  console.log(args);
});
