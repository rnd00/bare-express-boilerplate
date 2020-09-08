const { Router } = require('express')
const router = Router()
const { ErrorCustom } = require('../lib/error')

router.get('/', async (req, res, next) => {
  try {
    res.status(200).send({ This: 'is sample' })
  } catch (e) {
    next(new ErrorCustom(e))
  }
})

module.exports = router
