// 导入http模块
const http = require("http")

// 创建web服务器
const server = http.createServer()

// 绑定request时间
server.on('request', function(req, res) {
  // req.url 是客户端请求的url
  const url = req.url;
  // req.method 是客户端请求的 method 类型
  const method = req.method;
  const str = `Your request url is ${url}, and request method is ${method}.`;
  console.log(str);

  // 为了防止中文显示乱码的问题，需要设置响应头， Content-Type 的值为 text/html; charset=utf-8
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // 调用res.end()请求
  res.end(`您请求的 url 地址是 ${req.url}, 请求的 method 是 ${req.method}。`);
})

// 启动服务器
server.listen(8081, function(){
  console.log('Server running at http://127.0.0.1:8081');
})