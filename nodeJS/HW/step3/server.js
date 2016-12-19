var express = require('express');
var path = require('path');


var app = express();

// app.use(express.static(path.join(__dirname, '/www')));

app.get("/matrix/:dimension", function(req, res) {

	var dimension = req.params.dimension;
	var matrix = spiralMatrix(dimension);

	var body =
	"<!DOCTYPE html><html lang='en'><head></head><body><h1>Spiral A Matrix</h1>";
	for(var i = 0; i < dimension; i++) {
		body += "<div> [" + matrix[i] + "]</div><br>";
	}
	body += "</body></html>";
	
	res.send(body);
});

var spiralMatrix = function(n) {
	if (!n) {
		return null;
	}
	var matrix = [];
	for(var i = 0; i < n ; i++) {
		matrix[i] = new Array(n);
	}
	var row = 0;
	var col = 0;
	var num = 1;
	// var originN = n;
	while (n > 0) {
		if (n == 1) {
			matrix[row][col] = num;
		}
		for (var i = 0; i < n - 1; i++) {
			matrix[row][col + i] = num++;
		}
		for (var i = 0; i < n - 1; i++) {
			matrix[row + i][col + n - 1] = num++;
		}
		for (var i = n - 1; i > 0; i--) {
			matrix[row + n - 1][col + i] = num++;
		}
		for (var i = n - 1; i > 0; i--) {
			matrix[row + i][col] = num++;
		}
		row++;
		col++;
		n = n - 2;
	}
	console.log(matrix);
	return matrix;
}

	
app.listen(3030);

console.log("This is Step 3");
