var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.use(express.static(path.join(__dirname, 'angularjs')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var pool = mysql.createPool({
	host: 'dev1.valiantica.com',
	user: 'dev1',
	password: 'valiantica0515',
	database: 'test'
});

app.get("/api/employees", function(req, res) {
	var selectAllQuery = 'select * from employees_vickie';
	var employees = [];
	pool.query(selectAllQuery, function(err, rows){
		if(err) throw err;
		
		if(!rows) {
			res.statusCode = 404;
			res.send("Error 404: No user found");
		} else {
			employees = rows;
			var employeesCount = rows.length;
			for(var i = 0; i < employeesCount; i++) {
				console.log(employees[i].id);
				// console.log(getEmployeeById(employees[i].id));
				getDirectReportsById(employees[i].id);
				// var selectAllDirectReportsQuery = 'select * from direct_reports_vickie where superior_id = ' + employees[i].id;
				// pool.query(selectAllDirectReportsQuery, function(err, rows) {
				// 	if(err) throw err;
				// 	var curEmployee = getEmployeeById(employees[i].id);
				// 	console.log(curEmployee);
				// 	var directReports = rows;
				// 	console.log(directReports.length);
				// });
			}
		
			res.send(rows);
		}

	})

});

// app.get("/api/employee/:id", function(req, res) {
// })

var getEmployeeById = function(id) {
	var selectEmployeeByIdQuery = "select * from employees_vickie where id = " + id;
	pool.query(selectEmployeeByIdQuery, function(err, row) { 
		if(err) throw err;
		if(!row) {
			return null;
		} else {
			return row;
		}			
	});
}

var getDirectReportsById = function(superiorId) {
	var selectAllDirectReportsQuery = 'select * from direct_reports_vickie where superior_id = ' + superiorId;
	pool.query(selectAllDirectReportsQuery, function(err, rows) {
		if(err) throw err;
		var curEmployee = getEmployeeById(superiorId);
		console.log(curEmployee);
		var directReports = rows;
		console.log(directReports.length);
	});
}


console.log("This is project 2");
app.listen(3030);