const express = require('express')
const app = express()

const parser = require('body-parser')

app.use(parser.urlencoded({extends: false}))

app.post('/user', (req, res) => {
  // 默认情况下，如果不配置解析表单数据的中间件，则req.body 默认等于 undefined
  console.log(req.body);
  res.send('User Page.');
})

app.listen(8080, function() {
  console.log('Express server running at http://127.0.0.1:8080');
})