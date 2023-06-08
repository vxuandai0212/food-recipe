import passport from 'passport'
import httpStatus from 'http-status'
import { ApiError } from 'utils/index'
import { nonSecurePaths } from 'config/router'
import logger from 'config/logger'

const verifyCallback = (req: any, resolve: any, reject: any) => async (err: any, user: any, info: any) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'))
  }
  resolve()
}

const auth = async function(req: any, res: any, next: any) {
  logger.info(req.path)
  logger.info(nonSecurePaths)
  logger.info('is non secure path: ' + nonSecurePaths.includes(req.path))
  if (nonSecurePaths.includes(req.path)) {
    return next()
  } else {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject)
      )(req, res, next)
    })
      .then(() => next())
      .catch((err) => next(err))
  }
}

export default auth
