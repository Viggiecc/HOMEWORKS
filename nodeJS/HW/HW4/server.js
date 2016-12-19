var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(path.join(__dirname, 'angularjs')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var users = [
	    {id:1, fName:'Hege', lName:"Pege", title:"Manager", sex:"Male", age:"10"},
	    {id:2, fName:'Kim', lName:"Pim", title:"Senior Engineer", sex:"Male", age:"994" },
	    {id:3, fName:'Sal', lName:"Smith", title:"Junior Engineer", sex:"Male", age:"24" },
	    {id:4, fName:'Jack', lName:"Jones", title:"Product Manager", sex:"Male", age:"33" },
	    {id:5, fName:'John', lName:"Doe", title:"UI Designer", sex:"Male", age:"26" },
	    {id:6, fName:'Peter', lName:"Pan", title:"UX Designer", sex:"Male", age:"28"}
  	]; 


app.get("/api/users", function(req, res) {
	var allUsers = getAllUsers();
	res.json(allUsers);
});

app.get("/api/user/:id", function(req, res) {
	var user = getUserById(req.params.id);
	if(!user) {
		res.statusCode = 404;
		res.send("Error 404: No user found");
	} else {
		res.json(user);
	}
});

app.post("/api/user", function(req, res) {
	console.log(req.body);
	if(!users[req.body.id-1]) {
		var newUser = {
			id: req.body.id,
			fName: req.body.fName,
			lName: req.body.lName,
			title: req.body.title,
			sex: req.body.sex,
			age: req.body.age
		}
		users.push(newUser);
		res.json("New user created!");
	} else {
		res.statusCode = 400;
		res.send("Please give a new id");
	}
	
});
app.put("/api/user/:id", function(req, res) {
	console.log(req.params.id);
	console.log(req.body);
	for(var i = 0; i < users.length; i++) {
		if(users[i].id == req.body.id && req.params.id == req.body.id) {
			var flag = true;
			updateUserById(req.params.id, req.body);
			res.json("User Updated");
		}
	}
	console.log(flag);
	if(!flag) {
		res.statusCode = 404;
		res.send("Error 404: No user found for update");
	}

});

app.delete("/api/user/:id", function(req, res) {

	var usersAfterDelete = deletUserById(req.params.id);
	if(!usersAfterDelete) {
		res.statusCode = 404;
		res.send("Error 404: No Existed User to be Deleted");
	} else {
		res.json(usersAfterDelete);
	}
});


var getAllUsers = function() {
	return users;
};

var getUserById = function(id) {
	var choosenUser = null;
	for(var i = 0; i < users.length; i++) {
		if(users[i].id == id) {
			choosenUser = users[i];
		}
	}
	return choosenUser;
};
 
var deletUserById = function(id) {
	var usersAfterDelete = null;
	for(var i = 0; i < users.length; i++) {
		if(users[i].id == id) {	
			users.splice(i, 1); 
			usersAfterDelete = users;
		}
	}
	console.log(usersAfterDelete);
	return usersAfterDelete;
}

var updateUserById = function(id, obj) {
	for (var i = 0; i < users.length; i++) {
		if (users[i].id == id) {
			if(obj.fName) 
				users[i].fName = obj.fName;
			if(obj.lName) 
				users[i].lName = obj.lName;
			if(obj.title) 
				users[i].title = obj.title;
			if(obj.sex) 
				users[i].sex = obj.sex;
			if(obj.age) 
				users[i].age = obj.age;
		}
	}
}

console.log("This is HW4");
app.listen(3000);
