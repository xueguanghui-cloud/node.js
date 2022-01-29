/**
 * 在使用fs模块操作文件时,如果提供的操作路径是以./或../开头的相对路径时,很容易出现路径动态拼接错误的问题
 * 原因: 代码在运行的时候,会以 node 命令时所处的目录动态拼接出被操作文件的完整路径.
 * */ 


const fs = require('fs')

// 解决问题:提供一个完整的文件存放路径
// fs.readFile('./data/1.txt', 'utf8', function(err, dataStr){
//   if (err) {
//     console.log('读取失败'+err);
//   }else{
//     console.log('读取成功'+dataStr);
//   }
// })

// 解决方法:不利于维护
// fs.readFile('E:\\前端学习\\node学习\\data\\1.txt', 'utf8', function(err, dataStr){
//   if (err) {
//     console.log('读取失败'+err);
//   }else{
//     console.log('读取成功:'+dataStr);
//   }
// })



// 解决办法: __dirname 表示当前文件所处的目录
fs.readFile(__dirname + '/data/1.txt', 'utf8', function(err, dataStr){
  if (err) {
    console.log('读取失败'+err);
  }else{
    console.log('读取成功:'+dataStr);
  }
})