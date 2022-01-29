// 任务:将index.html文件中的style 和 script 拆分为三个小文件,将他们存放到clock

/**
 * 实现步骤:
 * 1.创建两个正则表达式, 分别用来匹配<style> 和 <script>标签
 * 2.使用fs模块,读取需要被处理的HTML文件
 * 3.自定义resolveCSS方法,来写入index.css样式文件
 * 4.自定义resolveJS方法,来写入index.js脚本文件
 * 5.自定义resolveHTML方法,来写入index.html文件
 */


/**
 * 注意问题：
 * 1. fs.writeFile() 方法只能用来创建文件，而不能用来创建路径； 
 * 2. 重复调用fs.writeFile() 写入同一文件，新写入的内容会覆盖之前的就内容。
*/

// 导入fs模块
const fs = require('fs');
// 导入path模块
const path = require('path');

// 定义正则表达式,分别用来匹配<style> 和 <script>标签
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 使用fs模块读取文件
fs.readFile(path.join(__dirname, './素材/index.html'), 'utf8', function(err, dataStr){
  // 读取文件失败,将错误信息返回出去
  if (err) return console.log('读取文件失败:'+err);
  // 读取文件成功后,调用对应的三个方法,分别拆解css, js, html文件
  resolveCSS(dataStr);
  resolveJS(dataStr);
  resolveHTML(dataStr);
})




// 定义resolveCSS方法:
function resolveCSS(htmlStr) {
  // 使用正则提取需要的内容
  const r1 = regStyle.exec(htmlStr);
  // 将提取出来的样式字符串,进行字符串替换
  const newCSS = r1[0].replace('<style>', '').replace('</style>', '');
  // 将替换后的样式写入clock文件目录下并命名为index.css
  fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, err => {
    if (err) return console.log('写入失败'+err); 
    console.log('样式写入成功');
    
  })
} 

// 定义resolveJS方法:
function resolveJS(htmlStr) {
  // 使用正则表达式提取需要的内容
  const r2 = regScript.exec(htmlStr);
  // 将提取出来的js脚本字符串,进行字符串提换
  const newJS = r2[0].replace('<script>', '').replace('</script>', '');
  // 将替换后的js脚本写入clock文件目录下并命名为index.js
  fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, err => {
    if (err) return console.log('js脚本写入失败:'+err);
    console.log('js脚本写入成功');
  })
}

// 定义resolvHTML方法:
function resolveHTML(htmlStr){
  // 将字符串调用 replace 方法,把内嵌的 style 和 script 替换为 link 和 script
  const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css">').replace(regScript, '<script src="./index.js"></script>">');
  fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, err => {
    if (err) return console.log('index.html文件写入失败:'+err);
    console.log('index.html文件写入成功');
  })
}