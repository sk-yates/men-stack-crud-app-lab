const mongoose = require("mongoose");


const batSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isInTheCave: Boolean,
  image: String,

})

const Bat = mongoose.model('Bat', batSchema)
module.exports = Bat