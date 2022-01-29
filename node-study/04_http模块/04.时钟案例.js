// 导入fs模块
const fs = require('fs')
// 导入path模块
const path = require('path')
// 导入http模块
const http = require('http')

// 创建web服务器
const server = http.createServer()

// 绑定request
server.on('request', (req, res) => {
  const url = req.url;

  // 默认响应内容
  var content = '<h1>404 Not found</h1>'

  // 设置Content-Type响应头
  res.setHeader('Content-Type', 'text/html; charset=urf-8');

  
  // 判断用户请求路径
  if (url === '/') {
    // 读取index.html
    fs.readFile(path.join(__dirname, './clock/index.html'), 'utf-8', (err, dataStr) => {
      if (err) return res.end(content+"jj");
      res.end(dataStr);
    })
  } else if(url === '/index.html') {
    // 读取index.html
    fs.readFile(path.join(__dirname, '/clock', url), 'utf-8', (err, dataStr) => {
      if (err) return res.end(content);
      res.end(dataStr);
    })
  }
})

// 启动服务器
server.listen('8080', () => {
  console.log('Server running at http://127.0.0.1:8080');
})