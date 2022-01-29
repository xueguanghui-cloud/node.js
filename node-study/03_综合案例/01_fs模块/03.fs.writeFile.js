// 导入fs模块
const fs = require('fs');

/**
 * writeFile(参数1，参数2，[参数3]，参数4)
 * 参数1：文件路径
 * 参数2：要写入的内容
 * 参数3：表示以什么格式写入文件内容，默认是utf8
 * 参数4：文件写入完成后的回调函数
 * */ 
fs.writeFile('./data/1.txt', '我是使用fs.writeFile()方法写入的模块', 'utf8', function(err, dataStr){
  // 如果文件写入成功,则err的值为null
  // 如果文件写入失败,则err的值为一个错误对象
  if (null) {
    console.log('文件写入失败'+err);
  } else {
    console.log('文件写入成功');
  }
});
