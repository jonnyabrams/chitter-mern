const { restart } = require("nodemon")
const asyncHandler = require('express-async-handler')

const Peep = require('../models/peepModel')
const User = require('../models/userModel')

//route: GET /api/goals
const getPeeps = asyncHandler(async (req, res) => {
  const peeps = await Peep.find({ user: req.user.id }) // To get just user's Peeps - delete this? Also req.user comes from authMiddleware

  res.status(200).json(peeps)
})

//route: POST /api/goals
const setPeep = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please write something')
  }

  const peep = await Peep.create({
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(peep)
})

//route: PUT /api/goals/:id
const updatePeep = asyncHandler(async (req, res) => {
  const peep = await Peep.findById(req.params.id)

  if(!peep) {
    res.status(400)
    throw new Error('Peep not found')
  }

  const user = await User.findById(req.user.id)
  
  // Check for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  
  // Make sure logged-in user matches the peep's user - use toString because it's an ObjectId
  if(peep.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorised')
  }

  const updatedPeep = await Peep.findByIdAndUpdate(req.params.id, req.body, {new: true})
   
  res.status(200).json(updatedPeep)
})

//route: DELETE /api/goals/:id
const deletePeep = asyncHandler(async (req, res) => {
  const peep = await Peep.findById(req.params.id)

  if(!peep) {
    res.status(400)
    throw new Error('Peep not found')
  }

  const user = await User.findById(req.user.id)
  
  // Check for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  
  // Make sure logged-in user matches the peep's user - use toString because it's an ObjectId
  if(peep.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorised')
  }

  await peep.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getPeeps,
  setPeep,
  updatePeep,
  deletePeep
}