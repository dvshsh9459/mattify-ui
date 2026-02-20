const express = require('express')
const router = express.Router()
const ds = require('../utils/dataStore')

router.get('/', (req, res) => res.json(ds.banners))

module.exports = router
