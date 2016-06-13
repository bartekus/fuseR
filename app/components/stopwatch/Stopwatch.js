var Observable = require("FuseJS/Observable");
var Stopwatch = require("Stopwatch");

var laps = Observable();
var running = Observable(false);
var timeString = Observable("");

function updateTimeString(){
	function pad(d) {
 		return (d < 10) ? '0' + d.toString() : d.toString();
 	}

	var seconds = Stopwatch.GetSeconds();
	var millis = seconds * 1000;

	mins = Math.floor(seconds / 60);
	secs = Math.floor(seconds) % 60,
 	hundredths = Math.floor((millis % 10e2) / 10);
 	timeString.value =  pad(mins) + ":" + pad(secs) + ":" + pad(hundredths);
}

function updateTimeStringLoop(){
	updateTimeString();
	setTimeout(updateTimeStringLoop, 10);
}

updateTimeStringLoop();

function addLapOrReset(){
	if (running.value){
		if (Stopwatch.GetSeconds() > 0)
			laps.insertAt(0, {
				title:("Lap " + (laps.length + 1)),
				time: timeString.value
			});
	} else {
		Stopwatch.Stop();
		laps.clear();
		updateTimeString();
	}
}

function removeLap(arg){
	laps.tryRemove(arg.data);
}

function stopStart(){
	running.value = !running.value;
	if (running.value){
		Stopwatch.Start();
	} else {
		Stopwatch.Pause();
	}

}

module.exports = {
	timeString: timeString,
	laps: laps,
	addLapOrReset: addLapOrReset,
	removeLap: removeLap,
	stopStart: stopStart,
	running: running
};
