module.exports = app => {
  const express = require('express');

  const router = express.Router();

  const Comment = require('../../models/Comment');

  // 上传评论
  router.post('/comment', async (req, res) => {
    const model = await Comment.create(req.body);
    res.send(model)
  })

  //  管理评论
  router.get('/comment', async (req, res) => {
    const items = await Comment.find();
    res.send(items)
  })

  // 删除列表接口
  router.delete('/comment/:id', async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    })
  })

  app.use('/admin/api', router)
}