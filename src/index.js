const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pino = require('pino')
const expressPino = require('express-pino-logger')

// disabled because nothing inside routes
// const routes = require('./routes')
const { errorHandling, ErrorCustom, ERRORS } = require('./lib/error')

const app = express()
const port = process.env.PORT || 8080
const logger = pino({
  customLevels: {
    logging: 35
  },
  level: process.env.LOG_LEVEL || 'info'
})
const expressLogger = expressPino({
  logger,
  serializers: {
    req (req) {
      req.body = req.raw.body
      return req
    }
  }
})

async function start () {
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(expressLogger)

  app.get('/', (req, res, next) => {
    res.status(200).send({ Hello: 'World' })
  })

  app.all('*', (req, res, next) => {
    next(new ErrorCustom(ERRORS.commonNotFound))
  })

  app.use((err, req, res, next) => {
    errorHandling(err, req, res)
  })

  app.listen(port, () => {
    console.log(`Listening on ${port}`)
  })
}

start()
