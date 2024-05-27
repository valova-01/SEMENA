const express = require('express')
const Product = require('../models/Product')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const growingRegions = await Product.distinct('growingRegion')
    res.json({ growingRegions })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router
