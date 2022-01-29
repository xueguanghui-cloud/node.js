/**
 * http模块：
 *  http模块是 node.js 官方提供的，用来创建 web服务器 的模块，通过 http 模块提供的 http.createServer() 方法，就能把把一台普通的电脑，变成一台web服务器，从而对外提供web资源服务。
 * 
 */

/**
 * 创建web服务器的步骤
 *  1.导入http模块；
 *  2.创建web服务实例；
 *  3.为服务器实例绑定 request 时间，监听客户端的请求；
 *  4.启动服务器。
 */

// 创建一个基本的web服务器

// 导入http模块
const http = require('http');
// 创建web服务器
const server = http.createServer();

server.on('requset', (req, res) => {
  console.log('Someone visit our web server.');
})


server.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080');
})
