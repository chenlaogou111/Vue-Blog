module.exports = app => {
  const express = require('express');

  const router = express.Router();

  const Category = require('../../models/Category');
  const AdminUser = require('../../models/AdminUser');
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert');

  // 登陆校验中间件
  const auth = async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop();
    assert(token, 401, '请提供 jwt token')
    // token 解密
    const {
      id
    } = jwt.verify(token, app.get('secret'));

    assert(id, 401, '无效的 jwt token')

    req.user = await AdminUser.findById(id);

    assert(req.user, 401, '请先登陆')

    await next();
  }


  //  创建列表接口
  router.get('/categories', auth, async (req, res) => {
    const items = await Category.find();
    res.send(items)
  })

  // 新建列表接口
  router.post('/categories', auth, async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model)
  })

  //文章详情评论
  router.put('/categories/comment/:id', auth, async (req, res) => {
    const model = await Category.findById(req.params.id);
    model.comment.push(req.body);
    await model.save();

    res.send('ok');
  })

  // 获取文章评论
  router.get('/categories/comment/:id', auth, async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  })

  // 编辑文章详情接口
  router.get('/categories/edit/:id', auth, async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model)
  })

  // 更改文章接口
  router.put('/categories/:id', auth, async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  })

  // 管理文章评论--获取
  router.get('/categories/admincomment/:id', auth, async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model.comment)
  })
  // 管理文章评论--删除
  router.get('/categories/admincomment/:id/:name', auth, async (req, res) => {
    const model = await Category.findById(req.params.id)
    const comment = model.comment
    for (let i = 0; i < comment.length; i++) {
      if (comment[i].name === req.params.name) {
        comment.splice(i, 1);
      }
    }
    await model.save();
    res.send({
      state: "success"
    })
  })

  // 删除列表接口
  router.delete('/categories/:id', auth, async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    })
  })

  // 管理员列表
  router.post('/admin_users/', auth, async (req, res) => {
    const model = await AdminUser.create(req.body);
    res.send(model)
  })

  router.get('/admin_users', auth, async (req, res) => {
    const items = await AdminUser.find();
    res.send(items)
  })

  // 编辑管理员
  router.put('/admin_users/:id', auth, async (req, res) => {
    const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  })

  router.delete('/admin_users/:id', auth, async (req, res) => {
    await AdminUser.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    })
  })


  app.use('/admin/api', router)


  // 上传封面图片
  const multer = require('multer');
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    // file.url = `http://localhost:3000/uploads/${file.filename}`
    file.url = `http://lshblog.top/uploads/${file.filename}`
    res.send(file)
  })

  // 管理员登陆
  app.post('/admin/api/login', async (req, res) => {
    const {
      username,
      password
    } = req.body;

    // 根据用户名找用户
    const Adminuser = require('../../models/AdminUser');
    const user = await Adminuser.findOne({
      username
    }).select('+password') // 后面+号为选中，因为在模型中默认的select是false
    assert(user, 422, '用户不存在')

    // 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')

    // 返回token
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))

    res.send(token);
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
    // await next();
  })
}