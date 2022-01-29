// 导入 fs 模块，当你安装node之后，就会有fs模块
const fs = require('fs');

/**
 * readFile(参数1,[参数2],参数3)
 * 参数1：读取文件路径；
 * 参数2：可选参数，编码格式默认utf8；
 * 参数3：回调函数，可以拿到读取失败或成功的结果；
*/

// 调用 fs.readFile() 方法读取文件
fs.readFile('./data/1.txt', 'utf8', function(err, dataStr) {
  if(err) {
    // 读取失败
    console.log('文件读取失败' + err);
  } else {
    // 读取成功
    console.log('文件读取成功' + dataStr);
  }
})
