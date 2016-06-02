var Observable = require("FuseJS/Observable");

var username = Observable("");
var password = Observable("");

var areCredentialsValid = Observable(function() {
  return username.value != "" && password.value != "";
});

function signup_clicked()
{
  router.goto("settings");
}

function login_clicked()
{
    // TODO: validate login credentials
    router.goto("home");
}

module.exports = {
  signup_clicked: signup_clicked,
  login_clicked: login_clicked,
  username: username,
  password: password,
  areCredentialsValid: areCredentialsValid
};
