import { put, takeLatest, select, delay } from 'redux-saga/effects'
import * as types from 'app/store/action-type'
import api from 'app/api'
import { isOnline } from 'app/helpers/connection'
import { RecentQuery } from 'app/constants/types/state'
import { AppState } from 'app/constants/types/state'
import { OVERLAY_STATUS } from 'app/constants/types/enum'

const recentQuery = (state: AppState) => state.recent.query

function* recent(): Generator<any, any, any> {
  const query: RecentQuery = yield select(recentQuery)
  const { isConnected } = yield isOnline()
  if (isConnected) {
    const { response, error } = yield api.recent(query)
    if (response && response.data) {
      const { total, items } = response.data
      yield put({ type: types.RECENT_SET_ITEMS, data: items })
      yield put({ type: types.RECENT_SET_TOTAL, data: total })
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

export function* recentSaga() {
  yield takeLatest(types.RECENT_GET_ALL, recent)
}

function* recentLoadMore(): Generator<any, any, any> {
  yield put({ type: types.OVERLAY, data: OVERLAY_STATUS.LOADING })
  const query: RecentQuery = yield select(recentQuery)
  const page = query.page
  const nextPage = page + 1
  const { isConnected } = yield isOnline()
  if (isConnected) {
    yield put({ type: types.LIST_LOADING, data: true })
    yield put({ type: types.RECENT_SET_QUERY_PAGE, data: nextPage })
    yield put({ type: types.RECENT_GET_ALL })
    yield delay(1500)
    yield put({ type: types.LIST_LOADING, data: false })
  } else {
    yield put({ type: types.APP_CONNECTION_ERROR, data: true })
  }
}

export function* recentLoadMoreSaga() {
  yield takeLatest(types.RECENT_LOAD_MORE, recentLoadMore)
}

function* recentLoadMoreFull(): Generator<any, any, any> {
  yield put({ type: types.OVERLAY, data: OVERLAY_STATUS.FULL })
  yield put({ type: types.LIST_LOADING, data: true })
  yield delay(2500)
  yield put({ type: types.LIST_LOADING, data: false })
}

export function* recentLoadMoreFullSaga() {
  yield takeLatest(types.RECENT_LOAD_MORE_FULL, recentLoadMoreFull)
}
