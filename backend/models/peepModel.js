const mongoose = require('mongoose')

const peepSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, 'Text field missing']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Peep', peepSchema)