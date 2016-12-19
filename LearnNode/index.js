var server = require("./server");
//dependency injection
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {};
handle["/start"] = requestHandler.start;
handle["/step2"] = requestHandler.step2;
handle["/upload"] = requestHandler.upload;

server.start(router.route, handle);