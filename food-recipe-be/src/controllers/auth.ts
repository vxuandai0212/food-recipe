import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import { authService, tokenService, userService } from 'services/index'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { GENERATE_RESET_PASSWORD_TOKEN_SUCCESS, LOG_OUT_SUCCESS, RESET_PASSWORD_SUCCESS } from 'constants/message'

const info = catchAsync(async (req: any, res: any) => {
  res.status(httpStatus.OK).send(req.user)
})

const register = catchAsync(async (req: any, res: any) => {
  const user = await userService.addUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send(successContentReponse({ user, tokens }))
})

const login = catchAsync(async (req: any, res: any) => {
  const { email, password } = req.body
  const user = await authService.loginWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)
  res.status(httpStatus.OK).send(successContentReponse({ user, tokens }))
})

const logout = catchAsync(async (req: any, res: any) => {
  await authService.logout(req.body.refreshToken)
  res.status(httpStatus.OK).send(successSimpleResponse(LOG_OUT_SUCCESS))
})

const refreshTokens = catchAsync(async (req: any, res: any) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken)
  res.status(httpStatus.OK).send(successContentReponse({ ...tokens }))
})

const forgotPassword = catchAsync(async (req: any, res: any) => {
  // const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email)
  // await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
  res.status(httpStatus.OK).send(successSimpleResponse(GENERATE_RESET_PASSWORD_TOKEN_SUCCESS))
})

const resetPassword = catchAsync(async (req: any, res: any) => {
  await authService.resetPassword(req.query.token, req.body.password)
  res.status(httpStatus.OK).send(successSimpleResponse(RESET_PASSWORD_SUCCESS))
})

const authController = {
  info,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  register
}

export default authController
