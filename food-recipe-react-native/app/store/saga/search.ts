import { put, takeLatest, select, delay } from 'redux-saga/effects'
import * as types from 'app/store/action-type'
import api from 'app/api'
import { isOnline } from 'app/helpers/connection'
import { SearchQuery } from 'app/constants/types/state'
import { AppState } from 'app/constants/types/state'
import { OVERLAY_STATUS } from 'app/constants/types/enum'

const searchQuery = (state: AppState) => state.search.query

function* search(): Generator<any, any, any> {
  const query: SearchQuery = yield select(searchQuery)
  const { isConnected } = yield isOnline()
  if (isConnected) {
    yield put({ type: types.LIST_LOADING, data: true })
    const { response, error } = yield api.search(query)
    if (response && response.data) {
      const { total, items } = response.data
      yield put({ type: types.SEARCH_SET_ITEMS, data: items })
      yield put({ type: types.SEARCH_SET_TOTAL, data: total })
    } else {
      const { code } = error
      if (code === 404) {
        yield put({ type: types.APP_SERVER_MAINTAIN, data: true })
      }
    }
    yield delay(1500)
    yield put({ type: types.LIST_LOADING, data: false })
  } else {
    yield put({ type: types.APP_CONNECTION_ERROR, data: true })
  }
}

export function* searchSaga() {
  yield takeLatest(types.SEARCH_GET_ALL, search)
}

function* searchSubmit(): Generator<any, any, any> {
  const { isConnected } = yield isOnline()
  if (isConnected) {
    yield put({ type: types.VIEW_LOADING, data: true })
    const query: SearchQuery = yield select(searchQuery)
    const searchKeyword = query.searchKeyword
    yield put({ type: types.SEARCH_RESET })
    yield put({ type: types.SEARCH_SET_QUERY_SEARCH_KEYWORD, data: searchKeyword })
    const { response, error } = yield api.search(query)
    if (response && response.data) {
      const { total, items } = response.data
      yield put({ type: types.SEARCH_SET_ITEMS, data: items })
      yield put({ type: types.SEARCH_SET_TOTAL, data: total })
    } else {
      const { code } = error
      if (code === 404) {
        yield put({ type: types.APP_SERVER_MAINTAIN, data: true })
      }
    }
    yield delay(1500)
    yield put({ type: types.VIEW_LOADING, data: false })
  } else {
    yield put({ type: types.APP_CONNECTION_ERROR, data: true })
  }
}

export function* searchSubmitSaga() {
  yield takeLatest(types.SEARCH_SUBMIT, searchSubmit)
}

function* searchLoadMore(): Generator<any, any, any> {
  yield put({ type: types.OVERLAY, data: OVERLAY_STATUS.LOADING })
  const query: SearchQuery = yield select(searchQuery)
  const page = query.page
  const nextPage = page + 1
  const { isConnected } = yield isOnline()
  if (isConnected) {
    yield put({ type: types.LIST_LOADING, data: true })
    yield put({ type: types.SEARCH_SET_QUERY_PAGE, data: nextPage })
    yield put({ type: types.SEARCH_GET_ALL })
    yield delay(1500)
    yield put({ type: types.LIST_LOADING, data: false })
  } else {
    yield put({ type: types.APP_CONNECTION_ERROR, data: true })
  }
}

export function* searchLoadMoreSaga() {
  yield takeLatest(types.SEARCH_LOAD_MORE, searchLoadMore)
}

function* searchLoadMoreFull(): Generator<any, any, any> {
  yield put({ type: types.OVERLAY, data: OVERLAY_STATUS.FULL })
  yield put({ type: types.LIST_LOADING, data: true })
  yield delay(2500)
  yield put({ type: types.LIST_LOADING, data: false })
}

export function* searchLoadMoreFullSaga() {
  yield takeLatest(types.SEARCH_LOAD_MORE_FULL, searchLoadMoreFull)
}
