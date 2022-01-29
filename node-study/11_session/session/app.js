// 导入express
const { response } = require('express')
const express = require('express')
// 创建express 服务器实例
const app = express()

// 导入express-session
const session = require('express-session')

app.use(
  session({
    secret: 'codexgh',
    resave: false,
    saveUninitialized: true
  })
)


// 托管静态页面
app.use(express.static('./pages'))

// 解析 post 提交过来的表单数据
app.use(express.urlencoded({ extended: false}))

// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交过来的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({status: 1, msg: '登录失败'})
  }

  // 将登录成功后的用户信息保存到session中
  req.session.user = req.body // 用户登录信息
  req.session.islogin = true  // 用户登录状态

  res.send({ status: 0, msg: '登录成功' })
})

// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // 请从 session 中获取用户的名称，响应给客户端
  if(req.session.islogin) {
    return res.send({status: 1, msg: 'fail'})
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username
  })
})

app.post('/api/logout', (req, res) => {
  // 清空seeion信息
  res.session.destory()
  res.send({
    status: 0,
    msg: '退出成功'
  })
 
})


app.listen(8080, () => {
  console.log('Express server running at http://127.0.0.1:8080');
})