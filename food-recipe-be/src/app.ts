import express from 'express'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import passport from 'passport'
import httpStatus from 'http-status'
import { ENV } from 'config/config'
import morgan from 'config/morgan'
import { jwtStrategy } from 'config/passport'
import { authLimiter, errorConverter, errorHandler, xss } from 'middlewares/index'
import routes from 'routes/v1'
import mobileRoute from 'routes/mobile/index'
import fancythingsRoute from 'routes/fancythings/index'
import { ApiError } from 'utils/index'
import 'reflect-metadata'

const app = express()

if (ENV !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(xss)

app.use(mongoSanitize())

app.use(compression())

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'Authorization', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'X-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false
}

app.use(cors(options))

app.options('*', cors(options) as any)

app.use(passport.initialize())

passport.use('jwt', jwtStrategy)

if (ENV === 'production') {
  app.use('/v1/auth', authLimiter)
}

app.use('/v1', routes)
app.use('/v1/apis', mobileRoute)
app.use('/v1/fancythings', fancythingsRoute)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.use(errorConverter)

app.use(errorHandler)

export default app
