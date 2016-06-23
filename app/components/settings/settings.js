var state = require("store/state.js")

exports.logout = function(e) {
  state.logout()
  router.goto("login");
}
exports.loginUser = state.loginUser
