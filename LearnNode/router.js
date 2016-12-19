function route(handle, pathname,response, postData) {
	if(typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else {
		console.log("There is no request handler to handle this path request" + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
	    response.write("404 Not found");
	    response.end();
	}
	console.log("About to route a request for " + pathname); 
}

exports.route = route;