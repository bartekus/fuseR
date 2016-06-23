var Observable = require("FuseJS/Observable")
var channels = require("store/channels.js")
exports.channel = Observable()

channelView.onParameterChanged( function(param) {
  exports.channel.value = {}
  channels.lookupChannel(param, function(channel) {
    exports.channel.value = channel
  })
})

exports.goChat = function(args) {
  router.push( "chat",  args.data )
}
