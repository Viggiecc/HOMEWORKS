var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

// app.use(express.static(path.join(__dirname, 'angularjs')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var pool = mysql.createPool({
	host : 'dev1.valiantica.com',
  	user : 'dev1',
  	password: 'valiantica0515',
	database: 'test'
})

// connection.connect();

app.get("/api/users", function(req, res) {
	var selectAllQuery = 'select * from users_vickie';

	console.log(selectAllQuery);

	pool.query(selectAllQuery, function(err, rows, fields){
		if(err) throw err;
		res.json(rows);
	});	
});

app.get("/api/user/:id", function(req, res) {
	var selectUserByIdQuery = 'select * from users_vickie where id = ' + req.params.id;
	console.log(selectUserByIdQuery);
	pool.query(selectUserByIdQuery, function(err, rows, fields) {
		if(err) throw err;
		if(!rows[0]) {
			res.statusCode = 404;
			res.send("Error 404: No user found");
		}
		else {
			console.log(rows[0].id);
			res.json(rows[0]);
		}
	});
	
});

app.post("/api/user", function(req, res) {
	console.log(req.body);
	var user = {};
	user.fName = req.body.fName?"'"+req.body.fName+"'":"";
	user.lName = req.body.lName?"'"+req.body.lName+"'":"";
	user.title = req.body.title?"'"+req.body.title+"'":"";
	user.sex = req.body.sex?"'"+req.body.sex+"'":"";
	user.age = req.body.age?"'"+req.body.age+"'":"";

	var insertQuery = 
	'insert into users_vickie (fName, lName, title, sex, age) values (' + user.fName + ',' + user.lName + ',' + user.title + ',' + user.sex +',' + user.age + ')';
	console.log(insertQuery);

	pool.query(insertQuery, function(err, rows, fields) {
		if(err) throw err;
		res.json("User created");
		// connection.end();
	})
	
});

app.put("/api/user/:id", function(req, res) {
	var user = {};
	user.fName = req.body.fName?"'"+req.body.fName+"'":"";
	user.lName = req.body.lName?"'"+req.body.lName+"'":"";
	user.title = req.body.title?"'"+req.body.title+"'":"";
	user.sex = req.body.sex?"'"+req.body.sex+"'":"";
	user.age = req.body.age?"'"+req.body.age+"'":"";
	
	var selectUserByIdQuery = 'select * from users_vickie where id = ' + req.params.id;

	var updateQuery = 
	'update users_vickie set fName= ' + user.fName + ', lName= ' + user.lName + ', title= ' + user.title + ', sex= ' + user.sex + ', age= ' + user.age + ' where id= ' + req.params.id;
	pool.query(selectUserByIdQuery, function(err, rows, fields) {
		if (err) throw err;
		if (!rows[0]) {
			res.statusCode = 404;
			res.send("Error 404: No choosen user found");
		} else {
			pool.query(updateQuery, function(err, rows, fields) {
				if(err) throw err;
				res.json("User Updated");
			});
		}
	})
	
})

app.delete("/api/user/:id", function(req, res) {
	var deleteUserByIdQuery = 'delete from users_vickie where id = ' + req.params.id;
	var selectAllQuery = 'select * from users_vickie';
	var selectUserByIdQuery = 'select * from users_vickie where id = ' + req.params.id;


	console.log(deleteUserByIdQuery);
	pool.query(selectUserByIdQuery, function(err, rows, fields){
		if(err) throw err;
		if(!rows[0]) {
			res.send("The user does not exists!");
		} else {
			pool.query(deleteUserByIdQuery, function(err, rows, fields) {
				if(err) throw err;
				pool.query(selectAllQuery, function(err, rows, fields) {
					console.log(rows);
					res.json(rows);
				});	
			});
		}
	});	
});

console.log("This is HW5");
app.listen(3030);
