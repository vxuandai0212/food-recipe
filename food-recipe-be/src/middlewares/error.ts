import httpStatus from 'http-status'
import { ENV } from 'config/config'
import logger from 'config/logger'
import { ApiError } from 'utils/index'

const errorConverter = (err: any, req: any, res: any, next: any) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  if (!error.statusCode) { error.statusCode = 500 }
  next(error)
}

const errorHandler = (err: any, req: any, res: any, next: any) => {
  const { statusCode, message } = err
  // if (ENV === 'production' && !err.isOperational) {
  //   statusCode = httpStatus.INTERNAL_SERVER_ERROR
  //   message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  // }

  res.locals.errorMessage = err.message

  const response = {
    code: 'error',
    message,
    ...(ENV === 'development' && { stack: err.stack })
  }

  if (ENV === 'development') {
    logger.error(err)
  }

  res.status(statusCode).send(response)
}

export {
  errorConverter,
  errorHandler
}
