import { METHOD, sendRequest } from 'app/api/config'

const ENDPOINTS = {
  RECENT: '/apis/recipes/recent',
  SEARCH: '/apis/recipes/search',
  GET: '/apis/recipes/get',
  AD_VIEW: '/apis/ads/views'
}

const recent: any = (payload: any) => sendRequest(METHOD.POST, ENDPOINTS.RECENT, payload)
const search: any = (payload: any) => sendRequest(METHOD.POST, ENDPOINTS.SEARCH, payload)
const get: any = (payload: any) => sendRequest(METHOD.POST, ENDPOINTS.GET, payload)
const adView: any = (payload: any) => sendRequest(METHOD.POST, ENDPOINTS.AD_VIEW, payload)

const service = {
  recent,
  search,
  get,
  adView
}

export default service
