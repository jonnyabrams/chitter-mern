const express = require('express')
const router = express.Router()
const { getPeeps, setPeep, updatePeep, deletePeep } = require('../controllers/peepController')

router.route('/').get(getPeeps).post(setPeep)
router.route('/:id').put(updatePeep).delete(deletePeep)

module.exports = router