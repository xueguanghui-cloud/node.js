const express = require('express')
const app = express()

app.get('/', (req, res) => {
  // 人为制造错误
  throw new Error('服务器内部发生了错误')
  res.send('Home Page.');
})

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  console.log('发生了错误' + err.message);
  res.send('Error' + err.message);
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080');
})