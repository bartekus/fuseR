var col1 ="#644749";
var col2 ="#b1695a";
var col3 ="#db9864";
var col4 ="#e3bb88";

var	tabs = [
	{
		ypos: 0.5,
		bgcolor: col1,
		suncolor: col3, sunopacity: 0,
		mooncolor: col2, moonopacity: 1,
		cloudcolor: col3, cloudopacity: 1,
		dropletOpacity: 0,
		snowflakeOpacity: 1, snowflakeColor: col3,
		runDroplets: false,
		runSnowflakes: true,

		TOD: "NIGHT",
		Temp: "-4°",
		Summary: "Cloudy",
		Wind: "Wind: E 7 mph",
		Humidity: "Humidity: 50%"
	},{
		ypos: 0.3334,
		bgcolor: col2,
		suncolor: col1, sunopacity: 1,
		mooncolor: col1, moonopacity: 0,
		cloudcolor: col4, cloudopacity: 1,
		dropletcolor: col4, dropletOpacity: 1,
		runDroplets: true,
		runSnowflakes: false,
		snowflakeOpacity: 0,

		TOD: "EVENING",
		Temp: "0°",
		Summary: "Rain",
		Wind: "Wind: W 12 mph",
		Humidity: "Humidity: 91%"
	}, {
		ypos: 0.1667,
		bgcolor: col3,
		suncolor: col2, sunopacity: 1,
		mooncolor: col1, moonopacity: 0,
		cloudcolor: col1, cloudopacity: 1,
		dropletOpacity: 0,
		runDroplets: false,
		runSnowflakes: false,
		snowflakeOpacity: 0,

		TOD: "DAY",
		Temp: "+5°",
		Summary: "Cloudy",
		Wind: "Wind: N 5 mph",
		Humidity: "Humidity: 80%"
	}, {
		ypos: 0,
		bgcolor: col4,
		suncolor: col3, sunopacity: 1,
		mooncolor: col1, moonopacity: 0,
		cloudcolor: col2, cloudopacity: 0,
		dropletOpacity: 0,
		runDroplets: false,
		runSnowflakes: false,
		snowflakeOpacity: 0,

		TOD: "MORNING",
		Temp: "-4°",
		Summary: "Sunny",
		Wind: "Wind: E 3 mph",
		Humidity: "Humidity: 50%"
	}
];

var droplets = [
	{ offset: 0 },
	{ offset: 0.2 },
	{ offset: 0.4 },
	{ offset: 0.6 },
	{ offset: 0.8 }
];

module.exports = {
	tabs: tabs,
	droplets: droplets
};
