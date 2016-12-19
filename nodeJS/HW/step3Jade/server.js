/*
 * Module dependencies
 */
var express = require('express');

var pub = __dirname;

var app = express();
app.use(express.static(pub));

//set our default template engine to "jade"

app.set("view engine", 'jade');

app.get('/matrix/:dimension', function(req, res) {
	var dimension = req.params.dimension;
	res.render('index', { dim: dimension});
});

app.listen(3030);
console.log("This is step 3 using jade");

