import { put, takeLatest, select, delay } from 'redux-saga/effects'
import * as types from 'app/store/action-type'
import api from 'app/api'
import { isOnline } from 'app/helpers/connection'
import { MostViewQuery } from 'app/constants/types/state'
import { AppState } from 'app/constants/types/state'
import { OVERLAY_STATUS } from 'app/constants/types/enum'

const mostViewQuery = (state: AppState) => state.mostView.query

function* mostView(): Generator<any, any, any> {
  const query: MostViewQuery = yield select(mostViewQuery)
  const { isConnected } = yield isOnline()
  if (isConnected) {
    const { response, error } = yield api.search(query)
    if (response && response.data) {
      const { total, items } = response.data
      yield put({ type: types.MOST_VIEW_SET_ITEMS, data: items })
      yield put({ type: types.MOST_VIEW_SET_TOTAL, data: total })
    } else {
      const { code } = error
      if (code === 404) {
        yield put({ type: types.APP_SERVER_MAINTAIN, data: true })
      }
    }
  } else {
    yield put({ type: types.APP_CONNECTION_ERROR, data: true })
  }
}

export function* mostViewSaga() {
  yield takeLatest(types.MOST_VIEW_GET_ALL, mostView)
}

function* mostViewLoadMore(): Generator<any, any, any> {
  yield put({ type: types.OVERLAY, data: OVERLAY_STATUS.LOADING })
  const query: MostViewQuery = yield select(mostViewQuery)
  const page = query.page
  const nextPage = page + 1
  const { isConnected } = yield isOnline()
  if (isConnected) {
    yield put({ type: types.LIST_LOADING, data: true })
    yield put({ type: types.MOST_VIEW_SET_QUERY_PAGE, data: nextPage })
    yield put({ type: types.MOST_VIEW_GET_ALL })
    yield delay(1500)
    yield put({ type: types.LIST_LOADING, data: false })
  } else {
    yield put({ type: types.APP_CONNECTION_ERROR, data: true })
  }
}

export function* mostViewLoadMoreSaga() {
  yield takeLatest(types.MOST_VIEW_LOAD_MORE, mostViewLoadMore)
}

function* mostViewLoadMoreFull(): Generator<any, any, any> {
  yield put({ type: types.OVERLAY, data: OVERLAY_STATUS.FULL })
  yield put({ type: types.LIST_LOADING, data: true })
  yield delay(2500)
  yield put({ type: types.LIST_LOADING, data: false })
}

export function* mostViewLoadMoreFullSaga() {
  yield takeLatest(types.MOST_VIEW_LOAD_MORE_FULL, mostViewLoadMoreFull)
}
