const qs = require('querystring')


const bodyParser = (req, res, next) => {
  // 定义中间件具体的逻辑
  let str = ''; // 存储客户端发送过来的请求体数据
  req.on('data', (chunk) => { // 监听data事件
    str += chunk;
  })

  // 监听req的end事件
  req.on('end', () => {
    // console.log(str);
    // 把字符串格式的数据，解析为对象格式的数据
    const body = qs.parse(str)
    req.body = body
    next();
  })
}

module.exports = bodyParser