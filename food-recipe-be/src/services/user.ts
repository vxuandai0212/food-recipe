import { getCustomRepository } from 'typeorm'
import {
  UserRepository
} from 'repositories/index'
import bcrypt from 'bcryptjs'
import { ROLE, STATUS } from 'constants/entity'
import { ApiError } from 'utils/index'
import httpStatus from 'http-status'

const isPasswordMatch = (password: string, savedPassword: string) => {
  return bcrypt.compare(password, savedPassword)
}

const getUserByEmail = async (email: string) => {
  const userRepository = getCustomRepository(UserRepository)
  const user = await userRepository.findOneOrFail({ email })
  return user
}

const get = async (id: number) => {
  const userRepository = getCustomRepository(UserRepository)
  const user = await userRepository.findOneOrFail(id)
  return user
}

const changePassword = async (payload: any) => {
  const { userId, password } = payload
  const userRepository = getCustomRepository(UserRepository)
  const user = await userRepository.findOneOrFail(userId)
  const hashPassword = await bcrypt.hash(password, 8)
  user.password = hashPassword
  await userRepository.save(user)
}

const getUserInfo = async (id: number) => {
  const user: any = await get(id)
  user.fullname = 'Administrator'
  user.isAdmin = STATUS.ACTIVE
  user.status = STATUS.ACTIVE
  user.role = ROLE.ADMIN
  return user
}

const addUser = async (payload: any) => {
  const userRepository = getCustomRepository(UserRepository)
  const { email, password } = payload
  if (await userRepository.isEmailTaken(email, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  const user = userRepository.create()
  user.email = email
  user.password = password
  await userRepository.save(user)

  return user
}

const userService = {
  getUserByEmail,
  get,
  isPasswordMatch,
  changePassword,
  getUserInfo,
  addUser
}

export default userService
