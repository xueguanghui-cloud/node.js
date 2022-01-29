// 导入express
const express = require('express')
// 创建服务器的实例对象
const app = express()
// 导入定义验证规则的包
const joi = require('joi')

// 导入 cors 中间件
const cors = require('cors')
// 将cors注册为全局中间件
app.use(cors())


// 一定要在路由之前,封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值是1, 表示失败的情况
  // err 的值, 可能是一个错误对象,也可能是一个错误描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 配置解析表单数据的中间件 
// 注意：只能解析 application/xxx-www-form-urlencoded 这个格式的数据
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入并使用文章分类的路由模块
const artcateRouter = require('./router/artcate')
app.use('/my/article', artcateRouter)

// 导入并使用文章管理的路由模块
const articleRouter = require('./router/article') 
app.use('/my/article', articleRouter)

// 托管静态资源文件
app.use('/public', express.static('./public'))

// 定义错误级别的中间件
app.use((err, req, res ,next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')

  // 未知错误
  res.cc(err)
})

// 启动服务器
app.listen(30, () => {
  console.log('api running at http://127.0.0.1:30');
})
