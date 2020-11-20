module.exports = app => {
  const express = require('express');

  const router = express.Router();

  const Category = require('../../models/Category');

  // 新建列表接口
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model)
  })

  // 标签接口
  router.get('/categories/tags/:tag', async (req, res) => {
    const model = await Category.where({
      tags: req.params.tag
    });
    res.send(model)
  })

  /* 
    skip  从哪开始
  */
  //  创建列表接口
  router.get('/categories/:page', async (req, res) => {
    const items = await Category.find().skip((req.params.page - 1) * 10).limit(req.params.page * 10);
    res.send(items)
  })

  //  创建列表接口
  router.get('/categories', async (req, res) => {
    const items = await Category.find();
    res.send(items)
  })

  //文章详情评论
  router.put('/categories/comment/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    model.comment.push(req.body);
    await model.save();

    res.send('ok');
  })

  // 获取文章评论
  router.get('/categories/comment/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  })

  // 编辑文章详情接口
  router.get('/categories/edit/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model)
  })

  // 更改文章接口
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  })

  // 管理文章评论--获取
  router.get('/categories/admincomment/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model.comment)
  })
  // 管理文章评论--删除
  router.get('/categories/admincomment/:id/:name', async (req, res) => {
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
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
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
}