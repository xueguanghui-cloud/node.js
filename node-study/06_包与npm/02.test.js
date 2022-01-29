// 导入自定义的格式化时间模块
const TIME = require('./01.dateFomat.js')


// 调用方法，进行时间的格式化
const dt = new Date()
const newDT = TIME.dateFormat(dt)

console.log(newDT);