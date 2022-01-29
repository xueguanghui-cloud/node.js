// 导入fs模块
const fs = require('fs');


fs.readFile('./data/achievement.txt','utf8',function(err, dataStr){
  if (err) {
    // 读取失败
    console.log('读取文件失败'+err.message);
  } else {
    // console.log('读取文件成功'+dataStr);

    // 把成绩的数据安装空格分隔
    const arrOld = dataStr.split(' ');
    // 循环遍历,将数组中的每一个数据,进行替换
    // 创建一个新数组,用于存放替换后的数据
    const arrNew = [];
    for (var i= 0; i< arrOld.length; i++) {
      arrNew.push(arrOld[i].replace('=', ':'));
    }
    // 把新数组中的每一项,进行合并,得到一个新的字符串
    const newStr = arrNew.join('\r\n');
    console.log(newStr);
    fs.writeFile('./data/achievement.txt', newStr, function(err){
      if (err) {
        console.log('写入失败'+err);
      }else {
        console.log('写入成功');
      }
    })
  }
})