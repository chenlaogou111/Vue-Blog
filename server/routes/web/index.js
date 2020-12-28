module.exports = app => {
  const express = require('express');

  const router = express.Router();

  const Category = require('../../models/Category');

  router.get('/detail/:id', async (req, res) => {
    const item = await Category.findById(req.params.id);
    res.send(item)
  })

  //  创建列表接口
  router.get('/home/categories', async (req, res) => {
    const items = await Category.find();
    res.send(items)
  })

  // 标签接口
  router.get('/home/categories/tags/:tag', async (req, res) => {
    const model = await Category.where({
      tags: req.params.tag
    });
    res.send(model)
  })

  /* 
    skip  从哪开始
  */
  //  创建列表接口
  router.get('/home/categories/:page', async (req, res) => {
    const items = await Category.find().skip((req.params.page - 1) * 10).limit(req.params.page * 10);
    res.send(items)
  })

  //文章详情评论
  router.put('/home/categories/comment/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    model.comment.push(req.body);
    await model.save();

    res.send('ok');
  })

  // 获取文章评论
  router.get('/home/categories/comment/:id', async (req, res) => {
    const model = await Category.findById(req.params.id);
    res.send(model);
  })
  app.use('/admin/api', router)
}