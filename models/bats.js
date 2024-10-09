const mongoose = require("mongoose");


const batSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Bats = mongoose.model('Bats', batSchema)
module.exports = Bats