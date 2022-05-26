const { restart } = require("nodemon")
const asyncHandler = require('express-async-handler')

const Peep = require('../models/peepModel')

//route: GET /api/goals
const getPeeps = asyncHandler(async (req, res) => {
  const peeps = await Peep.find()

  res.status(200).json(peeps)
})

//route: POST /api/goals
const setPeep = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please write something')
  }

  const peep = await Peep.create({
    text: req.body.text
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

  await peep.remove()

  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getPeeps,
  setPeep,
  updatePeep,
  deletePeep
}