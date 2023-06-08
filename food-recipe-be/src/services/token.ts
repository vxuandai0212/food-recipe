import jwt from 'jsonwebtoken'
import moment from 'moment'
import httpStatus from 'http-status'
import {
  JWT_SECRET,
  JWT_ACCESS_EXPIRATION_MINUTES,
  JWT_REFRESH_EXPIRATION_DAYS,
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
} from 'config/config'
import { ApiError } from 'utils/index'
import { getCustomRepository } from 'typeorm'
import { STATUS, TOKEN_TYPE } from 'constants/entity'
import { TokenRepository } from 'repositories/token'
import userService from 'services/user'

const generateToken = (userId: any, expires: any, type?: number, secret: any = JWT_SECRET) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  }
  return jwt.sign(payload, secret)
}

const saveToken = async (
  token: string,
  userId: any,
  expires: any,
  type: TOKEN_TYPE
) => {
  const tokenRepository = getCustomRepository(TokenRepository)
  const tokenDoc = tokenRepository.create()
  tokenDoc.token = token
  tokenDoc.userId = userId
  tokenDoc.expires = expires.toDate()
  tokenDoc.type = type
  tokenDoc.createdAt = new Date()
  tokenRepository.save(tokenDoc)
  return tokenDoc
}

const verifyToken = async (token: string, type: TOKEN_TYPE) => {
  const tokenRepository = getCustomRepository(TokenRepository)
  const payload = jwt.verify(token, JWT_SECRET)
  const tokenDoc = await tokenRepository.findOne({ where: { token, type, customerId: payload.sub, blacklisted: STATUS.DISABLE } })
  if (!tokenDoc) {
    throw new Error('Token not found')
  }
  return tokenDoc
}

const generateAuthTokens = async (user: any) => {
  const accessTokenExpires = moment().add(JWT_ACCESS_EXPIRATION_MINUTES, 'minutes')
  const accessToken = generateToken(user.id, accessTokenExpires, TOKEN_TYPE.ACCESS)

  const refreshTokenExpires = moment().add(JWT_REFRESH_EXPIRATION_DAYS, 'days')
  const refreshToken = generateToken(user.id, refreshTokenExpires, TOKEN_TYPE.REFRESH)
  await saveToken(refreshToken, user.id, refreshTokenExpires, TOKEN_TYPE.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  }
}

const generateResetPasswordToken = async (email: string) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email')
  }
  const expires = moment().add(JWT_RESET_PASSWORD_EXPIRATION_MINUTES, 'minutes')
  const resetPasswordToken = generateToken(user.id, expires, TOKEN_TYPE.RESET_PASSWORD)
  await saveToken(resetPasswordToken, user.id, expires, TOKEN_TYPE.RESET_PASSWORD)
  return resetPasswordToken
}

const generateVerifyEmailToken = async (user: any) => {
  const expires = moment().add(JWT_VERIFY_EMAIL_EXPIRATION_MINUTES, 'minutes')
  const verifyEmailToken = generateToken(user.id, expires, TOKEN_TYPE.VERIFY_EMAIL)
  await saveToken(verifyEmailToken, user.id, expires, TOKEN_TYPE.VERIFY_EMAIL)
  return verifyEmailToken
}

const tokenService = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken
}

export default tokenService
