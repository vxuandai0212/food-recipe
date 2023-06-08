import axios from 'axios'

const service = axios.create({
  timeout: 200000
})

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
