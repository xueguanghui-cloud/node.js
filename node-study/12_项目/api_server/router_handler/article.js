// 这是文章管理路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

// 导入处理路径的 path 核心模块
const path = require('path')


// 发布文章数据处理函数
exports.addArticle = (req, res) => {
  // 手动判断是否上传了文章封面
  if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数')

  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端存放的路径
    cover_img: path.join('/public', req.file.filename),
    // 文章的发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id
  }

  // 定义发布文章的sql语句
  const sql = 'insert into ev_articles set ?'

  // 执行sql语句
  db.query(sql, articleInfo, (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)

    // 执行sql语句成功，但是影响行数不等于1
    if (results.affectedRows !== 1) return res.cc('发布文章失败')

    // 发布文章成功
    res.cc('发布文章成功', 0)
  })
}

// 获取文章列表数据处理函数
exports.getArticles = (req, res) => {
  // 定义获取文章列表数据的sql语句
  const sql = 'select Id, title, pub_date, state, cate_id from ev_articles where is_delete=0 order by Id asc'

  // 执行sql语句
  db.query(sql, (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)

    // 执行sql语句成功
    res.send({
      status: 0,
      message: '获取文章列表数据成功',
      data: results
    })
  })
}

// 根据Id删除文章数据
exports.deleteArticles = (req, res) => {
  // 定义删除文章分类的 SQL 语句
  const sql = 'update ev_articles set is_delete=1 where Id=?'

  // 执行SQL语句
  db.query(sql, req.params.id, (err, results) => {
    // 执行SQL语句失败
    if (err) return res.cc(err)

    // 执行sql语句成功，但是影响行数不等于1
    if (results.affectedRows !== 1) return res.cc('删除文章数据失败')

    // 删除文章数据成功
    res.cc('删除文章数据成功', 0)
  })
}

// 根据Id获取文章详情
exports.getArticle = (req, res) => {
  const sql = `select * from ev_articles where id=? and is_delete<>1`

  db.query(sql, req.params.id, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // SQL 语句执行成功，但是没有查询到任何数据
    if (results.length !== 1) return res.cc('获取文章详情失败！')
  
    // 把数据响应给客户端
    res.send({
      status: 0,
      message: '获取文章详情成功！',
      data: results[0],
    })
  })
}

// 根据Id更新文章详情
exports.updateArticle = (req, res) => {
  // 定义标题是否被占用
  const sql = 'select * from ev_articles where Id<>? and title=?'

  // 执行sql语句
  db.query(sql, [req.body.Id, req.body.title], (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)

    // 执行sql语句成功，但是查询条数不等于1
    if (results.length > 1) return res.cc('文章标题被占用')

    // 更新文章成功
    const articleInfo = {
      // 标题、内容、状态、所属的分类Id
      ...req.body,
      // 文章封面在服务器端存放的路径
      cover_img: path.join('/public', req.file.filename),
      // 文章的发布时间
      pub_date: new Date(),
      // 文章作者的Id
      author_id: req.user.id
    }

    // 定义更新文章的SQL语句
    const sql = 'update ev_articles set ? where Id=?'

    // 执行sql语句
    db.query(sql, [articleInfo, req.body.Id], (err, results) => {
      // 执行sql语句失败
      if (err) return res.cc(err)

      // 执行sql语句成功，但是影响行数不等于1
      if (results.affectedRows !== 1) return res.cc('更新文章失败')

      res.cc('更新文章成功', 0)
    })
  })
}