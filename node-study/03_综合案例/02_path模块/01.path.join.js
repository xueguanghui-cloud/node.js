/**
 * 使用path.join()方法,可以把多个路径片段拼接为完整的路径字符串,语法格式如下:
 * path.join([...path])
 * */

const fs = require('fs');
const path = require('path');

// ../会抵消前面一个路径
// const newPath = path.join('/a', '/b/c', '../', '/d', 'e');

// console.log(newPath);
fs.readFile(path.join(__dirname, '/data/1.txt'), 'utf-8', function(err, dataStr){
  if(err) {
    console.log('读取失败:'+err);
  }else{
    console.log('读取成功:'+dataStr);
  }
})
