var http = require("http");
var i = -1;
http.createServer(function(request, response) {
  var url = request.url;
  console.log(url);
  if(url === "/"){
  	i = i+1;
  }
  response.writeHead(201,{"Content-Type":"text/plain"});
  response.end(i.toString());
  
}).listen(8080);
console.log("visit server @ http://localhost:8080");
