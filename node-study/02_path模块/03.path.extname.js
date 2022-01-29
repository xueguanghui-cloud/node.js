/**
 * 使用path.extname()方法,可以获取路径中文件的扩展名,语法如下
 * path.extname(path)
 * path <string> 文件路径
*/

const path = require('path');

const fpath = '/a/b/c/abc/index.html';
const extname = path.extname(fpath);

console.log(extname);