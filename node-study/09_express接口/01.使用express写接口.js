const express = require('express');
const app = express();

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 必须在配置cors中间件之前配置jsonp接口
app.get('/api/jsonp', (req, res) => {
  // 定义jsonp接口具体的实现

  // 获取客户端发送过来的回调函数的名字
  const fullName = req.query.callback
  // 得到要通过 jsonp 形式发送给客户端的数据
  const data = { name: 'codexgh', age: 22}
  // 根据前两步得到的数据，拼接出一个函数调用的字符串
  const scriptStr = `${fullName}(${JSON.stringify(data)})`
  // 把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析
  res.send(scriptStr)
})

// 一定要在路由之前配置cors中间件,从而解决接口跨域问题
const cors = require('cors')
app.use(cors())

// 导入路由模块
const router = require('./02.apiRouter');
// 注册路由模块
app.use('/api', router);


app.listen(8080, () => {
  console.log('Express server running at http://127.0.0.1:8080');
})

/** 
 * 接口的跨域问题
 *  CORS (主流的解决方法，推荐使用)
 *    cors 是express 的一个第三方中间件，通过安装和配置 cors 中间件，可以很方便的解决跨域问题
 *    安装命令：npm install cors 
 *    导入cors：const cors = require('cors')
 *    注册：app.use(cors())
 * 
 * 
 *  JSONP (有缺陷的解决方法，只支持 get 请求)
 * 
 * 
 * 
 * CORS 响应头部 - Access-Control-Allow-Orgin
 *    · 响应头部中可以携带一个 Access-Control-Allow-Origin字段，其语法如下：
 *    Access-Control-Allow-Origin: <origin> | *
 *    其中，origin 参数的值指定了允许访问该资源的外域URL
 *    例如：下面的字段值只允许来自http://itcast.cn的请求：
 *    res.setHeader('Access-Control-Allow-Orgin', 'http://itcast.cn');
 * 
 * CORS 响应头部 - Access-Control-Allow-Headers
 *    · 默认情况下， CORS 仅支持客户端向服务器发送如下的9个请求头：
 *      Accept, Accept-Language, Content-Language, DPR, Downlink, Save-Data, Viewport-Width,Width,Content-Type(值仅限于 text/plain, multipart/form-data, application/x-www-form-urlencoded 三者之一)
 *    如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败！
 *    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
 * 
 * 
 * CORS 响应头部 - Access-Control-Allow-Methods
 *    · 默认情况下，CORS 仅支持 GET, POST, HEAD 请求
 *    如果客户端希望通过 PUT, DELETE  等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Allow-Methods来指明实际请求所允许的HTTP方法。
 *    示例代码：
 *    // 只允许 POST, GET, HEAD, DELETE 请求方法
 *    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
 *    // 允许所有的 HTTP 请求方法
 *    res.setHeader('Access-Control-Allow-Methods': '*')
 *  */ 
