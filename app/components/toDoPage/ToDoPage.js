var Observable = require("FuseJS/Observable");


function Task(title){
	var self = this;
	this.title = title;
	this.checked = Observable(false);
	this.hidden = Observable(function(){
		if (currentTab.value == "all"){
			return false;
		}
		else if (currentTab.value == "active"){
			return self.checked.value ? true : false;
		}
		else {
			return self.checked.value ? false : true;
		}
	});
}

var todoList = Observable();
var titleInput = Observable("");
var currentTab = Observable("all");

var remainingCount = todoList.count(function(x){
	return x.checked.not();
});

var remainingText = remainingCount.map(function(x){
	return x + " " + ((x == 1) ? "task" : "tasks") + " remaining";
});

var canClearCompleted = todoList.count(function(x){
	return x.checked;
}).map(function(x){
	return x > 0;
});

function addItem(arg) {
	todoList.add(new Task(titleInput.value));
}

function deleteItem(arg){
	todoList.tryRemove(arg.data);
}

function toggleAll(arg) {
	var remaining = remainingCount.value;
	todoList.forEach(function(x){
		x.checked.value = (remaining == 0) ? false : true;
	});
}

function toggleItem(arg) {
	arg.data.checked.value = !arg.data.checked.value;
}

function clearCompleted() {
	todoList.removeWhere(function(x) { return x.checked.value; });
}

function showAll() {
	currentTab.value = "all";
}

function showActive() {
	currentTab.value = "active";
}

function showCompleted() {
	currentTab.value = "completed";
}

module.exports = {
	todoList: todoList,
	titleInput: titleInput,
	currentTab: currentTab,
	remainingText: remainingText,
	canClearCompleted: canClearCompleted,
	addItem: addItem,
	deleteItem: deleteItem,
	toggleAll: toggleAll,
	toggleItem: toggleItem,
	clearCompleted: clearCompleted,
	showAll: showAll,
	showActive: showActive,
	showCompleted: showCompleted
};
