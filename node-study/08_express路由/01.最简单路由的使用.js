const express = require('express')

const app = express()

// 挂载 路由
app.get('/', (req, res) => {
  res.send("hello world");
})

app.post('/', (req, res) => {
  res.send("Post Requset");
})

app.listen(8080, () => {
  console.log('Server running at http://127.0.0.1:8080');
})