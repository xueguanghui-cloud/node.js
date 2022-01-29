// 这是文章管理路由模块
const express = require('express')
const router = express.Router()

// 导入解析formdata格式表单数据的包
const multer = require('multer')
// 导入处理路劲的核心模块
const path = require('path')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../public/') })

// 导入文章的路由处理函数模块
const router_handler = require('../router_handler/article')


// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文件验证模块
const { add_article_schema, delete_article_schema, get_article_schema, update_article_schema } = require('../scheme/article')

// 发布文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), router_handler.addArticle)

// 获取文章列表数据的路由
router.get('/list', router_handler.getArticles)

// 根据Id删除文章数据
router.get('/delete/:id', expressJoi(delete_article_schema), router_handler.deleteArticles)

// 根据Id获取文章详情
router.get('/:id', expressJoi(get_article_schema), router_handler.getArticle)

// 根据Id更新文章详情
router.post('/edit', expressJoi(update_article_schema), router_handler.updateArticle)

// 向外共享路由对象
module.exports = router