const { restart } = require("nodemon")
const asyncHandler = require('express-async-handler')

//route: GET /api/goals
const getPeeps = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get peeps' })
})

//route: POST /api/goals
const setPeep = asyncHandler(async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please write something')
  }
  res.status(200).json({ message: 'Set peep' })
})

//route: PUT /api/goals/:id
const updatePeep = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update peep ${req.params.id}` })
})

//route: DELETE /api/goals/:id
const deletePeep = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete peep ${req.params.id}` })
})


module.exports = {
  getPeeps,
  setPeep,
  updatePeep,
  deletePeep
}