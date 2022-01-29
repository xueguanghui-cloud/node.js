const express = require('express')
const app = express()

// 注意：处理错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过 express.json() 这个中间件进行解析表单中的 json 格式的数据
app.use(express.json());

// 通过express.urlencoded() 这个中间件，来解析 url-encoded 格式的数据
app.use(express.urlencoded());

app.post('/user', (req, res) => {
  // 在服务器可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则req.body 默认等于 undefined
  console.log(req.body);
  res.send('OK');
})

app.post('/book', (req, res) => {
  // 在服务器端可以通过 req.body 获取 json 格式的表单数据 url-encode 格式的数据
console.log(req.body);
  res.send('OK');s
})

app.listen(8080, ()=>{
  console.log('http://127.0.0.1:8080');
})