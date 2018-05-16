# 第二题

## 问题

请使用 Node.js 实现第一次访问时，服务器返回的页面显示 0，第二次访问返回 1；每次访问都在前一次计数的基础上加一的功能

## 初次尝试

初次尝试的错误版本如下：

```javascript
var http = require("http");
var i = 0;
http.createServer(function(request, response) {
  response.writeHead(201,{"Content-Type":"text/plain"});
  response.end(i.toString());
  i = i+1;
}).listen(8080);
console.log("visit server @ http://localhost:8080");
```


但是此版本的输出是有问题的！chrome浏览器每次会加2，safari每次会加1。

> 为什么每次都会调用两次函数呢？
> 因为同样是在地址栏输入地址 `http://localhost:8080`, chrome会请求两个请求（`http://localhost:8080/`和`http://localhost:8080/favicon.ico`，后面一个是获取web的icon），而safari只会请求一个请求。而服务端的工作就是，每有一个请求，便`+1`，所以chrome每次`+2`。

## 测底的完成题目要求

判断输入的url是否是`/`,即排除访问`favicon.ico`的情况。

```javascript
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

```
