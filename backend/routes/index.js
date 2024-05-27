const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth'))
router.use('/products', require('./product'))
router.use('/users', require('./user'))
router.use('/baskets', require('./basket'))
router.use('/orders', require('./order'))
router.use('/categores', require('./category'))
router.use('/subcategores', require('./subcategory'))
router.use('/ripeningPeriods', require('./ripening_period'))
router.use('/growingRegions', require('./growing_region'))

module.exports = router
