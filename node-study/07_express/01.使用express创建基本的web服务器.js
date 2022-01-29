// 导入expres
const express = require('express');

// 创建 web服务器
const app = express();


// 监听客户端的 get 和 post 请求，并项客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用express提供的 res.send() 方法， 向客户端响应一个 json 对象
  res.send({name: '张飞', age: 20, gender: 'male'});
})

app.post('/about', (req, res) => {
  // 调用express提供的 res.send() 方法， 向客户端响应一个 json 对象
  res.send('请求成功');
})

app.get('/', (req, res) => {
  // 通过 req.query 可以获取到客户端发送过来的参数
  console.log(req.query);
  res.send(req.query);
})


// 这里:id 是一个动态参数
app.get('/user/:id', (req, res) => {
  // req.params 是动态匹配到的参数
  console.log(req.params);
  res.send(req.params)
})

// 调用app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen('8080', () => {
  console.log('express server running at http://127.0.0.1:8080');
})
