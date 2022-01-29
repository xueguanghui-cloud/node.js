// 外界用require() 方法导入自定义模块时，得到的就是 module.exports 所指的对象

const m = require('./05.自定义模块')

console.log(m);