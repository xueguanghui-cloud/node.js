const express = require('express')
const app = express();

// 定义一个局部生效的中间件
const mw = function(req, res, next) {
  console.log('调用了局部生效的中间件');
}

app.get('/', mw, (req, res) => {
  console.log('Home Page.');
} )

app.get('/user', (req, res) => {
  res.send('User Page.')
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080');
})