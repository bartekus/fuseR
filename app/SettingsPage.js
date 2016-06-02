var Observable = require("FuseJS/Observable");

var pictures = Observable();
var errorMessage = Observable();

fetch("http://jsonplaceholder.typicode.com/photos")
  .then(function(result) {
    if (result.status !== 200) {
      debug_log("Something went wrong, status code: " + result.status);
      errorMessage.value = "Oh noes! :(";
      return;
    }

    //throw "Some error";

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

module.exports = {
  pictures: pictures,
  errorMessage: errorMessage,
};
