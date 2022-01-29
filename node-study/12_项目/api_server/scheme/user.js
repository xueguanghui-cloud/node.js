// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义id，nickname，email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义用户头像的验证规则
// dataUri() 指的是如下的字符串数据：
const avatar = joi.string().dataUri().required()

// 验证规则对象-注册和登录表单数据
exports.reg_login_schema = {
  body: {
    username,
    password
  }
}

// 验证规则对象-用户基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}

// 验证规则对象-更新密码
exports.update_password_schema = {
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // joi.ref('oldPwd')  表示 newPwd 的值必须和 oldPwd 的值保持一致
    // joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不等于 oldPwd 的值
    // concat() 用于合并 oi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

// 验证规则对象-更新头像
exports.update_avatar_schema = {
  body: {
    avatar
  }
}