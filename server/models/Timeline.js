const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  content: String,
  time: String
})

module.exports = mongoose.model("Timeline", schema)