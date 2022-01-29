const express = require('express')
const router = express.Router()

//挂载具体的路由
router.get('/user/add', (req, res) => {
  res.send('router-user-add.');
})

router.post('/user/list', (req, res) => {
  res.send('router-user-list.');
})

// 向外暴露出router
module.exports = router