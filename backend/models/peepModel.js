const mongoose = require('mongoose')

const peepSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Text field missing']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Peep', peepSchema)