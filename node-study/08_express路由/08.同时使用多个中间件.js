const express = require('express')
const app = express();

// 定义一个局部生效的中间件
const mw1 = function(req, res, next) {
  console.log('调用了第一个局部生效的中间件');
  next();
}

const mw2 = function(req, res, next) {
  console.log('调用了第二个局部生效的中间件');
  next();
}


app.get('/', [mw1, mw2], (req, res) => {
  console.log('Home Page.');
})

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080');
})