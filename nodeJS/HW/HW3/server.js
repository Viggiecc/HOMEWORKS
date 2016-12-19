var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'angularjs')));

app.get("/users", function(req, res) {

	var users = getAllUsers();
	res.json(users);
});

var userArray = [
	    {id:1, fName:'Hege', lName:"Pege", title:"Manager", sex:"Male", age:"100"},
	    {id:2, fName:'Kim', lName:"Pim", title:"Senior Engineer", sex:"Male", age:"994" },
	    {id:3, fName:'Sal', lName:"Smith", title:"Junior Engineer", sex:"Male", age:"24" },
	    {id:4, fName:'Jack', lName:"Jones", title:"Product Manager", sex:"Male", age:"33" },
	    {id:5, fName:'John', lName:"Doe", title:"UI Designer", sex:"Male", age:"26" },
	    {id:6, fName:'Peter', lName:"Pan", title:"UX Designer", sex:"Male", age:"28"}
  	];  

var getAllUsers = function() {
// 	var userArray = [
// 	    {id:1, fName:'Hege', lName:"Pege", title:"Manager", sex:"Male", age:"100"},
// 	    {id:2, fName:'Kim', lName:"Pim", title:"Senior Engineer", sex:"Male", age:"994" },
// 	    {id:3, fName:'Sal', lName:"Smith", title:"Junior Engineer", sex:"Male", age:"24" },
// 	    {id:4, fName:'Jack', lName:"Jones", title:"Product Manager", sex:"Male", age:"33" },
// 	    {id:5, fName:'John', lName:"Doe", title:"UI Designer", sex:"Male", age:"26" },
// 	    {id:6, fName:'Peter', lName:"Pan", title:"UX Designer", sex:"Male", age:"28"}
//   	];  
  	return userArray;	
}

console.log("This is homework 3");

app.listen(3000);