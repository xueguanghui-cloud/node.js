// 使用express.static 方法对外提供静态资源

// 如果需要托管多个静态资源目录，请多次调用express.static函数
// 访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件

const express = require('express');

const app = express()

// 在这里，调用express.static() 方法，快速对外提供静态资源
// app.use(express.static('./clock/'));


// 挂载路径前缀
app.use('/pub', express.static('./clock'))


app.listen(8080, () => {
  console.log('express server running at http://127.0.0.1:8080');
})