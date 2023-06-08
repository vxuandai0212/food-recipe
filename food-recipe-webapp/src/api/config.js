import request from '@/utils/request'
import { trimObject } from '@/utils'

const BASE_API_URL = process.env.VUE_APP_BASE_API_URL

export function sendRequest(method, url, data) {
  if (method === METHOD.DELETE) {
    return request({
      url: url + data,
      method: method,
      baseURL: BASE_API_URL
    })
  } else {
    return request({
      url: url,
      method: method,
      data: trimObject(data),
      baseURL: BASE_API_URL
    })
  }
}

export const METHOD = {
  POST: 'post',
  DELETE: 'delete',
  GET: 'get'
}
