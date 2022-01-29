const express = require('express')
const app = express()


const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')


// 允许跨越资源共享
const cors = require('cors')
app.use(cors)

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
app.use(bodyParser, urlencoded({ extended: false }))

const secretKey = 'codexgh ^~^';

// 注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }));


// 登录接口
app.post('/api/login', (req, res) => {
  // 将req.body 请求体中的数据 转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败',
    })
  }

  // 登录成功
  // 在登录成功之后，调用jwt.sign() 方法生成 JWT 字符串，并通过 token 属性发送给客户端
  // 参数1： 用户的信息对象
  // 参数2： 加密的密钥
  // 参数3： 配置对象，可以配置当前的 token 的有效期
  const tokenStr = jwt.sign({username: userinfo.username}, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    message: '登录成功',
    tolen: tokenStr // 要发送给客户端的 token 字符串  
  })
})


app.get('/admin/getinfo', (req, res) => {
  // 使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user);
  res.send({
     status: 200,
     message: '获取用户信息成功',
     data: req.user
  })
})

// 错误处理中间件
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.send({
      status: 401,
      message: '无效的token'
    })
  }
  res.send({
    status: 500,
    message: '未知的错误'
  })
})

app.listen(8080, () => {
  console.log('Express server running at http://127.0.0.1:8080');
})