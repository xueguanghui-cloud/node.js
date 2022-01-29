// 导入数据库操作模块
const db = require('../db/index')

//导入bcryptjs模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的路由模块
exports.getUserInfo = (req, res) => {

  // 根据用户的id，查询用户的基本id
  // 注意：为例防止用户的密码泄露，需要剔除 password 字段
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'

  // 注意：req对象上的 user 属性，是Token解析成功，express-jwt中间件帮我们挂载失去的
  db.query(sql, req.user.id, (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)
    // 执行sql语句成功，但是查询到的数量条数不等于1
    if (results.length !== 1) return res.cc('获取用户信息失败')
    // 将用户信息响应给客户端
    res.send({
      status: 0,
      message: '获取用户基本信息成功',
      data: results[0]
    })
  })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
  // 定义待执行的sql语句
  const sql = 'update ev_users set ? where id=?'

  // 调用db.query()执行sql语句
  db.query(sql,[ req.body, req.body.id], (err, results) => {
    // 执行sql语句实现
    if (err) return res.cc(err)
    /// 执行sql语句成功，但是影响行数不等于1
    if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败')
    // 修改用户信息成功
    return res.cc('修改用户基本信息成功', 0)
  })
}

// 更新密码的处理函数
exports.updatePassword = (req, res) => {
  // 定义根据 id 查询用户数据的 SQL 语句
  const sql = 'select * from ev_users where id=?'

  // 执行SQL语句，查询用户是否存在
  db.query(sql, req.user.id, (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)

    // 检查指定id的用户是否存在
    if (results.length !== 1) return res.cc('用户不存在')

    // 判断用户提交的密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) return res.cc('原密码错误')
    
    // 定义更新用户密码的 SQL 语句
    const sql = 'update ev_users set password=? where id=?'
    // 对新密码进行 bcrypt 加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

    // 执行SQL语句，根据id更新用户密码
    db.query(sql, [newPwd, req.user.id], (err, results) => {
      // sql语句执行失败
      if (err) return res.cc(err)

      //sql 语句执行成功，但是影响行数不等于1
      if (results.affectedRows !== 1) return res.cc('修改密码失败')

      // 更新密码成功
      res.cc('修改密码成功', 0) 
    })
  })

}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  // 定义更新用户头像的sql语句
  const sql = 'update ev_users set user_pic=? where id=?'

  // 调用db.query() 执行sql语句，更新对应用户头像：
  db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)
    // 执行sql语句成功，但是影响行数不等于1
    if (results.affectedRows !== 1) return res.cc('更新用户头像失败')
    // 更新用户头像成功
    return res.cc('更新用户头像成功', 0)
  })
}