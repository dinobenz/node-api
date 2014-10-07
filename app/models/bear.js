// app/models/bear.js

var bears = [{ id: 1, name: "dumbo 1" }, { id: 2, name: "dumbo 2" }, { id: 3, name: "dumbo 3" }];

exports.getAll = function () {
	return bears;
}

exports.get = function (id) {
	var bear = null;
	for (var i = 0; i < bears.length; i++) {
		if (bears[i].id == id) {
			bear = bears[i];
			break;
		}
	}
	return bear;
}

exports.update = function (value) {
	var bear = this.get(value.id);
	bear.name = value.name;
}

exports.delete = function (id) {
	var bear = this.get(id);
	var index = bears.indexOf(bear);
	bears.splice(index, 1);
}