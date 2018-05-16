var http = require("http");
var i = 0;
http.createServer(function(request, response) {
  response.writeHead(201,{"Content-Type":"text/plain"});
  console.log(i);
  i = i+1;
  console.log(i);
  response.write(i.toString()+"\n");
  response.end(i.toString());
}).listen(8080);
console.log("visit server @ http://localhost:8080");
