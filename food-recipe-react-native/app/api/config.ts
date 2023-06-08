import request from 'app/utils/request'
import { trimObject } from 'app/utils/func'

export const BASE_API_URL = 'http://fancythings.io/v1'

export const METHOD = {
  POST: 'post',
  GET: 'get'
}

export const sendRequest = (method: any, url: string, data: any) => {
  return request({
    url: BASE_API_URL.concat(url),
    method: method,
    data: trimObject(data)
  })
    .then(response => ({ response }))
    .catch(error => ({ error }))
}
