const express = require('express')
// 导入自己封装的中间件
const customBodyParser = require('./14.custom-body-parser')
const app = express()

app.use(customBodyParser);

app.post('/user', (req, res) => {
  console.log(req.body);
  res.send(req.body);
})

app.listen(8080, function() {
  console.log('http://127.0.0.1:8080');
})