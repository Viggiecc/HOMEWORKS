var fs = require("fs");
var querystring = require("querystring");

function start(response) {
	console.log("Request handler 'start' was called.");
	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" method="post">'+
	'<textarea name="text" rows="20" cols="60"></textarea>'+ '<input type="submit" value="Submit text" />'+ '</form>'+
	'</body>'+
	'</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function step2(response) {
	
	fs.readFile('./step2.html', function (err, html) {
	    if (err) {
	        throw err; 
	    }       
	   
	    response.writeHeader(200, {"Content-Type": "text/html"});  
	    response.write(html);  
	    response.end();  
	});
}

function upload(response, postData) {
	console.log("About to handle the request from 'upload'");
	response.writeHead(200, {"Content_Type":"text/plain"});
	response.write("Hello Upload, the uploaded data " + querystring.parse(postData).text);
	response.end();
}

exports.start = start;
exports.step2 = step2;
exports.upload = upload;