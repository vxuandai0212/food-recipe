import app from './app'
import logger from 'config/logger'
import { createConnection } from 'typeorm'
import { MARIADB_CONFIG } from 'config/database'
import { PORT } from 'config/config'
import { redisClient } from 'config/redis'

const http = require('http')
const https = require('https')
const path = require('path')

const fs = require('fs')
const cert = fs.readFileSync(path.join(__dirname, '../ssl') + '/fancythings.crt', 'utf8')
const key = fs.readFileSync(path.join(__dirname, '../ssl') + '/fancythings.key', 'utf8')
// const cert = fs.readFileSync('../ssl/fancythings.crt')
// const key = fs.readFileSync('../ssl/fancythings.key')

const credentials = { key, cert }
const HTTP_PORT = process.env.NODE_ENV === 'development' ? 3000 : 80
const HTTPS_PORT = 8443

let server = https.createServer(credentials, app)
let httpServer = http.createServer(app)
httpServer.listen(HTTP_PORT, () => {
  logger.info(`Listening to port ${HTTP_PORT}`)
})

createConnection(MARIADB_CONFIG)
  .then(async () => {
    logger.info('Connected to MariaDB')
    server.listen(HTTPS_PORT, () => {
      logger.info(`Listening to port ${HTTPS_PORT}`)
      logger.info(`Running enviroment: ${process.env.NODE_ENV}`)
      logger.info(`Greeting: ${process.env.GREETING}`)
    })
  })
  .catch((error) => logger.error(error))

// redisClient.connect()

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: any) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
