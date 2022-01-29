// 文章列表 路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')


// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
  // 定义SQL语句
  const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'

  db.query(sql, (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)

    // 执行sql语句成功
    res.send({
      status: 0,
      message: '获取文章分类数据成功',
      data: results
    })
  })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  // 定义查重的sql语句
  const sql = 'select * from ev_article_cate where name=? or alias=?'

  // 执行查重操作
  db.query(sql, [ req.body.name, req.body.alias ], (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)
    // 分类名称和分类别名都被占用
    if (results.length === 2) return res.cc('分类名称和分类别名都被占用，请稍后重试！')
    // results.length等于1 的三种情况
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称和分类别名都被占用，请稍后重试！')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请稍后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请稍后重试！')

    // 新增文章分类
    // 定义新增文章分类的sql语句
    const sql = 'insert into ev_article_cate set ?'
    // 执行新增文章分类操作
    db.query(sql, [req.body], (err, results) => {
      // 执行sql语句失败
      if (err) return res.cc(err)

      // 执行sql语句成功，但是影响行数不等于1
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败')

      return res.cc('新增文章分类成功', 0)
    })
  })
}

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  // 定义删除文章分类的SQL语句
  const sql = 'update ev_article_cate set is_delete=1 where Id=?'

  // 调用 `db.query()` 执行删除文章分类的SQL语句
  db.query(sql, req.params.id, (err, results) => {
    // 执行SQL语句失败
    if (err) return res.cc(err)

    // 执行SQL语句成功，但是影响行数不等于1
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败')

    // 删除文章分类成功
    res.cc('删除文章分类成功', 0)
  })
}

// 根据 Id 获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
  // 定义 根据Id 获取文章分类的sql语句
  const sql = 'select * from ev_article_cate where Id=?'

  // 执行sql语句
  db.query(sql, req.params.id, (err,results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)

    // 执行sql语句成功，但是查新到的数据不等于1
    if (results.length !== 1) return res.cc('查询文章分类失败')

    res.send({
      status: 0,
      message: '查询文章分类成功',
      data: results[0]
    })
  })
}

// 根据 Id 获取文章分类的处理函数
exports.updateCateById = (req, res) => {
  // 定义查询 分类名称 分类别名 是否被占用的sql语句
  const sql = 'select * from ev_article_cate where Id<>? and (name=? or alias=?)'

  // 执行查重操作
  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err) 

    // 分类名称 和 分类别名 都被占用
    if (results.length === 2) res.cc('分类名称和分类别名都被占用，请稍后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称和分类别名都被占用，请稍后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请稍后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请稍后重试！')

    // 更新文章分类
    // 定义更新文章分类的sql语句
    const sql = 'update ev_article_cate set ? where Id=?'

    // 执行sql语句
    db.query(sql, [req.body, req.body.Id], (err, results) => {
      // 执行sql语句失败
      if (err) return res.cc(err)

      // 执行sql语句成功，但是影响行数不等于1
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败')

      // 更新文章成功
      return res.cc('更新文章分类成功', 0)
    })
  })
}