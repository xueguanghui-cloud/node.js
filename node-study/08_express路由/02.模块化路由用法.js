const express = require('express')
const app = express()

const userRouter = require('./03.router');
// app.use(userRouter);

// 路由访问前缀
app.use('/api', userRouter);


// app.use() 函数的作用，就是用来注册全局中间件的

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080');
})