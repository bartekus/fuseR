var Observable = require("FuseJS/Observable")
var channels = require("store/channels.js")

exports.view = function(e) {
	router.push("home", {}, "channels", {}, "view", e.data.name )
}

exports.channels = channels.channels
