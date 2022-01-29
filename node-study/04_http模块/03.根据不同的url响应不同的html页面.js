const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url;

  // 设置默认的响应内容为 404 Not found
  let content = '404 Not found';

  // 判断用户请求是否为 / 或 /index.html 首页
  if(url === '/' || url === '/index.html') {
    content = '欢迎来到首页';
  } else if (url === '/about.html') {  // 判断用户请求是否为 /about.html
    content = '关于我们';
  }

  // 设置Content-Type响应头,防止中文乱码
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // 响应用户请求
  res.end(content);

});

server.listen(8080, () => {
  console.log('Server running at http://127.0.0.1:8080');
})
