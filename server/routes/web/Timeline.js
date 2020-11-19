module.exports = app => {
  const express = require('express');

  const router = express.Router();

  const Timeline = require('../../models/Timeline');

  // 新建时间线
  router.post('/timeline', async (req, res) => {
    const model = await Timeline.create(req.body);
    res.send(model)
  })

  //  管理评论
  router.get('/timeline', async (req, res) => {
    const items = await Timeline.find();
    res.send(items)
  })

  // 删除列表接口
  router.delete('/timeline/:id', async (req, res) => {
    await Timeline.findByIdAndDelete(req.params.id);
    res.send({
      success: true
    })
  })

  app.use('/admin/api', router)
}