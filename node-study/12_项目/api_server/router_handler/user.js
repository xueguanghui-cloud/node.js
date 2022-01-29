// 导入数据库操作模块
const db = require('../db/index')

// 导入bcryptjs包
const bcrypt = require('bcryptjs')
// 导入生成Token包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')

// 注册模块的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo = req.body
  // 对表单中的数据进行合法性校验
  // if (!userinfo.username || !userinfo.password) {
  //   // return res.send({ status: 1, message: '用户名或密码不合法!' })
  //   return res.cc(err)
  // }

  // 定义 sql 语句，查询用户名是否被占用
  const sqlStr = 'select * from ev_users where username=?'
  db.query(sqlStr, [userinfo.username], (err, results) => {
    // 执行sql语句失败
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }

    // 判断用户名是否被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其它用户名!' })
      return res.cc('用户名被占用，请更换其它用户名!')
    }

    // 用户名可以使用
    // 对用户的密码，进行bcrypt加密，返回值是加密之后的密码字符串
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    
    // 定义插入新用户的sql语句：
    const sql = 'insert into ev_users set ?'
    // 调用db.query()执行sql语句，插入新用户
    db.query(sql, {username: userinfo.username, password: userinfo.password}, (err, results) => {
      // 执行sql语句失败
      // if (err) return  res.send({ status: 1, message: err.message })
      if (err) return res.cc(err)

      // 执行sql语句成功,但影响行为不为1
      if (results.affectedRows !== 1) {
        // return res.send({ status: 1, message: '注册用户失败,请稍后再试!' })
        return res.cc('注册用户失败,请稍后再试!')
      }
      // 注册成功
      // res.send({ status: 0, message: '注册成功' })
      res.cc('注册成功', 0)
    })
  })

}

// 登录模块的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body

  // 定义SQL语句
  const sql = 'select * from ev_users where username=?'

  // 执行SQL语句，查询用户的数据
  db.query(sql, userinfo.username, (err,results) => {
    // 执行SQL语句失败
    if (err) return res.cc(err)
    // 执行SQL查询成功，但是查询到的数据条数不等于1
    if (results.length !== 1) return res.cc('登录失败')

    // 判断用户输入的密码与数据库中的密码是否一致
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    // 如果对比的结果为false， 则证明用户输入的密码错误
    if (!compareResult) return res.cc('登录失败')

    // todo: 登录成功，生成 Token 字符串
    // 剔除敏感信息
    const user = { ...results[0], password: '', user_pic: '' }
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    // 调用res.send() 将 token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功',
      token: 'Bearer ' + tokenStr
    })
  })

}