var Observable = require("FuseJS/Observable");

function endLoading(){
	isLoading.value = false;
}

function reloadHandler(){
	isLoading.value = true;
	setTimeout(endLoading, 3000);
}

var isLoading = Observable(false);

module.exports = {
	isLoading: isLoading,
	reloadHandler: reloadHandler
};
