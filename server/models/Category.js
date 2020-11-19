const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  time: String,
  summary: String,
  tags: Array,
  editor: String,
  cover: String,
  comment: Array
})

module.exports = mongoose.model("Category", schema)