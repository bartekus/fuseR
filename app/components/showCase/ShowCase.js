var Observable = require('FuseJS/Observable');

function Page(name, image, long, lat, location, no, stars, people){
	this.name = name;
	this.image = image;
	this.long = "EAST LNG " + long;
	this.lat = "NORTH LAT " + lat;
	this.location = location;
	this.no = "NO. " + no;
	this.stars = stars;
	this.starsRest = 5 - stars;
	this.people = people;
}

var pages = Observable();

pages.add(new Page("CANADA", "Canada", 56, -108, "A silver lake in the north of Canada.", 10238, 3, ["Jamie", "Marcus", "John"]));
pages.add(new Page("ICELAND", "Iceland", 64, -18, "The rocky landscape of Iceland.", 10239, 4, ["Jake", "Natalie", "Fred"]));
pages.add(new Page("NORWAY", "Norway", 60, 6, "Green mountain forest in Norway.", 10241, 4, ["Tony", "Marie", "Kristina"]));
pages.add(new Page("TAIWAN", "Taiwan", 23, 120, "Dusk over the fields of Taiwan.", 10241, 3, ["Alec", "Natalie", "John", "Fred"]));
pages.add(new Page("THAILAND", "Thailand", 15, 102, "A white silky beach in Thailand.", 10241, 4, ["Jake", "Jamie"]));
pages.add(new Page("TURKEY", "Turkey", 40, 34, "Turkish house with a mountain view.", 10241, 3, ["Tony", "Natalie", "Jake", "John"]));


var pagesView = pages.map(function(item, index){
	return {
		item: item,
		index: index
	};
});

module.exports = {
	pagesView: pagesView
};
