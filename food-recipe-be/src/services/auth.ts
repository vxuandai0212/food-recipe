import httpStatus from 'http-status'
import tokenService from 'services/token'
import userService from 'services/user'
import { ApiError } from 'utils/index'
import { INCORRECT_USERNAME_OR_PASSWORD } from 'constants/errors'
import { TOKEN_TYPE, STATUS } from 'constants/entity'
import { getCustomRepository } from 'typeorm'
import { TokenRepository } from 'repositories/token'

const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email)
  const savedPassword = user.password
  if (!user || !(await userService.isPasswordMatch(password, savedPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, INCORRECT_USERNAME_OR_PASSWORD)
  }

  return user
}

const logout = async (refreshToken: string) => {
  const tokenRepository = getCustomRepository(TokenRepository)
  const refreshTokenDoc = await tokenRepository.findOne({ where: { token: refreshToken, type: TOKEN_TYPE.REFRESH, blacklisted: STATUS.DISABLE } })
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  await tokenRepository.remove(refreshTokenDoc)
}

const refreshAuth = async (refreshToken: string) => {
  try {
    const tokenRepository = getCustomRepository(TokenRepository)
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, TOKEN_TYPE.REFRESH)
    const user = await userService.get(refreshTokenDoc.userId)
    if (!user) {
      throw new Error()
    }
    await tokenRepository.remove(refreshTokenDoc)
    return tokenService.generateAuthTokens(user)
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
  }
}

const resetPassword = async (resetPasswordToken: string, newPassword: string) => {
  try {
    const tokenRepository = getCustomRepository(TokenRepository)
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, TOKEN_TYPE.RESET_PASSWORD)
    const user = await userService.get(resetPasswordTokenDoc.userId)
    if (!user) {
      throw new Error()
    }
    await userService.changePassword({ userId: user.id, password: newPassword })
    const tokens = await tokenRepository.find({ where: { userId: user.id, type: TOKEN_TYPE.RESET_PASSWORD } })
    await tokenRepository.remove(tokens)
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')
  }
}

const authService = {
  loginWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword
}

export default authService
