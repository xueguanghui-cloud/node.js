const express = require('express')
const app = express()

// 定义一个最简化的中间件函数
app.use((req, res, next) => {
  // 获取到请求到达服务器的时间
  const time = new Date();
  // 为 req 对象，挂载 自定义属性， 从而把时间共享给后面的所有路由
  req.startTime = time;
  next();
})


app.get('/', (req, res) => {
  res.send('Home Page.' + req.startTime);
})

app.get('/user', (req,res) => { 
  res.send('User Page.' + req.startTime);
})
9/9
app.listen(8080, ()=>{
  console.log('http://127.0.0.1:8080');
})