const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  edit: String,
  time: String
})

module.exports = mongoose.model("Comment", schema)