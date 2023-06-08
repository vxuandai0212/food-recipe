import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import {
  NETWORK_ERROR,
  NETWORK_ERROR_MSG,
  ERROR_400,
  ERROR_401,
  ERROR_401_MSG
} from '@/utils/constants/error'

const service = axios.create({
  timeout: 120000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  // eslint-disable-next-line
  response => Promise.resolve(response.data),
  error => {
    if (error.message === NETWORK_ERROR) {
      Message({
        message: NETWORK_ERROR_MSG,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.message === ERROR_400) {
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.message === ERROR_401) {
      if (error.response.data.message === 'INCORRECT_USERNAME_OR_PASSWORD') {
        Message({
          message: 'Thông tin đăng nhập không chính xác',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (error.response.data.message === 'NO_GRANT_APPLICATION') {
        Message({
          message: 'Không có quyền truy cập',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: ERROR_401_MSG,
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
