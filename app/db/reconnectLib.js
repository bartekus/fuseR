var EventEmitter = require('events').EventEmitter
var backoff = require('backoff')
var inherits = require('inherits')

module.exports = Reconnect

function Reconnect(r, opts) {
	var self = this
	if (!(this instanceof Reconnect)) return new Reconnect(r, opts)

	this.backoff = (backoff[opts.type] || backoff.fibonacci)({
		randomisationFactor: 0,
		initialDelay: opts.initialDelay || 10,
		maxDelay: opts.maxDelay || 1000
	})

	opts.failAfter && this.backoff.failAfter(opts.failAfter)

	this.conn = null
	this.reconnect = true

	this.backoff.on('ready', function(number, delay) {
		if (!self.reconnect) return
		self.emit('reconnect', number, delay)
		_connect(this.cb)
	})

	this.backoff.on('backoff', function (number, delay) {
		self.emit('backoff', number, delay)
	})

	this.backoff.on('fail', function(){
		self.reconnect = false
		self.emit('_cleanup')
		self.emit('fail')
	})

	this.on('_cleanup', function(err){
		this.conn && this.conn.removeAllListeners()
		this.emit('disconnect', err)
		this.backoff.backoff()
	})

	function _connect() {
		r.connect(opts, function(err, conn) {
		  if (err) return self.emit('_cleanup', err)
		  conn.on('error', self.emit.bind(self, '_cleanup', err))
		  conn.on('close', self.emit.bind(self, '_cleanup'))
		  self.conn = conn
		  self.emit('connect', conn)
		  self.backoff.reset()
		  self.cb && self.cb(conn)
		})
	}
}

Reconnect.prototype.connect = function(cb) {
	this.reconnect = true
	this.cb = cb || null
	this.backoff.backoff()
}

Reconnect.prototype.disconnect = function() {
	this.reconnect = false
	this.backoff.reset()
	this.conn && this.conn.close()
}

inherits(Reconnect, require('events').EventEmitter)
