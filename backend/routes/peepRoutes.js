const express = require('express')
const router = express.Router()
const { getPeeps, setPeep, updatePeep, deletePeep } = require('../controllers/peepController')

const { protect } =  require('../middleware/authMiddleware')

router.route('/').get(protect, getPeeps).post(protect, setPeep)
router.route('/:id').put(protect, updatePeep).delete(protect, deletePeep)

module.exports = router