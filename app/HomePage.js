function settings_clicked()
{
    // TODO: validate login credentials

    router.push("settings");
}

var Observable = require("FuseJS/Observable");

var data = Observable();

fetch('http://az664292.vo.msecnd.net/files/P6FteBeij9A7jTXL-edgenavresponse.json')
.then(function(response) { return response.json(); })
.then(function(responseObject) { data.value = responseObject; });


module.exports = {
  settings_clicked: settings_clicked,
  data: data
};
