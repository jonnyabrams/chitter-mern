const { restart } = require("nodemon")

//route: GET /api/goals
const getPeeps = (req, res) => {
  res.status(200).json({ message: 'Get peeps' })
}

//route: POST /api/goals
const setPeep = (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please write something')
  }
  res.status(200).json({ message: 'Set peep' })
}

//route: PUT /api/goals/:id
const updatePeep = (req, res) => {
  res.status(200).json({ message: `Update peep ${req.params.id}` })
}

//route: DELETE /api/goals/:id
const deletePeep = (req, res) => {
  res.status(200).json({ message: `Delete peep ${req.params.id}` })
}


module.exports = {
  getPeeps,
  setPeep,
  updatePeep,
  deletePeep
}