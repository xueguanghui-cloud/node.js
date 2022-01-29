const express = require('express')
const qs = require('querystring')
const app = express()

app.use((req, res, next) => {
  // 定义中间件具体的逻辑
  let str = ''; // 存储客户端发送过来的请求体数据
  req.on('data', (chunk) => { // 监听data事件
    str += chunk;
  })

  // 监听req的end事件
  req.on('end', () => {
    // console.log(str);
    // 把字符串格式的数据，解析为对象格式的数据
    const body = qs.parse(str)
    req.body = body
    next();
  })
})

app.post('/user', (req, res) => {
  res.send(req.body);
})

app.listen(8080, function() {
  console.log('http://127.0.0.1:8080');
})