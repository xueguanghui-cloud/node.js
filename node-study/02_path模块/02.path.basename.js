/**
 * 使用path.basename()方法, 可以获取路径中的最后一部分,经常通过这个方法获取的路径中的文件名,语法格式如下:
 * path.basename(path[,ext])
 * path <string> 表示一个路径的字符串
 * ext <string> 表示文件扩展名
 * 返回 <string> 表示路径的最后一部分
 * */ 

const path = require('path');

const fpath = '/a/b/c/abc/index.html';

// const fullname = path.basename(fpath)
// console.log(fullname);

const fullname = path.basename(fpath, '.html');
console.log(fullname);