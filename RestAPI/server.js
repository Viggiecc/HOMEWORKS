var connect = require('connect'); 
 
var serveStatic = require('serve-static'); 
//load package serve-static
 
var app = connect(); 
 

app.use(serveStatic('angularjs')); 

console.log('Hello~~~');

app.listen(3030); 