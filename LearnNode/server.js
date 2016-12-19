var http = require('http');
//to get pathname, need url module;
var url = require('url');

function start(route,handle) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("request from " + pathname + " received");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data is " + postDataChunk);

		});

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		})
		
	}
	http.createServer(onRequest).listen(8888);
	console.log("server start");
}

exports.start = start;

