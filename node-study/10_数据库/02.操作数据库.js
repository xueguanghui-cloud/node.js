// 导入数据库
const mysql = require('mysql');

// 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1',  // 数据库的ip地址
  user: 'root',   // 登录数据库的账号
  password: 'root',   //登录数据库的密码
  database: 'my_db_01'    // 数据库名称
})

// module.exports = db;

// 测试mysql模块能否解决正常工作
// db.query('select 1', (err, result) => {
//   // mysql 模块工作期间报错了
//   if (err) return console.log(err.message);

//   // 能够正常执行sql语句
//   console.log(result);
// })


//  查询 users 表中的所有的数据
// db.query('select * from users', (err, result) => {
//   // mysql 模块工作期间报错了
//   if (err) return console.log(err.message);

//   // 查询数据成功
//   console.log(result);
// })



// 向users表中插入数据 username为codexgh，password为666666
//  const user = { username: 'codexgh', password: '666666'}
// //  定义执行的sql语句
// const sqlStr = 'insert into users (username, password) values (?, ?)'

// db.query(sqlStr, [user.username, user.password], (err, result) => {
//   // 出现错误
//   if (err) return console.log(err.message);
//   // 插入成功
//   // 通过affectedRows属性来判断是否插入数据
//   if (result.affectedRows === 1) console.log('插入数据成功');
// })


// 插入数据的便捷方法
// const user = { username: 'codexgh2', password: 'codexgh'}
// //  定义执行的sql语句
// const sqlStr = 'insert into users set ?'

// db.query(sqlStr, user, (err, result) => {
//   // 出现错误         
//   if (err) return console.log(err.message);
//   // 插入成功
//   // 通过affectedRows属性来判断是否插入数据
//   if (result.affectedRows === 1) console.log('插入数据成功');
// })


// 更新数据：将id为1906的 username 修改为 zhuriyu ，password 修改为 020228
// const user = { id:1906, username: 'zhuriyu', password: '020228'}
// // 待执行的sql语句
// const sqlStr = 'update users set username=?, password=? where id=?'

// db.query(sqlStr, [user.username, user.password, user.id], (err, result) => {
//   // 更新成功
//   if (err) return console.log(err.message);
//   // 更新失败
//   if (result.affectedRows === 1) console.log('数据修改成功');
// })



// 插入数据的便捷方法
// const user = { id: 1903, username: 'zhuriyu', password: '020228' }
// //  定义执行的sql语句
// const sqlStr = 'update users set ? where id=?'

// db.query(sqlStr, [user, user.id], (err, result) => {
//   // 出现错误         
//   if (err) return console.log(err.message);
//   // 插入成功
//   // 通过affectedRows属性来判断是否插入数据
//   if (result.affectedRows === 1) console.log('插入数据成功');
// })


// 删除数据: 删除id为1907的用户数据
// const sqlStr = 'delete from users where id = ?'
// db.query(sqlStr, 1906, (err, result) => {
//   // 删除失败
//   if (err) return console.log(err.message);
//   // 删除成功
//   if (result.affectedRows === 1) console.log('删除数据成功');
// })

// 标记删除：将要删除的用户的status的状态修改为1
const sqlStr = 'update users set status=? where id=?'

db.query(sqlStr, [1, 1901], (err, result) => {
  if (err) return console.log(err.message);
  if (result.affectedRows === 1) console.log('标记删除成功');
})