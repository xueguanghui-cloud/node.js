const express = require('express')
const router = express.Router()

// 挂载对应的路由
// get
router.get('/get', (req, res) => {
  // 通过 req.query 获取客户端通过查询字符串， 发送到服务器的数据
  const query = req.query;
  console.log(query);
  // 调用 res.send() 方法，向客户端响应处理的结果
  res.send({
    status: 0, // 0 表示处理成功，1 表示处理失败
    message: 'GET 请求成功.',
    data: query
  })
})

// post
router.post('/post', (req, res) => {
  // 获取客户端通过请求体，发送服务器的URL-encoded 数据
  const body = req.body;
  console.log(body);
  // 调用 res.send() 方法。把数据响应给客户端
  res.send({
    status: 0,
    message: 'POST请求成功',
    data: body
  })
})

// delete
router.delete('/delete', (req, res) => {
  res.send({
    status: 0,
    msg: '请求成功'
  })
})


module.exports = router