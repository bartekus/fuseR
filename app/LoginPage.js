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
  get("http://localhost:3333/login")
    .then(function(result) {
      if (result.status !== 200) {
        debug_log("Something went wrong, status code: " + result.status);
        errorMessage.value = "Oh noes! :(";
        return;
      }

      return result.json();
    }).then(function(data) {
      debug_log("Success!");

      for (var i = 0; i < 10; i++) {
        var item = data[i];
        pictures.add(item);
      }
    }).catch(function(error) {
      debug_log("Fetch error " + error);
      errorMessage.value = "Oh noes! :(";
    });



    router.goto("home");
}

module.exports = {
  signup_clicked: signup_clicked,
  login_clicked: login_clicked,
  username: username,
  password: password,
  areCredentialsValid: areCredentialsValid
};
