const asyncHandler = require('express-async-handler')

const Peep = require('../models/peepModel')
const User = require('../models/userModel')

// @desc    Get peeps
// @route   GET /api/peeps
// @access  Private
const getPeeps = asyncHandler(async (req, res) => {
  const peeps = await Peep.find({ user: req.user.id })

  res.status(200).json(peeps)
})

// @desc    Set peep
// @route   POST /api/peeps
// @access  Private
const setPeep = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const peep = await Peep.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(peep)
})

// @desc    Update peep
// @route   PUT /api/peeps/:id
// @access  Private
const updatePeep = asyncHandler(async (req, res) => {
  const peep = await Peep.findById(req.params.id)

  if (!peep) {
    res.status(400)
    throw new Error('Peep not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the peep user
  if (peep.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPeep = await Peep.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPeep)
})

// @desc    Delete peep
// @route   DELETE /api/peeps/:id
// @access  Private
const deletePeep = asyncHandler(async (req, res) => {
  const peep = await Peep.findById(req.params.id)

  if (!peep) {
    res.status(400)
    throw new Error('Peep not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (peep.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await peep.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPeeps,
  setPeep,
  updatePeep,
  deletePeep,
}