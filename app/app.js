
var Observable = require('FuseJS/Observable');

var state = require("store/state.js")
exports.loading = state.loading
exports.login = state.login

exports.goBack = function() {
  router.goBack()
}
exports.goChannels = function() {
  router.goto( "home", {}, "channels", {}, "list", {} )
  TheEdge.dismiss()
}
exports.goContacts = function() {
  router.goto( "home", {}, "contacts", {}, "list", {} )
  TheEdge.dismiss()
}
exports.goSettings = function() {
  router.goto( "home", {}, "settings", {} )
  TheEdge.dismiss()
}

exports.openLeftMenu = function() {
  console.log( "Goto LeftMenu" )
  TheEdge.open( "Left" )
}

exports.openRightMenu = function() {
  console.log( "Goto RightMenu" )
  TheEdge.open( "Right" )
}

//never true in this demo, but shows how to navigate to login if the user hasn't done so yet.
if (exports.login.value == false) {
  router.goto( "login", {} )
}
