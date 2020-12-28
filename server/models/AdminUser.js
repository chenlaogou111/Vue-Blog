const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    select: false,
    set(val) {
      // 散列
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model("AdminUser", schema)