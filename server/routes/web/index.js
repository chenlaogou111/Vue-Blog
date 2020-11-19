module.exports = app => {
  const express = require('express');

  const router = express.Router();

  const Category = require('../../models/Category');

  router.get('/detail/:id', async (req, res) => {
    const item = await Category.findById(req.params.id);
    res.send(item)
  })

  app.use('/admin/api', router)
}