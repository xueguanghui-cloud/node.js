// 在一个自定义模块中，默认情况下，导出的是module.exports = {}

// module.exports.username = '张三';

// module.exports.sayHello = function () {
//   console.log("hello");
// }

const username = '张三';

function sayHello() {
  console.log('Hello node.js');
}

module.exports = {
  username,
  sayHello
}

// 注意：module.exports === exports，
// 使用误区：使用require得到的永远是 module.exports 所指的对象
