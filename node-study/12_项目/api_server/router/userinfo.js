const express = require('express')
const router = express.Router()

// 导入验证规则合法性中间件
const expressJoi = require('@escook/express-joi')
// 导入schema验证规则模块
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../scheme/user')

// 挂载路由

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)
// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

// 向外暴露路由对象
module.exports = router